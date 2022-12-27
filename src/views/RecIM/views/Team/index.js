import { Grid, Typography, Card, CardHeader, CardContent, Breadcrumbs } from '@mui/material';
import { useParams } from 'react-router';
import styles from './Team.module.css';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { useUser } from 'hooks';
import { ParticipantList, MatchList } from './../../components/List';
import { Link as LinkRouter } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Team = () => {
  const { activityID, teamID } = useParams();
  const { profile, loading } = useUser();

  let teamHeader = (
    <Card>
      <CardContent>
        <Grid container direction="column">
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
                <Typography color="text.primary">Team Name</Typography>
              </Breadcrumbs>
            </Grid>
            <hr className={styles.teamHeaderLine} />
          </Grid>
          <Grid item container direction="row" alignItems="center" columnSpacing={4}>
            <Grid item>
              <img src={''} alt="Team Icon" width="85em"></img>
            </Grid>
            <Grid item xs={8} md={5}>
              <Typography variant="h5" className={styles.teamTitle}>
                Team Name
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  let rosterCard = (
    <Card>
      <CardHeader title="Roster" className={styles.cardHeader} />
      <CardContent>
        {/*This is hardcoded data for now, in the future, roster card should
          be a react component that takes a set of users and maps them here*/}
        <ParticipantList
          participants={[{ username: 'silas.white' }, { username: 'cameron.abbot' }]}
        />
      </CardContent>
    </Card>
  );

  // CARD - schedule
  let scheduleCard = (
    <Card>
      <CardHeader title="Schedule" className={styles.cardHeader} />
      <CardContent>
        {/* if there are games scheduled, map them here */}
        <MatchList matches={[{ activityID: '123456', ID: '789' }]} />
        {/* else "no schedule yet set" */}
        <Typography variant="body1" paragraph>
          Games have not yet been scheduled.
        </Typography>
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
      <Grid container spacing={2}>
        <Grid item alignItems="center" xs={12}>
          {teamHeader}
        </Grid>
        <Grid item container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            {scheduleCard}
          </Grid>
          <Grid item xs={12} md={6}>
            {rosterCard}
          </Grid>
        </Grid>
        <p>
          Activity ID: {activityID} Team ID: {teamID} (for testing purposes only)
        </p>
      </Grid>
    );
  }
};

export default Team;
