import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ClearIcon from '@material-ui/icons/Clear';
import user from '../../../../../../../../services/user';

// Based off src/views/PeopleSearch/components/PeopleSearchResult
// but using props.profile of type StudentProfileInfo
// rather than using this.props.Person of type PeopleSearchResult
const ApplicantListItem = ({ profile, isApplicationEditor, onChangeEditor, onApplicantRemove }) => {
  const [avatar, setAvatar] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // A HTML element, or a function that returns it. It's used to set the position of the menu.
  const [hasNickName, setHasNickname] = useState(false);
  const [personClass, setPersonClass] = useState(profile.Class);

  useEffect(() => {
    loadAvatar(profile);
    createNickname(profile);
    if (String(profile.PersonType).includes('stu') && profile.Class !== undefined) {
      setPersonClass(profile.Class);
    } else {
      // Techincally, this case should never happen because the list does not allow the user to add a non-student to the applicant list
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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangeEditor = () => {
    // Make sure the chosen profile was not null
    if (profile) {
      // Send the selected profile to the parent component
      onChangeEditor(profile);
      handleMenuClose();
    }
  };

  const handleRemove = () => {
    // Make sure the chosen profile was not null
    if (profile) {
      // Send the selected profile to the parent component
      onApplicantRemove(profile);
      handleMenuClose();
    }
  };

  const displayName = hasNickName
    ? profile.fullName + ' (' + profile.NickName + ')'
    : profile.fullName;

  return (
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
        <Grid item xs={12} sm>
          <ListItemText primary={displayName} secondary={personClass} className={'list-item'} />
        </Grid>
      </Grid>
      <ListItemSecondaryAction>
        <Button
          aria-controls="applicant-menu"
          aria-haspopup="true"
          disabled={isApplicationEditor}
          onClick={handleMenuClick}
        >
          Edit
          {isApplicationEditor ? <StarBorderIcon /> : <ArrowDropDownIcon />}
        </Button>
        <Menu
          id="applicant-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem disabled={isApplicationEditor} onClick={handleChangeEditor}>
            <ListItemIcon>
              <StarBorderIcon />
            </ListItemIcon>
            Make Editor
          </MenuItem>
          <MenuItem disabled={isApplicationEditor} onClick={handleRemove}>
            <ListItemIcon>
              <ClearIcon />
            </ListItemIcon>
            Remove
          </MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ApplicantListItem;
