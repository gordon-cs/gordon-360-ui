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
import Button from '@material-ui/core/Button';
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
    this.openDialogBox = this.openDialogBox.bind(this);
    this.closeDialogBox = this.closeDialogBox.bind(this);

    this.state = {
      linkopen: false,
      dialogBoxOpen: false,
      network: 'online',
      loginDialogOpen: false,
    };
  }

  onSignOut() {
    signOut();
    this.props.onLinkClick();
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
  unAuthenticatedSearch = e => {
    e.preventDefault();
    this.setState({ loginDialogOpen: true });
  };
  handleClose() {
    this.setState({ loginDialogOpen: false });
  }
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
        // Closes out the links dialog  box if it's open
        this.handleLinkClose();
        this.setState({ network: 'offline' });
      }
    });

    /* Gets status of current network connection for online/offline rendering
     *  Defaults to online in case of PWA not being possible
     */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

    // Creates the Links and Feedback button depending on the status of the network found in local storage
    let linksButton;
    let feedbackButton;
    if (networkStatus === 'online') {
      linksButton = (
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
      feedbackButton = (
        <NavLink exact to="/feedback" onClick={this.props.onLinkClick}>
          <ListItem button>
            <ListItemText primary="Feedback" />
          </ListItem>
        </NavLink>
      );
    } else {
      linksButton = (
        <div onClick={this.openDialogBox}>
          <ListItem button disabled={networkStatus}>
            <ListItemText primary="Links" />
          </ListItem>
        </div>
      );
      feedbackButton = (
        <div onClick={this.openDialogBox}>
          <ListItem button disabled={networkStatus}>
            <ListItemText primary="Feedback" />
          </ListItem>
        </div>
      );
    }

    let admin;
    let peopleButton;
    let signInOut;
    if (this.props.Authentication) {
      // Creates the Admin button depending on the status of the network found in local storage
      if (networkStatus === 'online') {
        if (user.getLocalInfo().college_role === 'god') {
          admin = (
            <NavLink exact to="/admin" onClick={this.props.onLinkClick}>
              <ListItem button>
                <ListItemText primary="Admin" />
              </ListItem>
            </NavLink>
          );
        }
      } else {
        if (user.getLocalInfo().college_role === 'god') {
          admin = (
            <div onClick={this.openDialogBox}>
              <ListItem button disabled={networkStatus}>
                <ListItemText primary="Admin" />
              </ListItem>
            </div>
          );
        }
      }

      if (networkStatus === 'online') {
        peopleButton = (
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
        peopleButton = (
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

      // Creates the Signout button depending on the status of the network found in local storage
      if (networkStatus === 'online') {
        signInOut = (
          <ListItem button onClick={this.onSignOut}>
            <ListItemText primary="Sign Out" />
          </ListItem>
        );
      } else {
        signInOut = (
          <div onClick={this.openDialogBox}>
            <ListItem button disabled={networkStatus}>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </div>
        );
      }
    } else {
      peopleButton = (
        <NavLink to="#" onClick={this.unAuthenticatedSearch}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="People" />
          </ListItem>
        </NavLink>
      );

      signInOut = (
        <NavLink exact to="/" onClick={this.props.onSignOut}>
          <ListItem button>
            <ListItemText primary="Sign In" />
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
          {peopleButton}
        </List>
        <Divider />

        <div>
          <List className="gordon-nav-links-bottom">
            {linksButton}
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
            {feedbackButton}
            {admin}
            {signInOut}
          </List>
          <Dialog
            open={this.state.loginDialogOpen}
            onClose={clicked => this.handleClose()}
            aria-labelledby="login-dialog-title"
            aria-describedby="login-dialog-description"
          >
            <DialogTitle id="login-dialog-title">{'Login to use People Search'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="login-dialog-description">
                You are not logged in. Please log in to use People Search.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={clicked => this.handleClose()} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
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
