import { Grid, Typography, Card, CardHeader, CardContent, Breadcrumbs } from '@mui/material';
import { useParams } from 'react-router';
import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import styles from './Match.module.css';
import { ParticipantList } from './../../components/List';
import { Link as LinkRouter } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

// CARD - roster
// eventually this might be abstracted from the similar card on the teams page
const RosterCard = (teamID) => {
  return (
    <Card>
      <CardHeader title="Team Name" className={styles.cardHeader} />
      <CardContent>
        {/* if I am apart of any active teams, map them here */}
        <ParticipantList
          participants={[{ username: 'silas.white' }, { username: 'cameron.abbot' }]}
        />
      </CardContent>
    </Card>
  );
};

const Match = () => {
  const { activityID, matchID } = useParams();
  const { profile, loading } = useUser();
  // profile hook used for future authentication
  // Administration privs will use AuthGroups -> example can be found in
  //           src/components/Header/components/NavButtonsRightCorner

  // CARD - main
  let MainCard = (
    <Card>
      <CardContent>
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <Breadcrumbs aria-label="breadcrumb">
              <LinkRouter
                className="gc360_text_link"
                underline="hover"
                color="inherit"
                to={'/recim'}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Rec-IM Home
              </LinkRouter>
              <LinkRouter
                className="gc360_text_link"
                underline="hover"
                color="inherit"
                to={`/recim/activity/${activityID}`}
              >
                Activity Name
              </LinkRouter>
              <Typography color="text.primary">Match: Team A vs Team B</Typography>
            </Breadcrumbs>
          </Grid>
          <hr className={styles.recimNavHeaderLine} />
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item className={styles.grayText}>
            Activity Name
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
          <Grid item container xs={3} sm={2} alignItems="center" direction="column">
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
            {MainCard}
          </Grid>
          <Grid item xs={12} md={6}>
            <RosterCard teamID={123}></RosterCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <RosterCard teamID={456}></RosterCard>
          </Grid>
        </Grid>
        <Typography>
          Activity ID: {activityID}, Match ID: {matchID} (testing purposes only)
        </Typography>
      </>
    );
  }
};

export default Match;
