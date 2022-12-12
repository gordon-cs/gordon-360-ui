import { Grid, Typography, Card, CardHeader, CardContent } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './Team.module.css';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { useUser } from 'hooks';
import { ParticipantList, MatchList } from './../../components/List';
import { getTeamByID } from 'services/recim/team';

const Team = () => {
  const { activityID, teamID } = useParams();
  const { profile } = useUser();
  const [team, setTeam] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeamData = async () => {
      setLoading(true);
      setTeam(await getTeamByID(teamID));
      setLoading(false);
    };
    loadTeamData();
  }, [teamID]);

  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    let rosterCard = (
      <Card>
        <CardHeader title="Roster" className={styles.cardHeader} />
        <CardContent>
          {/*This is hardcoded data for now, in the future, roster card should
          be a react component that takes a set of users and maps them here*/}
          <ParticipantList participants={team.Participant} />
        </CardContent>
      </Card>
    );

    // CARD - schedule
    let scheduleCard = (
      <Card>
        <CardHeader title="Schedule" className={styles.cardHeader} />
        <CardContent>
          {team.Match ? (
            <MatchList matches={team.Match} activityID={team.ActivityID} />
          ) : (
            <Typography variant="body1" paragraph>
              No matches scheduled at this time!
            </Typography>
          )}
        </CardContent>
      </Card>
    );

    return (
      <>
        <Grid container alignItems="center" className={styles.activityHeader}>
          <Grid item>
            <img src={''} alt="Team Icon" width="85em"></img>
          </Grid>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item>
            <Typography variant="h5">{team.Name}</Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            {scheduleCard}
          </Grid>
          <Grid item xs={12} md={6}>
            {rosterCard}
          </Grid>
        </Grid>
        <p>
          Activity ID: {activityID} Team ID: {teamID} (for testing purposes only)
        </p>
      </>
    );
  }
};

export default Team;
