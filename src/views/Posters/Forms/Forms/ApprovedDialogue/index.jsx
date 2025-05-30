import { Button, Dialog, DialogActions, DialogContentText, CardHeader, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { createPoster } from 'services/poster';

const PosterCheck = ({ open, onClose, posterInfo }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Submitting poster...');
      const createdPoster = await createPoster(posterInfo());
      console.log(posterInfo);
      console.log('Poster created:', createdPoster);
      onClose();
    } catch (error) {
      console.error('Error creating poster:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={7} align="left"></Grid>
          </Grid>
        }
        className="gc360_header"
      />
      <DialogContentText fontWeight={'bold'} color={'primary'} paddingTop={2} align="center">
        {'Has your poster been approved?'}
      </DialogContentText>
      <DialogContentText color={'secondary'} padding={(5, 5)} align="left">
        {'For more information on advertising click here: '}
        <Link color={'primary'} to="https://www.gordon.edu/studenthandbook/collegeevents">
          Advertising Guidelines
        </Link>
      </DialogContentText>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          No
        </Button>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PosterCheck;
