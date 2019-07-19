import React from 'react';

import { FaFacebookF, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
// see socialMedia.js for pre-packaged icons of above and fix
import {
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core';
import { socialMediaInfo } from '../../../../socialMedia';
import { gordonColors } from '../../../../theme';

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

    let facebook = socialMediaInfo.facebook;
    let twitter = socialMediaInfo.twitter;
    let linkedIn = socialMediaInfo.linkedIn;
    let instagram = socialMediaInfo.instagram;

    // Require that content begins with appropriate domain name if not empty
    switch (fieldName) {
      case 'facebookInput':
        fbValid = value === '' || value.indexOf(facebook.prefix) === 0;
        fieldValidationErrors.facebookInput = fbValid ? '' : facebook.error;
        break;
      case 'twitterInput':
        twValid = value === '' || value.indexOf(twitter.prefix) === 0;
        fieldValidationErrors.twitterInput = twValid ? '' : twitter.error;
        break;
      case 'linkedInInput':
        liValid = value === '' || value.indexOf(linkedIn.prefix) === 0;
        fieldValidationErrors.linkedInInput = liValid ? '' : linkedIn.error;
        break;
      case 'instagramInput':
        igValid = value === '' || value.indexOf(instagram.prefix) === 0;
        fieldValidationErrors.instagramInput = igValid ? '' : instagram.error;
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
    this.props.handleSocialLinksClose();

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
      background: gordonColors.primary.cyan,
      color: 'white',
    };

    return (
      <div className="gc360-links-dialog">
        <DialogTitle className="gc360-links-dialog_title">Edit your social media links</DialogTitle>
        <DialogContent className="gc360-links-dialog_content">
          <DialogContentText className="gc360-links-dialog_content_text">
            Copy and paste your links below
          </DialogContentText>
          {/* <form
            onSubmit={this.handleSubmit}
            style={{ paddingLeft: '1.5rem', marginBottom: '-0.75rem', marginTop: '-1.5rem' }}
          > */}
          <div className="gc360-links-dialog_content_form">
            <div className="gc360-links-dialog_content_form_facebook">
              <div className="gc360-links-dialog_content_form_icon">
                <FaFacebookF style={{ fontSize: '20px' }} />
              </div>
              <div className="gc360-links-dialog_content_form_field">
                <TextField
                  id="facebookInput"
                  label=" Facebook link"
                  value={this.state.facebookInput}
                  onChange={this.handleChange('facebookInput')}
                  error={!this.state.fbValid}
                  helperText={this.state.fbValid ? '' : this.state.formErrors.facebookInput}
                  margin="dense"
                  fullWidth
                />
              </div>
            </div>
            <div className="gc360-links-dialog_content_form_twitter">
              <div className="gc360-links-dialog_content_form_icon">
                <FaTwitter style={{ fontSize: '20px' }} />
              </div>
              <div className="gc360-links-dialog_content_form_field">
                <TextField
                  id="twitterInput"
                  label=" Twitter link"
                  value={this.state.twitterInput}
                  onChange={this.handleChange('twitterInput')}
                  error={!this.state.twValid}
                  helperText={this.state.twValid ? '' : this.state.formErrors.twitterInput}
                  margin="dense"
                  fullWidth
                />
              </div>
            </div>
            <div className="gc360-links-dialog_content_form_linkedin">
              <div className="gc360-links-dialog_content_form_icon">
                <FaLinkedin style={{ fontSize: '20px' }} />
              </div>
              <div className="gc360-links-dialog_content_form_field">
                <TextField
                  id="linkedInInput"
                  label=" LinkedIn link"
                  value={this.state.linkedInInput}
                  onChange={this.handleChange('linkedInInput')}
                  error={!this.state.liValid}
                  helperText={this.state.liValid ? '' : this.state.formErrors.linkedInInput}
                  margin="dense"
                  fullWidth
                />
              </div>
            </div>
            <div className="gc360-links-dialog_content_form_instagram">
              <div className="gc360-links-dialog_content_form_icon">
                <FaInstagram style={{ fontSize: '20px' }} />
              </div>
              <div className="gc360-links-dialog_content_form_field">
                <TextField
                  id="instagramInput"
                  label=" Instagram link"
                  value={this.state.instagramInput}
                  onChange={this.handleChange('instagramInput')}
                  error={!this.state.igValid}
                  helperText={this.state.igValid ? '' : this.state.formErrors.instagramInput}
                  margin="dense"
                  fullWidth
                />
              </div>
            </div>
          </div>
          {/* </form> */}
        </DialogContent>
        <DialogActions className=".gc360-links-dialog_actions">
          <Button onClick={this.handleClose} variant="contained" style={button}>
            Cancel
          </Button>
          <Button
            onClick={this.handleSubmit}
            type="submit"
            disabled={!this.state.formValid}
            variant="contained"
            style={button}
          >
            Submit
          </Button>
        </DialogActions>
      </div>
    );
  }
}
