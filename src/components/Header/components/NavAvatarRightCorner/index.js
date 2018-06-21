import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu, { MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types';

import { signOut } from '../../../../services/auth';

import './nav-avatar-right-corner.css';
import user from '../../../../services/user';

export default class GordonNavAvatarRightCorner extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSignOut = this.onSignOut.bind(this);

    this.getInitials = this.getInitials.bind(this);

    this.state = {
      email: null,
      image: null,
      name: null,
      username: null,

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

  async componentWillMount() {
    const { name, user_name: username } = user.getLocalInfo();
    this.setState({ name, username });
    const [{ Email: email }, { def: defaultImage, pref: preferredImage }] = await Promise.all([
      await user.getProfileInfo(),
      await user.getImage(),
    ]);

    const image = preferredImage || defaultImage;

    this.setState({ email, image });
  }

  getInitials() {
    if (this.state.username) {
      return this.state.username
        .split('.') // Split name into separate words
        .map(name => name[0]) // Get first letter of each part of name
        .join(''); // Join initials back into a string
    }
    return '';
  }

  render() {
    const open = Boolean(this.state.anchorEl);

    // const { classes } = this.props;

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

    return (
      <section>
        <Button
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
        </Button>
        <Menu
          id="nav-avatar-right-corner"
          anchorEl={this.state.anchorEl}
          open={open}
          onRequestClose={this.onClose}
        >
          <Link to="/myprofile/studenttest.360">
            <MenuItem onClick={this.onClose}>My Profile</MenuItem>
          </Link>
          <Link to="/help">
            <MenuItem onClick={this.onClose}>Help</MenuItem>
          </Link>
          <Link to="/about">
            <MenuItem onClick={this.onClose}>About</MenuItem>
          </Link>
          <MenuItem onClick={this.onSignOut}>Sign out</MenuItem>
        </Menu>
      </section>
    );
  }
}

GordonNavAvatarRightCorner.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

// GordonToolbarNavAvatar.propTypes = {
//   classes: PropTypes.objectOf(PropTypes.string).isRequired,
//   onLinkClick: PropTypes.func.isRequired,
// };
