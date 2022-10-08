import { Grid } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import styles from './LeagueListing.module.css';

const LeagueListing = () => {
  //   const { profile, loading } = useUser();
  return (
    <>
      <Link to={`./recim`} className="gc360_link">
        <Grid container className={styles.leagueListing}>
          <Grid item>League Listing</Grid>
        </Grid>
      </Link>
    </>
  );
};

export default LeagueListing;
