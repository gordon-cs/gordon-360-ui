import { Route, Routes } from 'react-router-dom';
import Page404 from 'views/Page404';
import LostAndFound from './views/Home';
import MissingItemFormEdit from './views/MissingReportEdit';
import MissingItemFormCreate from './views/MissingReportCreate';
import LostAndFoundAdmin from './views/Admin';
import MissingItemList from './views/MissingReportList';
import MissingItemReportData from './views/MissingReportDetails';
import ReportItemPage from './views/ReportItemForOthers';
import ReportFound from './views/ReportFound';
import FoundItemFormCreate from './views/FoundItemCreate';
import FoundItemList from './views/FoundItemList';
import FoundItemFormEdit from './views/FoundItemEdit';
import FoundItemConfirmation from './views/FoundItemConfirm';
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
  '/lostandfoundadmin/founditemform': {
    element: <FoundItemFormCreate />,
    formattedName: 'Enter Found Item',
  },
  '/reportfound': { element: <ReportFound />, formattedName: 'Report Found Item' },
  '/': { element: <LostAndFound />, formattedName: 'Lost and Found Home' },
  '/lostandfoundadmin/missingitemdatabase/:itemId': {
    element: <MissingItemReportData />,
    formattedName: 'View Report #~',
  },
  '/lostandfoundadmin/founditemform/:recordID': {
    element: <FoundItemConfirmation />,
    formattedName: 'Found Item Confirmation #~',
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
  '/lostandfoundadmin/founditemdatabase': {
    element: <FoundItemList />,
    formattedName: 'Found Items Database',
  },
  '/lostandfoundadmin/founditemform/founditemdatabase': {
    element: <FoundItemList />,
    formattedName: 'Found Items Databases',
  },
  '/lostandfoundadmin/founditemdatabase/:itemId': {
    element: <FoundItemFormEdit />,
    formattedName: 'View Found Item #~',
  },
  '/lostandfoundadmin/founditemform/founditemdatabase/:itemId': {
    element: <FoundItemFormEdit />,
    formattedName: 'View Found #~',
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
          await lostAndFoundService.updateReportStatus(report.recordID, 'expired');
        }
        // Double checking to make sure items are marked correctly based on date
        if (reportDate >= twoMonthsAgo && report.status === 'expired') {
          await lostAndFoundService.updateReportStatus(report.recordID, 'active');
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
