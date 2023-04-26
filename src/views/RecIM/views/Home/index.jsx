import { useNavigate } from 'react-router-dom';
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
  Menu,
  MenuItem,
  Badge,
  Box,
  IconButton,
  Checkbox,
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
import {
  getParticipantTeams,
  getParticipantByUsername,
  editParticipantAllowEmails,
} from 'services/recim/participant';
import { getTeamInvites } from 'services/recim/team';
import recimLogo from 'views/RecIM/recim_logo.png';
import { isFuture } from 'date-fns';
import { TabPanel } from 'views/RecIM/components/TabPanel';
import SettingsIcon from '@mui/icons-material/Settings';

const Home = () => {
  const navigate = useNavigate();
  const { profile } = useUser();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [openActivityForm, setOpenActivityForm] = useState(false);
  const [openCreateSeriesForm, setOpenCreateSeriesForm] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [activities, setActivities] = useState([]);
  const [ongoingActivities, setOngoingActivities] = useState([]);
  const [registrableActivities, setRegistrableActivities] = useState([]);
  const [participantTeams, setParticipantTeams] = useState([]);
  const [invites, setInvites] = useState([]);
  const [homeMenuAnchorEl, setHomeMenuAnchorEl] = useState();
  const openHomeSettings = Boolean(homeMenuAnchorEl);
  const [allowEmails, setAllowEmails] = useState(true);
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
      // Get all active activities
      setActivities(await getActivities(true));
      if (profile) {
        setParticipant(await getParticipantByUsername(profile.AD_Username));
      }
      setLoading(false);
    };
    loadData();
  }, [profile, reload]);

  useEffect(() => {
    const loadParticipantData = async () => {
      setLoading(true);
      setInvites(await getTeamInvites());
      setParticipantTeams(await getParticipantTeams(profile.AD_Username));
      setAllowEmails(participant.AllowEmails);
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

  const handleHomeSettings = (e) => {
    setHomeMenuAnchorEl(e.currentTarget);
    //navigate(`/recim/admin`);
  };

  const handleMenuClose = () => {
    setHomeMenuAnchorEl(null);
  };

  const handleAllowEmails = async (value) => {
    setAllowEmails(value);
    await editParticipantAllowEmails(participant.Username, value);
  };

  let headerContents = (
    <Grid container alignItems="center" columnSpacing={4} className={styles.header}>
      <Grid item container xs={9} alignItems="center" columnSpacing={2}>
        <Grid item>
          <img src={recimLogo} alt="Rec-IM Logo" className={styles.headerImg}></img>
        </Grid>
        <Grid item xs={8}>
          <Typography className={styles.title}>
            <Box component="span" sx={{ color: 'secondary.main' }}>
              Gordon
            </Box>{' '}
            Rec-IM
          </Typography>
          <Typography className={styles.subtitle}>
            <i>"Competition reveals character"</i>
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={3} textAlign={'right'}>
        <IconButton onClick={handleHomeSettings} sx={{ mr: '1rem' }}>
          <SettingsIcon
            fontSize="large"
            sx={
              openHomeSettings && {
                animation: 'spin 0.2s linear ',
                '@keyframes spin': {
                  '0%': {
                    transform: 'rotate(0deg)',
                  },
                  '100%': {
                    transform: 'rotate(120deg)',
                  },
                },
              }
            }
          />
        </IconButton>
      </Grid>
    </Grid>
  );

  const createActivityButton = (
    <Grid container className={styles.buttonArea}>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            startIcon={<AddCircleRoundedIcon />}
            className={styles.actionButton}
            onClick={() => {
              setOpenActivityForm(true);
            }}
          >
            Create an Activity
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
      {participantTeams.length > 0 ? (
        <TeamList teams={participantTeams} />
      ) : (
        <Typography className={styles.secondaryText}>You're not yet apart of any teams</Typography>
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
            <Badge color="secondary" variant="dot" sx={{ zIndex: 0 }} badgeContent={invites.length}>
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

  if (!profile) {
    return loading ? <GordonLoader /> : <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    return (
      <>
        <Header>{headerContents}</Header>
        {loading ? (
          <GordonLoader />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6.5}>
              {activitiesCard}
            </Grid>
            <Grid item xs={12} md={5.5}>
              {myTeamsCard}
            </Grid>
            <ActivityForm
              onClose={() => {
                setOpenCreateSeriesForm(true);
                setReload((prev) => !prev);
              }}
              createSnackbar={createSnackbar}
              openActivityForm={openActivityForm}
              setOpenActivityForm={(bool) => setOpenActivityForm(bool)}
              setCreatedInstance={(activity) => setCreatedActivity(activity)}
            />
            <SeriesForm
              createSnackbar={createSnackbar}
              openSeriesForm={openCreateSeriesForm}
              onClose={() => {
                navigate(`/recim/activity/${createdActivity.ID}`);
              }}
              setOpenSeriesForm={(bool) => setOpenCreateSeriesForm(bool)}
              activityID={createdActivity.ID}
              existingActivitySeries={[]}
            />
            <WaiverForm
              username={profile.AD_Username}
              createSnackbar={createSnackbar}
              onClose={() => {
                setReload((prev) => !prev);
              }}
              openWaiverForm={openWaiver}
              setOpenWaiverForm={(bool) => setOpenWaiver(bool)}
            />
          </Grid>
        )}
        <Menu
          open={openHomeSettings}
          onClose={handleMenuClose}
          anchorEl={homeMenuAnchorEl}
          className={styles.menu}
        >
          <Typography className={styles.menuTitle}>Options</Typography>
          <MenuItem sx={[{ '&:hover': { backgroundColor: 'transparent' }, fontSize: '0.875rem' }]}>
            <Checkbox
              color="secondary"
              inputProps={{ 'aria-label': 'toggle' }}
              defaultChecked={participant?.AllowEmails}
              onChange={(e) => handleAllowEmails(e.target.checked)}
            />
            Allow Emails
          </MenuItem>

          {/* <MenuItem
            dense
            onClick={() => {
              handleMenuClose();
            }}
            className={styles.menuButton}
          >
            Edit Activity Details
          </MenuItem> */}
          {participant?.IsAdmin && <Typography className={styles.menuTitle}>Admin</Typography>}
          {participant?.IsAdmin && (
            <MenuItem
              dense
              onClick={() => {
                navigate('/recim/admin');
              }}
              className={styles.menuButton}
            >
              Admin Command Center
            </MenuItem>
          )}
        </Menu>
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
