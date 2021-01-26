import React, { Component } from 'react';
import 'date-fns';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GordonPeopleSearch from '../../../../../../components/Header/components/PeopleSearch';
import ApplicantListItem from './components/ApplicantListItem';
import SaveButton from '../SaveButton';
import '../../../../apartmentApp.css';
import '../../../../../PeopleSearch/components/PeopleSearchResult/peopleSearchResult.css';

/**
 * @typedef { import('../../services/user').StudentProfileInfo } StudentProfileInfo
 */

// Create a list of applicants, displayed by name, username, and class standing.
export default class ApplicantList extends Component {
  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.loaderSize = 20;
  }

  /**
   * Callback for apartment people search submission
   * @param {String} theChosenOne Username for student
   */
  handleSelection = (theChosenOne) => {
    // Make sure the chosen username was not null
    if (theChosenOne) {
      // Send the selected username to the parent component
      this.props.onSearchSubmit(theChosenOne);
    }
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
    }
  };

  /**
   * Callback for apartment application save button
   */
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
              authentication={this.props.authentication}
            />
          }
          title="Student Applicants"
          className="card-header"
        />
        <CardContent>
          <Grid container justify="space-between" spacing={2}>
            <Grid item xs={11}>
              <List className="applicant-list" aria-label="apartment applicants">
                {this.props.applicants ? (
                  this.props.applicants.map((profile) => (
                    <ApplicantListItem
                      key={profile.AD_Username}
                      profile={profile}
                      isApplicationEditor={profile.AD_Username === this.props.editorUsername}
                      onChangeEditor={this.handleChangeEditor.bind(this, profile)}
                      onApplicantRemove={this.handleRemove.bind(this, profile)}
                    />
                  ))
                ) : (
                  <ListItem key={'applicant-list-placeholder'} className={'list-item'}>
                    <ListItemText
                      primary={'Use the search bar above to add applicants'}
                      className={'list-item'}
                    />
                  </ListItem>
                )}
              </List>
            </Grid>
            <Grid item xs={9}>
              {this.props.saving === 'failed' ? (
                <Typography variant="overline" color="error">
                  Something went wrong while trying to save the application
                </Typography>
              ) : this.props.applicants.length >= this.props.maxNumApplicants ? (
                <Typography variant="overline" color="error">
                  You have reached the maximum number of applicants ({this.props.maxNumApplicants})
                </Typography>
              ) : null}
            </Grid>
            <Grid item xs={3}>
              <SaveButton saving={this.props.saving} onClick={this.handleSaveButtonClick} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
