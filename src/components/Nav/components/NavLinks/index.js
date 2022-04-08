import { Divider, List } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import HomeIcon from '@material-ui/icons/Home';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import WellnessIcon from '@material-ui/icons/LocalHospital';
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
import GordonDialogBox from 'components/GordonDialogBox/index';
import GordonNavButton from 'components/NavButton';
import GordonQuickLinksDialog from 'components/QuickLinksDialog';
import { useAuth, useNetworkStatus } from 'hooks';
import { useState } from 'react';
import { signOut } from 'services/auth';
import storageService from 'services/storage';
import styles from './NavLinks.module.css';

const GordonNavLinks = ({ onLinkClick }) => {
  const [areLinksOpen, setAreLinksOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const isOnline = useNetworkStatus();
  const authenticated = useAuth();

  const handleSignOut = () => {
    onLinkClick();
    signOut();
  };

  const dialogBox = () => {
    if (dialog === 'offline') {
      return (
        <GordonDialogBox
          open={dialog}
          onClose={() => setDialog(null)}
          title={'Offline Mode'}
          buttonClicked={() => setDialog(null)}
          buttonName={'Okay'}
        >
          This feature is unavailable offline. Please reconnect to internet to access this feature.
        </GordonDialogBox>
      );
    } else if (dialog === 'unauthorized') {
      return (
        <GordonDialogBox
          open={dialog}
          onClose={() => setDialog(null)}
          title={'Credentials Needed'}
          buttonClicked={() => setDialog(null)}
          buttonName={'Okay'}
        >
          This feature is unavailable while not logged in. Please log in to access it.
        </GordonDialogBox>
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
      unavailable={!isOnline ? 'offline' : !authenticated ? 'unauthorized' : null}
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
      unavailable={!isOnline ? 'offline' : !authenticated ? 'unauthorized' : null}
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
      unavailable={!isOnline ? 'offline' : !authenticated ? 'unauthorized' : null}
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
    authenticated && storageService.getLocalInfo().college_role === 'god' ? (
      <GordonNavButton
        unavailable={!isOnline ? 'offline' : null}
        onLinkClick={onLinkClick}
        openUnavailableDialog={setDialog}
        linkName={'Admin'}
        linkPath={'/admin'}
        divider={false}
      />
    ) : null;

  const signOutButton = authenticated ? (
    <GordonNavButton onLinkClick={handleSignOut} linkName={'Sign Out'} />
  ) : null;

  return (
    <>
      <List className={styles.gordon_nav_links}>
        {homeButton}
        {involvementsButton}
        {eventsButton}
        {peopleButton}
        {timesheetsButton}
        {wellnessButton}
      </List>

      <Divider />

      <List className={styles.gordon_nav_links_bottom}>
        {linksButton}
        {helpButton}
        {aboutButton}
        {feedbackButton}
        {adminButton}
        {signOutButton}
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
