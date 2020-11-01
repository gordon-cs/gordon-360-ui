import React, { Component } from 'react';
import 'date-fns';
import { Grid, Card, CardHeader, CardContent, List } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import GordonPeopleSearch from '../Header/components/PeopleSearch';
import ApplicantListItem from './components/ApplicantListItem';
import '../../views/ApartmentApp/apartmentApp.css';
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
    if (theChosenOne) {
      // Send the selected username to the parent component
      this.props.onSearchSubmit(theChosenOne);
    }
  };

  handleRemove = profile => {
    // Make sure the chosen profile was not null
    if (profile) {
      // Send the selected profile to the parent component
      this.props.onApplicantRemove(profile);
    }
  };

  render() {
    return (
      <Card>
        <CardHeader
          avatar={<GroupAddIcon />}
          action={
            <GordonPeopleSearch
              disableLink
              customPlaceholderText={'Add Applicant'}
              onSearchSubmit={this.handleSelection}
              Authentication={this.props.Authentication}
              justify="flex-end"
              className="header"
            />
          }
          title="Student Applicants"
          className="card-header"
        />
        <CardHeader
          action={
            <IconButton aria-label="clear all">
              <ClearAllIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Grid container direction="column" spacing={8}>
            <Grid item xs={12}>
              <List className="apartment-applicant-list" aria-label="apartment applicants">
                {this.props.applicants ? (
                  this.props.applicants.map(profile => (
                    <ApplicantListItem
                      key={profile.AD_Username}
                      profile={profile}
                      isPrimaryApplicant={profile === this.props.userProfile}
                      onApplicantRemove={this.handleRemove.bind(this, profile)}
                    />
                  ))
                ) : (
                  <ApplicantListItem
                    key={this.props.userProfile.AD_Username}
                    profile={this.props.userProfile}
                    isPrimaryApplicant={true}
                    onApplicantRemove={this.handleRemove.bind(this, this.props.userProfile)}
                  />
                )}
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
