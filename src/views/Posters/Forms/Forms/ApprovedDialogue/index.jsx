import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  CardHeader,
  Grid,
  Link as MuiLink,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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
            <Grid item xs={7} align="left">
              <DialogContentText fontWeight="bold" color="warning" paddingTop={2} align="center">
                {'Has your poster been approved? '}
              </DialogContentText>
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />
      <DialogContentText color="warning" padding={2} align="left">
        {'For more information on advertising click here: '}
        <MuiLink
          component={RouterLink}
          to="https://www.gordon.edu/studenthandbook/collegeevents"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'secondary.main', fontWeight: 'bold' }}
        >
          Advertising Guidelines
        </MuiLink>
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
