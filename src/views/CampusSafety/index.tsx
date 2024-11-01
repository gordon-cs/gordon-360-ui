import { Route, Routes } from 'react-router-dom';
import SafetyPage from './views/SafetyPage';
import Page404 from 'views/Page404';
import LostAndFound from './views/LostAndFound';
import MissingItemForm from './views/MissingItemForm';
import LostAndFoundAdmin from './views/LostAndFoundAdmin';
import MissingItemList from './views/LostAndFoundAdmin/views/MissingItemList';
import MissingItemReportData from './views/LostAndFoundAdmin/views/MissingItemList/components/MissingItemReportData';

// Routing between Campus Safety App pages
const CampusSafetyApp = () => {
  return (
    <Routes>
      <Route path="" element={<SafetyPage />} />
      <Route path="/lostandfound/missingitemform" element={<MissingItemForm />} />
      <Route path="/lostandfound" element={<LostAndFound />} />
      <Route path="/lostandfoundadmin/missingitem/:itemId" element={<MissingItemReportData />} />
      <Route path="/lostandfoundadmin/missingitemdatabase" element={<MissingItemList />} />
      <Route path="/lostandfoundadmin" element={<LostAndFoundAdmin />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default CampusSafetyApp;
