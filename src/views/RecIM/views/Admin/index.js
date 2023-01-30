import { Grid, Typography, Card, CardContent, Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
import { useUser } from 'hooks';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
// import styles from './Admin.module.css'; //unused for now since I've imported homeHeader
import { getParticipantByUsername } from 'services/recim/participant';
import { ActivityList, TeamList, ParticipantList } from '../../components/List';
import { getActivities } from '../../../../services/recim/activity';
import { getTeams } from '../../../../services/recim/team';
import { getParticipants } from '../../../../services/recim/participant';
import { homeHeader } from '../Home';

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
  const [activities, setActivities] = useState(null);
  const [teams, setTeams] = useState(null);
  const [participants, setParticipants] = useState(null);
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
    loadActivities();
    loadTeams();
    loadParticipants();
  }, [user]); //add shouldReload in the dependency array when refresh button implemented

  if (loading) return <GordonLoader />;
  // The user is not logged in
  if (!profile || !user) return <GordonUnauthorized feature={'the Rec-IM page'} />;

  if (!user?.IsAdmin) return <GordonUnauthorized feature={'the Rec-IM Command Center'} />;

  return (
    <Grid container direction="column" rowSpacing={2} wrap="nowrap">
      <Grid item alignItems="center" xs={12}>
        {homeHeader}
      </Grid>
      <Grid item>
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
          </CardContent>
        </Card>
      </Grid>
      {/* for development purposes only */}
      <Typography variant="subtitle1">Current UserID: {profile.ID}</Typography>
    </Grid>
  );
};

export default Admin;
