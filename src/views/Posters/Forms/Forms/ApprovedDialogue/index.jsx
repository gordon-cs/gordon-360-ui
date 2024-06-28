import { Button, Dialog, DialogActions, DialogContentText, CardHeader, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const PosterCheck = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={7} align="left">
              Upload Poster
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />
      <DialogContentText fontWeight={'bold'} color={'primary'} paddingTop={2} align="center">
        {'Has your poster been approved?'}
      </DialogContentText>
      <DialogContentText color={'primary'} padding={(5, 5)} align="left">
        {'For more information on advertising click here: '}
        <Link color={'primary'} to="https://www.gordon.edu/studenthandbook/collegeevents">
          Advertising Guidlines
        </Link>
      </DialogContentText>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          No
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PosterCheck;
