import { CircularProgress, CircularProgressProps, Grid } from '@mui/material';
import styles from './Loader.module.css';

type Props = CircularProgressProps & {
  inline?: boolean;
};

const GordonLoader = ({ size = 100, color = 'primary', inline = false }: Props) => {
  if (inline) return <CircularProgress size={size} color={color} />;
  return (
    <Grid className={styles.gordon_loader} container justifyContent="center" alignItems="center">
      <Grid item>
        <CircularProgress size={size} color={color} />
      </Grid>
    </Grid>
  );
};

export default GordonLoader;
