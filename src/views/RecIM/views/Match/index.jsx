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
import { useState, useEffect } from 'react';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import Header from '../../components/Header';
import styles from './Match.module.css';
import { ParticipantList } from './../../components/List';
import { getParticipantByUsername } from 'services/recim/participant';
import { getMatchByID, getMatchAttendance, deleteMatchCascade } from 'services/recim/match';
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
  const [team0Score, setTeam0Score] = useState(0);
  const [team1Score, setTeam1Score] = useState(0);
  const [openMatchInformationForm, setOpenMatchInformationForm] = useState(false);
  const [openEditMatchStatsForm, setOpenEditMatchStatsForm] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [user, setUser] = useState();
  const [matchAttendance, setMatchAttendance] = useState();
  const [matchName, setMatchName] = useState();
  const [anchorEl, setAnchorEl] = useState();
  const openMenu = Boolean(anchorEl);
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
      setMatchAttendance(await getMatchAttendance(matchID));
      setLoading(false);
    };
    loadMatch();
  }, [matchID, openMatchInformationForm, openEditMatchStatsForm]);
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
      setMatchName(`${match?.Team[0]?.Name ?? 'TBD'} vs ${match?.Team[1]?.Name ?? 'TBD'}`);
      assignMatchScores();
    }
  }, [match]);

  const handleFormSubmit = (status, setOpenForm) => {
    setOpenForm(false);
  };

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
      </Grid>
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
                withAttendance
                attendance={
                  matchAttendance?.find((item) => item.TeamID === match.Team[0]?.ID)?.Attendance
                }
                isAdmin={user?.IsAdmin}
                matchID={match.ID}
                teamID={match.Team[0]?.ID}
              />
            </Grid>
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
            </Grid>

            {/* forms and dialogs */}
            <Menu open={openMenu} onClose={handleClose} anchorEl={anchorEl}>
              <Typography className={styles.menuTitle}>Admin Settings</Typography>
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
              closeWithSnackbar={(status) => {
                handleFormSubmit(status, setOpenMatchInformationForm);
              }}
              openMatchInformationForm={openMatchInformationForm}
              setOpenMatchInformationForm={(bool) => setOpenMatchInformationForm(bool)}
              match={match}
            />
            {match.Scores.length !== 0 && (
              <EditMatchStatsForm
                match={match}
                setMatch={setMatch}
                closeWithSnackbar={(status) => {
                  handleFormSubmit(status, setOpenEditMatchStatsForm);
                }}
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
        )}
      </>
    );
  }
};

export default Match;
