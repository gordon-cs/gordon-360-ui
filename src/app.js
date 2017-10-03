import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import PoC from './poc';
import Home from './home';
import EditActivity from './edit-activity';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={PoC} />
          <Route path="/home" component={Home} />
          <Route path="/activity/:activityId/edit" component={EditActivity} />
        </div>
      </Router>
    );
  }
}
