import {
  Button,
  CircularProgress,
  Fab,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DocumentTitle from 'react-document-title';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import PWAInstructions from '../../components/PWAInstructions/index';
import './login.css';
import { authenticate } from '../../services/auth';
import storage from '../../services/storage';
import session from '../../services/session';
import GordonLogoVerticalWhite from './gordon-logo-vertical-white.svg';
import { gordonColors } from '../../theme';
import { projectName } from '../../project-name';
import { useNetworkStatus } from '../../contexts/NetworkContext';

const Login = (props) => {
  const [isIE, setIsIE] = useState(false);
  const [isEdge, setIsEdge] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [openPWAInstructions, setOpenPWAInstructions] = useState(false);
  const [showPWALink, setShowPWALink] = useState(false);
  const [deferredPWAPrompt, setDeferredPWAPrompt] = useState(null);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    let ua = navigator.userAgent;
    if (ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident') > -1) {
      setIsIE(true);
    } else if (ua.indexOf('Edge') > -1) {
      setIsEdge(true);
    }

    // A window event listener to see if the browser has the PWA quick installation prompt available
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      setDeferredPWAPrompt(e);
    });

    // A window event listener to see if the PWA was installed
    window.addEventListener('appinstalled', (evt) => {
      // Exits out the PWA Installation dialog box if already opened
      setOpenPWAInstructions(false);
      setShowPWALink(false);
    });

    // A window event listener that checks to see if the page was loaded as an installed PWA
    // or through a regular browser. If it was loaded through Gordon 360's PWA, the install button
    // for Gordon 360 will not appear. Otherwise, it will
    window.addEventListener('DOMContentLoaded', () => {
      let loadedThroughPWA = false;
      if (navigator.standalone) {
        loadedThroughPWA = true;
      }
      if (window.matchMedia('(display-mode: standalone)').matches) {
        loadedThroughPWA = true;
      }
      if (loadedThroughPWA) {
        setShowPWALink(false);
        setOpenPWAInstructions(false);
      } else {
        setShowPWALink(true);
      }
    });

    return () => {
      // Removes all events listerners that were invoked in this component
      window.removeEventListener('beforeinstallprompt', () => {});
      window.removeEventListener('appinstalled', () => {});
      window.removeEventListener('DOMContentLoaded', () => {});
      window.removeEventListener('DOMContentLoaded', () => {});
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
        // Sends the token, current term code, and a message to the service worker to update
        // the cache
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
      props.onLogIn();
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  return (
    <Grid container alignItems="center" justify="center" spacing={0}>
      <DocumentTitle title={`Login | ${projectName}`} />
      <Grid className="container" item xs={12} sm={6} md={5} lg={4} xl={4}>
        <img className="login-img" src={GordonLogoVerticalWhite} alt={`${projectName}`} />
        <form onSubmit={logIn}>
          <Typography variant="subtitle1">Welcome to {projectName}!</Typography>
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
            InputProps={{
              classes: {
                input: 'input',
              },
            }}
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
            InputProps={{
              classes: {
                input: 'input',
              },
            }}
          />
          <Typography className="error" variant="body2" color="error">
            {error}
          </Typography>
          <section className="button-wrapper">
            <Button
              variant="contained"
              className="submit-button"
              type="submit"
              color="primary"
              disabled={!username || !password || loading}
            >
              {!loading && 'Log in'}
              {loading && <CircularProgress size={24} />}
            </Button>
          </section>
        </form>
      </Grid>
      {isOnline && showPWALink && (
        <Grid
          container
          xs={12}
          justify="center"
          style={{ margin: '0.5rem' }}
          onClick={() => setOpenPWAInstructions(true)}
        >
          <Grid xs={12} sm={6} md={5} lg={4} xl={4}>
            <Fab variant="extended" color="primary">
              <GetAppIcon />
              <Typography variant="subtitle1">&nbsp;Install Gordon 360</Typography>
            </Fab>
          </Grid>
        </Grid>
      )}
      {isOnline && showPWALink && openPWAInstructions && (
        <PWAInstructions
          open={openPWAInstructions}
          handleDisplay={() => setOpenPWAInstructions((o) => !o)}
          deferredPWAPrompt={deferredPWAPrompt}
        />
      )}

      <Snackbar /* Internet Explorer popup message */
        style={{ marginTop: '1rem' }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={isIE}
        onClose={handleCloseSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id',
          style: { backgroundColor: gordonColors.primary.cyan },
        }}
        message={
          <span id="message-id">
            Whoops! It looks like you're using Internet Explorer. Unfortunately, Gordon 360 doesn't
            support IE. Please use a modern browser like Chrome or Firefox. (We don't support Edge
            yet, but we hope to soon!)
          </span>
        }
        action={[
          <Button
            onClick={() => (window.location.href = 'https://www.google.com/chrome/')}
            style={{ color: 'white' }}
          >
            Get Chrome
          </Button>,
          <Button
            onClick={() => (window.location.href = 'https://www.mozilla.org/en-US/firefox/new/')}
            style={{ color: 'white' }}
          >
            Get Firefox
          </Button>,
          <IconButton key="close" aria-label="Close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
      <Snackbar /* Edge browser popup message */
        style={{ marginTop: '1rem' }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={isEdge}
        onClose={handleCloseSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id',
          style: { backgroundColor: gordonColors.primary.cyan },
        }}
        message={
          <span id="message-id">
            Whoops! It looks like you're using Edge. Unfortunately, Gordon 360 doesn't support Edge
            yet, but we hope to soon! In the meantime, please try Chrome or Firefox.
          </span>
        }
        action={[
          <Button
            onClick={() => (window.location.href = 'https://www.google.com/chrome/')}
            style={{ color: 'white' }}
          >
            Get Chrome
          </Button>,
          <Button
            onClick={() => (window.location.href = 'https://www.mozilla.org/en-US/firefox/new/')}
            style={{ color: 'white' }}
          >
            Get Firefox
          </Button>,
          <IconButton key="close" aria-label="Close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Grid>
  );
};

export default Login;

Login.propTypes = {
  onLogIn: PropTypes.func.isRequired,
};
