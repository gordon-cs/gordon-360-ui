import { Grid } from '@material-ui/core/';
import styles from './LeagueListing.module.css';
import { Link } from 'react-router-dom';

const LeagueListing = ({ leagueId }) => {
  //   const { profile, loading } = useUser();

  return (
    <>
    <Link to={`/recim/league/${leagueId}`} className="gc360_link">
      <Grid container className={styles.leagueListing}>
        <Grid item>League Listing</Grid>
      </Grid>
    </Link>
  </>
  );
};

export default LeagueListing;
