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
import { createPoster, editPoster } from 'services/poster';

// Moves the poster information to the database, and, depending on the timing, allows the poster
// to be displayed on the posters page.
const PosterCheck = ({ open, onClose, posterInfo, isEditing, posterId, onSubmitSuccess }) => {
  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    try {
      if (isEditing && posterId) {
        console.log('Calling editPoster with ID: ', posterId);
        // Prepare partial update data based on your UpdatePoster type
        const updatedData = {
          Title: posterInfo.Title,
          Description: posterInfo.Description,
          ImagePath: posterInfo.ImagePath,
          VisibleDate: posterInfo.VisibleDate,
          ExpirationDate: posterInfo.ExpirationDate,
          Status: 1,
        };
        console.log('Editing poster...', posterId, updatedData);
        const updatedPoster = await editPoster(posterId, updatedData);
        if (onSubmitSuccess) onSubmitSuccess(updatedPoster);
        console.log('Poster updated:', updatedPoster);
      } else {
        console.log('Calling createPoster');
        const newPoster = posterInfo;
        console.log('Creating poster...', newPoster);
        const createdPoster = await createPoster(newPoster);
        if (onSubmitSuccess) onSubmitSuccess(createdPoster);
        console.log('Poster created:', createdPoster);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting poster:', error);
    }
  };

  return (
    // Approval dialog for posters
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit}>
        <CardHeader
          title={
            <Grid container direction="row" alignItems="center">
              <Grid item xs={7} align="left">
                <DialogContentText
                  fontWeight="bold"
                  color="warning.main"
                  paddingTop={2}
                  align="left"
                >
                  Advertising and Life & Conduct Agreement
                </DialogContentText>
              </Grid>
            </Grid>
          }
          className="gc360_header"
        />
        <DialogContentText color="warning" padding={2} align="left">
          My poster complies with campus advertising and Life & Conduct policies.
        </DialogContentText>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="error">
            No, Don't Submit
          </Button>
          <Button type="submit" variant="outlined" color="secondary">
            Yes, Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PosterCheck;
