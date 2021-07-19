import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import PersonIcon from '@material-ui/icons/Person';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import user from 'services/user';

/**
 * @typedef { import('services/user').StudentProfileInfo } StudentProfileInfo
 */

/**
 * Renders the list item for the apartment applicant list
 * @param {Object} props The React component props
 * @param {Boolean} props.disabled Boolean to disable the interactive elements of this list item
 * @param {StudentProfileInfo} props.profile The StudentProfileInfo of the applicant
 * @param {Boolean} props.isApplicationEditor Boolean indicating whether this list item corresponds to the application editor
 * @param {CallbackFcn} props.onChangeEditor Callback for change editor button
 * @param {CallbackFcn} props.onApplicantRemove Callback for remove applicant button
 * @returns {JSX.Element} JSX Element for the applicant list item
 */
const ApplicantListItem = ({
  disabled,
  profile,
  isApplicationEditor,
  onChangeEditor,
  onApplicantRemove,
}) => {
  const [avatar, setAvatar] = useState(null);
  const [hasNickName, setHasNickname] = useState(false);

  useEffect(() => {
    loadAvatar(profile);
    setHasNickname(profile.FirstName !== profile.NickName && profile.NickName !== '');
  }, [profile]);

  /**
   * Creates the Avatar image of the given user
   *
   * @async
   * @function loadAvatar
   * @param {StudentProfileInfo} profile The StudentProfileInfo object for the student represented by this list item
   */
  const loadAvatar = async (profile) => {
    try {
      const { def: defaultImage, pref: preferredImage } = await user.getImage(profile.AD_Username);
      setAvatar(preferredImage || defaultImage);
    } catch {
      setAvatar(
        <svg width="50" height="50" viewBox="0 0 50 50">
          <rect width="50" height="50" rx="10" ry="10" fill="#CCC" />
        </svg>,
      );
    }
  };

  const displayName = hasNickName
    ? `${profile.FirstName} ${profile.LastName} (${profile.NickName})`
    : `${profile.FirstName} ${profile.LastName}`;

  return (
    <React.Fragment>
      <ListItem
        key={profile.AD_Username}
        component={Link}
        target="_blank"
        to={`/profile/${profile.AD_Username}`}
        className="list-item"
      >
        <ListItemAvatar>
          {avatar ? (
            <Avatar className={`avatar`} src={`data:image/jpg;base64,${avatar}`} alt="" />
          ) : (
            <Avatar>
              <PersonIcon color="primary" />
            </Avatar>
          )}
        </ListItemAvatar>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={8} sm>
            <ListItemText
              primary={displayName}
              secondary={profile.Class ?? ''}
              className="list-item"
            />
          </Grid>
        </Grid>
        <ListItemSecondaryAction>
          <Grid container justifyContent="flex-end" alignItems="center" spacing={0}>
            <Grid item xs>
              <IconButton
                aria-label={isApplicationEditor ? 'current-editor' : 'set-new-editor'}
                disabled={isApplicationEditor || disabled}
                onClick={() => profile && onChangeEditor?.(profile)}
              >
                {isApplicationEditor ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
            </Grid>
            <Grid item xs>
              <IconButton
                aria-label="remove-applicant"
                disabled={isApplicationEditor || disabled}
                onClick={() => profile?.AD_Username && onApplicantRemove?.(profile.AD_Username)}
              >
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

export default ApplicantListItem;
