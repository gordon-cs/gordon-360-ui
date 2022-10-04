import { useIsAuthenticated } from '@azure/msal-react';
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
} from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import 'cropperjs/dist/cropper.css';
import { useNetworkStatus } from 'hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import { isMobile } from 'react-device-detect';
import Dropzone from 'react-dropzone';
import newsService from 'services/news';
import NewsList from './components/NewsList';

const CROP_DIM = 200; // Width of cropped image canvas

const StudentNews = () => {
  const [search, setSearch] = useState('');
  const [openPostActivity, setOpenPostActivity] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  const allNewsRef = useRef([]);
  const [personalUnapprovedNews, setPersonalUnapprovedNews] = useState([]);
  //const [filteredNews, setFilteredNews] = useState([]);
  const isOnline = useNetworkStatus();
  const [newPostCategory, setNewPostCategory] = useState('');
  const [newPostSubject, setNewPostSubject] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [cropperImageData, setCropperImageData] = useState(null); //null if no picture chosen, else contains picture
  const [photoDialogErrorTimeout, setPhotoDialogErrorTimeout] = useState(null);
  const [photoDialogError, setPhotoDialogError] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, text: '', severity: '' });
  const [currentlyEditing, setCurrentlyEditing] = useState(false); // false if not editing, newsID if editing
  const cropperRef = useRef();
  const isAuthenticated = useIsAuthenticated();

  const loadNews = useCallback(async () => {
    setLoading(true);
    if (isAuthenticated) {
      const newsCategories = await newsService.getCategories();
      const personalUnapprovedNews = await newsService.getPersonalUnapproved();
      const unexpiredNews = await newsService.getNotExpiredFormatted();
      setLoading(false);
      setCategories(newsCategories);
      setNews(unexpiredNews);
      allNewsRef.current = unexpiredNews;
      setPersonalUnapprovedNews(personalUnapprovedNews);
      //setFilteredNews(unexpiredNews);
    } else {
      // TODO: test authentication handling and neaten code (ex. below)
      // alert("Please sign in to access student news");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadNews();
  }, [isAuthenticated, loadNews]);

  useEffect(() => {
    if (search) {
      setNews(newsService.getFilteredNews(allNewsRef.current, search));
    } else {
      setNews(allNewsRef.current);
    }
  }, [search]);

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

    // submit the news item and give feedback
    let result = await newsService.submitStudentNews(
      newPostSubject,
      newPostCategory,
      newPostBody,
      newImage,
    );
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
   *
   * @param {number} snid The SNID of the post to be deleted
   */
  async function handleNewsItemDelete(snid) {
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
  let submitButtonDisabled = newPostCategory === '' || newPostSubject === '' || newPostBody === '';
  //Image isn't here because an image is optional
  let content;

  if (isAuthenticated) {
    if (loading === true) {
      content = <GordonLoader />;
    } else {
      content = (
        <NewsList
          news={news}
          personalUnapprovedNews={personalUnapprovedNews}
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
          <Fab
            variant="extended"
            color="primary"
            onClick={handlePostClick}
            sx={{
              position: 'fixed',
              bottom: (theme) => theme.spacing(2),
              right: (theme) => theme.spacing(2),
            }}
          >
            <PostAddIcon />
            Post Listing
          </Fab>

          <Grid container justifyContent="center" spacing={2}>
            {/* Search */}
            <Grid item xs={12} lg={8}>
              <TextField
                id="search"
                label="Search news"
                variant="filled"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} lg={8} style={{ marginBottom: '7rem' }}>
              {/* list of news */}
              {content}
            </Grid>
          </Grid>

          {/* Create Posting */}
          <GordonDialogBox
            open={openPostActivity}
            title="Post on Student News"
            buttonClicked={currentlyEditing ? handleUpdate : handleSubmit}
            buttonName={currentlyEditing ? 'Update' : 'Submit'}
            isButtonDisabled={submitButtonDisabled}
            cancelButtonClicked={handleWindowClose}
            cancelButtonName="Cancel"
          >
            <Grid container direction="column" spacing={2} sx={{ mt: 0 }}>
              <Grid item>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  name="newPostCategory"
                  variant="filled"
                  value={newPostCategory}
                  onChange={(event) => setNewPostCategory(event.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.categoryID} value={category.categoryID}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  label="Subject"
                  variant="filled"
                  fullWidth
                  name="newPostSubject"
                  value={newPostSubject}
                  onChange={(event) => setNewPostSubject(event.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="filled"
                  label="Body"
                  multiline
                  fullWidth
                  rows={4}
                  name="newPostBody"
                  value={newPostBody}
                  onChange={(event) => setNewPostBody(event.target.value)}
                />
              </Grid>
            </Grid>
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
                    title="Remove this image from the post"
                  >
                    <Button
                      variant="outlined"
                      onClick={() => setCropperImageData(null)}
                      className="gc360_photo_dialog_box_content_button"
                    >
                      Remove picture
                    </Button>
                  </Tooltip>
                )}
              </DialogActions>
            </div>
            {/* SUBMISSION GUIDELINES */}
            <Typography variant="caption" color="textSecondary" display="block">
              Student News is intended for announcing Gordon sponsored events, lost and found,
              rides, etc. All submissions must follow the Student News guidelines and will be
              reviewed at the discretion of The Office of Student Life...
              <a href="https://gordonedu.sharepoint.com/:b:/g/StudentLife/admin/EY22_o3g6vFEsfT2nYY-8JwB34OlYmA1oaE1f4FTGD2gew">
                More Details
              </a>
            </Typography>
          </GordonDialogBox>

          {/* USER FEEDBACK */}
          <GordonSnackbar
            {...snackbar}
            onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          />
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
