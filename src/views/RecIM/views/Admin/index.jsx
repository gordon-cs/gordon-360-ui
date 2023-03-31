import { Card, CardContent, Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
import { useUser } from 'hooks';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import Header from '../../components/Header';
import { HomeHeaderContents } from '../Home';
// import styles from './Admin.module.css'; //unused for now since I've imported homeHeader
import { getParticipantByUsername } from 'services/recim/participant';
import { ActivityList, TeamList, ParticipantList, SurfacesList } from '../../components/List';
import { getActivities } from '../../../../services/recim/activity';
import { getTeams } from '../../../../services/recim/team';
import { getParticipants } from '../../../../services/recim/participant';
import { getSurfaces } from '../../../../services/recim/match';

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
  //const [shouldRefresh, setShouldRefresh] = useState(false);
  // I suggest a refresh button as an option to prevent ONLY refreshing via window reload

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
    loadActivities();
    loadTeams();
    loadSurfaces();
    // if you don't do this, you can see every participant via looking at the network tab
    // on console, feel free to add the loadActivities/Teams to this 'if' statement if you desire
    // but at the very least, participants need to be hidden
    if (user?.IsAdmin) {
      loadParticipants();
    }
  }, [user]); //add shouldReload in the dependency array when refresh button implemented

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
            {surfaces ? <SurfacesList surfaces={surfaces} /> : <GordonLoader />}
          </TabPanel>
        </CardContent>
      </Card>
    </>
  );
};

export default Admin;
