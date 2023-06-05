import {
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  Button,
  Grid,
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Fab,
  ListItemSecondaryAction,
} from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from 'hooks';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import Header from '../../components/Header';
import styles from './Admin.module.css';
import { getParticipantByUsername } from 'services/recim/participant';
import {
  ActivityList,
  TeamList,
  ParticipantList,
  SurfaceList,
  SportList,
} from '../../components/List';
import { getActivities } from 'services/recim/activity';
import { getTeams } from 'services/recim/team';
import { getParticipants } from 'services/recim/participant';
import { deleteSurface, getSurfaces } from 'services/recim/match';
import AddIcon from '@mui/icons-material/Add';
import SurfaceForm from 'views/RecIM/components/Forms/SurfaceForm';
import SportForm from 'views/RecIM/components/Forms/SportForm';
import GordonDialogBox from 'components/GordonDialogBox';
import { Typography } from '@mui/material';
import recimLogo from 'views/RecIM/recim_logo.png';
import { useNavigate } from 'react-router';
import { deleteSport, getAllSports } from 'services/recim/sport';
import SettingsIcon from '@mui/icons-material/Settings';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getRecIMReport } from 'services/recim/recim';
import { Print } from '@mui/icons-material';
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
  const [surfaces, setSurfaces] = useState();
  const [surface, setSurface] = useState();
  const [sports, setSports] = useState();
  const [sport, setSport] = useState();
  const [tab, setTab] = useState(0);
  const [openSurfaceForm, setOpenSurfaceForm] = useState();
  const [openSportForm, setOpenSportForm] = useState(false);
  const [openConfirmDeleteSurface, setOpenConfirmDeleteSurface] = useState();
  const [openConfirmDeleteSport, setOpenConfirmDeleteSport] = useState();
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [adminMenuAnchorEl, setAdminMenuAnchorEl] = useState();
  const openAdminMenu = Boolean(adminMenuAnchorEl);
  //Using default dates to speed up testing, set to null for develop push!
  const [selectedDateIn, setSelectedDateIn] = useState(new Date(2023, 1, 1, 0, 0, 0, 0));
  const [selectedDateOut, setSelectedDateOut] = useState(new Date(2023, 5, 1, 0, 0, 0, 0));
  const [openRecimReportBox, setOpenRecimReportBox] = useState(null);
  const [recimReport, setRecimReport] = useState(null);

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
    if (user?.IsAdmin) {
      loadData();
    }
    setLoading(false);
  }, [user?.IsAdmin]);

  const handleAdminMenuOpen = (e) => {
    setAdminMenuAnchorEl(e.currentTarget);
  };

  const handleAdminMenuClose = () => {
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

  const handleOpenCreateSurface = () => {
    setSurface();
    setOpenSurfaceForm(true);
  };

  const handleOpenCreateSport = () => {
    setSport();
    setOpenSportForm(true);
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

  let AdminReportBoxContent = (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={10} xl={12}>
        <Card elevation={10}>
          <CardHeader
            title={
              <>
                <Typography className={styles.title}>Rec-IM Admin Report</Typography>
              </>
            }
          />
          <CardContent>
            <Card>
              <CardContent>
                <Typography className={styles.reportSubtitle}>
                  {'From: ' + (recimReport && new Date(recimReport.StartTime).toLocaleString())}
                </Typography>
                <Typography className={styles.reportSubtitle}>
                  {'To: ' + (recimReport && new Date(recimReport.EndTime).toLocaleString())}
                </Typography>
              </CardContent>
            </Card>
            <Card className={styles.reportCard}>
              <CardHeader
                className={styles.cardHeader}
                title={
                  <>
                    <Typography className={styles.cardHeader}>
                      Active Participants:{' '}
                      {' ' + (recimReport && recimReport.NumberOfActiveParticipants)}
                    </Typography>
                  </>
                }
              />
              {recimReport ? countGenderOccurrances() : ''}
              <CardContent>
                <Grid container>
                  <Grid xl={3}></Grid>
                  <Grid xl={9}>
                    <Typography className={styles.reportText}>
                      {'Totals - Male: '}
                      {recimReport && genderCounts[0]}
                      {' - Female: '}
                      {recimReport && genderCounts[1]}
                      {' - N/A: '}
                      {recimReport && genderCounts[2]}
                    </Typography>
                  </Grid>
                </Grid>
                {recimReport &&
                  recimReport.ActiveParticipants.map((participants) => (
                    <>
                      <Grid container>
                        <Grid xl={8}>
                          <Typography className={styles.reportText}>
                            {'Name: ' + participants.Username}
                          </Typography>
                        </Grid>{' '}
                        <Grid xl={4}>
                          <Typography className={styles.reportText}>
                            {' Gender: ' +
                              (participants.SpecifiedGender === 'U'
                                ? 'N/A'
                                : participants.SpecifiedGender)}
                          </Typography>
                          {
                            //Combining the two typography texts fixes the print not having a space,
                            // if no other solution can be found.
                          }
                        </Grid>
                      </Grid>
                    </>
                  ))}
              </CardContent>
            </Card>
            <Card className={styles.reportCard}>
              <CardHeader
                className={styles.cardHeader}
                title={
                  <Typography className={styles.cardHeader}>
                    New Participants: {' ' + (recimReport && recimReport.NumberOfNewParticipants)}
                  </Typography>
                }
              />
              <CardContent>
                {recimReport &&
                  recimReport.NewParticipants.map((participants) => (
                    <>
                      <Grid container>
                        <Grid xl={8}>
                          <Typography className={styles.reportText}>
                            {'Name: ' +
                              participants.UserAccount.FirstName +
                              ' ' +
                              participants.UserAccount.LastName}
                          </Typography>
                        </Grid>{' '}
                        <Grid xl={4}>
                          <Typography className={styles.reportText}>
                            {' Activity Count: ' + participants.NumberOfActivitiesParticipated}
                          </Typography>
                          {
                            //Combining the two typography texts fixes the print not having a space,
                            // if no other solution can be found.
                          }
                        </Grid>
                      </Grid>
                    </>
                  ))}
              </CardContent>
            </Card>
            <Card className={styles.reportCard}>
              <CardHeader
                className={styles.cardHeader}
                title={
                  <Typography className={styles.cardHeader}>
                    Activities: {' ' + (recimReport && recimReport.Activities.length)}
                  </Typography>
                }
              />
              <CardContent>
                {recimReport &&
                  recimReport.Activities.map((activity) => (
                    <>
                      <Grid container>
                        <Grid xl={8}>
                          <Typography className={styles.reportText}>
                            {'Name: ' + activity.Activity.Name}
                          </Typography>
                        </Grid>{' '}
                        <Grid xl={4}>
                          <Typography className={styles.reportText}>
                            {' Participant Count: ' + activity.NumberOfParticipants}
                          </Typography>
                          {
                            // Combining the two typography texts fixes the print not having a
                            // space, if no other solution can be found.  Problem is: standard
                            // window.print method does not inherit react components like grid!
                          }
                        </Grid>
                      </Grid>
                    </>
                  ))}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  let headerContents = (
    <Grid container direction="row" alignItems="center" columnSpacing={{ xs: 2, sm: 4 }}>
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
      <Grid item xs={3} textAlign={'right'}>
        <IconButton onClick={handleAdminMenuOpen} sx={{ mr: '1rem' }}>
          <SettingsIcon
            fontSize="large"
            sx={
              openAdminMenu && {
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

  if (loading) return <GordonLoader />;
  // The user is not logged in
  if (!profile || !user) return <GordonUnauthorized feature={'the Rec-IM page'} />;

  // Navigate away from admin page if user is not an admin
  if (!user?.IsAdmin) {
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
            {participants ? <ParticipantList participants={participants} /> : <GordonLoader />}
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
      >
        {AdminReportBoxContent}
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
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Start Date/Time"
              value={selectedDateIn}
              onChange={setSelectedDateIn}
              className="disable_select"
              disableFuture={true}
            />
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="End Date/Time"
              value={selectedDateOut ?? selectedDateIn}
              onChange={setSelectedDateOut}
              className="disable_select"
              disabled={selectedDateIn === null}
              minDateTime={selectedDateIn}
              disableFuture={true}
            />
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
