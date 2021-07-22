import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import LinksDialog from './components/LinksDialog/index';
import { socialMediaInfo } from 'socialMedia';
import { Grid, Button, Dialog, IconButton } from '@material-ui/core';
import useNetworkStatus from 'hooks/useNetworkStatus';

// @TODO CSSMODULES - outside directory
import styles from './../../Identification.module.css';

const SocialMediaLinks = ({ profile, createSnackbar, myProf }) => {
  const [socialLinksOpen, setSocialLinksOpen] = useState(false);
  const [links, setLinks] = useState(
    socialMediaInfo.platforms.reduce(
      (links, platform) => ({ ...links, [platform]: profile[platform] || '' }),
      {},
    ),
  );
  const isOnline = useNetworkStatus();
  const numberOfLinks = socialMediaInfo.platforms.reduce(
    (num, platform) => (links[platform] ? num + 1 : num),
    0,
  );

  return (
    <>
      {(myProf || socialMediaInfo.platforms.some((platform) => links[platform])) && (
        <Grid item className={styles.identification_card_content_card_container_info_social_media}>
          <Grid
            container
            justifyContent={numberOfLinks < 3 ? 'space-evenly' : 'space-between'}
            alignItems="center"
          >
            {socialMediaInfo.platforms.map((platform) => {
              if (links[platform]) {
                return (
                  <Grid item key={platform}>
                    <a
                      href={links[platform]}
                      className={styles.gc360_my_profile_icon}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {socialMediaInfo[platform].icon}
                    </a>
                  </Grid>
                );
              } else {
                return null;
              }
            })}
            {isOnline &&
              myProf &&
              (numberOfLinks > 0 ? (
                <Grid item>
                  <IconButton
                    className={styles.gc360_my_profile_edit_icon}
                    onClick={() => setSocialLinksOpen(true)}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
              ) : (
                <Grid container justifyContent="center">
                  <Button
                    onClick={() => setSocialLinksOpen(true)}
                    color="secondary"
                    style={{ fontSize: '1rem' }}
                  >
                    EDIT SOCIAL MEDIA LINKS
                  </Button>
                </Grid>
              ))}
          </Grid>
        </Grid>
      )}
      <Dialog
        open={socialLinksOpen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {isOnline && (
          <LinksDialog
            createSnackbar={createSnackbar}
            links={links}
            onClose={() => setSocialLinksOpen(false)}
            setLinks={setLinks}
          />
        )}
      </Dialog>
    </>
  );
};

export default SocialMediaLinks;
