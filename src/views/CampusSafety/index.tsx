import { Route, Routes } from 'react-router-dom';
import SafetyPage from './views/SafetyPage';
import Page404 from 'views/Page404';
import LostAndFound from './views/LostAndFound';
import MissingItemFormEdit from './views/LostAndFound/views/MissingItemEdit';
import MissingItemFormCreate from './views/LostAndFound/views/MissingItemCreate';
import LostAndFoundAdmin from './views/LostAndFoundAdmin';
import MissingItemList from './views/LostAndFoundAdmin/views/MissingItemList';
import MissingItemReportData from './views/LostAndFoundAdmin/views/MissingItemList/components/MissingItemReportData';
import ReportItemPage from './views/LostAndFoundAdmin/views/MissingItemList/components/ReportItemPageOther';

// Routing between Campus Safety App pages
const CampusSafetyApp = () => {
  return (
    <Routes>
      <Route path="" element={<SafetyPage />} />
      <Route path="/lostandfound/:itemid" element={<MissingItemFormEdit />} />
      <Route path="/lostandfound/missingitemform" element={<MissingItemFormCreate />} />
      <Route path="/lostandfound" element={<LostAndFound />} />
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
