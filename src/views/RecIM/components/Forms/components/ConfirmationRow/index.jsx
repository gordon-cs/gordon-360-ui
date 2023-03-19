import { Typography, Grid } from '@mui/material';
import styles from './ConfirmationRow.module.css';
import { Check, Remove } from '@mui/icons-material';
import { isValid, format } from 'date-fns';

const ConfirmationRow = ({ field }) => {
  const isCheckbox = typeof field.Value === 'boolean';
  const truthIcon = (value) => {
    return value ? (
      <Check className={styles.icon_current} />
    ) : (
      <Remove className={styles.icon_previous} />
    );
  };
  const currentValue = isCheckbox ? (
    truthIcon(field.Value)
  ) : (
    <Typography variant="body2" className={styles.text_current}>
      {/* if datetime, format appropriately */}
      {isValid(field.Value) ? (
        format(field.Value, 'MMM dd, y hh:mm aa')
      ) : field.Value.includes('recim') || field.Value.includes('image') ? (
        <img src={field.Value} width="50em" />
      ) : (
        `${field.Value}`
      )}
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
          {field.Label}
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
