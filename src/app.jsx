import { useMsal } from '@azure/msal-react';
import AppRedirect from 'components/AppRedirect';
import BirthdayMessage from 'components/BirthdayMessage';
import { useWatchSystemColorScheme } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
  const mainRef = useRef(null);

  useEffect(() => {
    analytics.onPageView();
  }, [location]);

  // Setup custom navigation so that MSAL uses react-router for navigation
  const { instance } = useMsal();
  const navigate = useNavigate();
  const navigaitonClient = new CustomNavigationClient(navigate, mainRef);
  instance.setNavigationClient(navigaitonClient);

  const [drawerOpen, setDrawerOpen] = useState();

  const onDrawerToggle = () => {
    setDrawerOpen((o) => !o);
  };

  return (
    <ErrorBoundary>
      <GordonHeader onDrawerToggle={onDrawerToggle} />
      <GordonNav onDrawerToggle={onDrawerToggle} drawerOpen={drawerOpen} />
      <main className={styles.app_main} ref={mainRef}>
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
