import { Typography, Grid } from '@mui/material';
import styles from './ConfirmationHeader.module.css';

const ConfirmationWindowHeader = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={styles.header_style}
    >
      <Grid item>
        <Typography variant="body1" className={styles.header_style}>
          FIELD
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-end">
          <Grid item>
            <Typography variant="body1" className={styles.header_style}>
              VALUE
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { ConfirmationWindowHeader };
