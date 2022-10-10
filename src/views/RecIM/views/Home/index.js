import GordonUnauthorized from 'components/GordonUnauthorized';
import { Grid, Typography, Card, CardHeader, CardContent, Button } from '@material-ui/core/';
import CreateLeagueForm from '../../components/CreateLeagueForm';
import { useUser } from 'hooks';
import { useState } from 'react';
import GordonLoader from 'components/Loader';
import LeagueListing from './components/LeagueListing';
import TeamListing from './components/TeamListing';
import styles from './Home.module.css';
import recimLogo from './../../recim_logo.png';

const Home = () => {
  const { profile, loading } = useUser();
  //const [allLeagues, setAllLeagues] = useState('');
  const [openCreateLeagueForm, setOpenCreateLeagueForm] = useState(false);

  // profile hook used for future authentication
  // Administration privs will use AuthGroups -> example can be found in
  //           src/components/Header/components/NavButtonsRightCorner

  const createLeagueButton = (
    <Grid container justifyContent="center">
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setOpenCreateLeagueForm(true);
        }}
      >
        + League
      </Button>
    </Grid>
  );

  // CARD - upcoming events
  let upcomingEventsCard = (
    <Card>
      <CardHeader title="Upcoming Rec-IM Events" className={styles.cardHeader} />
      <CardContent>
        {/* if there are upcoming events, map them here */}
        <div className={styles.listing}>
          <LeagueListing leagueId={123456} />
        </div>
        <div className={styles.listing}>
          <LeagueListing leagueId={12345} />
        </div>
        {createLeagueButton}
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
        <div className={styles.listing}>
          <TeamListing leagueId={123456} teamId={789} />
        </div>
        <div className={styles.listing}>
          <TeamListing leagueId={12345} teamId={987} />
        </div>
        {/* else "no teams" */}
        <Typography variant="body1" paragraph>
          You're not yet apart of any teams; join one to get started!
        </Typography>
      </CardContent>
    </Card>
  );

  const handleCreateLeagueForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenCreateLeagueForm(false);
  };

  // const handleGet = () => {
  //   console.log('get leagues');
  //   getAllLeagues()
  //     .then((e) => {
  //       let allLeagues = e.map((league) => `${league.Name}`);
  //       setAllLeagues(allLeagues);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleMake = () => {
  //   console.log('post league');
  //   postSmashLeague()
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
        <CreateLeagueForm
          closeWithSnackbar={(status) => {
            handleCreateLeagueForm(status);
          }}
          openCreateLeagueForm={openCreateLeagueForm}
          setOpenCreateLeagueForm={(bool) => setOpenCreateLeagueForm(bool)}
        />
      </>
    );
  }
};

export default Home;
