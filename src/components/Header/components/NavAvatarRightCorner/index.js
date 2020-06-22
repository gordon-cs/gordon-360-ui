import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './nav-avatar-right-corner.css';
import '../../../../app.css';
import user from '../../../../services/user';

export default class GordonNavAvatarRightCorner extends Component {
  constructor(props) {
    super(props);

    this.getInitials = this.getInitials.bind(this);
    this.checkPeer = this.checkPeer.bind(this);
    this.createAvatarButton = this.createAvatarButton.bind(this);
    this.loadAvatar = this.loadAvatar.bind(this);

    this.state = {
      email: null,
      image: null,
      name: null,
      username: null,
    };
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
  }

  /**
   * Creates the avatar
   *
   * @param {Boolean} authentication Determines if the user is authenticated
   */
  async loadAvatar(authentication) {
    if (authentication) {
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
   *
   * @returns {String} The initials of the user if available
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
   * Creates the Avatar button.
   *
   * Depending on authentication, the Avatar button is created.
   *
   * @param {Boolean} authenticated Determines if the user is logged in.
   * @param {String} avatarImage The profile image of the user if available
   * @param {Function} getInitials Gets the initials of the current user
   *
   * @return {JSX} The JSX of the Avatar button.
   */
  createAvatarButton(authenticated, avatarImage, getInitials) {
    let avatarButton;
    // Authenticated
    if (authenticated) {
      // Authenticated - Profile Image Available
      if (avatarImage) {
        avatarButton = (
          <Avatar
            className="gc360-nav-avatar-rc_size"
            src={`data:image/jpg;base64,${avatarImage}`}
          />
        );
      }
      // Authenticated - Profile Image Unavailable
      else {
        avatarButton = (
          <Avatar className="gc360-nav-avatar-rc_size gc360-nav-avatar-rc_placeholder">
            {getInitials()}
          </Avatar>
        );
      }
    }
    // Not Authenticated
    else {
      avatarButton = <Avatar className="nav-avatar nav-avatar-placeholder">Guest</Avatar>;
    }

    return avatarButton;
  }

  render() {
    const open = Boolean(this.state.anchorEl);

    // Avatar Button
    let avatar = this.createAvatarButton(
      this.props.Authentication,
      this.state.image,
      this.getInitials,
    );

    return (
      <section className="right-side-container">
        {/* If the menu is closed, the Tooltip will display when hovering over the user's avatar.
         Otherwise, it will not display */}
        {!this.props.menuOpened ? (
          <Tooltip classes={{ tooltip: 'tooltip' }} id="tooltip-avatar" title={this.state.name}>
            <IconButton
              className="gc360-nav-avatar-rc"
              aria-label="More"
              aria-owns={open ? 'global-menu' : null}
              aria-haspopup="true"
              onClick={event => {
                // Handles opening the menu
                this.props.onClick();
              }}
            >
              {avatar}
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton
            className="gc360-nav-avatar-rc"
            aria-label="More"
            aria-owns={open ? 'global-menu' : null}
            aria-haspopup="true"
          >
            {avatar}
          </IconButton>
        )}
      </section>
    );
  }
}

GordonNavAvatarRightCorner.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};
