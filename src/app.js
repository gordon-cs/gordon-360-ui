import createHistory from 'history/createBrowserHistory';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import './app.css';
import analytics from './services/analytics';
//import { isAuthenticated, signOut } from './services/auth';
//import GordonError from './components/Error';
import GordonHeader from './components/Header';
import GordonNav from './components/Nav';
//import { AuthError } from './services/error';
//import Login from './views/Login';
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
      errorInfo: null,
      drawerOpen: false,
    };
  }
  onDrawerToggle() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'production') {
      analytics.onError(`${error.toString()} ${errorInfo.componentStack}`);
    }

    this.setState({ error, errorInfo });
  }
  componentWillMount() {
    //setting up a global variable very hacky
    window.didProfilePicUpdate = false;
  }

  onAuthChange() {
    // Force this component to re-render, login view -> main app view
    console.log('app.js: about to call forceUpdate() in onAuthChange()');
    this.forceUpdate();
    console.log('app.js: called forceUpdate() in onAuthChange()');
  }

  render() {
    let content = (
      <section className="app-wrapper">
        <GordonHeader onDrawerToggle={this.onDrawerToggle} onSignOut={this.onAuthChange} />
        {/*<GordonNav
          onDrawerToggle={this.onDrawerToggle}
          drawerOpen={this.state.drawerOpen}
          onSignOut={this.onAuthChange}
        />*/}
        <main className="app-main">
          <Switch>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                render={() => <route.component onLogIn={this.onAuthChange} />}
              />
            ))}
          </Switch>
        </main>
      </section>
    );

    return (
      <MuiThemeProvider theme={theme}>
        <Router history={this.history}>{content}</Router>
      </MuiThemeProvider>
    );
  }
}
