import { useIsAuthenticated } from '@azure/msal-react';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PeopleIcon from '@mui/icons-material/People';
import { Divider, List } from '@mui/material';
import RecIMIcon from '@mui/icons-material/SportsFootball';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonNavButton from 'components/NavButton';
import GordonQuickLinksDialog from 'components/QuickLinksDialog';
import PaletteSwitcherDialog from 'components/PaletteSwitcherDialog';
import { useAuthGroups, useNetworkStatus } from 'hooks';
import { useState } from 'react';
import { AuthGroup, signOut } from 'services/auth';
import styles from './NavLinks.module.css';

const GordonNavLinks = ({ onLinkClick }) => {
  const [areLinksOpen, setAreLinksOpen] = useState(false);
  const [paletteOptionsOpen, setPaletteOptionsOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const isOnline = useNetworkStatus();
  const isAuthenticated = useIsAuthenticated();
  const isSiteAdmin = useAuthGroups(AuthGroup.SiteAdmin);

  const handleSignOut = () => {
    onLinkClick();
    signOut();
  };

  const dialogBox = () => {
    let message, title;
    switch (dialog) {
      case 'offline':
        message = 'That page is not available offline. Please reconnect to internet to access it.';
        title = 'Unavailable Offline';
        break;
      case 'unauthorized':
        message = 'That page is only available to authenticated users. Please log in to access it.';
        title = 'Unavailable Offline';
        break;
      default:
        message =
          'Something went wrong. Try reloading the page, or contact CTS@gordon.edu for help.';
        title = 'Unknown Error';
        break;
    }
    return (
      <GordonDialogBox
        open={dialog}
        onClose={() => setDialog(null)}
        title={title}
        buttonClicked={() => setDialog(null)}
        buttonName={'Okay'}
      >
        {message}
      </GordonDialogBox>
    );
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
      unavailable={!isOnline ? 'offline' : !isAuthenticated ? 'unauthorized' : null}
      onLinkClick={onLinkClick}
      openUnavailableDialog={setDialog}
      divider={false}
      linkName={'People'}
      linkPath="/people"
      LinkIcon={PeopleIcon}
    />
  );

  const recimButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : !isAuthenticated ? 'unauthorized' : null}
      openUnavailableDialog={setDialog}
      onLinkClick={onLinkClick}
      linkName={'Rec-IM'}
      linkPath={'/recim'}
      LinkIcon={RecIMIcon}
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

  const paletteOptionsButton = (
    <GordonNavButton
      onLinkClick={() => {
        onLinkClick();
        setPaletteOptionsOpen(true);
      }}
      openUnavailableDialog={setDialog}
      linkName={'Appearance'}
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
    isAuthenticated && isSiteAdmin ? (
      <GordonNavButton
        unavailable={!isOnline ? 'offline' : null}
        onLinkClick={onLinkClick}
        openUnavailableDialog={setDialog}
        linkName={'Admin'}
        linkPath={'/admin'}
        divider={false}
      />
    ) : null;

  const signOutButton = isAuthenticated ? (
    <GordonNavButton onLinkClick={handleSignOut} linkName={'Sign Out'} />
  ) : null;

  return (
    <>
      <List className={styles.gordon_nav_links}>
        {homeButton}
        {involvementsButton}
        {eventsButton}
        {peopleButton}
        {recimButton}
      </List>

      <Divider />

      <List className={styles.gordon_nav_links_bottom}>
        {linksButton}
        {helpButton}
        {aboutButton}
        {paletteOptionsButton}
        {feedbackButton}
        {adminButton}
        {signOutButton}
      </List>

      <GordonQuickLinksDialog
        handleLinkClickOpen={() => setAreLinksOpen(true)}
        handleLinkClose={() => setAreLinksOpen(false)}
        linkopen={areLinksOpen}
      />
      <PaletteSwitcherDialog
        handleClose={() => setPaletteOptionsOpen(false)}
        dialogOpen={paletteOptionsOpen}
      />

      {dialogBox()}
    </>
  );
};

export default GordonNavLinks;
