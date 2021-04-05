import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import amber from '@material-ui/core/colors/amber'; // Login Hang
import PWAInstructions from '../../components/PWAInstructions/index';
import './login.css';
import { authenticate } from '../../services/auth';
import storage from '../../services/storage';
import session from '../../services/session';
import GordonLogoVerticalWhite from './gordon-logo-vertical-white.svg';
import { gordonColors } from '../../theme';
import { projectName } from '../../project-name';

import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  Grid,
  Snackbar,
  IconButton,
  Fab,
} from '@material-ui/core';

// To temporarily disable the Login Hang message, set this boolean to false
const LOGIN_BUG_MESSAGE = true; // Login Hang

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.logIn = this.logIn.bind(this);

    this.state = {
      error: null,
      loading: false,
      password: '',
      username: '',
      showMessageSnackbar: false, // Login Hang
      openPWAInstructions: false,
      showPWALink: false,
      deferredPWAPrompt: null,
      network: 'online',
    };
  }

  componentDidMount() {
    this.isIE = false;
    this.isEdge = false;
    let ua = navigator.userAgent;
    if (ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident') > -1) {
      this.isIE = true;
    } else if (ua.indexOf('Edge') > -1) {
      this.isEdge = true;
    }

    // A window event listener to see if the browser has the PWA quick installation prompt available
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      this.setState({ deferredPWAPrompt: e });
    });

    // A window event listener to see if the PWA was installed
    window.addEventListener('appinstalled', (evt) => {
      // Exits out the PWA Installation dialog box if already opened
      this.setState({ openPWAInstructions: false, showPWALink: false });
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
        this.setState({ showPWALink: false, openPWAInstructions: false });
      } else {
        this.setState({ showPWALink: true });
      }
    });

    /* Used to re-render PWA installation button. The PWA installation button should only show
     * when the user is online
     */
    window.addEventListener('message', (event) => {
      if (
        event.data === 'online' &&
        this.state.network === 'offline' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'online' });
      } else if (
        event.data === 'offline' &&
        this.state.network === 'online' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'offline' });
      }
    });

    let network;
    /* Attempts to get the network status from local storage.
     * If not found, the default value is online
     */
    try {
      network = storage.get('network-status');
    } catch (error) {
      // Defaults the network to online if not found in local storage
      network = 'online';
    }
    // Saves the network's status to this component's state
    this.setState({ network });
  }

  componentWillUnmount() {
    // Removes all events listerners that were invoked in this component
    window.removeEventListener('beforeinstallprompt', () => {});
    window.removeEventListener('appinstalled', () => {});
    window.removeEventListener('DOMContentLoaded', () => {});
    window.removeEventListener('DOMContentLoaded', () => {});
  }

  handleChange(prop) {
    return (event) => {
      this.setState({ [prop]: event.target.value });
    };
  }

  async logIn(event) {
    event.preventDefault();
    this.setState({ loading: true, error: null });

    // Login Hang
    var id;
    if (LOGIN_BUG_MESSAGE)
      id = setTimeout(() => {
        this.setState({ showMessageSnackbar: true });
      }, 6000);
    // Login Hang

    try {
      await authenticate(this.state.username, this.state.password);

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
      this.props.onLogIn();
    } catch (err) {
      clearTimeout(id); // Login Hang
      this.setState({ showMessageSnackbar: false });
      this.setState({ error: err.message, loading: false });
    }
  }

  //Temp Login Hang Fix - remove when reason for error addressed
  handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ showMessageSnackbar: false });
  }

  render() {
    return (
      <Grid container alignItems="center" justify="center" spacing={0}>
        <DocumentTitle title={`Login | ${projectName}`} />
        <Grid className="container" item xs={12} sm={6} md={5} lg={4} xl={4}>
          <img className="login-img" src={GordonLogoVerticalWhite} alt={`${projectName}`} />
          <form onSubmit={this.logIn}>
            <Typography variant="subtitle1">Welcome to {projectName}!</Typography>
            <TextField
              id="username"
              label="Username"
              placeholder="firstname.lastname"
              autoComplete="username"
              value={this.state.username}
              onChange={this.handleChange('username')}
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
              value={this.state.password}
              onChange={this.handleChange('password')}
              margin="normal"
              fullWidth
              InputProps={{
                classes: {
                  input: 'input',
                },
              }}
            />
            <Typography className="error" variant="body2" color="error">
              {this.state.error}
            </Typography>
            <section className="button-wrapper">
              <Button
                variant="contained"
                className="submit-button"
                type="submit"
                color="primary"
                disabled={!this.state.username || !this.state.password || this.state.loading}
              >
                {!this.state.loading && 'Log in'}
                {this.state.loading && <CircularProgress size={24} />}
              </Button>
            </section>
          </form>
        </Grid>
        {this.state.network === 'online' && this.state.showPWALink && (
          <Grid
            container
            xs={12}
            justify="center"
            style={{ margin: '0.5rem' }}
            onClick={() => {
              this.setState({ openPWAInstructions: true });
            }}
          >
            <Grid xs={12} sm={6} md={5} lg={4} xl={4}>
              <Fab variant="extended" color="primary">
                <GetAppIcon />
                <Typography variant="subtitle1">&nbsp;Install Gordon 360</Typography>
              </Fab>
            </Grid>
          </Grid>
        )}
        {this.state.network === 'online' &&
          this.state.showPWALink &&
          this.state.openPWAInstructions && (
            <PWAInstructions
              open={this.state.openPWAInstructions}
              handleDisplay={() => {
                this.setState({ openPWAInstructions: !this.state.openPWAInstructions });
              }}
              deferredPWAPrompt={this.state.deferredPWAPrompt}
            />
          )}

        {LOGIN_BUG_MESSAGE && (
          <Snackbar /* Login Hang [START of section; remove everything from here to END] */
            style={{ marginTop: '1rem' }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={this.state.showMessageSnackbar}
            onClose={this.handleCloseSnackbar.bind(this)}
            ContentProps={{
              'aria-describedby': 'message-id',
              style: { backgroundColor: amber[700] },
            }}
            message={
              <span id="message-id">
                Whoops! It looks like our login page has frozen. This happens occasionally, and
                we're working to fix it.
                <b> Please refresh your browser page</b>. Sorry for the inconvenience, and thank you
                for your patience!
              </span>
            }
            action={[
              <Button onClick={() => window.location.reload()} style={{ color: 'white' }}>
                Refresh
              </Button>,
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleCloseSnackbar.bind(this)}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        )}

        {/* Login Hang [END of section] */}
        <Snackbar /* Internet Explorer popup message */
          style={{ marginTop: '1rem' }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.isIE}
          onClose={this.handleCloseSnackbar.bind(this)}
          ContentProps={{
            'aria-describedby': 'message-id',
            style: { backgroundColor: gordonColors.primary.cyan },
          }}
          message={
            <span id="message-id">
              Whoops! It looks like you're using Internet Explorer. Unfortunately, Gordon 360
              doesn't support IE. Please use a modern browser like Chrome or Firefox. (We don't
              support Edge yet, but we hope to soon!)
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
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseSnackbar.bind(this)}
            >
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
          open={this.isEdge}
          onClose={this.handleCloseSnackbar.bind(this)}
          ContentProps={{
            'aria-describedby': 'message-id',
            style: { backgroundColor: gordonColors.primary.cyan },
          }}
          message={
            <span id="message-id">
              Whoops! It looks like you're using Edge. Unfortunately, Gordon 360 doesn't support
              Edge yet, but we hope to soon! In the meantime, please try Chrome or Firefox.
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
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseSnackbar.bind(this)}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Grid>
    );
  }
}

Login.propTypes = {
  onLogIn: PropTypes.func.isRequired,
};
