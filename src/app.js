import createHistory from 'history/createBrowserHistory';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import './app.css';
import analytics from './services/analytics';
import { isAuthenticated } from './services/auth';
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
      authentication: false,
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

    let authentication = isAuthenticated();
    this.setState({ authentication });
  }

  onAuthChange() {
    let authentication = isAuthenticated();
    this.setState({ authentication });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router history={this.history}>
          <section className="app-wrapper">
            <GordonHeader
              onDrawerToggle={this.onDrawerToggle}
              onSignOut={this.onAuthChange}
              Authentication={this.state.authentication}
            />
            <GordonNav
              onDrawerToggle={this.onDrawerToggle}
              drawerOpen={this.state.drawerOpen}
              onSignOut={this.onAuthChange}
              Authentication={this.state.authentication}
            />
            <main className="app-main">
              <Switch>
                {routes.map(route => (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    render={props => (
                      <route.component
                        onLogIn={this.onAuthChange}
                        Authentication={this.state.authentication}
                        {...props}
                      />
                    )}
                  />
                ))}
              </Switch>
            </main>
          </section>
        </Router>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}
