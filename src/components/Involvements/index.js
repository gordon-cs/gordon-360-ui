import React, { useState, useEffect } from 'react';

import { Button, Card, CardContent, CardHeader, Grid, List, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import activity from '../../services/activity';
import membershipService from '../../services/membership';
import SimpleSnackbar from '../Snackbar';
import MyProfileActivityList from '../MyProfileActivityList/index';
import ProfileActivityList from '../ProfileActivityList/index';
import './index.css';
import user from '../../services/user';
import GordonLoader from '../Loader';

export const Involvements = ({ userID = null, username = null, myProf }) => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false });

  useEffect(() => {
    async function loadMemberships() {
      setLoading(true);
      if (myProf) {
        const myMemberships = await user.getMembershipsAlphabetically(userID);
        await Promise.all(
          myMemberships.map(async (membership) => {
            const involvement = await activity.get(membership.ActivityCode);
            membership.IsInvolvementPrivate = involvement.Privacy;
          }),
        );
        setMemberships(myMemberships);
      } else {
        const publicMemberships = await user.getPublicMemberships(username);
        setMemberships(publicMemberships);
      }
      setLoading(false);
    }
    loadMemberships();
  }, [myProf, username, userID]);

  const InvolvementsList = () => {
    if (memberships.length === 0) {
      return (
        <Link to={`/involvements`}>
          <Typography variant="body2" className="noInvolvements">
            No Involvements to display. Click here to see Involvements around campus!
          </Typography>
        </Link>
      );
    } else if (myProf) {
      return memberships.map((membership) => (
        <MyProfileActivityList
          membership={membership}
          key={membership.MembershipID}
          onTogglePrivacy={toggleMembershipPrivacy}
        />
      ));
    } else {
      return memberships.map((membership) => (
        <ProfileActivityList Activity={membership} key={membership.MembershipID} />
      ));
    }
  };

  const toggleMembershipPrivacy = async (membership) => {
    try {
      await membershipService.toggleMembershipPrivacy(membership);
      setMemberships(
        memberships.map((m) => {
          if (m.MembershipID === membership.MembershipID) m.Privacy = !m.Privacy;
          return m;
        }),
      );
      createSnackbar(membership.Privacy ? 'Membership Visible' : 'Membership Hidden', 'Success');
    } catch {
      createSnackbar('Privacy Change Failed', 'Error');
    }
  };

  const createSnackbar = (message, severity) => {
    setSnackbar({ message, severity, open: true });
  };

  if (loading) {
    return <GordonLoader />;
  }

  return (
    <>
      <Grid item xs={12} className="involvements">
        <Grid container className="involvements-header">
          <CardHeader title="Involvements" />
        </Grid>
        <Card className="involvements-card">
          <CardContent className="involvements-card-content">
            {myProf && (
              <Grid container justify="center">
                <Link className="gc360-link" to="/transcript">
                  <Button variant="contained" className="involvements-card-content-button">
                    Experience Transcript
                  </Button>
                </Link>
              </Grid>
            )}
            <List>
              <InvolvementsList />
            </List>
          </CardContent>
        </Card>
      </Grid>
      {myProf && (
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
