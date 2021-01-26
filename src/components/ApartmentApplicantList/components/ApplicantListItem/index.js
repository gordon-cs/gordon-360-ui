import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'date-fns';
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
import user from '../../../../services/user';
import '../../../../views/ApartmentApp/apartmentApp.css';
import '../../../../views/PeopleSearch/components/PeopleSearchResult/peopleSearchResult.css';

/**
 * @typedef { import('../../../../services/user').StudentProfileInfo } StudentProfileInfo
 */

// Based off src/views/PeopleSearch/components/PeopleSearchResult
// but using this.props.profile of type StudentProfileInfo
// rather than using this.props.Person of type PeopleSearchResult
export default class ApplicantListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: null,
      anchorEl: null, // A HTML element, or a function that returns it. It's used to set the position of the menu.
    };
  }

  componentDidUpdate(newProps) {
    if (this.props.profile.AD_Username !== newProps.profile.AD_Username) {
      this.loadAvatar();
    }
  }

  componentDidMount() {
    this.loadAvatar();
  }

  /**
   * Load the applicant's avatar, to be display with their infomation on the applicant list
   */
  async loadAvatar() {
    this.setState({ avatar: null });
    const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
      await user.getImage(this.props.profile.AD_Username),
    ]);
    let avatar;
    if (this.props.profile.AD_Username) {
      avatar = preferredImage || defaultImage;
    } else {
      avatar = (
        <svg width="50" height="50" viewBox="0 0 50 50">
          <rect width="50" height="50" rx="10" ry="10" fill="#CCC" />
        </svg>
      );
    }
    this.setState({ avatar });
  }

  /**
   * Callback for displaying the applicant edit menu
   */
  handleMenuClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /**
   * Callback for closing the applicant edit menu
   */
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  /**
   * Callback for changing the application editor
   * @param {StudentProfileInfo} profile The StudentProfileInfo object for the person who is to be made the application editor
   */
  handleChangeEditor = (profile) => {
    // Make sure the chosen profile was not null
    if (profile) {
      // Send the selected profile to the parent component
      this.props.onChangeEditor(profile);
      this.handleMenuClose();
    }
  };

  /**
   * Callback for applicant list remove button
   * @param {StudentProfileInfo} profileToRemove The StudentProfileInfo object for the person who is to be removed from the list of applicants
   */
  handleRemove = (profileToRemove) => {
    // Make sure the chosen profile was not null
    if (profileToRemove) {
      // Send the selected profile to the parent component
      this.props.onApplicantRemove(profileToRemove);
      this.handleMenuClose();
    }
  };

  render() {
    const profile = this.props.profile;
    let fullName = String(profile.fullName);
    let personType, personClassJobTitle, nickname;

    // set nicknames up
    if (
      profile.NickName !== null &&
      profile.NickName !== '' &&
      profile.FirstName !== profile.NickName
    ) {
      nickname = '(' + profile.NickName + ')';
    }
    // set classes up
    if (String(profile.PersonType).includes('stu')) {
      personType = 'Student';
      if (profile.Class !== undefined) {
        personClassJobTitle = profile.Class;
      }
      // set job titles up
    } else {
      personType = 'Not Student';
      if (profile.JobTitle !== undefined) {
        personClassJobTitle = profile.JobTitle;
      }
    }

    return (
      <ListItem
        key={profile.AD_Username}
        component={Link}
        target="_blank"
        to={`/profile/${profile.AD_Username}`}
        className={'list-item'}
      >
        <ListItemAvatar>
          {this.state.avatar ? (
            <Avatar
              className={`avatar`}
              src={`data:image/jpg;base64,${this.state.avatar}`}
              alt=""
            />
          ) : (
            <Avatar>
              <PersonIcon color="primary" />
            </Avatar>
          )}
        </ListItemAvatar>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={6}>
            <ListItemText
              primary={nickname ? fullName.replace(' ', ' ' + nickname + ' ') : fullName}
              secondary={profile.AD_Username}
              className={'list-item'}
            />
          </Grid>
          <Grid item xs={6}>
            <ListItemText
              primary={personClassJobTitle}
              secondary={personType}
              className={'list-item'}
            />
          </Grid>
        </Grid>
        <ListItemSecondaryAction>
          <Button
            aria-controls="applicant-menu"
            aria-haspopup="true"
            disabled={this.props.isApplicationEditor || this.props.disabled}
            onClick={this.handleMenuClick}
          >
            Edit
            {this.props.isApplicationEditor ? <StarBorderIcon /> : <ArrowDropDownIcon />}
          </Button>
          <Menu
            id="applicant-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleMenuClose}
          >
            <MenuItem
              disabled={this.props.isApplicationEditor || this.props.disabled}
              onClick={this.handleChangeEditor.bind(this, profile)}
            >
              <ListItemIcon>
                <StarBorderIcon />
              </ListItemIcon>
              Make Editor
            </MenuItem>
            <MenuItem
              disabled={this.props.isApplicationEditor || this.props.disabled}
              onClick={this.handleRemove.bind(this, profile)}
            >
              <ListItemIcon>
                <ClearIcon />
              </ListItemIcon>
              Remove
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
