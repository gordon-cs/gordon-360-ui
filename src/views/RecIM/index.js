import { Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Team from './views/Team';
import League from './views/League';


const RecIM = () => {
  return (
    <Switch>
      <Route exact path='/recim'>
        <Home />
      </Route>
      <Route path='/recim/league/:leagueId/team/:teamId'>
        <Team />
      </Route>
      <Route path='/recim/league/:leagueId'>
        <League />
      </Route>
    </Switch>
  )
};

export default RecIM;
