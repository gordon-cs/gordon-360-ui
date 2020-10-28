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
import user from '../../services/user';
import './apartmentApplicantList.scss';

export default class ApplicantList extends Component {
  constructor(props) {
    super(props);
    this.renderApplicant = this.renderApplicant.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove = profile => {
    // Make sure the chosen profile was not null
    if (profile && profile !== null) {
      // Send the selected profile to the parent component
      this.props.onApplicantRemove(profile);
    }
  };

  /**
   * Creates the Avatar image of the given user
   *
   * @param {String} username The username of the desired user image
   *
   * @return {String} The profile image of the given user if available
   */
  async loadAvatar(username) {
    // let username = String(profile.AD_Username);
    try {
      const { def: defaultImage, pref: preferredImage } = await user.getImage(username);
      const image = preferredImage || defaultImage;
      return image;
    } catch (error) {
      return null;
    }
  }

  renderApplicant(profile) {
    let avatarImage = this.loadAvatar(profile.AD_Username);
    return (
      <ListItem key={profile.AD_Username} className={'applicant-list-item'}>
        <ListItemAvatar>
          {avatarImage ? (
            <Avatar
              className={`applicant-avatar`}
              src={`data:image/jpg;base64,${avatarImage}`}
              sizes="70px"
            />
          ) : (
            <Avatar>
              <PersonIcon />
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText primary={profile.fullName} secondary={profile.AD_Username} />
        <ListItemSecondaryAction>
          {profile.AD_Username === this.props.userProfile.AD_Username ? (
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

  render() {
    if (this.props.applicants) {
      return (
        <List className="apartment-applicant-list">
          {this.props.applicants.map(profile => this.renderApplicant(profile))}
        </List>
      );
    }
  }
}
