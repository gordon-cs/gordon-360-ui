import { Grid } from '@material-ui/core/';
import styles from './Listing.module.css';
import { Link } from 'react-router-dom';

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
  return (
    <>
      <Link to={`/recim/profile/${username}`} className="gc360_link">
        <Grid container className={styles.listing}>
          <Grid item>Participant Listing</Grid>
        </Grid>
      </Link>
    </>
  );
};

export { ActivityListing, TeamListing, ParticipantListing };
