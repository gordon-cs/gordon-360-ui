import { Grid } from '@material-ui/core/';
import styles from './Listing.module.css';
import { Link } from 'react-router-dom';

const LeagueListing = ({ leagueID }) => {
  return (
    <>
      <Link to={`/recim/league/${leagueID}`} className="gc360_link">
        <Grid container className={styles.listing}>
          <Grid item>League Listing</Grid>
          {/* include: 
          - activity type (league, tournament, one-off)
          - registration deadline IF there is one (start date as well for admin only)
          - date(s) of activity (ex. season date range or tournament date)
          */}
        </Grid>
      </Link>
    </>
  );
};

const TeamListing = ({ leagueID, teamID }) => {
  return (
    <>
      <Link to={`/recim/league/${leagueID}/team/${teamID}`} className="gc360_link">
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
      <Link to={`/profile/${username}`} className="gc360_link">
        <Grid container className={styles.listing}>
          <Grid item>Participant Listing</Grid>
        </Grid>
      </Link>
    </>
  );
};

const MatchListing = ({ leagueID, matchID }) => {
  return (
    <>
      <Link to={`/recim/league/${leagueID}/match/${matchID}`} className="gc360_link">
        <Grid container className={styles.listing}>
          <Grid item>Team A vs Team B</Grid>
        </Grid>
      </Link>
    </>
  );
};

export { LeagueListing, TeamListing, ParticipantListing, MatchListing };
