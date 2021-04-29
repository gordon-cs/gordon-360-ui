import React, { useState } from 'react';
import { Divider, List } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
import WellnessIcon from '@material-ui/icons/LocalHospital';
import { signOut } from 'services/auth';
import user from 'services/user';
import useNetworkStatus from 'hooks/useNetworkStatus';
import GordonQuickLinksDialog from 'components/QuickLinksDialog';
import GordonDialogBox from 'components/GordonDialogBox/index';
import GordonNavButton from 'components/NavButton';
import './nav-links.css';

const GordonNavLinks = ({ onLinkClick, onSignOut, authentication }) => {
  const [areLinksOpen, setAreLinksOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const isOnline = useNetworkStatus();

  const handleSignOut = () => {
    signOut();
    onLinkClick();
    onSignOut();
  };

  const dialogBox = () => {
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
    } else if (dialog === 'unauthorized') {
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

  const homeButton = (
    <GordonNavButton
      onLinkClick={onLinkClick}
      linkName={'Home'}
      linkPath={'/'}
      LinkIcon={HomeIcon}
      divider={false}
    />
  );

  const involvementsButton = (
    <GordonNavButton
      onLinkClick={onLinkClick}
      linkName={'Involvements'}
      linkPath={'/involvements'}
      LinkIcon={LocalActivityIcon}
      divider={false}
    />
  );

  const eventsButton = (
    <GordonNavButton
      onLinkClick={onLinkClick}
      linkName={'Events'}
      linkPath={'/events'}
      LinkIcon={EventIcon}
      divider={false}
    />
  );

  const peopleButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : !authentication ? 'unauthorized' : null}
      onLinkClick={onLinkClick}
      openUnavailableDialog={setDialog}
      divider={false}
      linkName={'People'}
      linkPath="/people"
      LinkIcon={PeopleIcon}
    />
  );

  const timesheetsButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : !authentication ? 'unauthorized' : null}
      openUnavailableDialog={setDialog}
      onLinkClick={onLinkClick}
      linkName={'Timesheets'}
      linkPath={'/timesheets'}
      LinkIcon={WorkIcon}
      divider={false}
    />
  );

  const wellnessButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : !authentication ? 'unauthorized' : null}
      openUnavailableDialog={setDialog}
      onLinkClick={onLinkClick}
      linkName={'Wellness'}
      linkPath={'/wellness'}
      LinkIcon={WellnessIcon}
      divider={false}
    />
  );

  const linksButton = (
    <GordonNavButton
      unavailable={isOnline ? null : 'offline'}
      openUnavailableDialog={setDialog}
      divider={false}
      onLinkClick={() => {
        onLinkClick();
        setAreLinksOpen(true);
      }}
      linkName={'Links'}
    />
  );

  const helpButton = (
    <GordonNavButton
      onLinkClick={onLinkClick}
      linkName={'Help'}
      linkPath={'/help'}
      divider={false}
    />
  );

  const aboutButton = (
    <GordonNavButton
      onLinkClick={onLinkClick}
      linkName={'About'}
      linkPath={'/about'}
      divider={false}
    />
  );

  const feedbackButton = (
    <GordonNavButton
      unavailable={isOnline ? null : 'offline'}
      onLinkClick={onLinkClick}
      openUnavailableDialog={setDialog}
      divider={false}
      linkName={'Feedback'}
      linkPath={'/feedback'}
    />
  );

  const adminButton =
    authentication && user.getLocalInfo().college_role === 'god' ? (
      <GordonNavButton
        unavailable={!isOnline ? 'offline' : null}
        onLinkClick={onLinkClick}
        openUnavailableDialog={setDialog}
        linkName={'Admin'}
        linkPath={'/admin'}
        divider={false}
      />
    ) : null;

  const signInOutButton = (
    <GordonNavButton
      onLinkClick={authentication ? handleSignOut : onLinkClick}
      linkName={authentication ? 'Sign Out' : 'Sign In'}
      linkPath={'/'}
    />
  );

  return (
    <>
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

      {dialogBox()}
    </>
  );
};

export default GordonNavLinks;
