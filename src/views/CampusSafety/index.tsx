import { Route, Routes } from 'react-router-dom';
import SafetyPage from './views/SafetyPage';

// Uses router to allow routing between pages in the Campus Safety App.
const CampusSafetyApp = () => {
  return (
    <Routes>
      <Route path="" element={<SafetyPage />}></Route>
    </Routes>
  );
};

export default CampusSafetyApp;
