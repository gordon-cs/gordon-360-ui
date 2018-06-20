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
      facebookInput: '',
      twitterInput: '',
      linkedInInput: '',
      instagramInput: '',
      formErrors: {
        facebookInput: '',
        twitterInput: '',
        linkedInInput: '',
        instagramInput: '',
      },
      fbValid: true,
      twValid: true,
      liValid: true,
      igValid: true,
      formValid: true,
    };
  }

  // Update local state as parent state changes
  componentWillReceiveProps(nextProps) {
    if (nextProps.facebookLink !== this.props.facebookLink) {
      this.setState({ facebookInput: nextProps.facebookLink });
    }
    if (nextProps.twitterLink !== this.props.twitterLink) {
      this.setState({ twitterInput: nextProps.twitterLink });
    }
    if (nextProps.linkedInLink !== this.props.linkedInLink) {
      if (this.props.linkedInLink === undefined) {
        this.setState({ linkedInInput: '' });
      } else {
        this.setState({ linkedInInput: nextProps.linkedInLink });
      }
    }
    if (nextProps.instagramLink !== this.props.instagramLink) {
      this.setState({ instagramInput: nextProps.instagramLink });
    }
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let fbValid = this.state.fbValid;
    let twValid = this.state.twValid;
    let liValid = this.state.liValid;
    let igValid = this.state.igValid;

    // Require that content begins with appropriate domain name if not empty
    switch (fieldName) {
      case 'facebookInput':
        fbValid = value === '' || value.indexOf('https://www.facebook.com/') === 0;
        fieldValidationErrors.facebookInput = fbValid ? '' : 'Not a valid facebook link';
        break;
      case 'twitterInput':
        twValid = value === '' || value.indexOf('https://twitter.com/') === 0;
        fieldValidationErrors.twitterInput = twValid ? '' : 'Not a valid twitter link';
        break;
      case 'linkedInInput':
        liValid = value === '' || value.indexOf('https://www.linkedin.com/') === 0;
        fieldValidationErrors.linkedInInput = liValid ? '' : 'Not a valid linkedIn link';
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
    var li = this.state.linkedInInput;
    var ig = this.state.instagramInput;

    this.props.onDialogSubmit(fb, tw, li, ig);
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

    // Reset changed fields
    if (this.state.facebookInput !== this.props.facebookLink) {
      this.setState({
        facebookInput: this.props.facebookLink,
        fbValid: true,
        formErrors: { facebookInput: '' },
      });
    }
    if (this.state.twitterInput !== this.props.twitterLink) {
      this.setState({
        twitterInput: this.props.twitterLink,
        twValid: true,
        formErrors: { twitterInput: '' },
      });
    }
    if (this.state.linkedInInput !== this.props.linkedInLink) {
      this.setState({
        linkedInInput: this.props.linkedInLink,
        liValid: true,
        formErrors: { linkedInInput: '' },
      });
    }
    if (this.state.instagramInput !== this.props.instagramLink) {
      this.setState({
        instagramInput: this.props.instagramLink,
        igValid: true,
        formErrors: { instagramInput: '' },
      });
    }
    this.setState({ formValid: true });
  };

  render() {
    const button = {
      background: '#00AEEF', //Gordon color: cyan. Couldn't figure out how to import themes file.
      color: 'white',
    };

    return (
      <DialogContent>
        <form onSubmit={this.handleSubmit}>
          <Typography style={{ color: 'red' }}>
            {this.state.formErrors.facebookInput}
            {this.state.formErrors.twitterInput}
            {this.state.formErrors.linkedInInput}
            {this.state.formErrors.instagramInput}
          </Typography>
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
              value={this.state.linkedInInput}
              onChange={this.handleChange('linkedInInput')}
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
