import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';

import './login.css';
import { authenticate } from '../../services/auth';
import GordonLogoVerticalWhite from './gordon-logo-vertical-white.svg';

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
    };
  }
  handleChange(prop) {
    return event => {
      this.setState({ [prop]: event.target.value });
    };
  }
  async logIn(event) {
    event.preventDefault();
    this.setState({ loading: true, error: null });
    try {
      await authenticate(this.state.username, this.state.password);
      this.props.onLogIn();
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  }
  render() {
    return (
      <Grid className="gordon-login" container alignItems="center" justify="center" spacing={0}>
        <DocumentTitle title="Login | Gordon 360" />
        <Grid className="container" item xs={12} sm={6} md={5} lg={4} xl={4}>
          <img src={GordonLogoVerticalWhite} alt="Gordon 360" />
          <form onSubmit={this.logIn}>
            <Typography type="subheading">Log in to Gordon 360</Typography>
            <TextField
              label="Username"
              placeholder="firstname.lastname"
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
            <Typography className="error" type="body1" color="error">
              {this.state.error}
            </Typography>
            <section className="button-wrapper">
              <Button
                className="submit-button"
                type="submit"
                raised
                color="primary"
                disabled={!this.state.username || !this.state.password || this.state.loading}
              >
                {!this.state.loading && 'Log in'}
                {this.state.loading && <CircularProgress size={24} />}
              </Button>
            </section>
          </form>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  onLogIn: PropTypes.func.isRequired,
};
