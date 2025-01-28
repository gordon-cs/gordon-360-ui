import { Route, Routes } from 'react-router-dom';
import Page404 from 'views/Page404';
import LostAndFound from './views/LostAndFound';
import MissingItemFormEdit from './views/LostAndFound/views/MissingItemEdit';
import MissingItemFormCreate from './views/LostAndFound/views/MissingItemCreate';
import LostAndFoundAdmin from './views/LostAndFoundAdmin';
import MissingItemList from './views/LostAndFoundAdmin/views/MissingItemList';
import MissingItemReportData from './views/LostAndFoundAdmin/views/MissingItemList/components/MissingItemReportData';
import ReportItemPage from './views/LostAndFoundAdmin/views/MissingItemList/components/ReportItemPageOther';
import ReportFound from './views/LostAndFound/views/ReportFound';
import GordonLoader from 'components/Loader';
import GordonUnauthenticated from 'components/GordonUnauthenticated';
import { useUser } from 'hooks';
import lostAndFoundService from 'services/lostAndFound';
import { useEffect } from 'react';
import { AuthGroup } from 'services/auth';
import { useAuthGroups } from 'hooks';

type CampusSafetyRoutesObject = {
  [key: string]: {
    element: JSX.Element;
    formattedName /* Used for the breadcrumbs */ : string;
    queryString?: string;
  };
};

export const CampusSafetyRoutes: CampusSafetyRoutesObject = {
  '/:itemId': { element: <MissingItemFormEdit />, formattedName: 'Edit My Report' },
  '/missingitemform': { element: <MissingItemFormCreate />, formattedName: 'Report a Lost Item' },
  '/reportfound': { element: <ReportFound />, formattedName: 'Report a Found Item' },
  '/': { element: <LostAndFound />, formattedName: 'Lost and Found Home' },
  '/lostandfoundadmin/missingitemdatabase/:itemId': {
    element: <MissingItemReportData />,
    formattedName: 'View Report #~',
  },
  '/lostandfoundadmin/missingitemdatabase': {
    element: <MissingItemList />,
    formattedName: 'Lost Item Database',
    queryString: '?status=active',
  },
  '/lostandfoundadmin/reportitemforothers': {
    element: <ReportItemPage />,
    formattedName: 'Report a Lost Item for Others',
  },
  '/lostandfoundadmin': { element: <LostAndFoundAdmin />, formattedName: 'Lost and Found Admin' },
  '*': { element: <Page404 />, formattedName: 'Not Found' },
};

// Routing between Campus Safety App pages
const CampusSafetyApp = () => {
  const { profile, loading: loadingProfile } = useUser();
  const isAdmin = useAuthGroups(AuthGroup.LostAndFoundAdmin);
  const isDev = useAuthGroups(AuthGroup.LostAndFoundDevelopers);

  useEffect(() => {
    const updateAndFixReports = async () => {
      if (!isAdmin && !isDev) {
        return; // Only run if the user is an admin or dev
      }
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
      twoMonthsAgo.setHours(0, 0, 0, 0); // Normalize time

      // Fetch reports
      const reports = await lostAndFoundService.getMissingItemReports();

      for (const report of reports) {
        const reportDate = new Date(report.dateCreated);
        reportDate.setHours(0, 0, 0, 0);
        if (reportDate < twoMonthsAgo && report.status === 'active') {
          await lostAndFoundService.updateReportStatus(
            parseInt((report.recordID ?? '').toString()),
            'expired',
          );
        }
        // Double checking to make sure items are marked correctly based on date
        if (reportDate >= twoMonthsAgo && report.status === 'expired') {
          await lostAndFoundService.updateReportStatus(
            parseInt((report.recordID ?? '').toString()),
            'active',
          );
        }
      }
    };
    updateAndFixReports();
  }, [isAdmin, isDev]);

  if (loadingProfile) {
    return <GordonLoader />;
  }

  if (!profile) {
    return <GordonUnauthenticated feature="Lost and Found" />;
  }

  return (
    <Routes>
      {Object.keys(CampusSafetyRoutes).map((route) => {
        return <Route path={route} element={CampusSafetyRoutes[route].element} />;
      })}
    </Routes>
  );
};

export default CampusSafetyApp;
