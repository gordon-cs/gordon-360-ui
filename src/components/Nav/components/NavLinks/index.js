import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import user from '../../../../services/user';
import { signOut } from '../../../../services/auth';

import './nav-links.css';
import QuickLinksDialog from '../../../QuickLinksDialog';

export default class GordonNavLinks extends Component {
  constructor(props) {
    super(props);
    this.onSignOut = this.onSignOut.bind(this);
    this.handleLinkClickOpen = this.handleLinkClickOpen.bind(this);
    this.handleLinkClose = this.handleLinkClose.bind(this);
    this.state = {
      linkopen: false,
    };
  }

  onSignOut() {
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

  render() {
    let admin;
    if (user.getLocalInfo().college_role === 'god') {
      admin = (
        <NavLink exact to="/admin" onClick={this.props.onLinkClick}>
          <ListItem button>
            <ListItemText primary="Admin" />
          </ListItem>
        </NavLink>
      );
    }
    return (
      <div>
        <List className="gordon-nav-links">
          <NavLink exact to="/" onClick={this.props.onLinkClick}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </NavLink>
          <NavLink exact to="/involvements" onClick={this.props.onLinkClick}>
            <ListItem button>
              <ListItemIcon>
                <LocalActivityIcon />
              </ListItemIcon>
              <ListItemText primary="Involvements" />
            </ListItem>
          </NavLink>
          <NavLink exact to="/events" onClick={this.props.onLinkClick}>
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
          </NavLink>
          <NavLink exact to="/people" onClick={this.props.onLinkClick}>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="People" />
            </ListItem>
          </NavLink>
        </List>
        <Divider />

        <div>
          <List className="gordon-nav-links-bottom">
            <ListItem
              button
              onClick={() => {
                this.props.onLinkClick();
                this.handleLinkClickOpen();
              }}
            >
              <ListItemText primary="Links" />
            </ListItem>
            <NavLink exact to="/help" onClick={this.props.onLinkClick}>
              <ListItem button>
                <ListItemText primary="Help" />
              </ListItem>
            </NavLink>
            <NavLink exact to="/about" onClick={this.props.onLinkClick}>
              <ListItem button>
                <ListItemText primary="About" />
              </ListItem>
            </NavLink>
            <NavLink exact to="/feedback" onClick={this.props.onLinkClick}>
              <ListItem button>
                <ListItemText primary="Feedback" />
              </ListItem>
            </NavLink>
            {admin}
            <ListItem button onClick={this.onSignOut}>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
          <QuickLinksDialog
            handleLinkClickOpen={this.handleLinkClickOpen}
            handleLinkClose={this.handleLinkClose}
            linkopen={this.state.linkopen}
          />
        </div>
      </div>
    );
  }
}

GordonNavLinks.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};
