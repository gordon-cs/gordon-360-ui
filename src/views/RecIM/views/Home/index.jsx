import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import GordonUnauthenticated from 'components/GordonUnauthenticated';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import { isFuture } from 'date-fns';
import { useUser } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActivities } from 'services/recim/activity';
import {
  editParticipantAllowEmails,
  getParticipantByUsername,
  getParticipantTeams,
} from 'services/recim/participant';
import { getTeamInvites } from 'services/recim/team';
import SeriesForm from 'views/RecIM/components/Forms/SeriesForm';
import WaiverForm from 'views/RecIM/components/Forms/WaiverForm';
import { TabPanel } from 'views/RecIM/components/TabPanel';
import recimLogo from 'views/RecIM/recim_logo.png';
import ActivityForm from '../../components/Forms/ActivityForm';
import Header from '../../components/Header';
import { ActivityList, TeamList } from './../../components/List';
import AffiliationsChart from './components/AffiliationsChart';
import styles from './Home.module.css';

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
  const [completedActivities, setCompletedActivities] = useState([]);
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
      setParticipantTeams(await getParticipantTeams(participant.Username));
      setAllowEmails(participant.AllowEmails);
      setLoading(false);
    };

    if (participant) {
      setHasPermissions(participant.IsAdmin);
      loadParticipantData();
    }
  }, [participant]);

  useEffect(() => {
    let open = [];
    let ongoing = [];
    let completed = [];
    activities.forEach((activity) => {
      if (activity.RegistrationOpen || isFuture(Date.parse(activity.RegistrationStart))) {
        open.push(activity);
      } else if (isFuture(Date.parse(activity.EndDate))) {
        ongoing.push(activity);
      } else {
        completed.push(activity);
      }
    });
    setOngoingActivities(ongoing);
    setRegistrableActivities(open);
    setCompletedActivities(completed);
  }, [activities]);

  const handleHomeSettings = (e) => {
    setHomeMenuAnchorEl(e.currentTarget);
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

  let recentlyCompletedActivities = (
    <CardContent>
      {completedActivities.length > 0 ? (
        <ActivityList activities={completedActivities} showActivityOptions={hasPermissions} />
      ) : (
        <Typography className={styles.secondaryText}>
          It looks like there aren't any recently completed Rec-IM activities
        </Typography>
      )}
    </CardContent>
  );

  let myInvites = (
    <CardContent>
      {invites.length > 0 ? (
        <TeamList
          participant={participant}
          teams={invites}
          invite
          setInvites={setInvites}
          setOpenWaiver={setOpenWaiver}
        />
      ) : (
        <Typography className={styles.secondaryText}>No pending invites</Typography>
      )}
    </CardContent>
  );

  let affiliationsCard = (
    <Card>
      <Accordion>
        <AccordionSummary
          className={`${styles.cardHeader} ${styles.center}`}
          expandIcon={<ExpandMoreIcon className={styles.expandMoreIcon} />}
        >
          <Typography>Hall Rankings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AffiliationsChart />
        </AccordionDetails>
      </Accordion>
    </Card>
  );

  let myTeams = (
    <CardContent>
      {participantTeams.length > 0 ? (
        <TeamList teams={participantTeams} />
      ) : (
        <Typography className={styles.secondaryText}>You're not yet a part of any teams</Typography>
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
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Upcoming" />
          <Tab label="Ongoing" />
          <Tab label="Completed" />
        </Tabs>
        <TabPanel value={activityTab} index={0}>
          {upcomingActivitiesContent}
        </TabPanel>
        <TabPanel value={activityTab} index={1}>
          {ongoingActivitiesContent}
        </TabPanel>
        <TabPanel value={activityTab} index={2}>
          {recentlyCompletedActivities}
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
        textColor="secondary"
        indicatorColor="secondary"
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

  let headerAlert = participant?.Status === 'Pending' && (
    <Alert
      severity="error"
      sx={{ mb: '1rem' }}
      action={
        <Button
          variant="outlined"
          className={styles.alertButton}
          onClick={() => {
            window.open('https://forms.gordon.edu/232353329449056', '_blank');
          }}
        >
          Sign Waiver
        </Button>
      }
    >
      You must sign the Bennett Center Waiver before participating in any Rec/IM activities.
    </Alert>
  );

  return loading ? (
    <GordonLoader />
  ) : !profile ? (
    <GordonUnauthenticated feature={'the Rec-IM page'} />
  ) : (
    <>
      <Header>{headerContents}</Header>
      {loading ? (
        <GordonLoader />
      ) : (
        <>
          {headerAlert}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {affiliationsCard}
            </Grid>
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
        </>
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
            checked={allowEmails}
            defaultChecked={participant?.AllowEmails}
            onChange={(e) => handleAllowEmails(e.target.checked)}
          />
          Allow Emails
        </MenuItem>
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
};

export default Home;
