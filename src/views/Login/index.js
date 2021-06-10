import React, { useEffect, useState } from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { Button, CircularProgress, TextField, Typography, Grid, Fab } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import PWAInstructions from 'components/PWAInstructions/index';
import { authenticate } from 'services/auth';
import storage from 'services/storage';
import session from 'services/session';
import GordonLogoVerticalWhite from './gordon-logo-vertical-white.svg';
import { projectName } from 'project-name';
import useNetworkStatus from 'hooks/useNetworkStatus';
import './login.css';
import { ga } from 'react-ga';

const Login = ({ onLogIn }) => {
  const isOnline = useNetworkStatus();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openPWAInstructions, setOpenPWAInstructions] = useState(false);
  const [showPWALink, setShowPWALink] = useState(false);
  const [deferredPWAPrompt, setDeferredPWAPrompt] = useState();

  useEffect(() => {
    // A window event listener to see if the browser has the PWA quick installation prompt available
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      setDeferredPWAPrompt(e);
    });

    // A window event listener to see if the PWA was installed
    window.addEventListener('appinstalled', () => {
      // Exits out the PWA Installation dialog box if already opened
      setOpenPWAInstructions(false);
      setShowPWALink(false);
    });

    let displayMode;
    if (navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
      // if loaded through PWA
      displayMode = 'standalone';
      setShowPWALink(false);
      setOpenPWAInstructions(false);
    } else {
      // otherwise show install button for PWA
      displayMode = 'browser';
      setShowPWALink(true);
    }
    // Google Analytics to track PWA usage
    ga('set', 'dimension1', displayMode)

    // Removes all events listerners that were invoked in this component
    return function cleanupListener() {
      window.removeEventListener('beforeinstallprompt', () => {});
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  const logIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authenticate(username, password);

      /* Checks to see if the Service Worker API is available before attempting to access it
       *  This is important because if the API is not available, the site will load
       *  but not allow you to login due to the error "undefined is not a function"
       */
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        // Sends the token, current term code, and a message to the service worker to update cache
        navigator.serviceWorker.controller.postMessage({
          message: 'update-cache-files',
          token: storage.get('token'),
          termCode: session.getTermCode(),
        });
        // Stores the current term in Local Storage for later use when updating the cache
        storage.store('currentTerm', session.getTermCode());
        // Saves the network state as online in local storage
        localStorage.setItem('network-status', JSON.stringify('online'));
      }
      onLogIn();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <DocumentTitle title={`Login | ${projectName}`} />
      <Grid container direction="column" className="container">
        <img className="login-img" src={GordonLogoVerticalWhite} alt={`${projectName}`} />
        <form onSubmit={(e) => logIn(e)}>
          <TextField
            id="username"
            label="Username"
            placeholder="firstname.lastname"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            fullWidth
            autoFocus
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            fullWidth
          />
          <Typography className="error" variant="body2" color="error">
            {error}
          </Typography>
          <Grid container justify="center">
            <Button
              variant="contained"
              className="submit-button"
              type="submit"
              color="primary"
              disabled={!username || !password || loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Log in'}
            </Button>
          </Grid>
        </form>
      </Grid>

      {isOnline && showPWALink && (
        <Grid
          container
          justify="center"
          style={{ margin: '0.5rem' }}
          onClick={() => setOpenPWAInstructions(true)}
        >
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Fab variant="extended" color="primary">
              <GetAppIcon />
              <Typography variant="subtitle1">Install Gordon 360</Typography>
            </Fab>
          </Grid>
        </Grid>
      )}

      {isOnline && showPWALink && openPWAInstructions && (
        <PWAInstructions
          open={openPWAInstructions}
          handleDisplay={() => setOpenPWAInstructions(!openPWAInstructions)}
          deferredPWAPrompt={deferredPWAPrompt}
        />
      )}
    </div>
  );
};

Login.propTypes = {
  onLogIn: PropTypes.func.isRequired,
};

export default Login;
