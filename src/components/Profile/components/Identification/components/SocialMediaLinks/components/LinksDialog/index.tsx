import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { platforms, Platform, socialMediaInfo } from 'services/socialMedia';
import user from 'services/user';
import { useUserActions } from 'hooks';
import styles from './LinksDialog.module.css';

type Props = {
  links: {};
  createSnackbar: ({}, {}) => void;
  onClose: () => void;
  setLinks: ({}) => void;
};

const LinksDialog = ({ links, createSnackbar, onClose, setLinks }: Props) => {
  const [formErrors, setFormErrors] = useState<Platform[]>([]);
  const [updatedLinks, setUpdatedLinks] = useState(links);
  const [failedUpdates, setFailedUpdates] = useState<Platform[]>([]);
  const hasUpdatedLink = platforms.some(
    (platform) =>
      updatedLinks[platform as keyof typeof updatedLinks] !== links[platform as keyof typeof links],
  );

  const { updateProfile } = useUserActions();

  const handleLinkUpdated = (platform: keyof typeof socialMediaInfo, value: string) => {
    setUpdatedLinks((prev) => ({ ...prev, [platform]: value }));
    validateField(platform, value);
  };

  const validateField = (platform: keyof typeof socialMediaInfo, value: string) => {
    const { prefix, prefix2 } = socialMediaInfo[platform];
    const isValid =
      value === '' || value.indexOf(prefix) === 0 || (prefix2 && value.indexOf(prefix2) === 0);

    if (isValid) {
      setFormErrors(formErrors.filter((error) => error !== platform));
    } else if (!formErrors.includes(platform)) {
      setFormErrors([...formErrors, platform]);
    }
  };

  const handleSubmit = async () => {
    const responses = await Promise.all(
      platforms
        .filter(
          (platform) =>
            updatedLinks[platform as keyof typeof updatedLinks] !==
            links[platform as keyof typeof links],
        ) // Remove unchanged links
        .map(async (platform) => ({
          platform: platform,
          value: await user.updateSocialLink(
            platform,
            updatedLinks[platform as keyof typeof updatedLinks],
          ),
        })),
    );

    responses.forEach((response) => {
      if (response.value === undefined) {
        setFailedUpdates((prevState) => [...prevState, response.platform]);
      } else {
        setLinks((prevLinks: {}) => ({
          ...prevLinks,
          [response.platform]: updatedLinks[response.platform as keyof typeof updatedLinks],
        }));
        setFailedUpdates((prevState) => prevState.filter((link) => link !== response.platform));
      }
    });

    if (failedUpdates.length) {
      console.log('Failed Updates: ', failedUpdates);
      createSnackbar('Failed Updating Link(s)', 'error');
    } else {
      createSnackbar('Social Media Links Updated', 'success');
      updateProfile();
    }
    onClose();
  };

  return (
    <div className={styles.gc360_links_dialog}>
      <DialogTitle className={styles.gc360_links_dialog_title}>Social Media Links</DialogTitle>
      <DialogContent className={styles.gc360_links_dialog_content}>
        <Typography variant="body2" className={styles.gc360_links_dialog_content_text}>
          Paste or Edit your links below. When done, click Submit
        </Typography>
        {platforms.map((platform) => (
          <div
            key={platform}
            className={`${styles.gc360_links_dialog_content_}${platform} ${styles.gc360_links_dialog_content_media}`}
          >
            <div className={styles.gc360_links_dialog_content_icon}>
              {socialMediaInfo[platform].Icon}
            </div>
            <TextField
              id={`${platform}-input`}
              label={`${platform} ${
                failedUpdates.includes(platform)
                  ? '(failed)'
                  : updatedLinks[platform as keyof typeof updatedLinks] !==
                      links[platform as keyof typeof links]
                    ? '(updated)'
                    : 'link'
              }`}
              value={updatedLinks[platform as keyof typeof updatedLinks]}
              onChange={(event) => handleLinkUpdated(platform, event.target.value)}
              error={formErrors.includes(platform)}
              helperText={formErrors.includes(platform) ? `Invalid ${platform} link` : null}
              size="small"
              fullWidth
              multiline
              className={styles.gc360_links_dialog_content_field}
              variant="outlined"
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions className={styles.gc360_links_dialog_actions}>
        <Button onClick={onClose} variant="contained" color="secondary">
          Cancel
        </Button>
        {hasUpdatedLink && !formErrors.length && (
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {failedUpdates.length ? 'Resubmit' : 'Submit'}
          </Button>
        )}
      </DialogActions>
    </div>
  );
};

export default LinksDialog;
