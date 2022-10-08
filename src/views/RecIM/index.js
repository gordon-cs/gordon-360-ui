import { Switch, Route } from 'react-router-dom';
import Home from './views/home';
import Team from './views/team';
import League from './views/league';

const RecIM = () => {
  return (
    <Switch>
      <Route exact path="/recim">
        <Home />
      </Route>
      <Route path="/recim/league/:leagueId/team/:teamId">
        <Team />
      </Route>
      <Route path="/recim/league/:leagueId">
        <League />
      </Route>
    </Switch>
  );
};

export default RecIM;
