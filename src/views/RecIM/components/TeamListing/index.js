import { Grid } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import styles from './TeamListing.module.css';

const TeamListing = () => {
  //   const { profile, loading } = useUser();
  return (
    <>
      <Link to={`./recim`} className="gc360_link">
        <Grid container className={styles.teamListing}>
          <Grid item>Team Listing</Grid>
        </Grid>
      </Link>
    </>
  );
};

export default TeamListing;
