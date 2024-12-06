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
import { useUser, useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';
import lostAndFoundService from 'services/lostAndFound';
import { useState, useEffect } from 'react';

// Routing between Campus Safety App pages
const CampusSafetyApp = () => {
  const { profile, loading: loadingProfile } = useUser();
  const isAdmin = useAuthGroups(AuthGroup.LostAndFoundAdmin);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      const updateExpiredReports = async () => {
        setLoading(true);
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getDate() - 14);

        const expiringReports = (await lostAndFoundService.getMissingItemReports()).filter(
          (report) => new Date(report.dateCreated) < sixMonthsAgo,
        );

        for (const report of expiringReports) {
          await lostAndFoundService.updateReportStatus(
            parseInt((report.recordID ?? '').toString()),
            'expired',
          );
          console.log('expired report updated');
        }
        setLoading(false);
      };

      updateExpiredReports();
    }
  }, [isAdmin]);

  if (loadingProfile || loading) {
    return <GordonLoader />;
  }

  if (!profile) {
    return <GordonUnauthenticated feature="Lost and Found" />;
  }

  return (
    <Routes>
      <Route path="/:itemid" element={<MissingItemFormEdit />} />
      <Route path="/missingitemform" element={<MissingItemFormCreate />} />
      <Route path="/reportfound" element={<ReportFound />} />
      <Route path="/" element={<LostAndFound />} />
      <Route
        path="/lostandfoundadmin/missingitemdatabase/:itemId"
        element={<MissingItemReportData />}
      />
      <Route path="/lostandfoundadmin/missingitemdatabase" element={<MissingItemList />} />
      <Route path="/lostandfoundadmin/reportitemforothers" element={<ReportItemPage />} />
      <Route path="/lostandfoundadmin" element={<LostAndFoundAdmin />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default CampusSafetyApp;
