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
      <Route exact path="/recim">
        <Header expandable="home" />
        <Home />
      </Route>
      <Route exact path="/recim/admin">
        <Header />
        <Admin />
      </Route>
      <Route path="/recim/activity/:activityID/team/:teamID">
        <Header />
        <Team />
      </Route>
      <Route path="/recim/activity/:activityID/match/:matchID">
        <Header />
        <Match />
      </Route>
      <Route path="/recim/activity/:activityID">
        <Header />
        <Activity />
      </Route>
    </Switch>
  );
};

export default RecIM;
