import {
  Grid,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import styles from './Listing.module.css';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import user from 'services/user';
import { isPast } from 'date-fns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { editTeamParticipant, respondToTeamInvite } from 'services/recim/team';
import { isActivityRegisterable } from 'services/recim/activity';
import { removeAttendance, updateAttendance } from 'services/recim/match';
import { getParticipantAttendanceCountForTeam } from 'services/recim/team';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { standardDate, formatDateTimeRange } from '../../Helpers';
import defaultLogo from 'views/RecIM/recim_logo.png';

const activityTypeIconPair = [
  {
    type: 'League',
    icon: <SportsFootballIcon />,
  },
  {
    type: 'Tournament',
    icon: <SportsCricketIcon />,
  },
  {
    type: 'One Off',
    icon: <LocalActivityIcon />,
  },
];

const ActivityListing = ({ activity }) => {
  let activeSeries = activity.Series.find((series) => isPast(Date.parse(series.StartDate)));
  let activeSeriesMessage =
    activeSeries && activeSeries.Name + ' until ' + standardDate(activeSeries.EndDate);

  if (!activity) return null;
  return (
    <ListItem key={activity.ID} className={styles.listingWrapper}>
      <ListItemButton
        component={Link}
        to={`/recim/activity/${activity.ID}`}
        className={styles.listing}
      >
        <Grid container columnSpacing={2} alignItems="center">
          <Grid item container direction="column" xs={12} sm={4} spacing={1}>
            <Grid item>
              <Typography className={styles.listingTitle}>{activity.Name}</Typography>
            </Grid>
            <Grid item>
              <Chip
                icon={activityTypeIconPair.find((type) => type.type === activity.Type)?.icon}
                label={activity.Type}
                color={'success'}
                className={
                  styles['activityType_' + activity?.Type.toLowerCase().replace(/\s+/g, '')]
                }
                size="small"
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} sm={7} direction="column" spacing={1}>
            {activity.StartDate && (
              <Grid item>
                <Typography sx={{ color: 'gray', fontWeight: 'bold' }}>
                  {activity.EndDate
                    ? formatDateTimeRange(activity.StartDate, activity.EndDate)
                    : standardDate(activity.StartDate) + ` - TBD`}
                </Typography>
              </Grid>
            )}
            <Grid item container columnSpacing={2}>
              {activity.RegistrationOpen && (
                <Grid item>
                  <Chip
                    icon={<EventAvailableIcon />}
                    label={'Registration Open'}
                    color={'success'}
                    size="small"
                  />
                </Grid>
              )}
              <Grid item>
                <Typography className={styles.listingSubtitle}>
                  {activity.RegistrationOpen
                    ? 'Registration closes ' + standardDate(activity.RegistrationEnd)
                    : activeSeriesMessage}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

const ExpandableTeamListing = ({ team, teamScore, attendance }) => {
  const log = () => {
    console.log('');
    console.log(team);
    console.log(teamScore);
    console.log(attendance);
    console.log('');
  };
  console.log(team);

  let content = (
    <ListItem>
      <Typography className={styles.listingTitle} paddingRight={2}>
        #{team.Ranking}
      </Typography>
      <ListItemAvatar>
        <Avatar src={team.Logo ?? defaultLogo} className={styles.teamLogo}></Avatar>
      </ListItemAvatar>
      <Grid container columnSpacing={0}>
        <Grid item xs={8}>
          <Link to={`/recim/activity/${team.ActivityID}/team/${team.ID}`}>
            <Typography className={`${styles.listingTitle} gc360_text_link`}>
              {team.Name}
            </Typography>
          </Link>
        </Grid>
        <Grid item container direction="row" textAlign="right" justifyContent="space-evenly" xs={4}>
          <Grid item xs={9}>
            <Typography>Score: </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={styles.listingTitle}>{teamScore.TeamScore}</Typography>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={6}>
            <Typography className={styles.listingSubtitle}>
              Sportsmanship: {teamScore.SportsmanshipScore}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
  return (
    <Accordion disableGutters className={styles.listingWrapper}>
      <AccordionSummary
        justifyContent="center"
        alignItems="center"
        expandIcon={<ExpandMoreIcon />}
        //sx={{ padding: 0 }}
      >
        {/* <ListItem
          key={team.ID}
          //className={styles.listingWrapper}
        > */}
        {content}
        {/* </ListItem> */}
      </AccordionSummary>

      <AccordionDetails>participant list</AccordionDetails>
    </Accordion>
  );
};

const TeamListing = ({ team, invite, match, setTargetTeamID, callbackFunction }) => {
  if (!team && !match) return null;

  const handleAcceptInvite = () => {
    callbackFunction('accepted', team.Activity.ID, team.ID);
  };

  const handleRejectInvite = () => {
    callbackFunction('rejected', team.Activity.ID, team.ID);
  };

  let content;
  if (match) {
    let targetTeamStats = match.Scores.find((score) => score.TeamID === team.ID);
    content = (
      <ListItemButton onClick={() => setTargetTeamID(team.ID)}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12}>
            <Typography className={styles.listingSubtitle}>Name: </Typography>
            <Typography className={styles.listingTitle}>{team.Name}</Typography>
          </Grid>

          <Grid item container>
            <Grid item xs={6}>
              <Typography className={styles.listingSubtitle}>
                Score: {targetTeamStats.TeamScore}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={styles.listingSubtitle}>
                Status: {targetTeamStats.Status}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={styles.listingSubtitle}>
                Sportsmanship: {targetTeamStats.SportsmanshipScore}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </ListItemButton>
    );
  } else {
    let Record = {
      WinCount: 0,
      TieCount: 0,
      LossCount: 0,
    };

    team.TeamRecord?.forEach((record) => {
      Record.WinCount += record.WinCount;
      Record.TieCount += record.TieCount;
      Record.LossCount += record.LossCount;
    });
    content = (
      <Grid container direction="row" justifyContent="center">
        <Grid item xs={12}>
          <ListItemButton
            component={Link}
            to={`/recim/activity/${team.Activity.ID}/team/${team.ID}`}
            className={styles.listing}
          >
            <ListItemAvatar>
              <Avatar src={team.Logo ?? defaultLogo} className={styles.teamLogo}></Avatar>
            </ListItemAvatar>
            <Grid container direction="row" spacing={2}>
              <Grid container item columnSpacing={2}>
                <Grid container item xs={7.5} sm={6}>
                  <Typography className={styles.listingTitle}>{team.Name}</Typography>
                </Grid>
                <Grid
                  item
                  xs={4.5}
                  sm={6}
                  container
                  className={styles.rightAlignLarge}
                  direction="row"
                  spacing={1}
                >
                  {invite && (
                    <Grid item>
                      <IconButton className={styles.acceptIcon} onClick={handleAcceptInvite}>
                        <CheckIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {invite && (
                    <Grid item>
                      <IconButton
                        className={styles.rejectIcon}
                        onClick={(e) => {
                          // the next two lines prevent parent from redirecting while executing handleRejectInvite()
                          e.stopPropagation();
                          e.preventDefault();
                          handleRejectInvite();
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {team.TeamRecord && !invite && (
                    <Grid item>
                      <Typography className={styles.listingSubtitle}>
                        {Record.WinCount}W : {Record.TieCount}T : {Record.LossCount}L
                      </Typography>
                      <Typography className={styles.listingSubtitle_small}>
                        Sportsmanship:{' '}
                        {team.TeamRecord[0]?.SportsmanshipRating ?? team.SportsmanshipRating}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography className={styles.listingSubtitle_small}>
                    {team.Activity?.Name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </ListItemButton>
        </Grid>
      </Grid>
    );
  }
  return (
    <ListItem key={team.ID} className={styles.listingWrapper}>
      {content}
    </ListItem>
  );
};

const ParticipantListing = ({
  participant,
  minimal,
  callbackFunction,
  showParticipantOptions,
  isAdminPage,
  editParticipantInfo,
  withAttendance,
  isAdmin,
  initialAttendance,
  teamID,
  matchID,
  makeNewCaptain,
}) => {
  const { teamID: teamIDParam, activityID } = useParams(); // for use by team page roster
  const [avatar, setAvatar] = useState();
  const [anchorEl, setAnchorEl] = useState();
  const [anchorCustomParticipantEl, setAnchorCustomParticipantEl] = useState();
  const moreOptionsOpen = Boolean(anchorEl);
  const moreOptionsCustomParticipantOpen = Boolean(anchorCustomParticipantEl);
  const [didAttend, setDidAttend] = useState(initialAttendance != null);
  const [attendanceCount, setAttendanceCount] = useState();
  const [fullName, setFullName] = useState('');

  const handleClickOff = () => {
    setAnchorEl(null);
    setAnchorCustomParticipantEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorCustomParticipantEl(null);
    callbackFunction((val) => !val);
  };

  useEffect(() => {
    const loadData = async () => {
      if (participant.Username) {
        if (!participant.IsCustom) {
          //gordon participant
          const { def: defaultImage, pref: preferredImage } = await user.getImage(
            participant.Username,
          );
          setAvatar(preferredImage || defaultImage);
          const userInfo = await user.getProfileInfo(participant.Username);
          setFullName(userInfo.fullName);
        } else {
          //non-gordon participant
          setFullName(`${participant.FirstName} ${participant.LastName}`);
        }
      }
    };

    const loadAttendanceCount = async () => {
      setAttendanceCount(await getParticipantAttendanceCountForTeam(teamID, participant.Username));
    };
    loadData();
    if (teamID && withAttendance) loadAttendanceCount();
  }, [participant, teamID, withAttendance]);

  const handleCustomParticipantOptions = (event) => {
    setAnchorCustomParticipantEl(event.currentTarget);
  };

  const handleParticipantOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRemoveFromTeam = async () => {
    let isRegistrationPeriod = await isActivityRegisterable(activityID);
    if (isRegistrationPeriod) await handleDeleteFromTeam();
    else await handleMakeInactive();
  };

  const handleMakeCaptain = () => {
    makeNewCaptain(participant.Username);
    handleClose();
  };

  const reinstateMember = async () => {
    let editedParticipant = {
      Username: participant.Username,
      RoleTypeID: 3,
    }; // Role 3 is member
    await editTeamParticipant(teamIDParam, editedParticipant);
    handleClose();
  };

  const handleMakeInactive = async () => {
    let editedParticipant = {
      Username: participant.Username,
      RoleTypeID: 6,
    }; // Role 6 is inactive
    await editTeamParticipant(teamIDParam, editedParticipant);
    handleClose();
  };

  const handleDeleteFromTeam = async () => {
    let editedParticipant = {
      Username: participant.Username,
      RoleTypeID: 0,
    }; // deleted
    await editTeamParticipant(teamIDParam, editedParticipant);
    handleClose();
  };

  const handleAttendance = async (attended) => {
    setDidAttend(attended);
    let att = {
      teamID: teamID,
      username: participant.Username,
    };
    attended ? await updateAttendance(matchID, att) : await removeAttendance(matchID, att);
  };

  const participantDetails = () => {
    return (
      <>
        <ListItemAvatar>
          <Avatar
            src={`data:image/jpg;base64,${avatar}`}
            className={minimal ? styles.avatarSmall : styles.avatar}
            variant="rounded"
          ></Avatar>
        </ListItemAvatar>
        <ListItemText primary={fullName} secondary={participant.Role} />
      </>
    );
  };

  if (!participant) return null;
  return (
    // first ListItem is used only for paddings/margins
    // second ListItem (nested inside) is used to layout avatar and secondaryAction
    <ListItem key={participant.Username} className={styles.listingWrapper}>
      <ListItem
        secondaryAction={
          <>
            {isAdminPage && participant.IsCustom && (
              <IconButton edge="end" onClick={handleCustomParticipantOptions}>
                <MoreHorizIcon />
              </IconButton>
            )}
            {minimal && (
              <IconButton edge="end" onClick={() => callbackFunction(participant.Username)}>
                <ClearIcon />
              </IconButton>
            )}
            {showParticipantOptions && (
              <IconButton edge="end" onClick={handleParticipantOptions}>
                <MoreHorizIcon />
              </IconButton>
            )}
            {withAttendance && (
              <>
                {isAdmin && (
                  <Typography className={styles.listingSubtitle}>
                    attended {attendanceCount} match{attendanceCount !== 1 && `es`}
                  </Typography>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      inputProps={{ 'aria-label': 'attendance toggle' }}
                      defaultChecked={initialAttendance}
                      onChange={(event) => handleAttendance(event.target.checked)}
                      disabled={!isAdmin}
                    />
                  }
                  label={didAttend ? 'Present' : <i>Absent</i>}
                  labelPlacement="start"
                  className={!didAttend && styles.listingSubtitle}
                />
              </>
            )}
          </>
        }
        disablePadding
      >
        {participant.IsCustom ? (
          <ListItem
            className={`${styles.listing} ${
              withAttendance && (didAttend ? styles.attendedListing : styles.absentListing)
            }`}
          >
            {participantDetails()}
          </ListItem>
        ) : (
          <ListItemButton
            to={`/profile/${participant.Username}`}
            className={`${styles.listing} ${
              withAttendance && (didAttend ? styles.attendedListing : styles.absentListing)
            }`}
          >
            {participantDetails(participant)}
          </ListItemButton>
        )}
        {showParticipantOptions && (
          <Menu open={moreOptionsOpen} onClose={handleClickOff} anchorEl={anchorEl}>
            {participant.Role !== 'Inactive' && participant.Role !== 'Co-Captain' && (
              <MenuItem dense onClick={handleMakeCaptain} divider>
                Make new Captain
              </MenuItem>
            )}
            {(participant.Role === 'Inactive' || participant.Role === 'Co-Captain') && (
              <MenuItem dense onClick={reinstateMember}>
                {participant.Role === 'Inactive' ? `Reinstate Member` : `Demote to Member`}
              </MenuItem>
            )}
            {participant.Role !== 'Inactive' && (
              <MenuItem dense onClick={handleRemoveFromTeam} className={styles.redButton}>
                Remove from team
              </MenuItem>
            )}
          </Menu>
        )}
        {isAdminPage && participant.IsCustom && (
          <Menu
            open={moreOptionsCustomParticipantOpen}
            onClose={handleClickOff}
            anchorEl={anchorCustomParticipantEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem
              dense
              onClick={() => {
                editParticipantInfo(participant);
                setAnchorCustomParticipantEl(null);
              }}
              divider
            >
              Edit Participant Information
            </MenuItem>
          </Menu>
        )}
      </ListItem>
    </ListItem>
  );
};

// compacted match listing
const MatchHistoryListing = ({ match, activityID }) => {
  if (!match) return null;
  const ownScore = match.TeamScore;
  const oppScore = match.OpposingTeamScore;
  return (
    <ListItem key={match.MatchID} className={styles.listingWrapper}>
      <ListItemButton
        component={Link}
        to={`/recim/activity/${activityID}/match/${match.MatchID}`}
        // sx={{ borderRadius: '0.5em' }}
        className={
          ownScore > oppScore
            ? styles.matchHistoryListing_winner
            : ownScore < oppScore
            ? styles.matchHistoryListing_loser
            : styles.matchHistoryListing
        }
      >
        <Grid container alignItems="center">
          <Grid item xs={2} textAlign="center">
            <Typography>
              {ownScore} : {oppScore}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>vs.</Typography>
          </Grid>
          <Grid item xs={2.8}>
            <img
              src={match.Opponent?.Logo ?? defaultLogo}
              alt="Team Icon"
              className={styles.teamHistoryLogo}
            ></img>
          </Grid>
          <Grid item xs={4.2}>
            <Typography>{match.Opponent.Name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={styles.listingSubtitle}>
              {standardDate(match.MatchStartTime, true)}
            </Typography>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

const MatchListing = ({ match, activityID }) => {
  if (!match) return null;
  if (match.Team?.length === 2) {
    const team0Score = match.Scores?.find(
      (matchTeam) => matchTeam.TeamID === match.Team[0]?.ID,
    )?.TeamScore;
    const team1Score = match.Scores?.find(
      (matchTeam) => matchTeam.TeamID === match.Team[1]?.ID,
    )?.TeamScore;
    return (
      <ListItem key={match.ID} className={styles.listingWrapper}>
        <ListItemButton
          component={Link}
          to={`/recim/activity/${activityID}/match/${match.ID}`}
          className={styles.listing}
        >
          <Grid container direction="column" alignItems="center">
            {match.Status === 'Completed' && (
              <Grid xs={12} item>
                <Typography className={styles.listingSubtitle}>Final</Typography>
              </Grid>
            )}
            <Grid item container>
              <Grid item xs={4.5}>
                <Typography className={team0Score > team1Score && styles.matchWinner}>
                  {match.Team[0]?.Name ?? <i>TBD</i>}
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="center">
                {/* show scores only if match is completed*/}
                {match.Status === 'Completed' ? (
                  <Grid container direction="row">
                    <Grid item xs={5} textAlign="right">
                      <Typography sx={team0Score > team1Score && { fontWeight: 'bold' }}>
                        {team0Score ?? 'TBD'}
                      </Typography>
                    </Grid>

                    <Grid item xs={2}>
                      <Typography>{':'}</Typography>{' '}
                    </Grid>

                    <Grid item xs={5} textAlign="left">
                      <Typography sx={team1Score > team0Score && { fontWeight: 'bold' }}>
                        {team1Score ?? 'TBD'}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : match.Status === 'Forfeited' ? (
                  <Typography className={styles.listingSubtitle}>Forfeited</Typography>
                ) : (
                  <Typography>vs.</Typography>
                )}
              </Grid>
              <Grid item xs={4.5} textAlign="right">
                <Typography className={team1Score > team0Score && styles.matchWinner}>
                  {match.Team[1]?.Name ?? <i>TBD</i>}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography className={styles.listingSubtitle}>{match.Surface}</Typography>
            </Grid>
            <Grid item>
              <Typography className={styles.listingSubtitle}>
                {standardDate(match.StartTime, true)}
              </Typography>
            </Grid>
          </Grid>
        </ListItemButton>
      </ListItem>
    );
  }
  // ladder matches (or any match with more/less than two teams)
  return (
    <ListItem key={match.ID} className={styles.listingWrapper}>
      <ListItemButton
        component={Link}
        to={`/recim/activity/${activityID}/match/${match.ID}`}
        className={styles.listing}
      >
        <Grid container>
          <Grid item container direction="column" xs={6}>
            <Grid item>
              <Typography className={styles.listingSubtitle}>{match.Surface}</Typography>
            </Grid>
            <Grid item>
              <Typography className={styles.listingSubtitle}>
                {standardDate(match.StartTime, true)}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={6}>
            {!match.Team?.length && <Typography>No teams yet placed in this match.</Typography>}
            {match.Team.map((team) => (
              <Grid item container>
                <Grid item xs={10}>
                  <Typography className={styles.listingTitle}>{team.Name}</Typography>
                </Grid>
                <Grid item xs={2}>
                  {/* show scores only if match is completed*/}
                  {match.Status === 'Completed' ? (
                    <Typography>
                      {match.Scores?.find((matchTeam) => matchTeam.TeamID === team.ID)?.TeamScore ??
                        0}
                    </Typography>
                  ) : (
                    <Typography>vs.</Typography>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

const SportListing = ({ sport, confirmDelete, editDetails }) => {
  const [anchorEl, setAnchorEl] = useState();
  const optionsOpen = Boolean(anchorEl);

  if (!sport) return null;

  const handleOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <ListItem key={sport.ID} className={styles.listingWrapper}>
      <ListItem
        className={styles.listing}
        secondaryAction={
          <IconButton edge="end" onClick={handleOptions}>
            <MoreHorizIcon />
          </IconButton>
        }
      >
        <Grid container direction="row">
          <Grid item container direction="column" xs={6}>
            <ListItemText>{sport.Name}</ListItemText>
            <Typography className={styles.listingSubtitle}>{sport.Description}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={styles.listingAdditionalInfo}>
              <b>Rules: </b>
              {sport.Rules}
            </Typography>
          </Grid>
        </Grid>
        <Menu
          open={optionsOpen}
          onClose={() => setAnchorEl()}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem
            dense
            onClick={() => {
              editDetails(sport);
              setAnchorEl(null);
            }}
            divider
          >
            Edit details
          </MenuItem>
          <MenuItem
            dense
            onClick={() => {
              confirmDelete(sport);
              setAnchorEl(null);
            }}
            className={styles.redButton}
          >
            Delete sport
          </MenuItem>
        </Menu>
      </ListItem>
    </ListItem>
  );
};

const SurfaceListing = ({ surface, confirmDelete, editDetails }) => {
  const [anchorEl, setAnchorEl] = useState();
  const optionsOpen = Boolean(anchorEl);

  if (!surface) return null;

  const handleOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <ListItem key={surface.ID} className={styles.listingWrapper}>
      <ListItem
        className={styles.listing}
        secondaryAction={
          <IconButton edge="end" onClick={handleOptions}>
            <MoreHorizIcon />
          </IconButton>
        }
      >
        <Grid container direction="column">
          <ListItemText>{surface.Name}</ListItemText>
          <Typography className={styles.listingSubtitle}>{surface.Description}</Typography>
        </Grid>
        <Menu
          open={optionsOpen}
          onClose={() => setAnchorEl()}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem
            dense
            onClick={() => {
              editDetails(surface);
              setAnchorEl(null);
            }}
            divider
          >
            Edit details
          </MenuItem>
          <MenuItem
            dense
            onClick={() => {
              confirmDelete(surface);
              setAnchorEl(null);
            }}
            className={styles.redButton}
          >
            Delete surface
          </MenuItem>
        </Menu>
      </ListItem>
    </ListItem>
  );
};

export {
  ActivityListing,
  ExpandableTeamListing,
  TeamListing,
  ParticipantListing,
  MatchListing,
  MatchHistoryListing,
  SurfaceListing,
  SportListing,
};
