import AppRedirect from 'components/AppRedirect';
import BirthdayMessage from 'components/BirthdayMessage';
import { createBrowserHistory } from 'history';
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useColorScheme } from '@mui/material/styles';
import './app.global.css';
import styles from './app.module.css';
import ErrorBoundary from './components/ErrorBoundary';
import GordonHeader from './components/Header';
import GordonNav from './components/Nav';
import routes from './routes';
import analytics from './services/analytics';

const App = () => {
  // Code for setting up color schemes

  const { mode, setMode } = useColorScheme();
  // mode listener code from
  //https://dev.to/gustavogomez/manage-dark-mode-in-reactjs-with-listener-to-detect-dark-mode-in-the-browser-3120

  let colorMode = localStorage.getItem('colorMode') ?? 'system';

  const onSelectMode = (prefersDark) => {
    prefersDark === 'dark' ? setMode('dark') : setMode('light');
  };

  const setupColorSchemeListeners = (colorScheme) => {
    if (colorMode === 'system' || colorMode === null) {
      //anything other than 'dark' will set the scheme to light
      setMode(colorMode);

      //listen for system setting changes
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => onSelectMode(e.matches ? 'dark' : 'light'));
    } else {
      //stop listening for system setting changes and set the mode
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {});
      setMode(colorMode);
    }
  };

  //Callback, when the colorScheme changes in local storage
  const onModeUpdate = () => {
    setupColorSchemeListeners(localStorage.getItem('colorMode'));
  };

  useEffect(() => {
    //Listen for changes in local storage
    window.addEventListener('storage', onModeUpdate);
    setupColorSchemeListeners(colorMode);
    return () => {
      //Clean up listeners
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {});
      window.removeEventListener('storage', onModeUpdate);
    };
  }, []);

  // Setup dark/light mode when the page first renders
  colorMode === 'system'
    ? onSelectMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : setMode(colorMode);

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
