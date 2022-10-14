import { Grid, Typography, Card, CardHeader, CardContent } from '@material-ui/core/';
import { useParams } from 'react-router';
import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { ParticipantListing } from 'views/RecIM/components/Listing';
import styles from './Match.module.css';
import { first } from 'lodash';

// CARD - main
const MainCard = () => {
  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item className={styles.grayText}>
            League Name
          </Grid>
          <Grid item className={styles.grayText}>
            Date/Time
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="space-around">
          <Grid item xs={1}>
            <Typography variant="h5">Team A</Typography>
            <i className={styles.grayText}>Sportsmanship</i>
          </Grid>
          <Grid item xs={1}>
            <img src={''} alt="Team Icon" width="85em"></img>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body" className={styles.grayText}>
              <i>Match status</i>
            </Typography>
            <Typography variant="h5">17 - 38</Typography>
          </Grid>
          <Grid item xs={1}>
            <img src={''} alt="Team Icon" width="85em"></img>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h5">Team B</Typography>
            <i className={styles.grayText}>Sportsmanship</i>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// CARD - roster
// eventually this might be abstracted from the similar card on the teams page
const RosterCard = (teamID) => {
  return (
    <Card>
      <CardHeader title="Team Name" className={styles.cardHeader} />
      <CardContent>
        {/* if I am apart of any active teams, map them here */}
        <div className={styles.listing}>
          <ParticipantListing username={first.last} />
        </div>
        <div className={styles.listing}>
          <ParticipantListing username={first.last} />
        </div>
      </CardContent>
    </Card>
  );
};

const Match = () => {
  const { leagueID, matchID } = useParams();
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
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={12}>
            <MainCard></MainCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <RosterCard teamID={123}></RosterCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <RosterCard teamID={456}></RosterCard>
          </Grid>
        </Grid>
        <Typography>
          League ID: {leagueID}, Match ID: {matchID} (testing purposes only)
        </Typography>
      </>
    );
  }
};

export default Match;
