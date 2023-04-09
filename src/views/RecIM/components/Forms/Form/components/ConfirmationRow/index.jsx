import { Typography, Grid } from '@mui/material';
import styles from './ConfirmationRow.module.css';
import { Check, Remove } from '@mui/icons-material';
import { isValid, format } from 'date-fns';

const ConfirmationRow = ({ value, label }) => {
  const isCheckbox = typeof value === 'boolean';
  const truthIcon = (value) => {
    return value ? (
      <Check className={styles.icon_current} />
    ) : (
      <Remove className={styles.icon_previous} />
    );
  };
  const currentValue = isCheckbox ? (
    truthIcon(value)
  ) : (
    <Typography variant="body2" className={styles.text_current}>
      {/* if datetime, format appropriately */}
      {isValid(value) ? format(value, 'MMM dd, y hh:mm aa') : `${value}`}
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
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-end">
          <Grid item>{currentValue}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { ConfirmationRow };
