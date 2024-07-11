import { Typography, Grid } from '@mui/material/';
import styles from './ConfirmationRow.module.css';
import { Check, Remove } from '@mui/icons-material';

type Props = {
  field: { Value: string | boolean; Label: string };
  prevValue: string | boolean;
};

const ConfirmationRow = ({ field, prevValue }: Props) => {
  const truthIcon = (value: boolean) => {
    return value ? (
      <Check className={styles.icon_current} />
    ) : (
      <Remove className={styles.icon_previous} />
    );
  };
  const currentValue =
    typeof field.Value === 'boolean' ? (
      truthIcon(field.Value)
    ) : (
      <Typography variant="subtitle2" className={styles.text_current}>
        {field.Value}
      </Typography>
    );

  const previousValue =
    typeof prevValue === 'boolean' ? (
      truthIcon(prevValue)
    ) : (
      <Typography variant="caption" className={styles.text_previous}>
        {prevValue === '' || false ? 'No previous value' : prevValue}
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
          <Grid item>{previousValue}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { ConfirmationRow };
