import { Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Admin from './views/Admin';
import Team from './views/Team';
import Activity from './views/Activity';
import Match from './views/Match';

// Remember that more specific routes need to come first

const RecIM = () => {
  return (
    <Switch>
      <Route path="/recim/activity/:activityID/team/:teamID">
        <Team />
      </Route>
      <Route path="/recim/activity/:activityID/match/:matchID">
        <Match />
      </Route>
      <Route path="/recim/activity/:activityID">
        <Activity />
      </Route>
      <Route exact path="/recim/admin">
        <Admin />
      </Route>
      <Route exact path="/recim">
        <Home />
      </Route>
    </Switch>
  );
};

export default RecIM;
