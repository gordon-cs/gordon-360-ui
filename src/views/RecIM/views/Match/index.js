import { Grid, Typography, Card, CardHeader, CardContent } from '@mui/material';
import { useParams } from 'react-router';
import { useUser } from 'hooks';
import { useState, useEffect } from 'react';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import styles from './Match.module.css';
import { ParticipantList } from './../../components/List';
import { getMatchByID } from 'services/recim/match';
import { DateTime } from 'luxon';

const dayMonthDate = (date) => {
  return (
    date.weekdayLong +
    ', ' +
    date.monthLong +
    ' ' +
    date.day +
    ' ' +
    date.toLocaleString(DateTime.TIME_SIMPLE)
  );
};

const RosterCard = (participants, teamName) => (
  <Card>
    <CardHeader title={teamName} className={styles.cardHeader} />
    <CardContent>
      <ParticipantList participants={participants} />
    </CardContent>
  </Card>
);

const Match = () => {
  const { activityID, matchID } = useParams();
  const { profile } = useUser();
  const [match, setMatch] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatch = async () => {
      setLoading(true);
      setMatch(await getMatchByID(matchID));
      setLoading(false);
    };
    loadMatch();
  }, [matchID]);

  console.log(match);

  let mainCard = (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item className={styles.grayText}>
            {match.Activity.Name}
          </Grid>
          <Grid item className={styles.grayText}>
            {dayMonthDate(DateTime.fromISO(match.Time))}
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="space-around">
          <Grid item xs={1}>
            <Typography variant="h5">{match.Team[0].Name}</Typography>
            <i className={styles.grayText}>Sportsmanship</i>
          </Grid>
          <Grid item xs={1}>
            <img src={''} alt="Team Icon" width="85em"></img>
          </Grid>
          <Grid item container xs={3} sm={2} alignItems="center" direction="column">
            <Typography variant="body" className={styles.grayText}>
              <i>Match status</i>
            </Typography>
            <Typography variant="h5">17 - 38</Typography>
          </Grid>
          <Grid item xs={1}>
            <img src={''} alt="Team Icon" width="85em"></img>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h5">{match.Team[1].Name}</Typography>
            <i className={styles.grayText}>Sportsmanship</i>
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
  } else {
    return (
      <>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={12}>
            {mainCard}
          </Grid>
          <Grid item xs={12} md={6}>
            <RosterCard participants={match.Team[0].Participant} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RosterCard participants={match.Team[1].Participant} />
          </Grid>
        </Grid>
        <Typography>
          Activity ID: {activityID}, Match ID: {matchID} (testing purposes only)
        </Typography>
      </>
    );
  }
};

export default Match;
