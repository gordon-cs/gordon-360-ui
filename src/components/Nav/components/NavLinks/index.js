import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
import { Button } from '@material-ui/core';

export default class GordonNavLinks extends Component {
  constructor(props) {
    super(props);
    this.onSignOut = this.onSignOut.bind(this);
    this.handleLinkClickOpen = this.handleLinkClickOpen.bind(this);
    this.handleLinkClose = this.handleLinkClose.bind(this);
    this.openDialogBox = this.openDialogBox.bind(this);
    this.closeDialogBox = this.closeDialogBox.bind(this);

    this.state = {
      linkopen: false,
      dialogBoxOpen: false,
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

  openDialogBox = () => {
    this.setState({ dialogBoxOpen: true });
  };

  closeDialogBox = () => {
    this.setState({ dialogBoxOpen: false });
  };

  offlineAlert() {
    alert('This feature is unavailable offline');
  }

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

    /* Gets status of current network connection for online/offline rendering
    *  Defaults to online in case of PWA not being possible
    */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

    // Creates the People button depending on the status of the network found in local storage
    let PeopleButton;
    if (networkStatus === 'online') {
      PeopleButton = (
        <NavLink exact to="/people" onClick={this.props.onLinkClick}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="People" />
          </ListItem>
        </NavLink>
      );
    } else {
      PeopleButton = (
        <div onClick={this.openDialogBox}>
          <ListItem button disabled={networkStatus}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="People" />
          </ListItem>
        </div>
      );
    }

    // Creates the Links button depending on the status of the network found in local storage
    let LinksButton;
    if (networkStatus === 'online') {
      LinksButton = (
        <ListItem
          button
          onClick={() => {
            this.props.onLinkClick();
            this.handleLinkClickOpen();
          }}
        >
          <ListItemText primary="Links" />
        </ListItem>
      );
    } else {
      LinksButton = (
        <div onClick={this.openDialogBox}>
          <ListItem button disabled={networkStatus}>
            <ListItemText primary="Links" />
          </ListItem>
        </div>
      );
    }

    // Creates the Feedback button depending on the status of the network found in local storage
    let FeedbackButton;
    if (networkStatus === 'online') {
      FeedbackButton = (
        <NavLink exact to="/feedback" onClick={this.props.onLinkClick}>
          <ListItem button>
            <ListItemText primary="Feedback" />
          </ListItem>
        </NavLink>
      );
    } else {
      FeedbackButton = (
        <div onClick={this.openDialogBox}>
          <ListItem button disabled={networkStatus}>
            <ListItemText primary="Feedback" />
          </ListItem>
        </div>
      );
    }

    // Creates the Signout button depending on the status of the network found in local storage
    let SignoutButton;
    if (networkStatus === 'online') {
      SignoutButton = (
        <ListItem button onClick={this.onSignOut}>
          <ListItemText primary="Sign Out" />
        </ListItem>
      );
    } else {
      SignoutButton = (
        <div onClick={this.openDialogBox}>
          <ListItem button disabled={networkStatus}>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </div>
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
          {PeopleButton}
        </List>
        <Divider />

        <div>
          <List className="gordon-nav-links-bottom">
            {LinksButton}
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
            {FeedbackButton}
            {admin}
            {SignoutButton}
          </List>
          <QuickLinksDialog
            handleLinkClickOpen={this.handleLinkClickOpen}
            handleLinkClose={this.handleLinkClose}
            linkopen={this.state.linkopen}
          />
        </div>
        <Dialog
          open={this.state.dialogBoxOpen}
          onClose={clicked => this.closeDialogBox()}
          aria-labelledby="disabled-feature"
          aria-describedby="disabled-feature-description"
        >
          <DialogTitle id="disabled-feature">{'Offline Mode:'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="disabled-feature-description">
              This feature is unavailable offline. Please reconnect to internet to access this
              feature.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={clicked => this.closeDialogBox()} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

GordonNavLinks.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};
