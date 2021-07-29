import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
// import React, { useState, useContext, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { Router, Route, Switch } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import analytics from './services/analytics';
import { isAuthenticated } from './services/auth';
import NetworkContextProvider from './contexts/NetworkContext';
import GordonHeader from './components/Header';
import GordonNav from './components/Nav';
import OfflineBanner from './components/OfflineBanner';
import routes from './routes';
import { themes, themeNames, getPreferredTheme, setPreferredTheme } from './services/preferences';

// Global styling that applies to entire site
import './app.global.css';
// local module for app.js
import styles from './app.module.css';

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authentication, setAuthentication] = useState(isAuthenticated());
  // const ThemeContext = useContext(themeContext);
  // const [theme, setTheme] = ThemeContext;

  useEffect(() => {
    // console.log(preferredTheme);
    setPreferredTheme(localStorage.getItem('preferredTheme') ?? themeNames.light);
  }, []);

  let history = createBrowserHistory();
  history.listen(() => analytics.onPageView());

  // Only use analytics in production
  if (process.env.NODE_ENV === 'production') {
    analytics.initialize();
  }

  const onAuthChange = () => {
    let isAuth = isAuthenticated();
    setAuthentication(isAuth);
  };

  return (
    <ErrorBoundary analytics>
      <ThemeProvider theme={themes[getPreferredTheme()]}>
        {/* <ThemeProvider theme={preferredTheme ?? theme}> */}
        {/* <ThemeProvider theme={this.state.preferredTheme === 'dark' ? themes.dark : themes.light}> */}
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <NetworkContextProvider>
            <Router history={history}>
              <section className={styles.app_wrapper}>
                <GordonHeader
                  onDrawerToggle={() => setDrawerOpen(!drawerOpen)}
                  onSignOut={onAuthChange}
                  authentication={authentication}
                />
                <GordonNav
                  onDrawerToggle={() => setDrawerOpen(!drawerOpen)}
                  drawerOpen={drawerOpen}
                  onSignOut={onAuthChange}
                  authentication={authentication}
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
                              authentication={authentication}
                            />
                            <route.component
                              onLogIn={onAuthChange}
                              authentication={authentication}
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
    </ErrorBoundary>
  );
};

export default App;
