import { Button, Card, CardContent, CardHeader, Grid, List, Typography } from '@material-ui/core';
import GordonLoader from 'components/Loader';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import activity from 'services/activity';
import membershipService from 'services/membership';
import userService from 'services/user';
import MembershipInfoCard from './components/MembershipInfoCard';
import styles from './MembershipsList.module.css';

/**
 * A List of memberships for display on the Profile and MyProfile views.
 *
 * @param {Object} props The component props
 * @param {string} props.user Either the user's ID number for MyProfile or the username for Profile
 * @param {boolean} props.myProf Whether this is shown in MyProfile or not
 * @param {Function} props.createSnackbar function to create a snackbar of whether an operation succeeded
 * @returns {JSX} A list of the user's memberships
 */
const MembershipsList = ({ user, myProf, createSnackbar }) => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMemberships() {
      setLoading(true);
      if (myProf) {
        const myMemberships = await membershipService.groupByActivityCode(user);
        await Promise.all(
          myMemberships.map(async (membership) => {
            const involvement = await activity.get(membership[0].ActivityCode);
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

  const transcriptButton = myProf && (
    <Grid container justifyContent="center">
      <Link className="gc360_link" to="/transcript">
        <Button variant="contained" className={styles.memberships_card_content_button}>
          Experience Transcript
        </Button>
      </Link>
    </Grid>
  );

  return (
    <>
      <Grid item xs={12} className={styles.memberships}>
        <Grid container className={styles.memberships_header}>
          <CardHeader title="Involvements" />
        </Grid>
        <Card className={styles.memberships_card}>
          <CardContent className={styles.memberships_card_content}>
            {transcriptButton}
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
