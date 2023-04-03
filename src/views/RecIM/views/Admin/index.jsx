import { Card, CardContent, Tabs, Tab, Button } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from 'hooks';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import Header from '../../components/Header';
import { HomeHeaderContents } from '../Home';
import styles from './Admin.module.css';
import { getParticipantByUsername } from 'services/recim/participant';
import { ActivityList, TeamList, ParticipantList, SurfacesList } from '../../components/List';
import { getActivities } from '../../../../services/recim/activity';
import { getTeams } from '../../../../services/recim/team';
import { getParticipants } from '../../../../services/recim/participant';
import { deleteSurface, getSurfaces } from '../../../../services/recim/match';
import { Add } from '@mui/icons-material';
import SurfaceForm from 'views/RecIM/components/Forms/SurfaceForm';
import GordonDialogBox from 'components/GordonDialogBox';
import { Typography } from '@mui/material';

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

  if (loading) return <GordonLoader />;
  // The user is not logged in
  if (!profile || !user) return <GordonUnauthorized feature={'the Rec-IM page'} />;
  if (!user?.IsAdmin) return <GordonUnauthorized feature={'the Rec-IM Command Center'} />;
  return (
    <>
      <Header admin>
        <HomeHeaderContents />
      </Header>
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
                  startIcon={<Add />}
                  className={styles.addSurfaceButton}
                  onClick={() => setOpenSurfaceForm(true)}
                >
                  add a surface
                </Button>
                <SurfacesList
                  surfaces={surfaces}
                  confirmDelete={(surface) => {
                    setOpenConfirmDelete(surface);
                  }}
                  editDetails={(surface) => {
                    setOpenSurfaceForm(surface);
                  }}
                />
              </>
            ) : (
              <GordonLoader />
            )}
          </TabPanel>
        </CardContent>
      </Card>
      <SurfaceForm
        surface={openSurfaceForm}
        closeWithSnackbar={async (snackbar) => {
          createSnackbar(snackbar.message, snackbar.status);
          setSurfaces(await getSurfaces());
        }}
        openSurfaceForm={openSurfaceForm}
        setOpenSurfaceForm={(bool) => setOpenSurfaceForm(bool)}
      />
      <GordonDialogBox
        title="Confirm Delete"
        open={openConfirmDelete}
        cancelButtonClicked={() => setOpenConfirmDelete(false)}
        buttonName="Yes, delete this surface"
        buttonClicked={async () => {
          await deleteSurface(openConfirmDelete?.ID);
          setSurfaces(await getSurfaces());
          setOpenConfirmDelete(false);
        }}
        severity="error"
      >
        <br />
        <Typography variant="body1">
          Are you sure you want to permanently delete this surface:
          <i>'{openConfirmDelete?.Name}'</i>?
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
