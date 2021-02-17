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
import user from '../../../../../../../../services/user';

/**
 * @typedef { import('../../../../services/user').StudentProfileInfo } StudentProfileInfo
 */

// Based off src/views/PeopleSearch/components/PeopleSearchResult
// but using props.profile of type StudentProfileInfo
// rather than using Person of type PeopleSearchResult
const ApplicantListItem = ({
  disabled,
  profile,
  isApplicationEditor,
  onChangeEditor,
  onApplicantRemove,
}) => {
  const [avatar, setAvatar] = useState(null);
  const [hasNickName, setHasNickname] = useState(false);
  const [personClass, setPersonClass] = useState(profile.Class);

  useEffect(() => {
    loadAvatar(profile);
    createNickname(profile);
    if (String(profile.PersonType).includes('stu') && profile.Class !== undefined) {
      setPersonClass(profile.Class);
    } else {
      // Technically, this case should never happen because the list does not allow the user to add a non-student to the applicant list
      setPersonClass('');
    }
  }, [profile]);

  /**
   * Creates the Avatar image of the given user
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

  /**
   * Saves the nickname of the given user if available
   * @param {StudentProfileInfo} profile The StudentProfileInfo object for the student represented by this list item
   */
  const createNickname = (profile) => {
    let Name = String(profile.fullName);
    let FirstName = Name.split(' ')[0];
    setHasNickname(FirstName !== profile.NickName && profile.NickName !== '');
  };

  /**
   * Callback for changing the application editor
   * @param {StudentProfileInfo} profile The StudentProfileInfo object for the person who is to be made the application editor
   */
  const handleChangeEditor = () => {
    // Make sure the chosen profile was not null
    if (profile) {
      // Send the selected profile to the parent component
      onChangeEditor(profile);
    }
  };

  /**
   * Callback for applicant list remove button
   * @param {StudentProfileInfo} profileToRemove The StudentProfileInfo object for the person who is to be removed from the list of applicants
   */
  const handleRemove = () => {
    // Make sure the chosen profile was not null
    if (profile) {
      // Send the selected profile to the parent component
      onApplicantRemove(profile);
    }
  };

  const displayName = hasNickName
    ? profile.fullName + ' (' + profile.NickName + ')'
    : profile.fullName;

  return (
    <React.Fragment>
      <ListItem
        key={profile.AD_Username}
        component={Link}
        target="_blank"
        to={`/profile/${profile.AD_Username}`}
        className={'list-item'}
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
            <ListItemText primary={displayName} secondary={personClass} className={'list-item'} />
          </Grid>
        </Grid>
        <ListItemSecondaryAction>
          <Grid container justify="flex-end" alignItems="center" spacing={0}>
            <Grid item xs>
              <IconButton
                aria-label={isApplicationEditor ? 'current-editor' : 'set-new-editor'}
                disabled={isApplicationEditor || disabled}
                onClick={handleChangeEditor}
              >
                {isApplicationEditor ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
            </Grid>
            <Grid item xs>
              <IconButton
                aria-label="remove-applicant"
                disabled={isApplicationEditor || disabled}
                onClick={handleRemove}
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
