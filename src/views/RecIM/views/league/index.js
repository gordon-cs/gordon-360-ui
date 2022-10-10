import { Grid, Typography, Card, CardHeader, CardContent } from '@material-ui/core/';
import { useParams } from 'react-router';
import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import styles from './League.module.css';

// CARD - schedule
let scheduleCard = (
  <Card>
    <CardHeader title="Schedule" className={styles.cardHeader} />
    <CardContent>
      {/* if there are games scheduled, map them here */}
      <div className={styles.listing}>{/* <LeagueListing leagueId={123456} /> */}</div>
      <div className={styles.listing}>{/* <LeagueListing leagueId={12345} /> */}</div>
      {/* else "no schedule yet set" */}
      <Typography variant="body1" paragraph>
        Games have not yet been scheduled.
      </Typography>
    </CardContent>
  </Card>
);

// CARD - teams
let teamsCard = (
  <Card>
    <CardHeader title="Teams" className={styles.cardHeader} />
    <CardContent>
      {/* if I am apart of any active teams, map them here */}
      <div className={styles.listing}>{/* <TeamListing leagueId={123456} teamId={789} /> */}</div>
      <div className={styles.listing}>{/* <TeamListing leagueId={12345} teamId={987} /> */}</div>
      {/* else "no teams" */}
      <Typography variant="body1" paragraph>
        Be the first to create a team!
      </Typography>
    </CardContent>
  </Card>
);

const League = () => {
  const { leagueId } = useParams();
  const { profile, loading } = useUser();
  // profile hook used for future authentication
  // Administration privs will use AuthGroups -> example can be found in
  //           src/components/Header/components/NavButtonsRightCorner
  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    return (
      <>
        <Grid container alignItems="center" className={styles.leagueHeader}>
          <Grid item>
            <img src={''} alt="League Icon" width="85em"></img>
          </Grid>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item>
            <Typography variant="h5">League Name</Typography>
            <Typography variant="body" className={styles.grayText}>
              <i>Description of league</i>
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            {scheduleCard}
          </Grid>
          <Grid item xs={12} md={6}>
            {teamsCard}
          </Grid>
        </Grid>
      </>
    );
  }
};

export default League;
