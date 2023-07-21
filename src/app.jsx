import AppRedirect from 'components/AppRedirect';
import BirthdayMessage from 'components/BirthdayMessage';
import { createBrowserHistory } from 'history';
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.global.css';
import styles from './app.module.css';
import ErrorBoundary from './components/ErrorBoundary';
import GordonHeader from './components/Header';
import GordonNav from './components/Nav';
import routes from './routes';
import analytics from './services/analytics';
import { useWatchSystemColorScheme } from 'hooks';

const App = () => {
  useWatchSystemColorScheme();

  const [drawerOpen, setDrawerOpen] = useState();

  const historyRef = useRef(createBrowserHistory());

  const onDrawerToggle = () => {
    setDrawerOpen((o) => !o);
  };

  useEffect(() => {
    // Only use analytics in production
    if (import.meta.env.NODE_ENV === 'production') {
      analytics.initialize();
    }

    historyRef.current.listen(() => analytics.onPageView());
  }, []);

  return (
    <ErrorBoundary>
      <Router historyRef={historyRef.current}>
        <GordonHeader onDrawerToggle={onDrawerToggle} />
        <GordonNav onDrawerToggle={onDrawerToggle} drawerOpen={drawerOpen} />
        <main className={styles.app_main}>
          <>
            <BirthdayMessage />
            <AppRedirect />
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
          </>
        </main>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
