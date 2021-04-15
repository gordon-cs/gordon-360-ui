import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import LinksDialog from './components/LinksDialog/index';
import { socialMediaInfo } from 'socialMedia';
import { Grid, Button, Dialog, IconButton } from '@material-ui/core';
import useNetworkStatus from 'hooks/useNetworkStatus';

const SocialMediaLinks = ({ profile, createSnackbar, myProf }) => {
  const [socialLinksOpen, setSocialLinksOpen] = useState(false);
  const [links, setLinks] = useState({
    facebook: profile.Facebook
      ? socialMediaInfo.facebook.prefix + decodeURIComponent(profile.Facebook)
      : '',
    twitter: profile.Twitter
      ? socialMediaInfo.twitter.prefix + decodeURIComponent(profile.Twitter)
      : '',
    linkedIn: profile.LinkedIn
      ? socialMediaInfo.linkedIn.prefix + decodeURIComponent(profile.LinkedIn)
      : '',
    instagram: profile.Instagram
      ? socialMediaInfo.instagram.prefix + decodeURIComponent(profile.Instagram)
      : '',
    handshake: profile.Handshake
      ? socialMediaInfo.handshake.prefix + decodeURIComponent(profile.Handshake)
      : '',
  });
  // const [links.facebook, setFacebookLink] = useState(
  //   profile.Facebook ? socialMediaInfo.facebook.prefix + decodeURIComponent(profile.Facebook) : '',
  // );
  // const [links.linkedIn, setLinkedInLink] = useState(
  //   profile.LinkedIn ? socialMediaInfo.linkedIn.prefix + decodeURIComponent(profile.LinkedIn) : '',
  // );
  // const [links.twitter, setTwitterLink] = useState(
  //   profile.Twitter ? socialMediaInfo.twitter.prefix + decodeURIComponent(profile.Twitter) : '',
  // );
  // const [links.instagram, setInstagramLink] = useState(
  //   profile.Instagram
  //     ? socialMediaInfo.instagram.prefix + decodeURIComponent(profile.Instagram)
  //     : '',
  // );
  // const [links.handshake, setHandshakeLink] = useState(
  //   profile.Handshake
  //     ? socialMediaInfo.handshake.prefix + decodeURIComponent(profile.Handshake)
  //     : '',
  // );
  const isOnline = useNetworkStatus();

  let linksDialog = isOnline ? (
    <LinksDialog
      createSnackbar={createSnackbar}
      links={links}
      onClose={() => setSocialLinksOpen(false)}
      setLinks={setLinks}
    />
  ) : null;

  // Defines which social media icons will display
  let facebookButton;
  let twitterButton;
  let linkedInButton;
  let instagramButton;
  let handshakeButton;
  let editButton;
  let linkCount = 0; // To record whether or not any links are displayed

  if (links.facebook) {
    facebookButton = (
      <Grid item>
        <a
          href={links.facebook}
          className="gc360-my-profile_icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          {socialMediaInfo.facebook.icon}
        </a>
      </Grid>
    );
    linkCount += 1;
  }
  if (links.twitter) {
    twitterButton = (
      <Grid item>
        <a
          href={links.twitter}
          className="gc360-my-profile_icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          {socialMediaInfo.twitter.icon}
        </a>
      </Grid>
    );
    linkCount += 1;
  }
  if (links.linkedIn) {
    linkedInButton = (
      <Grid item>
        <a
          href={links.linkedIn}
          className="gc360-my-profile_icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          {socialMediaInfo.linkedIn.icon}
        </a>
      </Grid>
    );
    linkCount += 1;
  }
  if (links.instagram) {
    instagramButton = (
      <Grid item>
        <a
          href={links.instagram}
          className="gc360-my-profile_icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          {socialMediaInfo.instagram.icon}
        </a>
      </Grid>
    );
    linkCount += 1;
  }
  if (links.handshake) {
    handshakeButton = (
      <Grid item>
        <a
          href={links.handshake}
          className="gc360-my-profile_icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          {socialMediaInfo.handshake.icon}
        </a>
      </Grid>
    );
    linkCount += 1;
  }
  if (linkCount > 0) {
    editButton = (
      <Grid item>
        <IconButton className="gc360-my-profile_edit-icon" onClick={() => setSocialLinksOpen(true)}>
          <EditIcon />
        </IconButton>
      </Grid>
    );
  } else {
    editButton = (
      <Grid container justify="center">
        <Button onClick={() => setSocialLinksOpen(true)} /*style={style.socialMediaButton}*/>
          EDIT SOCIAL MEDIA LINKS
        </Button>
      </Grid>
    );
  }
  return (
    <>
      {(facebookButton ||
        twitterButton ||
        linkedInButton ||
        instagramButton ||
        handshakeButton ||
        myProf) && (
        <Grid item className="identification-card-content-card-container-info-social-media">
          <Grid
            container
            justify={linkCount < 3 ? 'space-evenly' : 'space-between'}
            alignItems="center"
          >
            {facebookButton}
            {twitterButton}
            {linkedInButton}
            {instagramButton}
            {handshakeButton}
            {isOnline && myProf && editButton}
          </Grid>
        </Grid>
      )}
      <Dialog
        open={socialLinksOpen}
        disableBackdropClick
        onClose={() => setSocialLinksOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {linksDialog}
      </Dialog>
    </>
  );
};

export default SocialMediaLinks;
