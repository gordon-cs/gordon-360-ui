import { Card, CardContent, Tabs, Tab, Button, Grid } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from 'hooks';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import Header from '../../components/Header';
import styles from './Admin.module.css';
import { getParticipantByUsername } from 'services/recim/participant';
import { ActivityList, TeamList, ParticipantList, SurfacesList } from '../../components/List';
import { getActivities } from '../../../../services/recim/activity';
import { getTeams } from '../../../../services/recim/team';
import { getParticipants } from '../../../../services/recim/participant';
import { deleteSurface, getSurfaces } from '../../../../services/recim/match';
import AddIcon from '@mui/icons-material/Add';
import SurfaceForm from 'views/RecIM/components/Forms/SurfaceForm';
import GordonDialogBox from 'components/GordonDialogBox';
import { Typography } from '@mui/material';
import recimLogo from './../../recim_logo.png';

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index} role="tabpanel">
      {children}
    </div>
  );
};

const Admin = () => {
  const { profile } = useUser();
  const [loading, setLoading] = useState(true);
  //using term User to not get confused with the liberal usage of participant on this page
  const [user, setUser] = useState();
  const [activities, setActivities] = useState();
  const [teams, setTeams] = useState();
  const [participants, setParticipants] = useState();
  const [surfaces, setSurfaces] = useState();
  const [tab, setTab] = useState(0);
  const [openSurfaceForm, setOpenSurfaceForm] = useState();
  const [openConfirmDelete, setOpenConfirmDelete] = useState();
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [surface, setSurface] = useState();

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
    const loadActivities = async () => {
      setActivities(await getActivities());
    };
    const loadTeams = async () => {
      setTeams(await getTeams());
    };
    const loadParticipants = async () => {
      setParticipants(await getParticipants());
    };
    const loadSurfaces = async () => {
      setSurfaces(await getSurfaces());
    };
    if (user?.IsAdmin) {
      loadActivities();
      loadTeams();
      loadParticipants();
      loadSurfaces();
    }
  }, [user?.IsAdmin]);

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  const handleOpenCreate = () => {
    setSurface();
    setOpenSurfaceForm(true);
  };

  const handleOpenEdit = (surface) => {
    setSurface(surface);
    setOpenSurfaceForm(true);
  };

  const handleOpenConfirmDelete = (surface) => {
    setSurface(surface);
    setOpenConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    await deleteSurface(surface?.ID);
    setSurfaces(await getSurfaces());
    setOpenConfirmDelete(false);
    createSnackbar('Surface deleted successfully', 'success');
  };

  const handleClose = async (snackbar) => {
    createSnackbar(snackbar.message, snackbar.status);
    setSurfaces(await getSurfaces());
  };

  let headerContents = (
    <Grid container direction="row" alignItems="center" columnSpacing={4}>
      <Grid item>
        <img src={recimLogo} alt="Rec-IM Logo" width="85em"></img>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h5" className={styles.title}>
          <b className="accentText">Gordon</b> Rec-IM
        </Typography>
        <Typography variant="h6" className={styles.subtitle}>
          <i>"Competition reveals character"</i>
        </Typography>
      </Grid>
    </Grid>
  );

  if (loading) return <GordonLoader />;
  // The user is not logged in
  if (!profile || !user) return <GordonUnauthorized feature={'the Rec-IM page'} />;
  if (!user?.IsAdmin) return <GordonUnauthorized feature={'the Rec-IM Command Center'} />;
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
                  className={styles.addSurfaceButton}
                  onClick={handleOpenCreate}
                >
                  add a surface
                </Button>
                <SurfacesList
                  surfaces={surfaces}
                  confirmDelete={handleOpenConfirmDelete}
                  editDetails={handleOpenEdit}
                />
              </>
            ) : (
              <GordonLoader />
            )}
          </TabPanel>
        </CardContent>
      </Card>
      <SurfaceForm
        surface={surface}
        closeWithSnackbar={handleClose}
        openSurfaceForm={openSurfaceForm}
        setOpenSurfaceForm={(bool) => setOpenSurfaceForm(bool)}
      />
      <GordonDialogBox
        title="Confirm Delete"
        open={openConfirmDelete}
        cancelButtonClicked={() => setOpenConfirmDelete(false)}
        buttonName="Yes, delete this surface"
        buttonClicked={handleConfirmDelete}
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
    </>
  );
};

export default Admin;
