import { Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Admin from './views/Admin/Admin';
import Team from './views/Team/Team';
import Activity from './views/Activity/Activity';
import Match from './views/Match/Match';

// Remember that more specific routes need to come first

const RecIM = () => {
  return (
    <Routes>
      <Route path="" element={<Home />}></Route>
      <Route path="/activity/:activityID/team/:teamID" element={<Team />}></Route>
      <Route path="/activity/:activityID/match/:matchID" element={<Match />}></Route>
      <Route path="/activity/:activityID" element={<Activity />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
    </Routes>
  );
};

export default RecIM;
