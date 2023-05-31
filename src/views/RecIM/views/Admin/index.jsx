import { Card, CardContent, Tabs, Tab, Button, Grid, Box } from '@mui/material';
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
import ParticipantForm from 'views/RecIM/components/Forms/ParticipantForm';
import SurfaceForm from 'views/RecIM/components/Forms/SurfaceForm';
import SportForm from 'views/RecIM/components/Forms/SportForm';
import GordonDialogBox from 'components/GordonDialogBox';
import { Typography } from '@mui/material';
import recimLogo from 'views/RecIM/recim_logo.png';
import { useNavigate } from 'react-router';
import { deleteSport, getAllSports } from 'services/recim/sport';

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
      >
        <br />
        <Typography variant="body1">
          Are you sure you want to permanently delete this surface:
          <i>'{surface?.Name}'</i>?
        </Typography>
        <Typography variant="body1">This action cannot be undone.</Typography>
      </GordonDialogBox>
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
