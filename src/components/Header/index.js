import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
import WellnessIcon from '@material-ui/icons/LocalHospital';
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
import storage from '../../services/storage';
import GordonDialogBox from '../GordonDialogBox/index';

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
    this.updateTabHighlight = this.updateTabHighlight.bind(this);
    this.createPeopleTab = this.createPeopleTab.bind(this);
    this.openDialogBox = this.openDialogBox.bind(this);
    this.closeDialogBox = this.closeDialogBox.bind(this);

    this.state = {
      value: null,
      dialogBoxNetworkOpen: false,
      dialogBoxLoginOpen: false,
      dialogBoxOpened: false,
      dialogType: '',
      dialogReason: '',
      network: 'online',
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
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

  componentDidMount() {
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

    let network;
    /* Attempts to get the network status from local storage.
     * If not found, the default value is online
     */
    try {
      network = storage.get('network-status');
    } catch (error) {
      // Defaults the network to online if not found in local storage
      network = 'online';
    }
    // Saves the network's status to this component's state
    this.setState({ network });
  }

  componentWillUnmount() {
    // Removes the window's event listener before unmounting the component
    window.removeEventListener('message', () => {});
  }

  /**
   * Creates a dialog box.
   *
   * Depending on the dialog box's type saved in the state, the dialog box and it's content is created
   *
   * @returns {JSX} The JSX of the dialog box
   */
  createDialogBox() {
    // Type - Offline
    if (this.state.dialogType === 'offline') {
      return (
        <GordonDialogBox
          open={this.state.dialogBoxOpened}
          onClose={this.closeDialogBox}
          labelledby={'offline-dialog'}
          describedby={'feature-deactivated'}
          title={'Offline Mode'}
          text={
            'This feature is unavailable offline. Please reconnect to internet to access this feature.'
          }
          buttonClicked={this.closeDialogBox}
          buttonName={'Okay'}
        />
      );
    }
    // Type - Unauthorized
    else if (this.state.dialogType === 'unauthorized') {
      return (
        <GordonDialogBox
          open={this.state.dialogBoxOpened}
          onClose={this.closeDialogBox}
          labelledby={'unauthorized-dialog'}
          describedby={'feature-unavailable'}
          title={'Credentials Needed'}
          text={`This feature is unavailable while not logged in. Please log in to ${this.state.dialogReason}.`}
          buttonClicked={this.closeDialogBox}
          buttonName={'Okay'}
        />
      );
    }
  }

  /**
   * Opens the dialog box.
   *
   * Depending on the type and reason for opening the dialog box, the dialog box's content is made.
   *
   * @param {String} type The type of dialog box requested.
   * @param {String} feature The feature the user attempted to access
   */
  openDialogBox(type, feature) {
    let reason = '';
    if (feature === 'people search') {
      reason = 'use People Search';
    } else if (feature === 'timesheets view') {
      reason = 'view Timesheets';
    } else if (feature === 'wellness check') {
      reason = 'check Wellness';
    } else if (feature === 'my profile view') {
      reason = 'view your personal profile';
    } else {
      reason = '';
    }

    this.setState({ dialogBoxOpened: true, dialogType: type, dialogReason: reason });
  }

  /**
   * Closes the dialog box.
   *
   * While closing the dialog box, all of its text content is erased.
   */
  closeDialogBox() {
    this.setState({ dialogBoxOpened: false, dialogType: '', dialogReason: '' });
  }

  /**
   * Creates the People Tab.
   *
   * Depending on the status of the network and authentication, the People tab is created.
   *
   * @return {JSX} The JSX of the People tab.
   */
  createPeopleTab() {
    let peopleTab;

    // Network Status: Online
    if (this.state.network === 'online') {
      // Network Status: Online - Authenticated
      if (this.props.Authentication) {
        peopleTab = (
          <Tab
            className="tab"
            icon={<PeopleIcon />}
            label="People"
            component={NavLink}
            to="/people"
          />
        );
      }
      // Network Status: Online -  Not Authenticated
      else {
        peopleTab = (
          <div onClick={clicked => this.openDialogBox('unauthorized', 'people search')}>
            <Tab
              className="tab"
              icon={<PeopleIcon />}
              label="People"
              component={Button}
              style={{ color: 'white' }}
              disabled={true}
            />
          </div>
        );
      }
    }
    // Network Status: Offline
    else {
      peopleTab = (
        <div
          onClick={clicked => {
            this.openDialogBox('offline', '');
          }}
        >
          <Tab
            className="tab"
            icon={<PeopleIcon />}
            label="People"
            component={Button}
            style={{ color: 'white' }}
            disabled={true}
          />
        </div>
      );
    }

    return peopleTab;
  }

  /**
   * Creates the Timesheets button.
   *
   * Depending on the status of the network and authentication, the Timesheets button is created.
   *
   * @return {JSX} The JSX of the Timesheets button.
   */
  createTimesheetsTab() {
    let timesheetsTab;

    // Network Status: Online
    if (this.state.network === 'online') {
      // Network Status: Online - Authenticated
      if (this.props.Authentication) {
        timesheetsTab = (
          <Tab
            className="tab"
            icon={<WorkIcon />}
            label="Timesheets"
            component={NavLink}
            to="/student-timesheets"
          />
        );
      }
      // Network Status: Online - Not Authenticated
      else {
        timesheetsTab = (
          <div onClick={clicked => this.openDialogBox('unauthorized', 'timesheets view')}>
            <Tab
              className="tab"
              icon={<WorkIcon />}
              label="Timesheets"
              component={NavLink}
              to="/timesheets"
              disabled={true}
            />
          </div>
        );
      }
    }
    // Network Status: Offline
    else {
      timesheetsTab = (
        <div onClick={clicked => this.openDialogBox('offline', '')}>
          <Tab
            className="tab"
            icon={<WorkIcon />}
            label="Timesheets"
            component={NavLink}
            to="/timesheets"
            disabled={true}
          />
        </div>
      );
    }

    return timesheetsTab;
  }

  /**
   * THE CODE FOR THE WELLNESS CHECK TABS.
   */
  createWellnessTab(){
    let wellnessTab;
    // Network Status: Online
    if (this.state.network === 'online') {
      // Network Status: Online - Authenticated
      if (this.props.Authentication) {
        wellnessTab = (
          <Tab
            className="tab"
            icon={<WellnessIcon />}
            label="Wellness"
            component={NavLink}
            to="/wellness"
          />
        );
      }
      // Network Status: Online -  Not Authenticated
      else {
        wellnessTab = (
          <div onClick={clicked => this.openDialogBox('unauthorized', 'wellness check')}>
            <Tab
              className="tab"
              icon={<WellnessIcon />}
              label="Wellness"
              component={Button}
              style={{ color: 'white' }}
              disabled={true}
            />
          </div>
        );
      }
    }
    // Network Status: Offline
    else {
      wellnessTab = (
        <div
          onClick={clicked => {
            this.openDialogBox('offline', '');
          }}
        >
          <Tab
            className="tab"
            icon={<WellnessIcon />}
            label="Wellness"
            component={Button}
            style={{ color: 'white' }}
            disabled={true}
          />
        </div>
      );
    }

    return wellnessTab;
  }
  render() {
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
                {this.createPeopleTab()}
                {/* Uncomment when re-enabling timesheets link */}
                {/* this.createTimesheetsTab() */}
                {this.createWellnessTab()}
              </Tabs>
            </div>

            <GordonPeopleSearch Authentication={this.props.Authentication} />

            <GordonNavAvatarRightCorner
              onSignOut={this.props.onSignOut}
              Authentication={this.props.Authentication}
            />

            {this.createDialogBox()}
          </Toolbar>
        </AppBar>
      </section>
    );
  }
}

GordonHeader.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
