// TODO: When login page hang/refresh issue is solved, remove all code marked "Login Hang"

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import amber from '@material-ui/core/colors/amber'; // Login Hang

import './login.css';
import { authenticate } from '../../services/auth';
import storage from '../../services/storage';
import session from '../../services/session';
import GordonLogoVerticalWhite from './gordon-logo-vertical-white.svg';
import { gordonColors } from '../../theme';
import { projectName } from '../../project-name';

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
    };
  }

  componentWillMount() {
    this.isIE = false;
    this.isEdge = false;
    let ua = navigator.userAgent;
    if (ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident') > -1) {
      this.isIE = true;
    } else if (ua.indexOf('Edge') > -1) {
      this.isEdge = true;
    }
  }

  handleChange(prop) {
    return event => {
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
        // Sends a message, the token and current term code to the service worker to precache
        // dynamic files and start the update-cache timer
        navigator.serviceWorker.controller.postMessage({
          message: 'cache-static-dynamic-files',
          token: storage.get('token'),
          termCode: session.getTermCode(),
        });
        navigator.serviceWorker.controller.postMessage('start-cache-timer');
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
