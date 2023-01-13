import { Grid, Typography, Card, CardHeader, CardContent, Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
import { useUser } from 'hooks';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import styles from './Admin.module.css';
import { ActivityList, TeamList } from './../../components/List';
import { getAllActivities } from 'services/recim/activity';
import { DateTime } from 'luxon';
import { getParticipantTeams } from 'services/recim/participant';
import recimLogo from './../../recim_logo.png';

const Admin = () => {
  const { profile } = useUser();
  const [loading, setLoading] = useState(true);
  const [openCreateActivityForm, setOpenCreateActivityForm] = useState(false);
  const [activities, setActivities] = useState([]);
  const [myTeams, setMyTeams] = useState([]);
  const [tab, setTab] = useState(0);

  // profile hook used for future authentication
  // Administration privs will use AuthGroups -> example can be found in
  //           src/components/Header/components/NavButtonsRightCorner

  useEffect(() => {
    const loadActivities = async () => {
      setLoading(true);

      // Get all active activities where registration has not closed
      setActivities(await getAllActivities(false, DateTime.now().toISO()));
      if (profile) {
        setMyTeams(await getParticipantTeams(profile.AD_Username));
      }
      setLoading(false);
    };
    loadActivities();
  }, [profile, openCreateActivityForm]);

  let homeHeader = (
    <Card>
      <CardContent>
        <Grid container direction="row" alignItems="center" spacing={4}>
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

  const handleCreateActivityForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenCreateActivityForm(false);
  };

  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    return (
      <Grid container spacing={2}>
        <Grid item alignItems="center" xs={12}>
          {homeHeader}
        </Grid>
        <Grid item container justifyContent="center" spacing={2}>
          <Grid item>
            <Card>
              <CardContent>
                <Tabs
                  value={tab}
                  onChange={(event, newTab) => setTab(newTab)}
                  aria-label="basic tabs example"
                >
                  <Tab label="Item One" />
                  <Tab label="Item Two" />
                  <Tab label="Item Three" />
                </Tabs>
                <div value={tab} index={0}>
                  Item One
                </div>
                <div value={tab} index={1}>
                  Item Two
                </div>
                <div value={tab} index={2}>
                  Item Three
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* for development purposes only */}
        <Typography variant="subtitle1">Current UserID: {profile.ID}</Typography>
      </Grid>
    );
  }
};

export default Admin;
