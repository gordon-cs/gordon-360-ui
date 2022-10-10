import { Grid } from '@material-ui/core/';
import styles from './LeagueListing.module.css';
import { Link } from 'react-router-dom';

const LeagueListing = ({ leagueID }) => {
  //   const { profile, loading } = useUser();

  return (
    <>
      <Link to={`/recim/league/${leagueID}`} className="gc360_link">
        <Grid container className={styles.leagueListing}>
          <Grid item>League Listing</Grid>
        </Grid>
      </Link>
    </>
  );
};

export default LeagueListing;
