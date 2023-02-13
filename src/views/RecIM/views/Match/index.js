import { Grid, Typography, Card, CardHeader, CardContent, IconButton } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
import { useParams } from 'react-router';
import { useUser } from 'hooks';
import { useState, useEffect } from 'react';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import Header from '../../components/Header';
import EditMatchStatsForm from 'views/RecIM/components/Forms/EditMatchStatsForm';
import styles from './Match.module.css';
import { ParticipantList } from './../../components/List';
import { getParticipantByUsername } from 'services/recim/participant';
import { getMatchByID } from 'services/recim/match';
import { DateTime } from 'luxon';
import EditIcon from '@mui/icons-material/Edit';

const RosterCard = ({ participants, teamName }) => (
  <Card>
    <CardHeader title={teamName ?? 'No team yet...'} className={styles.cardHeader} />
    <CardContent>
      <ParticipantList participants={participants} />
    </CardContent>
  </Card>
);

const Match = () => {
  const { matchID } = useParams();
  const { profile } = useUser();
  const [match, setMatch] = useState();
  const [loading, setLoading] = useState(true);
  const [team0Score, setTeam0Score] = useState(0);
  const [team1Score, setTeam1Score] = useState(0);
  const [openEditMatchStatsForm, setOpenEditMatchStatsForm] = useState(false);
  const [selectedScores, setSelectedScores] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const loadData = async () => {
      if (profile) {
        setUser(await getParticipantByUsername(profile.AD_Username));
      }
    };
    loadData();
  }, [profile]);

  useEffect(() => {
    const loadMatch = async () => {
      setLoading(true);
      setMatch(await getMatchByID(matchID));
      setLoading(false);
    };
    loadMatch();
  }, [matchID, openEditMatchStatsForm]);
  // @TODO modify above dependency to only refresh upon form submit (not cancel)

  useEffect(() => {
    if (match) {
      const assignMatchScores = async () => {
        setTeam0Score(
          match.Scores.find((team) => team.TeamID === match.Team[0]?.ID)?.TeamScore ?? 0,
        );
        setTeam1Score(
          match.Scores.find((team) => team.TeamID === match.Team[1]?.ID)?.TeamScore ?? 0,
        );
      };
      assignMatchScores();
    }
  }, [match]);

  const handleEditMatchStatsForm = (status) => {
    setOpenEditMatchStatsForm(false);
  };

  const dayMonthDate = (date) => {
    return (
      date.weekdayShort +
      ' ' +
      date.monthLong +
      ' ' +
      date.day +
      ', ' +
      date.toLocaleString(DateTime.TIME_SIMPLE)
    );
  };

  if (loading && !profile) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    let headerContents = (
      <>
        <Grid container spacing={4}>
          <Grid item xs={6} textAlign="right">
            <Typography className={styles.subtitle}>{match?.Activity.Name}</Typography>
          </Grid>
          <Grid item xs={6} textAlign="left">
            <Typography className={styles.subtitle}>
              {dayMonthDate(DateTime.fromISO(match?.Time))}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="space-around">
          <Grid item xs={2}>
            <LinkRouter to={`/recim/activity/${match?.Activity.ID}/team/${match?.Team[0]?.ID}`}>
              <Typography variant="h5" className="gc360_text_link">
                {match?.Team[0]?.Name ?? 'No team yet...'}
              </Typography>
            </LinkRouter>
            <Typography className={styles.subtitle}>
              {/* once this is added to the API, it will instantly work */}
              {match?.Team[0]?.TeamRecord.Win ?? 0}W : {match?.Team[0]?.TeamRecord.Loss ?? 0}L
            </Typography>
            {user?.IsAdmin && (
              <i className={styles.subtitle}>Sportsmanship: {match?.Scores[0].Sportsmanship}</i>
            )}
          </Grid>
          <Grid item xs={2}>
            <img src={''} alt="Team Icon" width="85em"></img>
          </Grid>
          <Grid item container xs={4} sm={2} alignItems="center" direction="column">
            <Typography variant="h5">
              {team0Score} : {team1Score}
            </Typography>
            {user?.IsAdmin && (
              <Grid item>
                <Grid container columnSpacing={2} justifyItems="center">
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        setSelectedScores(match?.Scores[0]);
                        setOpenEditMatchStatsForm(true);
                      }}
                      className={styles.editIconButton}
                    >
                      <EditIcon className={styles.editIconColor} />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        setSelectedScores(match?.Scores[1]);
                        setOpenEditMatchStatsForm(true);
                      }}
                      className={styles.editIconButton}
                    >
                      <EditIcon className={styles.editIconColor} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={2}>
            <img src={''} alt="Team Icon" width="85em"></img>
          </Grid>
          <Grid item xs={2}>
            <LinkRouter to={`/recim/activity/${match?.Activity.ID}/team/${match?.Team[1]?.ID}`}>
              <Typography variant="h5" className="gc360_text_link">
                {match?.Team[1]?.Name ?? 'No team yet...'}
              </Typography>
            </LinkRouter>
            <Typography className={styles.subtitle}>
              {match?.Team[1]?.TeamRecord.Win ?? 0}W : {match?.Team[1]?.TeamRecord.Loss ?? 0}L
            </Typography>
            {user?.IsAdmin && (
              <i className={styles.subtitle}>Sportsmanship: {match?.Scores[1].Sportsmanship}</i>
            )}
          </Grid>
        </Grid>
      </>
    );

    return (
      <>
        <Header match={match}>{headerContents}</Header>
        {loading ? (
          <GordonLoader />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RosterCard
                participants={match.Team[0]?.Participant}
                teamName={match.Team[0]?.Name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RosterCard
                participants={match.Team[1]?.Participant}
                teamName={match.Team[1]?.Name}
              />
            </Grid>
            {openEditMatchStatsForm && (
              <EditMatchStatsForm
                matchID={match.ID}
                teamMatchHistory={selectedScores}
                closeWithSnackbar={(status) => {
                  handleEditMatchStatsForm(status);
                }}
                openEditMatchStatsForm={openEditMatchStatsForm}
                setOpenEditMatchStatsForm={setOpenEditMatchStatsForm}
              />
            )}
          </Grid>
        )}
      </>
    );
  }
};

export default Match;
