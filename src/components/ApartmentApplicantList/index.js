import React, { Component } from 'react';
import 'date-fns';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import GordonPeopleSearch from '../Header/components/PeopleSearch';
import user from '../../services/user';
import './apartmentApplicantList.scss';
import '../../views/PeopleSearch/components/PeopleSearchResult/peopleSearchResult.css';

// Create a list of applicants, displayed by name, username, and class standing.
export default class ApplicantList extends Component {
  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      peopleSearchError: null,
    };
  }

  handleSelection = theChosenOne => {
    // Make sure the chosen username was not null
    if (theChosenOne && theChosenOne !== null) {
      // Send the selected username to the parent component
      this.props.onSearchSubmit(theChosenOne);
    }
  };

  handleRemove = profile => {
    // Make sure the chosen profile was not null
    if (profile && profile !== null) {
      // Send the selected profile to the parent component
      this.props.onApplicantRemove(profile);
    }
  };

  render() {
    if (this.props.applicants) {
      return (
        <List className="apartment-applicant-list">
          <ListItem key="applicant-list-header" className="applicant-list-header">
            <ListItemText primary="Student Applicants" />
            <GordonPeopleSearch
              justify="flex-end"
              disableLink
              errorMessage={this.state.peopleSearchError}
              onSearchSubmit={this.handleSelection}
              Authentication={this.props.Authentication}
            />
          </ListItem>
          {this.props.applicants.map(profile => (
            <ApplicantListItem
              key={profile.AD_Username}
              profile={profile}
              isPrimaryApplicant={profile === this.props.userProfile}
              onApplicantRemove={this.handleRemove.bind(this, profile)}
            />
          ))}
        </List>
      );
    }
  }
}

// Based off src/views/PeopleSearch/components/PeopleSearchResult
class ApplicantListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: null,
      prefImage: null,
      defImage: null,
      isStu: Boolean,
      isFac: Boolean,
      isAlu: Boolean,
    };
  }

  handleRemove = profile => {
    // Make sure the chosen profile was not null
    if (profile && profile !== null) {
      // Send the selected profile to the parent component
      this.props.onApplicantRemove(profile);
    }
  };

  componentDidUpdate(newProps) {
    if (this.props.profile.AD_Username !== newProps.profile.AD_Username) {
      this.loadAvatar();
    }
  }

  componentDidMount() {
    this.loadAvatar();
  }

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
      <ListItem key={profile.AD_Username} className={'applicant-list-item'} alignItems="flex-start">
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
        <ListItemText
          primary={nickname ? fullName.replace(' ', ' ' + nickname + ' ') : fullName}
          secondary={profile.AD_Username}
          width="50%"
        />
        <ListItemText primary={personClassJobTitle} secondary={personType} width="50%" />
        <ListItemSecondaryAction>
          {this.props.isPrimaryApplicant ? (
            <IconButton edge="end" aria-label="remove">
              <RemoveCircleOutlineIcon color="disabled" />
            </IconButton>
          ) : (
            <IconButton
              edge="end"
              aria-label="remove"
              onClick={this.handleRemove.bind(this, profile)}
            >
              <RemoveCircleOutlineIcon color="action" />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
