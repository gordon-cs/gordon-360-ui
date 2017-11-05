import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './nav-avatar.css';

const styles = theme => ({
  drawerHeader: theme.mixins.toolbar,
});

class GordonNavAvatar extends Component {
  constructor(props) {
    super(props);

    this.getInitials = this.getInitials.bind(this);

    this.state = {
      user: {
        name: 'Test User',
        email: 'test.user@gordon.edu',
        username: 'test.user',
      },
    };
  }
  getInitials() {
    return this.state.user.name
      .split(' ') // Split name into separate words
      .map(name => name[0]) // Get first letter of each part of name
      .join(''); // Join initials back into a string
  }
  render() {
    const { classes } = this.props;

    return (
      <Button
        className={`${classes.drawerHeader} gordon-nav-avatar`}
        classes={{ root: 'gordon-nav-avatar button' }}
      >
        <Link to={`/profile/${this.state.user.username}`} onClick={this.props.onLinkClick}>
          <Avatar className="image">{this.getInitials()}</Avatar>
          <Typography type="body2" className="text" align="left" gutterBottom>
            {this.state.user.name}
          </Typography>
          <Typography type="body1" className="text" align="left" gutterBottom>
            {this.state.user.email}
          </Typography>
        </Link>
      </Button>
    );
  }
}

GordonNavAvatar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onLinkClick: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(GordonNavAvatar);
