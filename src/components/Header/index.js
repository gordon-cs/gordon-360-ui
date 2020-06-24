import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Route, Switch, NavLink } from 'react-router-dom';
import './header.css';
import GordonPeopleSearch from './components/PeopleSearch';
import GordonNavAvatarRightCorner from './components/NavAvatarRightCorner';
import routes from '../../routes';
import { projectName } from '../../project-name';

const getRouteName = route => {
  if (route.name) {
    return () => (
      <span>
        <DocumentTitle title={`${route.name} | ${projectName}`} />
        {route.name}
      </span>
    );
  }
  return () => (
    <span>
      <DocumentTitle title={`${projectName}`} />
      {projectName}
    </span>
  );
};

export default class GordonHeader extends Component {
  constructor(props) {
    super(props);
    this.openDialogBox = this.openDialogBox.bind(this);
    this.closeDialogBox = this.closeDialogBox.bind(this);

    this.state = {
      value: null,
      dialogBoxOpen: false,
      loginDialogOpen: false,
      network: 'online',
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  openDialogBox = () => {
    this.setState({ dialogBoxOpen: true });
  };

  closeDialogBox = () => {
    this.setState({ dialogBoxOpen: false });
  };

  /**
   * Update the tab highlight indicator based on the url
   *
   * The checks use regular expressions to check for matches in the url.
   */
  updateTabHighlight() {
    let currentPath = window.location.pathname;
    // Tab url regular expressions must be listed in the same order as the tabs, since the
    // indices of the elements in the array on the next line are mapped to the indices of the tabs
    let urls = [/^\/$/, /^\/involvements\/?$|^\/activity/, /^\/events\/?$/, /^\/people$/];
    this.value = false;
    for (let i = 0; i < urls.length; i++) {
      if (urls[i].test(currentPath)) {
        this.value = i;
      }
    }
  }

  componentWillUpdate() {
    this.updateTabHighlight();
  }

  componentWillMount() {
    this.value = false;
    this.updateTabHighlight();
  }

  unAuthenticatedSearch() {
    this.setState({ loginDialogOpen: true });
  }

  handleClose() {
    this.setState({ loginDialogOpen: false });
  }

  openDialogBox = () => {
    this.setState({ dialogBoxOpen: true });
  };

  closeDialogBox = () => {
    this.setState({ dialogBoxOpen: false });
  };

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
        this.setState({ network: 'offline' });
      }
    });

    /* Gets status of current network connection for online/offline rendering
     *  Defaults to online in case of PWA not being possible
     */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

    // Creates the People Tab depending on the status of the network found in local storage
    let PeopleTab;

    if (this.props.Authentication) {
      // Renders online, authenticated (i.e. normal) People Tab
      if (networkStatus === 'online') {
        PeopleTab = (
          <Tab
            className="tab"
            icon={<PeopleIcon />}
            label="People"
            component={NavLink}
            to="/people"
          />
        );
      } else {
        // Renders offline People Tab
        PeopleTab = (
          <div onClick={this.openDialogBox}>
            <Tab
              className="tab"
              icon={<PeopleIcon />}
              label="People"
              component={Button}
              style={{ color: 'white' }}
              disabled={networkStatus}
            />
          </div>
        );
      }
    }
    // IF YOU ARE NOT AUTHENTICATED
    else {
      // Renders online Guest People Tab
      if (networkStatus === 'online') {
        PeopleTab = (
          <div onClick={clicked => this.unAuthenticatedSearch()}>
            <Tab
              className="tab"
              icon={<PeopleIcon />}
              label="People"
              component={Button}
              style={{ color: 'white' }}
              disabled={networkStatus}
            />
          </div>
        );
      }
      // Renders offline Guest People Tab
      else {
        PeopleTab = (
          <div onClick={this.openDialogBox}>
            <Tab
              className="tab"
              icon={<PeopleIcon />}
              label="People"
              component={Button}
              style={{ color: 'white' }}
              disabled={networkStatus}
            />
          </div>
        );
      }
    }

    return (
      <section className="gordon-header">
        <AppBar className="app-bar" position="static">
          <Toolbar>
            <IconButton
              className="menu-button"
              color="primary"
              aria-label="open drawer"
              onClick={this.props.onDrawerToggle}
            >
              <MenuIcon className="menu-button-icon" />
            </IconButton>
            <Typography className="title disable-select" variant="h6" color="inherit">
              <Switch>
                {routes.map(route => (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={getRouteName(route)}
                  />
                ))}
              </Switch>
            </Typography>
            <div className="center-container">
              <Tabs centered value={this.value} onChange={this.handleChange}>
                <Tab className="tab" icon={<HomeIcon />} label="Home" component={NavLink} to="/" />
                <Tab
                  className="tab"
                  icon={<LocalActivityIcon />}
                  label="Involvements"
                  component={NavLink}
                  to="/involvements"
                />
                <Tab
                  className="tab"
                  icon={<EventIcon />}
                  label="Events"
                  component={NavLink}
                  to="/events"
                />
                {PeopleTab}
              </Tabs>
            </div>
            <GordonPeopleSearch Authentication={this.props.Authentication} />
            <GordonNavAvatarRightCorner
              onSignOut={this.props.onSignOut}
              Authentication={this.props.Authentication}
            />
          </Toolbar>
        </AppBar>
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
      </section>
    );
  }
}
GordonHeader.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
