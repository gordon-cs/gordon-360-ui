import List from '@material-ui/core/List';
import GordonDialogBox from '../../../GordonDialogBox/index';
import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { signOut } from '../../../../services/auth';
import storage from '../../../../services/storage';
import QuickLinksDialog from '../../../QuickLinksDialog';
import {
  createLinksButton,
  createFeedbackButton,
  createAdminButton,
  createPeopleButton,
  createInvolvementsButton,
  createEventsButton,
  createHomeButton,
  createSignInOutButton,
  createHelpButton,
  createAboutButton,
  createTimesheetsButton,
} from './navButtons.js';
import './nav-links.css';

export default class GordonNavLinks extends Component {
  constructor(props) {
    super(props);
    this.onSignOut = this.onSignOut.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.handleLinkClickOpen = this.handleLinkClickOpen.bind(this);
    this.handleLinkClose = this.handleLinkClose.bind(this);
    this.openDialogBox = this.openDialogBox.bind(this);
    this.closeDialogBox = this.closeDialogBox.bind(this);

    this.state = {
      linkopen: false,
      dialogBoxOpened: false,
      dialogType: '',
      dialogReason: '',
      network: 'online',
    };
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
        this.setState({ network: 'offline', linkopen: false });
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
   * Signs user out
   */
  onSignOut() {
    signOut();
    this.props.onLinkClick();
    this.props.onSignOut();
  }

  /**
   * Brings user to login page
   */
  onSignIn() {
    this.props.onLinkClick();
  }

  /**
   * Opens the dialog box containing external links
   */
  handleLinkClickOpen() {
    this.setState({
      linkopen: true,
    });
  }

  /**
   * Closes the dialog box containing external links
   */
  handleLinkClose() {
    this.setState({ linkopen: false });
  }

  /**
   * Creates a dialog box.
   *
   * Depending on the dialog box's type saved in the state, the dialog box and it's content is created.
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
   * @param {String} type The type of dialog box requested
   * @param {String} feature The feature the user attempted to access
   */
  openDialogBox(type, feature) {
    let reason = '';
    if (feature === 'people search') {
      reason = 'use People Search';
    } else if (feature === 'timesheets view') {
      reason = 'view Timesheets';
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

  render() {
    // Home Button
    let homeButton = createHomeButton(this.props.onLinkClick);

    // Involvements Button
    let involvementsButton = createInvolvementsButton(this.props.onLinkClick);

    // Events Button
    let eventsButton = createEventsButton(this.props.onLinkClick);

    // People Button
    let peopleButton = createPeopleButton(
      this.state.network,
      this.props.Authentication,
      this.props.onLinkClick,
      this.openDialogBox,
    );

    // Timesheets Button
    let timesheetsButton = createTimesheetsButton(
      this.state.network,
      this.props.Authentication,
      this.props.onLinkClick,
      this.openDialogBox,
    );

    // Links Button
    let linksButton = createLinksButton(
      this.state.network,
      this.handleLinkClickOpen,
      this.openDialogBox,
    );

    // Help Button
    let helpButton = createHelpButton(this.props.onLinkClick);

    // About Button
    let aboutButton = createAboutButton(this.props.onLinkClick);

    // Feedback Button
    let feedbackButton = createFeedbackButton(
      this.state.network,
      this.props.onLinkClick,
      this.openDialogBox,
    );

    // Admin Button
    let adminButton = createAdminButton(
      this.state.network,
      this.props.Authentication,
      this.props.onLinkClick,
      this.openDialogBox,
    );

    // Sign In & Out Button
    let signInOutButton = createSignInOutButton(
      this.props.Authentication,
      this.onSignOut,
      this.onSignIn,
    );

    // Add this to the list when re-implementing Timesheet links

    //Add this to the list when re-implementing Timesheet links
    //{Timesheetbutton}
    return (
      <div>
        <List className="gordon-nav-links">
          {homeButton}
          {involvementsButton}
          {eventsButton}
          {peopleButton}
          {timesheetsButton}
        </List>

        <Divider />

        <List className="gordon-nav-links-bottom">
          {linksButton}
          {helpButton}
          {aboutButton}
          {feedbackButton}
          {adminButton}
          {signInOutButton}
        </List>

        <QuickLinksDialog
          handleLinkClickOpen={this.handleLinkClickOpen}
          handleLinkClose={this.handleLinkClose}
          linkopen={this.state.linkopen}
        />

        {this.createDialogBox()}
      </div>
    );
  }
}

GordonNavLinks.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};
