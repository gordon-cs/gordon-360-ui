import React, { useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import InfoIcon from '@material-ui/icons/Info';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GordonPeopleSearch from '../../../../../../components/Header/components/PeopleSearch';
import ApplicantListItem from './components/ApplicantListItem';

// Create a list of applicants, displayed by name, username, and class standing.
const ApplicantList = ({
  maxNumApplicants,
  userProfile,
  editorUsername,
  applicants,
  onSearchSubmit,
  onChangeEditor,
  onApplicantRemove,
  authentication,
}) => {
  useEffect(() => {
    // Manually perform deep checking of the array to force update whenever an element of preferredHalls is changed
    if (isEqual(previousInputs.current, [applicants])) {
      return;
    }
  });

  const previousInputs = useRef();
  useEffect(() => {
    previousInputs.current = [applicants];
  });

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

  return (
    <Card>
      <CardHeader title="Student Applicants" className="card-header" />
      <CardContent>
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={12}>
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
              <ListItem key={'applicant-list-peoplesearch'} className={'list-item-search'}>
                <Grid container justify="center">
                  <Grid item>
                    <GordonPeopleSearch
                      className={'list-item-search'}
                      disableLink
                      disabled={applicants.length > maxNumApplicants}
                      icon={<GroupAddIcon />}
                      customPlaceholderText={'Add Applicant'}
                      onSearchSubmit={handleSelection}
                      authentication={authentication}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Grid>
          <Collapse in={applicants.length > 1} timeout="auto" unmountOnExit>
            <Grid container>
              <Grid item xs={2}>
                <InfoIcon />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body1">
                  You can use the <StarBorderIcon /> to change the editor of this application.
                </Typography>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ApplicantList;
