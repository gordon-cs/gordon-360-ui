import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './app.css';

import ActivityEdit from './views/ActivityEdit';
import GordonHeader from './components/Header';
import Home from './views/Home';

export default class App extends Component {
  render() {
    return (
      <Router>
        <section className="app-wrapper">
          <GordonHeader />
          <main className="app-main">
            <Route path="/" component={Home} />
            <Route path="/activity/:activityId/edit" component={ActivityEdit} />
          </main>
        </section>
      </Router>
    );
  }
}
