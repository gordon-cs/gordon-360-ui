import React, { Component } from 'react';
import 'date-fns';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GordonPeopleSearch from '../Header/components/PeopleSearch';
import ApplicantListItem from './components/ApplicantListItem';
import './apartmentApplicantList.scss';
import '../../views/PeopleSearch/components/PeopleSearchResult/peopleSearchResult.css';

// Create a list of applicants, displayed by name, username, and class standing.
export default class ApplicantList extends Component {
  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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
        <List className="apartment-applicant-list" aria-label="apartment applicants">
          <ListItem key="applicant-list-header" className="applicant-list-header">
            <ListItemText primary="Student Applicants" />
            <GordonPeopleSearch
              justify="flex-end"
              disableLink
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
