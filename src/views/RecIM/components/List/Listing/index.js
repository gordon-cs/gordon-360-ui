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

const SeriesListing = ({ series }) => {
  let startDate = DateTime.fromISO(series.StartDate);
  let endDate = DateTime.fromISO(series.EndDate);

  const status = () => {
    let now = DateTime.fromMillis(Date.now());
    if (now < startDate) {
      return (
        <Chip icon={<EventAvailableIcon />} label="not started" color="default" size="small"></Chip>
      );
    }
    if (now > endDate) {
      return (
        <Chip icon={<EventAvailableIcon />} label="completed" color="info" size="small"></Chip>
      );
    }
    return <Chip icon={<EventAvailableIcon />} label="ongoing" color="success" size="small"></Chip>;
  };

  return (
    <Grid container className={styles.listing} columnSpacing={2} alignContent="center">
      <Grid container direction="column" item xs={12} sm={4} alignContent="center">
        <Typography className={styles.listingTitle}>{series.Name}</Typography>
        <Typography sx={{ color: 'gray', fontSize: '0.7em' }}>
          Schedule Type: {series.Type}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid container direction="row">
          <Grid item xs={10}>
            <Typography>
              <i>
                {standardDate(startDate, false)} - {standardDate(endDate, false)}
              </i>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4}>
        {status()}
      </Grid>
    </Grid>
  );
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
  const [name, setName] = useState('');

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

  return (
    <ListItem key={participant.Username} disableGutters={true}>
      <Grid container alignItems="center" className={styles.listing}>
        <ListItemAvatar>
          <Avatar
            src={`data:image/jpg;base64,${avatar}`}
            className={styles.avatar}
            variant="rounded"
          ></Avatar>
        </ListItemAvatar>
        <Link to={`/profile/${participant.Username}`} className="gc360_link">
          <ListItemText primary={name} />
        </Link>
      </Grid>
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

export { ActivityListing, TeamListing, ParticipantListing, MatchListing, SeriesListing };
