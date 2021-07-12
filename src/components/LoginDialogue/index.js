import { Grid, Typography, TextField, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { authenticate } from 'services/auth';
import storage from 'services/storage';
import session from 'services/session';
import GordonLogoVerticalWhite from './gordon-logo-vertical-white.svg';
import GordonLoader from 'components/Loader';
import './loginDialogue.css';

// TODO: Eventually abstract this out to be a global login component to be called anywhere
const LoginDialogue = ({ onLogIn }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    <Grid container direction="column" className="loginDialogue">
      <img className="login-img" src={GordonLogoVerticalWhite} alt="Gordon Logo" />
      <form onSubmit={logIn}>
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
          variant="filled"
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
          variant="filled"
        />
        <Typography className="error" variant="body2" color="error">
          {error}
        </Typography>
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            className="submit-button"
            type="submit"
            color="primary"
            disabled={!username || !password || loading}
          >
            {loading ? <GordonLoader size={24} /> : 'Log in'}
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};
export default LoginDialogue;
