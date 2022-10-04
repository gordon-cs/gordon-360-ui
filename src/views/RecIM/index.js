import GordonUnauthorized from 'components/GordonUnauthorized';
import { Grid, Typography, Button } from '@material-ui/core/';
import { postSmashLeague, getAllLeagues } from 'services/recim';
import CreateLeagueForm from './components/CreateLeagueForm';
import { useUser } from 'hooks';
import { useState } from 'react';
import GordonLoader from 'components/Loader';

const RecIM = () => {
  const { profile, loading } = useUser();
  const [allLeagues, setAllLeagues] = useState('');
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

  const handleCreateLeagueForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenCreateLeagueForm(false);
  };

  const handleGet = () => {
    console.log('get leagues');
    getAllLeagues()
      .then((e) => {
        let allLeagues = e.map((league) => `${league.Name}`);

        setAllLeagues(allLeagues);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMake = () => {
    console.log('post league');
    postSmashLeague()
      .then()
      .catch((error) => console.log(error));
  };

  if (loading) {
    return <GordonLoader />;
  }

  if (profile) {
    return (
      <Grid justifyContent="center">
        {createLeagueButton}
        <Typography variant="subtitle1">Current UserID: {profile.ID}</Typography>
        <Button
          color="primary"
          onClick={() => {
            handleMake();
          }}
        >
          Make Smash League
        </Button>
        <Button
          color="primary"
          onClick={() => {
            handleGet();
          }}
        >
          Get All Leagues
        </Button>
        <Typography variant="subtitle1">All Current Leagues: {allLeagues}</Typography>

        <CreateLeagueForm
          closeWithSnackbar={(status) => {
            handleCreateLeagueForm(status);
          }}
          openCreateLeagueForm={openCreateLeagueForm}
          setOpenCreateLeagueForm={(bool) => setOpenCreateLeagueForm(bool)}
        />
      </Grid>
    );
  }
  return <GordonUnauthorized feature={'your profile'} />;
};
export default RecIM;
