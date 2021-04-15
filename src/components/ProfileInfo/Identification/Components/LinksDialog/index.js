import React, { useState } from 'react';
import user from 'services/user';
import { Button, DialogTitle, DialogActions, DialogContent, Typography } from '@material-ui/core';
import { socialMediaInfo } from 'socialMedia';
import { gordonColors } from 'theme';
import './linksDialog.css';
import UpdateLinkTextField from './components/UpdateLinkTextField';

const LinksDialog = ({
  links,
  createSnackbar,
  onClose,
  setFacebookLink,
  setTwitterLink,
  setLinkedInLink,
  setInstagramLink,
  setHandshakeLink,
}) => {
  const [formErrors, setFormErrors] = useState([]);
  const [updatedLinks, setUpdatedLinks] = useState(links);
  const [failedUpdates, setFailedUpdates] = useState([]);
  const hasUpdatedLink = Object.keys(updatedLinks).some(
    (platform) => updatedLinks[platform] !== links[platform],
  );

  const handleLinkUpdated = (platform, value) => {
    setUpdatedLinks((prev) => ({ ...prev, [platform]: value }));
    validateField(platform, value);
  };

  const validateField = (platform, value) => {
    const { prefix, prefix2 } = socialMediaInfo[platform];
    const isValid =
      value === '' || value.indexOf(prefix) === 0 || (prefix2 && value.indexOf(prefix2) === 0);
    if (isValid) {
      setFormErrors(formErrors.filter((error) => error !== platform));
    } else if (!formErrors.includes(platform)) {
      setFormErrors([...formErrors, platform]);
    }
  };

  const handleSubmit = async (e) => {
    const responses = await Promise.all(
      Object.keys(updatedLinks)
        .filter((platform) => updatedLinks[platform] !== links[platform])
        .map(async (platform) => ({
          platform: platform,
          value: await user.updateSocialLink(platform.toLowerCase(), updatedLinks[platform]),
        })),
    );

    responses.forEach((response) => {
      if (response.value === undefined) {
        setFailedUpdates((prevState) => [...prevState, [response.platform]]);
      } else {
        if (response.platform === 'facebook') setFacebookLink(updatedLinks?.facebook);
        else if (response.platform === 'twitter') setTwitterLink(updatedLinks?.twitter);
        else if (response.platform === 'linkedIn') setLinkedInLink(updatedLinks?.linkedIn);
        else if (response.platform === 'instagram') setInstagramLink(updatedLinks?.instagram);
        else if (response.platform === 'handshake') setHandshakeLink(updatedLinks?.handshake);
        setFailedUpdates((prevState) => prevState.filter((link) => link !== response.platform));
      }
    });

    if (failedUpdates.length) {
      console.log('Failed Updates: ', failedUpdates);
      createSnackbar({ message: 'Failed Updating Link(s)', severity: 'error' });
    } else {
      onClose();
      createSnackbar({ message: 'Social Media Links Updated', severity: 'success' });
    }
  };

  return (
    <div className="gc360-links-dialog">
      <DialogTitle className="gc360-links-dialog_title">Social Media Links</DialogTitle>
      <DialogContent className="gc360-links-dialog_content">
        <Typography variant="body2" className="gc360-links-dialog_content_text">
          Paste or Edit your links below. When done, click Submit
        </Typography>
        {Object.keys(socialMediaInfo).map((platform) => (
          <UpdateLinkTextField
            key={platform}
            platform={platform}
            label={`${platform} ${
              failedUpdates.includes(platform)
                ? '(failed)'
                : updatedLinks[platform] !== links[platform]
                ? '(updated)'
                : 'link'
            }`}
            value={updatedLinks?.[platform]}
            onChange={(event) => handleLinkUpdated(platform, event.target.value)}
            error={formErrors.includes(platform)}
          />
        ))}
      </DialogContent>
      <DialogActions className="gc360-links-dialog_actions">
        <Button onClick={onClose} variant="outlined" color="primary">
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
