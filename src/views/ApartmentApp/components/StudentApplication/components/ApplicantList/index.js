import React from 'react';
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

// Create a list of applicants, displayed by name, username, and class standing.
const ApplicantList = ({
  maxNumApplicants,
  userProfile,
  editorUsername,
  applicants,
  saving,
  onSearchSubmit,
  onChangeEditor,
  onApplicantRemove,
  onSaveButtonClick,
  authentication,
}) => {
  const handleSelection = (theChosenOne) => {
    // Make sure the chosen username was not null
    if (theChosenOne) {
      // Send the selected username to the parent component
      onSearchSubmit(theChosenOne);
    }
  };

  const handleChangeEditor = (profile) => {
    // Make sure the chosen profile was not null
    if (profile) {
      // Send the selected profile to the parent component
      onChangeEditor(profile);
    }
  };

  const handleRemove = (profile) => {
    // Make sure the chosen profile was not null
    if (profile) {
      // Send the selected profile to the parent component
      onApplicantRemove(profile);
    }
  };

  const handleSaveButtonClick = () => {
    onSaveButtonClick();
  };

  return (
    <Card>
      <CardHeader
        action={
          <GordonPeopleSearch
            disableLink
            disabled={applicants.length > maxNumApplicants}
            icon={<GroupAddIcon />}
            customPlaceholderText={'Add Applicant'}
            onSearchSubmit={handleSelection}
            authentication={authentication}
          />
        }
        title="Student Applicants"
        className="card-header"
      />
      <CardContent>
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={11}>
            <List className="applicant-list" aria-label="apartment applicants">
              {applicants ? (
                applicants.map((profile) => (
                  <ApplicantListItem
                    key={profile.AD_Username}
                    profile={profile}
                    isApplicationEditor={profile.AD_Username === editorUsername}
                    onChangeEditor={handleChangeEditor}
                    onApplicantRemove={handleRemove}
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
            {saving === 'failed' ? (
              <Typography variant="overline" color="error">
                Something went wrong while trying to save the application
              </Typography>
            ) : applicants.length >= maxNumApplicants ? (
              <Typography variant="overline" color="error">
                You have reached the maximum number of applicants ({maxNumApplicants})
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={3}>
            <SaveButton saving={saving} onClick={handleSaveButtonClick} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ApplicantList;
