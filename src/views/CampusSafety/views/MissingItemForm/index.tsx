import { Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import Header from '../../components/Header';
import styles from './MissingItemForm.module.scss';

const MissingItemForm = () => {
  return (
    <Card className={styles.form_card}>
      <CardHeader
        title="Missing Item Report"
        titleTypographyProps={{ align: 'center' }}
        className="gc360_header"
      />
      <CardContent>
        <Grid container justifyContent={'center'}>
          <Grid item xs={12} sm={6}>
            <Grid item margin={3}>
              <TextField fullWidth variant="filled">
                "Test"
              </TextField>
            </Grid>
            <Grid item margin={3}>
              <TextField fullWidth variant="filled"></TextField>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MissingItemForm;
