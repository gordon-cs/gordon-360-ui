import GordonUnauthorized from 'components/GordonUnauthorized';
import { Grid, Typography, Card, CardHeader, CardContent, Button } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CreateActivityForm from '../../components/Forms/CreateActivityForm';
import { useUser } from 'hooks';
import { useState, useEffect } from 'react';
import GordonLoader from 'components/Loader';
import styles from './Home.module.css';
import recimLogo from './../../recim_logo.png';
import { ActivityList, TeamList } from './../../components/List';
import { getAllActivities } from 'services/recim/activity';
import { DateTime } from 'luxon';
import { getParticipantTeams } from 'services/recim/participant';
import CreateSeriesForm from 'views/RecIM/components/Forms/CreateSeriesForm';

const Home = () => {
  const { profile } = useUser();
  const [loading, setLoading] = useState(true);
  const [openCreateActivityForm, setOpenCreateActivityForm] = useState(false);
  const [openCreateSeriesForm, setOpenCreateSeriesForm] = useState(false);
  const [activities, setActivities] = useState([]);
  const [myTeams, setMyTeams] = useState([]);
  const [createdActivity, setCreatedActivity] = useState('');

  // profile hook used for future authentication
  // Administration privs will use AuthGroups -> example can be found in
  //           src/components/Header/components/NavButtonsRightCorner

  useEffect(() => {
    const loadActivities = async () => {
      setLoading(true);

      // Get all active activities where registration has not closed
      setActivities(await getAllActivities(false, DateTime.now().toISO()));
      if (profile) {
        setMyTeams(await getParticipantTeams(profile.AD_Username));
      }
      setLoading(false);
    };
    loadActivities();
  }, [profile, openCreateActivityForm]);

  const createActivityButton = (
    <Grid container justifyContent="center">
      <Button
        variant="contained"
        color="warning"
        startIcon={<AddCircleRoundedIcon />}
        className={styles.actionButton}
        onClick={() => {
          setOpenCreateActivityForm(true);
        }}
      >
        Create a New Activity
      </Button>
    </Grid>
  );

  let homeHeader = (
    <Card>
      <CardContent>
        <Grid container direction="row" alignItems="center" spacing={4}>
          <Grid item>
            <img src={recimLogo} alt="Rec-IM Logo" width="85em"></img>
          </Grid>
          <Grid item xs={8} md={5} lg={3}>
            <hr className={styles.homeHeaderLine} />
            <Typography variant="h5" className={styles.homeHeaderTitle}>
              <b className="accentText">Gordon</b> Rec-IM
            </Typography>
            <Typography variant="h6" className={styles.homeHeaderSubtitle}>
              <i>"Competition reveals character"</i>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  // CARD - upcoming events
  let upcomingEventsCard = (
    <Card>
      <CardHeader title="Upcoming Rec-IM Activities" className={styles.cardHeader} />
      <CardContent>
        {activities ? (
          <ActivityList activities={activities} />
        ) : (
          <Typography variant="body1" paragraph>
            It looks like there aren't any Rec-IM events currently open for registration :(
          </Typography>
        )}

        {createActivityButton}
      </CardContent>
    </Card>
  );

  // CARD - my teams
  let myTeamsCard = (
    <Card>
      <CardHeader title="My Teams" className={styles.cardHeader} />
      <CardContent>
        {myTeams ? (
          <TeamList teams={myTeams} />
        ) : (
          <Typography variant="body1" paragraph>
            You're not yet apart of any teams; join one to get started!
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  const handleCreateActivityForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    //setOpenCreateSeriesForm(true);
    setOpenCreateActivityForm(false);
  };

  const handleCreateSeriesForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenCreateSeriesForm(false);
  };

  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    return (
      <Grid container spacing={2}>
        <Grid item alignItems="center" xs={12}>
          {homeHeader}
        </Grid>
        <Grid item container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={8}>
            {upcomingEventsCard}
          </Grid>
          <Grid item xs={12} md={4}>
            {myTeamsCard}
          </Grid>
        </Grid>
        <Typography variant="subtitle1">Current UserID: {profile.ID}</Typography>
        {openCreateActivityForm ? (
          <CreateActivityForm
            closeWithSnackbar={(status) => {
              handleCreateActivityForm(status);
            }}
            openCreateActivityForm={openCreateActivityForm}
            setOpenCreateActivityForm={(bool) => setOpenCreateActivityForm(bool)}
          />
        ) : null}
        {openCreateSeriesForm ? (
          <CreateSeriesForm
            closeWithSnackbar={(status) => {
              handleCreateActivityForm(status);
            }}
            openCreateSeriesForm={openCreateSeriesForm}
            setOpenCreateSeriesForm={(bool) => setOpenCreateSeriesForm(bool)}
            activityID={activities[0].ID}
            existingActivitySeries={[]}
          />
        ) : null}
      </Grid>
    );
  }
};

export default Home;
