import { Button, Card, CardContent, CardHeader, Grid, List, Typography } from '@mui/material';
import GordonLoader from 'components/Loader';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import activity from 'services/activity';
import membershipService from 'services/membership';
import MembershipInfoCard from './components/MembershipInfoCard';
import styles from './MembershipsList.module.css';

/**
 * A List of memberships for display on the Profile and MyProfile views.
 *
 * @param {Object} props The component props
 * @param {string} props.username Username of the profile being viewed
 * @param {boolean} props.myProf Whether this is shown in MyProfile or not
 * @param {Function} props.createSnackbar function to create a snackbar of whether an operation succeeded
 * @returns {JSX} A list of the user's memberships
 */
const MembershipsList = ({ username, myProf, createSnackbar }) => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [membershipHistories, setMembershipHistories] = useState([]);

  useEffect(() => {
    async function loadMemberships() {
      setLoading(true);

      const memberships = await membershipService.get({ username, sessionCode: '*' });

      if (myProf) {
        // await Promise.all(
        //   memberships.map(async (membership) => {
        //     const involvement = await activity.get(membership.ActivityCode);
        //     membership.IsInvolvementPrivate = involvement.Privacy;
        //   }),
        // );
        const myMemberships = await membershipService.groupByActivityCode(username);
        setMembershipHistories(myMemberships);
      } else {
        const publicMemberships = await membershipService.getPublicMemberships(username);
        setMembershipHistories(publicMemberships);
      }

      //setMemberships(memberships);
      setLoading(false);
    }
    loadMemberships();
  }, [myProf, username]);

  const MembershipsList = () => {
    // console.log(membershipHistories);
    //if (memberships.length === 0) {
    if (membershipHistories.length === 0) {
      return (
        <Link to={`/involvements`}>
          <Typography variant="body2" className={styles.noMemberships}>
            No Involvements to display. Click here to see Involvements around campus!
          </Typography>
        </Link>
      );
    } else {
      return membershipHistories.map((membership) => (
        <MembershipInfoCard
          // myProf={myProf}
          // membership={membership}
          // key={membership.MembershipID}
          // onTogglePrivacy={toggleMembershipPrivacy}
          myProf={myProf}
          membershipHistory={membership}
          key={membership.ActivityCode}
          //onTogglePrivacy={toggleMembershipPrivacy}
          createSnackbar={createSnackbar}
        />
      ));
    }
  };

  const toggleMembershipPrivacy = async (membership) => {
    try {
      let updated = await membershipService.setMembershipPrivacy(
        membership.MembershipID,
        !membership.Privacy,
      );
      if (updated.Privacy !== membership.Privacy) {
        createSnackbar(membership.Privacy ? 'Membership Shown' : 'Membership Hidden', 'success');
      } else {
        createSnackbar(
          membership.Privacy ? 'Failed to Show Membership' : 'Failed to Hide Membership',
          'error',
        );
      }
      setMembershipHistories(
        membershipHistories.map((m) => {
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
