import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Tooltip,
} from '@material-ui/core';
import GordonDialogBox from 'components/GordonDialogBox';
import { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import { isMobile } from 'react-device-detect';
import Dropzone from 'react-dropzone';
import cmsService from 'services/cms';
import { gordonColors } from 'theme';

const CROP_DIM = 200; // Width of cropped image canvas

const styles = {
  cancelButton: {
    backgroundColor: 'white',
    color: gordonColors.primary.blue,
    border: `1px solid ${gordonColors.primary.blue}`,
    width: '38%',
  },
};

const NewBannerDialog = ({ open, setOpen, createSnackbar, addBanner }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [cropperImageData, setCropperImageData] = useState(null);
  const [photoDialogErrorTimeout, setPhotoDialogErrorTimeout] = useState(null);
  const [photoDialogError, setPhotoDialogError] = useState(null);
  const cropperRef = useRef();
  const [aspectRatio, setAspectRatio] = useState(null);

  function handleWindowClose() {
    setOpen(false);
    setTitle('');
    setLink('');
    setSortOrder(0);
    setCropperImageData(null);
  }

  async function clearPhotoDialogErrorTimeout() {
    clearTimeout(photoDialogErrorTimeout);
    setPhotoDialogErrorTimeout(null);
    setPhotoDialogError(null);
  }

  function createPhotoDialogBoxMessage() {
    let message = '';
    // If an error occured and there's no currently running timeout, the error is displayed
    // and a timeout for that error message is created
    if (photoDialogError !== null) {
      message = <span style={{ color: '#B63228' }}>{photoDialogError}</span>;
      if (photoDialogErrorTimeout === null) {
        // Shows the error message for 6 seconds and then returns back to normal text
        setPhotoDialogErrorTimeout(
          setTimeout(() => {
            setPhotoDialogErrorTimeout(null);
            setPhotoDialogError(null);
          }, 6000),
        );
      }
    }

    // If no error occured and the cropper is shown, the cropper text is displayed
    else if (cropperImageData) {
      message = 'Crop Photo to liking & Click Submit';
    }

    // If no error occured and the cropper is not shown, the pick a file text is displayed
    else {
      message = isMobile
        ? 'Tap Image to Browse Files'
        : 'Drag & Drop Picture, or Click to Browse Files';
    }
    return message;
  }

  function onCropperZoom(event) {
    if (event.detail.ratio > 1) {
      event.preventDefault();
      cropperRef.current.cropper.zoomTo(1);
    }
  }

  function onDropAccepted(fileList) {
    var previewImageFile = fileList[0];
    var reader = new FileReader();
    reader.onload = () => {
      imageOnLoadHelper(reader);
    };
    reader.readAsDataURL(previewImageFile);
  }

  async function onDropRejected() {
    await clearPhotoDialogErrorTimeout();
    setPhotoDialogError('Sorry, invalid image file! Only PNG and JPEG images are accepted.');
  }

  async function handleSubmit() {
    const newImage = cropperRef.current.cropper
      .getCroppedCanvas({ width: CROP_DIM })
      .toDataURL()
      .replace(/data:image\/[A-Za-z]{3,4};base64,/, '');

    let bannerItem = {
      Title: title,
      LinkURL: link,
      SortOrder: sortOrder,
      ImageData: newImage,
    };

    let result = await cmsService.submitSlide(bannerItem);
    if (result === undefined) {
      createSnackbar('Banner Submission Failed to Submit', 'error');
    } else {
      createSnackbar('Banner Submission Submitted Successfully', 'success');
      handleWindowClose();
      addBanner(result);
    }
  }

  function imageOnLoadHelper(reader) {
    var dataURL = reader.result.toString();
    var i = new Image();
    i.onload = async () => {
      var aRatio = i.width / i.height;
      setAspectRatio(aRatio);
      setPhotoDialogError(null);
      setAspectRatio(aRatio);
      setCropperImageData(dataURL);
    };
    i.src = dataURL;
  }

  return (
    <GordonDialogBox
      open={open}
      title="Make a new Banner"
      buttonClicked={handleSubmit}
      buttonName={'Submit'}
      isButtonDisabled={!Boolean(title && cropperImageData && sortOrder)}
      cancelButtonClicked={handleWindowClose}
      cancelButtonName="Cancel"
    >
      <TextField
        label="Subject"
        variant="filled"
        margin="dense"
        fullWidth
        name="newBannerTitle"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        helperText="Enter title to show if image fails to load"
        required
      />

      <TextField
        variant="filled"
        label="URL"
        margin="dense"
        fullWidth
        name="newBannerWebLink"
        value={link}
        onChange={(event) => setLink(event.target.value)}
        helperText="Enter URL that banner should link to, if any"
      />

      <div className="gc360_photo_dialog_box">
        <DialogContent className="gc360_photo_dialog_box_content">
          <DialogContentText className="gc360_photo_dialog_box_content_text">
            {createPhotoDialogBoxMessage()}
          </DialogContentText>
          {!cropperImageData && (
            <Dropzone
              onDropAccepted={onDropAccepted}
              onDropRejected={onDropRejected}
              accept="image/jpeg, image/jpg, image/png"
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div className="gc360_photo_dialog_box_content_dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                  </div>
                </section>
              )}
            </Dropzone>
          )}
          {cropperImageData && (
            <div className="gc360_photo_dialog_box_content_cropper">
              <Cropper
                ref={cropperRef}
                src={cropperImageData}
                autoCropArea={1}
                viewMode={3}
                aspectRatio={aspectRatio}
                highlight={false}
                background={false}
                zoom={onCropperZoom}
                zoomable={false}
                dragMode={'none'}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions className="gc360_photo_dialog_box_actions_top">
          {cropperImageData && (
            <Tooltip
              classes={{ tooltip: 'tooltip' }}
              id="tooltip-hide"
              title="Remove this image from the submission"
            >
              <Button
                variant="contained"
                onClick={() => setCropperImageData(null)}
                style={styles.cancelButton}
                className="gc360_photo_dialog_box_content_button"
              >
                Remove picture
              </Button>
            </Tooltip>
          )}
        </DialogActions>
      </div>

      <TextField
        id="outlined-number"
        variant="filled"
        label="Sort Order"
        type="number"
        margin="dense"
        fullWidth
        name="newBannerSortOrderNumber"
        value={sortOrder}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => setSortOrder(event.target.value)}
        required
      />
    </GordonDialogBox>
  );
};

export default NewBannerDialog;
