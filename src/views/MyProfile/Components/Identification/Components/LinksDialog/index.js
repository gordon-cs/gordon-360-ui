import React from 'react';
import user from './../../../../../../services/user';
import { FaFacebookF, FaTwitter, FaLinkedin, FaInstagram, FaHandshake } from 'react-icons/fa';
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
      facebook: this.props.facebookLink || '',
      twitter: this.props.twitterLink || '',
      linkedIn: this.props.linkedInLink || '',
      instagram: this.props.instagramLink || '',
      handshake: this.props.handshakeLink || '',
      formErrors: {
        facebook: '',
        twitter: '',
        linkedIn: '',
        instagram: '',
        handshake: '',
      },
      fbValid: true,
      twValid: true,
      liValid: true,
      igValid: true,
      hsValid: true,
      formValid: false,
      formHasDifferentLinks: false,
      updatedLinks: {
        facebook: false,
        twitter: false,
        linkedIn: false,
        instagram: false,
        handshake: false,
      },
      updatingFailedLinks: {
        facebook: false,
        twitter: false,
        linkedIn: false,
        instagram: false,
        handshake: false,
      },
    };
  }

  // Update local state as parent state changes
  componentWillReceiveProps(nextProps) {
    if (nextProps.facebookLink !== this.props.facebookLink) {
      this.setState({ facebook: nextProps.facebookLink });
    }
    if (nextProps.twitterLink !== this.props.twitterLink) {
      this.setState({ twitter: nextProps.twitterLink });
    }
    if (nextProps.linkedInLink !== this.props.linkedInLink) {
      if (this.props.linkedInLink === undefined) {
        this.setState({ linkedIn: '' });
      } else {
        this.setState({ linkedIn: nextProps.linkedInLink });
      }
    }
    if (nextProps.instagramLink !== this.props.instagramLink) {
      this.setState({ instagram: nextProps.instagramLink });
    }
    if (nextProps.handshakeLink !== this.props.handshakeLink) {
      this.setState({ handshake: nextProps.handshakeLink });
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
    let hsValid = this.state.hsValid;

    let facebook = socialMediaInfo.facebook;
    let twitter = socialMediaInfo.twitter;
    let linkedIn = socialMediaInfo.linkedIn;
    let instagram = socialMediaInfo.instagram;
    let handshake = socialMediaInfo.handshake;

    // Require that content begins with appropriate domain name if not empty
    switch (fieldName) {
      case 'facebook':
        fbValid = value === '' || value.indexOf(facebook.prefix) === 0;
        fieldValidationErrors.facebook = fbValid ? '' : facebook.error;
        break;
      case 'twitter':
        twValid = value === '' || value.indexOf(twitter.prefix) === 0;
        fieldValidationErrors.twitter = twValid ? '' : twitter.error;
        break;
      case 'linkedIn':
        liValid = value === '' || value.indexOf(linkedIn.prefix) === 0;
        fieldValidationErrors.linkedIn = liValid ? '' : linkedIn.error;
        break;
      case 'instagram':
        igValid = value === '' || value.indexOf(instagram.prefix) === 0;
        fieldValidationErrors.instagram = igValid ? '' : instagram.error;
        break;
      case 'handshake':
        // hard coded a second prefix in because handshake supports 'app.' and 'gordon.' addresses
        // I know, the hard coding hurts me too.
        hsValid = value === '' || value.indexOf(handshake.prefix) === 0
                               || value.indexOf("https://app.joinhandshake.com/users/") === 0;
        fieldValidationErrors.handshake = hsValid ? '' : handshake.error;
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
        hsValid: hsValid,
      },
      () => {
        this.validateForm(fieldName);
      },
    );
  }

  /**
   * Validates that a change of any social media links has been made which determines if the
   * submit button should be visible or hidden
   * @param {String} platform The social media platform
   */
  validateForm(platform) {
    // Resets the state that determines if any links have changed
    this.setState(prevState => ({
      updatedLinks: { ...prevState.updatedLinks, [platform]: false },
      updatingFailedLinks: { ...prevState.updatingFailedLinks, [platform]: false },
    }));

    // Determines if any links has changed
    this.setState(
      {
        formValid:
          this.state.fbValid && this.state.twValid && this.state.liValid && this.state.igValid && this.state.hsValid,
      },
      () => {
        // If the form is valid and the links changed
        if (
          this.state.formValid &&
          (this.props.facebookLink !== this.state.facebook ||
            this.props.twitterLink !== this.state.twitter ||
            this.props.linkedInLink !== this.state.linkedIn ||
            this.props.instagramLink !== this.state.instagram ||
            this.props.handshakeLink !== this.state.handshake)
        ) {
          this.setState({
            formHasDifferentLinks: true,
            updatedLinks: {
              facebook: this.props.facebookLink !== this.state.facebook,
              twitter: this.props.twitterLink !== this.state.twitter,
              linkedIn: this.props.linkedInLink !== this.state.linkedIn,
              instagram: this.props.instagramLink !== this.state.instagram,
              handshake: this.props.handshakeLink !== this.state.handshake,
            },
          });
        }
        // If the form is invalid or the links didn't change
        else {
          this.setState({
            formHasDifferentLinks: false,
            updatedLinks: { facebook: false, twitter: false, linkedIn: false, instagram: false, handshake: false },
          });
        }
      },
    );
  }

  /**
   * Handles the submission of the Social Media links
   *
   * @param {String} fb The inputed Facebook link
   * @param {String} tw The inputed Twitter link
   * @param {String} li The inputed LinkedIn link
   * @param {String} ig The inputed Instagram link
   * @param {String} hs The inputed Handshake link
   */
  async onDialogSubmit(fb, tw, li, ig, hs) {
    let allPassed = true, // Used to determine if all links updated successfully
      responses = [], // Used to hold the fetch response of each link update
      numOfFailedLinks = 0; // Used to calculate the number of links that failed to update

    // Checks to see if any links updated. If so, attempts to push update to database
    if (fb !== this.props.facebookLink) {
      responses.push({
        input: 'facebook',
        oldLink: this.props.facebookLink,
        platform: 'facebook',
        value: await user.updateSocialLink('facebook', fb),
      });
    }
    if (tw !== this.props.twitterLink) {
      responses.push({
        input: 'twitter',
        oldLink: this.props.twitterLink,
        platform: 'twitter',
        value: await user.updateSocialLink('twitter', tw),
      });
    }
    if (li !== this.props.linkedInLink) {
      responses.push({
        input: 'linkedIn',
        oldLink: this.props.linkedInLink,
        platform: 'linkedIn',
        value: await user.updateSocialLink('linkedin', li),
      });
    }
    if (ig !== this.props.instagramLink) {
      responses.push({
        input: 'instagram',
        oldLink: this.props.instagramLink,
        platform: 'instagram',
        value: await user.updateSocialLink('instagram', ig),
      });
    }
    if (hs !== this.props.handshakeLink) {
      responses.push({
        input: 'handshake',
        oldLink: this.props.handshakeLink,
        platform: 'handshake',
        value: await user.updateSocialLink('handshake', hs),
      });
    }

    // Resets the list of failed updating links
    this.setState({
      updatingFailedLinks: {
        facebook: false,
        twitter: false,
        linkedIn: false,
        instagram: false,
        handshake: false,
      },
    });

    // Parses through each response and sees if they all passed
    responses.forEach(response => {
      /**
       *  If Response Failed - Sets allPassed to false, updates the number of links failed, and sets
       * the link of the specified platform back to it's original
       */
      if (response.value === undefined) {
        allPassed = false;
        numOfFailedLinks += 1;
        this.setState(prevState => ({
          // Resets the variable that shows the platform as updating
          updatingLinks: {
            ...prevState.updatingLinks,
            [response.platform]: false,
          },
          // Saves the platform as a failed attempt to update
          updatingFailedLinks: {
            ...prevState.updatingFailedLinks,
            [response.platform]: true,
          },
        }));
      } else {
        /**
         * If Response Passed - Updates the link in the Identification Card to display the social
         * media icon with the updated link. Also, resets all variables that shows the link has updated
         */
        if (response.platform === 'facebook') this.props.setFacebookLink(fb);
        else if (response.platform === 'twitter') this.props.setTwitterLink(tw);
        else if (response.platform === 'linkedIn') this.props.setLinkedInLink(li);
        else if (response.platform === 'instagram') this.props.setInstagramLink(ig);
        else if (response.platform === 'handshake') this.props.setHandshakeLink(hs);
        this.setState(prevState => ({
          updatedLinks: {
            ...prevState.updatedLinks,
            [response.platform]: false,
          },
          updatingFailedLinks: {
            ...prevState.updatingFailedLinks,
            [response.platform]: false,
          },
        }));
      }
    });

    /**
     * Displays a snackbar to let the user know if updating their social media was successful
     */
    // All links updated successfully
    if (allPassed) {
      this.handleClose();
      this.props.createSnackbar('Social Media Updated', 'Success');
    }
    // Not all links updated successfully
    else {
      console.log('Failed Updates: ', this.state.updatingFailedLinks);
      // If some links failed
      if (numOfFailedLinks !== responses.length)
        this.props.createSnackbar('Not All Links Updated', 'Warning');
      // If all links failed
      else this.props.createSnackbar('Failed Updating Link(s)', 'Error');
    }
  }

  /**
   * Handles the submission of new Social Media links
   *
   * @param {Event} e The event of the Submit button being clicked
   */
  handleSubmit = e => {
    e.preventDefault();

    let fb = this.state.facebook;
    let tw = this.state.twitter;
    let li = this.state.linkedIn;
    let ig = this.state.instagram;
    let hs = this.state.handshake;

    this.onDialogSubmit(fb, tw, li, ig, hs);
  };

  /**
   * Handles the text inputs of the Social Media Dialog Box
   *
   * @param {String} name The name of the Social Media type to be updated
   * @param {Event} event The event of a text input changing
   */
  handleChange = (name, event) => {
    // Removes and spaces within the link and trailing it afterwards. To the user, they will find
    // that they cannot input a space at all in any text input
    let value = event.target.value.replace(' ', '').trim();
    this.setState({ [name]: value }, () => {
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
              label={
                // Sets the label based upon whether the link has updated and if so, if it failed
                this.state.updatedLinks.facebook && this.state.updatingFailedLinks.facebook
                  ? 'Facebook (Failed)'
                  : this.state.updatedLinks.facebook
                  ? 'Facebook (Updated)'
                  : 'Facebook Link'
              }
              value={this.state.facebook}
              onChange={event => {
                this.handleChange('facebook', event);
              }}
              error={!this.state.fbValid}
              helperText={this.state.fbValid ? '' : this.state.formErrors.facebook}
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
              label={
                // Sets the label based upon whether the link has updated and if so, if it failed
                this.state.updatedLinks.twitter && this.state.updatingFailedLinks.twitter
                  ? 'Twitter (Failed)'
                  : this.state.updatedLinks.twitter
                  ? 'Twitter (Updated)'
                  : 'Twitter Link'
              }
              value={this.state.twitter}
              onChange={event => {
                this.handleChange('twitter', event);
              }}
              error={!this.state.twValid}
              helperText={this.state.twValid ? '' : this.state.formErrors.twitter}
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
              label={
                // Sets the label based upon whether the link has updated and if so, if it failed
                this.state.updatedLinks.linkedIn && this.state.updatingFailedLinks.linkedIn
                  ? 'LinkedIn (Failed)'
                  : this.state.updatedLinks.linkedIn
                  ? 'LinkedIn (Updated)'
                  : 'LinkedIn Link'
              }
              value={this.state.linkedIn}
              onChange={event => {
                this.handleChange('linkedIn', event);
              }}
              error={!this.state.liValid}
              helperText={this.state.liValid ? '' : this.state.formErrors.linkedIn}
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
              label={
                // Sets the label based upon whether the link has updated and if so, if it failed
                this.state.updatedLinks.instagram && this.state.updatingFailedLinks.instagram
                  ? 'Instagram (Failed)'
                  : this.state.updatedLinks.instagram
                  ? 'Instagram (Updated)'
                  : 'Instagram Link'
              }
              value={this.state.instagram}
              onChange={event => {
                this.handleChange('instagram', event);
              }}
              error={!this.state.igValid}
              helperText={this.state.igValid ? '' : this.state.formErrors.instagram}
              margin="dense"
              fullWidth
              multiline
              className="gc360-links-dialog_content_field"
            />
          </div>
          <div className="gc360-links-dialog_content_handshake gc360-links-dialog_content_media">
            <div className="gc360-links-dialog_content_icon">
              <FaHandshake style={style.icon} />
            </div>
            <TextField
              color={gordonColors.primary.blue}
              id="handshakeInput"
              label={
                // Sets the label based upon whether the link has updated and if so, if it failed
                this.state.updatedLinks.handshake && this.state.updatingFailedLinks.handshake
                  ? 'Handshake (Failed)'
                  : this.state.updatedLinks.handshake
                  ? 'Handshake (Updated)'
                  : 'Handshake Link'
              }
              value={this.state.handshake}
              onChange={event => {
                this.handleChange('handshake', event);
              }}
              error={!this.state.hsValid}
              helperText={this.state.hsValid ? '' : this.state.formErrors.handshake}
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
          {/* If any of the links in the form are different from their initial link */}
          {this.state.formHasDifferentLinks && (
            <Button
              onClick={this.handleSubmit}
              type="submit"
              variant="contained"
              style={style.submitButton}
            >
              {// If there are any links that failed to update, show "resubmit". Otherwise, show "submit"
              this.state.updatingFailedLinks.facebook ||
              this.state.updatingFailedLinks.twitter ||
              this.state.updatingFailedLinks.linkedIn ||
              this.state.updatingFailedLinks.instagram ||
              this.state.updatingFailedLinks.handshake
                ? 'Resubmit'
                : 'Submit'}
            </Button>
          )}
        </DialogActions>
      </div>
    );
  }
}
