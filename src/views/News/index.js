import React, { useState, useEffect, useCallback } from 'react';
import PostAddIcon from '@material-ui/icons/PostAdd';
import newsService from 'services/news';
import userService from 'services/user';
import NewsList from './components/NewsList';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonOffline from 'components/GordonOffline';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { gordonColors } from 'theme';
import {
  Grid,
  TextField,
  Tooltip,
  Button,
  Fab,
  Typography,
  DialogActions,
  DialogContent,
  DialogContentText,
  MenuItem,
} from '@material-ui/core';
import useNetworkStatus from 'hooks/useNetworkStatus';
import GordonDialogBox from 'components/GordonDialogBox';

const BREAKPOINT_WIDTH = 540;
const CROP_DIM = 200; // pixels

const styles = {
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

const StudentNews = (props) => {
  const [search, setSearch] = useState('');
  const [openPostActivity, setOpenPostActivity] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [personalUnapprovedNews, setPersonalUnapprovedNews] = useState([]);
  //const [filteredNews, setFilteredNews] = useState([]);
  const isOnline = useNetworkStatus();
  const [newPostCategory, setNewPostCategory] = useState('');
  const [newPostSubject, setNewPostSubject] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [cropperImageData, setCropperImageData] = useState(null); //null if no picture chosen, else contains picture
  const [photoDialogErrorTimeout, setPhotoDialogErrorTimeout] = useState(null);
  const [photoDialogError, setPhotoDialogError] = useState(null);
  const [cropBoxDim, setCropBoxDim] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, text: '', severity: '' });
  const [currentUsername, setCurrentUsername] = useState('');
  const [currentlyEditing, setCurrentlyEditing] = useState(false); // false if not editing, newsID if editing
  const [justShowPicture, setJustShowPicture] = useState(false);
  /*justShowPicture is a more complicated state property. If an image was submitted
   *to a news post, then if the user clicks on the edit button for the post later,
   *we want to at first just show them the image, not the cropper (particularly since
   *the cropper would only be able to contain what the API stored, so they can only
   *crop more). If they remove the picture, then we want to show the dropzone. If they
   *add a new picture, we want to display the cropper with the new data. When edit is
   *clicked for the first time and when a new picture has been added, showCropper will
   *have data, so we can't use showCropper to determine whether or not to show an img
   *tag or a cropper. A new property was necessary. justShowPicture begins false and is
   *made true when the edit button is clicked. When either the remove picture or cancel
   *button is clicked from the edit window, it is set back to false. In this way there is
   *the ability to update the view to the user. As a side note, this also creates the
   *ability to change the message above the image in a way that makes sense in either the
   *just-opened-an-edit or the just-submitted-new-image context.
   */

  let cropperRef = React.createRef();

  const loadNews = useCallback(async () => {
    setLoading(true);

    if (props.authentication) {
      const newsCategories = await newsService.getCategories();
      const personalUnapprovedNews = await newsService.getPersonalUnapprovedFormatted();
      const unexpiredNews = await newsService.getNotExpiredFormatted();
      setLoading(false);
      setCategories(newsCategories);
      setNews(unexpiredNews);
      setPersonalUnapprovedNews(personalUnapprovedNews);
      //setFilteredNews(unexpiredNews);
    } else {
      // TODO: test authentication handling and neaten code (ex. below)
      // alert("Please sign in to access student news");
    }
  }, [props.authentication]);

  useEffect(() => {
    loadNews();
  });

  useEffect(() => {
    const loadUsername = async () => {
      const user = await userService.getProfileInfo();
      setCurrentUsername(user.AD_Username);
    };

    loadUsername();
  });

  function maxCropPreviewWidth() {
    /*
    Known non-critical issue:
    maxCropperWidth() never utilizes its other cases.
    Previous use of this same method in other files has the same problem.

    It always uses the default case below.
    */
    const smallScreenRatio = 0.5;
    const largeScreenRatio = 0.25;
    const w = BREAKPOINT_WIDTH;
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

  function handlePostClick() {
    setOpenPostActivity(true);
  }

  function handleWindowClose() {
    setOpenPostActivity(false);
    setNewPostCategory('');
    setNewPostSubject('');
    setNewPostBody('');
    setCurrentlyEditing(false);
    setCropperImageData(null);
    setJustShowPicture(false);
  }

  // TODO: Currently disabled and unused
  /*
  search = () => {
    return async (event) => {
      // await ensures state has been updated before continuing
      await setState({
        search: event.target.value,
      });
      const filteredNews = await newsService.getFilteredNews(state);
      setState({ filteredNews: filteredNews, loading: false });
    };
  }
  */

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
        setPhotoDialogErrorTimeout(
          setTimeout(() => {
            setPhotoDialogErrorTimeout(null);
            setPhotoDialogError(null);
          }, 6000),
        );
      }
    }

    // If no error occured and the cropper is shown, the cropper text is displayed
    else if (cropperImageData && !justShowPicture) {
      message = 'Crop Photo to liking & Click Submit';
    }

    // If no error occured and the edit window has just been opened,
    // show previously submitted photo
    else if (justShowPicture) {
      message = 'Previously submitted photo';
    }

    // If no error occured and the cropper is not shown, the pick a file text is displayed
    else {
      message =
        BREAKPOINT_WIDTH === 'md' || BREAKPOINT_WIDTH === 'sm' || BREAKPOINT_WIDTH === 'xs'
          ? //currentWidth === 'md' || currentWidth === 'sm' || currentWidth === 'xs'
            'Tap Image to Browse Files'
          : 'Drag & Drop Picture, or Click to Browse Files';
    }
    return message;
  }

  // Method called when 'edit' clicked for a news item
  async function handleNewsItemEdit(newsID) {
    let newsItem = await newsService.getPostingByID(newsID);

    setOpenPostActivity(true);
    setNewPostCategory(newsItem.categoryID);
    setNewPostSubject(newsItem.Subject);
    setNewPostBody(newsItem.Body);
    setCurrentlyEditing(newsID);

    /*
    Error checking. Theoretically, this code is designed so that
    When the get method in the API service is called from the frontend,
    it will return the image data, even though that's not the value
    of the image column in news entries. But in the impossible event that
    it somhow DID return the path of the image instead of the image data,
    not only would that produce garbage and make the cropper have trouble,
    but it also is a potential security concern; it sends data back to the
    client that shouldn't be sent anywhere.
    */
    let base64Test = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;

    if (base64Test.test(newsItem.Image) && newsItem.Image !== null) {
      let newImageData = 'data:image/jpg;base64,' + newsItem.Image;
      setCropperImageData(newImageData);
      setJustShowPicture(true);
    } else {
      setCropperImageData(null);
    }
  }

  /**
   * Handles closing the Photo Updater Dialog Box
   */
  /*
  async function handleCloseCancel() {
    setOpenPhotoDialog(false);
    setShowCropper(null);
    clearPhotoDialogErrorTimeout();
  }
  */

  function onCropperZoom(event) {
    if (event.detail.ratio > 1) {
      event.preventDefault();
      React.cropperRef.current.cropper.zoomTo(1);
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
    setJustShowPicture(false);
  }

  // Handles the actual 'edit' submission
  async function handleUpdate() {
    let newsID = currentlyEditing;

    let imageData = null;

    if (cropperRef.current !== null) {
      imageData = cropperRef.current.cropper
        .getCroppedCanvas({ width: CROP_DIM })
        .toDataURL()
        .replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
    } else if (cropperImageData !== null) {
      imageData = cropperImageData.replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
    }

    // create the JSON newData object to update with
    let newData = {
      categoryID: newPostCategory,
      Subject: newPostSubject,
      Body: newPostBody,
      Image: imageData,
    };

    // update the news item and give feedback
    let result = await newsService.editStudentNews(newsID, newData);
    if (result === undefined) {
      createSnackbar('News Posting Failed to Update', 'error');
    } else {
      createSnackbar('News Posting Updated Successfully', 'success');
    }

    setOpenPostActivity(false);
    loadNews(); //reload news
  }

  async function handleSubmit() {
    let newImage;

    if (cropperImageData !== null) {
      let croppedImage = cropperRef.current.cropper
        .getCroppedCanvas({ width: CROP_DIM })
        .toDataURL();
      newImage = croppedImage.replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
    }

    //There is no else here because if there is no image, the JSON object SHOULD
    //contain null, since the API has been designed to look for a null case and handle
    //it, treating it appropriately to mean there is no image for the post.

    let newsItem = {
      categoryID: newPostCategory,
      Subject: newPostSubject,
      Body: newPostBody,
      Image: newImage,
    };

    // submit the news item and give feedback
    let result = await newsService.submitStudentNews(newsItem);
    if (result === undefined) {
      createSnackbar('News Posting Failed to Submit', 'error');
    } else {
      createSnackbar('News Posting Submitted Successfully', 'success');
      handleWindowClose();
      loadNews(); //reload news
    }
  }

  /**
   * When the delete button is clicked for a posting
   * @param {number} snid The SNID of the post to be deleted
   */
  async function handleNewsItemDelete(snid) {
    console.log(typeof snid);
    // delete the news item and give feedback
    let result = await newsService.deleteStudentNews(snid);
    if (result === undefined) {
      createSnackbar('News Posting Failed to Delete', 'error');
    } else {
      createSnackbar('News Posting Deleted Successfully', 'success');
    }

    loadNews();
  }

  function imageOnLoadHelper(reader) {
    var dataURL = reader.result.toString();
    var i = new Image();
    i.onload = async () => {
      var aRatio = i.width / i.height;
      setAspectRatio(aRatio);

      var maxWidth = maxCropPreviewWidth();
      var displayWidth = maxWidth > i.width ? i.width : maxWidth;
      var cropDim = minCropBoxDim(i.width, displayWidth);

      setPhotoDialogError(null);
      setCropBoxDim(cropDim);
      setAspectRatio(aRatio);
      setCropperImageData(dataURL);
    };
    i.src = dataURL;
  }

  /***************************************************
  /*End of methods solely related to photo submission*
  /***************************************************/

  // if all of the inputs are filled, enable 'submit' button
  let submitButtonDisabled = newPostCategory === '' || newPostSubject === '' || newPostBody === '';
  //Image isn't here because an image is optional
  let content;

  if (props.authentication) {
    if (loading === true) {
      content = <GordonLoader />;
    } else {
      content = (
        <NewsList
          news={news}
          personalUnapprovedNews={personalUnapprovedNews}
          currentUsername={currentUsername}
          handleNewsItemEdit={handleNewsItemEdit}
          handleNewsItemDelete={handleNewsItemDelete}
        />
      );
    }

    let newsJSX;

    // If the user is online
    if (isOnline) {
      newsJSX = (
        <>
          {/* Button to Create Posting */}
          <Fab variant="extended" color="primary" onClick={handlePostClick} style={styles.fab}>
            <PostAddIcon />
            Post Listing
          </Fab>

          <Grid container justify="center">
            {/* Search */}
            <Grid item xs={12} md={12} lg={8}>
              <Grid
                container
                alignItems="baseline"
                justify="center"
                style={styles.searchBar}
                spacing={5}
              >
                <Grid item xs={10} sm={8} md={8} lg={6}>
                  <TextField
                    id="search"
                    label="Search news"
                    variant="filled"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* NOTE: leaving helper text for now in case
            that is better than disabling submit button */}
            {/* Create Posting */}
            <GordonDialogBox
              open={openPostActivity}
              title=" Post on Student News "
              buttonClicked={currentlyEditing ? handleUpdate : handleSubmit}
              buttonName={currentlyEditing ? 'Update' : 'Submit'}
              isButtonDisabled={submitButtonDisabled}
              cancelButtonClicked={handleWindowClose}
              cancelButtonName="Cancel"
            >
              <DialogContent>
                <Grid container>
                  {/* CATEGORY ENTRY */}
                  <Grid item>
                    <TextField
                      select
                      label="Category"
                      name="newPostCategory"
                      variant="filled"
                      value={newPostCategory}
                      onChange={(event) => {
                        setNewPostCategory(event.target.value);
                      }}
                      // helperText="Please choose a category."
                      style={{ minWidth: '7rem' }}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.categoryID} value={category.categoryID}>
                          {category.categoryName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* SUBJECT ENTRY */}
                  <Grid item xs={12}>
                    <TextField
                      label="Subject"
                      variant="filled"
                      margin="dense"
                      fullWidth
                      name="newPostSubject"
                      value={newPostSubject}
                      onChange={(event) => {
                        setNewPostSubject(event.target.value);
                      }}
                      // helperText="Please enter a subject."
                    />
                  </Grid>

                  {/* BODY ENTRY */}
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      label="Body"
                      margin="normal"
                      multiline
                      fullWidth
                      rows={4}
                      name="newPostBody"
                      value={newPostBody}
                      onChange={(event) => {
                        setNewPostBody(event.target.value);
                      }}
                      // helperText="Please enter a body."
                    />
                  </Grid>

                  {/* IMAGE ENTRY */}
                  <Grid item xs={12}>
                    <div className="gc360-photo-dialog-box">
                      <DialogContent className="gc360-photo-dialog-box_content">
                        <DialogContentText className="gc360-photo-dialog-box_content_text">
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
                                  className="gc360-photo-dialog-box_content_dropzone"
                                  {...getRootProps()}
                                >
                                  <input {...getInputProps()} />
                                </div>
                              </section>
                            )}
                          </Dropzone>
                        )}
                        {cropperImageData && !justShowPicture && (
                          <div className="gc360-photo-dialog-box_content_cropper">
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
                              minCropBoxWidth={cropBoxDim}
                              minCropBoxHeight={cropBoxDim}
                            />
                          </div>
                        )}
                        {cropperImageData && justShowPicture && (
                          <Grid item xs={8} style={{ textAlign: 'left' }}>
                            <img src={cropperImageData} alt=" " />
                          </Grid>
                        )}
                      </DialogContent>
                      <DialogActions className="gc360-photo-dialog-box_actions-top">
                        {cropperImageData && (
                          <Tooltip
                            classes={{ tooltip: 'tooltip' }}
                            id="tooltip-hide"
                            title="Remove this image from the post"
                          >
                            <Button
                              variant="contained"
                              onClick={() => {
                                setCropperImageData(null);
                                setJustShowPicture(false);
                              }}
                              style={styles.button.cancelButton}
                              className="gc360-photo-dialog-box_content_button"
                            >
                              Remove picture
                            </Button>
                          </Tooltip>
                        )}
                      </DialogActions>
                    </div>
                  </Grid>
                  <Grid item>
                    {/* SUBMISSION GUIDELINES */}
                    <Typography variant="caption" color="textSecondary" display="block">
                      Student News is intended for announcing Gordon sponsored events, lost and
                      found, rides, etc. All submissions must follow the Student News guidelines and
                      will be reviewed at the discretion of The Office of Student Life...
                      <a href="https://gordonedu.sharepoint.com/:b:/g/StudentLife/admin/EY22_o3g6vFEsfT2nYY-8JwB34OlYmA1oaE1f4FTGD2gew">
                        More Details
                      </a>
                    </Typography>
                  </Grid>
                </Grid>
              </DialogContent>
            </GordonDialogBox>

            {/* USER FEEDBACK */}
            {/* <Snackbar
              open={snackbarOpen}
              message={snackbarMessage}
              onClose={handleSnackbarClose}
              autoHideDuration={5000}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={handleSnackbarClose}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            ></Snackbar> */}
            <GordonSnackbar
              {...snackbar}
              onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            />

            <Grid item xs={12} lg={8} style={{ marginBottom: '7rem' }}>
              {/* list of news */}
              {content}
            </Grid>
          </Grid>
        </>
      );
      return newsJSX;
    }
    // If the user is offline
    else {
      return <GordonOffline feature="Student News" />;
    }
  } else {
    return <GordonUnauthorized feature={'the student news page'} />;
  }
};

export default StudentNews;
