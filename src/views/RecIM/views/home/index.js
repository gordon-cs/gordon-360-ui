import { Grid, Typography, Card, CardHeader, CardContent } from '@material-ui/core/';
import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import LeagueListing from './components/LeagueListing';
import TeamListing from './components/TeamListing';
import styles from './Home.module.css';
import recimLogo from './../../recim_logo.png';

// CARD - upcoming events
let upcomingEvents = (
  <Card>
    <CardHeader title="Upcoming Rec-IM Events" className={styles.cardHeader} />
    <CardContent>
      <Typography variant="body1" paragraph>
        {/* if there are upcoming events, map them here */}
        <div className={styles.listing}>
          <LeagueListing />
        </div>
        <div className={styles.listing}>
          <LeagueListing />
        </div>
        {/* else "no upcoming events" */}
        It looks like there aren't any Rec-IM events currently open for registration :(
      </Typography>
    </CardContent>
  </Card>
);

// CARD - my teams
let myTeams = (
  <Card>
    <CardHeader title="My Teams" className={styles.cardHeader} />
    <CardContent>
      <Typography variant="body1" paragraph>
        {/* if I am apart of any active teams, map them here */}
        <div className={styles.listing}>
          <TeamListing />
        </div>
        <div className={styles.listing}>
          <TeamListing />
        </div>
        {/* else "no teams" */}
        You're not yet apart of any teams; join one to get started!
      </Typography>
    </CardContent>
  </Card>
);

const RecIM = () => {
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
        <Grid container alignItems="center" className={styles.homeHeader}>
          <Grid item>
            <img src={recimLogo} alt="Rec-IM Logo" width="85em"></img>
          </Grid>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item>
            <Typography variant="h5">Rec-IM</Typography>
            <Typography variant="h6" className={styles.grayText}>
              <i>"Competition reveals character"</i>
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={8}>
            {upcomingEvents}
          </Grid>
          <Grid item xs={12} md={4}>
            {myTeams}
          </Grid>
        </Grid>
        <Typography variant="subtitle1">Current UserID: {profile.ID}</Typography>
      </>
    );
  }
};

export default RecIM;
