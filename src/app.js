import createHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import './app.css';
import analytics from './services/analytics';
import { isAuthenticated } from './services/auth';
import GordonError from './components/Error';
import GordonHeader from './components/Header';
import GordonNav from './components/Nav';
import Login from './views/Login';
import theme from './theme';
import routes from './routes';

export default class App extends Component {
  constructor(props) {
    super(props);

    // Only use analytics in production
    if (process.env.NODE_ENV === 'production') {
      analytics.initialize();
    }

    this.history = createHistory();
    this.history.listen(() => analytics.onPageView());

    this.onDrawerToggle = this.onDrawerToggle.bind(this);
    this.onAuthChange = this.onAuthChange.bind(this);

    this.state = {
      error: null,
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
  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'production') {
      analytics.onError(`${error.toString()} ${errorInfo.componentStack}`);
    }
    this.setState({ error: { error, errorInfo } });
  }
  render() {
    let content = (
      <section className="app-wrapper">
        <GordonHeader onDrawerToggle={this.onDrawerToggle} onSignOut={this.onAuthChange} />
        <GordonNav onDrawerToggle={this.onDrawerToggle} drawerOpen={this.state.drawerOpen} />
        <main className="app-main">
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </main>
      </section>
    );

    if (!isAuthenticated()) {
      content = <Login onLogIn={this.onAuthChange} />;
    } else if (this.state.error) {
      content = (
        <GordonError error={this.state.error} />
      );
    }

    return (
      <MuiThemeProvider theme={theme}>
        <Router history={this.history}>
          { content }
        </Router>
      </MuiThemeProvider>
    );
  }
}
