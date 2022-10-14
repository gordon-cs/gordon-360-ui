import { Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Team from './views/Team';
import League from './views/League';
import Match from './views/Match';

// Remember that more specific routes need to come first

const RecIM = () => {
  return (
    <Switch>
      <Route exact path="/recim">
        <Home />
      </Route>
      <Route path="/recim/league/:leagueID/team/:teamID">
        <Team />
      </Route>
      <Route path="/recim/league/:leagueID/match/:matchID">
        <Match />
      </Route>
      <Route path="/recim/league/:leagueID">
        <League />
      </Route>
    </Switch>
  );
};

export default RecIM;
