import { Grid, Typography, Card, CardHeader, CardContent, List } from '@material-ui/core/';
import { useParams } from 'react-router';
import styles from './Team.module.css';
import { ParticipantListing, MatchListing } from '../../components/Listing';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { useUser } from 'hooks';

let rosterCard = (
  <Card>
    <CardHeader title="Roster" className={styles.cardHeader} />
    <CardContent>
      {/*This is hardcoded data for now, in the future, roster card should
        be a react component that takes a set of users and maps them here*/}
      <List>
        <ParticipantListing username={'silas.white'} />
        <ParticipantListing username={'amos.cha'} />
      </List>
    </CardContent>
  </Card>
);

// CARD - schedule
let scheduleCard = (
  <Card>
    <CardHeader title="Schedule" className={styles.cardHeader} />
    <CardContent>
      {/* if there are games scheduled, map them here */}
      <div className={styles.listing}>
        <MatchListing activityID={123456} matchID={321} />
      </div>
      <div className={styles.listing}>
        <MatchListing activityID={123456} matchID={654} />
      </div>
      {/* else "no schedule yet set" */}
      <Typography variant="body1" paragraph>
        Games have not yet been scheduled.
      </Typography>
    </CardContent>
  </Card>
);

const Team = () => {
  const { activityID, teamID } = useParams();
  const { profile, loading } = useUser();

  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    return (
      <>
        <Grid container alignItems="center" className={styles.activityHeader}>
          <Grid item>
            <img src={''} alt="Team Icon" width="85em"></img>
          </Grid>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item>
            <Typography variant="h5">Team Name</Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            {scheduleCard}
          </Grid>
          <Grid item xs={12} md={6}>
            {rosterCard}
          </Grid>
        </Grid>
      </>
    );
  }
};

export default Team;
