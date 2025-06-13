import { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Grid,
  MenuItem,
  Dialog,
  DialogContent,
  CardHeader,
  Typography,
} from '@mui/material';
import membershipService, { Participation } from 'services/membership';
import { createPoster } from 'services/poster';
import CropPoster from '../CropPoster';
import PosterCheck from '../ApprovedDialogue';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import { useUser } from 'hooks';
import involvementService from 'services/involvements';
import sessionService from 'services/session';
import { useLocation } from 'react-router-dom';
import styles from './UploadForm.module.scss';
import { editPoster } from 'services/poster';

const UploadForm = ({ onClose, onCropSubmit, poster }) => {
  const isEditing = !!poster;

  const [priorityStatus, setPriorityStatus] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [openCropPoster, setOpenCropPoster] = useState(false);
  const [openPosterCheck, setOpenPosterCheck] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { profile } = useUser();
  const [myInvolvements, setMyInvolvements] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const location = useLocation();
  const sessionFromURL = new URLSearchParams(location.search).get('session');
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    if (poster) {
      console.log('Initializing form with poster:', poster);
      setPriorityStatus(poster.Priority === 1 ? 1 : 2); // based on your Priority logic
      setSelectedClub(poster.ClubCode);
      setStartTime(poster.VisibleDate);
      setEndTime(poster.ExpirationDate);
      setTitle(poster.Title);
      setDescription(poster.Description);
      setCroppedImage(poster.ImagePath);
    }
  }, [poster]);

  useEffect(() => {
    const loadButton = async () => {
      if (sessionFromURL) {
        setSelectedSession(sessionService.encodeSessionCode(sessionFromURL));
      } else {
        const { SessionCode: currentSessionCode } = await sessionService.getCurrent();

        const [involvements, sessions] = await Promise.all([
          involvementService.getAll(currentSessionCode),
          sessionService.getAll(),
        ]);

        if (involvements.length === 0) {
          let IndexOfCurrentSession = sessions.findIndex(
            (session) => session.SessionCode === currentSessionCode,
          );

          for (let k = IndexOfCurrentSession + 1; k < sessions.length; k++) {
            const newInvolvements = await involvementService.getAll(sessions[k].SessionCode);
            if (newInvolvements.length !== 0) {
              setSelectedSession(sessions[k].SessionCode);

              break;
            }
          }
        } else {
          setSelectedSession(currentSessionCode);
        }
      }
    };
    loadButton();
  }, [sessionFromURL]);

  const handleCropSubmit = (imageData) => {
    console.log('New cropped image data:', imageData);
    setCroppedImage(imageData);
    setOpenCropPoster(false);
    onCropSubmit?.(imageData);
  };

  useEffect(() => {
    const updateInvolvements = async () => {
      if (profile) {
        const involvements = await membershipService.get({
          username: profile.AD_Username,
          sessionCode: selectedSession,
          participationTypes: [Participation.Advisor, Participation.Leader],
        });
        setMyInvolvements(involvements);
      }
    };

    if (selectedSession) {
      updateInvolvements();
    }
  }, [selectedSession, profile]);

  useEffect(() => {
    const checkIfFormIsValid = () => {
      const imageIsValid = isEditing ? true : Boolean(croppedImage);
      const isValid =
        startTime &&
        endTime &&
        title &&
        description &&
        selectedClub &&
        imageIsValid &&
        (selectedClub !== 'CEC' || priorityStatus);

      console.log('Form validity check:', {
        startTime,
        endTime,
        title,
        description,
        selectedClub,
        croppedImage,
        imageIsValid,
        priorityStatus,
        isEditing,
        isValid,
      });

      setIsSubmitDisabled(!isValid);
    };

    checkIfFormIsValid();
  }, [
    startTime,
    endTime,
    title,
    description,
    selectedClub,
    croppedImage,
    priorityStatus,
    isEditing,
    poster,
  ]);

  const handleClubChange = (event) => {
    setSelectedClub(event.target.value);
  };
  const handlePriorityChange = (event) => {
    setPriorityStatus(event.target.value);
  };

  const posterInfo = () => {
    return {
      ACT_CDE: selectedClub,
      Title: title,
      Description: description,
      ImagePath: croppedImage,
      VisibleDate: startTime,
      ExpirationDate: endTime,
      UploaderADUSername: profile.AD_Username,
      Priority: priorityStatus == 1 ? 1 : 0,
      Status: 1,
    };
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && poster?.ID) {
        console.log('Calling editPoster with ID: ', poster.ID);
        // Prepare partial update data based on your UpdatePoster type
        const updatedData = {
          Title: title,
          Description: description,
          ImagePath: croppedImage,
          VisibleDate: startTime,
          ExpirationDate: endTime,
          Status: 1, // or whatever status you want here
        };
        console.log('Editing poster...', poster.ID, updatedData);
        const updatedPoster = await editPoster(poster.ID, updatedData);
        console.log('Poster updated:', updatedPoster);
      } else {
        console.log('Calling createPoster');
        const newPoster = posterInfo();
        console.log('Creating poster...', newPoster);
        const createdPoster = await createPoster(newPoster);
        console.log('Poster created:', createdPoster);
      }

      setOpenPosterCheck(false);
      setOpenCropPoster(false);
      onClose();
    } catch (error) {
      console.error('Error submitting poster:', error);
    }
  };

  const getTextFieldSX = (color) => ({
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--mui-palette-link-main)',
    },
  });

  return (
    <form className={styles.uploadFormContainer}>
      <Dialog open={openPosterCheck} onClose={() => setOpenPosterCheck(false)}>
        <DialogContent className={styles.dialogContent}>
          <PosterCheck
            open={openPosterCheck}
            onClose={() => setOpenPosterCheck(false)}
            posterInfo={posterInfo()}
            isEditing={isEditing}
            posterId={poster?.ID}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openCropPoster} onClose={() => setOpenCropPoster(false)}>
        <CardHeader
          title={
            <Grid container direction="row" alignItems="center" className={styles.gridItemHeader}>
              <Grid item xs={7} align="left">
                &nbsp;Upload Poster
              </Grid>
            </Grid>
          }
          className={styles.gc360_header}
        />
        <DialogContent className={styles.dialogContent}>
          <CropPoster
            open={openCropPoster}
            onClose={() => setOpenCropPoster(false)}
            onSubmit={handleCropSubmit}
          />
        </DialogContent>
      </Dialog>
      <Grid container spacing={0.75}>
        <Grid item xs={12} md={6} className={styles.gridItem}>
          Display After
          <TextField
            type="datetime-local"
            variant="outlined"
            fullWidth
            required
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{
              classes: {
                focused: styles.textFieldLabelFocused,
              },
            }}
            InputProps={{
              classes: {
                root: styles.textFieldRootFocused,
              },
            }}
            sx={getTextFieldSX('var(--mui-palette-secondary-main)')}
          />
        </Grid>
        <Grid item xs={12} md={6} className={styles.gridItem}>
          Display Until
          <TextField
            type="datetime-local"
            variant="outlined"
            fullWidth
            required
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{
              classes: {
                focused: styles.textFieldLabelFocused,
              },
            }}
            InputProps={{
              classes: {
                root: styles.textFieldRootFocused,
              },
            }}
            sx={getTextFieldSX('var(--mui-palette-secondary-main)')}
          />
        </Grid>
        <Grid item xs={12} className={`${styles.gridItem} ${styles.formField}`}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputLabelProps={{
              classes: {
                focused: styles.textFieldLabelFocused,
              },
            }}
            InputProps={{
              classes: {
                root: styles.textFieldRootFocused,
              },
            }}
            sx={getTextFieldSX('var(--mui-palette-secondary-main)')}
          />
        </Grid>
        <Grid item xs={12} className={styles.gridItem}>
          <TextField
            multiline
            minRows={2}
            maxRows={2}
            label="Description"
            variant="outlined"
            fullWidth
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputLabelProps={{
              classes: {
                focused: styles.textFieldLabelFocused,
              },
            }}
            InputProps={{
              classes: {
                root: styles.textFieldRootFocused,
              },
            }}
            sx={getTextFieldSX('var(--mui-palette-secondary-main)')}
          />
        </Grid>
        <Grid item xs={12} className={styles.gridItem}>
          {!isEditing && (
            <TextField
              select
              label="Select Club"
              value={selectedClub}
              onChange={handleClubChange}
              variant="outlined"
              fullWidth
              required
              InputLabelProps={{
                classes: {
                  focused: styles.textFieldLabelFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: styles.textFieldRootFocused,
                },
              }}
              sx={getTextFieldSX('var(--mui-palette-secondary-main)')}
            >
              {myInvolvements.map((involvement) => (
                <MenuItem key={involvement.ActivityCode} value={involvement.ActivityCode}>
                  {involvement.ActivityDescription}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Grid>
        {/* Add a check for site admin like Chris Carlson to be have access to priority screen*/}
        {selectedClub == 'CEC' && (
          <Grid item xs={12} className={styles.gridItem}>
            <TextField
              select
              label="Priority"
              value={priorityStatus}
              onChange={handlePriorityChange}
              variant="outlined"
              fullWidth
              required
              InputLabelProps={{
                classes: {
                  focused: styles.textFieldLabelFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: styles.textFieldRootFocused,
                },
              }}
              sx={getTextFieldSX('var(--mui-palette-secondary-main)')}
            >
              <MenuItem key={'Yes'} value={1}>
                Yes
              </MenuItem>
              <MenuItem key={'No'} value={2}>
                No
              </MenuItem>
            </TextField>
          </Grid>
        )}

        <Grid item xs={12} className={styles.gridItem}>
          {!croppedImage && (
            <Button
              variant="contained"
              className={styles.uploadPosterButton}
              onClick={() => setOpenCropPoster(true)}
            >
              <AddCircleRoundedIcon />
              &nbsp;Upload Poster
            </Button>
          )}
          {croppedImage && (
            <Button
              variant="contained"
              className={styles.uploadPosterButton}
              onClick={() => setOpenCropPoster(true)}
            >
              <ChangeCircleRoundedIcon />
              &nbsp;Change Poster
            </Button>
          )}
        </Grid>
        <Grid item xs={6} className={styles.gridItem}>
          <Button
            variant="outlined"
            color="primary"
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6} className={styles.gridItem}>
          <Button
            onClick={() => setOpenPosterCheck(true)}
            type="button"
            variant="contained"
            color="primary"
            className={styles.submitButton}
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UploadForm;
