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
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonSnackbar from 'components/Snackbar';
import Header from '../../components/Header';
import styles from './Match.module.css';
import { ParticipantList } from './../../components/List';
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

const TeamInfo = ({ team, activityID, sportsmanshipScore, isWinner, isLeft, isAdmin }) => {
  return (
    <Grid
      item
      container
      xs={5}
      columnSpacing={2}
      justifyContent="space-around"
      className={`${styles.teamInfo} ${isLeft ? styles.teamInfoLeft : styles.teamInfoRight}`}
    >
      <Grid item sm={4} lg="auto" className={styles.headerImgContainer}>
        <img src={team.Logo ?? defaultLogo} alt="Team Icon" className={styles.headerImg}></img>
      </Grid>
      <Grid item sm={8} lg="auto">
        <LinkRouter to={`/recim/activity/${activityID}/team/${team.ID}`}>
          <Typography
            variant="h5"
            className={`${styles.teamName} gc360_text_link ${isWinner && styles.matchWinner}`}
          >
            {team.Name ?? 'No team yet...'}
          </Typography>
        </LinkRouter>
        <Typography className={styles.subtitle}>
          {team.TeamRecord.WinCount ?? 0}W : {team.TeamRecord.LossCount ?? 0}L
        </Typography>
        {isAdmin && <i className={styles.subtitle}>Sportsmanship: {sportsmanshipScore}</i>}
      </Grid>
    </Grid>
  );
};

const Match = () => {
  const navigate = useNavigate();
  const { matchID } = useParams();
  const { profile } = useUser();
  const [match, setMatch] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [scores, setScores] = useState([]);
  const [sportsmanshipScores, setSportsmanshipScores] = useState([]);
  const [openMatchInformationForm, setOpenMatchInformationForm] = useState(false);
  const [openEditMatchStatsForm, setOpenEditMatchStatsForm] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [user, setUser] = useState();
  const [matchAttendance, setMatchAttendance] = useState();
  const [anchorEl, setAnchorEl] = useState();
  const openMenu = Boolean(anchorEl);

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
    if (match) {
      setScores(
        match.Team.map((matchTeam) => {
          return match.Scores.find((team) => team.TeamID === matchTeam.ID)?.TeamScore ?? 0;
        }),
      );
      setSportsmanshipScores(
        match.Team.map((matchTeam) => {
          return match.Scores.find((team) => team.TeamID === matchTeam.ID)?.SportsmanshipScore ?? 5;
        }),
      );
    }
  }, [match, reload]);

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
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
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

        {/* team info */}
        <Grid
          item
          container
          alignItems="center"
          justifyContent="space-around"
          spacing={1}
          flexWrap="wrap"
        >
          {/* left team info */}
          <TeamInfo
            team={match?.Team[0]}
            activityID={match?.Activity.ID}
            sportsmanshipScore={sportsmanshipScores[0]}
            isWinner={scores.every((score) => score > scores[0]) && match?.Status === 'Completed'}
            isLeft={true}
            isAdmin={user?.IsAdmin}
          />

          <Grid item container xs={2} alignItems="center" direction="column" sx={{ mt: 3 }}>
            {match?.Status === 'Completed' && (
              <Grid item>
                <Typography className={styles.subtitle}>Final</Typography>
              </Grid>
            )}
            <Grid item>
              <Typography variant="h5" className={styles.matchScore}>
                {scores[0]} : {scores[1]}
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
          <TeamInfo
            team={match?.Team[1]}
            activityID={match?.Activity.ID}
            sportsmanshipScore={sportsmanshipScores[1]}
            isWinner={scores.every((score) => score > scores[1]) && match?.Status === 'Completed'}
            isLeft={false}
            isAdmin={user?.IsAdmin}
          />

          {match.Team.slice(2, match.Team.length).map((team, index) => {
            return (
              <>
                <TeamInfo
                  team={team}
                  activityID={match?.Activity.ID}
                  sportsmanshipScore={sportsmanshipScores[index]}
                  isWinner={
                    scores.every((score) => score > scores[index]) && match?.Status === 'Completed'
                  }
                  isLeft={index % 2 === 0}
                  isAdmin={user?.IsAdmin}
                />
                {index % 2 === 0 ? <Grid item xs={2}></Grid> : null}
              </>
            );
          })}
        </Grid>
      </Grid>
    );

    return (
      <>
        <Header match={match}>{headerContents}</Header>
        {loading ? (
          <GordonLoader />
        ) : (
          <Grid container spacing={2}>
            {match.Team?.map((team) => (
              <Grid item xs={12} md={6}>
                <RosterCard
                  participants={team.Participant}
                  teamName={team.Name}
                  withAttendance
                  attendance={matchAttendance?.find((item) => item.TeamID === team.ID)?.Attendance}
                  isAdmin={user?.IsAdmin}
                  matchID={match.ID}
                  teamID={team.ID}
                />
              </Grid>
            ))}
            {/* forms and dialogs */}
            <Menu open={openMenu} onClose={handleClose} anchorEl={anchorEl}>
              <Typography className={styles.menuTitle}>Admin Settings</Typography>
              <MenuItem
                className={styles.greenMenuButton}
                dense
                disabled={match.Scores.length === 0}
                onClick={() => handleMatchCompletedShortcut()}
              >
                Mark as {match?.Status === 'Completed' ? 'Confirmed' : 'Completed'}
              </MenuItem>
              <MenuItem
                className={styles.menuButton}
                dense
                disabled={match.Scores.length === 0}
                onClick={() => {
                  setOpenEditMatchStatsForm(true);
                }}
              >
                Edit Match Stats
              </MenuItem>
              <MenuItem
                className={styles.menuButton}
                dense
                onClick={() => {
                  setOpenMatchInformationForm(true);
                }}
              >
                Edit Match Information
              </MenuItem>
              <MenuItem
                dense
                className={styles.redButton}
                onClick={() => {
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
                Are you sure you want to permanently delete this match: '
                {match.Team.length > 2
                  ? `Ladder Match`
                  : `${match?.Team[0]?.Name ?? 'TBD'} vs ${match?.Team[1]?.Name ?? 'TBD'}`}
                '?
              </Typography>
              <Typography variant="body1">This action cannot be undone.</Typography>
            </GordonDialogBox>
          </Grid>
        )}

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
