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
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ClearIcon from '@mui/icons-material/Clear';
import { editTeamParticipant } from 'services/recim/team';

const standardDate = (date, includeTime) => {
  let formattedDate = date.monthShort + ' ' + date.day;
  if (includeTime) {
    formattedDate += ' ' + date.toLocaleString(DateTime.TIME_SIMPLE);
  }
  return formattedDate;
};

const ActivityListing = ({ activity }) => {
  let registrationStart = DateTime.fromISO(activity.RegistrationStart);
  let registrationEnd = DateTime.fromISO(activity.RegistrationEnd);
  return (
    <ListItemButton component={Link} to={`/recim/activity/${activity.ID}`} className="gc360_link">
      <Grid container className={styles.listing} columnSpacing={2}>
        <Grid item xs={12} sm={4} container alignContent="center">
          <Typography className={styles.listingTitle}>{activity.Name}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container direction="row">
            <Grid item xs={10}>
              <Chip
                icon={<EventAvailableIcon />}
                label="registration open"
                color="success"
                size="small"
              ></Chip>
            </Grid>
            <Grid item xs={10}>
              <Typography>Registration closes {standardDate(registrationEnd, false)}</Typography>
              <Typography sx={{ color: 'gray', fontSize: '0.7em' }}>
                <i>
                  testing purposes: {standardDate(registrationStart, true)} -{' '}
                  {standardDate(registrationEnd, true)}
                </i>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container direction="row">
            <Grid item xs={10}>
              <Typography gutterBottom>Season</Typography>
            </Grid>
            <Grid item xs={10}>
              {activity.Series.map((series) => {
                return (
                  <Typography key={series.ID}>
                    {series.Name} {standardDate(DateTime.fromISO(series.StartDate), false)} -{' '}
                    {standardDate(DateTime.fromISO(series.EndDate), false)}
                  </Typography>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        {/* include:
          - activity type (activity, tournament, one-off)
          - registration deadline IF there is one (start date as well for admin only)
          - date(s) of activity (ex. season date range or tournament date)
          */}
      </Grid>
    </ListItemButton>
  );
};

const TeamListing = ({ team }) => {
  return (
    <ListItemButton
      component={Link}
      to={`/recim/activity/${team.ActivityID}/team/${team.ID}`}
      className="gc360_link"
    >
      <Grid container className={styles.listing}>
        <Grid item>{team.Name}</Grid>
      </Grid>
    </ListItemButton>
  );
};

// We could also use ParticipantID (not student ID) if we have that and prefer it to AD_Username
const ParticipantListing = ({ participant, minimal, callbackFunction, showParticipantOptions }) => {
  const { teamID } = useParams();
  const [avatar, setAvatar] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);
  const moreOptionsOpen = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleParticipantOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMakeCoCaptain = () => {
    editTeamParticipant(participant.Username, teamID, 4); // Role 4 is co-captain
    handleClose();
  };

  const handleRemoveFromTeam = () => {
    editTeamParticipant(participant.Username, teamID, 6) // Role 6 is inactive
  }

  useEffect(() => {
    const loadAvatar = async () => {
      if (participant.Username) {
        const { def: defaultImage, pref: preferredImage } = await user.getImage(
          participant.Username,
        );
        setAvatar(preferredImage || defaultImage);
      }
    };
    loadAvatar();
  }, [participant.Username]);

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
          ) : (
            <IconButton edge="end" onClick={handleParticipantOptions}>
              <MoreHorizIcon />
            </IconButton>
          )
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
          <ListItemText primary={participant.Username} />
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
    <ListItemButton
      component={Link}
      to={`/recim/activity/${activityID}/match/${match.ID}`}
      className="gc360_link"
    >
      <Grid container className={styles.listing}>
        <Grid item>
          {match.Team[0].Name} vs. {match.Team[1].Name}
        </Grid>
      </Grid>
    </ListItemButton>
  );
};

export { ActivityListing, TeamListing, ParticipantListing, MatchListing };
