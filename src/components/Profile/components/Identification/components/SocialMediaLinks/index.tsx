import { Button, Dialog, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useState } from 'react';
import { Profile as profileType } from 'services/user';
import { platforms, socialMediaInfo } from 'services/socialMedia';
import { severityType } from 'components/Snackbar';
// @TODO CSSMODULES - outside directory
import styles from '../../Identification.module.css';
import LinksDialog from './components/LinksDialog/index';

type Props = {
  profile: profileType;
  createSnackbar: (message: string, severity: severityType) => void;
  myProf: boolean;
};

const SocialMediaLinks = ({ profile, createSnackbar, myProf }: Props) => {
  const [socialLinksOpen, setSocialLinksOpen] = useState(false);
  const [links, setLinks] = useState(
    platforms.reduce((links, platform) => ({ ...links, [platform]: profile[platform] || '' }), {}),
  );
  const isOnline = useNetworkStatus();
  const numberOfLinks = platforms.reduce(
    (num, platform) => (links[platform as keyof typeof links] ? num + 1 : num),
    0,
  );

  return (
    <>
      {(myProf || platforms.some((platform) => links[platform as keyof typeof links])) && (
        <Grid item className={styles.identification_card_content_card_container_info_social_media}>
          <Grid
            container
            justifyContent={numberOfLinks < 3 ? 'space-evenly' : 'space-between'}
            alignItems="center"
          >
            {platforms.map((platform) => {
              if (links[platform as keyof typeof links]) {
                return (
                  <Grid item key={platform}>
                    <a
                      href={links[platform as keyof typeof links]}
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
