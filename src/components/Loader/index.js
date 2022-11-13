import { CircularProgress, Grid } from '@mui/material';
import styles from './Loader.module.css';

const GordonLoader = ({ size = 100, color = 'primary' }) => {
  return (
    <Grid className={styles.gordon_loader} container justifyContent="center" alignItems="center">
      <Grid item>
        <CircularProgress size={size} color={color} />
      </Grid>
    </Grid>
  );
};

export default GordonLoader;
