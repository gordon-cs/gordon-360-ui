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
import { Link as LinkRouter } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
// import EditIcon from '@mui/icons-material/Edit'

const dayMonthDate = (date) => {
  return (
    date.weekdayLong +
    ', ' +
    date.monthLong +
    ' ' +
    date.day +
    ', ' +
    date.toLocaleString(DateTime.TIME_SIMPLE)
  );
};

const RosterCard = ({ participants, teamName }) => (
  <Card>
    <CardHeader title={teamName ?? 'No team yet...'} className={styles.cardHeader} />
    <CardContent>
      <ParticipantList participants={participants} />
    </CardContent>
  </Card>
);

const Match = () => {
  const { activityID, matchID } = useParams();
  const { profile } = useUser();
  const [match, setMatch] = useState();
  const [loading, setLoading] = useState(true);
  const [team0Score, setTeam0Score] = useState(0);
  const [team1Score, setTeam1Score] = useState(0);
  // const [openMatchForm, setOpenMatchForm] = useState(false);

  useEffect(() => {
    const loadMatch = async () => {
      setLoading(true);
      setMatch(await getMatchByID(matchID));
      setLoading(false);
    };
    loadMatch();
  }, [matchID]);

  useEffect(() => {
    if (match) {
      const assignMatchScores = async () => {
        setLoading(true);
        setTeam0Score(
          match.Scores.find((team) => team.TeamID === match.Team[0]?.ID)?.TeamScore ?? 0,
        );
        setTeam1Score(
          match.Scores.find((team) => team.TeamID === match.Team[1]?.ID)?.TeamScore ?? 0,
        );
        setLoading(false);
      };
      assignMatchScores();
    }
  }, [match]);

  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    let mainCard = (
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" marginBottom="10px">
            <Grid item className={styles.grayText}>
              {match.Activity.Name}
            </Grid>
            <Grid item className={styles.grayText}>
              {dayMonthDate(DateTime.fromISO(match.Time))}
            </Grid>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-around">
            <Grid item xs={2}>
              <LinkRouter to={`/recim/activity/${match.Activity.ID}/team/${match.Team[0]?.ID}`}>
                <Typography variant="h5" className="gc360_text_link">
                  {match.Team[0]?.Name ?? 'No team yet...'}
                </Typography>
              </LinkRouter>
              <i className={styles.grayText}>Sportsmanship</i>
            </Grid>
            <Grid item xs={2}>
              <img src={''} alt="Team Icon" width="85em"></img>
            </Grid>
            <Grid item container xs={4} sm={2} alignItems="center" direction="column">
              <Typography variant="body" className={styles.grayText}>
                <i>Match Score</i>
              </Typography>
              <Typography variant="h5">
                {team0Score} : {team1Score}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <img src={''} alt="Team Icon" width="85em"></img>
            </Grid>
            <Grid item xs={2}>
              <LinkRouter to={`/recim/activity/${match.Activity.ID}/team/${match.Team[1]?.ID}`}>
                <Typography variant="h5" className="gc360_text_link">
                  {match.Team[1]?.Name ?? 'No team yet...'}
                </Typography>
              </LinkRouter>
              <i className={styles.grayText}>Sportsmanship</i>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );

    return (
      <>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={12}>
            {mainCard}
          </Grid>
          <Grid item xs={12} md={6}>
            <RosterCard participants={match.Team[0]?.Participant} teamName={match.Team[0]?.Name} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RosterCard participants={match.Team[1]?.Participant} teamName={match.Team[1]?.Name} />
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
