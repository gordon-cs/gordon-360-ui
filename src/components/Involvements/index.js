import React, { useState, useEffect } from 'react';

import { Button, Card, CardContent, CardHeader, Grid, List, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import activity from '../../services/activity';
import membershipService from '../../services/membership';
import SimpleSnackbar from '../Snackbar';
import MyProfileActivityList from '../MyProfileActivityList/index';
import ProfileActivityList from '../ProfileActivityList/index';
import './index.css';

export const Involvements = (props) => {
  const [involvementsAndTheirPrivacy, setInvolvementsAndTheirPrivacy] = useState([]);
  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false });

  /**
   * Loads the user's profile info only once (at start)
   */
  useEffect(() => {
    async function loadInvolvements() {
      try {
        // Creates the involvements list for the My Profile View
        if (props.myProf) {
          const involvementsAndTheirPrivacy = await getInvolvementAndPrivacyDictionary(
            props.memberships,
          );
          setInvolvementsAndTheirPrivacy(involvementsAndTheirPrivacy);
        }
      } catch (error) {
        // Do Nothing
      }
    }
    loadInvolvements();
  }, [props.memberships, props.myProf]);

  function createInvolvementsList() {
    if (props.memberships.length === 0) {
      return (
        <div>
          <Link to={`/involvements`}>
            <Typography variant="body2" className="noInvolvements">
              No Involvements to display. Click here to see Involvements around campus!
            </Typography>
          </Link>
        </div>
      );
    } else if (props.myProf) {
      return involvementsAndTheirPrivacy.map((involvementPrivacyKeyValuePair) => (
        <MyProfileActivityList
          membership={involvementPrivacyKeyValuePair.key}
          isPrivateInvolvement={involvementPrivacyKeyValuePair.value}
          onTogglePrivacy={toggleMembershipPrivacy}
        />
      ));
    } else {
      return props.memberships.map((activity) => (
        <ProfileActivityList Activity={activity} key={activity.MembershipID} />
      ));
    }
  }

  const toggleMembershipPrivacy = async (membership) => {
    try {
      await membershipService.toggleMembershipPrivacy(membership);
      createSnackbar(membership.Privacy ? 'Membership Hidden' : 'Membership Visible', 'Success');
      membership.Privacy = !membership.Privacy;
    } catch {
      createSnackbar('Privacy Change Failed', 'Error');
    }
  };

  const createSnackbar = (message, severity) => {
    setSnackbar({ message, severity, open: true });
  };

  // Gets the privacy data of each membership of the user
  async function getInvolvementAndPrivacyDictionary(membershipsList) {
    let involvementAndPrivacyDictionary = [];
    for (let i = 0; i < membershipsList.length; i++) {
      let involvement = await activity.get(membershipsList[i].ActivityCode);
      involvementAndPrivacyDictionary.push({
        key: membershipsList[i],
        value: involvement.Privacy,
      });
    }
    return involvementAndPrivacyDictionary;
  }

  return (
    <>
      <Grid item xs={12} className="involvements">
        <Grid container className="involvements-header">
          <CardHeader title="Involvements" />
        </Grid>
        <Card className="involvements-card">
          <CardContent className="involvements-card-content">
            {props.myProf && (
              <Grid container justify="center">
                <Link className="gc360-link" to="/transcript">
                  <Button variant="contained" className="involvements-card-content-button">
                    Experience Transcript
                  </Button>
                </Link>
              </Grid>
            )}
            <List>{createInvolvementsList()}</List>
          </CardContent>
        </Card>
      </Grid>
      {props.myProf && (
        <SimpleSnackbar
          open={snackbar.open}
          text={snackbar.message}
          severity={'success'}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        />
      )}
    </>
  );
};
