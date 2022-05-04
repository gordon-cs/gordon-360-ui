import { Button, Grid, TextField, Typography } from '@material-ui/core';
import GordonLoader from 'components/Loader';
import useUserActions from 'hooks/useUserActions';
import { useState } from 'react';
import GordonLogoVerticalWhite from './gordon-logo-vertical-white.svg';
import styles from './LoginDialogue.module.css';

// TODO: Eventually abstract this out to be a global login component to be called anywhere
const LoginDialogue = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUserActions();

  const logIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(username, password);
    } catch (err) {
      console.log(err);
      setError(err.message ?? err.error_description);
      setLoading(false);
    }
  };

  return (
    <Grid container direction="column" className={styles.loginDialogue}>
      <img className={styles.login_img} src={GordonLogoVerticalWhite} alt="Gordon Logo" />
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
        <Typography className={styles.error} variant="body2" color="error">
          {error}
        </Typography>
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            className={styles.submit_button}
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
