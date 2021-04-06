import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav-avatar.css';
import user from 'services/user';

import { Avatar, Button, Typography } from '@material-ui/core';

const styles = (theme) => ({
  drawerHeader: theme.mixins.toolbar,
});

class GordonNavAvatar extends Component {
  constructor(props) {
    super(props);
    this.getInitials = this.getInitials.bind(this);
    this.state = {
      email: null,
      image: null,
      name: null,
      username: null,
      network: 'online',
    };
  }
  async componentWillMount() {
    this.loadAvatar(this.props.authentication);
  }
  async componentWillReceiveProps(newProps) {
    if (this.props.authentication !== newProps.authentication) {
      this.loadAvatar(newProps.authentication);
    }
  }

  componentDidMount() {
    /* Used to re-render the page when the user's profile picture changes
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', (event) => {
      if (event.data === 'update-profile-picture' && event.origin === window.location.origin) {
        this.loadAvatar(this.props.authentication);
      }
    });
  }

  componentWillUnmount() {
    // Removes the window's event listener before unmounting the component
    return window.removeEventListener('message', () => {});
  }

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

  getInitials() {
    if (this.state.username) {
      return this.state.username
        .split('.') // Split name into separate words
        .map((name) => name[0]) // Get first letter of each part of name
        .join(''); // Join initials back into a string
    }
    return '';
  }
  render() {
    const { classes } = this.props;
    let content;
    let buttonLink;
    if (this.props.authentication) {
      let avatar = <Avatar className="avatar placeholder">{this.getInitials()}</Avatar>;
      if (this.state.image) {
        avatar = (
          <Avatar className="avatar image" src={`data:image/jpg;base64,${this.state.image}`} />
        );
      }

      // Link component to be used with Button component
      buttonLink = ({ ...props }) => (
        <Link
          {...props}
          to={`/myprofile`}
          onClick={this.props.onLinkClick}
          className="gc360-link"
        />
      );

      content = (
        <Button
          className={`${classes.drawerHeader} gordon-nav-avatar`}
          classes={{
            root: 'gordon-nav-avatar button',
            label: 'label',
          }}
          component={buttonLink}
        >
          <div className="gordon-nav-avatar">
            {avatar}
            <Typography variant="body2" className="avatar-text" align="left" gutterBottom>
              {this.state.name}
            </Typography>
            <Typography variant="caption" className="avatar-text" align="left" gutterBottom>
              {this.state.email}
            </Typography>
          </div>
        </Button>
      );
    } else {
      let avatar = <Avatar className="avatar placeholder">Guest</Avatar>;
      // Link component to be used with Button component
      buttonLink = ({ ...props }) => (
        <Link {...props} to={`/`} onClick={this.props.onLinkClick} className="gc360-link" />
      );

      content = (
        <Button
          className={`${classes.drawerHeader} gordon-nav-avatar`}
          classes={{
            root: 'gordon-nav-avatar button',
            label: 'label',
          }}
          component={buttonLink}
        >
          <div className="gordon-nav-avatar">
            {avatar}
            <Typography variant="body2" className="avatar-text" align="left" gutterBottom>
              Guest
            </Typography>
          </div>
        </Button>
      );
    }

    return content;
  }
}

GordonNavAvatar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onLinkClick: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(GordonNavAvatar);
