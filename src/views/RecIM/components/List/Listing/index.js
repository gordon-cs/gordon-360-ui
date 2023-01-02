import {
  Grid,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  Chip,
} from '@mui/material';
import styles from './Listing.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import user from 'services/user';
import { DateTime } from 'luxon';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

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
const ParticipantListing = ({ participant }) => {
  const [avatar, setAvatar] = useState('');

  // const [name, setName] = useState({
  //   firstname: '',
  //   lastname: '',
  // });

  useEffect(() => {
    const loadAvatar = async () => {
      if (participant.username) {
        const { def: defaultImage, pref: preferredImage } = await user.getImage(
          participant.username,
        );
        setAvatar(preferredImage || defaultImage);
      }
    };
    loadAvatar();
  }, [participant.username]);
  return (
    <ListItem key={participant.username} disableGutters={true}>
      <Grid container alignItems="center" className={styles.listing}>
        <ListItemAvatar>
          <Avatar
            src={`data:image/jpg;base64,${avatar}`}
            className={styles.avatar}
            variant="rounded"
          ></Avatar>
        </ListItemAvatar>
        <Link to={`/profile/${participant.username}`} className="gc360_link">
          <ListItemText primary={participant.username} />
        </Link>
      </Grid>
    </ListItem>
  );
};

const MatchListing = ({ match }) => {
  return (
    <ListItemButton
      component={Link}
      to={`/recim/activity/${match.activityID}/match/${match.ID}`}
      className="gc360_link"
    >
      <Grid container className={styles.listing}>
        <Grid item>Team A vs Team B</Grid>
      </Grid>
    </ListItemButton>
  );
};

export { ActivityListing, TeamListing, ParticipantListing, MatchListing };
