import MomentUtils from '@date-io/moment';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import UserContextProvider, { UserContext } from 'contexts/UserContext';
import { createBrowserHistory } from 'history';
import { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
// Global styling that applies to entire site
import './app.global.css';
// local module for app.js
import styles from './app.module.css';
import GordonHeader from './components/Header';
import GordonNav from './components/Nav';
import OfflineBanner from './components/OfflineBanner';
import NetworkContextProvider from './contexts/NetworkContext';
import routes from './routes';
import analytics from './services/analytics';
import theme from './theme';

const withContext = (App) => {
  return () => (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <NetworkContextProvider>
          <UserContextProvider>
            <UserContext.Consumer>{(user) => <App auth={!!user} />}</UserContext.Consumer>
          </UserContextProvider>
        </NetworkContextProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    // Only use analytics in production
    if (process.env.NODE_ENV === 'production') {
      analytics.initialize();
    }

    this.history = createBrowserHistory();
    this.history.listen(() => analytics.onPageView());

    this.onDrawerToggle = this.onDrawerToggle.bind(this);

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

  render() {
    return (
      <Router history={this.history}>
        <section className={styles.app_wrapper}>
          <GordonHeader onDrawerToggle={this.onDrawerToggle} />
          <GordonNav onDrawerToggle={this.onDrawerToggle} drawerOpen={this.state.drawerOpen} />
          <main className={styles.app_main}>
            <Switch>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  render={(props) => (
                    <div className={styles.app_main_container}>
                      <OfflineBanner currentPath={route.path} authentication={this.props.auth} />
                      <route.component authentication={this.props.auth} {...props} />
                    </div>
                  )}
                />
              ))}
            </Switch>
          </main>
        </section>
      </Router>
    );
  }
}
export default withContext(App);
