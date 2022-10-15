import { Grid, Avatar, ListItemAvatar, ListItem, ListItemText } from '@material-ui/core/';
import styles from './Listing.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import user from 'services/user';

const ActivityListing = ({ activityID }) => {
  return (
    <>
      <Link to={`/recim/activity/${activityID}`} className="gc360_link">
        <Grid container className={styles.listing}>
          <Grid item>Activity Listing</Grid>
          {/* include: 
          - activity type (activity, tournament, one-off)
          - registration deadline IF there is one (start date as well for admin only)
          - date(s) of activity (ex. season date range or tournament date)
          */}
        </Grid>
      </Link>
    </>
  );
};

const TeamListing = ({ activityID, teamID }) => {
  return (
    <>
      <Link to={`/recim/activity/${activityID}/team/${teamID}`} className="gc360_link">
        <Grid container className={styles.listing}>
          <Grid item>Team Listing</Grid>
        </Grid>
      </Link>
    </>
  );
};

// We could also use ParticipantID (not student ID) if we have that and prefer it to AD_Username
const ParticipantListing = ({ username }) => {
  const [avatar, setAvatar] = useState('');

  const [name, setName] = useState({
    firstname: '',
    lastname: '',
  });

  useEffect(() => {
    const loadAvatar = async () => {
      if (username) {
        const { def: defaultImage, pref: preferredImage } = await user.getImage(username);
        setAvatar(preferredImage || defaultImage);
      }
    };
    loadAvatar();
  }, [username]);
  return (
    <ListItem key={username} disableGutters={true}>
      <Grid container alignItems="center" className={styles.listing}>
        <ListItemAvatar>
          <Avatar
            src={`data:image/jpg;base64,${avatar}`}
            className={styles.avatar}
            variant="rounded"
          ></Avatar>
        </ListItemAvatar>
        <Link to={`/profile/${username}`} className="gc360_link">
          <ListItemText primary={username} />
        </Link>
      </Grid>
    </ListItem>
  );
};

const MatchListing = ({ activityID, matchID }) => {
  return (
    <>
      <Link to={`/recim/activity/${activityID}/match/${matchID}`} className="gc360_link">
        <Grid container className={styles.listing}>
          <Grid item>Team A vs Team B</Grid>
        </Grid>
      </Link>
    </>
  );
};

export { ActivityListing, TeamListing, ParticipantListing, MatchListing };
