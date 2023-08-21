import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useNavigate, useParams, Link as LinkRouter } from 'react-router-dom';
import { useUser } from 'hooks';
import { useState, useEffect, useCallback } from 'react';
import GordonLoader from 'components/Loader';
import GordonUnauthenticated from 'components/GordonUnauthenticated';
import GordonSnackbar from 'components/Snackbar';
import Header from '../../components/Header';
import styles from './Match.module.css';
import { ExpandableTeamList, MatchHistoryList, ParticipantList } from './../../components/List';
import { getParticipantByUsername } from 'services/recim/participant';
import {
  getMatchByID,
  getMatchAttendance,
  deleteMatchCascade,
  updateMatch,
} from 'services/recim/match';
import MatchForm from 'views/RecIM/components/Forms/MatchForm';
import SettingsIcon from '@mui/icons-material/Settings';
import { standardDate } from 'views/RecIM/components/Helpers';
import GordonDialogBox from 'components/GordonDialogBox';
import defaultLogo from 'views/RecIM/recim_logo.png';
import EditMatchStatsForm from 'views/RecIM/components/Forms/EditMatchStatsForm';

const RosterCard = ({
  participants,
  teamName,
  withAttendance = false,
  attendance,
  isAdmin,
  matchID,
  teamID,
}) => (
  <Card>
    <CardHeader title={teamName ?? 'No team yet...'} className={styles.cardHeader} />
    <CardContent>
      <ParticipantList
        participants={participants}
        withAttendance={withAttendance}
        attendance={attendance}
        isAdmin={isAdmin}
        matchID={matchID}
        teamID={teamID}
      />
    </CardContent>
  </Card>
);

const Match = () => {
  const navigate = useNavigate();
  const { matchID } = useParams();
  const { profile } = useUser();
  const [match, setMatch] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [team0Score, setTeam0Score] = useState(0);
  const [team1Score, setTeam1Score] = useState(0);
  const [openMatchInformationForm, setOpenMatchInformationForm] = useState(false);
  const [openEditMatchStatsForm, setOpenEditMatchStatsForm] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [user, setUser] = useState();
  const [matchAttendance, setMatchAttendance] = useState();
  const [matchName, setMatchName] = useState();
  const [anchorEl, setAnchorEl] = useState();
  const [currentWinner, setCurrentWinner] = useState();
  const openMenu = Boolean(anchorEl);
  const isMultiTeamMatch = match?.Scores.length > 2;

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);
  useEffect(() => {
    const loadData = async () => {
      if (profile) {
        setUser(await getParticipantByUsername(profile.AD_Username));
      }
    };
    loadData();
  }, [profile]);

  useEffect(() => {
    if (!isMultiTeamMatch) {
      const assignMatchScores = async () => {
        setTeam0Score(
          match.Scores.find((team) => team.TeamID === match.Team[0]?.ID)?.TeamScore ?? 0,
        );
        setTeam1Score(
          match.Scores.find((team) => team.TeamID === match.Team[1]?.ID)?.TeamScore ?? 0,
        );
      };
      setMatchName(`${match?.Team[0]?.Name ?? 'TBD'} vs ${match?.Team[1]?.Name ?? 'TBD'}`);
      assignMatchScores();
    }

    if (match?.Scores.length > 0) {
      let winnerID = match.Scores.sort((a, b) => {
        let x = a['TeamScore'];
        let y = b['TeamScore'];
        return x > y ? -1 : 1;
      })[0].TeamID;
      let winner = match.Team.find((t) => t.ID === winnerID);
      setCurrentWinner(winner);
    }
  }, [match]);

  useEffect(() => {
    const loadMatch = async () => {
      setLoading(true);
      setMatch(await getMatchByID(matchID));
      setMatchAttendance(await getMatchAttendance(matchID));
      setLoading(false);
    };
    loadMatch();
  }, [matchID, reload]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleDelete = async () => {
    await deleteMatchCascade(matchID);
    setOpenConfirmDelete(false);
    navigate(`/recim/activity/${match.Activity.ID}`);
    // @TODO add snackbar
  };

  const handleMatchCompletedShortcut = async () => {
    if (match) {
      if (match.Status === 'Completed')
        await updateMatch(match.ID, { StatusID: 2 }); //confirmed (no memory of previous)
      else await updateMatch(match.ID, { StatusID: 6 }); //completed
      setReload((prev) => !prev);
    }
  };

  if (loading && !profile) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthenticated feature={'the Rec-IM page'} />;
  } else {
    let headerContents = (
      <Grid container direction="column" className={styles.header}>
        {/* match time/location */}
        <Grid item container spacing={4}>
          <Grid item xs={6} textAlign="right">
            <Typography className={styles.subtitle}>
              {match && standardDate(match.StartTime, true)}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="left">
            <Typography className={styles.subtitle}>@{match?.Surface}</Typography>
          </Grid>
        </Grid>
        {!isMultiTeamMatch ? (
          <Grid
            item
            container
            alignItems="center"
            justifyContent="space-around"
            spacing={1}
            flexWrap="nowrap"
          >
            {/* left team info */}
            <Grid
              item
              container
              xs={5}
              columnSpacing={2}
              justifyContent="space-around"
              className={`${styles.teamInfo} ${styles.teamInfoLeft}`}
            >
              <Grid item sm={4} lg="auto" className={styles.headerImgContainer}>
                <img
                  src={match?.Team.find((t) => t.ID === match?.Team[0]?.ID)?.Logo ?? defaultLogo}
                  alt="Team Icon"
                  className={styles.headerImg}
                ></img>
              </Grid>
              <Grid item sm={8} lg="auto">
                <LinkRouter to={`/recim/activity/${match?.Activity.ID}/team/${match?.Team[0]?.ID}`}>
                  <Typography
                    variant="h5"
                    className={`${styles.teamName} gc360_text_link ${
                      team0Score > team1Score && match?.Status === 'Completed' && styles.matchWinner
                    }`}
                  >
                    {match?.Team[0]?.Name ?? 'No team yet...'}
                  </Typography>
                </LinkRouter>
                <Typography className={styles.subtitle}>
                  {match?.Team[0]?.TeamRecord.WinCount ?? 0}W :{' '}
                  {match?.Team[0]?.TeamRecord.LossCount ?? 0}L
                </Typography>
                {user?.IsAdmin && (
                  <i className={styles.subtitle}>
                    Sportsmanship: {match?.Scores[0]?.SportsmanshipScore}
                  </i>
                )}
              </Grid>
            </Grid>

            <Grid item container xs={2} alignItems="center" direction="column" sx={{ mt: 3 }}>
              {match?.Status === 'Completed' && (
                <Grid item>
                  <Typography className={styles.subtitle}>Final</Typography>
                </Grid>
              )}
              <Grid item>
                <Typography variant="h5" className={styles.matchScore}>
                  {team0Score} : {team1Score}
                </Typography>
              </Grid>
              {/* admin controls */}
              {user?.IsAdmin && (
                <Grid item>
                  <IconButton
                    onClick={handleSettingsClick}
                    sx={
                      openMenu && {
                        animation: 'spin 0.2s linear ',
                        '@keyframes spin': {
                          '0%': {
                            transform: 'rotate(0deg)',
                          },
                          '100%': {
                            transform: 'rotate(120deg)',
                          },
                        },
                      }
                    }
                  >
                    <SettingsIcon fontSize="large" />
                  </IconButton>
                </Grid>
              )}
            </Grid>

            {/* right team info */}
            <Grid
              item
              container
              xs={5}
              columnSpacing={2}
              justifyContent="space-around"
              className={`${styles.teamInfo} ${styles.teamInfoRight}`}
            >
              <Grid item sm={8} lg="auto">
                <LinkRouter to={`/recim/activity/${match?.Activity.ID}/team/${match?.Team[1]?.ID}`}>
                  <Typography
                    variant="h5"
                    className={`${styles.teamName} gc360_text_link ${
                      team1Score > team0Score && match?.Status === 'Completed' && styles.matchWinner
                    }`}
                  >
                    {match?.Team[1]?.Name ?? 'No team yet...'}
                  </Typography>
                </LinkRouter>
                <Typography className={styles.subtitle}>
                  {match?.Team[1]?.TeamRecord.WinCount ?? 0}W :{' '}
                  {match?.Team[1]?.TeamRecord.LossCount ?? 0}L
                </Typography>
                {user?.IsAdmin && (
                  <i className={styles.subtitle}>
                    Sportsmanship: {match?.Scores[1]?.SportsmanshipScore}
                  </i>
                )}
              </Grid>
              <Grid item sm={4} lg="auto" className={styles.headerImgContainer}>
                <img
                  src={match?.Team.find((t) => t.ID === match?.Team[1]?.ID)?.Logo ?? defaultLogo}
                  alt="Team Icon"
                  className={styles.headerImg}
                ></img>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid
            item
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            flexWrap="nowrap"
          >
            {/**
             * MULTI TEAM MATCH HEADER
             */}
            <Grid
              item
              container
              xs={4}
              sm={5}
              columnSpacing={2}
              className={`${styles.teamInfo} ${styles.teamInfoRight}`}
            >
              <Grid item className={styles.headerImgContainer}>
                <img
                  src={
                    (match?.Status === 'Completed' ? currentWinner?.Logo : match?.Activity.Logo) ??
                    defaultLogo
                  }
                  alt="Icon"
                  className={styles.headerImg}
                ></img>
              </Grid>
              {match?.Status !== 'Completed' && (
                <Grid direction="column" item>
                  <LinkRouter to={`/recim/activity/${match?.Activity.ID}`}>
                    <Typography variant="h5" className={`${styles.teamName} gc360_text_link`}>
                      {match?.Activity.Name}
                    </Typography>
                  </LinkRouter>
                  <Typography
                    variant="subtitle"
                    className={`${styles.teamName} ${styles.grayText}`}
                  >
                    {match?.Series.Name}
                  </Typography>
                </Grid>
              )}
            </Grid>

            {match?.Status === 'Completed' && (
              <Grid item container xs={3} alignItems="center" direction="column" sx={{ mt: 3 }}>
                <Grid item>
                  <Typography className={styles.subtitle}>Final</Typography>
                </Grid>

                <Grid item textAlign="center">
                  <Typography variant="h5" className={styles.multiTeamWinner}>
                    Winner
                  </Typography>
                  <LinkRouter
                    to={`/recim/activity/${match?.Activity.ID}/team/${currentWinner?.ID}`}
                  >
                    <Typography variant="h5" className={`${styles.matchScore} gc360_text_link`}>
                      {currentWinner?.Name}
                    </Typography>
                  </LinkRouter>
                </Grid>
              </Grid>
            )}

            <Grid item xs={5} textAlign={'right'}>
              <IconButton onClick={handleSettingsClick} sx={{ mr: '1rem' }}>
                <SettingsIcon
                  fontSize="large"
                  sx={
                    openMenu && {
                      animation: 'spin 0.2s linear ',
                      '@keyframes spin': {
                        '0%': {
                          transform: 'rotate(0deg)',
                        },
                        '100%': {
                          transform: 'rotate(120deg)',
                        },
                      },
                    }
                  }
                />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
    );

    if (loading) return <GordonLoader />;

    return (
      <>
        <Header match={match}>{headerContents}</Header>
        <Grid container spacing={2}>
          {!isMultiTeamMatch && (
            <Grid item xs={12} md={6}>
              <RosterCard
                participants={match.Team[0]?.Participant}
                teamName={match.Team[0]?.Name}
                withAttendance
                attendance={
                  matchAttendance?.find((item) => item.TeamID === match.Team[0]?.ID)?.Attendance
                }
                isAdmin={user?.IsAdmin}
                matchID={match.ID}
                teamID={match.Team[0]?.ID}
              />
              <Card sx={{ marginTop: 1 }}>
                <CardHeader title="Past Matches" className={styles.cardHeader} />
                <CardContent>
                  <MatchHistoryList
                    matches={
                      match?.Team.find((item) => item.ID === match.Team[0]?.ID)?.MatchHistory
                    }
                    activityID={match.Activity.ID}
                  />
                </CardContent>
              </Card>
            </Grid>
          )}
          {!isMultiTeamMatch && (
            <Grid item xs={12} md={6}>
              <RosterCard
                participants={match.Team[1]?.Participant}
                teamName={match.Team[1]?.Name}
                withAttendance
                attendance={
                  matchAttendance?.find((item) => item.TeamID === match.Team[1]?.ID)?.Attendance
                }
                isAdmin={user?.IsAdmin}
                matchID={match.ID}
                teamID={match.Team[1]?.ID}
              />
              <Card sx={{ marginTop: 1 }}>
                <CardHeader title="Past Matches" className={styles.cardHeader} />
                <CardContent>
                  <MatchHistoryList
                    matches={
                      match?.Team.find((item) => item.ID === match.Team[1]?.ID)?.MatchHistory
                    }
                    activityID={match.Activity.ID}
                  />
                </CardContent>
              </Card>
            </Grid>
          )}
          {isMultiTeamMatch && (
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Teams" className={styles.cardHeader} />
                <CardContent>
                  <ExpandableTeamList
                    teams={match?.Team}
                    teamScores={match?.Scores}
                    attendance={matchAttendance}
                    activityID={match.Activity.ID}
                    isAdmin={user?.IsAdmin}
                  />
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* forms and dialogs */}
          <Menu open={openMenu} onClose={handleClose} anchorEl={anchorEl}>
            <Typography className={styles.menuTitle}>Admin Settings</Typography>
            <MenuItem
              className={styles.greenMenuButton}
              dense
              disabled={match.Scores.length === 0}
              onClick={() => {
                setAnchorEl(null);
                handleMatchCompletedShortcut();
              }}
            >
              Mark as {match?.Status === 'Completed' ? 'Confirmed' : 'Completed'}
            </MenuItem>
            <MenuItem
              className={styles.menuButton}
              dense
              disabled={match.Scores.length === 0 || match.Status === 'Completed'}
              onClick={() => {
                setAnchorEl(null);
                setOpenEditMatchStatsForm(true);
              }}
            >
              Edit Match Stats
            </MenuItem>
            <MenuItem
              className={styles.menuButton}
              dense
              disabled={match.Status === 'Completed'}
              onClick={() => {
                setAnchorEl(null);
                setOpenMatchInformationForm(true);
              }}
            >
              Edit Match Information
            </MenuItem>
            <MenuItem
              dense
              className={styles.redButton}
              onClick={() => {
                setAnchorEl(null);
                setOpenConfirmDelete(true);
              }}
            >
              Delete Match
            </MenuItem>
          </Menu>
          <MatchForm
            createSnackbar={createSnackbar}
            onClose={() => setReload((prev) => !prev)}
            openMatchInformationForm={openMatchInformationForm}
            setOpenMatchInformationForm={(bool) => setOpenMatchInformationForm(bool)}
            match={match}
          />

          {match.Scores.length !== 0 && (
            <EditMatchStatsForm
              match={match}
              setMatch={setMatch}
              onClose={() => {
                setAnchorEl(null);
                setReload((prev) => !prev);
              }}
              createSnackbar={createSnackbar}
              openEditMatchStatsForm={openEditMatchStatsForm}
              setOpenEditMatchStatsForm={setOpenEditMatchStatsForm}
            />
          )}
          <GordonDialogBox
            title="Confirm Delete"
            open={openConfirmDelete}
            cancelButtonClicked={() => setOpenConfirmDelete(false)}
            cancelButtonName="No, keep this match"
            buttonName="Yes, delete this match"
            buttonClicked={() => handleDelete()}
            severity="error"
          >
            <br />
            <Typography variant="body1">
              Are you sure you want to permanently delete this match: '{matchName}'?
            </Typography>
            <Typography variant="body1">This action cannot be undone.</Typography>
          </GordonDialogBox>
        </Grid>
        <GordonSnackbar
          open={snackbar.open}
          text={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        />
      </>
    );
  }
};

export default Match;
