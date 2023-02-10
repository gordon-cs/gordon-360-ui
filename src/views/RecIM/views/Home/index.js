import GordonUnauthorized from 'components/GordonUnauthorized';
import { Grid, Typography, Card, CardHeader, CardContent, Button, Tabs, Tab } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ActivityForm from '../../components/Forms/ActivityForm';
import { useUser } from 'hooks';
import { useState, useEffect } from 'react';
import GordonLoader from 'components/Loader';
import Header from '../../components/Header';
import styles from './Home.module.css';
import { ActivityList, TeamList } from './../../components/List';
import { getActivities } from 'services/recim/activity';
import { getParticipantTeams, getParticipantByUsername } from 'services/recim/participant';
import WaiverForm from 'views/RecIM/components/Forms/WaiverForm';
import CreateSeriesForm from 'views/RecIM/components/Forms/CreateSeriesForm';

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index} role="tabpanel">
      {children}
    </div>
  );
};

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
  const [tab, setTab] = useState(0);

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

  let ongoingActivitiesContent = (
    <CardContent>
      {registrableActivities.length > 0 ? (
        <ActivityList activities={ongoingActivities} />
      ) : (
        <Typography variant="body1" paragraph>
          It looks like there aren't any Rec-IM activities currently ongoing
        </Typography>
      )}
    </CardContent>
  );

  let upcomingActivitiesContent = (
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
  );

  let activitiesCard = (
    <Card>
      <CardHeader title="Rec-IM Activities" className={styles.cardHeader} />
      <Tabs
        value={tab}
        onChange={(event, newTab) => setTab(newTab)}
        aria-label="admin control center tabs"
        centered
      >
        <Tab label="Upcoming Activities" />
        <Tab label="Ongoing Activities" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        {upcomingActivitiesContent}
      </TabPanel>
      <TabPanel value={tab} index={1}>
        {ongoingActivitiesContent}
      </TabPanel>
    </Card>
  );

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
      <>
        <Header expandable="home" home />
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {activitiesCard}
          </Grid>
          <Grid item xs={12} md={4}>
            {myTeamsCard}
          </Grid>
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
      </>
    );
  }
};

export default Home;
