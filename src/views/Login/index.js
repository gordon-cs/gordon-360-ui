import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import GetAppIcon from '@material-ui/icons/GetApp';
import PWAInstructions from 'components/PWAInstructions/index';
import './login.css';
import { authenticate } from 'services/auth';
import storage from 'services/storage';
import session from 'services/session';
import GordonLogoVerticalWhite from './gordon-logo-vertical-white.svg';
import { projectName } from 'project-name';

import { Button, CircularProgress, TextField, Typography, Grid, Fab } from '@material-ui/core';

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
      openPWAInstructions: false,
      showPWALink: false,
      deferredPWAPrompt: null,
      network: 'online',
    };
  }

  componentDidMount() {
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
      this.setState({ error: err.message, loading: false });
    }
  }

  render() {
    return (
      <div className="login">
        <DocumentTitle title={`Login | ${projectName}`} />
        <Grid container direction="column" className="container">
          <img className="login-img" src={GordonLogoVerticalWhite} alt={`${projectName}`} />
          <form onSubmit={this.logIn}>
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
            />
            <Typography className="error" variant="body2" color="error">
              {this.state.error}
            </Typography>
            <Grid container justify="center">
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
            </Grid>
          </form>
        </Grid>

        {this.state.network === 'online' && this.state.showPWALink && (
          <Grid
            container
            justify="center"
            style={{ margin: '0.5rem' }}
            onClick={() => {
              this.setState({ openPWAInstructions: true });
            }}
          >
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Fab variant="extended" color="primary">
                <GetAppIcon />
                <Typography variant="subtitle1">Install Gordon 360</Typography>
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
      </div>
    );
  }
}

Login.propTypes = {
  onLogIn: PropTypes.func.isRequired,
};
