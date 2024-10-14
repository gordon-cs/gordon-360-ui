import { Route, Routes } from 'react-router-dom';
import SafetyPage from './views/SafetyPage';

const CampusSafetyApp = () => {
  return (
    <Routes>
      <Route path="" element={<SafetyPage />}></Route>
    </Routes>
  );
};

export default CampusSafetyApp;
