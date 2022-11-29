import BirthdayMessage from 'components/BirthdayMessage';
import { createBrowserHistory } from 'history';
import { useEffect, useRef, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './app.global.css';
import styles from './app.module.css';
import ErrorBoundary from './components/ErrorBoundary';
import GordonHeader from './components/Header';
import GordonNav from './components/Nav';
import routes from './routes';
import analytics from './services/analytics';

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
      <Router historyRef={historyRef.current}>
        <section className={styles.app_wrapper}>
          <GordonHeader onDrawerToggle={onDrawerToggle} />
          <GordonNav onDrawerToggle={onDrawerToggle} drawerOpen={drawerOpen} />
          <main className={styles.app_main}>
            <>
              <BirthdayMessage />
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
