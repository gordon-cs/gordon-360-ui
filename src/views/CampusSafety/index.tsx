import { Route, Routes } from 'react-router-dom';
import SafetyPage from './views/SafetyPage';
import Page404 from 'views/Page404';

// Routing between Campus Safety App pages
const CampusSafetyApp = () => {
  return (
    <Routes>
      <Route path="" element={<SafetyPage />}></Route>
      <Route path="*" element={<Page404 />}></Route>
    </Routes>
  );
};

export default CampusSafetyApp;
