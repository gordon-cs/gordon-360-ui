import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Breadcrumbs,
  IconButton,
} from '@mui/material';
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
import EditIcon from '@mui/icons-material/Edit';
import EditMatchStatsForm from 'views/RecIM/components/Forms/EditMatchStatsForm';

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
  const [openEditMatchStatsForm, setOpenEditMatchStatsForm] = useState(false);
  const [selectedScores, setSelectedScores] = useState();
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
        setTeam0Score(match.Scores.find((team) => team.OwnID === match.Team[0]?.ID)?.OwnScore ?? 0);
        setTeam1Score(match.Scores.find((team) => team.OwnID === match.Team[1]?.ID)?.OwnScore ?? 0);
        setLoading(false);
      };
      assignMatchScores();
    }
  }, [match]);

  const handleEditMatchStatsForm = (status) => {
    setOpenEditMatchStatsForm(false);
  };


  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    let mainCard = (
      <Card>
        <CardContent>
          <Grid item container direction="column" alignItems="center">
            <Grid item>
              <Breadcrumbs aria-label="breadcrumb">
                <LinkRouter
                  className="gc360_text_link"
                  underline="hover"
                  color="inherit"
                  to={'/recim'}
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Rec-IM Home
                </LinkRouter>
                <LinkRouter
                  className="gc360_text_link"
                  underline="hover"
                  color="inherit"
                  to={`/recim/activity/${match.Activity.ID}`}
                >
                  {match.Activity.Name}
                </LinkRouter>
                <Typography color="text.primary">
                  Match: {match.Team[0]?.Name ?? '____'} vs {match.Team[1]?.Name ?? '____'}{' '}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <hr className={styles.recimNavHeaderLine} />
          </Grid>
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
              <Grid item>
                <Grid container columnSpacing={2} justifyItems="center">
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        setSelectedScores(match.Scores[0]);
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
                        setSelectedScores(match.Scores[1]);
                        setOpenEditMatchStatsForm(true);
                      }}
                      className={styles.editIconButton}
                    >
                      <EditIcon className={styles.editIconColor} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
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
        {openEditMatchStatsForm ? (
          <EditMatchStatsForm
            teamMatchHistory={selectedScores}
            closeWithSnackbar={(status) => {
              handleEditMatchStatsForm(status);
            }}
            openEditMatchStatsForm={openEditMatchStatsForm}
            setOpenEditMatchStatsForm={setOpenEditMatchStatsForm}
          />
        ) : null}
      </>
    );
  }
};

export default Match;
