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

      <Grid container justifyContent={'center'}>
        <Grid xs={12} md={6} lg={5}>
          <Grid item margin={3}>
            <TextField fullWidth variant="filled" placeholder="First Name"></TextField>
          </Grid>
          <Grid item margin={3}>
            <TextField fullWidth variant="filled" placeholder="Last Name"></TextField>
          </Grid>
          <Grid item margin={3}>
            <TextField fullWidth variant="filled" placeholder="Item Category"></TextField>
          </Grid>
          <Grid item margin={3}>
            <TextField fullWidth variant="filled" placeholder="Item Brand or Make"></TextField>
          </Grid>
          <Grid item margin={3}>
            <TextField
              fullWidth
              variant="filled"
              placeholder="Item Description: Be as detailed as possible"
            ></TextField>
          </Grid>
          <Grid item margin={3}>
            <TextField
              fullWidth
              variant="filled"
              placeholder="Item Color: Choose ALL that apply"
            ></TextField>
          </Grid>
          <Grid item margin={3}>
            <TextField
              fullWidth
              variant="filled"
              placeholder="Location Lost: Be as detailed as possible"
            ></TextField>
          </Grid>
          <Grid item margin={3}>
            <TextField fullWidth variant="filled" placeholder="Date Lost"></TextField>
          </Grid>
          <Grid item margin={3}>
            <TextField fullWidth variant="filled" placeholder="Phone Number"></TextField>
          </Grid>
          <Grid item margin={3}>
            <TextField fullWidth variant="filled" placeholder="Alternate Phone Number"></TextField>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MissingItemForm;
