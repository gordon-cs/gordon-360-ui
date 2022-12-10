import { Grid, Avatar, ListItemAvatar, ListItem, ListItemText, Typography } from '@mui/material';
import styles from './Listing.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import user from 'services/user';
import { DateTime } from 'luxon';

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
    <ListItem button component={Link} to={`/recim/activity/${activity.ID}`} className="gc360_link">
      <Grid container className={styles.listing}>
        <Grid item xs={3}>
          {activity.Name}
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="row" alignItems="center" justifyContent="center">
            <Grid item xs={10}>
              <Typography gutterBottom align="center">
                Registration
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography align="center">
                {standardDate(registrationStart, true)} - {standardDate(registrationEnd, true)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid container direction="row" alignItems="center" justifyContent="center">
            <Grid item xs={10}>
              <Typography gutterBottom align="center">
                Season
              </Typography>
            </Grid>
            <Grid item xs={10}>
              {activity.Series.map((series) => {
                return (
                  <Typography align="center">
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
    </ListItem>
  );
};

const TeamListing = ({ team }) => {
  return (
    <ListItem
      button
      component={Link}
      to={`/recim/activity/${team.ActivityID}/team/${team.ID}`}
      className="gc360_link"
    >
      <Grid container className={styles.listing}>
        <Grid item>{team.Name}</Grid>
      </Grid>
    </ListItem>
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
        const splitName = participant.Username.split('.');
        setName(splitName[0] + ' ' + splitName[1]);
      }
    };
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
        <Link to={`/profile/${participant.Username.toLowerCase()}`} className="gc360_link">
          <ListItemText primary={name} />
        </Link>
      </Grid>
    </ListItem>
  );
};

const MatchListing = ({ match }) => {
  return (
    <ListItem
      button
      component={Link}
      to={`/recim/activity/${match.activityID}/match/${match.ID}`}
      className="gc360_link"
    >
      <Grid container className={styles.listing}>
        <Grid item>Team A vs Team B</Grid>
      </Grid>
    </ListItem>
  );
};

export { ActivityListing, TeamListing, ParticipantListing, MatchListing };
