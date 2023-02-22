import AppRedirect from 'components/AppRedirect/AppRedirect.jsx';
import BirthdayMessage from 'components/BirthdayMessage/BirthdayMessage.jsx';
import { createBrowserHistory } from 'history';
import { useEffect, useRef, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './app.global.css';
import styles from './app.module.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx';
import GordonHeader from './components/Header/Header.jsx';
import GordonNav from './components/Nav/Nav.jsx';
import routes from './routes.jsx';
import analytics from './services/analytics';

const App = () => {
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
        <section className={styles.app_wrapper}>
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
        </section>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
