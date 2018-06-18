import React from 'react';

import FacebookIcon from 'react-icons/lib/fa/facebook';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import LinkedInIcon from 'react-icons/lib/fa/linkedin';
import InstagramIcon from 'react-icons/lib/fa/instagram';

import { DialogContent, DialogActions } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import user from '../../../../services/user';

export default class LinksDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {
        facebookInput: '',
        twitterInput: '',
        linkedinInput: '',
        instagramInput: '',
      },
      formErrors: {
        facebookInput: '',
        twitterInput: '',
        linkedinInput: '',
        instagramInput: '',
      },
      fbValid: true,
      twValid: true,
      liValid: true,
      igValid: true,
      formValid: true,
    };
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let fbValid = this.state.fbValid;
    let twValid = this.state.twValid;
    let liValid = this.state.liValid;
    let igValid = this.state.igValid;

    switch (fieldName) {
      case 'facebookInput':
        fbValid = value === '' || value.indexOf('https://www.facebook.com/') === 0;
        fieldValidationErrors.facebookInput = fbValid ? '' : 'Not a valid facebook link';
        break;
      case 'twitterInput':
        twValid = value === '' || value.indexOf('https://www.twitter.com/') === 0;
        fieldValidationErrors.twitterInput = twValid ? '' : 'Not a valid twitter link';
        break;
      case 'linkedinInput':
        liValid = value === '' || value.indexOf('https://www.linkedin.com/') === 0;
        fieldValidationErrors.linkedinInput = liValid ? '' : 'Not a valid linkedIn link';
        break;
      case 'instagramInput':
        igValid = value === '' || value.indexOf('https://www.instagram.com/') === 0;
        fieldValidationErrors.instagramInput = igValid ? '' : 'Not a valid instagram link';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        fbValid: fbValid,
        twValid: twValid,
        liValid: liValid,
        igValid: igValid,
      },
      this.validateForm,
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.fbValid && this.state.twValid && this.state.liValid && this.state.igValid,
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    var fb = this.state.facebookInput;
    var tw = this.state.twitterInput;
    var li = this.state.linkedinInput;
    var ig = this.state.instagramInput;

    this.props.onLinksChange(fb, tw, li, ig);
    this.handleClose();
  };

  handleChange = name => e => {
    let value = e.target.value;
    this.setState({ [name]: e.target.value }, () => {
      this.validateField(name, value);
    });
  };

  handleClose = () => {
    this.props.handleSocialLinksDialogClose();

    if (!this.state.fbValid) {
      this.setState({
        facebookInput: '',
        fbValid: true,
      });
    }
    if (!this.state.twValid) {
      this.setState({
        twitterInput: '',
        twValid: true,
      });
    }
    if (!this.state.liValid) {
      this.setState({
        linkedinInput: '',
        liValid: true,
      });
    }
    if (!this.state.igValid) {
      this.setState({
        instagramInput: '',
        igValid: true,
      });
    }
    this.setState({ formValid: true });
  };

  render() {
    const button = {
      background: '#00AEEF',
      color: 'white',
    };

    return (
      <DialogContent>
        <form onSubmit={this.handleSubmit}>
          <Typography style={{ color: 'red' }}>{this.state.formErrors.facebookInput}</Typography>
          <Grid item>
            <FacebookIcon alignItems="center" />
            <TextField
              id="facebookInput"
              label=" Facebook link"
              value={this.state.facebookInput}
              onChange={this.handleChange('facebookInput')}
              error={!this.state.fbValid}
            />
          </Grid>
          <Grid item>
            <TwitterIcon alignItems="center" />
            <TextField
              id="twitterInput"
              label=" Twitter link"
              value={this.state.twitterInput}
              onChange={this.handleChange('twitterInput')}
              error={!this.state.twValid}
            />
          </Grid>
          <Grid item>
            <LinkedInIcon alignItems="center" />
            <TextField
              id="linkedInInput"
              label=" LinkedIn link"
              value={this.state.linkedinInput}
              onChange={this.handleChange('linkedinInput')}
              error={!this.state.liValid}
            />
          </Grid>
          <Grid item>
            <InstagramIcon alignItems="center" />
            <TextField
              id="instagramInput"
              label=" Instagram link"
              value={this.state.instagramInput}
              onChange={this.handleChange('instagramInput')}
              error={!this.state.igValid}
            />
          </Grid>
          <br />
          <DialogActions>
            <Button onClick={this.handleClose} raised style={button}>
              Cancel
            </Button>
            <Button type="submit" disabled={!this.state.formValid} raised style={button}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    );
  }
}
