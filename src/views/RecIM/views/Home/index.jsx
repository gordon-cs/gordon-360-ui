import GordonUnauthorized from 'components/GordonUnauthorized';
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Tabs,
  Tab,
  Badge,
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ActivityForm from '../../components/Forms/ActivityForm';
import WaiverForm from 'views/RecIM/components/Forms/WaiverForm';
import SeriesForm from 'views/RecIM/components/Forms/SeriesForm';
import { useUser } from 'hooks';
import { useState, useEffect, useCallback } from 'react';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import Header from '../../components/Header';
import styles from './Home.module.css';
import { ActivityList, TeamList } from './../../components/List';
import { getActivities } from 'services/recim/activity';
import { getParticipantTeams, getParticipantByUsername } from 'services/recim/participant';
import { getTeamInvites } from 'services/recim/team';
import recimLogo from './../../recim_logo.png';
import { isFuture } from 'date-fns';
import { TabPanel } from 'views/RecIM/components';

export const HomeHeaderContents = () => {
  return (
    <Grid container direction="row" alignItems="center" spacing={4}>
      <Grid item>
        <img src={recimLogo} alt="Rec-IM Logo" width="85em"></img>
      </Grid>
      <Grid item xs={8} md={5} lg={3}>
        <Typography variant="h5" className={styles.title}>
          <b className="accentText">Gordon</b> Rec-IM
        </Typography>
        <Typography variant="h6" className={styles.subtitle}>
          <i>"Competition reveals character"</i>
        </Typography>
      </Grid>
    </Grid>
  );
};

const Home = () => {
  const { profile } = useUser();
  const [loading, setLoading] = useState(true);
  const [openActivityForm, setOpenActivityForm] = useState(false);
  const [openCreateSeriesForm, setOpenCreateSeriesForm] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [activities, setActivities] = useState([]);
  const [ongoingActivities, setOngoingActivities] = useState([]);
  const [registrableActivities, setRegistrableActivities] = useState([]);
  const [participantTeams, setParticipantTeams] = useState([]);
  const [invites, setInvites] = useState([]);
  const [participant, setParticipant] = useState([]);
  const [openWaiver, setOpenWaiver] = useState(false);
  const [createdActivity, setCreatedActivity] = useState({ ID: null });
  const [hasPermissions, setHasPermissions] = useState(false);
  const [activityTab, setActivityTab] = useState(0);
  const [teamTab, setTeamTab] = useState(0);

  // profile hook used for future authentication
  // Administration privs will use AuthGroups -> example can be found in
  //           src/components/Header/components/NavButtonsRightCorner

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Get all active activities where registration has not closed
      setActivities(await getActivities());
      if (profile) {
        setParticipant(await getParticipantByUsername(profile.AD_Username));
      }
      setLoading(false);
    };
    loadData();
  }, [profile, openActivityForm, openWaiver, openCreateSeriesForm]);

  useEffect(() => {
    const loadParticipantData = async () => {
      setLoading(true);
      setInvites(await getTeamInvites());
      setParticipantTeams(await getParticipantTeams(profile.AD_Username));
      setLoading(false);
    };

    setOpenWaiver(participant == null);
    if (participant) {
      setHasPermissions(participant.IsAdmin);
      loadParticipantData();
    }
  }, [participant, profile]);

  useEffect(() => {
    let open = [];
    let ongoing = [];
    activities.forEach((activity) => {
      if (activity.RegistrationOpen || isFuture(Date.parse(activity.RegistrationStart))) {
        open.push(activity);
      } else {
        ongoing.push(activity);
      }
    });
    setOngoingActivities(ongoing);
    setRegistrableActivities(open);
  }, [activities]);

  const createActivityButton = (
    <Grid container className={styles.buttonArea}>
      <Grid item xs={12}>
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
            Create a Activity
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );

  let ongoingActivitiesContent = (
    <CardContent>
      {ongoingActivities.length > 0 ? (
        <ActivityList activities={ongoingActivities} showActivityOptions={hasPermissions} />
      ) : (
        <Typography className={styles.secondaryText}>
          It looks like there aren't any Rec-IM activities currently ongoing
        </Typography>
      )}
    </CardContent>
  );

  let upcomingActivitiesContent = (
    <CardContent>
      {registrableActivities.length > 0 ? (
        <ActivityList activities={registrableActivities} showActivityOptions={hasPermissions} />
      ) : (
        <Typography className={styles.secondaryText}>
          It looks like there aren't any Rec-IM activities currently open for registration
        </Typography>
      )}
    </CardContent>
  );

  let myInvites = (
    <CardContent>
      {invites.length > 0 ? (
        <TeamList teams={invites} invite setInvites={setInvites} />
      ) : (
        <Typography className={styles.secondaryText}>No pending invites</Typography>
      )}
    </CardContent>
  );

  let myTeams = (
    <CardContent>
      {participantTeams ? (
        <TeamList teams={participantTeams} />
      ) : (
        <Typography className={styles.secondaryText}>You're not yet apart of any teams!</Typography>
      )}
    </CardContent>
  );

  let activitiesCard = (
    <Card>
      <CardHeader title="Rec-IM Activities" className={styles.cardHeader} />
      <CardContent>
        {hasPermissions && createActivityButton}
        <Tabs
          value={activityTab}
          onChange={(event, newTab) => setActivityTab(newTab)}
          aria-label="admin control center tabs"
          centered
        >
          <Tab label="Upcoming Activities" />
          <Tab label="Ongoing Activities" />
        </Tabs>
        <TabPanel value={activityTab} index={0}>
          {upcomingActivitiesContent}
        </TabPanel>
        <TabPanel value={activityTab} index={1}>
          {ongoingActivitiesContent}
        </TabPanel>
      </CardContent>
    </Card>
  );
  let myTeamsCard = (
    <Card>
      <CardHeader title="Teams" className={styles.cardHeader} />
      <Tabs
        value={teamTab}
        onChange={(event, newTab) => setTeamTab(newTab)}
        aria-label="admin control center tabs"
        centered
      >
        <Tab label="My Teams" />
        <Tab
          label={
            <Badge color="secondary" variant="dot" badgeContent={invites.length}>
              Invites
            </Badge>
          }
        />
      </Tabs>
      <TabPanel value={teamTab} index={0}>
        {myTeams}
      </TabPanel>
      <TabPanel value={teamTab} index={1}>
        {myInvites}
      </TabPanel>
    </Card>
  );

  const handleFormSubmit = (status, setOpenForm) => {
    setOpenForm(false);
  };

  if (!profile) {
    return loading ? <GordonLoader /> : <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    return (
      <>
        <Header>
          <HomeHeaderContents />
        </Header>
        {loading ? (
          <GordonLoader />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              {activitiesCard}
            </Grid>
            <Grid item xs={12} md={5}>
              {myTeamsCard}
            </Grid>
            {openActivityForm && (
              <ActivityForm
                closeWithSnackbar={(status) => {
                  handleFormSubmit(status, setOpenActivityForm);
                  setOpenCreateSeriesForm(true);
                }}
                openActivityForm={openActivityForm}
                setOpenActivityForm={(bool) => setOpenActivityForm(bool)}
                setCreatedInstance={(activity) => setCreatedActivity(activity)}
              />
            )}
            {openCreateSeriesForm && (
              <SeriesForm
                closeWithSnackbar={(status) => {
                  handleFormSubmit(status, setOpenCreateSeriesForm);
                }}
                openSeriesForm={openCreateSeriesForm}
                setOpenSeriesForm={(bool) => setOpenCreateSeriesForm(bool)}
                activityID={createdActivity.ID}
                existingActivitySeries={[]}
              />
            )}
            {openWaiver && (
              <WaiverForm
                username={profile.AD_Username}
                closeWithSnackbar={(status) => {
                  handleFormSubmit(status, setOpenWaiver);
                }}
                openWaiverForm={openWaiver}
                setOpenWaiverForm={(bool) => setOpenWaiver(bool)}
              />
            )}
          </Grid>
        )}
        <GordonSnackbar
          open={snackbar.open}
          text={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        />
      </>
    );
  }
};

export default Home;
