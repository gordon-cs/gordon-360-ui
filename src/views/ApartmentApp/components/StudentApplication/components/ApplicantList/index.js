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
import GordonPeopleSearch from 'components/Header/components/PeopleSearch';
import ApplicantListItem from './components/ApplicantListItem';

/**
 * @typedef { import('services/housing').ApplicationDetails } ApplicationDetails
 * @typedef { import('services/user').StudentProfileInfo } StudentProfileInfo
 */

/**
 * Renders the list of applicants, displayed by name, username, and class standing.
 * @param {Object} props The React component props
 * @param {Boolean} props.disabled Boolean to disable the interactive elements of this list item
 * @param {*} props.authentication The user authentication
 * @param {ApplicationDetails} props.applicationDetails Object containing the details of this application
 * @param {Number} props.maxNumApplicants The maximum number of applicants allowed on an apartment application
 * @param {CallbackFcn} props.onSearchSubmit Callback for apartment people search submission
 * @param {CallbackFcn} props.onChangeEditor Callback for change editor button
 * @param {CallbackFcn} props.onApplicantRemove Callback for remove applicant button
 * @returns {JSX.Element} JSX Element for the hall list item
 */
const ApplicantList = ({
  disabled,
  authentication,
  applicationDetails: { EditorProfile, Applicants },
  maxNumApplicants,
  onSearchSubmit,
  onChangeEditor,
  onApplicantRemove,
}) => {
  const [showHelp, setShowHelp] = useState(false);

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
              {Applicants?.length > 0 ? (
                Applicants.map((applicant) => (
                  <ApplicantListItem
                    key={applicant.Profile.AD_Username}
                    disabled={disabled}
                    profile={applicant.Profile}
                    isApplicationEditor={
                      applicant.Profile.AD_Username === EditorProfile.AD_Username
                    }
                    onChangeEditor={onChangeEditor}
                    onApplicantRemove={onApplicantRemove}
                  />
                ))
              ) : (
                <ListItem key={'applicant-list-placeholder'} className={'list-item'}>
                  <ListItemText
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
                disabled={disabled || Applicants?.length > maxNumApplicants}
                icon={<GroupAddIcon />}
                customPlaceholderText={'Add Applicant'}
                onSearchSubmit={(selectedUsername) =>
                  selectedUsername && onSearchSubmit(selectedUsername)
                }
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
