import { RouterProvider, createBrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Admin from './views/Admin';
import Team from './views/Team';
import Activity from './views/Activity';
import Match from './views/Match';

// Remember that more specific routes need to come first

const RecIM = () => {
  /**
    RECIM ROUTER, RESEARCH IN PROGRESS
  */

  // const recimRouter = createBrowserRouter([
  //   {
  //     path: '/recim',
  //     element: <Home />,
  //     children: [
  //       {
  //         path: '/recim/activity/:activityID',
  //         element: <Activity />,
  //         children: [
  //           {
  //             path: '/recim/activity/:activityID/team/:teamID',
  //             element: <Team />,
  //           },
  //           { path: '/recim/activity/:activityID/match/:matchID', element: <Match /> },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     path: '/recim/admin',
  //     element: <Admin />,
  //   },
  // ]);
  // return ( <RouterProvider router={recimRouter} />)

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
