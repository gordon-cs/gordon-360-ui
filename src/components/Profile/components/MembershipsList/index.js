import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Grid, List, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import activity from 'services/activity';
import membershipService from 'services/membership';
import userService from 'services/user';
import GordonLoader from 'components/Loader';
import MembershipInfoCard from './components/MembershipInfoCard';
import styles from './MembershipsList.module.css';

/**
 * A List of memberships for display on the Profile and MyProfile views.
 * @param {string} user Either the user's ID number for MyProfile or the username for Profile
 * @param {boolean} myProf Whether this is shown in MyProfile or not
 * @param {Function} createSnackbar function to create a snackbar of whether an operation succeeded
 * @returns {JSX} A list of the user's memberships
 */
const MembershipsList = ({ user, myProf, createSnackbar }) => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMemberships() {
      setLoading(true);
      if (myProf) {
        const myMemberships = await userService.getMembershipsAlphabetically(user);
        await Promise.all(
          myMemberships.map(async (membership) => {
            const involvement = await activity.get(membership.ActivityCode);
            membership.IsInvolvementPrivate = involvement.Privacy;
          }),
        );
        setMemberships(myMemberships);
      } else {
        const publicMemberships = await userService.getPublicMemberships(user);
        setMemberships(publicMemberships);
      }
      setLoading(false);
    }
    loadMemberships();
  }, [myProf, user]);

  const MembershipsList = () => {
    if (memberships.length === 0) {
      return (
        <Link to={`/involvements`}>
          <Typography variant="body2" className={styles.noMemberships}>
            No Involvements to display. Click here to see Involvements around campus!
          </Typography>
        </Link>
      );
    } else {
      return memberships.map((membership) => (
        <MembershipInfoCard
          myProf={myProf}
          membership={membership}
          key={membership.MembershipID}
          onTogglePrivacy={toggleMembershipPrivacy}
        />
      ));
    }
  };

  const toggleMembershipPrivacy = async (membership) => {
    try {
      await membershipService.toggleMembershipPrivacy(membership);
      createSnackbar(membership.Privacy ? 'Membership Shown' : 'Membership Hidden', 'success');
      setMemberships(
        memberships.map((m) => {
          if (m.MembershipID === membership.MembershipID) {
            m.Privacy = !m.Privacy;
          }
          return m;
        }),
      );
    } catch {
      createSnackbar('Privacy Change Failed', 'error');
    }
  };

  if (loading) {
    return <GordonLoader />;
  }

  return (
    <>
      <Grid item xs={12} className={styles.memberships}>
        <Grid container className={styles.memberships-header}>
          <CardHeader title="Involvements" />
        </Grid>
        <Card className={styles.memberships-card}>
          <CardContent className={styles.memberships-card-content}>
            {myProf && (
              <Grid container justifyContent="center">
                <Link className={styles.gc360-link} to="/transcript">
                  <Button variant="contained" className={styles.memberships-card-content-button}>
                    Experience Transcript
                  </Button>
                </Link>
              </Grid>
            )}
            <List>
              <MembershipsList />
            </List>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default MembershipsList;
