import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  CardHeader,
  Grid,
} from '@mui/material';
import { useState, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import defaultLogo from '../../images/DefaultPoster.png';
import styles from './CropPoster.module.scss';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import ClearOutlinedIcon from '@mui/icons-material/ClearRounded';
import IconButton from '@mui/material/IconButton';
import UndoIcon from '@mui/icons-material/Undo';

const CROPPER_WIDTH = 1056;
const CROPPER_HEIGHT = 1632;
const ASPECT_RATIO = 3 / 4;

const CropPoster = ({ open, onClose, onSubmit }) => {
  const [cropperImageData, setCropperImageData] = useState(null);
  const [photoDialogError, setPhotoDialogError] = useState(null);
  const [photoDialogErrorTimeout, setPhotoDialogErrorTimeout] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const cropperRef = useRef(null);

  // Cancels the cropper and closes the dialog
  const handleCloseCancel = () => {
    onClose();
    setShowCropper(false);
  };

  // Submits the cropped image and closes the dialog
  const handleCloseSubmit = () => {
    if (cropperRef.current) {
      const croppedImage = cropperRef.current.cropper
        .getCroppedCanvas({ width: CROPPER_WIDTH, height: CROPPER_HEIGHT })
        .toDataURL();
      onSubmit(croppedImage);
      handleCloseCancel();
    }
  };

  const imageOnLoadHelper = (reader) => {
    const dataURL = reader.result.toString();
    const i = new Image();
    i.onload = () => {
      setPhotoDialogError(null);
      setCropperImageData(dataURL);
    };
    i.src = dataURL;
  };

  const clearPhotoDialogErrorTimeout = () => {
    clearTimeout(photoDialogErrorTimeout);
    setPhotoDialogErrorTimeout(null);
    setPhotoDialogError(null);
  };

  // Accepts the dropped file
  const onDropAccepted = (fileList) => {
    const previewImageFile = fileList[0];
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result.toString();
      let i = new Image();
      i.onload = async () => {
        if (i.width < 200 || i.height < 200) {
          clearPhotoDialogErrorTimeout();
          setPhotoDialogError(
            'Sorry, your poster is too small! Posters must be at least 200 x 200 pixels.',
          );
        } else {
          imageOnLoadHelper(reader);
        }
      };
      i.src = dataURL;
    };
    reader.readAsDataURL(previewImageFile);
    setShowCropper(true);
  };
  const onDropRejected = async () => {
    clearPhotoDialogErrorTimeout();
    setPhotoDialogError('Sorry, invalid image file! Only PNG and JPEG posters are accepted.');
  };

  // Creates the message for the dialog box based on the state
  const createPhotoDialogBoxMessage = () => {
    if (photoDialogError != null) {
      return <span className={styles.photoDialogError}>{photoDialogError}</span>;
    } else if (cropperImageData) {
      return 'Select an image then crop to desired dimensions';
    } else {
      return isMobile
        ? 'Tap Image to Browse Files'
        : 'Drag & Drop Picture, or Click to Browse Files';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} scroll="paper" aria-labelledby="form-dialog-title">
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} align="center">
              Upload Poster
            </Grid>
          </Grid>
        }
        className={styles.gc360_header}
      />
      <DialogContent
        className={styles.dialogContent}
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <DialogContentText style={{ textAlign: 'center' }}>
          {createPhotoDialogBoxMessage()}
        </DialogContentText>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {!showCropper && (
            <Dropzone
              accept={{
                'image/jpeg': [],
                'image/png': [],
              }}
              onDropAccepted={onDropAccepted}
              onDropRejected={onDropRejected}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className={styles.dropzoneContainer}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <input {...getInputProps()} />
                  <img src={defaultLogo} alt="Poster" className={styles.dropzoneImage} />
                </div>
              )}
            </Dropzone>
          )}
          {showCropper && (
            <div
              className={styles.dropzoneContainer}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Cropper
                ref={cropperRef}
                src={cropperImageData}
                className={styles.cropperContainer}
                style={{ width: '100%', height: '100%' }}
                aspectRatio={ASPECT_RATIO}
                guides={true}
                zoomable={false}
                scalable
                movable={false}
                cropBoxMovable
                cropBoxResizable={true}
                minCropBoxWidth={200}
                minCropBoxHeight={200}
                zoom={false}
                dragMode="move"
              />
            </div>
          )}
        </div>
      </DialogContent>
      {/(iPhone|iPod)/i.test(navigator.userAgent) ? (
        <DialogActions className={styles.dialogActions} style={{ justifyContent: 'center' }}>
          <IconButton onClick={onClose} variant="outlined" color="error">
            <ClearOutlinedIcon />
          </IconButton>
          {showCropper && (
            <IconButton onClick={() => setShowCropper(false)} variant="contained" color="link">
              <UndoIcon />
            </IconButton>
          )}
          {showCropper && (
            <IconButton onClick={handleCloseSubmit} size="large" style={{ color: '#29e757' }}>
              <CheckBoxRoundedIcon />
            </IconButton>
          )}
        </DialogActions>
      ) : (
        <DialogActions className={styles.dialogActions} style={{ justifyContent: 'center' }}>
          <Button
            onClick={onClose}
            variant="outlined"
            color="error"
            className={styles.cancelButton}
          >
            Cancel
          </Button>

          {showCropper && (
            <Button
              onClick={() => setShowCropper(false)}
              variant="contained"
              className={styles.dialogButton}
            >
              Go{'\u00A0'}Back
            </Button>
          )}
          {showCropper && (
            <Button
              onClick={handleCloseSubmit}
              variant="contained"
              className={styles.dialogButton}
              style={{ backgroundColor: '#006D22' }}
            >
              Submit
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CropPoster;
