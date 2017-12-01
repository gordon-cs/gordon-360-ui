import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import './app.css';
import { isAuthenticated } from './services/auth';
import GordonHeader from './components/Header';
import GordonNav from './components/Nav';
import Login from './views/Login';
import theme from './theme';
import routes from './routes';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.onDrawerToggle = this.onDrawerToggle.bind(this);
    this.onAuthChange = this.onAuthChange.bind(this);

    this.state = {
      drawerOpen: false,
    };
  }
  onDrawerToggle() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }
  onAuthChange() {
    // Force this component to re-render, login view -> main app view
    this.forceUpdate();
  }
  render() {
    let content = (
      <section className="app-wrapper">
        <GordonHeader onDrawerToggle={this.onDrawerToggle} onSignOut={this.onAuthChange} />
        <GordonNav onDrawerToggle={this.onDrawerToggle} drawerOpen={this.state.drawerOpen} />
        <main className="app-main">
          <Switch>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Switch>
        </main>
      </section>
    );

    if (!isAuthenticated()) {
      content = <Login onLogIn={this.onAuthChange} />;
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
