import GordonUnauthorized from 'components/GordonUnauthorized';
import { Grid, Typography, Card, CardHeader, CardContent, Button } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ActivityForm from '../../components/Forms/ActivityForm';
import { useUser } from 'hooks';
import { useState, useEffect } from 'react';
import GordonLoader from 'components/Loader';
import styles from './Home.module.css';
import recimLogo from './../../recim_logo.png';
import { ActivityList, TeamList } from './../../components/List';
import { getActivities } from 'services/recim/activity';
import { getParticipantTeams, getParticipantByUsername } from 'services/recim/participant';
import WaiverForm from 'views/RecIM/components/Forms/WaiverForm';
import CreateSeriesForm from 'views/RecIM/components/Forms/CreateSeriesForm';

const Home = () => {
  const { profile } = useUser();
  const [loading, setLoading] = useState(true);
  const [openActivityForm, setOpenActivityForm] = useState(false);
  const [openCreateSeriesForm, setOpenCreateSeriesForm] = useState(false);
  const [activities, setActivities] = useState([]);
  const [ongoingActivities, setOngoingActivities] = useState([]);
  const [registrableActivities, setRegistrableActivities] = useState([]);
  const [myTeams, setMyTeams] = useState([]);
  const [participant, setParticipant] = useState([]);
  const [openWaiver, setOpenWaiver] = useState(false);
  const [createdActivity, setCreatedActivity] = useState({ ID: null });
  const [hasPermissions, setHasPermissions] = useState(false);

  // profile hook used for future authentication
  // Administration privs will use AuthGroups -> example can be found in
  //           src/components/Header/components/NavButtonsRightCorner

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Get all active activities where registration has not closed
      setActivities(await getActivities(true));
      if (profile) {
        setParticipant(await getParticipantByUsername(profile.AD_Username));
        setMyTeams(await getParticipantTeams(profile.AD_Username));
      }
      setLoading(false);
    };
    loadData();
  }, [profile, openActivityForm, openWaiver, openCreateSeriesForm]);

  useEffect(() => {
    setOpenWaiver(participant == null);
    if (participant) {
      setHasPermissions(participant.IsAdmin);
    }
  }, [participant]);

  useEffect(() => {
    let open = [];
    let ongoing = [];
    activities.forEach((activity) => {
      if (activity.RegistrationOpen) {
        open.push(activity);
      } else {
        ongoing.push(activity);
      }
    });
    setOngoingActivities(ongoing);
    setRegistrableActivities(open);
  }, [activities]);

  const createActivityButton = (
    <Grid container justifyContent="center">
      <Button
        variant="contained"
        color="warning"
        startIcon={<AddCircleRoundedIcon />}
        className={styles.actionButton}
        onClick={() => {
          setOpenActivityForm(true);
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

  // CARD - upcoming activities
  let upcomingActivitiesCard = (
    <Card>
      <CardHeader title="Upcoming Rec-IM Activities" className={styles.cardHeader} />
      <CardContent>
        {registrableActivities.length > 0 ? (
          <ActivityList activities={registrableActivities} />
        ) : (
          <Typography variant="body1" paragraph>
            It looks like there aren't any Rec-IM activities currently open for registration
          </Typography>
        )}

        {hasPermissions ? createActivityButton : null}
      </CardContent>
    </Card>
  );

  let ongoingActivitiesCard = (
    <Card>
      <CardHeader title="On-going Rec-IM Activities" className={styles.cardHeader} />
      <CardContent>
        {registrableActivities.length > 0 ? (
          <ActivityList activities={ongoingActivities} />
        ) : (
          <Typography variant="body1" paragraph>
            It looks like there aren't any Rec-IM activities currently on-going
          </Typography>
        )}
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
    setOpenCreateSeriesForm(true);
    setOpenActivityForm(false);
  };

  const handleCreateSeriesForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenCreateSeriesForm(false);
  };

  const handleOpenWaiverForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenWaiver(false);
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
            <Grid item className={styles.gridItemStack}>
              {upcomingActivitiesCard}
            </Grid>
            <Grid item className={styles.gridItemStack}>
              {ongoingActivitiesCard}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            {myTeamsCard}
          </Grid>
        </Grid>
        <Typography variant="subtitle1">Current UserID: {profile.ID}</Typography>
        {openActivityForm ? (
          <ActivityForm
            closeWithSnackbar={(status) => {
              handleCreateActivityForm(status);
            }}
            openActivityForm={openActivityForm}
            setOpenActivityForm={(bool) => setOpenActivityForm(bool)}
            setCreatedInstance={(activity) => setCreatedActivity(activity)}
          />
        ) : null}
        {openCreateSeriesForm ? (
          <CreateSeriesForm
            closeWithSnackbar={(status) => {
              handleCreateSeriesForm(status);
            }}
            openCreateSeriesForm={openCreateSeriesForm}
            setOpenCreateSeriesForm={(bool) => setOpenCreateSeriesForm(bool)}
            activityID={createdActivity.ID}
            existingActivitySeries={[]}
          />
        ) : null}
        {openWaiver ? (
          <WaiverForm
            username={profile.AD_Username}
            closeWithSnackbar={(status) => {
              handleOpenWaiverForm(status);
            }}
            openWaiverForm={openWaiver}
            setOpenWaiverForm={(bool) => setOpenWaiver(bool)}
          />
        ) : null}
      </Grid>
    );
  }
};

export default Home;
