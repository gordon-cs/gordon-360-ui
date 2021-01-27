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
import '../../../../../../apartmentApp.css';
import '../../../../../../../PeopleSearch/components/PeopleSearchResult/peopleSearchResult.css';

// Based off src/views/PeopleSearch/components/PeopleSearchResult
// but using props.profile of type StudentProfileInfo
// rather than using this.props.Person of type PeopleSearchResult
const ApplicantListItem = (props) => {
  const [avatar, setAvatar] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // A HTML element, or a function that returns it. It's used to set the position of the menu.
  const [hasNickName, setHasNickname] = useState(Boolean);
  const [personClass, setPersonClass] = useState(props.profile.Class);

  useEffect(() => {
    /**
     * Creates the Avatar image of the given user
     */
    async function loadAvatar() {
      const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getImage(props.profile.AD_Username),
      ]);
      let newAvatar = null;
      if (props.profile.AD_Username) {
        newAvatar = preferredImage || defaultImage;
      }
      if (newAvatar === null) {
        newAvatar = (
          <svg width="50" height="50" viewBox="0 0 50 50">
            <rect width="50" height="50" rx="10" ry="10" fill="#CCC" />
          </svg>
        );
      }
      setAvatar(newAvatar);
    }

    loadAvatar();

    createNickname(props.profile);

    if (String(props.profile.PersonType).includes('stu') && props.profile.Class !== undefined) {
      setPersonClass(props.profile.Class);
    } else {
      setPersonClass('');
    }
  }, [props.profile]);

  // Saves the nickname of the given user if available
  function createNickname(profile) {
    let Name = String(profile.fullName);
    let FirstName = Name.split(' ')[0];
    setHasNickname(FirstName !== profile.NickName && profile.NickName !== '');
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangeEditor = () => {
    // Make sure the chosen profile was not null
    if (props.profile) {
      // Send the selected profile to the parent component
      props.onChangeEditor(props.profile);
      handleMenuClose();
    }
  };

  const handleRemove = () => {
    // Make sure the chosen profile was not null
    if (props.profile) {
      // Send the selected profile to the parent component
      props.onApplicantRemove(props.profile);
      handleMenuClose();
    }
  };

  return (
    <ListItem
      key={props.profile.AD_Username}
      component={Link}
      target="_blank"
      to={`/profile/${props.profile.AD_Username}`}
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
          <ListItemText
            primary={
              props.profile.Title &&
              props.profile.Title !== '' &&
              props.profile.PersonType === 'fac'
                ? // If the user has a title
                  hasNickName
                  ? // If the user has a title and a nickname
                    props.profile.Title +
                    ' ' +
                    props.profile.fullName +
                    ' (' +
                    props.profile.NickName +
                    ')'
                  : // If the user has a title and no nickname
                    props.profile.Title + ' ' + props.profile.fullName
                : // If the user doesn't have a title
                hasNickName
                ? // If the user doesn't have a title but has a nickname
                  props.profile.fullName + ' (' + props.profile.NickName + ')'
                : // If the user doesn't have a title or a nickname
                  props.profile.fullName
            }
            secondary={personClass}
            className={'list-item'}
          />
        </Grid>
      </Grid>
      <ListItemSecondaryAction>
        <Button
          aria-controls="applicant-menu"
          aria-haspopup="true"
          disabled={props.isApplicationEditor}
          onClick={handleMenuClick}
        >
          Edit
          {props.isApplicationEditor ? <StarBorderIcon /> : <ArrowDropDownIcon />}
        </Button>
        <Menu
          id="applicant-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem disabled={props.isApplicationEditor} onClick={handleChangeEditor}>
            <ListItemIcon>
              <StarBorderIcon />
            </ListItemIcon>
            Make Editor
          </MenuItem>
          <MenuItem disabled={props.isApplicationEditor} onClick={handleRemove}>
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
