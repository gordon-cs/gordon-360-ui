import { AlertColor, Button, Dialog, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useState } from 'react';
import { Profile } from 'services/user';
import { Platform, platforms, socialMediaInfo } from 'services/socialMedia';
// @TODO CSSMODULES - outside directory
import styles from '../../Identification.module.css';
import LinksDialog from './components/LinksDialog/index';

type Props = {
  profile: Profile;
  createSnackbar: (message: string, severity: AlertColor) => void;
  myProf: boolean;
};

const SocialMediaLinks = ({ profile, createSnackbar, myProf }: Props) => {
  const [socialLinksOpen, setSocialLinksOpen] = useState(false);
  const [links, setLinks] = useState<Record<Platform, string>>(
    platforms.reduce(
      (links, platform) => ({ ...links, [platform]: profile[platform] || '' }),
      {} as Record<Platform, string>,
    ),
  );
  const isOnline = useNetworkStatus();
  const numberOfLinks = platforms.reduce((num, platform) => (links[platform] ? num + 1 : num), 0);

  return (
    <>
      {(myProf || platforms.some((platform) => links[platform])) && (
        <Grid item className={styles.identification_card_content_card_container_info_social_media}>
          <Grid
            container
            justifyContent={numberOfLinks < 3 ? 'space-evenly' : 'space-between'}
            alignItems="center"
          >
            {platforms.map((platform) => {
              if (links[platform]) {
                return (
                  <Grid item key={platform}>
                    <a
                      href={links[platform]}
                      className={`gc360_text_link ${styles.gc360_my_profile_icon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {socialMediaInfo[platform].Icon}
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
                    size="large"
                    aria-label="Update social media links"
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
              ) : (
                <Grid container justifyContent="center">
                  <Button
                    onClick={() => setSocialLinksOpen(true)}
                    className={styles.socialmediabutton}
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
