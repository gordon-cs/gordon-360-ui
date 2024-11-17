import { Route, Routes } from 'react-router-dom';
import Page404 from 'views/Page404';
import LostAndFound from './views/LostAndFound';
import MissingItemFormEdit from './views/LostAndFound/views/MissingItemEdit';
import MissingItemFormCreate from './views/LostAndFound/views/MissingItemCreate';
import LostAndFoundAdmin from './views/LostAndFoundAdmin';
import MissingItemList from './views/LostAndFoundAdmin/views/MissingItemList';
import MissingItemReportData from './views/LostAndFoundAdmin/views/MissingItemList/components/MissingItemReportData';

// Routing between Campus Safety App pages
const CampusSafetyApp = () => {
  return (
    <Routes>
      <Route path="/:itemid" element={<MissingItemFormEdit />} />
      <Route path="/missingitemform" element={<MissingItemFormCreate />} />
      <Route path="/" element={<LostAndFound />} />
      <Route
        path="/lostandfoundadmin/missingitemdatabase/:itemId"
        element={<MissingItemReportData />}
      />
      <Route path="/lostandfoundadmin/missingitemdatabase" element={<MissingItemList />} />
      <Route path="/lostandfoundadmin" element={<LostAndFoundAdmin />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default CampusSafetyApp;
