import { Typography, Grid } from '@mui/material';
import styles from './ConfirmationRow.module.css';
import { Check, Remove } from '@mui/icons-material';

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
      {`${field.Value}`}
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
