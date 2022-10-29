import { Grid, Avatar, ListItemAvatar, ListItem, ListItemText } from '@material-ui/core/';
import styles from './Listing.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import user from 'services/user';

const ActivityListing = ({ activity }) => {
  return (
    <ListItem button component={Link} to={`/recim/activity/${activity.ID}`} className="gc360_link">
      <Grid container className={styles.listing}>
        <Grid item>Activity Listing</Grid>
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
      to={`/recim/activity/${team.activityID}/team/${team.ID}`}
      className="gc360_link"
    >
      <Grid container className={styles.listing}>
        <Grid item>Team Listing</Grid>
      </Grid>
    </ListItem>
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
