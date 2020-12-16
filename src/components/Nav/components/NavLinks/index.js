import React, { useState } from 'react';
import { Divider, List } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
import WellnessIcon from '@material-ui/icons/LocalHospital';
import { signOut } from '../../../../services/auth';
import user from '../../../../services/user';
import { useNetworkIsOnline } from '../../../../context/NetworkContext';
import GordonQuickLinksDialog from '../../../QuickLinksDialog';
import GordonDialogBox from '../../../GordonDialogBox/index';
import GordonNavButton from '../../../NavButton';
import './nav-links.css';

const GordonNavLinks = (props) => {
  const [areLinksOpen, setAreLinksOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const isOnline = useNetworkIsOnline();

  /**
   * Signs user out
   */
  const onSignOut = () => {
    signOut();
    props.onLinkClick();
    props.onSignOut();
  };

  /**
   * Brings user to login page
   */
  const onSignIn = () => {
    props.onLinkClick();
  };

  /**
   * Creates a dialog box.
   *
   * Depending on the dialog box's type saved in the state, the dialog box and it's content is created.
   *
   * @returns {JSX} The JSX of the dialog box
   */
  const createDialogBox = () => {
    // Type - Offline
    if (dialog === 'offline') {
      return (
        <GordonDialogBox
          open={dialog}
          onClose={() => setDialog(null)}
          labelledby={'offline-dialog'}
          describedby={'feature-deactivated'}
          title={'Offline Mode'}
          text={
            'This feature is unavailable offline. Please reconnect to internet to access this feature.'
          }
          buttonClicked={() => setDialog(null)}
          buttonName={'Okay'}
        />
      );
    }
    // Type - Unauthorized
    else if (dialog === 'unauthorized') {
      return (
        <GordonDialogBox
          open={dialog}
          onClose={() => setDialog(null)}
          labelledby={'unauthorized-dialog'}
          describedby={'feature-unavailable'}
          title={'Credentials Needed'}
          text={`This feature is unavailable while not logged in. Please log in to access it.`}
          buttonClicked={() => setDialog(null)}
          buttonName={'Okay'}
        />
      );
    }
  };

  let homeButton = (
    <GordonNavButton
      onLinkClick={props.onLinkClick}
      linkName={'Home'}
      linkPath={'/'}
      LinkIcon={HomeIcon}
      divider={false}
    />
  );

  let involvementsButton = (
    <GordonNavButton
      onLinkClick={props.onLinkClick}
      linkName={'Involvements'}
      linkPath={'/involvements'}
      LinkIcon={LocalActivityIcon}
      divider={false}
    />
  );

  let eventsButton = (
    <GordonNavButton
      onLinkClick={props.onLinkClick}
      linkName={'Events'}
      linkPath={'/events'}
      LinkIcon={EventIcon}
      divider={false}
    />
  );

  let peopleButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : !props.authentication ? 'unauthorized' : null}
      onLinkClick={props.onLinkClick}
      openUnavailableDialog={setDialog}
      divider={false}
      linkName={'People'}
      linkPath="/people"
      LinkIcon={PeopleIcon}
    />
  );

  let timesheetsButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : !props.authentication ? 'unauthorized' : null}
      openUnavailableDialog={setDialog}
      onLinkClick={props.onLinkClick}
      linkName={'Timesheets'}
      linkPath={'/timesheets'}
      LinkIcon={WorkIcon}
      divider={false}
    />
  );

  let wellnessButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : !props.authentication ? 'unauthorized' : null}
      openUnavailableDialog={setDialog}
      linkName={'Wellness'}
      linkPath={'/wellness'}
      LinkIcon={WellnessIcon}
      divider={false}
    />
  );

  let linksButton = (
    <GordonNavButton
      unavailable={isOnline ? null : 'offline'}
      openUnavailableDialog={setDialog}
      divider={false}
      onLinkClick={() => {
        props.onLinkClick();
        setAreLinksOpen(true);
      }}
      linkName={'Links'}
    />
  );

  let helpButton = (
    <GordonNavButton
      onLinkClick={props.onLinkClick}
      linkName={'Help'}
      linkPath={'/help'}
      divider={false}
    />
  );

  let aboutButton = (
    <GordonNavButton
      onLinkClick={props.onLinkClick}
      linkName={'About'}
      linkPath={'/about'}
      divider={false}
    />
  );

  let feedbackButton = (
    <GordonNavButton
      unavailable={isOnline ? null : 'offline'}
      onLinkClick={props.onLinkClick}
      openUnavailableDialog={setDialog}
      divider={false}
      linkName={'Feedback'}
      linkPath={'/feedback'}
    />
  );

  let adminButton;
  if (props.authentication && user.getLocalInfo().college_role === 'god') {
    adminButton = (
      <GordonNavButton
        unavailable={!isOnline ? 'offline' : null}
        onLinkClick={props.onLinkClick}
        openUnavailableDialog={setDialog}
        linkName={'Admin'}
        linkPath={'/admin'}
        divider={false}
      />
    );
  } else {
    adminButton = null;
  }

  let signInOutButton = (
    <GordonNavButton
      onLinkClick={props.authentication ? onSignOut : onSignIn}
      linkName={props.authentication ? 'Sign Out' : 'Sign In'}
      linkPath={'/'}
    />
  );

  return (
    <div>
      <List className="gordon-nav-links">
        {homeButton}
        {involvementsButton}
        {eventsButton}
        {peopleButton}
        {timesheetsButton}
        {wellnessButton}
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

      <GordonQuickLinksDialog
        handleLinkClickOpen={() => setAreLinksOpen(true)}
        handleLinkClose={() => setAreLinksOpen(false)}
        linkopen={areLinksOpen}
      />

      {createDialogBox()}
    </div>
  );
};

export default GordonNavLinks;
