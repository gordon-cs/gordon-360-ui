import { IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core';
import {
  createAboutButton,
  createAdminButton,
  createAvatarButton,
  createFeedbackButton,
  createHelpButton,
  createLinksButton,
  createMyProfileButton,
  createSignInOutButton,
} from './navButtons';
import GordonDialogBox from '../../../GordonDialogBox/index';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuickLinksDialog from '../../../QuickLinksDialog';
import { signOut } from '../../../../services/auth';
import storage from '../../../../services/storage';
import './nav-avatar-right-corner.css';
import '../../../../app.css';
import user from '../../../../services/user';

export default class GordonNavAvatarRightCorner extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.handleLinkClickOpen = this.handleLinkClickOpen.bind(this);
    this.handleLinkClose = this.handleLinkClose.bind(this);
    this.openDialogBox = this.openDialogBox.bind(this);
    this.closeDialogBox = this.closeDialogBox.bind(this);
    this.getInitials = this.getInitials.bind(this);

    this.state = {
      email: null,
      image: null,
      name: null,
      username: null,
      linkopen: false,
      anchorEl: null,
      dialogBoxOpen: false,
      dialogType: '',
      dialogReason: '',
      network: 'online',
    };
  }

  /**
   * Handles the event of an option being clicked on in the menu
   */
  onClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  /**
   * Closes the menu
   */
  onClose() {
    this.setState({ anchorEl: null });
  }

  /**
   * Closes the menu and logs out the user
   */
  onSignOut() {
    this.onClose();
    signOut();
    this.props.onSignOut();
  }

  /**
   * Closes the menu
   */
  onSignIn() {
    this.onClose();
  }

  /**
   * Opens the dialog box containing external links
   */
  handleLinkClickOpen() {
    this.setState({ linkopen: true });
  }

  /**
   * Closes the dialog box containing external links
   */
  handleLinkClose() {
    this.setState({ linkopen: false });
  }

  async componentWillReceiveProps(newProps) {
    if (this.props.Authentication !== newProps.Authentication) {
      this.loadAvatar(newProps.Authentication);
    }
  }

  async componentWillMount() {
    this.loadAvatar(this.props.Authentication);
  }

  componentDidMount() {
    setInterval(this.checkPeer.bind(this), 1500);

    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', event => {
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
    // Removes the window's event listener before unmounting the component
    window.removeEventListener('message', () => {});
  }

  /**
   * Creates the avatar
   */
  async loadAvatar(Authentication) {
    if (Authentication) {
      const { name, user_name: username } = user.getLocalInfo();
      this.setState({ name, username });
      const [{ Email: email }, { def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getProfileInfo(),
        await user.getImage(),
      ]);
      const image = preferredImage || defaultImage;
      this.setState({ email, image });
    } else {
      this.setState({ name: 'Guest', username: 'Guest' });
    }
  }

  /**
   * This method checks a peer component Profile
   * and rerenders the avatar if the Profile picture is updated
   */
  checkPeer() {
    if (window.didProfilePicUpdate) {
      this.loadAvatar(this.props.Authentication);
      window.didProfilePicUpdate = false;
    }
  }

  /**
   * Gets the initials of the current user
   */
  getInitials() {
    if (this.state.username) {
      return this.state.username
        .split('.') // Split name into separate words
        .map(name => name[0]) // Get first letter of each part of name
        .join('')
        .toUpperCase(); // Join initials back into a string
    }
    return '';
  }

  /**
   * Creates a dialog box.
   *
   * Depending on the dialog box's type saved in the state, the dialog box and it's content is created.
   */
  createDialogBox() {
    // Type - Offline
    if (this.state.dialogType === 'offline') {
      return (
        <GordonDialogBox
          open={this.state.dialogBoxOpened}
          onClose={this.closeDialogBox}
          labelledby={'offline-dialog'}
          describedby={'feature-deactivated'}
          title={'Offline Mode'}
          text={
            'This feature is unavailable offline. Please reconnect to internet to access this feature.'
          }
          buttonClicked={this.closeDialogBox}
          buttonName={'Okay'}
        />
      );
    }
    // Type - Unauthorized
    else if (this.state.dialogType === 'unauthorized') {
      return (
        <GordonDialogBox
          open={this.state.dialogBoxOpened}
          onClose={this.closeDialogBox}
          labelledby={'unauthorized-dialog'}
          describedby={'feature-unavailable'}
          title={'Credentials Needed'}
          text={`This feature is unavailable while not logged in. Please log in to ${this.state.dialogReason}.`}
          buttonClicked={this.closeDialogBox}
          buttonName={'Okay'}
        />
      );
    }
  }

  /**
   * Opens the dialog box.
   *
   * Depending on the type and reason for opening the dialog box, the dialog box's content is made.
   *
   * @param {String} type The type of dialog box requested
   * @param {String} feature The feature the user attempted to access
   */
  openDialogBox(type, feature) {
    let reason = '';
    if (feature === 'admin view') {
      reason = 'edit administrator privileges';
    } else if (feature === 'my profile view') {
      reason = 'view your profile';
    } else {
      reason = '';
    }

    this.setState({ dialogBoxOpened: true, dialogType: type, dialogReason: reason });
  }

  /**
   * Closes the dialog box.
   *
   * While closing the dialog box, all of its text content is erased.
   */
  closeDialogBox() {
    this.setState({ dialogBoxOpened: false, dialogType: '', dialogReason: '' });
  }

  render() {
    const open = Boolean(this.state.anchorEl);

    // Avatar Button
    let avatar = createAvatarButton(this.props.Authentication, this.state.image, this.getInitials);

    // My Profile Button
    let myProfileButton = createMyProfileButton(
      this.state.network,
      this.props.Authentication,
      this.onClose,
      this.openDialogBox,
      this.state.name,
    );

    // Links Button
    let linksButton = createLinksButton(
      this.state.network,
      this.onClose,
      this.handleLinkClickOpen,
      this.openDialogBox,
    );

    // Help Button
    let helpButton = createHelpButton(this.onClose);

    // About Button
    let aboutButton = createAboutButton(this.onClose);

    // Feedback Button
    let feedbackButton = createFeedbackButton(this.state.network, this.onClose, this.openDialogBox);

    // Admin Button
    let adminButton = createAdminButton(
      this.state.network,
      this.props.Authentication,
      this.onClose,
      this.openDialogBox,
    );

    // Sign In & Out Button
    let signInOutButton = createSignInOutButton(
      this.props.Authentication,
      this.onSignOut,
      this.onSignIn,
    );

    return (
      <section className="right-side-container">
        <Tooltip classes={{ tooltip: 'tooltip' }} id="tooltip-avatar" title={this.state.name}>
          <IconButton
            className="gc360-nav-avatar-rc"
            aria-label="More"
            aria-owns={open ? 'global-menu' : null}
            aria-haspopup="true"
            onClick={this.onClick}
          >
            {avatar}
          </IconButton>
        </Tooltip>

        <Menu
          id="nav-avatar-right-corner"
          anchorEl={this.state.anchorEl}
          open={open}
          onClose={this.onClose}
          disableRestoreFocus // Prevent tooltip from sticking
        >
          {/*This first MenuItem is hidden just to hide the React bug that leaves the first option perpeutally highlighted.*/}
          <MenuItem onClick={this.onClose} style={{ display: 'none' }}>
            My Profile
          </MenuItem>
          {myProfileButton}
          {linksButton}
          {helpButton}
          {aboutButton}
          {feedbackButton}
          {adminButton}
          {signInOutButton}
        </Menu>

        <QuickLinksDialog
          handleLinkClickOpen={this.handleLinkClickOpen}
          handleLinkClose={this.handleLinkClose}
          linkopen={this.state.linkopen}
        />

        {this.createDialogBox()}
      </section>
    );
  }
}

GordonNavAvatarRightCorner.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};
