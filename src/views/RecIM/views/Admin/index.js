import { Grid, Typography, Card, CardContent, Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
import { useUser } from 'hooks';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import styles from './Admin.module.css';
import { getParticipantByUsername } from 'services/recim/participant';
import { ActivityList, TeamList, ParticipantList } from '../../components/List';
import { getActivities } from '../../../../services/recim/activity';
import { getTeams } from '../../../../services/recim/team';
import { getParticipants } from '../../../../services/recim/participant';
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
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [participantsLoading, setParticipantsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState();
  const [activities, setActivities] = useState([]);
  const [teams, setTeams] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      let participant;
      if (profile) {
        participant = await getParticipantByUsername(profile.AD_Username);
        setIsAdmin(participant?.IsAdmin ?? false);
      }
      setLoading(false);
    };
    loadProfile();
  }, [profile]);

  // initialize all data
  useEffect(() => {
    const loadActivities = async () => {
      setActivitiesLoading(true);
      setActivities(await getActivities());
      setActivitiesLoading(false);
    };
    const loadTeams = async () => {
      setTeamsLoading(true);
      setTeams(await getTeams());
      setTeamsLoading(false);
    };
    const loadParticipants = async () => {
      setParticipantsLoading(true);
      setParticipants(await getParticipants());
      setParticipantsLoading(false);
    };
    loadActivities();
    loadTeams();
    loadParticipants();
  }, []);

  let homeHeader = (
    <Card>
      <CardContent>
        <Grid container alignItems="center" columnSpacing={2}>
          <Grid item>
            <img src={recimLogo} alt="Rec-IM Logo" width="85em"></img>
          </Grid>
          <Grid item xs={8} md={5} lg={3}>
            <hr className={styles.homeHeaderLine} />
            <Typography variant="h5" className={styles.homeHeaderTitle}>
              <b className="accentText">Gordon</b> Rec-IM
            </Typography>
            <Typography variant="h6" className={styles.homeHeaderSubtitle}>
              <i>"Competition reveals character"</i>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else if (!isAdmin) {
    return 'You are not a Rec-IM admin.';
  } else {
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
                onChange={(newTab) => setTab(newTab)}
                aria-label="admin control center tabs"
              >
                <Tab label="Activities" />
                <Tab label="Teams" />
                <Tab label="Participants" />
              </Tabs>
              <TabPanel value={tab} index={0}>
                {activitiesLoading ? <GordonLoader /> : <ActivityList activities={activities} />}
              </TabPanel>
              <TabPanel value={tab} index={1}>
                {teamsLoading ? <GordonLoader /> : <TeamList teams={teams} />}
              </TabPanel>
              <TabPanel value={tab} index={2}>
                {participantsLoading ? (
                  <GordonLoader />
                ) : (
                  <ParticipantList participants={participants} />
                )}
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
        {/* for development purposes only */}
        <Typography variant="subtitle1">Current UserID: {profile.ID}</Typography>
      </Grid>
    );
  }
};

export default Admin;
