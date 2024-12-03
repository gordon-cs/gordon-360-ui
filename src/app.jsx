import { useMsal } from '@azure/msal-react';
import AppRedirect from 'components/AppRedirect';
import BirthdayMessage from 'components/BirthdayMessage';
import { useWatchSystemColorScheme } from 'hooks';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const navigaitonClient = new CustomNavigationClient(navigate);
  instance.setNavigationClient(navigaitonClient);

  const [drawerOpen, setDrawerOpen] = useState();

  const onDrawerToggle = () => {
    setDrawerOpen((o) => !o);
  };

  const Wrapper = ({ children }) => {
    const location = useLocation();

    useLayoutEffect(() => {
      // Scroll to the top of the page when the route changes
      if (mainRef.current) {
        mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }, [location.pathname]);

    return children;
  };

  return (
    <ErrorBoundary>
      <GordonHeader onDrawerToggle={onDrawerToggle} />
      <GordonNav onDrawerToggle={onDrawerToggle} drawerOpen={drawerOpen} />
      <main className={styles.app_main} ref={mainRef}>
        <BirthdayMessage />
        <AppRedirect />
        <Wrapper>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Wrapper>
      </main>
    </ErrorBoundary>
  );
};

export default App;
