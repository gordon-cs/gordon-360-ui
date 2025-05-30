import {
  AlertColor,
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Profile as profileType,
  isStudent as checkIsStudent,
  isFacStaff as checkIsFacStaff,
  isAlumni as checkIsAlumni,
} from 'services/user';
import EmailIcon from '@mui/icons-material/Email';
import GordonLoader from 'components/Loader/index';
import 'cropperjs/dist/cropper.css';
import { useUserActions } from 'hooks';
import { useEffect, useRef, useState, ReactNode } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import ZoomEvent from 'react-cropper';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import { Class } from 'services/peopleSearch';
import user from 'services/user';
import { windowBreakWidths } from 'theme';
import SocialMediaLinks from './components/SocialMediaLinks';
import defaultGordonImage from './defaultGordonImage';
import styles from './Identification.module.css';
import { update } from 'lodash';
import { tr } from 'date-fns/locale';

type Props = {
  profile: profileType;
  myProf: boolean;
  isOnline: boolean;
  createSnackbar: (message: string, severity: AlertColor) => void;
};

const Identification = ({ profile, myProf, isOnline, createSnackbar }: Props) => {
  const CROP_DIM = 200; // pixels
  const [isImagePublic, setIsImagePublic] = useState<boolean>(false);
  const [defaultUserImage, setDefaultUserImage] = useState<string | null>();
  const [preferredUserImage, setPreferredUserImage] = useState<string | null>();
  const [hasPreferredImage, setHasPreferredImage] = useState(false);
  const [isPhotosSwitched, setisPhotosSwitched] = useState(false);
  const [showCropper, setShowCropper] = useState<string | null>();
  const [hasNickname, setHasNickname] = useState<boolean | string>(Boolean);
  const [hasMaidenName, setHasMaidenName] = useState<boolean | string>(Boolean);
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [photoDialogError, setPhotoDialogError] = useState<typeof photoDialogErrorTimeout>();
  const [cropperData, setCropperData] = useState<{
    cropBoxDim: number | undefined;
    aspectRatio: number;
  }>({ cropBoxDim: undefined, aspectRatio: 1 });
  const [userProfile, setUserProfile] = useState<profileType>();
  const [currentWidth, setCurrentWidth] = useState<string>();
  const [cliftonColor, setCliftonColor] = useState<string>();
  const { updateImage } = useUserActions();
  const cropperRef = useRef<(ReactCropperElement & HTMLImageElement) | null>(null);
  const isStudent = profile.PersonType?.includes('stu');
  let photoDialogErrorTimeout: string | number | NodeJS.Timeout | undefined;

  /**
   * Loads the given user's profile info
   */
  useEffect(() => {
    async function loadUserProfile() {
      try {
        // Gets the requested user's image. Depending on requested user's person type and the currently
        // signed-in user's person type, different images will be shown
        const { def: defaultImage, pref: preferredImage } =
          profile.PersonType === 'fac'
            ? /**
               * The requested user's image is Faculty
               * If currently signed-in user is Faculty : Will receive default and preferred image
               * If currently signed-in user is Non-Faculty : Will receive either default or preferred image
               */
              await user.getImage(profile.AD_Username)
            : // Checks to see if the current page is the My Profile page
              myProf
              ? /**
                 * This case will occur only if the currently signed-in user is Non-Faculty and are
                 * on the My Profile page
                 */
                await user.getImage()
              : /**
                 * The requested user's image is Non-Faculty
                 * If currently signed-in user is Faculty : Will receive default and preferred image
                 * If currently signed-in user is Non-Faculty : Will receive either default or preferred image
                 */
                await user.getImage(profile.AD_Username);

        // Sets the given user's preferred image. If a default image is given but the preferred is undefined,
        // then this could mean that the currently signed-in user is not allowed to see the preferred image or
        // a preferred image wasn't set
        setPreferredUserImage(preferredImage);
        setHasPreferredImage(preferredImage ? true : false);
        // Sets the given user's default image. If a preferred image is given but the default is undefined,
        // then this, means that the currently signed-in user is not allowed to see the default picture.
        setDefaultUserImage(defaultImage);

        const colorFrequencies = profile.CliftonStrengths!.Themes.reduce(
          (colorFrequencies, strength) => ({
            ...colorFrequencies,
            [strength.color]:
              (colorFrequencies[strength.color as keyof typeof colorFrequencies] || 0) + 1,
          }),
          {},
        );

        // find max frequency by always recursively keeping a from every (a,b) where a >= b
        const cliftonColor = Object.keys(colorFrequencies).reduce((a, b) =>
          colorFrequencies[a as keyof typeof colorFrequencies] >=
          colorFrequencies[b as keyof typeof colorFrequencies]
            ? a
            : b,
        );

        setCliftonColor(cliftonColor);
      } catch (error) {
        // Do nothing
      }
      setUserProfile(profile);

      setIsImagePublic(profile.show_pic === 1);

      setHasNickname(profile?.NickName && profile.NickName !== profile.FirstName);
      setHasMaidenName(profile?.MaidenName && profile?.LastName !== profile.MaidenName);
    }

    loadUserProfile();
  }, [profile, myProf]);

  /**
   * Gets the current breakpoint according to Material-UI's breakpoints
   */
  useEffect(() => {
    if (myProf) {
      // Gets the current Material-UI Breakpoint
      function getMaterialUIBreakpoint(width: number) {
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
      window.addEventListener('resize', (event: UIEvent) => {
        const w = event.target as Window;
        setCurrentWidth(getMaterialUIBreakpoint(w.innerWidth));
      });
      // Sets the current Material-UI Breakpoint
      setCurrentWidth(getMaterialUIBreakpoint(window.innerWidth));
      // Removes the resize window event listener
      return window.removeEventListener('resize', () => {});
    }
  }, [myProf]);

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
      let croppedImage = cropperRef
        .current!.cropper.getCroppedCanvas({ width: CROP_DIM })
        .toDataURL();
      let newImage = croppedImage.replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
      let response = user.postImage(croppedImage);
      response
        .then(async () => {
          // Sets the user's preferred image
          setPreferredUserImage(newImage);
          setHasPreferredImage(true);
          // Reset default image so we display only preferred on MyProfile
          setDefaultUserImage(null);
          // Displays to the user that their photo has been submitted
          createSnackbar('Photo Submitted', 'success');
          // Closes out the Photo Updater
          setOpenPhotoDialog(false);
          setShowCropper(null);
          updateImage();
        })
        .catch(() => {
          // Displays to the user that their photo failed to submit
          createSnackbar('Photo Submission Failed', 'error');
        });
    }
  }

  /**
   * Handles closing the Photo Updater Dialog Box
   */
  async function handleCloseCancel() {
    setOpenPhotoDialog(false);
    setShowCropper(null);
    clearPhotoDialogErrorTimeout();
  }

  /**
   * Handles the switch of showing the default and preferred image
   */
  function handlePhotoSwitch() {
    setisPhotosSwitched(!isPhotosSwitched);
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
          const { def: defaultImage } = await user.getImage(userProfile!.AD_Username);
          setDefaultUserImage(defaultImage);
          // Displays to the user that their photo has been restored
          createSnackbar('Original Photo Restored', 'success');
        } catch {
          setDefaultUserImage(defaultGordonImage);
          // Displays to the user that getting their original photo failed
          createSnackbar('Failed Retrieving Photo', 'error');
        }
        // Deletes the preferred image, clears any timeouts errors and closes out of the photo updater
        clearPhotoDialogErrorTimeout();
        setPreferredUserImage(null);
        setHasPreferredImage(false);
        setOpenPhotoDialog(false);
        updateImage();
      })
      // Promised Rejected - Display error to the user
      .catch(() => {
        // Displays to the user that resetting their photo failed
        createSnackbar('Failed To Reset Photo', 'error');
      });
  }

  async function handleSetGordonDefaultImage() {
    // Creates a promise to allow async to force for the user's image to update before fetching it
    let response = user.postImage(`data:image/jpeg;base64,${defaultGordonImage}`);

    // Promised Resolved - Fetch for user's preferred image (now set to Gordon default)
    await response
      .then(async () => {
        try {
          const { def: defaultImage } = await user.getImage(userProfile!.AD_Username);
          // Optionally, fetch the updated preferred image from the server
          const { pref: preferredImage } = await user.getImage(userProfile!.AD_Username);
          setPreferredUserImage(preferredImage ?? defaultGordonImage);
          setHasPreferredImage(true);
          setDefaultUserImage(defaultImage);
          createSnackbar('Gordon image set as preferred', 'info');
        } catch {
          setPreferredUserImage(defaultGordonImage);
          setHasPreferredImage(true);
          createSnackbar(
            'Gordon image set as preferred, but failed to verify from server',
            'warning',
          );
        }
        clearPhotoDialogErrorTimeout();
        setOpenPhotoDialog(false);
        setisPhotosSwitched(false);
        updateImage();
      })
      // Promised Rejected - Display error to the user
      .catch(() => {
        createSnackbar('Failed to set default Gordon image', 'error');
      });
  }

  /**
   * Clears the timeout of the Photo Dialog error message.
   *
   * If an error occured while the Photo Dialog was open, then a timeout for displaying the error
   * message was created. That timeout is cleared and the error message is deleted. This can be used
   * to stop or remove the timeout to allow another one to be made (prevents memory leaks of
   * unreferenced timeouts)
   */
  function clearPhotoDialogErrorTimeout() {
    clearTimeout(photoDialogErrorTimeout);
    photoDialogErrorTimeout = undefined;
    setPhotoDialogError(undefined);
  }

  /**
   * Creates the Photo Dialog message that will be displayed to the user
   *
   * @returns {string} The message of the Photo Dialog
   */
  function createPhotoDialogBoxMessage() {
    let message: string | JSX.Element = '';
    // If an error occured and there's no currently running timeout, the error is displayed
    // and a timeout for that error message is created
    if (photoDialogError !== null) {
      message = <span className={styles.photoDialogError}>{photoDialogError as ReactNode}</span>;
      if (photoDialogErrorTimeout === null) {
        // Shows the error message for 6 seconds and then returns back to normal text
        photoDialogErrorTimeout = setTimeout(() => {
          photoDialogErrorTimeout = undefined;
          setPhotoDialogError(undefined);
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
        return 900 * largeScreenRatio;
      case 'xs':
        return 360 * smallScreenRatio;
      case 'sm':
        return 600 * smallScreenRatio;
      case 'md':
        return 900 * largeScreenRatio;
      case 'lg':
        return 1200 * largeScreenRatio;
      case 'xl':
        return 1536 * largeScreenRatio;
    }
  }

  function minCropBoxDim(imgWidth: number, dispWidth: number) {
    return (CROP_DIM * dispWidth) / imgWidth;
  }

  /**
   * Handles the acceptance of the user dropping an image in the Photo Updater Dialog Box
   *
   * @param {*} fileList The image dropped in the Dropzone of the Photo Updater
   */
  function onDropAccepted(fileList: any) {
    var previewImageFile = fileList[0];
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result!.toString();
      var i = new Image();
      i.onload = async () => {
        if (i.width < CROP_DIM || i.height < CROP_DIM) {
          clearPhotoDialogErrorTimeout();
          setPhotoDialogError(
            'Sorry, your image is too small! Image dimensions must be at least 200 x 200 pixels.',
          );
        } else {
          var aRatio = i.width / i.height;
          //setCropperData({ aspectRatio: aRatio });
          var maxWidth = maxCropPreviewWidth();
          var displayWidth = maxWidth > i.width ? i.width : maxWidth;
          var cropDim = minCropBoxDim(i.width, displayWidth);
          setPhotoDialogError(undefined);
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
    clearPhotoDialogErrorTimeout();
    setPhotoDialogError('Sorry, invalid image file! Only PNG and JPEG images are accepted.');
  }

  function onCropperZoom(event: Cropper.ZoomEvent<HTMLImageElement>) {
    if (event.detail.ratio > 1) {
      event.preventDefault();
      cropperRef.current!.cropper.zoomTo(1);
    }
  }

  /**
   * Creates the Photo Updater Dialog Box
   *
   * @returns {JSX} The JSX of the Photo Updater
   */
  function createPhotoDialogBox() {
    return (
      <Dialog
        className="gc360_photo_dialog"
        open={openPhotoDialog}
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
                accept={{
                  'image/*': ['.jpeg', ',jpg', '.png'],
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div className="gc360_photo_dialog_box_content_dropzone" {...getRootProps()}>
                      <input {...getInputProps()} />
                      <img
                        className="gc360_photo_dialog_box_content_dropzone_img"
                        src={`data:image/jpg;base64,${preferredUserImage || defaultUserImage}`}
                        alt="Profile"
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
                  src={showCropper}
                  //Possibly @TODO convert in-line style to CSS
                  style={{
                    maxWidth: maxCropPreviewWidth(),
                    maxHeight: maxCropPreviewWidth() / cropperData.aspectRatio,
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
          <DialogActions className="gc360_photo_dialog_box_actions_middle">
            {!showCropper && !hasPreferredImage && (
              <Tooltip
                classes={{ tooltip: 'tooltip' }}
                id="tooltip-default"
                title="Set your preferred image to the default Gordon image"
              >
                <Button variant="contained" color="secondary" onClick={handleSetGordonDefaultImage}>
                  Default
                </Button>
              </Tooltip>
            )}
            {showCropper && (
              <Button variant="contained" onClick={() => setShowCropper(null)} color="primary">
                Go Back
              </Button>
            )}
          </DialogActions>
          <DialogActions className="gc360_photo_dialog_box_actions_middle">
            {!showCropper && hasPreferredImage && (
              <Tooltip
                classes={{ tooltip: 'tooltip' }}
                id="tooltip-delete"
                title="Delete your preferred image"
              >
                <Button variant="contained" onClick={handleResetImage} color="error">
                  Delete
                </Button>
              </Tooltip>
            )}
          </DialogActions>
          <DialogActions className="gc360_photo_dialog_box_actions_bottom">
            <Button variant="outlined" onClick={handleCloseCancel} color="primary">
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
                  onClick={handleCloseSubmit}
                  disabled={!showCropper}
                  color="primary"
                  className={!showCropper ? styles.hiddenButton : undefined}
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

  const todaysDate = new Date();
  const isAprilFools = todaysDate.getMonth() === 3 && todaysDate.getDate() === 1;
  const profileTitleAprilFools = userProfile?.Title
    ? userProfile.Title.charAt(0).toUpperCase() +
      userProfile.Title.slice(1).toLowerCase() +
      '. ' +
      userProfile.LastName
    : '';

  return (
    <div className={styles.identification_card}>
      <Grid container className={styles.identification_card_header}>
        {userProfile &&
          (isStudent ? (
            <CardHeader
              title={`${
                isAprilFools
                  ? profileTitleAprilFools
                  : userProfile.NickName
                    ? userProfile.NickName
                    : userProfile.FirstName
              }'s Profile`}
            />
          ) : (
            <CardHeader
              title={`${userProfile.NickName ? userProfile.NickName : userProfile.FirstName} ${
                userProfile.LastName
              }'s Profile`}
            />
          ))}
        {!userProfile && <CardHeader title="My Personal Profile" />}
      </Grid>

      <div className={styles.identification_card_content}>
        {/* SHOWS THE CARD'S CONTENT IF THE GIVEN USER'S INFORMATION IS AVAILABLE. OTHERWISE A LOADER */}
        {userProfile ? (
          <Grid
            container
            className={styles.identification_card_content_card}
            justifyContent="center"
          >
            <Grid
              container
              className={styles.identification_card_content_card_container}
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Grid item className={styles.identification_card_content_card_container_photo}>
                <div
                  className={styles.identification_card_content_card_container_photo_main}
                  //@TODO convert in-line style to CSS
                  style={
                    cliftonColor
                      ? {
                          // border: '0.5rem solid' + cliftonColor,
                          border: '10px solid transparent',
                          boxSizing: 'content-box',
                          margin: '-1rem',
                          background:
                            '-webkit-linear-gradient(135deg, #fff, ' +
                            cliftonColor +
                            ') border-box',
                        }
                      : undefined
                  }
                >
                  <div
                    className={
                      styles.identification_card_content_card_container_photo_main_container
                    }
                  >
                    <img
                      className={
                        styles.identification_card_content_card_container_photo_main_container_image
                      }
                      src={`data:image/jpg;base64,${
                        // Checks to see if the default and preferred photos should switch between bubbles
                        isPhotosSwitched
                          ? // Main Photo: Default
                            defaultUserImage
                          : // Main Photo: Preferred
                            // If the given user doesn't have a preferred photo, then their default photo is shown
                            hasPreferredImage
                            ? preferredUserImage
                            : defaultUserImage
                      }`}
                      alt="Profile"
                    />

                    {isOnline && myProf && (
                      <Typography
                        variant="body1"
                        className={
                          styles.identification_card_content_card_container_photo_main_container_tile_bar
                        }
                      >
                        Photo Options
                      </Typography>
                    )}
                  </div>
                  {isOnline && myProf && (
                    <div
                      onClick={handlePhotoOpen}
                      className={
                        styles.identification_card_content_card_container_photo_main_button
                      }
                    ></div>
                  )}
                </div>
                {preferredUserImage && defaultUserImage && (
                  <div className={styles.identification_card_content_card_container_photo_side}>
                    <img
                      className={styles.identification_card_content_card_container_photo_side_image}
                      src={`data:image/jpg;base64,${
                        // Checks to see if the default and preferred photos should switch between bubbles
                        isPhotosSwitched
                          ? // Side Photo: Preferred
                            preferredUserImage
                          : // Side Photo: Default
                            defaultUserImage
                      }`}
                      alt="Profile"
                    />
                    <div
                      onClick={handlePhotoSwitch}
                      className={
                        styles.identification_card_content_card_container_photo_side_button
                      }
                    ></div>
                  </div>
                )}
              </Grid>

              <Grid item className={styles.identification_card_content_card_container_info}>
                <SocialMediaLinks
                  profile={profile}
                  myProf={myProf}
                  createSnackbar={createSnackbar}
                />
                <Grid
                  item
                  xs={12}
                  className={styles.identification_card_content_card_container_info_class}
                >
                  {checkIsStudent(userProfile) && userProfile.Class && (
                    <Typography>{Class[userProfile.Class]}</Typography>
                  )}
                </Grid>

                <Grid
                  item
                  xs={12}
                  className={styles.identification_card_content_card_container_info_name}
                >
                  <Typography variant="h6" paragraph>
                    {`${
                      userProfile.Title && userProfile.PersonType === 'fac'
                        ? `${userProfile.Title} `
                        : ''
                    }${userProfile.FirstName}${hasNickname ? ` (${userProfile.NickName})` : ''} ${
                      userProfile.LastName
                    }${hasMaidenName ? ` (${userProfile.MaidenName})` : ''}`}
                  </Typography>
                </Grid>
                {checkIsFacStaff(userProfile) &&
                  userProfile.JobTitle &&
                  userProfile.JobTitle !== '' && (
                    <Grid
                      item
                      xs={12}
                      className={styles.identification_card_content_card_container_info_job_title}
                    >
                      <Typography variant="h6" paragraph>
                        {userProfile.JobTitle}
                      </Typography>
                    </Grid>
                  )}
                {userProfile.Email ? (
                  <Grid
                    item
                    xs={12}
                    className={styles.identification_card_content_card_container_info_email}
                  >
                    <a href={`mailto:${userProfile.Email}`}>
                      <div
                        className={
                          styles.identification_card_content_card_container_info_email_container
                        }
                      >
                        <EmailIcon
                          className={
                            styles.identification_card_content_card_container_info_email_container_icon
                          }
                        />
                        <Typography paragraph>{userProfile.Email}</Typography>
                      </div>
                    </a>
                  </Grid>
                ) : null}

                {isOnline && createPhotoDialogBox()}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <GordonLoader />
        )}

        {userProfile && isOnline && myProf && (
          <Link
            to={`/profile/${userProfile.AD_Username}`}
            className={styles.identification_card_content_public_profile_link}
          >
            <Button color="secondary" variant="contained">
              View My Public Profile
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Identification;
