import { Print } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import SummarizeIcon from '@mui/icons-material/Summarize';
import {
  Box,
  Button,
  Card,
  CardContent,
  Fab,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonUnauthenticated from 'components/GordonUnauthenticated';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import { useAuthGroups, useUser } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthGroup } from 'services/auth';
import { getActivities } from 'services/recim/activity';
import { deleteSurface, getSurfaces } from 'services/recim/match';
import { getParticipantByUsername, getParticipants } from 'services/recim/participant';
import { getRecIMReport } from 'services/recim/recim';
import { deleteSport, getAllSports } from 'services/recim/sport';
import { getTeams } from 'services/recim/team';
import ParticipantForm from 'views/RecIM/components/Forms/ParticipantForm';
import SportForm from 'views/RecIM/components/Forms/SportForm';
import SurfaceForm from 'views/RecIM/components/Forms/SurfaceForm';
import ActivityList from 'views/RecIM/components/List/Activity';
import recimLogo from 'views/RecIM/recim_logo.png';
import Header from '../../components/Header';
import { ParticipantList, SportList, SurfaceList, TeamList } from '../../components/List';
import styles from './Admin.module.css';
//consider using react-to-print or react-pdf to create downloadable admin report

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index} role="tabpanel">
      {children}
    </div>
  );
};

const Admin = () => {
  const { profile } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  //using term User to not get confused with the liberal usage of participant on this page
  const [user, setUser] = useState();
  const [activities, setActivities] = useState();
  const [teams, setTeams] = useState();
  const [participants, setParticipants] = useState();
  const [participant, setParticipant] = useState();
  const [surfaces, setSurfaces] = useState();
  const [surface, setSurface] = useState();
  const [sports, setSports] = useState();
  const [sport, setSport] = useState();
  const [tab, setTab] = useState(0);
  const [openParticipantForm, setOpenParticipantForm] = useState();
  const [openSurfaceForm, setOpenSurfaceForm] = useState();
  const [openSportForm, setOpenSportForm] = useState(false);
  const [openConfirmDeleteSurface, setOpenConfirmDeleteSurface] = useState();
  const [openConfirmDeleteSport, setOpenConfirmDeleteSport] = useState();
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [adminMenuAnchorEl, setAdminMenuAnchorEl] = useState();
  const openAdminMenu = Boolean(adminMenuAnchorEl);
  const [selectedDateIn, setSelectedDateIn] = useState(null); //must be set null so dates are blank
  const [selectedDateOut, setSelectedDateOut] = useState(null);
  const [openRecimReportBox, setOpenRecimReportBox] = useState();
  const [recimReport, setRecimReport] = useState();
  const isSuperAdmin = useAuthGroups(AuthGroup.RecIMAdmin);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      if (profile) setUser(await getParticipantByUsername(profile.AD_Username));
      setLoading(false);
    };
    loadProfile();
  }, [profile]);

  // initialize all data
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        getActivities().then(setActivities),
        getTeams().then(setTeams),
        getParticipants().then(setParticipants),
        getSurfaces().then(setSurfaces),
        getAllSports().then(setSports),
      ]);
    };

    setLoading(true);
    if (user?.IsAdmin) loadData();
    if (user) setLoading(false);
  }, [user]);

  const handleAdminMenuOpen = (e) => {
    setAdminMenuAnchorEl(e.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setSelectedDateIn(null);
    setSelectedDateOut(null);
    setAdminMenuAnchorEl(null);
  };

  const generateAdminReport = () => {
    let fStartDate = selectedDateIn.toISOString();
    let fEndDate = selectedDateOut.toISOString();
    getRecIMReport(fStartDate, fEndDate).then((value) => handleOpenRecimReport(value));
  };

  const handleOpenRecimReport = (report) => {
    setRecimReport(report);
    setOpenRecimReportBox(true);
  };

  const handleCloseRecimReport = () => {
    setOpenRecimReportBox(null);
  };

  let genderCounts = [];

  const countGenderOccurrances = () => {
    let genders = recimReport.ActiveParticipants.map((value) => value.SpecifiedGender);
    genderCounts[0] = countOccurrences(genders, 'M');
    genderCounts[1] = countOccurrences(genders, 'F');
    genderCounts[2] = countOccurrences(genders, 'U');
  };

  const countOccurrences = (array, value) => array.reduce((a, v) => (v === value ? a + 1 : a), 0);

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  const handleOpenCreateParticipant = () => {
    setParticipant();
    setOpenParticipantForm(true);
  };

  const handleOpenCreateSurface = () => {
    setSurface();
    setOpenSurfaceForm(true);
  };

  const handleOpenCreateSport = () => {
    setSport();
    setOpenSportForm(true);
  };

  const handleOpenEditParticipant = (participant) => {
    setParticipant(participant);
    setOpenParticipantForm(true);
  };

  const handleOpenEditSurface = (surface) => {
    setSurface(surface);
    setOpenSurfaceForm(true);
  };

  const handleOpenEditSport = (sport) => {
    setSport(sport);
    setOpenSportForm(true);
  };

  const handleOpenConfirmDeleteSurface = (surface) => {
    setSurface(surface);
    setOpenConfirmDeleteSurface(true);
  };

  const handleOpenConfirmDeleteSport = (sport) => {
    setSport(sport);
    setOpenConfirmDeleteSport(true);
  };

  const handleConfirmDeleteSurface = async () => {
    await deleteSurface(surface?.ID)
      .then((value) => {
        createSnackbar(`Surface ${surface.Name} deleted successfully`, 'success');
      })
      .catch((reason) => {
        createSnackbar(
          `There was a problem deleting surface ${surface.Name}: ${reason.title}`,
          'error',
        );
      });
    setSurfaces(await getSurfaces());
    setOpenConfirmDeleteSurface(false);
  };

  const handleConfirmDeleteSport = async () => {
    await deleteSport(sport?.ID)
      .then((value) => {
        createSnackbar(`Sport ${sport.Name} deleted successfully`, 'success');
      })
      .catch((reason) => {
        createSnackbar(
          `There was a problem deleting sport ${sport.Name}: ${reason.title}`,
          'error',
        );
      });
    setSports(await getAllSports());
    setOpenConfirmDeleteSport(false);
  };

  /* Definition of the content inside the admin report dialog.

  */
  let AdminReportBoxContent = (
    <Card className={styles.reportCard}>
      <CardContent>
        <>
          <Typography className={styles.title}>Rec-IM Admin Report</Typography>
          <Typography className={styles.reportSubtitle}>
            {new Date(recimReport?.StartTime).toLocaleString()}{' '}
          </Typography>{' '}
          <Typography className={styles.reportSubtitle}>
            {'to ' + new Date(recimReport?.EndTime).toLocaleString()}{' '}
          </Typography>
          <Typography className={styles.cardHeader}>
            Active Participants: {' ' + recimReport?.NumberOfActiveParticipants}
          </Typography>
          {recimReport ? countGenderOccurrances() : ''}
          <Typography className={styles.reportAltText}>
            {'Totals - Male: '}
            {recimReport && genderCounts[0]}
            {' - Female: '}
            {recimReport && genderCounts[1]}
            {' - N/A: '}
            {recimReport && genderCounts[2]}
          </Typography>
          {recimReport?.ActiveParticipants.map((participant) => (
            <>
              {/* Use of divs and display: "grid" in css simplifies print styling */}
              <div className={styles.reportTextGrid}>
                <div className={styles.reportTextGridLeft}>{'User: ' + participant.Username}</div>
                <div className={styles.reportTextGridRight}>
                  {'Gender: ' +
                    (participant.SpecifiedGender === 'U' ? 'N/A' : participant.SpecifiedGender)}
                </div>
              </div>
            </>
          ))}
          <Typography className={styles.cardHeader}>
            New Participants: {' ' + recimReport?.NumberOfNewParticipants}
          </Typography>
          {recimReport?.NewParticipants.map((participant) => (
            <>
              <div className={styles.reportTextGrid}>
                <div className={styles.reportTextGridLeft}>
                  {'Name: ' +
                    participant.UserAccount.FirstName +
                    ' ' +
                    participant.UserAccount.LastName}
                </div>
                <div className={styles.reportTextGridRight}>
                  {'Activities: ' + participant.NumberOfActivitiesParticipated}
                </div>
              </div>
            </>
          ))}
          <Typography className={styles.cardHeader}>
            Activities: {' ' + recimReport?.Activities.length}
          </Typography>
          {recimReport?.Activities.map((activity) => (
            <>
              <div className={styles.reportTextGrid}>
                <div className={styles.reportTextGridLeft}>{'Name: ' + activity.Activity.Name}</div>
                <div className={styles.reportTextGridRight}>
                  {'Participants: ' + activity.NumberOfParticipants}
                </div>
              </div>
            </>
          ))}
        </>
      </CardContent>
    </Card>
  );

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
        <IconButton onClick={handleAdminMenuOpen} sx={{ mr: '1rem' }}>
          <SummarizeIcon
            fontSize="large"
            sx={
              openAdminMenu && {
                animation: 'grow 0.3s linear ',
                '@keyframes grow': {
                  '0%': {
                    transform: 'scale(1)',
                  },
                  '50%': {
                    transform: 'scale(1.3)',
                  },
                  '100%': {
                    transform: 'scale(1)',
                  },
                },
              }
            }
          />
        </IconButton>
      </Grid>
    </Grid>
  );

  if (loading) return <GordonLoader />;
  // The user is not logged in
  if (!profile || !user) return <GordonUnauthenticated feature={'the Rec-IM page'} />;

  // Navigate away from admin page if user is not an admin
  if (!(user?.IsAdmin || isSuperAdmin)) {
    navigate(`/recim`);
  }

  return (
    <>
      <Header admin>{headerContents}</Header>
      <Card>
        <CardContent>
          <Tabs
            value={tab}
            onChange={(event, newTab) => setTab(newTab)}
            aria-label="admin control center tabs"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Activities" />
            <Tab label="Teams" />
            <Tab label="Participants" />
            <Tab label="Surfaces" />
            <Tab label="Sports" />
          </Tabs>
          <TabPanel value={tab} index={0}>
            {activities ? <ActivityList activities={activities} /> : <GordonLoader />}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            {teams ? <TeamList teams={teams} /> : <GordonLoader />}
          </TabPanel>
          <TabPanel value={tab} index={2}>
            {participants ? (
              <>
                <Button
                  color="secondary"
                  startIcon={<AddIcon />}
                  className={styles.addResourceButton}
                  onClick={handleOpenCreateParticipant}
                >
                  add a non-Gordon participant
                </Button>
                <ParticipantList
                  participants={participants}
                  isAdminPage={true}
                  isSuperAdmin={isSuperAdmin}
                  editDetails={handleOpenEditParticipant}
                />
              </>
            ) : (
              <GordonLoader />
            )}
          </TabPanel>
          <TabPanel value={tab} index={3}>
            {surfaces ? (
              <>
                <Button
                  color="secondary"
                  startIcon={<AddIcon />}
                  className={styles.addResourceButton}
                  onClick={handleOpenCreateSurface}
                >
                  add a surface
                </Button>
                <SurfaceList
                  surfaces={surfaces}
                  confirmDelete={handleOpenConfirmDeleteSurface}
                  editDetails={handleOpenEditSurface}
                />
              </>
            ) : (
              <GordonLoader />
            )}
          </TabPanel>
          <TabPanel value={tab} index={4}>
            {sports ? (
              <>
                <Button
                  color="secondary"
                  startIcon={<AddIcon />}
                  className={styles.addResourceButton}
                  onClick={handleOpenCreateSport}
                >
                  add a sport
                </Button>
                <SportList
                  sports={sports}
                  confirmDelete={handleOpenConfirmDeleteSport}
                  editDetails={handleOpenEditSport}
                />
              </>
            ) : (
              <GordonLoader />
            )}
          </TabPanel>
        </CardContent>
      </Card>
      <ParticipantForm
        participant={participant}
        createSnackbar={createSnackbar}
        onClose={async () => setParticipants(await getParticipants())}
        openParticipantForm={openParticipantForm}
        setOpenParticipantForm={setOpenParticipantForm}
      />
      <SportForm
        sport={sport}
        createSnackbar={createSnackbar}
        onClose={async () => setSports(await getAllSports())}
        openSportForm={openSportForm}
        setOpenSportForm={setOpenSportForm}
      />
      <SurfaceForm
        surface={surface}
        createSnackbar={createSnackbar}
        onClose={async () => setSurfaces(await getSurfaces())}
        openSurfaceForm={openSurfaceForm}
        setOpenSurfaceForm={(bool) => setOpenSurfaceForm(bool)}
      />
      <GordonDialogBox
        title="Confirm Delete Surface"
        open={openConfirmDeleteSurface}
        cancelButtonClicked={() => setOpenConfirmDeleteSurface(false)}
        buttonName="Yes, delete this surface"
        buttonClicked={handleConfirmDeleteSurface}
        severity="error"
        className={styles.reportDialog}
      >
        <br />
        <Typography variant="body1">
          Are you sure you want to permanently delete this surface:
          <i>'{surface?.Name}'</i>?
        </Typography>
        <Typography variant="body1">This action cannot be undone.</Typography>
      </GordonDialogBox>
      <GordonDialogBox
        title="Rec-IM Report"
        open={openRecimReportBox}
        buttonName="Done"
        buttonClicked={handleCloseRecimReport}
        fullWidth
        maxWidth="md"
        className={styles.adminReportBox}
      >
        {AdminReportBoxContent}
        <Fab
          color="primary"
          variant="extended"
          className={styles.fab}
          onClick={() => window.print()}
        >
          <Print />
          Print
        </Fab>
      </GordonDialogBox>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Menu
          open={openAdminMenu}
          onClose={handleAdminMenuClose}
          anchorEl={adminMenuAnchorEl}
          className={styles.menu}
        >
          <Typography className={styles.menuTitle}>Generate Admin Reports</Typography>
          <MenuItem>
            <Grid container xs={12} fullWidth spacing={1}>
              <Grid item xs={12} sm={6} fullWidth>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Start Date/Time"
                  value={selectedDateIn}
                  onChange={setSelectedDateIn}
                  className="disable_select"
                  disableFuture={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} fullWidth>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="End Date/Time"
                  value={selectedDateOut}
                  onChange={setSelectedDateOut}
                  className="disable_select"
                  disabled={selectedDateIn === null}
                  minDateTime={selectedDateIn}
                  disableFuture={true}
                />
              </Grid>
            </Grid>
          </MenuItem>
          <MenuItem
            dense
            onClick={() => {
              generateAdminReport();
            }}
            className={styles.menuButton}
          >
            Generate Report
          </MenuItem>
        </Menu>
      </LocalizationProvider>
      <GordonSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
      <GordonDialogBox
        title="Confirm Delete Sport"
        open={openConfirmDeleteSport}
        cancelButtonClicked={() => setOpenConfirmDeleteSport(false)}
        buttonName="Yes, delete this sport"
        buttonClicked={handleConfirmDeleteSport}
        severity="error"
      >
        <br />
        <Typography variant="body1">
          Are you sure you want to permanently delete this sport:
          <i>'{sport?.Name}'</i>?
        </Typography>
        <Typography variant="body1">This action cannot be undone.</Typography>
      </GordonDialogBox>
      <GordonSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </>
  );
};

export default Admin;
