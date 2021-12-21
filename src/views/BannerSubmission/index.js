//Theme and styling
import { gordonColors } from 'theme';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fab,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { Card, CardContent, CardHeader } from '@material-ui/core';

//External components
import Cropper from 'react-cropper';
import Dropzone from 'react-dropzone';
import { isMobile } from 'react-device-detect';

//React and local services/hooks
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth, useNetworkStatus } from 'hooks';
import userService from 'services/user';
import cmsService from 'services/cms';

//Designed components
import GordonDialogBox from 'components/GordonDialogBox';
import GordonLoader from 'components/Loader';
import GordonOffline from 'components/GordonOffline';
import GordonSnackbar from 'components/Snackbar';
import GordonUnauthorized from 'components/GordonUnauthorized';

//Subcomponents
import BannerList from './components/BannerList'; //This won't work yet.

const CROP_DIM = 200; // Width of cropped image canvas

const style = {
  color: gordonColors.primary.blue,

  uploadButton: {
    background: gordonColors.primary.cyan,
    color: 'white',
    marginTop: '20px',
  },
};

const styles2 = {
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
      width: '38%',
    },
    hidden: {
      display: 'none',
    },
  },
  searchBar: {
    margin: '0 auto',
  },
  newNewsForm: {
    backgroundColor: '#fff',
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 40,
    bottom: 40,
    left: 'auto',
    position: 'fixed',
    zIndex: 1,
  },
};

const BannerSubmission = () => {
  const authenticated = useAuth();
  const [currentUsername, setCurrentUsername] = useState('');
  const isOnline = useNetworkStatus();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  //Solely for banner management
  const [banners, setBanners] = useState([]);
  const [newBannerTitle, setNewBannerTitle] = useState('');
  const [newBannerWebLink, setNewBannerWebLink] = useState('');
  const [newBannerSortOrder, setNewBannerSortOrder] = useState(100);
  const [openBannerActivity, setOpenBannerActivity] = useState(false);

  //Solely for photo functions
  const [cropperImageData, setCropperImageData] = useState(null); //null if no picture chosen, else contains picture
  const [photoDialogErrorTimeout, setPhotoDialogErrorTimeout] = useState(null);
  const [photoDialogError, setPhotoDialogError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, text: '', severity: '' });
  const cropperRef = useRef();
  const [aspectRatio, setAspectRatio] = useState(null);

  const loadBanners = useCallback(async () => {
    setLoading(true);
    if (authenticated) {
      const existingBanners = await cmsService.getSlides();
      setLoading(false);
      setBanners(existingBanners);
    } else {
    }
  }, [authenticated]);

  useEffect(() => {
    loadBanners();
  }, [authenticated, loadBanners]);

  useEffect(() => {
    const loadUsername = async () => {
      const user = await userService.getProfileInfo();
      setCurrentUsername(user.AD_Username);
    };

    loadUsername();
  }, []);

  useEffect(() => {
    if (authenticated) {
      setIsAdmin(userService.getLocalInfo().college_role === 'god');
    }
  }, [authenticated]);

  function handlePostClick() {
    setOpenBannerActivity(true);
  }

  function handleWindowClose() {
    setOpenBannerActivity(false);
    setNewBannerTitle('');
    setNewBannerWebLink('');
    setCropperImageData(null);
  }

  const createSnackbar = (text, severity) => {
    setSnackbar({ open: true, text, severity });
  };

  /**********************************************************
  /*Following functions are solely related to photo submission*
  /**********************************************************/

  async function clearPhotoDialogErrorTimeout() {
    clearTimeout(photoDialogErrorTimeout);
    setPhotoDialogErrorTimeout(null);
    setPhotoDialogError(null);
  }

  /**
   * Creates the Photo Dialog message that will be displayed to the user
   *
   * @returns {string} The message of the Photo Dialog
   */
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

  /**
   * Handles the acceptance of the user dropping an image in the Photo Uploader in News submission
   *
   * @param {*} fileList The image dropped in the Dropzone of the Photo Uploader
   */
  function onDropAccepted(fileList) {
    var previewImageFile = fileList[0];
    var reader = new FileReader();
    reader.onload = () => {
      imageOnLoadHelper(reader);
    };
    reader.readAsDataURL(previewImageFile);
  }

  /**
   * Handles the rejection of the user dropping an invalid file in the Photo Updater Dialog Box
   * Copied from Identification
   */
  async function onDropRejected() {
    await clearPhotoDialogErrorTimeout();
    setPhotoDialogError('Sorry, invalid image file! Only PNG and JPEG images are accepted.');
  }

  async function handleSubmit() {
    let newImage;

    if (cropperImageData !== null) {
      let croppedImage = cropperRef.current.cropper
        .getCroppedCanvas({ width: CROP_DIM })
        .toDataURL();
      newImage = croppedImage.replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
    }

    let bannerItem = {
      categoryID: 1, //bad
      Subject: newBannerTitle,
      Body: newBannerWebLink,
      Image: newImage,
    };

    // submit the banner item and give feedback
    let result = await cmsService.submitBanner(bannerItem);
    if (result === undefined) {
      createSnackbar('Banner Submission Failed to Submit', 'error');
    } else {
      createSnackbar('Banner Submission Submitted Successfully', 'success');
      handleWindowClose();
      loadBanners(); //reload banners
    }
  }

  /**
   * When the delete button is clicked for a submission
   *
   * @param {number} snid The SNID of the submission to be deleted
   */
  async function handleBannerDelete(snid) {
    // delete the banner item and give feedback
    let result = await cmsService.deleteBanner(snid);
    if (result === undefined) {
      createSnackbar('Banner Failed to Delete', 'error');
    } else {
      createSnackbar('Banner Deleted Successfully', 'success');
    }

    loadBanners();
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

  /***************************************************
  /*End of methods solely related to photo submission*
  /***************************************************/

  // if all of the inputs are filled, enable 'submit' button
  //URL not here because a URL is not required
  let submitButtonDisabled = newBannerTitle === '' || cropperImageData === '';

  let content;

  //If user is online
  if (authenticated) {
    if (loading === true) {
      content = <GordonLoader />;
    } else {
      content = (
        <BannerList
          banners={banners}
          currentUsername={currentUsername}
          //handleNewsItemEdit={handleNewsItemEdit}
          handleBannerDelete={handleBannerDelete}
        />
      );
    }

    let bannerJSX;

    if (isOnline) {
      bannerJSX = (
        <>
          <>
            {isAdmin && (
              <Fab variant="extended" color="primary" onClick={handlePostClick} style={styles2.fab}>
                <PostAddIcon />
                Add a Banner
              </Fab>
            )}
          </>

          <Grid container justifyContent="center">
            <Grid item xs={12} lg={8}>
              <Card>
                <CardHeader
                  title="Advertise your club or event on the 360 Homepage!"
                  titleTypographyProps={{ variant: 'h4', align: 'center' }}
                  style={{
                    backgroundColor: gordonColors.primary.blue,
                    color: 'white',
                  }}
                />
                <CardContent>
                  <Grid container justifyContent="center" direction="column">
                    <Grid item align="left">
                      <Typography variant="h6">Banner Image Guidelines</Typography>
                      <Typography variant="body2">
                        1. Attach JPG image with a resolution of 1500 by 600.
                        <br />
                        2. Text must be clearly legible.
                        <br />
                        3. Include a url that you would like the banner image to link to in your
                        email.
                        <br />
                        4. All banner images must be approved. There is limited space, so not all
                        images will be.
                      </Typography>
                    </Grid>
                    <Grid item align="center">
                      <a href="mailto:360@gordon.edu?Subject=Banner Image Submission">
                        <Button variant="contained" style={style.uploadButton}>
                          Email the 360 Team
                        </Button>
                      </a>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Create Posting */}
            {isAdmin && (
              <>
                <GordonDialogBox
                  open={openBannerActivity}
                  title="Make a new Banner"
                  buttonClicked={handleSubmit}
                  buttonName={'Submit'}
                  isButtonDisabled={submitButtonDisabled}
                  cancelButtonClicked={handleWindowClose}
                  cancelButtonName="Cancel"
                >
                  <Grid container>
                    {/* TITLE ENTRY */}
                    <Grid item xs={12}>
                      <TextField
                        label="Subject"
                        variant="filled"
                        margin="dense"
                        fullWidth
                        name="newBannerTitle"
                        value={newBannerTitle}
                        onChange={(event) => {
                          setNewBannerTitle(event.target.value);
                        }}
                        // helperText="Please enter a title."
                      />
                    </Grid>

                    {/* LINK ENTRY */}
                    <Grid item xs={12}>
                      <TextField
                        variant="filled"
                        label="URL"
                        // margin="normal"
                        margin="dense"
                        //multiline
                        fullWidth
                        //rows={4}
                        name="newBannerWebLink"
                        value={newBannerWebLink}
                        onChange={(event) => {
                          setNewBannerWebLink(event.target.value);
                        }}
                        // helperText="Please enter a link."
                      />
                    </Grid>

                    {/* IMAGE ENTRY */}
                    <Grid item xs={12}>
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
                                  <div
                                    className="gc360_photo_dialog_box_content_dropzone"
                                    {...getRootProps()}
                                  >
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
                                onClick={() => {
                                  setCropperImageData(null);
                                }}
                                style={styles2.button.cancelButton}
                                className="gc360_photo_dialog_box_content_button"
                              >
                                Remove picture
                              </Button>
                            </Tooltip>
                          )}
                        </DialogActions>
                      </div>
                    </Grid>
                  </Grid>

                  {/* SORT ORDER NUMBER ENTRY */}
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-number"
                      variant="filled"
                      label="Number"
                      type="number"
                      margin="dense"
                      fullWidth
                      name="newBannerSortOrderNumber"
                      value={newBannerSortOrder}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) => {
                        setNewBannerSortOrder(event.target.value);
                      }}
                    />
                  </Grid>
                </GordonDialogBox>

                {/* USER FEEDBACK */}
                <GordonSnackbar
                  {...snackbar}
                  onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                  anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                />

                <Grid item xs={12} lg={8} style={{ marginBottom: '7rem' }}>
                  {/* list of banners */}
                  {content}
                </Grid>
              </>
            )}
          </Grid>
        </>
      );
      return bannerJSX;
    }
    //else if user is not online
    else {
      return <GordonOffline feature="Banner Sumission" />;
    }
  } else {
    return <GordonUnauthorized feature={'the banner submission'} />;
  }
};

export default BannerSubmission;
