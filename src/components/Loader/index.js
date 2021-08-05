import { CircularProgress, Grid } from '@material-ui/core';
import styles from './Loader.module.css';

const GordonLoader = ({ size }) => {
  return (
    <Grid className={styles.gordon_loader} container justifyContent="center" alignItems="center">
      <Grid item>
        <CircularProgress size={size || 100} />
      </Grid>
    </Grid>
  );
};

export default GordonLoader;
