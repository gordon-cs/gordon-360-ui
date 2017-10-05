import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import EditActivity from './edit-activity';
import GordonHeader from './header';
import Home from './home';
import PoC from './poc';

export default class App extends Component {
  render() {
    return (
      <Router>
        <section>
          <GordonHeader />
          <main>
            <Route exact path="/" component={PoC} />
            <Route path="/home" component={Home} />
            <Route path="/activity/:activityId/edit" component={EditActivity} />
          </main>
        </section>
      </Router>
    );
  }
}
