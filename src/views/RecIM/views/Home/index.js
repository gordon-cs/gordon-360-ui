import GordonUnauthorized from 'components/GordonUnauthorized';
import { Grid, Typography, Card, CardHeader, CardContent, Button } from '@material-ui/core/';
import CreateActivityForm from '../../components/CreateActivityForm';
import { useUser } from 'hooks';
import { useState } from 'react';
import GordonLoader from 'components/Loader';
import styles from './Home.module.css';
import recimLogo from './../../recim_logo.png';
import { ActivityList, TeamList } from './../../components/List';

const Home = () => {
  const { profile, loading } = useUser();
  //const [allActivities, setAllActivities] = useState('');
  const [openCreateActivityForm, setOpenCreateActivityForm] = useState(false);

  // profile hook used for future authentication
  // Administration privs will use AuthGroups -> example can be found in
  //           src/components/Header/components/NavButtonsRightCorner

  const createActivityButton = (
    <Grid container justifyContent="center">
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setOpenCreateActivityForm(true);
        }}
      >
        + Activity
      </Button>
    </Grid>
  );

  // CARD - upcoming events
  let upcomingEventsCard = (
    <Card>
      <CardHeader title="Upcoming Rec-IM Events" className={styles.cardHeader} />
      <CardContent>
        {/* if there are upcoming events, map them here */}
        <ActivityList activities={[{ ID: "123456" }, { ID:"12345" }]}/>
        {createActivityButton}
        <Typography variant="body1" paragraph>
          {/* else "no upcoming events" */}
          It looks like there aren't any Rec-IM events currently open for registration :(
        </Typography>
      </CardContent>
    </Card>
  );

  // CARD - my teams
  let myTeamsCard = (
    <Card>
      <CardHeader title="My Teams" className={styles.cardHeader} />
      <CardContent>
        {/* if I am apart of any active teams, map them here */}
        <TeamList teams={[{ activityID:"123456", ID: "789" }, { activityID:"12345", ID: "987" }]} />
        {/* else "no teams" */}
        <Typography variant="body1" paragraph>
          You're not yet apart of any teams; join one to get started!
        </Typography>
      </CardContent>
    </Card>
  );

  const handleCreateActivityForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenCreateActivityForm(false);
  };

  // const handleGet = () => {
  //   console.log('get activities');
  //   getAllActivities()
  //     .then((e) => {
  //       let allActivities = e.map((activity) => `${activity.Name}`);
  //       setAllActivities(allActivities);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleMake = () => {
  //   console.log('post activity');
  //   postSmashActivity()
  //     .then()
  //     .catch((error) => console.log(error));
  // };

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
            {upcomingEventsCard}
          </Grid>
          <Grid item xs={12} md={4}>
            {myTeamsCard}
          </Grid>
        </Grid>
        <Typography variant="subtitle1">Current UserID: {profile.ID}</Typography>
        <CreateActivityForm
          closeWithSnackbar={(status) => {
            handleCreateActivityForm(status);
          }}
          openCreateActivityForm={openCreateActivityForm}
          setOpenCreateActivityForm={(bool) => setOpenCreateActivityForm(bool)}
        />
      </>
    );
  }
};

export default Home;
