import { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Grid,
  MenuItem,
  Dialog,
  DialogContent,
  CardHeader,
} from '@mui/material';
import membershipService, { Participation } from 'services/membership';
import CropPoster from '../CropPoster';
import PosterCheck from '../ApprovedDialogue';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useUser } from 'hooks';
import involvementService from 'services/involvements';
import sessionService from 'services/session';
import { useLocation } from 'react-router-dom';
import styles from './UploadForm.module.scss';

const UploadForm = ({ onClose, onCropSubmit }) => {
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
    setCroppedImage(imageData);
    setOpenCropPoster(false);
    onCropSubmit(imageData);
  };

  useEffect(() => {
    const updateInvolvements = async () => {
      if (profile) {
        setMyInvolvements(
          await membershipService.get({
            username: profile.AD_Username,
            sessionCode: selectedSession,
            participationTypes: Participation.GroupAdmin,
          }),
        );
      }
    };

    if (selectedSession) {
      updateInvolvements();
    }
  }, [selectedSession, profile]);

  useEffect(() => {
    const checkIfFormIsValid = () => {
      if (startTime && endTime && title && description && selectedClub && croppedImage) {
        setIsSubmitDisabled(false);
      } else {
        setIsSubmitDisabled(true);
      }
    };

    checkIfFormIsValid();
  }, [startTime, endTime, title, description, selectedClub, croppedImage]);

  const handleClubChange = (event) => {
    setSelectedClub(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const getTextFieldSX = (color) => ({
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--mui-palette-link-main)',
    },
  });

  return (
    <form onSubmit={handleSubmit} className={styles.uploadFormContainer}>
      <Dialog open={openPosterCheck} onClose={() => setOpenPosterCheck(false)}>
        <CardHeader
          title={
            <Grid container direction="row" alignItems="center" className={styles.gridItemHeader}>
              <Grid item xs={7} align="left">
                Upload Poster
              </Grid>
            </Grid>
          }
          className={styles.gc360_header}
        />
        <DialogContent className={styles.dialogContent}>
          <PosterCheck open={openPosterCheck} onClose={() => setOpenPosterCheck(false)} />
        </DialogContent>
      </Dialog>
      <Dialog open={openCropPoster} onClose={() => setOpenCropPoster(false)}>
        <CardHeader
          title={
            <Grid container direction="row" alignItems="center" className={styles.gridItemHeader}>
              <Grid item xs={7} align="left">
                Upload Poster
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
      <Grid container spacing={1}>
        <Grid item xs={12} className={styles.gridItem}>
          Start Time
          <TextField
            type="date"
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
        <Grid item xs={12} className={styles.gridItem}>
          End Time
          <TextField
            type="date"
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
            minRows={5}
            maxRows={5}
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
            {myInvolvements.map((myInvolvements) => (
              <MenuItem key={myInvolvements.ActivityCode} value={myInvolvements.ActivityCode}>
                {myInvolvements.ActivityDescription}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} className={styles.gridItem}>
          <Button
            variant="contained"
            className={styles.uploadPosterButton}
            onClick={() => setOpenCropPoster(true)}
          >
            <AddCircleRoundedIcon />
            Upload Poster
          </Button>
        </Grid>
        <Grid item xs={6} className={styles.gridItem}>
          <Button
            onClick={() => setOpenPosterCheck(true)}
            type="submit"
            variant="contained"
            color="primary"
            className={styles.submitButton}
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
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
      </Grid>
    </form>
  );
};

export default UploadForm;
