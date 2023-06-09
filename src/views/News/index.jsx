import { useIsAuthenticated } from '@azure/msal-react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Fab,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthenticated from 'components/GordonUnauthenticated';
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
import { userIsInAuthGroup } from 'services/auth';
import styles from './News.module.scss';

const CROP_DIM = 200; // Width of cropped image canvas
const NEWS_TABS = ['news', 'my-pending-news', 'all-pending-news'];
const NEWS_HEADERS = ['News', 'My Pending News', 'All Pending News'];
const BREAKPOINT_WIDTH = 605;
const TAB_BREAKPOINT_WIDTH = 410;

const StudentNews = () => {
  const [openPostActivity, setOpenPostActivity] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  const allNewsRef = useRef([]);
  const [personalUnapprovedNews, setPersonalUnapprovedNews] = useState([]);
  const [unapprovedNews, setUnapprovedNews] = useState([]);
  //const [filteredNews, setFilteredNews] = useState([]);
  const isOnline = useNetworkStatus();
  const [newPostCategory, setNewPostCategory] = useState('');
  const [newPostSubject, setNewPostSubject] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [cropperImageData, setCropperImageData] = useState(null); //null if no picture chosen, else contains picture
  const [dropperImageData, setDropperImageData] = useState(null); // null if no picture attached, else contains picture
  const [photoDialogErrorTimeout, setPhotoDialogErrorTimeout] = useState(null);
  const [photoDialogError, setPhotoDialogError] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(null); // this ratio is for cropper
  const [dropperAspectRatio, setDropperAspectRatio] = useState(1); // this ratio is for drop zone, default 1 to display a square drpper zone
  const [snackbar, setSnackbar] = useState({ open: false, text: '', severity: '' });
  const [currentlyEditing, setCurrentlyEditing] = useState(false); // false if not editing, newsID if editing
  const [currentlyEditingImage, setCurrentlyEditingImage] = useState(false); // false if not editing image, newID if editing
  const [showCropper, setShowCropper] = useState(null);
  const [tabValue, setTabValue] = useState(NEWS_TABS[0]); // set the default tab to 'news'
  const cropperRef = useRef();
  const isAuthenticated = useIsAuthenticated();
  const isAdmin = userIsInAuthGroup('NewsAdmin');
  const [width, setWidth] = useState(window.innerWidth);

  const loadNews = useCallback(async () => {
    setLoading(true);
    if (isAuthenticated) {
      const newsCategories = await newsService.getCategories();
      const personalUnapprovedNews = await newsService.getPersonalUnapproved();
      const unapprovedNews = isAdmin ? await newsService.getUnapproved() : null;
      const unexpiredNews = await newsService.getNotExpiredFormatted();
      setLoading(false);
      setCategories(newsCategories);
      setNews(unexpiredNews);
      allNewsRef.current = unexpiredNews;
      setPersonalUnapprovedNews(personalUnapprovedNews);
      setUnapprovedNews(unapprovedNews);
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
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return (_) => {
      window.removeEventListener('resize', handleResize);
    };
  });

  function handlePostClick() {
    setOpenPostActivity(true);
  }

  function handleWindowClose() {
    setOpenPostActivity(false);
    setShowCropper(null);
    setNewPostCategory('');
    setNewPostSubject('');
    setNewPostBody('');
    setCurrentlyEditing(false);
    setCropperImageData(null);
  }

  function handlePhotoWindowClose() {
    setCurrentlyEditingImage(false);
    setShowCropper(null);
    setCropperImageData(null);
    setDropperImageData(null);
    setDropperAspectRatio(1);
  }

  function handleSwitchTab(event, newValue) {
    setTabValue(newValue);
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
  }

  async function handleNewsImageEdit(newsID) {
    let newsItem = await newsService.getPostingByID(newsID);

    DropperOnLoadHelper(newsItem.Image);
    setCurrentlyEditingImage(newsID);
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

    // create the JSON newData object to update with
    let newData = {
      categoryID: newPostCategory,
      Subject: newPostSubject,
      Body: newPostBody,
      Image: null,
    };

    // update the news item and give feedback
    let result = await newsService.editStudentNews(newsID, newData);
    if (result === undefined) {
      createSnackbar('News Posting Failed to Update', 'error');
    } else {
      createSnackbar('News Posting Updated Successfully', 'success');
      handleWindowClose();
    }
    loadNews(); //reload news
  }

  async function handleSubmit() {
    let newImage;

    if (cropperImageData !== null) {
      let croppedImage = cropperRef.current.cropper
        .getCroppedCanvas({ width: CROP_DIM })
        .toDataURL();
      newImage = croppedImage;
    }

    // create the JSON newData object to update with
    let newData = {
      categoryID: newPostCategory,
      Subject: newPostSubject,
      Body: newPostBody,
      Image: newImage,
    };

    // submit the news item and give feedback
    let result = await newsService.submitStudentNews(newData);
    if (result === undefined) {
      createSnackbar('News Posting Failed to Submit', 'error');
    } else {
      createSnackbar('News Posting Submitted Successfully', 'success');
      handleWindowClose();
      loadNews(); //reload news
    }
  }

  /**
   * When the Remove button is clicked for a posting image
   */
  async function handleImageUpdate() {
    let croppedImage = '';
    if (cropperImageData) {
      croppedImage = cropperRef.current.cropper.getCroppedCanvas({ width: CROP_DIM }).toDataURL();
    }

    let result = await newsService.editStudentNewsImage(currentlyEditingImage, croppedImage);
    if (result === undefined) {
      createSnackbar('News Posting image Failed to Update', 'error');
    } else {
      createSnackbar('News Posting image Updated Successfully', 'success');
      handlePhotoWindowClose();
    }

    loadNews();
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

  async function handleChangeNewsApprovalStatus(snid, newsStatusAccepted) {
    // update the news item accepted status and give feedback
    let result = await newsService.updateAcceptedStatus(snid, newsStatusAccepted);
    let statusAction = newsStatusAccepted ? 'approve' : 'unapprove';
    if (result === undefined) {
      createSnackbar(`News Posting Failed to ${statusAction}`, 'error');
    } else {
      createSnackbar(`News Posting ${statusAction}d Successfully`, 'success');
    }

    loadNews();
  }

  // the helper that loads image for cropper
  function imageOnLoadHelper(reader) {
    var dataURL = reader.result.toString();
    var i = new Image();
    i.onload = async () => {
      var aRatio = i.width / i.height;
      setAspectRatio(aRatio);
      setPhotoDialogError(null);
      setCropperImageData(dataURL);

      setShowCropper(true);
    };
    i.src = dataURL;
  }

  // the helper that loads image for dropper if there's any
  function DropperOnLoadHelper(dataURL) {
    var i = new Image();
    i.onload = async () => {
      var aRatio = i.width / i.height;
      setDropperAspectRatio(aRatio);
      setPhotoDialogError(null);
      setDropperImageData(dataURL);
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
      content =
        width < TAB_BREAKPOINT_WIDTH ? (
          <>
            <NewsList
              news={news}
              header={NEWS_HEADERS[0]}
              handleNewsItemEdit={handleNewsItemEdit}
              handleNewsImageEdit={handleNewsImageEdit}
              handleNewsItemDelete={handleNewsItemDelete}
              handleChangeNewsApprovalStatus={handleChangeNewsApprovalStatus}
              isUnapproved={false}
              isAdmin={isAdmin}
            />
            {personalUnapprovedNews.length > 0 && (
              <NewsList
                news={personalUnapprovedNews}
                header={NEWS_HEADERS[1]}
                handleNewsItemEdit={handleNewsItemEdit}
                handleNewsImageEdit={handleNewsImageEdit}
                handleNewsItemDelete={handleNewsItemDelete}
                handleChangeNewsApprovalStatus={handleChangeNewsApprovalStatus}
                isAdmin={false}
              />
            )}

            {isAdmin && unapprovedNews.length > 0 && (
              <NewsList
                news={unapprovedNews}
                header={NEWS_HEADERS[2]}
                handleNewsItemEdit={handleNewsItemEdit}
                handleNewsImageEdit={handleNewsImageEdit}
                handleNewsItemDelete={handleNewsItemDelete}
                handleChangeNewsApprovalStatus={handleChangeNewsApprovalStatus}
                isAdmin={isAdmin}
              />
            )}
          </>
        ) : (
          <>
            <TabContext value={tabValue}>
              <Tabs
                value={tabValue}
                onChange={handleSwitchTab}
                aria-label="News Lists"
                TabIndicatorProps={{
                  className: styles.tabsIndicator,
                }}
                className={styles.tabs}
              >
                <Tab
                  label={NEWS_HEADERS[0]}
                  value={NEWS_TABS[0]}
                  disableRipple={true}
                  className={
                    width < BREAKPOINT_WIDTH
                      ? isAdmin
                        ? styles.small_tab_admin_view
                        : styles.small_tab
                      : isAdmin
                      ? styles.tab_admin_view
                      : styles.tab
                  }
                />

                <Tab
                  label={NEWS_HEADERS[1]}
                  value={NEWS_TABS[1]}
                  disableRipple={true}
                  className={
                    width < BREAKPOINT_WIDTH
                      ? isAdmin
                        ? styles.small_mid_tab_admin_view
                        : styles.small_right_tab
                      : isAdmin
                      ? styles.mid_tab_admin_view
                      : styles.right_tab
                  }
                />

                {isAdmin && (
                  <Tab
                    label={NEWS_HEADERS[2]}
                    value={NEWS_TABS[2]}
                    disableRipple={true}
                    className={
                      width < BREAKPOINT_WIDTH ? styles.small_tab_admin_view : styles.tab_admin_view
                    }
                  />
                )}
              </Tabs>
              <TabPanel value={NEWS_TABS[0]} className={styles.tabPanel}>
                <NewsList
                  news={news}
                  header={NEWS_HEADERS[0]}
                  handleNewsItemEdit={handleNewsItemEdit}
                  handleNewsImageEdit={handleNewsImageEdit}
                  handleNewsItemDelete={handleNewsItemDelete}
                  handleChangeNewsApprovalStatus={handleChangeNewsApprovalStatus}
                  isUnapproved={false}
                  isAdmin={isAdmin}
                  tabBreakpointWidth={TAB_BREAKPOINT_WIDTH}
                />
              </TabPanel>
              <TabPanel value={NEWS_TABS[1]} className={styles.tabPanel}>
                <NewsList
                  news={personalUnapprovedNews}
                  header={NEWS_HEADERS[1]}
                  handleNewsItemEdit={handleNewsItemEdit}
                  handleNewsImageEdit={handleNewsImageEdit}
                  handleNewsItemDelete={handleNewsItemDelete}
                  handleChangeNewsApprovalStatus={handleChangeNewsApprovalStatus}
                  isAdmin={false}
                  tabBreakpointWidth={TAB_BREAKPOINT_WIDTH}
                />
              </TabPanel>
              {isAdmin && (
                <TabPanel value={NEWS_TABS[2]} className={styles.tabPanel}>
                  {isAdmin && (
                    <NewsList
                      news={unapprovedNews}
                      header={NEWS_HEADERS[2]}
                      handleNewsItemEdit={handleNewsItemEdit}
                      handleNewsImageEdit={handleNewsImageEdit}
                      handleNewsItemDelete={handleNewsItemDelete}
                      handleChangeNewsApprovalStatus={handleChangeNewsApprovalStatus}
                      isAdmin={isAdmin}
                      tabBreakpointWidth={TAB_BREAKPOINT_WIDTH}
                    />
                  )}
                </TabPanel>
              )}
            </TabContext>
          </>
        );
    }

    let createPhotoDialogBox = () => {
      return (
        <Dialog
          className="gc360_photo_dialog"
          open={currentlyEditingImage}
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
                        style={{ height: 200, width: 200 * dropperAspectRatio }}
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        {dropperImageData ? (
                          <img
                            className="gc360_photo_dialog_box_content_dropzone_img"
                            src={dropperImageData}
                            alt="Photo"
                          />
                        ) : (
                          <></>
                        )}
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
                    autoCropArea={1}
                    viewMode={3}
                    aspectRatio={aspectRatio}
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
                  color={dropperImageData ? 'primary' : 'error'}
                  onClick={() => {
                    setShowCropper(null);
                    setCropperImageData(null);
                  }}
                  className="gc360_photo_dialog_box_content_button"
                >
                  {dropperImageData ? 'Go Back' : 'Remove Picture'}
                </Button>
              )}
            </DialogActions>
            <DialogActions className="gc360_photo_dialog_box_actions_bottom">
              <Button variant="outlined" color="primary" onClick={handlePhotoWindowClose}>
                Cancel
              </Button>
              {!showCropper && dropperImageData && (
                <Tooltip
                  classes={{ tooltip: 'tooltip' }}
                  id="tooltip-reset"
                  title="Reset the Rec-IM logo to default Logo"
                >
                  <Button variant="contained" color="error" onClick={handleImageUpdate}>
                    Remove
                  </Button>
                </Tooltip>
              )}
              {showCropper && (
                <Tooltip
                  classes={{ tooltip: 'tooltip' }}
                  id="tooltip-submit"
                  title="Crop to current region and submit"
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleImageUpdate}
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
    };

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
            <Grid item xs={12} lg={8} style={{ marginBottom: '7rem' }}>
              {/* list of news */}
              {content}
            </Grid>
          </Grid>

          {/* Create Photo Dialog Box */}
          {createPhotoDialogBox()}

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
            {!currentlyEditing && (
            <div className="gc360_photo_dialog_box">
              <DialogContent className="gc360_photo_dialog_box_content">
                <DialogContentText className="gc360_photo_dialog_box_content_text">
                  {createPhotoDialogBoxMessage()}
                </DialogContentText>
                {!cropperImageData && (
                  <Dropzone
                    onDropAccepted={onDropAccepted}
                    onDropRejected={onDropRejected}
                    accept={{
                      'image/*': ['.jpeg', ',jpg', '.png'],
                    }}
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
                      checkCrossOrigin={false}
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
                        checkCrossOrigin={false}
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
            )}
            {/* SUBMISSION GUIDELINES */}
            <Typography variant="caption" color="textSecondary" display="block">
              Student News is intended for announcing Gordon sponsored events, lost and found,
              rides, etc. All submissions must follow the Student News guidelines and will be
              reviewed at the discretion of The Office of Student Life...
              <a
                href="https://gordonedu.sharepoint.com/:b:/g/StudentLife/admin/EY22_o3g6vFEsfT2nYY-8JwB34OlYmA1oaE1f4FTGD2gew"
                target="_blank"
                rel="noreferrer"
              >
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
    return <GordonUnauthenticated feature={'the student news page'} />;
  }
};

export default StudentNews;
