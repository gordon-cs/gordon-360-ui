import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/core/styles';
import { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import analytics from './services/analytics';
import { isAuthenticated } from './services/auth';
import NetworkContextProvider from './contexts/NetworkContext';
import GordonHeader from './components/Header';
import GordonNav from './components/Nav';
import OfflineBanner from './components/OfflineBanner';
import theme from './theme';
import routes from './routes';

// Global styling that applies to entire site
import './app.global.css';
// local module for app.js
import styles from './app.module.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    // Only use analytics in production
    if (process.env.NODE_ENV === 'production') {
      analytics.initialize();
    }

    this.history = createBrowserHistory();
    this.history.listen(() => analytics.onPageView());

    this.onDrawerToggle = this.onDrawerToggle.bind(this);
    this.onAuthChange = this.onAuthChange.bind(this);

    this.state = {
      error: null,
      errorInfo: null,
      drawerOpen: false,
      authentication: isAuthenticated(),
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

  onAuthChange() {
    let authentication = isAuthenticated();
    this.setState({ authentication });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <NetworkContextProvider>
            <Router history={this.history}>
              <section className={styles.app_wrapper}>
                <GordonHeader
                  onDrawerToggle={this.onDrawerToggle}
                  onSignOut={this.onAuthChange}
                  authentication={this.state.authentication}
                />
                <GordonNav
                  onDrawerToggle={this.onDrawerToggle}
                  drawerOpen={this.state.drawerOpen}
                  onSignOut={this.onAuthChange}
                  authentication={this.state.authentication}
                />
                <main className={styles.app_main}>
                  <Switch>
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                          <div className={styles.app_main_container}>
                            <OfflineBanner
                              currentPath={route.path}
                              authentication={this.state.authentication}
                            />
                            <route.component
                              onLogIn={this.onAuthChange}
                              authentication={this.state.authentication}
                              {...props}
                            />
                          </div>
                        )}
                      />
                    ))}
                  </Switch>
                </main>
              </section>
            </Router>
          </NetworkContextProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  }
}
