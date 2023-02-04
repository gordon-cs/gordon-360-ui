import { Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Admin from './views/Admin';
import Team from './views/Team';
import Activity from './views/Activity';
import Match from './views/Match';
import Header from './components/Header';

// Remember that more specific routes need to come first

const RecIM = () => {
  return (
    <Switch>
      <Route path="/recim/activity/:activityID/team/:teamID">
        <Header expandable="team" />
        <Team />
      </Route>
      <Route path="/recim/activity/:activityID/match/:matchID">
        <Header expandable="match" />
        <Match />
      </Route>
      <Route path="/recim/activity/:activityID">
        <Header expandable="activity" />
        <Activity />
      </Route>
      <Route exact path="/recim/admin">
        <Header page="admin" expandable="home" />
        <Admin />
      </Route>
      <Route exact path="/recim">
        <Header expandable="home" />
        <Home />
      </Route>
    </Switch>
  );
};

export default RecIM;
