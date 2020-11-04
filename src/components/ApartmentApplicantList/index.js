import React, { Component } from 'react';
import 'date-fns';
import { Grid, Card, CardHeader, CardContent, List, Button, Typography } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { gordonColors } from '../../theme';
import GordonPeopleSearch from '../Header/components/PeopleSearch';
import GordonLoader from '../../components/Loader';
import ApplicantListItem from './components/ApplicantListItem';
import '../../views/ApartmentApp/apartmentApp.css';
import '../../views/PeopleSearch/components/PeopleSearchResult/peopleSearchResult.css';
const styles = {
  success: {
    color: gordonColors.secondary.green,
    fontSize: '26px',
  },
  error: {
    color: gordonColors.secondary.red,
    fontSize: '26px',
  },
};

// Create a list of applicants, displayed by name, username, and class standing.
export default class ApplicantList extends Component {
  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.loaderSize = 20;
  }

  handleSelection = (theChosenOne) => {
    // Make sure the chosen username was not null
    if (theChosenOne) {
      // Send the selected username to the parent component
      this.props.onSearchSubmit(theChosenOne);
    }
  };

  handleChangePrimary = (profile) => {
    // Make sure the chosen profile was not null
    if (profile) {
      // Send the selected profile to the parent component
      this.props.onChangePrimary(profile);
    }
  };

  handleRemove = (profile) => {
    // Make sure the chosen profile was not null
    if (profile) {
      // Send the selected profile to the parent component
      this.props.onApplicantRemove(profile);
    }
  };

  handleSaveButtonClick = () => {
    this.props.onSaveButtonClick();
  };

  render() {
    return (
      <Card>
        <CardHeader
          action={
            <GordonPeopleSearch
              disableLink
              disabled={this.props.applicants.length > this.props.maxNumApplicants}
              icon={<GroupAddIcon />}
              customPlaceholderText={'Add Applicant'}
              onSearchSubmit={this.handleSelection}
              Authentication={this.props.Authentication}
            />
          }
          title="Student Applicants"
          className="card-header"
        />
        <CardContent>
          <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12}>
              <List className="applicant-list" aria-label="apartment applicants">
                {this.props.applicants ? (
                  this.props.applicants.map((profile) => (
                    <ApplicantListItem
                      key={profile.AD_Username}
                      profile={profile}
                      isPrimaryApplicant={profile === this.props.userProfile}
                      onChangePrimary={this.handleChangePrimary.bind(this, profile)}
                      onApplicantRemove={this.handleRemove.bind(this, profile)}
                    />
                  ))
                ) : (
                  <ApplicantListItem
                    key={this.props.userProfile.AD_Username}
                    profile={this.props.userProfile}
                    isPrimaryApplicant={true}
                    onChangePrimary={this.handleChangePrimary.bind(this, this.props.userProfile)}
                    onApplicantRemove={this.handleRemove.bind(this, this.props.userProfile)}
                  />
                )}
              </List>
            </Grid>
            <Grid item xs={9}>
              {this.props.saving === 'failed' ? (
                <Typography variant="overline" color="error">
                  Something when wrong while trying to save the application
                </Typography>
              ) : this.props.applicants.length >= this.props.maxNumApplicants ? (
                <Typography variant="overline" color="error">
                  You have reached the maximum number of applicants ({this.props.maxNumApplicants})
                </Typography>
              ) : null}
            </Grid>
            <Grid item xs={3}>
              {this.props.saving ? (
                this.props.saving === 'success' ? (
                  <CheckCircleIcon style={styles.success} />
                ) : this.props.saving === 'failed' ? (
                  <ErrorIcon style={styles.error} />
                ) : (
                  <GordonLoader size={this.loaderSize} />
                )
              ) : (
                <Button
                  disabled={this.props.saving}
                  variant="contained"
                  color="primary"
                  onClick={this.handleSaveButtonClick}
                >
                  Save
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
