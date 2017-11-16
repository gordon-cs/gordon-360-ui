
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './app.css';
import ActivitiesAll from './views/ActivitiesAll';
import ActivityEdit from './views/ActivityEdit';
import { isAuthenticated } from './services/auth';
import GordonHeader from './components/Header';
import GordonNav from './components/Nav';
import Home from './views/Home';
import Login from './views/Login';
import theme from './theme';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.onDrawerToggle = this.onDrawerToggle.bind(this);
    this.onLogIn = this.onLogIn.bind(this);

    this.state = {
      drawerOpen: false,
    };
  }
  onDrawerToggle() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }
  onLogIn() {
    // Force this component to re-render, login view -> main app view
    this.forceUpdate();
  }
  render() {
    let content = (
      <section className="app-wrapper">
        <GordonHeader onDrawerToggle={this.onDrawerToggle} />
        <GordonNav onDrawerToggle={this.onDrawerToggle} drawerOpen={this.state.drawerOpen} />
        <main className="app-main">
          <Route exact path="/" component={Home} />
          <Route path="/activities" component={ActivitiesAll} />
          <Route path="/activity/:activityId/edit" component={ActivityEdit} />
        </main>
      </section>
    );

    if (!isAuthenticated()) {
      content = <Login onLogIn={this.onLogIn} />;
    }

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          { content }
        </Router>
      </MuiThemeProvider>
    );
  }
}
