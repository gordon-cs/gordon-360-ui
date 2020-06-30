import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Dropzone from 'react-dropzone';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonBase from '@material-ui/core/ButtonBase';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import user from './../../../../services/user';
import { gordonColors } from '../../../../theme';
import LinksDialog from './Components/LinksDialog/index';
import { socialMediaInfo } from '../../../../socialMedia';
import { Link } from 'react-router-dom';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import './index.css';
import GordonLoader from '../../../../components/Loader';

export const Identification = props => {
  const CROP_DIM = 200; // pixels
  const [isImagePublic, setIsImagePublic] = useState(null);
  const [image, setImage] = useState(null);
  const [showCropper, setShowCropper] = useState(null);
  const [hasNickName, setHasNickname] = useState(Boolean);
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [photoDialogError, setPhotoDialogError] = useState(null);
  const [cropperData, setCropperData] = useState({ cropBoxDim: null, aspectRatio: null });
  const [socialLinksOpen, setSocialLinksOpen] = useState(false);
  const [facebookLink, setFacebookLink] = useState('');
  const [linkedInLink, setLinkedInLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);
  const [snackbarKey, setSnackbarKey] = useState(0); // A key to make every snackbar display unique
  const cropper = useRef();
  let photoDialogErrorTimeout = null;

  // Styles used throughout this component
  const style = {
    img: {
      width: '200px',
      height: '200px',
    },

    centerGridContainer: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
    },

    button: {
      background: gordonColors.primary.blue,
      color: 'white',

      changeImageButton: {
        background: gordonColors.primary.blue,
        color: 'white',
      },

      resetButton: {
        backgroundColor: '#f44336',
        color: 'white',
      },
      cancelButton: {
        backgroundColor: 'white',
        color: gordonColors.primary.blue,
        border: `1px solid ${gordonColors.primary.blue}`,
        width: showCropper ? '38%' : '86%',
      },
      hidden: {
        display: 'none',
      },
    },
    socialMediaButton: {
      color: gordonColors.primary.cyan,
      fontSize: '1rem',
    },
  };

  /**
   * Loads the user's profile info only once (at start)
   */
  useEffect(() => {
    async function loadUserProfile() {
      try {
        const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
          await user.getImage(),
        ]);
        const image = preferredImage || defaultImage;
        setImage(image);
        setIsImagePublic(props.profile.show_pic);
        createNickname(props.profile);
      } catch (error) {
        // Do Nothing
      }
      // Set state of social media links to database values after load.
      // If not empty, null, or undefined, add domain name back in for display and buttons.
      setFacebookLink(
        !props.profile.Facebook || props.profile.Facebook === ''
          ? ''
          : socialMediaInfo.facebook.prefix + props.profile.Facebook,
      );
      setTwitterLink(
        !props.profile.Twitter || props.profile.Twitter === ''
          ? ''
          : socialMediaInfo.twitter.prefix + props.profile.Twitter,
      );
      setLinkedInLink(
        !props.profile.LinkedIn || props.profile.LinkedIn === ''
          ? ''
          : socialMediaInfo.linkedIn.prefix + props.profile.LinkedIn,
      );
      setInstagramLink(
        !props.profile.Instagram || props.profile.Instagram === ''
          ? ''
          : socialMediaInfo.instagram.prefix + props.profile.Instagram,
      );
    }
    loadUserProfile();
  }, [props.profile]);

  /**
   * Handles opening the Photo Updater Dialog Box
   */
  function handlePhotoOpen() {
    setOpenPhotoDialog(true);
  }

  /**
   * Handles submission of a new photo in the Photo Updater Dialog Box
   */
  function handleCloseSubmit() {
    if (showCropper != null) {
      setOpenPhotoDialog(false);
      setShowCropper(null);
      var croppedImage = cropper.current.getCroppedCanvas({ width: CROP_DIM }).toDataURL();
      var imageNoHeader = croppedImage.replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
      setImage(imageNoHeader);
      user.postImage(croppedImage);
      window.didProfilePicUpdate = true;
      setSnackbarMessage('Photo Submitted');
      // Sets the snackbar key as either 0 or 1. This prevents a high number being made.
      setSnackbarKey((snackbarKey + 1) % 2);
      setIsSnackbarOpen(true);
    }
  }

  /**
   * Handles closing the Photo Updater Dialog Box
   */
  async function handleCloseCancel() {
    setOpenPhotoDialog(false);
    setShowCropper(null);
    await clearPhotoDialogErrorTimeout();
  }

  /**
   * Handles when the user chooses to reset their image to the original picture
   */
  async function handleResetImage() {
    // Creates a promise to allow async to force for the user's image to reset before fetching it
    let imageSet = new Promise((resolve, reject) => {
      resolve(user.resetImage());
    });
    // Once the promise resolves, a fetch is made to receive the user's original photo
    await imageSet.then(async () => {
      try {
        const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
          await user.getImage(),
        ]);
        const image = preferredImage || defaultImage;
        setImage(image);
      } catch (error) {
        // Do Nothing
      }
    });
    window.didProfilePicUpdate = true;
    setOpenPhotoDialog(false);
    setShowCropper(null);
    await clearPhotoDialogErrorTimeout();
    setSnackbarMessage('Original Photo Restored');
    // Sets the snackbar key as either 0 or 1. This prevents a high number being made.
    setSnackbarKey((snackbarKey + 1) % 2);
    setIsSnackbarOpen(true);
  }

  /**
   * Handles when the user chooses to hide or show their public profile picture
   */
  async function toggleImagePrivacy() {
    setOpenPhotoDialog(false);
    setShowCropper(null);
    await clearPhotoDialogErrorTimeout();
    setIsImagePublic(!isImagePublic);
    await user.setImagePrivacy(isImagePublic);
    setSnackbarMessage(isImagePublic ? 'Public Photo Hidden' : ' Public Photo Visible');
    // Sets the snackbar key as either 0 or 1. This prevents a high number being made.
    setSnackbarKey((snackbarKey + 1) % 2);
    setIsSnackbarOpen(true);
  }

  /**
   * Handles opening the Social Media Dialog Box
   */
  function handleSocialLinksOpen() {
    setSocialLinksOpen(true);
  }

  /**
   * Handles closing the Social Media Dialog Box
   */
  function handleSocialLinksClose() {
    setSocialLinksOpen(false);
  }

  /**
   * Clears the timeout of the Photo Dialog error message.
   *
   * If an error occured while the Photo Dialog was open, then a timeout for displaying the error
   * message was created. That timeout is cleared and the error message is deleted. This can be used
   * to stop or remove the timeout to allow another one to be made (prevents memory leaks of
   * unreferenced timeouts)
   */
  async function clearPhotoDialogErrorTimeout() {
    return new Promise((resolve, reject) => {
      clearTimeout(photoDialogErrorTimeout);
      photoDialogErrorTimeout = null;
      setPhotoDialogError(null);
      resolve(true);
    });
  }

  /**
   * Creates the Photo Dialog message that will be displayed to the user
   *
   * @return {String} The message of the Photo Dialog
   */
  function createPhotoDialogMessage() {
    let message = '';
    // If an error occured and there's no currently running timeout, the error is displayed
    // and a timeout for that error message is created
    if (photoDialogError !== null) {
      message = <span style={{ color: '#B63228' }}>{photoDialogError}</span>;
      if (photoDialogErrorTimeout === null) {
        // Shows the error message for 6 seconds and then returns back to normal text
        photoDialogErrorTimeout = setTimeout(() => {
          photoDialogErrorTimeout = null;
          setPhotoDialogError(null);
        }, 6000);
      }
    }
    // If no error occured and the cropper is shown, the cropper text is displayed
    else if (showCropper) {
      message = 'Crop Photo to liking & Click Submit';
    }
    // If no error occured and the cropper is not shown, the pick a file text is displayed
    else {
      message =
        props.width === 'md' || props.width === 'sm' || props.width === 'xs'
          ? 'Tap Image to Browse Files'
          : 'Drag & Drop Picture, or Click to Browse Files';
    }
    return message;
  }

  /**
   * Handles the submission of the Social Media links
   *
   * @param {String} fb The inputed Facebook link
   * @param {String} tw The inputed Twitter link
   * @param {String} li The inputed LinkedIn link
   * @param {String} ig The inputed Instagram link
   */
  async function onDialogSubmit(fb, tw, li, ig) {
    // For links that have changed, update state
    // and send change to database.
    if (fb !== facebookLink) {
      setFacebookLink(fb);
      user.updateSocialLink('facebook', fb);
    }
    if (tw !== twitterLink) {
      setTwitterLink(tw);
      user.updateSocialLink('twitter', tw);
    }
    if (li !== linkedInLink) {
      setLinkedInLink(li);
      user.updateSocialLink('linkedin', li);
    }
    if (ig !== instagramLink) {
      user.updateSocialLink('instagram', ig);
      setInstagramLink(ig);
    }
    setSnackbarMessage('Social Media Updated');
    // Sets the snackbar key as either 0 or 1. This prevents a high number being made.
    setSnackbarKey((snackbarKey + 1) % 2);
    setIsSnackbarOpen(true);
  }

  function maxCropPreviewWidth() {
    // see IDUploader/index.js > maxCropPreviewWidth for commented out code
    // that seemed to have finer tuned logic
    const smallScreenRatio = 0.5;
    const largeScreenRatio = 0.25;
    const w = props.width;
    switch (w) {
      default:
        return 960 * largeScreenRatio;
      case 'xs':
        return 360 * smallScreenRatio;
      case 'sm':
        return 600 * smallScreenRatio;
      case 'md':
        return 960 * largeScreenRatio;
      case 'lg':
        return 1280 * largeScreenRatio;
      case 'xl':
        return 1920 * largeScreenRatio;
    }
  }

  function minCropBoxDim(imgWidth, dispWidth) {
    return (CROP_DIM * dispWidth) / imgWidth;
  }

  /**
   * Handles the acceptance of the user dropping an image in the Photo Updater Dialog Box
   *
   * @param {*} fileList The image dropped in the Dropzone of the Photo Updater
   */
  function onDropAccepted(fileList) {
    var previewImageFile = fileList[0];
    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result.toString();
      var i = new Image();
      i.onload = async () => {
        if (i.width < CROP_DIM || i.height < CROP_DIM) {
          await clearPhotoDialogErrorTimeout();
          setPhotoDialogError(
            'Sorry, your image is too small! Image dimensions must be at least 200 x 200 pixels.',
          );
        } else {
          var aRatio = i.width / i.height;
          setCropperData({ aspectRatio: aRatio });
          var maxWidth = maxCropPreviewWidth();
          var displayWidth = maxWidth > i.width ? i.width : maxWidth;
          var cropDim = minCropBoxDim(i.width, displayWidth);
          setCropperData({ aspectRatio: aRatio, cropBoxDim: cropDim });
          setShowCropper(dataURL);
        }
      };
      i.src = dataURL;
    };
    reader.readAsDataURL(previewImageFile);
  }

  /**
   * Handles the rejection of the user dropping an invalid file in the Photo Updater Dialog Box
   */
  async function onDropRejected() {
    await clearPhotoDialogErrorTimeout();
    setPhotoDialogError('Sorry, invalid image file! Only PNG and JPEG images are accepted.');
  }

  function onCropperZoom(event) {
    if (event.detail.ratio > 1) {
      event.preventDefault();
      cropper.current.zoomTo(1);
    }
  }

  /**
   * Closes the Snackbar
   * @param {Event} event The Event object of closing out the Snackbar
   * @param {String} reason The reason for closing out the Snackbar
   */
  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  }

  // Saves the nickname of the current user if available
  function createNickname(profile) {
    let Name = String(profile.fullName);
    let FirstName = Name.split(' ')[0];
    setHasNickname(FirstName !== profile.NickName && profile.NickName !== '');
  }

  /**
   * Creates the Photo Updater Dialog Box
   *
   * @return {JSX} The JSX of the Photo Updater
   */
  function createPhotoDialog() {
    return (
      <Dialog
        className="gc360-photo-dialog"
        open={openPhotoDialog}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="gc360-photo-dialog-box">
          <DialogTitle className="gc360-photo-dialog-box_title">Update Photo</DialogTitle>
          <DialogContent className="gc360-photo-dialog-box_content">
            <DialogContentText className="gc360-photo-dialog-box_content_text">
              {createPhotoDialogMessage()}
            </DialogContentText>
            {!showCropper && (
              <Dropzone
                onDropAccepted={onDropAccepted}
                onDropRejected={onDropRejected}
                accept="image/jpeg, image/jpg, image/png"
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div className="gc360-photo-dialog-box_content_dropzone" {...getRootProps()}>
                      <input {...getInputProps()} />
                      <img
                        className="gc360-photo-dialog-box_content_dropzone_img"
                        src={`data:image/jpg;base64,${image}`}
                        alt="Profile"
                      />
                    </div>
                  </section>
                )}
              </Dropzone>
            )}
            {showCropper && (
              <div className="gc360-photo-dialog-box_content_cropper">
                <Cropper
                  ref={cropper}
                  src={showCropper}
                  style={{
                    'max-width': maxCropPreviewWidth(),
                    'max-height': maxCropPreviewWidth() / cropperData.aspectRatio,
                  }}
                  autoCropArea={1}
                  viewMode={3}
                  aspectRatio={1}
                  highlight={false}
                  background={false}
                  zoom={onCropperZoom}
                  zoomable={false}
                  dragMode={'none'}
                  minCropBoxWidth={cropperData.cropBoxDim}
                  minCropBoxHeight={cropperData.cropBoxDim}
                />
              </div>
            )}
          </DialogContent>
          <DialogActions className="gc360-photo-dialog-box_actions-top">
            {showCropper && (
              <Button
                variant="contained"
                onClick={() => setShowCropper(null)}
                style={style.button.changeImageButton}
                className="gc360-photo-dialog-box_content_button"
              >
                Go Back
              </Button>
            )}
          </DialogActions>
          {!showCropper && (
            <DialogActions className="gc360-photo-dialog-box_actions-middle">
              <Tooltip
                classes={{ tooltip: 'tooltip' }}
                id="tooltip-hide"
                title={
                  isImagePublic
                    ? 'Only faculty and police will see your photo'
                    : 'Make photo visible to other students'
                }
              >
                <Button variant="contained" onClick={toggleImagePrivacy} style={style.button}>
                  {isImagePublic ? 'Hide' : 'Show'}
                </Button>
              </Tooltip>
              <Tooltip
                classes={{ tooltip: 'tooltip' }}
                id="tooltip-reset"
                title="Restore your original ID photo"
              >
                <Button
                  variant="contained"
                  onClick={handleResetImage}
                  style={style.button.resetButton}
                >
                  Reset
                </Button>
              </Tooltip>
            </DialogActions>
          )}
          <DialogActions className="gc360-photo-dialog-box_actions-bottom">
            <Button
              variant="contained"
              onClick={handleCloseCancel}
              style={style.button.cancelButton}
            >
              Cancel
            </Button>
            <Tooltip
              classes={{ tooltip: 'tooltip' }}
              id="tooltip-submit"
              title="Crop to current region and submit"
            >
              <Button
                variant="contained"
                onClick={handleCloseSubmit}
                disabled={!showCropper}
                style={showCropper ? style.button : style.button.hidden}
              >
                Submit
              </Button>
            </Tooltip>
          </DialogActions>
        </div>
      </Dialog>
    );
  }

  let linksDialog = (
    <LinksDialog
      onDialogSubmit={onDialogSubmit}
      handleSocialLinksClose={handleSocialLinksClose}
      facebookLink={facebookLink}
      twitterLink={twitterLink}
      linkedInLink={linkedInLink}
      instagramLink={instagramLink}
    />
  );

  // Defines which social media icons will display
  let facebookButton;
  let twitterButton;
  let linkedInButton;
  let instagramButton;
  let editButton;
  let linkCount = 0; // To record whether or not any links are displayed

  if (facebookLink !== '') {
    facebookButton = (
      <Grid item>
        <a
          href={facebookLink}
          className="gc360-my-profile_icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          {socialMediaInfo.facebook.icon}
        </a>
      </Grid>
    );
    linkCount += 1;
  }
  if (twitterLink !== '') {
    twitterButton = (
      <Grid item>
        <a
          href={twitterLink}
          className="gc360-my-profile_icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          {socialMediaInfo.twitter.icon}
        </a>
      </Grid>
    );
    linkCount += 1;
  }
  if (linkedInLink !== '') {
    linkedInButton = (
      <Grid item>
        <a
          href={linkedInLink}
          className="gc360-my-profile_icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          {socialMediaInfo.linkedIn.icon}
        </a>
      </Grid>
    );
    linkCount += 1;
  }
  if (instagramLink !== '') {
    instagramButton = (
      <Grid item>
        <a
          href={instagramLink}
          className="gc360-my-profile_icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          {socialMediaInfo.instagram.icon}
        </a>
      </Grid>
    );
    linkCount += 1;
  }
  if (linkCount > 0) {
    editButton = (
      <Grid item>
        <IconButton className="gc360-my-profile_edit-icon" onClick={handleSocialLinksOpen}>
          {socialMediaInfo.edit.icon}
        </IconButton>
      </Grid>
    );
  } else {
    editButton = (
      <Grid container justify="center">
        <Button onClick={handleSocialLinksOpen} style={style.socialMediaButton}>
          EDIT SOCIAL MEDIA LINKS
        </Button>
      </Grid>
    );
  }

  // RETURNS THE JSX OF THE IDENTIFICATION CARD
  return (
    <div className="identification">
      <div className="identification-card">
        <Grid container className="identification-card-header">
          <CardHeader title="Identification" />
        </Grid>

        <div className="identification-card-content">
          {/* SHOWS THE CARD'S CONTENT IF USER'S INFORMATION IS AVAILABLE. OTHERWISE A LOADER */}
          {props.profile && image ? (
            <Grid container className="identification-card-content-card" justify="center">
              <Grid
                container
                className="identification-card-content-card-container"
                alignItems="center"
                justify="space-evenly"
              >
                <Grid item className="identification-card-content-card-container-photo">
                  <ButtonBase
                    onClick={handlePhotoOpen}
                    className="identification-card-content-card-container-photo-button"
                  >
                    <img
                      className="identification-card-content-card-container-photo-button-image"
                      src={`data:image/jpg;base64,${image}`}
                      alt="Profile"
                    />
                    <GridListTileBar
                      className="identification-card-content-card-container-photo-button-tile-bar"
                      title="Photo Options"
                    />
                  </ButtonBase>
                </Grid>

                <Grid item className="identification-card-content-card-container-info">
                  <Grid
                    item
                    className="identification-card-content-card-container-info-social-media"
                  >
                    <Grid container justify="space-between" alignItems="center">
                      {facebookButton}
                      {twitterButton}
                      {linkedInButton}
                      {instagramButton}
                      {editButton}
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    className="identification-card-content-card-container-info-class"
                  >
                    <Typography>{props.profile.Class}</Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    className="identification-card-content-card-container-info-name"
                  >
                    <Typography variant="h6" paragraph>
                      {hasNickName
                        ? props.profile.fullName + ' (' + props.profile.NickName + ')'
                        : props.profile.fullName}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    className="identification-card-content-card-container-info-email"
                  >
                    <a href={`mailto:${props.profile.Email}`}>
                      <div className="identification-card-content-card-container-info-email-container">
                        <EmailIcon className="identification-card-content-card-container-info-email-container-icon" />
                        <Typography paragraph>{props.profile.Email}</Typography>
                      </div>
                    </a>
                  </Grid>

                  {createPhotoDialog()}

                  <Dialog
                    open={socialLinksOpen}
                    disableBackdropClick
                    onClose={handleSocialLinksClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                  >
                    {linksDialog}
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <GordonLoader />
          )}

          <Link
            to={`/profile/${props.profile.AD_Username}`}
            className="identification-card-content-public-profile-link"
          >
            <Button
              className="identification-card-content-public-profile-link-button"
              variant="contained"
            >
              View My Public Profile
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          // Makes every snackbar unique to prevent the same snackbar from being updated
          key={snackbarKey.toString()}
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id">
              <CheckCircleIcon
                style={{
                  marginBottom: '-4.5pt',
                  marginRight: '0.5rem',
                }}
              />
              {snackbarMessage}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    </div>
  );
};
