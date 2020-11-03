import React, { Component } from 'react';
import 'date-fns';
import { Grid, Card, CardHeader, CardContent, List, Button, Typography } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GordonPeopleSearch from '../Header/components/PeopleSearch';
import ApplicantListItem from './components/ApplicantListItem';
import '../../views/ApartmentApp/apartmentApp.css';
import '../../views/PeopleSearch/components/PeopleSearchResult/peopleSearchResult.css';
const MIN_NUM_APPLICANTS = 3;

// Create a list of applicants, displayed by name, username, and class standing.
export default class ApplicantList extends Component {
  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.state = {
      saveButtonClicked: false,
    };
  }

  handleSelection = (theChosenOne) => {
    // Make sure the chosen username was not null
    if (theChosenOne) {
      // Send the selected username to the parent component
      this.props.onSearchSubmit(theChosenOne);
      // Reset the save button
      this.setState({ saveButtonClicked: false });
    }
  };

  handleRemove = (profile) => {
    // Make sure the chosen profile was not null
    if (profile) {
      // Send the selected profile to the parent component
      this.props.onApplicantRemove(profile);
      // Reset the save button
      this.setState({ saveButtonClicked: false });
    }
  };

  handleSaveButtonClick = () => {
    this.props.onSaveButtonClick();
    this.setState({ saveButtonClicked: true });
  };

  render() {
    return (
      <Card>
        <CardHeader
          action={
            <GordonPeopleSearch
              disableLink
              icon={<GroupAddIcon />}
              customPlaceholderText={'Add Applicant'}
              onSearchSubmit={this.handleSelection}
              Authentication={this.props.Authentication}
              justify="flex-end"
            />
          }
          title="Student Applicants"
          className="card-header"
        />
        <CardContent>
          <Grid container justify="flex-end">
            <Grid item xs={12}>
              <List className="applicant-list" aria-label="apartment applicants">
                {this.props.applicants ? (
                  this.props.applicants.map((profile) => (
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
            <Grid item>
              {this.props.applicants.length < MIN_NUM_APPLICANTS && this.state.saveButtonClicked ? (
                <Typography variant="overline" color="error">
                  Must have at least {MIN_NUM_APPLICANTS} applicants
                </Typography>
              ) : null}
            </Grid>
            <Grid item xs={2}>
              <Button
                // disabled={this.props.applicants.length < MIN_NUM_APPLICANTS}
                variant="contained"
                color="primary"
                onClick={this.handleSaveButtonClick}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
