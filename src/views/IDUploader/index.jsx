import { useIsAuthenticated } from '@azure/msal-react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  DialogContentText,
  Grid,
  List,
  ListItem,
} from '@mui/material';
import 'cropperjs/dist/cropper.css';
import { useUser, useUserActions } from 'hooks';
import { useCallback, useState } from 'react';
import { authenticate } from 'services/auth';
import logging from 'services/logging';
import user from 'services/user';
import styles from './IDUploader.module.css';
import IdCardDefault from './image-default.png';
import IdCardGreen from './image-green.png';
import IdCardTop from './image-top.png';
import PhotoCropper from 'components/PhotoCropper';
import GordonDialogBox from 'components/GordonDialogBox';
import SimpleSnackbar from 'components/Snackbar';

const postCroppedImage = async (croppedImage, username) => {
  let attemptNumber = 0;
  let logIntro = `ID photo submission for ${username}`;
  let postedSuccessfully = false;

  while (!postedSuccessfully && attemptNumber < 5) {
    try {
      await user.postIDImage(croppedImage);
      logging.post(logIntro + ` succeeded on #${attemptNumber}`);
      postedSuccessfully = true;
    } catch (error) {
      const errorDetails = JSON.stringify(error);
      logging.post(logIntro + ` failed on #${attemptNumber} with error: ${errorDetails}`);
      attemptNumber++;
    }
  }

  if (!postedSuccessfully) {
    throw new Error('Failed to post image after 5 attempts');
  }
};

const IDUploader = () => {
  const [cardImage, setCardImage] = useState(IdCardDefault);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const userActions = useUserActions();
  const { profile } = useUser();
  const isAuthenticated = useIsAuthenticated();

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  if (!isAuthenticated) {
    return LoginCard;
  }

  const handleSubmit = async (croppedImage) => {
    try {
      await postCroppedImage(croppedImage, profile.AD_Username);
      setCardImage(croppedImage);

      if (userActions) {
        userActions.updateImage();
      }

      setIsSubmitDialogOpen(true);
    } catch (error) {
      createSnackbar('There was a problem submitting your photo. Please try again.', 'error');
    } finally {
      setIsPhotoOpen(false);
    }
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <>
        <Grid item xs={12} md={6} lg={8}>
          <Card>
            <CardHeader title="ID Photo Guidelines" titleTypographyProps={{ align: 'center' }} />
            <CardContent>
              <Grid container justifyContent="center" direction="column">
                <Grid item>
                  <List
                    component="ol"
                    sx={{
                      listStyleType: 'decimal',
                      pl: 2,
                      '& .MuiListItem-root': {
                        display: 'list-item',
                        pl: 0,
                        fontSize: '1.25rem',
                      },
                    }}
                  >
                    <ListItem>Facial features must be identifiable.</ListItem>
                    <ListItem>No sunglasses or hats.</ListItem>
                    <ListItem>Photo must include your shoulders to the top of your head.</ListItem>
                    <ListItem>
                      While this does not need to be a professional photo, it does need to be a
                      reasonable representation of your face for an official campus ID card. As long
                      as it meets the criteria, most cameras on a phone will work fine.
                    </ListItem>
                  </List>
                </Grid>
                <Grid item align="center">
                  <Button variant="contained" onClick={() => setIsPhotoOpen(true)}>
                    Upload
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4} container justifyContent="center">
          <Card>
            <CardHeader title="Preview your ID Card" />
            <CardContent className={styles.ID_card}>
              <img
                className={styles.ID_card_header}
                src={IdCardTop}
                alt="ID card top with Gordon College logo."
              />
              <img className={styles.ID_card_photo} src={cardImage} alt="Placeholder ID." />
              <img
                className={styles.ID_card_sidebar}
                src={IdCardGreen}
                alt="Colored bar with text 'student'."
              />
            </CardContent>
          </Card>
        </Grid>
        <PhotoCropper
          open={isPhotoOpen}
          onClose={() => setIsPhotoOpen(false)}
          onSubmit={handleSubmit}
        />
        <GordonDialogBox
          open={isSubmitDialogOpen}
          title="Photo Submitted"
          buttonClicked={() => setIsSubmitDialogOpen(false)}
          severity="success"
        >
          <DialogContentText>
            We got your photo!
            <br />
            You should now see it on your MyProfile page, but it may
            <br />
            take a couple of days for it to be approved for public view.
            <br />
            CTS will contact you if there's an issue.
          </DialogContentText>
        </GordonDialogBox>
        <SimpleSnackbar
          open={snackbar.open}
          text={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        />
      </>
    </Grid>
  );
};

const LoginCard = (
  <Grid container justifyContent="center">
    <Grid item xs={12} md={8}>
      <Card>
        <CardHeader title="You are not logged in" />
        <CardContent>
          Please log in to upload an ID photo. You can press the back button or follow the URL
          "360.gordon.edu/id" to return to this page.
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={authenticate}>
            Login
          </Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
);

export default IDUploader;
