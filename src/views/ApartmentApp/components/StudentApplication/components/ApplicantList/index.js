import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import HelpIcon from '@material-ui/icons/Help';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import GordonPeopleSearch from '../../../../../../components/Header/components/PeopleSearch';
import ApplicantListItem from './components/ApplicantListItem';
import '../../../../apartmentApp.css';

// Create a list of applicants, displayed by name, username, and class standing.
const ApplicantList = ({
  maxNumApplicants,
  editorUsername,
  applicants,
  onSearchSubmit,
  onChangeEditor,
  onApplicantRemove,
  authentication,
}) => {
  const [showHelp, setShowHelp] = useState(false);

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
      <CardHeader title="Student Applicants" className="apartment-card-header" />
      <CardContent>
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={12}>
            <List className="applicant-list" aria-label="apartment applicants">
              <ListItem
                button
                alignItems="center"
                className={'list-item'}
                onClick={() => setShowHelp((prev) => !prev)}
              >
                <ListItemIcon>
                  <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="Need Help?" />
                {showHelp ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={showHelp} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={'bordered-list-item'}>
                  <ListItem disableGutters className={'nested-list-item'}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Use the search bar below this list to add more applicants." />
                  </ListItem>
                  <Divider />
                  <ListItem disableGutters className={'nested-list-item'}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Use the star button to change the editor of this applicant, if necessary." />
                  </ListItem>
                  <Divider />
                  <ListItem disableGutters className={'nested-list-item'}>
                    <ListItemIcon>
                      <ClearIcon />
                    </ListItemIcon>
                    <ListItemText primary="Use the 'X' icon next to a student's name to remove them from this application" />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
              {applicants ? (
                applicants.map((applicant) => (
                  <ApplicantListItem
                    key={applicant.Profile.AD_Username}
                    profile={applicant.Profile}
                    isApplicationEditor={applicant.Profile.AD_Username === editorUsername}
                    onChangeEditor={handleChangeEditor}
                    onApplicantRemove={handleRemove}
                  />
                ))
              ) : (
                <ListItem key={'applicant-list-placeholder'} className={'list-item'}>
                  <ListItemText
                    // primary={'Use the search bar below to add applicants'}
                    primary={'If you are reading this, something went wrong. Please contact CTS'}
                    className={'list-item'}
                  />
                </ListItem>
              )}
            </List>
          </Grid>
          <Grid container item justify="center" xs={12}>
            <Grid item xs={9} sm={5} className={'people-search-parent'}>
              <GordonPeopleSearch
                disableLink
                disabled={applicants.length > maxNumApplicants}
                icon={<GroupAddIcon />}
                customPlaceholderText={'Add Applicant'}
                onSearchSubmit={handleSelection}
                authentication={authentication}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ApplicantList;
