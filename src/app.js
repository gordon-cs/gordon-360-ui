import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/core/styles';
import { Router, Route, Switch } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useState, useRef } from 'react';
import MomentUtils from '@date-io/moment';
import analytics from './services/analytics';
import { isAuthenticated } from './services/auth';
import NetworkContextProvider from './contexts/NetworkContext';
import GordonHeader from './components/Header';
import GordonNav from './components/Nav';
import OfflineBanner from './components/OfflineBanner';
import theme from './theme';
import routes from './routes';
import ErrorBoundary from './components/ErrorBoundary';

// Global styling that applies to entire site
import './app.global.css';
// local module for app.js
import styles from './app.module.css';

const App = (props) => {
  // Only use analytics in production
  if (process.env.NODE_ENV === 'production') {
    analytics.initialize();
  }

  const [drawerOpen, setDrawerOpen] = useState();
  const [authentication, setAuthentication] = useState();

  const historyRef = useRef(createBrowserHistory());
  historyRef.current.listen(() => analytics.onPageView());

  const onDrawerToggle = () => {
    setDrawerOpen(drawerOpen);
  };

  const onAuthChange = () => {
    let authentication = isAuthenticated();
    setAuthentication(authentication);
  };

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <NetworkContextProvider>
          <Router history={historyRef.current}>
            <section className={styles.app_wrapper}>
              <GordonHeader
                onDrawerToggle={onDrawerToggle}
                onSignOut={onAuthChange}
                authentication={authentication}
              />
              <GordonNav
                onDrawerToggle={onDrawerToggle}
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
                        <ErrorBoundary>
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
                        </ErrorBoundary>
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
};

export default App;
