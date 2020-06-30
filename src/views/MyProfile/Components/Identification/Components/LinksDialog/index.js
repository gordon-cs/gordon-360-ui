import React from 'react';

import { FaFacebookF, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
// see socialMedia.js for pre-packaged icons of above and fix
import {
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
} from '@material-ui/core';
import { socialMediaInfo } from '../../../../../../socialMedia';
import { gordonColors } from '../../../../../../theme';
import './linksDialog.css';

export default class LinksDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      facebookInput: this.props.facebookLink || '',
      twitterInput: this.props.twitterLink || '',
      linkedInInput: this.props.linkedInLink || '',
      instagramInput: this.props.instagramLink || '',
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
      formValid: false,
      formHasDifferentLinks: false,
      updatedLinks: {
        facebook: false,
        twitter: false,
        linkedIn: false,
        instagram: false,
      },
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

  /**
   * Checks to see if a social media link is valid
   *
   * @param {String} fieldName The social media platform to validate
   * @param {String} value The new updated link provided by the user
   */
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

  /**
   * Validates that a change of any social media links has been made which determines if the
   * submit button should be visible or hidden
   */
  validateForm() {
    this.setState(
      {
        formValid:
          this.state.fbValid && this.state.twValid && this.state.liValid && this.state.igValid,
      },
      () => {
        // If the form is valid and the links changed, display the submit button
        if (
          this.state.formValid &&
          (this.props.facebookLink !== this.state.facebookInput ||
            this.props.twitterLink !== this.state.twitterInput ||
            this.props.linkedInLink !== this.state.linkedInInput ||
            this.props.instagramLink !== this.state.instagramInput)
        ) {
          this.setState({
            formHasDifferentLinks: true,
            updatedLinks: {
              facebook: this.props.facebookLink !== this.state.facebookInput,
              twitter: this.props.twitterLink !== this.state.twitterInput,
              linkedIn: this.props.linkedInLink !== this.state.linkedInInput,
              instagram: this.props.instagramLink !== this.state.instagramInput,
            },
          });
        }
        // If the form is invalid or the links didn't change
        else {
          this.setState({
            formHasDifferentLinks: false,
            updatedLinks: { facebook: false, twitter: false, linkedIn: false, instagram: false },
          });
        }
      },
    );
  }

  /**
   * Handles the submission of new Social Media links
   *
   * @param {Event} e The event of the Submit button being clicked
   */
  handleSubmit = e => {
    e.preventDefault();

    var fb = this.state.facebookInput;
    var tw = this.state.twitterInput;
    var li = this.state.linkedInInput;
    var ig = this.state.instagramInput;

    this.props.onDialogSubmit(fb, tw, li, ig);
    this.handleClose();
  };

  /**
   * Handles the text inputs of the Social Media Dialog Box
   *
   * @param {String} name The name of the Social Media type to be updated
   * @param {Event} event The event of a text input changing
   */
  handleChange = (name, event) => {
    let value = event.target.value;
    this.setState({ [name]: event.target.value }, () => {
      this.validateField(name, value);
    });
  };

  /**
   * Handles closing the Social Media Dialog Box
   */
  handleClose = () => {
    this.props.handleSocialLinksClose();
  };

  render() {
    const style = {
      icon: {
        fontSize: '26px',
        color: gordonColors.primary.blue,
      },
      cancelButton: {
        backgroundColor: 'white',
        border: `1px solid ${gordonColors.primary.blue}`,
        color: gordonColors.primary.blue,
      },
      submitButton: {
        backgroundColor: gordonColors.primary.blue,
        color: 'white',
      },
    };

    return (
      <div className="gc360-links-dialog">
        <DialogTitle className="gc360-links-dialog_title">Social Media Links</DialogTitle>
        <DialogContent className="gc360-links-dialog_content">
          <Typography variant="body2" className="gc360-links-dialog_content_text">
            Place or Edit your links below. When done, click Submit
          </Typography>
          <div className="gc360-links-dialog_content_facebook gc360-links-dialog_content_media">
            <div className="gc360-links-dialog_content_icon">
              <FaFacebookF style={style.icon} />
            </div>
            <TextField
              color={gordonColors.primary.blue}
              id="facebookInput"
              label={this.state.updatedLinks.facebook ? 'Facebook (Updated)' : 'Facebook Link'}
              value={this.state.facebookInput}
              onChange={event => {
                this.handleChange('facebookInput', event);
              }}
              error={!this.state.fbValid}
              helperText={this.state.fbValid ? '' : this.state.formErrors.facebookInput}
              margin="dense"
              fullWidth
              multiline
              className="gc360-links-dialog_content_field"
            />
          </div>
          <div className="gc360-links-dialog_content_twitter gc360-links-dialog_content_media">
            <div className="gc360-links-dialog_content_icon">
              <FaTwitter style={style.icon} />
            </div>
            <TextField
              color={gordonColors.primary.blue}
              id="twitterInput"
              label={this.state.updatedLinks.twitter ? 'Twitter (Updated)' : 'Twitter Link'}
              value={this.state.twitterInput}
              onChange={event => {
                this.handleChange('twitterInput', event);
              }}
              error={!this.state.twValid}
              helperText={this.state.twValid ? '' : this.state.formErrors.twitterInput}
              margin="dense"
              fullWidth
              multiline
              className="gc360-links-dialog_content_field"
            />
          </div>
          <div className="gc360-links-dialog_content_linkedin gc360-links-dialog_content_media">
            <div className="gc360-links-dialog_content_icon">
              <FaLinkedin style={style.icon} />
            </div>
            <TextField
              color={gordonColors.primary.blue}
              id="linkedInInput"
              label={this.state.updatedLinks.linkedIn ? 'LinkedIn (Updated)' : 'LinkedIn Link'}
              value={this.state.linkedInInput}
              onChange={event => {
                this.handleChange('linkedInInput', event);
              }}
              error={!this.state.liValid}
              helperText={this.state.liValid ? '' : this.state.formErrors.linkedInInput}
              margin="dense"
              fullWidth
              multiline
              className="gc360-links-dialog_content_field"
            />
          </div>
          <div className="gc360-links-dialog_content_instagram gc360-links-dialog_content_media">
            <div className="gc360-links-dialog_content_icon">
              <FaInstagram style={style.icon} />
            </div>
            <TextField
              color={gordonColors.primary.blue}
              id="instagramInput"
              label={this.state.updatedLinks.instagram ? 'Instagram (Updated)' : 'Instagram Link'}
              value={this.state.instagramInput}
              onChange={event => {
                this.handleChange('instagramInput', event);
              }}
              error={!this.state.igValid}
              helperText={this.state.igValid ? '' : this.state.formErrors.instagramInput}
              margin="dense"
              fullWidth
              multiline
              className="gc360-links-dialog_content_field"
            />
          </div>
        </DialogContent>
        <DialogActions className="gc360-links-dialog_actions">
          <Button onClick={this.handleClose} variant="contained" style={style.cancelButton}>
            Cancel
          </Button>
          {this.state.formHasDifferentLinks && (
            <Button
              onClick={this.handleSubmit}
              type="submit"
              variant="contained"
              style={style.submitButton}
            >
              Submit
            </Button>
          )}
        </DialogActions>
      </div>
    );
  }
}
