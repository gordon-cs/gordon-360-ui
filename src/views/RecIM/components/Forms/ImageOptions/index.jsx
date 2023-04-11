import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import Dropzone from 'react-dropzone';
import GordonLoader from 'components/Loader';
import { editActivity } from 'services/recim/activity';
import { editTeam } from 'services/recim/team';
import Cropper from 'react-cropper';
import defaultLogo from 'views/RecIM/recim_logo.png';

const CROPPER_WIDTH = 300;
const ASPECT_RATIO = 1;

const ImageOptions = ({
  category,
  createSnackbar,
  onClose,
  component,
  openImageOptions,
  setOpenImageOptions,
}) => {
  const [cropperImageData, setCropperImageData] = useState();
  const [photoDialogErrorTimeout, setPhotoDialogErrorTimeout] = useState();
  const [photoDialogError, setPhotoDialogError] = useState();
  const [showCropper, setShowCropper] = useState(false);
  const [imageWidth, setImageWidth] = useState();
  const [imageHeight, setImageHeight] = useState();
  const cropperRef = useRef();
  const [loading, setLoading] = useState(false);

  // load ImageOptions
  useEffect(() => {
    // setLoading(true);
    loadImageOptions().then(() => setLoading(false));
  }, []);

  const loadImageOptions = () => {
    return new Promise((resolve, reject) => {
      let dataURL = component?.Logo ?? defaultLogo;
      let i = new Image();
      i.onload = () => {
        let aRatio = i.width / i.height;
        setImageWidth(CROPPER_WIDTH);
        setImageHeight(CROPPER_WIDTH / aRatio);
        setCropperImageData(dataURL);
        resolve();
      };
      i.src = dataURL;
    });
  };

  const handleWindowClose = () => {
    setOpenImageOptions(false);
    setCropperImageData(null);
  };

  /**
   * Handles closing the Photo Updater Dialog Box
   */
  const handleCloseCancel = async () => {
    setOpenImageOptions(false);
    setShowCropper(null);
    clearPhotoDialogErrorTimeout();
  };

  /**
   * This doesn't replace the custom image with the default Rec-IM logo in database,
   * rather it set the Logo to null
   */
  const handleResetImage = async () => {
    switch (category) {
      // reset Logo on Rec-IM Activity page
      case 'Activity': {
        let activityRequest = {
          Logo: null,
          IsLogoUpdate: true,
        };

        editActivity(component.ID, activityRequest)
          .then(() => {
            createSnackbar('Activity logo set to default successfully', 'success');
            onClose();
            handleWindowClose();
          })
          .catch((reason) => {
            createSnackbar(
              `There was a problem setting the logo to default: ${reason.title}`,
              'error',
            );
          });
        break;
      }
      // reset Logo on Rec-IM Team page
      case 'Team': {
        let teamRequest = {
          Logo: null,
          IsLogoUpdate: true,
        };

        editTeam(component.ID, teamRequest)
          .then(() => {
            createSnackbar('Team Logo set to default successfully', 'success');
            onClose();
            handleWindowClose();
          })
          .catch((reason) => {
            createSnackbar(
              `There was a problem setting the logo to default: ${reason.title}`,
              'error',
            );
          });
        break;
      }
      default: {
        break;
      }
    }
  };

  /**
   * This doesn't replace the custom image with the default Rec-IM logo in database,
   * rather it set the Logo to null
   */
  const handleCloseSubmit = async () => {
    switch (category) {
      // update Logo on Rec-IM Activity page
      case 'Activity': {
        let activityRequest = {
          Logo: cropperRef.current.cropper.getCroppedCanvas({ width: CROPPER_WIDTH }).toDataURL(),
          IsLogoUpdate: true,
        };
        //console.log(cropperRef);

        console.log('cropperImageData: ', cropperImageData);

        editActivity(component.ID, activityRequest)
          .then(() => {
            createSnackbar('Activity logo edited successfully', 'success');
            onClose();
            handleWindowClose();
          })
          .catch((reason) => {
            createSnackbar(
              `There was a problem editing the activity logo: ${reason.title}`,
              'erorr',
            );
          });
        break;
      }
      // update Logo on Rec-IM Team page
      case 'Team': {
        let teamRequest = {
          Logo: cropperRef.current.cropper.getCroppedCanvas({ width: CROPPER_WIDTH }).toDataURL(),
          IsLogoUpdate: true,
        };

        editTeam(component.ID, teamRequest)
          .then(() => {
            createSnackbar('Team logo edited successfully', 'success');
            onClose();
            handleWindowClose();
          })
          .catch((reason) => {
            createSnackbar(`There was a problem editing your team logo: ${reason.title}`, 'error');
          });
        break;
      }
      default: {
        break;
      }
    }
  };

  /************************************************************************
  /*Following functions are solely related to photo submission via Cropper*
  /***********************************************************************/

  function onCropperZoom(event) {
    if (event.detail.ratio > 1) {
      event.preventDefault();
      cropperRef.current.cropper.zoomTo(1);
    }
  }

  function imageOnLoadHelper(reader) {
    var dataURL = reader.result.toString();
    var i = new Image();
    i.onload = async () => {
      setPhotoDialogError(null);
      setCropperImageData(dataURL);
    };
    i.src = dataURL;
  }

  const clearPhotoDialogErrorTimeout = async () => {
    clearTimeout(photoDialogErrorTimeout);
    setPhotoDialogErrorTimeout(null);
    setPhotoDialogError(null);
  };

  /**
   * Creates the Photo Dialog message that will be displayed to the user
   *
   * @returns {string} The message of the Photo Dialog
   */
  function createPhotoDialogBoxMessage() {
    let message = '';

    // If an error occured and there's no currently running timeout, the error is displayed
    // and a timeout for that error message is created
    if (photoDialogError != null) {
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
      message = 'Select an image then crop to desired dimensions';
    }
    // If no error occured and the cropper is not shown, the pick a file text is displayed
    else {
      message = isMobile
        ? 'Tap Image to Browse Files'
        : 'Drag & Drop Picture, or Click to Browse Files';
    }
    return message;
  }

  /**
   * Handles the acceptance of the user dropping an image in the Photo Uploader in News submission
   *
   * @param {*} fileList The image dropped in the Dropzone of the Photo Uploader
   */
  const onDropAccepted = (fileList) => {
    var previewImageFile = fileList[0];
    var reader = new FileReader();
    reader.onload = () => {
      imageOnLoadHelper(reader);
    };
    reader.readAsDataURL(previewImageFile);
    setShowCropper(true);
  };

  /**
   * Handles the rejection of the user dropping an invalid file in the Photo Updater Dialog Box
   * Copied from Identification
   */
  const onDropRejected = async () => {
    await clearPhotoDialogErrorTimeout();
    setPhotoDialogError('Sorry, invalid image file! Only PNG and JPEG images are accepted.');
  };

  /**
   * Creates the Photo Updater Dialog Box
   *
   * @returns {JSX} The JSX of the Photo Updater
   */
  function createPhotoDialogBox() {
    let content;
    if (loading) {
      content = <GordonLoader />;
    } else {
      content = (
        <Dialog
          className="gc360_photo_dialog"
          open={openImageOptions}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="gc360_photo_dialog_box">
            <DialogTitle className="gc360_photo_dialog_box_title">Update Photo</DialogTitle>
            <DialogContent className="gc360_photo_dialog_box_content">
              <DialogContentText className="gc360_photo_dialog_box_content_text">
                {createPhotoDialogBoxMessage()}
              </DialogContentText>
              {!showCropper && (
                <Dropzone
                  onDropAccepted={onDropAccepted}
                  onDropRejected={onDropRejected}
                  accept="image/jpeg, image/jpg, image/png"
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        className="gc360_photo_dialog_box_content_dropzone"
                        style={{ height: imageHeight, width: imageWidth }}
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <img
                          className="gc360_photo_dialog_box_content_dropzone_img"
                          src={cropperImageData}
                          alt="Logo"
                        />
                      </div>
                    </section>
                  )}
                </Dropzone>
              )}
              {showCropper && (
                <div className="gc360_photo_dialog_box_content_cropper">
                  <Cropper
                    ref={cropperRef}
                    src={cropperImageData}
                    style={{
                      maxWidth: CROPPER_WIDTH,
                      maxHeight: CROPPER_WIDTH,
                    }}
                    autoCropArea={1}
                    viewMode={3}
                    aspectRatio={ASPECT_RATIO}
                    highlight={false}
                    background={false}
                    zoom={onCropperZoom}
                    zoomable={false}
                    dragMode={'none'}
                    checkCrossOrigin={false}
                  />
                </div>
              )}
            </DialogContent>
            <DialogActions className="gc360_photo_dialog_box_actions_top">
              {showCropper && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setShowCropper(null);
                  }}
                  className="gc360_photo_dialog_box_content_button"
                >
                  Go Back
                </Button>
              )}
            </DialogActions>
            <DialogActions className="gc360_photo_dialog_box_actions_bottom">
              {!showCropper && (
                <Tooltip
                  classes={{ tooltip: 'tooltip' }}
                  id="tooltip-reset"
                  title="Reset the Rec-IM logo to default Logo"
                >
                  <Button variant="contained" color="error" onClick={handleResetImage}>
                    Reset
                  </Button>
                </Tooltip>
              )}
              <Button variant="outlined" color="primary" onClick={handleCloseCancel}>
                Cancel
              </Button>
              {showCropper && (
                <Tooltip
                  classes={{ tooltip: 'tooltip' }}
                  id="tooltip-submit"
                  title="Crop to current region and submit"
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCloseSubmit}
                    disabled={!showCropper}
                  >
                    Submit
                  </Button>
                </Tooltip>
              )}
            </DialogActions>
          </div>
        </Dialog>
      );
    }
    return content;
  }

  return <>{createPhotoDialogBox()}</>;
};

export default ImageOptions;
