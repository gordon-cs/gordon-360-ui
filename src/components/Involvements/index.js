import React, { useState, useEffect } from 'react';
import activity from '../../services/activity';
import storage from '../../services/storage';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import MyProfileActivityList from '../MyProfileActivityList/index';
import ProfileActivityList from '../ProfileActivityList/index';
import Typography from '@material-ui/core/Typography';
import './index.css';

export const Involvements = (props) => {
  const [involvementsAndTheirPrivacy, setInvolvementsAndTheirPrivacy] = useState([]);
  const [publicMemberships, setPublicMemberships] = useState([]);
  const [network, setNetwork] = useState();

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
        // Creates the involvements list for the Public Profile view
        const memberships = await getPublicMemberships(props.memberships);
        setPublicMemberships(memberships);
      } catch (error) {
        // Do Nothing
      }
    }
    loadInvolvements();
  }, [props.memberships, props.myProf]);

  useEffect(() => {
    let networkStatus;
    /* Attempts to get the network status from local storage.
     * If not found, the default value is online
     */
    try {
      networkStatus = storage.get('network-status');
    } catch (error) {
      // Defaults the network to online if not found in local storage
      networkStatus = 'online';
    }

    // Saves the network's status to this component's state
    setNetwork(networkStatus);
  }, [network]);

  useEffect(() => {
    /* Used to re-render the page when the network connection changes.
     *  The state's network variable is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', (event) => {
      if (
        event.data === 'online' &&
        network === 'offline' &&
        event.origin === window.location.origin
      ) {
        setNetwork('online');
      } else if (
        event.data === 'offline' &&
        network === 'online' &&
        event.origin === window.location.origin
      ) {
        setNetwork('offline');
      }
    });
    return window.removeEventListener('message', () => {});
  }, [network]);

  // Creates the Involvements list
  function createInvolvementsList() {
    // Creates the Involvements list for the My Profile page
    if (props.myProf) {
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
        return involvementsAndTheirPrivacy.map((involvementPrivacyKeyValuePair) => (
          <MyProfileActivityList
            Membership={involvementPrivacyKeyValuePair.key}
            InvolvementPrivacy={involvementPrivacyKeyValuePair.value}
            network={network}
          />
        ));
      }
    }

    // Creates the Involvements list for the Public Profile Page
    else {
      // If the user has no public Involvements, say so on the page
      if (publicMemberships.length === 0) {
        return (
          <Typography variant="h6" align="center">
            No Involvements to display
          </Typography>
        );
      } else {
        return publicMemberships.map((activity) => (
          <ProfileActivityList Activity={activity} key={activity.MembershipID} />
        ));
      }
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

  // Gets the list of public memberships
  async function getPublicMemberships(membershipsList) {
    let memberships = [];
    for (let i = 0; i < membershipsList.length; i++) {
      let involvement = await activity.get(membershipsList[i].ActivityCode);
      // Checks to see if the involvement is a private involvement. If not and the involvement's
      // privacy is set to false, it's added to the list of involvements to display
      if (!involvement.Privacy && !membershipsList[i].Privacy) {
        memberships.push(membershipsList[i]);
      }
    }
    return memberships;
  }

  return (
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
  );
};
