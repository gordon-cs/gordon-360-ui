import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './app.css';

import ActivityEdit from './views/ActivityEdit';
import GordonHeader from './components/Header';
import Home from './views/Home';
import PoC from './views/PoC';

export default class App extends Component {
  render() {
    return (
      <Router>
        <section>
          <GordonHeader />
          <main>
            <Route exact path="/" component={PoC} />
            <Route path="/home" component={Home} />
            <Route path="/activity/:activityId/edit" component={ActivityEdit} />
          </main>
        </section>
      </Router>
    );
  }
}
