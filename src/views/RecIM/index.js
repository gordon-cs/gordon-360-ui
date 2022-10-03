import { Grid, Typography, Card, CardHeader, CardContent } from '@material-ui/core/';
import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import styles from './RecIM.module.css';
import recimLogo from './recim_logo.jpg';

let upcomingEvents = (
  <Card>
    <CardHeader title="Upcoming Events" className={styles.card} />
    <CardContent>
      <Typography variant="body1" paragraph>
        stuff goes here
      </Typography>
    </CardContent>
  </Card>
);

let myTeams = (
  <Card>
    <CardHeader title="My Teams" className={styles.card} />
    <CardContent>
      <Typography variant="body1" paragraph>
        stuff goes here
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
        <Grid container alignItems="center">
          <Grid item>
            <img src={recimLogo} alt="Rec-IM Logo" width="85em"></img>
          </Grid>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item>
            <Typography variant="h5">Rec-IM</Typography>
            <Typography variant="h6">
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
