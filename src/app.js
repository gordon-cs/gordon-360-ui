import MomentUtils from '@date-io/moment';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import BirthdayMessage from 'components/BirthdayMessage';
import UserContextProvider, { AuthContext } from 'contexts/UserContext';
import { createBrowserHistory } from 'history';
import { useEffect, useRef, useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import './app.global.css';
import styles from './app.module.css';
import ErrorBoundary from './components/ErrorBoundary';
import GordonHeader from './components/Header';
import GordonNav from './components/Nav';
import OfflineBanner from './components/OfflineBanner';
import NetworkContextProvider from './contexts/NetworkContext';
import routes from './routes';
import analytics from './services/analytics';
import theme from './theme';

const ContextProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <NetworkContextProvider>
          <UserContextProvider>{children}</UserContextProvider>
        </NetworkContextProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState();

  const historyRef = useRef(createBrowserHistory());

  const onDrawerToggle = () => {
    setDrawerOpen((o) => !o);
  };

  useEffect(() => {
    // Only use analytics in production
    if (process.env.NODE_ENV === 'production') {
      analytics.initialize();
    }

    historyRef.current.listen(() => analytics.onPageView());
  }, []);

  return (
    <ErrorBoundary>
      <ContextProviders>
        <Router history={historyRef.current}>
          <section className={styles.app_wrapper}>
            <GordonHeader onDrawerToggle={onDrawerToggle} />
            <GordonNav onDrawerToggle={onDrawerToggle} drawerOpen={drawerOpen} />
            <main className={styles.app_main}>
              <AuthContext.Consumer>
                {(authenticated) => (
                  <Switch>
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                          <div className={styles.app_main_container}>
                            <OfflineBanner currentPath={route.path} authentication={props.auth} />
                            <BirthdayMessage />
                            <route.component authentication={authenticated} {...props} />
                          </div>
                        )}
                      />
                    ))}
                  </Switch>
                )}
              </AuthContext.Consumer>
            </main>
          </section>
        </Router>
      </ContextProviders>
    </ErrorBoundary>
  );
};

export default App;
