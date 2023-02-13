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
} from '@mui/material';
import styles from './Listing.module.css';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import user from 'services/user';
import { DateTime } from 'luxon';
import GordonLoader from '../../../../../components/Loader';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { editTeamParticipant } from 'services/recim/team';
import { getActivityTypes, getActivityByID } from 'services/recim/activity';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { standardDate } from '../../Helpers';

const ActivityListing = ({ activity }) => {
  const [activityType, setActivityType] = useState();
  const [currentCapacity, setCurrentCapacity] = useState(
    <span style={{ display: 'inline-block' }}>
      <GordonLoader size={15} />
    </span>,
  );
  useEffect(() => {
    const loadActivityType = async () => {
      let activityTypes = await getActivityTypes();
      setActivityType(
        activityTypes.find((activityType) => activityType.ID === activity.TypeID).Description,
      );
    };
    const calculateCurrentCapacity = async () => {
      let fullActivity = await getActivityByID(activity.ID);
      setCurrentCapacity(fullActivity.Team?.length);
    };
    loadActivityType();
    calculateCurrentCapacity();
  }, [activity]);

  let registrationEnd = DateTime.fromISO(activity.RegistrationEnd);
  let activeSeries = activity.Series.find(
    (series) => DateTime.fromISO(series.StartDate) < DateTime.now(),
  );
  let activeSeriesMessage = activeSeries
    ? activeSeries.Name + ' until ' + standardDate(DateTime.fromISO(activeSeries.EndDate))
    : null;

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
    <ListItem key={activity.ID}>
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
                icon={activityTypeIconPair.find((type) => type.type === activityType)?.icon}
                label={activityType}
                color={'success'}
                className={
                  styles['activityType_' + activityType?.toLowerCase().replace(/\s+/g, '')]
                }
                size="small"
              ></Chip>
            </Grid>
          </Grid>
          <Grid item container xs={12} sm={7} direction="column" spacing={1}>
            <Grid item>
              <Typography sx={{ color: 'gray', fontWeight: 'bold' }}>
                ActivityStart - ActivityEnd
              </Typography>
            </Grid>
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
                    ? 'Registration closes ' + standardDate(registrationEnd)
                    : activeSeriesMessage}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={1}>
            <Typography variant="subtitle">
              {currentCapacity}
              <Typography variant="span" sx={{ p: 0.2 }}>
                /
              </Typography>
              {activity.MaxCapacity}
            </Typography>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

const TeamListing = ({ team, invite }) => {
  if (!team) return null;
  return (
    <ListItem key={team.ID}>
      <ListItemButton
        component={Link}
        to={`/recim/activity/${team.Activity.ID}/team/${team.ID}`}
        className={styles.listing}
      >
        <Grid container rowSpacing={1}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography className={styles.listingTitle}>{team.Name}</Typography>
            </Grid>
            <Grid item xs={12} sm={4} className={styles.rightAlignLarge}>
              <Typography className={styles.listingSubtitle}>{team.Activity?.Name}</Typography>
            </Grid>
          </Grid>
          {invite ? (
            <Grid container columnSpacing={2}>
              <Grid item>
                <IconButton className={styles.greenButton}>
                  <CheckIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton className={styles.redButton}>
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

// We could also use ParticipantID (not student ID) if we have that and prefer it to AD_Username
const ParticipantListing = ({ participant, minimal, callbackFunction, showParticipantOptions }) => {
  const { teamID } = useParams();
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState();
  const [anchorEl, setAnchorEl] = useState();
  const moreOptionsOpen = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
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
    loadUserInfo();
    loadAvatar();
  }, [participant.Username]);

  const handleParticipantOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMakeCoCaptain = async () => {
    let editedParticipant = {
      Username: participant.Username,
      RoleTypeID: 4,
    }; // Role 4 is co-captain

    await editTeamParticipant(parseInt(teamID), editedParticipant); // Role 4 is co-captain
    handleClose();
  };

  const handleRemoveFromTeam = async () => {
    let editedParticipant = {
      Username: participant.Username,
      RoleTypeID: 6,
    }; // Role 6 is inactive

    await editTeamParticipant(parseInt(teamID), editedParticipant);
    handleClose();
  };

  if (!participant) return null;
  return (
    // first ListItem is used only for paddings/margins
    // second ListItem (nested inside) is used to layout avatar and secondaryAction
    <ListItem key={participant.Username}>
      <ListItem
        secondaryAction={
          minimal ? (
            <IconButton edge="end" onClick={() => callbackFunction(participant.Username)}>
              <ClearIcon />
            </IconButton>
          ) : showParticipantOptions ? (
            <IconButton edge="end" onClick={handleParticipantOptions}>
              <MoreHorizIcon />
            </IconButton>
          ) : null
        }
        disablePadding
      >
        <ListItemButton to={`/profile/${participant.Username}`} className={styles.listing}>
          <ListItemAvatar>
            <Avatar
              src={`data:image/jpg;base64,${avatar}`}
              className={minimal ? styles.avatarSmall : styles.avatar}
              variant="rounded"
            ></Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={participant.Role} />
        </ListItemButton>
        {showParticipantOptions ? (
          <Menu open={moreOptionsOpen} onClose={handleClose} anchorEl={anchorEl}>
            <MenuItem dense onClick={handleMakeCoCaptain} divider>
              Make co-captain
            </MenuItem>
            <MenuItem dense onClick={handleRemoveFromTeam} className={styles.redButton}>
              Remove from team
            </MenuItem>
          </Menu>
        ) : null}
      </ListItem>
    </ListItem>
  );
};

const MatchListing = ({ match, activityID }) => {
  if (!match?.Team?.length) {
    console.log('Error: MatchListing missing required info; this should be handled elsewhere');
    return null;
  }

  return (
    <ListItem key={match.ID}>
      <ListItemButton
        component={Link}
        to={`/recim/activity/${activityID}/match/${match.ID}`}
        className={styles.listing}
      >
        <Grid container>
          <Grid item>
            {match.Team[0]?.Name} vs. {match.Team[1]?.Name}
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export { ActivityListing, TeamListing, ParticipantListing, MatchListing };
