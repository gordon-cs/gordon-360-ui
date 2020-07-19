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
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import user from '../../services/user';
import { gordonColors } from '../../theme';
import LinksDialog from './Components/LinksDialog/index';
import { socialMediaInfo } from '../../socialMedia';
import { Link } from 'react-router-dom';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import defaultGordonImage from './defaultGordonImage';
import GordonLoader from '../Loader/index';
import { windowBreakWidths } from '../../theme';
import './index.css';

export const Identification = props => {
  const CROP_DIM = 200; // pixels
  const [isImagePublic, setIsImagePublic] = useState(null);
  const [defaultUserImage, setDefaultUserImage] = useState(null);
  const [preferredUserImage, setPreferredUserImage] = useState(null);
  const [hasPreferredImage, seHasPreferredImage] = useState(true);
  const [switchPhotos, setSwitchPhotos] = useState(false);
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
  const [snackbarType, setSnackbarType] = useState(''); // Either success or error
  const [userProfile, setUserProfile] = useState(null);
  const [currentWidth, setCurrentWidth] = useState(null);
  const cropper = useRef();
  let photoDialogErrorTimeout = null;

  // Styles used throughout this component
  const style = {
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
   * Loads the user's profile info at start
   */
  useEffect(() => {
    async function loadUserProfile() {
      try {
        const { def: defaultImage, pref: preferredImage } = await user.getImage(
          props.profile.AD_Username,
        );
        setUserProfile(props.profile);
        // Sets the user's preferred image. If a default image is given but the preferred is undefined,
        // then this could mean that the current user is not allowed to see the preferred image or
        // a preferred image wasn't set
        setPreferredUserImage(preferredImage);
        seHasPreferredImage(preferredImage ? true : false);
        // Sets the user's default image. If a preferred image is given but the default is undefined,
        // then this, means that the current user is not allowed to see the default picture. The
        // Gordon default image is only shown if both the preferred and default image are undefined
        setDefaultUserImage(defaultImage || (preferredImage ? null : defaultGordonImage));
        setIsImagePublic(props.profile.show_pic);
        createNickname(props.profile);
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
      } catch (error) {
        // Do Nothing
      }
    }

    loadUserProfile();
  }, [props.profile]);

  /**
   * Gets the current breakpoint according to Material-UI's breakpoints
   */
  useEffect(() => {
    if (props.myProf) {
      // Gets the current Material-UI Breakpoint
      function getMaterialUIBreakpoint(width) {
        let currentWidth = '';
        // If current width is in Material-UI breakpoint XS
        if (width >= windowBreakWidths.breakXS && width < windowBreakWidths.breakSM) {
          currentWidth = 'xs';
        }
        // If current width is in Material-UI breakpoint SM
        else if (width >= windowBreakWidths.breakSM && width < windowBreakWidths.breakMD) {
          currentWidth = 'sm';
        }
        // If current width is in Material-UI breakpoint MD
        else if (width >= windowBreakWidths.breakMD && width < windowBreakWidths.breakLG) {
          currentWidth = 'md';
        }
        // If current width is in Material-UI breakpoint LG
        else if (width >= windowBreakWidths.breakLG && width < windowBreakWidths.breakXL) {
          currentWidth = 'lg';
        }
        // If current width is in Material-UI breakpoint XL
        else if (width >= windowBreakWidths.breakXL) {
          currentWidth = 'xl';
        }
        return currentWidth;
      }

      // An event listener for when the browser size changes to get the current Material-UI breakpoint
      window.addEventListener('resize', event => {
        setCurrentWidth(getMaterialUIBreakpoint(event.target.innerWidth));
      });
      // Sets the current Material-UI Breakpoint
      setCurrentWidth(getMaterialUIBreakpoint(window.innerWidth));
      // Removes the resize window event listener
      return window.removeEventListener('resize', () => {});
    }
  }, [props.myProf]);

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
      let croppedImage = cropper.current.getCroppedCanvas({ width: CROP_DIM }).toDataURL();
      let newImage = croppedImage.replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
      let response = user.postImage(croppedImage);
      response
        .then(async () => {
          /**
           * Gets the user's default image and not their preferred since the variable "newImage"
           * is the current user's preferred picture. If fetching the current user's default image
           * fails, the Gordon Default Image will not replace it because we still have their
           * preferred image to show. The Gordon Default Image is only a fallback when no image is
           * available
           */
          const { def: defaultImage } = await user.getImage(userProfile.AD_Username);
          // Sets the current user's preferred image
          setPreferredUserImage(newImage);
          seHasPreferredImage(newImage ? true : false);
          // Sets the current user's default image
          setDefaultUserImage(defaultImage ? defaultImage : null);
          // Displays to the user that their photo has been submitted
          createSnackbar('Photo Submitted', 'Success');
          // Closes out the Photo Updater
          setOpenPhotoDialog(false);
          setShowCropper(null);
          window.postMessage('update-profile-picture', window.location.origin);
        })
        .catch(() => {
          // Displays to the user that their photo failed to submit
          createSnackbar('Photo Submission Failed', 'Error');
        });
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
   * Handles the switch of showing the default and preferred image
   */
  function handlePhotoSwitch() {
    setSwitchPhotos(!switchPhotos);
  }

  /**
   * Handles when the user chooses to reset their image to the original picture
   */
  async function handleResetImage() {
    // Creates a promise to allow async to force for the user's image to reset before fetching it
    // Does a post to the server in attempt to reset the user's image
    let response = user.resetImage();

    // Promised Resolved - Fetch for user's original image
    await response
      .then(async () => {
        // Attempts to get the user's image since it has been reset
        try {
          const { def: defaultImage } = await user.getImage(userProfile.AD_Username);
          setDefaultUserImage(defaultImage);
          // Displays to the user that their photo has been restored
          createSnackbar('Original Photo Restored', 'Success');
        } catch {
          setDefaultUserImage(defaultGordonImage);
          // Displays to the user that getting their original photo failed
          createSnackbar('Failed Retrieving Photo', 'Error');
        }
        // Deletes the preferred image, clears any timeouts errors and closes out of the photo updater
        await clearPhotoDialogErrorTimeout();
        setPreferredUserImage(null);
        seHasPreferredImage(false);
        setOpenPhotoDialog(false);
        window.postMessage('update-profile-picture', window.location.origin);
      })
      // Promised Rejected - Display error to the user
      .catch(() => {
        // Displays to the user that resetting their photo failed
        createSnackbar('Failed To Reset Photo', 'Error');
      });
  }

  /**
   * Displays the snackbar to the user.
   * @param {String} message The message to display to the user
   * @param {String} messageType The message's type. Either a success or error
   */
  function createSnackbar(message, messageType) {
    setSnackbarMessage(message);
    setSnackbarType(messageType);
    // Sets the snackbar key as either 0 or 1. This prevents a high number being made.
    setSnackbarKey((snackbarKey + 1) % 2);
    setIsSnackbarOpen(true);
  }

  /**
   * Handles when the user chooses to hide or show their public profile picture
   */
  async function toggleImagePrivacy() {
    // Attempts to change the user's privacy
    let changedPrivacy = await user
      .setImagePrivacy(isImagePublic)
      .then(async () => {
        // Closes out of Photo Updater and removes any error messages
        await clearPhotoDialogErrorTimeout();
        setOpenPhotoDialog(false);
        setShowCropper(null);
        setIsImagePublic((isImagePublic + 1) % 2);
        return true;
      })
      .catch(() => {
        return false;
      });
    // User's image privacy successfully changed
    if (changedPrivacy) {
      createSnackbar(isImagePublic ? 'Public Photo Hidden' : ' Public Photo Visible', 'Success');
    }
    // User's image privacy failed to change
    else {
      createSnackbar('Privacy Change Failed', 'Error');
    }
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
  function createPhotoDialogBoxMessage() {
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
        currentWidth === 'md' || currentWidth === 'sm' || currentWidth === 'xs'
          ? 'Tap Image to Browse Files'
          : 'Drag & Drop Picture, or Click to Browse Files';
    }
    return message;
  }

  function maxCropPreviewWidth() {
    // see IDUploader/index.js > maxCropPreviewWidth for commented out code
    // that seemed to have finer tuned logic
    const smallScreenRatio = 0.5;
    const largeScreenRatio = 0.25;
    const w = currentWidth;
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
          setPhotoDialogError(null);
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
  function createPhotoDialogBox() {
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
                    <div className="gc360-photo-dialog-box_content_dropzone" {...getRootProps()}>
                      <input {...getInputProps()} />
                      <img
                        className="gc360-photo-dialog-box_content_dropzone_img"
                        src={`data:image/jpg;base64,${preferredUserImage || defaultUserImage}`}
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

  let linksDialog =
    props.network === 'online' ? (
      <LinksDialog
        createSnackbar={createSnackbar}
        handleSocialLinksClose={handleSocialLinksClose}
        facebookLink={facebookLink}
        setFacebookLink={setFacebookLink}
        twitterLink={twitterLink}
        setTwitterLink={setTwitterLink}
        linkedInLink={linkedInLink}
        setLinkedInLink={setLinkedInLink}
        instagramLink={instagramLink}
        setInstagramLink={setInstagramLink}
      />
    ) : (
      <></>
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
          {userProfile && <CardHeader title={`${userProfile.FirstName}'s Profile`} />}
          {!userProfile && <CardHeader title="My Personal Profile" />}
        </Grid>

        <div className="identification-card-content">
          {/* SHOWS THE CARD'S CONTENT IF USER'S INFORMATION IS AVAILABLE. OTHERWISE A LOADER */}
          {userProfile && (defaultUserImage || preferredUserImage) ? (
            <Grid container className="identification-card-content-card" justify="center">
              <Grid
                container
                className="identification-card-content-card-container"
                alignItems="center"
                justify="space-evenly"
              >
                <Grid item className="identification-card-content-card-container-photo">
                  <div className="identification-card-content-card-container-photo-main">
                    <div className="identification-card-content-card-container-photo-main-container">
                      <img
                        className="identification-card-content-card-container-photo-main-container-image"
                        src={`data:image/jpg;base64,${
                          // Checks to see if the default and preferred photos should switch between bubbles
                          switchPhotos
                            ? // Main Photo: Default
                              defaultUserImage
                            : // Main Photo: Preferred
                            // If the user doesn't have a preferred photo, then their default photo is shown
                            hasPreferredImage
                            ? preferredUserImage
                            : defaultUserImage
                        }`}
                        alt="Profile"
                      />

                      {props.network === 'online' && props.myProf && (
                        <Typography
                          variant="body1"
                          className="identification-card-content-card-container-photo-main-container-tile-bar"
                        >
                          Photo Options
                        </Typography>
                      )}
                    </div>
                    {props.network === 'online' && props.myProf && (
                      <div
                        onClick={handlePhotoOpen}
                        className="identification-card-content-card-container-photo-main-button"
                      ></div>
                    )}
                  </div>
                  {preferredUserImage && defaultUserImage && (
                    <div className="identification-card-content-card-container-photo-side">
                      <img
                        className="identification-card-content-card-container-photo-side-image"
                        src={`data:image/jpg;base64,${
                          // Checks to see if the default and preferred photos should switch between bubbles
                          switchPhotos
                            ? // Side Photo: Preferred
                              preferredUserImage
                            : // Side Photo: Default
                              defaultUserImage
                        }`}
                        alt="Profile"
                      />
                      <div
                        onClick={handlePhotoSwitch}
                        className="identification-card-content-card-container-photo-side-button"
                      ></div>
                    </div>
                  )}
                </Grid>

                <Grid item className="identification-card-content-card-container-info">
                  {(facebookButton ||
                    twitterButton ||
                    linkedInButton ||
                    instagramButton ||
                    props.myProf) && (
                    <Grid
                      item
                      className="identification-card-content-card-container-info-social-media"
                    >
                      <Grid
                        container
                        justify={linkCount < 3 ? 'space-evenly' : 'space-between'}
                        alignItems="center"
                      >
                        {facebookButton}
                        {twitterButton}
                        {linkedInButton}
                        {instagramButton}
                        {props.network === 'online' && props.myProf && editButton}
                      </Grid>
                    </Grid>
                  )}
                  <Grid
                    item
                    xs={12}
                    className="identification-card-content-card-container-info-class"
                  >
                    {userProfile.Class && <Typography>{userProfile.Class}</Typography>}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    className="identification-card-content-card-container-info-name"
                  >
                    <Typography variant="h6" paragraph>
                      {hasNickName
                        ? userProfile.fullName + ' (' + userProfile.NickName + ')'
                        : userProfile.fullName}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    className="identification-card-content-card-container-info-email"
                  >
                    <a href={`mailto:${userProfile.Email}`}>
                      <div className="identification-card-content-card-container-info-email-container">
                        <EmailIcon className="identification-card-content-card-container-info-email-container-icon" />
                        <Typography paragraph>{userProfile.Email}</Typography>
                      </div>
                    </a>
                  </Grid>

                  {props.network === 'online' && createPhotoDialogBox()}

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

          {userProfile && props.network === 'online' && props.myProf && (
            <Link
              to={`/profile/${userProfile.AD_Username}`}
              className="identification-card-content-public-profile-link"
            >
              <Button
                className="identification-card-content-public-profile-link-button"
                variant="contained"
              >
                View My Public Profile
              </Button>
            </Link>
          )}
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
            // If the message type is Success
            snackbarType === 'Success' ? (
              <span id="message-id">
                <CheckCircleIcon
                  style={{
                    marginBottom: '-4.5pt',
                    marginRight: '0.5rem',
                  }}
                />
                {snackbarMessage}
              </span>
            ) : snackbarType === 'Error' ? (
              <span id="message-id">
                <ErrorIcon
                  style={{
                    marginBottom: '-4.5pt',
                    marginRight: '0.5rem',
                  }}
                />
                {snackbarMessage}
              </span>
            ) : (
              <span id="message-id">
                <WarningIcon
                  style={{
                    marginBottom: '-4.5pt',
                    marginRight: '0.5rem',
                  }}
                />
                {snackbarMessage}
              </span>
            )
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
