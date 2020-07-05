import React, { useState, useEffect } from 'react';
import activity from './../../../../services/activity';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import MyProfileActivityList from './../../../../components/MyProfileActivityList/index';
import Typography from '@material-ui/core/Typography';
import './index.css';

export const Involvements = props => {
  const [involvementsAndTheirPrivacy, setInvolvementsAndTheirPrivacy] = useState([]);

  /**
   * Loads the user's profile info only once (at start)
   */
  useEffect(() => {
    async function loadInvolvements() {
      try {
        const involvementsAndTheirPrivacy = await getInvolvementAndPrivacyDictionary(
          props.memberships,
        );
        setInvolvementsAndTheirPrivacy(involvementsAndTheirPrivacy);
      } catch (error) {
        // Do Nothing
      }
    }
    loadInvolvements();
  }, [props.memberships]);

  // Creates the involvements list
  function createInvolvementsList() {
    // If the user has no memberships
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
    }
    // If the user has memberships
    else {
      return involvementsAndTheirPrivacy.map(involvementPrivacyKeyValuePair => (
        <MyProfileActivityList
          Membership={involvementPrivacyKeyValuePair.key}
          InvolvementPrivacy={involvementPrivacyKeyValuePair.value}
        />
      ));
    }
  }

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
    <Grid item xs={12} className="myprofile-involvements">
      <Grid item className="myprofile-involvements-header">
        <CardHeader title="Involvements" />
      </Grid>
      <Card className="myprofile-involvements-card">
        <CardContent className="myprofile-involvements-card-content">
          <Grid container justify="center">
            <Link className="gc360-link" to="/transcript">
              <Button variant="contained" className="myprofile-involvements-card-content-button">
                Experience Transcript
              </Button>
            </Link>
          </Grid>
          <List>{createInvolvementsList()}</List>
        </CardContent>
      </Card>
    </Grid>
  );
};
