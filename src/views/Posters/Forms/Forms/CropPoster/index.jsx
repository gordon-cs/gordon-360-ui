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
import defaultLogo from '../../../images/DiscoPoster.jpg';

const CROPPER_WIDTH = 1056;
const CROPPER_HEIGHT = 1632;
const ASPECT_RATIO = 11 / 17;

const CropPoster = ({ open, onClose, onSubmit }) => {
  const [cropperImageData, setCropperImageData] = useState(null);
  const [photoDialogError, setPhotoDialogError] = useState(null);
  const [photoDialogErrorTimeout, setPhotoDialogErrorTimeout] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const cropperRef = useRef(null);

  const handleCloseCancel = () => {
    onClose();
    setShowCropper(false);
  };

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

  const onDropAccepted = (fileList) => {
    const previewImageFile = fileList[0];
    const reader = new FileReader();
    reader.onload = () => {
      var dataURL = reader.result.toString();
      var i = new Image();
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
    setPhotoDialogError('Sorry, invalid image file! Only PNG, JPEG, and PDF posters are accepted.');
  };

  const createPhotoDialogBoxMessage = () => {
    if (photoDialogError != null) {
      return <span style={{ color: '#B63228' }}>{photoDialogError}</span>;
    } else if (cropperImageData) {
      return 'Select an image then crop to desired dimensions';
    } else {
      return isMobile
        ? 'Tap Image to Browse Files'
        : 'Drag & Drop Picture, or Click to Browse Files';
    }
  };

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
      <DialogContent>
        <DialogContentText>{createPhotoDialogBoxMessage()}</DialogContentText>
        {!showCropper && (
          <Dropzone
            onDropAccepted={onDropAccepted}
            accept="image/jpeg, image/png, image.pdf"
            onDropRejected={onDropRejected}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                style={{ border: '2px dashed #ddd', padding: '20px', textAlign: 'center' }}
              >
                <input {...getInputProps()} />
                <img src={defaultLogo} alt="Poster" style={{ width: '100%', height: 'auto' }} />
              </div>
            )}
          </Dropzone>
        )}
        {showCropper && (
          <Cropper
            ref={cropperRef}
            src={cropperImageData}
            style={{ height: '80%', width: '80%' }}
            autoCropArea={0.8}
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
          />
        )}
      </DialogContent>
      <DialogActions>
        {showCropper && (
          <Button
            onClick={handleCloseSubmit}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        )}
        {showCropper && (
          <Button
            onClick={() => setShowCropper(false)}
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
          >
            Go Back
          </Button>
        )}
        <Button onClick={onClose} fullWidth type="submit" variant="contained" color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CropPoster;
