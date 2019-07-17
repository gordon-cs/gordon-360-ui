import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import user from '../../../../services/user';
import { isAuthenticated, signOut } from '../../../../services/auth';

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

  render() {
    let admin;
    let people;
    let signInOut;
    if (isAuthenticated()) {
      if (user.getLocalInfo().college_role === 'god') {
        admin = (
          <NavLink exact to="/admin" onClick={this.props.onLinkClick}>
            <ListItem button>
              <ListItemText primary="Admin" />
            </ListItem>
          </NavLink>
        );
      }

      people = (
        <NavLink exact to="/people" onClick={this.props.onLinkClick}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="People" />
          </ListItem>
        </NavLink>
      );

      signInOut = (
        <NavLink exact to="/" onClick={this.onSignOut}>
          <ListItem button>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </NavLink>
      );
    } else {
      people = (
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
          {people}
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
      </div>
    );
  }
}

GordonNavLinks.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};
