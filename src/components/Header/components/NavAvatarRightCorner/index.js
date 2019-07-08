import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

import QuickLinksDialog from '../../../QuickLinksDialog';
import { signOut, isAuthenticated } from '../../../../services/auth';

import './nav-avatar-right-corner.css';
import user from '../../../../services/user';
import Tooltip from '@material-ui/core/Tooltip';

export default class GordonNavAvatarRightCorner extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.handleLinkClickOpen = this.handleLinkClickOpen.bind(this);
    this.handleLinkClose = this.handleLinkClose.bind(this);

    this.getInitials = this.getInitials.bind(this);

    this.state = {
      email: null,
      image: null,
      name: null,
      username: null,
      linkopen: false,

      anchorEl: null,
    };
  }

  onClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }
  onClose() {
    this.setState({ anchorEl: null });
  }
  onSignOut() {
    this.onClose();
    signOut();
    this.props.onSignOut();
  }

  handleLinkClickOpen = () => {
    this.setState({
      linkopen: true,
    });
  };

  handleLinkClose = () => {
    this.setState({ linkopen: false });
  };

  async componentWillMount() {
    this.loadAvatar();
  }

  componentDidMount() {
    setInterval(this.checkPeer.bind(this), 1500);
  }

  async loadAvatar() {
    if (isAuthenticated()) {
      const { name, user_name: username } = user.getLocalInfo();
      this.setState({ name, username });
      const [{ Email: email }, { def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getProfileInfo(),
        await user.getImage(),
      ]);
      const image = preferredImage || defaultImage;
      this.setState({ email, image });
    } else {
      const name = 'Guest';
      const username = 'Guest';
      this.setState({ name, username });
      const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getImage(),
      ]);
      const image = defaultImage;
      this.setState({ image });
    }
  }

  /**
   * This method checks a peer component Profile
   * and rerenders the avatar if the Profile picture is updated
   */
  checkPeer() {
    if (window.didProfilePicUpdate) {
      this.loadAvatar();
      window.didProfilePicUpdate = false;
    }
  }

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

  render() {
    let content;
    if (isAuthenticated()) {
      const open = Boolean(this.state.anchorEl);

      // const { classes } = this.props;

      let username = this.state.username;
      let myProfileLink = '/myprofile/' + username;
      let avatar = (
        <Avatar className="nav-avatar nav-avatar-placeholder">{this.getInitials()}</Avatar>
      );
      if (this.state.image) {
        avatar = (
          <Avatar
            className="nav-avatar nav-avatar-image"
            src={`data:image/jpg;base64,${this.state.image}`}
          />
        );
      }

      let admin;
      if (user.getLocalInfo().college_role === 'god') {
        admin = (
          <Link to="/admin">
            <MenuItem onClick={this.onClose} divider="true">
              Admin
            </MenuItem>
          </Link>
        );
      }
      content = (
        <section className="right-side-container">
          <Tooltip classes={{ tooltip: 'tooltip' }} id="tooltip-avatar" title={this.state.name}>
            <IconButton
              className="gordon-nav-avatar-right-corner"
              classes={{
                root: 'gordon-nav-avatar-right-corner nav-avatar-button',
                label: 'nav-avatar-label',
              }}
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
            <Link to={myProfileLink}>
              <MenuItem onClick={this.onClose} divider="true">
                My Profile
              </MenuItem>
            </Link>
            <MenuItem
              onClick={() => {
                this.onClose();
                this.handleLinkClickOpen();
              }}
              divider="true"
            >
              Links
            </MenuItem>
            <Link to="/help">
              <MenuItem onClick={this.onClose} divider="true">
                Help
              </MenuItem>
            </Link>
            <Link to="/about">
              <MenuItem onClick={this.onClose} divider="true">
                About
              </MenuItem>
            </Link>
            <Link to="/feedback">
              <MenuItem onClick={this.onClose} divider="true">
                Feedback
              </MenuItem>
              {admin}
            </Link>
            <MenuItem onClick={this.onSignOut} divider="true">
              Sign Out
            </MenuItem>
          </Menu>
          <QuickLinksDialog
            handleLinkClickOpen={this.handleLinkClickOpen}
            handleLinkClose={this.handleLinkClose}
            linkopen={this.state.linkopen}
          />
        </section>
      );
    } else {
      const open = Boolean(this.state.anchorEl);
      let username = this.state.username;
      let myProfileLink = '/myprofile/' + username;
      let avatar = <Avatar className="nav-avatar nav-avatar-placeholder">Guest</Avatar>;
      if (this.state.image) {
        avatar = (
          <Avatar
            className="nav-avatar nav-avatar-image"
            src={`data:image/jpg;base64,${this.state.image}`}
          />
        );
      }
      content = (
        <section className="right-side-container">
          <Tooltip classes={{ tooltip: 'tooltip' }} id="tooltip-avatar" title={this.state.name}>
            <IconButton
              className="gordon-nav-avatar-right-corner"
              classes={{
                root: 'gordon-nav-avatar-right-corner nav-avatar-button',
                label: 'nav-avatar-label',
              }}
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
            <MenuItem
              onClick={() => {
                this.onClose();
                this.handleLinkClickOpen();
              }}
              divider="true"
            >
              Links
            </MenuItem>
            <Link to="/help">
              <MenuItem onClick={this.onClose} divider="true">
                Help
              </MenuItem>
            </Link>
            <Link to="/about">
              <MenuItem onClick={this.onClose} divider="true">
                About
              </MenuItem>
            </Link>
            <Link to="/feedback">
              <MenuItem onClick={this.onClose} divider="true">
                Feedback
              </MenuItem>
            </Link>
            <Link to="/">
              <MenuItem onClick={this.onClose} divider="true">
                Sign In
              </MenuItem>
            </Link>
          </Menu>
          <QuickLinksDialog
            handleLinkClickOpen={this.handleLinkClickOpen}
            handleLinkClose={this.handleLinkClose}
            linkopen={this.state.linkopen}
          />
        </section>
      );
    }
    return <div>{content}</div>;
  }
}

GordonNavAvatarRightCorner.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};
