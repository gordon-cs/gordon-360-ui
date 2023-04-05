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
} from '@mui/material';
import styles from './Listing.module.css';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import user from 'services/user';
import { isPast } from 'date-fns';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { editTeamParticipant, respondToTeamInvite } from 'services/recim/team';
import { getActivityTypes, isActivityRegisterable } from 'services/recim/activity';
import { removeAttendance, updateAttendance } from 'services/recim/match';
import { getParticipantAttendanceCountForTeam } from 'services/recim/team';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { standardDate, formatDateTimeRange } from '../../Helpers';

// Old activitylisting
const ActivityListing = ({ activity }) => {
  //const [activityType, setActivityType] = useState();
  //const [currentCapacity, setCurrentCapacity] = useState(<GordonLoader size={15} inline />);
  // useEffect(() => {
  //   const loadActivityType = async () => {
  //     let activityTypes = await getActivityTypes();
  //     setActivityType(
  //       activityTypes.find((activityType) => activityType.ID === activity.TypeID).Description,
  //     );
  //   };
  //   const calculateCurrentCapacity = async () => {
  //     let fullActivity = await getActivityByID(activity.ID);
  //     setCurrentCapacity(fullActivity.Team?.length);
  //   };
  //   loadActivityType();
  //   calculateCurrentCapacity();
  // }, [activity]);

  let activeSeries = activity.Series.find((series) => isPast(Date.parse(series.StartDate)));
  let activeSeriesMessage =
    activeSeries && activeSeries.Name + ' until ' + standardDate(activeSeries.EndDate);

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
              ></Chip>
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
              <Grid item>
                <Chip
                  icon={<EventAvailableIcon />}
                  label={activity.RegistrationOpen ? 'Registration Open' : 'Registration Closed'}
                  color={activity.RegistrationOpen ? 'success' : 'info'}
                  size="small"
                ></Chip>
              </Grid>
              <Grid item>
                <Typography>
                  {activity.RegistrationOpen
                    ? 'Registration closes ' + standardDate(activity.RegistrationEnd)
                    : activeSeriesMessage}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item sm={1}>
            <Typography variant="subtitle">
              {currentCapacity}
              <Typography variant="span" sx={{ p: 0.2 }}>
                /
              </Typography>
              {activity.MaxCapacity}
            </Typography>
          </Grid> */}
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

/*proposed new activitylisting
const ActivityListing = ({ activity, showActivityOptions }) => {
  const [anchorEl, setAnchorEl] = useState();
  const moreOptionsOpen = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  let activeSeries = activity.Series.find((series) => isPast(Date.parse(series.StartDate)));
  let activeSeriesMessage =
    activeSeries && activeSeries.Name + ' until ' + standardDate(activeSeries.EndDate);

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

  const handleActivityOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  if (!activity) return null;
  return (
    <ListItem key={activity.ID} className={styles.listingWrapper}>
      <ListItem
        secondaryAction={
          showActivityOptions && (
            <IconButton edge="end" onClick={handleActivityOptions}>
              <MoreHorizIcon />
            </IconButton>
          )
        }
        disablePadding
      >
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
                    styles['activityType_' + activity?.Type?.toLowerCase().replace(/\s+/g, '')]
                  }
                  size="small"
                ></Chip>
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
                <Grid item>
                  <Chip
                    icon={<EventAvailableIcon />}
                    label={activity.RegistrationOpen ? 'Registration Open' : 'Registration Closed'}
                    color={activity.RegistrationOpen ? 'success' : 'info'}
                    size="small"
                  ></Chip>
                </Grid>
                <Grid item>
                  <Typography>
                    {activity.RegistrationOpen
                      ? 'Registration closes ' + standardDate(activity.RegistrationEnd)
                      : activeSeriesMessage}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={1}></Grid>
          </Grid>
        </ListItemButton>
        {showActivityOptions && (
          <Menu open={moreOptionsOpen} onClose={handleClose} anchorEl={anchorEl}>
            <MenuItem dense onClick={() => console.log('edit')} divider>
              Edit
            </MenuItem>
            <MenuItem dense onClick={() => console.log('create series')} divider>
              Create Series
            </MenuItem>
            <MenuItem dense onClick={() => console.log('delete')} className={styles.rejectButton}>
              Delete
            </MenuItem>
          </Menu>
        )}
      </ListItem>
    </ListItem>
  );
};
*/

const TeamListing = ({ team, invite, match, setTargetTeamID, callbackFunction }) => {
  if (!team && !match) return null;

  const handleAcceptInvite = async () => {
    let response = 'accepted';
    await respondToTeamInvite(team.ID, response);
    callbackFunction(response, team.Activity.ID, team.ID);
  };

  const handleRejectInvite = async () => {
    let response = 'rejected';
    await respondToTeamInvite(team.ID, response);
    callbackFunction(response, team.Activity.ID, team.ID);
  };

  let content;
  if (match) {
    let targetTeamStats = match.Scores.find((score) => score.TeamID === team.ID);
    content = (
      <ListItemButton onClick={() => setTargetTeamID(team.ID)}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={10}>
            <Typography className={styles.listingSubtitle}>Name: </Typography>
            <Typography className={styles.listingTitle}>{team.Name}</Typography>
          </Grid>
          <Grid item xs={8} sm={4}>
            <Typography className={styles.listingSubtitle}>
              Score: {targetTeamStats.TeamScore}
            </Typography>
          </Grid>
          <Grid item xs={8} sm={4}>
            <Typography className={styles.listingSubtitle}>
              Sportsmanship: {targetTeamStats.SportsmanshipScore}
            </Typography>
          </Grid>
          <Grid item xs={8} sm={4} className={styles.rightAlignLarge}>
            <Typography className={styles.listingSubtitle}>
              Status: {targetTeamStats.Status}
            </Typography>
          </Grid>
        </Grid>
      </ListItemButton>
    );
  } else {
    let ActivityRecord = {
      WinCount: 0,
      LossCount: 0,
    };

    team.TeamRecord?.forEach((record) => {
      ActivityRecord.WinCount += record.WinCount;
      ActivityRecord.LossCount += record.LossCount;
    });
    content = (
      <Grid container direction="row" justifyContent="center">
        <Grid item xs={12}>
          <ListItemButton
            component={Link}
            to={`/recim/activity/${team.Activity.ID}/team/${team.ID}`}
            className={styles.listing}
          >
            <Grid container>
              <Grid container columnSpacing={2}>
                <Grid item xs={8} sm={5}>
                  <Typography className={styles.listingTitle}>{team.Name}</Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={7}
                  container
                  className={styles.rightAlignLarge}
                  direction="row"
                  spacing={1}
                >
                  {invite && (
                    <Grid item>
                      <IconButton className={styles.acceptButton} onClick={handleAcceptInvite}>
                        <CheckIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {invite && (
                    <Grid item>
                      <IconButton className={styles.rejectButton} onClick={handleRejectInvite}>
                        <ClearIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {team.TeamRecord && !invite && (
                    <Grid item>
                      <Typography className={styles.listingSubtitle}>
                        {ActivityRecord.WinCount}W : {ActivityRecord.LossCount}L
                      </Typography>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} className={styles.listingSubtitle}>
                  <Typography className={styles.listingSubtitle}>{team.Activity?.Name}</Typography>
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
  withAttendance,
  isAdmin,
  initialAttendance,
  teamID,
  matchID,
}) => {
  const { teamID: teamIDParam, activityID } = useParams(); // for use by team page roster
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState();
  const [anchorEl, setAnchorEl] = useState();
  const moreOptionsOpen = Boolean(anchorEl);
  const [didAttend, setDidAttend] = useState(initialAttendance != null);
  const [attendanceCount, setAttendanceCount] = useState();

  const handleClickOff = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    callbackFunction((val) => !val);
  };

  useEffect(() => {
    const loadAvatar = async () => {
      if (participant.Username) {
        const { def: defaultImage, pref: preferredImage } = await user.getImage(
          participant.Username,
        );
        setAvatar(preferredImage || defaultImage);
      }
    };
    const loadUserInfo = async () => {
      if (participant.Username) {
        const profileInfo = await user.getProfileInfo(participant.Username);
        setName(profileInfo.fullName);
      }
    };
    const loadAttendanceCount = async () => {
      setAttendanceCount(await getParticipantAttendanceCountForTeam(teamID, participant.Username));
    };
    loadUserInfo();
    loadAvatar();
    if (teamID && withAttendance) loadAttendanceCount();
  }, [participant.Username, teamID, withAttendance]);

  const handleParticipantOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRemoveFromTeam = async () => {
    let isRegistrationPeriod = await isActivityRegisterable(activityID);
    if (isRegistrationPeriod) await handleDeleteFromTeam();
    else await handleMakeInactive();
  };

  const handleMakeCoCaptain = async () => {
    let editedParticipant = {
      Username: participant.Username,
      RoleTypeID: 4,
    }; // Role 4 is co-captain

    await editTeamParticipant(teamIDParam, editedParticipant); // Role 4 is co-captain
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

  if (!participant) return null;
  return (
    // first ListItem is used only for paddings/margins
    // second ListItem (nested inside) is used to layout avatar and secondaryAction
    <ListItem key={participant.Username} className={styles.listingWrapper}>
      <ListItem
        secondaryAction={
          <>
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
        <ListItemButton
          to={`/profile/${participant.Username}`}
          className={`${styles.listing} ${
            withAttendance && (didAttend ? styles.attendedListing : styles.absentListing)
          }`}
        >
          <ListItemAvatar>
            <Avatar
              src={`data:image/jpg;base64,${avatar}`}
              className={minimal ? styles.avatarSmall : styles.avatar}
              variant="rounded"
            ></Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={participant.Role} />
        </ListItemButton>
        {showParticipantOptions && (
          <Menu open={moreOptionsOpen} onClose={handleClickOff} anchorEl={anchorEl}>
            {participant.Role !== 'Inactive' && participant.Role !== 'Co-Captain' && (
              <MenuItem dense onClick={handleMakeCoCaptain} divider>
                Make co-captain
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
      </ListItem>
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
                      <Typography>{team1Score ?? 'TBD'}</Typography>
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

export { ActivityListing, TeamListing, ParticipantListing, MatchListing };
