import { Typography, Grid } from '@material-ui/core/';
import styles from './ConfirmationRow.module.css';
import { Check, Clear, Remove } from '@material-ui/icons';

const ConfirmationRow = ({ field, prevValue }) => {
  //CHECKBOX TRUTH VALUE NEEDS TO BE REFORMATTED
  console.log(field);
  console.log(prevValue);
  if (typeof prevValue === 'boolean') {
    console.log('hi');
  }
  const currentValue =
    typeof prevValue === 'boolean' ? (
      <Check className={styles.icon_current} />
    ) : (
      <Typography variant="subtitle2" className={styles.text_current}>
        {`${field.value}`}
      </Typography>
    );

  const previousValue =
    typeof prevValue === 'boolean' ? (
      <Remove className={styles.icon_previous} />
    ) : (
      <Typography variant="caption" className={styles.text_previous}>
        {prevValue === '' || false ? 'No previous value' : `${prevValue}`}
      </Typography>
    );

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
          <Grid item>{currentValue}</Grid>
          <Grid item>{previousValue}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { ConfirmationRow };
