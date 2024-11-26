import { useMsal } from '@azure/msal-react';
import AppRedirect from 'components/AppRedirect';
import BirthdayMessage from 'components/BirthdayMessage';
import { useWatchSystemColorScheme } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { Route, Routes, useNavigate } from 'react-router';
import { CustomNavigationClient } from 'services/NavigationClient';
import analytics from 'services/analytics';
import './app.global.css';
import styles from './app.module.css';
import ErrorBoundary from './components/ErrorBoundary';
import GordonHeader from './components/Header';
import GordonNav from './components/Nav';
import routes from './routes';

const App = () => {
  useWatchSystemColorScheme();
  const location = useLocation();
  const lastHash = useRef('');

  /**
   * When the location changes, if there's a hash component, scroll the page
   * to the element with the matching ID
   *
   * Note: this only works for scrolling WITHIN a page.
   * It will not work when navigating to a new page, because the elements aren't rendered into the
   * DOM before this useEffect runs
   */
  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
    }

    // if the current URL has a hash component matching the ID of an element
    if (lastHash.current && document.getElementById(lastHash.current)) {
      // Scroll the element with ID = hash into view
      document
        .getElementById(lastHash.current)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      lastHash.current = '';
    }
  }, [location]);

  useEffect(() => {
    analytics.onPageView();
  }, [location]);

  // Setup custom navigation so that MSAL uses react-router for navigation
  const { instance } = useMsal();
  const navigate = useNavigate();
  const navigaitonClient = new CustomNavigationClient(navigate);
  instance.setNavigationClient(navigaitonClient);

  const [drawerOpen, setDrawerOpen] = useState();

  const onDrawerToggle = () => {
    setDrawerOpen((o) => !o);
  };

  return (
    <ErrorBoundary>
      <GordonHeader onDrawerToggle={onDrawerToggle} />
      <GordonNav onDrawerToggle={onDrawerToggle} drawerOpen={drawerOpen} />
      <main className={styles.app_main}>
        <BirthdayMessage />
        <AppRedirect />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </ErrorBoundary>
  );
};

export default App;
