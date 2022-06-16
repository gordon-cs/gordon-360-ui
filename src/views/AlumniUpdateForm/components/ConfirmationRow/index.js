import { Typography, Grid } from '@material-ui/core/';
import styles from './ConfirmationRow.module.css';

const ConfirmationRow = ({ field, prevValue }) => {
  //CHECKBOX TRUTH VALUE NEEDS TO BE REFORMATTED
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={styles.container}
    >
      <Grid item>
        <Typography variant="body2" className={styles.label}>
          {field.label}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-end">
          <Grid item>
            <Typography variant="subtitle2" className={styles.text_current}>
              {field.value}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" className={styles.text_previous}>
              {prevValue === '' ? 'No previous value' : prevValue}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { ConfirmationRow };
