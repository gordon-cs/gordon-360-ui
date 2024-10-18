import { Route, Routes } from 'react-router-dom';
import SafetyPage from './views/SafetyPage';
import Page404 from 'views/Page404';
import LostAndFound from './views/LostAndFound';

// Routing between Campus Safety App pages
const CampusSafetyApp = () => {
  return (
    <Routes>
      <Route path="" element={<SafetyPage />} />
      <Route path="/lostandfound" element={<LostAndFound />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default CampusSafetyApp;
