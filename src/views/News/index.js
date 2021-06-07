import React, { Component } from 'react';
import PostAddIcon from '@material-ui/icons/PostAdd';
import newsService from 'services/news';
import userService from 'services/user';
import NewsList from './components/NewsList';
import GordonLoader from 'components/Loader';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { gordonColors } from 'theme';
import {
  Snackbar,
  IconButton,
  Grid,
  TextField,
  Tooltip,
  Button,
  Fab,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  MenuItem,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ReactComponent as NoConnectionImage } from 'NoConnection.svg';
// testing for future feature to upload image
// import IDUploader from '../IDUploader';
// import Dropzone from 'react-dropzone';

export default class StudentNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      search: '',
      openPostActivity: false,
      loading: true,
      categories: [],
      news: [],
      personalUnapprovedNews: [],
      filteredNews: [],
      network: 'online',
      newPostCategory: '',
      newPostSubject: '',
      newPostBody: '',
      newPostImage: '',
      showCropper: null,
      openPhotoDialog: false,
      photoDialogErrorTimeout: null,
      photoDialogError: null,
      cropBoxDim: null,
      aspectRatio: null,
      snackbarOpen: false,
      snackbarMessage: 'Something went wrong',
      currentUsername: '',
      // false if not editing, newsID if editing
      currentlyEditing: false,
    };
    this.cropperRef = React.createRef();
    this.isMobileView = false;
    this.breakpointWidth = 540;
    this.updateSnackbar = this.updateSnackbar.bind(this);
    this.handleNewsItemEdit = this.handleNewsItemEdit.bind(this);
    this.callFunction = this.callFunction.bind(this);
    this.CROP_DIM = 200; // pixels

    this.setShowCropper = this.setShowCropper.bind(this);
    this.setPhotoDialogError = this.setPhotoDialogError.bind(this);
    this.setOpenPhotoDialog = this.setOpenPhotoDialog.bind(this);
    this.setCropperData = this.setCropperData.bind(this);
    this.setCropperRatio = this.setCropperRatio.bind(this);
    this.maxCropPreviewWidth = this.maxCropPreviewWidth.bind(this);
    this.minCropBoxDim = this.minCropBoxDim.bind(this);
    this.clearPhotoDialogErrorTimeout = this.clearPhotoDialogErrorTimeout.bind(this);
    this.createPhotoDialogBoxMessage = this.createPhotoDialogBoxMessage.bind(this);
    this.onCropperZoom = this.onCropperZoom.bind(this);
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.imageOnLoadHelper = this.imageOnLoadHelper.bind(this);
    this.onDropRejected = this.onDropRejected.bind(this);
    this.handleCloseCancel = this.handleCloseCancel.bind(this);
    this.handleCloseSubmit = this.handleCloseSubmit.bind(this);

    this.styles = {
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
          width: this.showCropper ? '38%' : '86%',
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
  }

  setShowCropper = (dataURL) => {
    this.setState({ showCropper: dataURL });
    console.log('worked');
    console.log(dataURL);
  };

  setPhotoDialogError = (value) => {
    this.setState({ photoDialogError: value });
  };

  setOpenPhotoDialog(bool) {
    this.setState({ openPhotoDialog: bool });
  }

  setCropperData = (dimensions, ratio) => {
    this.setState({ cropBoxDim: dimensions, aspectRatio: ratio });
  };

  setCropperRatio(ratio) {
    this.setState({ aspectRatio: ratio });
  }

  //copied from Identification
  maxCropPreviewWidth() {
    const smallScreenRatio = 0.5;
    const largeScreenRatio = 0.25;
    const w = this.breakpointWidth; //const w = currentWidth;
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

  //Copied from Identification
  minCropBoxDim = (imgWidth, dispWidth) => {
    return (this.CROP_DIM * dispWidth) / imgWidth;
  };

  componentDidMount() {
    this.setState({ loading: false });
    this.loadNews();
    this.loadUsername();
    window.addEventListener('resize', this.resize);
  }

  async loadUsername() {
    const user = await userService.getProfileInfo();
    this.setState({
      currentUsername: user.AD_Username,
    });
  }

  handlePostClick() {
    this.setState({
      openPostActivity: true,
    });
  }

  handleWindowClose() {
    this.setState({
      openPostActivity: false,
      newPostCategory: '',
      newPostSubject: '',
      newPostBody: '',
      newPostImage: '',
      currentlyEditing: false,
    });
  }

  handleSnackbarClose = (reason) => {
    // not sure what reason is
    // console.log(reason);
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  // 'New Post' Handlers
  onChange(event) {
    if (event.target.name === null || event.target.name === '') {
      throw new Error(
        'The name of the input must be set ' +
          "to the appropriate 'state' property value " +
          'for the onChange() function to work',
      );
    }
    this.setState({ [event.target.name]: event.target.value });
  }

  callFunction(functionName, param) {
    if (functionName == null) {
      throw new Error('Function name not specified to callFunction (news)');
    }
    switch (functionName) {
      case 'updateSnackbar':
        if (param == null) {
          throw new Error("callFunction 'Update Snackbar' requires a parameter (news)");
        }
        this.updateSnackbar(param);
        break;
      case 'handleNewsItemEdit':
        if (param == null) {
          throw new Error("callFunction 'handleNewsItemEdit' requires a parameter (news)");
        }
        this.handleNewsItemEdit(param);
        break;
      default:
        console.log('callFunction function name not applicable, double check your parameter');
    }
  }

  async clearPhotoDialogErrorTimeout() {
    console.log('got to clearPhoto');
    return new Promise((resolve, reject) => {
      clearTimeout(this.photoDialogErrorTimeout);
      this.setState({ photoDialogErrorTimeout: null, photoDialogError: null });
      resolve(true);
    });
  }

  /**
   * Creates the Photo Dialog message that will be displayed to the user
   *
   * @return {String} The message of the Photo Dialog
   *
   * Copied from Identification
   */
  createPhotoDialogBoxMessage() {
    let message = '';
    // If an error occured and there's no currently running timeout, the error is displayed
    // and a timeout for that error message is created
    if (this.photoDialogError !== null) {
      message = <span style={{ color: '#B63228' }}>{this.photoDialogError}</span>;
      if (this.photoDialogErrorTimeout === null) {
        // Shows the error message for 6 seconds and then returns back to normal text
        this.photoDialogErrorTimeout = setTimeout(() => {
          this.setState({ photoDialogErrorTimeout: null }); //photoDialogErrorTimeout = null;
          this.setPhotoDialogError(null);
        }, 6000);
      }
    }
    // If no error occured and the cropper is shown, the cropper text is displayed
    else if (this.showCropper) {
      message = 'Crop Photo to liking & Click Submit';
    }
    // If no error occured and the cropper is not shown, the pick a file text is displayed
    else {
      message =
        this.breakpointWidth === 'md' ||
        this.breakpointWidth === 'sm' ||
        this.breakpointWidth === 'xs'
          ? //currentWidth === 'md' || currentWidth === 'sm' || currentWidth === 'xs'
            'Tap Image to Browse Files'
          : 'Drag & Drop Picture, or Click to Browse Files';
    }
    console.log('do we get to photodialogmessage');
    return message;
  }

  onCropperZoom(event) {
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
  onDropAccepted = (fileList) => {
    var previewImageFile = fileList[0];
    var reader = new FileReader();
    console.log('got to onDropAccepted');
    reader.onload = () => {
      this.imageOnLoadHelper(reader);
    };
    reader.readAsDataURL(previewImageFile);
    console.log('read the file');
  };

  imageOnLoadHelper(reader) {
    var dataURL = reader.result.toString();
    var i = new Image();
    console.log('got into a file reader');
    i.onload = async () => {
      if (i.width < this.CROP_DIM || i.height < this.CROP_DIM) {
        await this.clearPhotoDialogErrorTimeout();
        this.setPhotoDialogError(
          'Sorry, your image is too small! Image dimensions must be at least 200 x 200 pixels.',
        );
      } else {
        var aRatio = i.width / i.height;
        //this.setCropperData({ aspectRatio: aRatio });
        this.setCropperRatio(aRatio);
        var maxWidth = this.maxCropPreviewWidth;
        var displayWidth = maxWidth > i.width ? i.width : maxWidth;
        var cropDim = this.minCropBoxDim(i.width, displayWidth);
        this.setPhotoDialogError(null);
        this.setCropperData({ cropDim, aRatio });
        this.setShowCropper(dataURL); //does anything happen here.
        console.log('did we make it');
      }
    };
    i.src = dataURL;
  }

  /**
   * Handles the rejection of the user dropping an invalid file in the Photo Updater Dialog Box
   * Copied from Identification
   */
  async onDropRejected() {
    console.log('onDrop');
    await this.clearPhotoDialogErrorTimeout();
    this.setPhotoDialogError('Sorry, invalid image file! Only PNG and JPEG images are accepted.');
  }

  /**
   * Handles closing the Photo Updater Dialog Box
   * Copied from Identification
   */
  async handleCloseCancel() {
    this.setOpenPhotoDialog(false);
    this.setShowCropper(null);
    await this.clearPhotoDialogErrorTimeout;
  }

  /**
   * Handles submission of a new photo in the Photo Updater Dialog Box
   *
   * Copied from Identification
   */
  handleCloseSubmit() {
    if (this.showCropper != null) {
      let croppedImage = this.cropperRef.current.cropper
        .getCroppedCanvas({ width: this.CROP_DIM })
        .toDataURL();
      let newImage = croppedImage.replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
      this.setState({ newPostImage: newImage });
      //let response = user.postImage(croppedImage);
      /*
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
          window.postMessage('update-profile-picture', window.location.origin);
        })
        .catch(() => {
          // Displays to the user that their photo failed to submit
          createSnackbar('Photo Submission Failed', 'error');
        });
        */
    }
  }

  /**
   * Creates the Photo Uploader Box for a News posting
   *
   * @return {JSX} The JSX of the Photo Updater
   *
   * NOT BEING USED ATM
   */
  createNewsImageUploader() {
    return '';
  }

  // Function called when 'edit' clicked for a news item
  async handleNewsItemEdit(newsID) {
    let newsItem = await newsService.getPostingByID(newsID);
    this.setState({
      openPostActivity: true,
      newPostCategory: newsItem.categoryID,
      newPostSubject: newsItem.Subject,
      newPostBody: newsItem.Body,
      newPostImage: newsItem.Image,
      currentlyEditing: newsID,
    });
  }

  updateSnackbar(message) {
    this.setState({ snackbarMessage: message });
    this.setState({ snackbarOpen: true });
  }

  // Handles the actual 'edit' submission
  async handleUpdate() {
    let newsID = this.state.currentlyEditing;
    // create the JSON newData object to update with
    let newData = {
      categoryID: this.state.newPostCategory,
      Subject: this.state.newPostSubject,
      Body: this.state.newPostBody,
      Image: this.state.newPostImage,
    };

    // update the news item and give feedback
    let result = await newsService.editStudentNews(newsID, newData);
    if (result === undefined) {
      this.updateSnackbar('News Posting Failed to Update');
    } else {
      this.updateSnackbar('News Posting Updated Successfully');
    }

    // close the window and reload to update data
    // (necessary since data is currently not pulled from render method)
    this.setState({ openPostActivity: false });
    window.top.location.reload();
  }

  async handleSubmit() {
    // create the JSON newsItem object to post
    let newsItem = {
      categoryID: this.state.newPostCategory,
      Subject: this.state.newPostSubject,
      Body: this.state.newPostBody,
      Image: this.state.newPostImage,
    };

    // submit the news item and give feedback
    let result = await newsService.submitStudentNews(newsItem);
    if (result === undefined) {
      this.updateSnackbar('News Posting Failed to Submit');
    } else {
      this.updateSnackbar('News Posting Submitted Successfully');
    }

    // close the window and reload to update data
    // (necessary since data is currently not pulled from render method)
    this.setState({ openPostActivity: false });
    window.top.location.reload();
  }

  // This should be the only time we pull from the database
  async loadNews() {
    this.setState({ loading: true });

    if (this.props.authentication) {
      const newsCategories = await newsService.getCategories();
      const personalUnapprovedNews = await newsService.getPersonalUnapprovedFormatted();
      const unexpiredNews = await newsService.getNotExpiredFormatted();
      this.setState({
        loading: false,
        categories: newsCategories,
        news: unexpiredNews,
        personalUnapprovedNews: personalUnapprovedNews,
        filteredNews: unexpiredNews,
      });
    } else {
      // TODO: test authentication handling and neaten code (ex. below)
      // alert("Please sign in to access student news");
    }
  }

  // TODO: Currently disabled and unused
  search() {
    return async (event) => {
      // await ensures state has been updated before continuing
      await this.setState({
        search: event.target.value,
      });
      const filteredNews = await newsService.getFilteredNews(this.state);
      this.setState({ filteredNews: filteredNews, loading: false });
    };
  }

  //Has to rerender on screen resize in order for table to switch to the mobile view
  resize = () => {
    if (this.breakpointPassed()) {
      this.isMobileView = !this.isMobileView;
      this.forceUpdate();
    }
  };

  //checks if the screen has been resized past the mobile breakpoint
  //allows for forceUpdate to only be called when necessary, improving resizing performance
  breakpointPassed() {
    if (this.isMobileView && window.innerWidth > this.breakpointWidth) return true;
    if (!this.isMobileView && window.innerWidth < this.breakpointWidth) return true;
    else return false;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    // if all of the inputs are filled, enable 'submit' button
    let submitButtonDisabled =
      this.state.newPostCategory === '' ||
      this.state.newPostSubject === '' ||
      this.state.newPostBody === ''; // || this.state.newPostImage === '';
    let content;

    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', (event) => {
      if (
        event.data === 'online' &&
        this.state.network === 'offline' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'online' });
      } else if (
        event.data === 'offline' &&
        this.state.network === 'online' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'offline' });
      }
    });

    /* Gets status of current network connection for online/offline rendering
     *  Defaults to online in case of PWA not being possible
     */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

    if (this.props.authentication) {
      if (this.state.loading === true) {
        content = <GordonLoader />;
      } else if (this.state.news.length > 0 || this.state.personalUnapprovedNews.length > 0) {
        content = (
          <NewsList
            news={this.state.filteredNews}
            personalUnapprovedNews={this.state.personalUnapprovedNews}
            updateSnackbar={this.updateSnackbar}
            currentUsername={this.state.currentUsername}
            callFunction={this.callFunction}
          />
        );
      } else {
        content = (
          <Typography variant="h4" align="center">
            No News To Show
          </Typography>
        );
      }

      let submitButton = (
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSubmit.bind(this)}
          disabled={submitButtonDisabled}
        >
          Submit
        </Button>
      );
      let editButton = (
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleUpdate.bind(this)}
          disabled={submitButtonDisabled}
        >
          Update
        </Button>
      );

      let news;
      // If the user is online
      if (
        networkStatus === 'online' ||
        (networkStatus === 'offline' && this.props.authentication)
      ) {
        news = (
          <>
            {/* Button to Create Posting */}
            <Fab
              variant="extended"
              color="primary"
              onClick={this.handlePostClick.bind(this)}
              style={this.styles.fab}
            >
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
                  style={this.styles.searchBar}
                  spacing={5}
                >
                  <Grid item xs={10} sm={8} md={8} lg={6}>
                    <TextField
                      id="search"
                      label="Search news"
                      value={this.state.search}
                      onChange={this.search('search')}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* NOTE: leaving helper text for now in case
              that is better than disabling submit button */}
              {/* Create Posting */}
              <Dialog open={this.state.openPostActivity} fullWidth>
                <DialogTitle> Post on Student News </DialogTitle>
                <DialogContent>
                  <Grid container>
                    {/* CATEGORY ENTRY */}
                    <Grid item>
                      <TextField
                        select
                        label="Category"
                        name="newPostCategory"
                        value={this.state.newPostCategory}
                        onChange={this.onChange.bind(this)}
                        // helperText="Please choose a category."
                        style={{ minWidth: '7rem' }}
                      >
                        {this.state.categories.map((category) => (
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
                        margin="dense"
                        fullWidth
                        name="newPostSubject"
                        value={this.state.newPostSubject}
                        onChange={this.onChange.bind(this)}
                        // helperText="Please enter a subject."
                      />
                    </Grid>

                    {/* BODY ENTRY */}
                    <Grid item xs={12}>
                      <TextField
                        label="Body"
                        margin="normal"
                        multiline
                        fullWidth
                        rows={4}
                        variant="outlined"
                        name="newPostBody"
                        value={this.state.newPostBody}
                        onChange={this.onChange.bind(this)}
                        // helperText="Please enter a body."
                      />
                    </Grid>

                    {/* IMAGE ENTRY */}
                    <Grid item xs={12}>
                      <div className="gc360-photo-dialog-box">
                        {
                          <DialogTitle className="gc360-photo-dialog-box_title">
                            Update Photo
                          </DialogTitle>
                        }
                        <DialogContent className="gc360-photo-dialog-box_content">
                          <DialogContentText className="gc360-photo-dialog-box_content_text">
                            {this.createPhotoDialogBoxMessage()}
                          </DialogContentText>
                          {!this.state.showCropper && (
                            <Dropzone
                              onDropAccepted={this.onDropAccepted}
                              onDropRejected={this.onDropRejected}
                              accept="image/jpeg, image/jpg, image/png"
                            >
                              {({ getRootProps, getInputProps }) => (
                                <section>
                                  <div
                                    className="gc360-photo-dialog-box_content_dropzone"
                                    {...getRootProps()}
                                  >
                                    <input {...getInputProps()} />
                                    <img
                                      className="gc360-photo-dialog-box_content_dropzone_img"
                                      src={`data:image/jpg;base64,${this.state.newPostImage}`}
                                      alt=" "
                                    />
                                  </div>
                                </section>
                              )}
                            </Dropzone>
                          )}
                          {this.state.showCropper && (
                            <div className="gc360-photo-dialog-box_content_cropper">
                              <Cropper
                                ref={this.cropperRef}
                                src={this.state.showCropper}
                                style={{
                                  maxWidth: this.maxCropPreviewWidth(),
                                  maxHeight: this.maxCropPreviewWidth() / this.state.aspectRatio,
                                }}
                                autoCropArea={1}
                                viewMode={3}
                                aspectRatio={1}
                                highlight={false}
                                background={false}
                                zoom={this.onCropperZoom}
                                zoomable={false}
                                dragMode={'none'}
                                minCropBoxWidth={this.cropBoxDim}
                                minCropBoxHeight={this.cropBoxDim}
                              />
                            </div>
                          )}
                        </DialogContent>
                        <DialogActions className="gc360-photo-dialog-box_actions-top">
                          {this.showCropper && (
                            <Button
                              variant="contained"
                              onClick={() => this.setShowCropper(null)} //() => this.setShowCropper(null)}
                              //Not sure which is right
                              style={this.styles.button.changeImageButton}
                              className="gc360-photo-dialog-box_content_button"
                            >
                              Go Back
                            </Button>
                          )}
                        </DialogActions>
                        {/*!this.showCropper && (
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
                              )*/}
                        <DialogActions className="gc360-photo-dialog-box_actions-bottom">
                          <Button
                            variant="contained"
                            onClick={this.handleCloseCancel}
                            style={this.styles.button.cancelButton}
                          >
                            Cancel
                          </Button>
                          {this.state.showCropper && (
                            <Tooltip
                              classes={{ tooltip: 'tooltip' }}
                              id="tooltip-submit"
                              title="Crop to current region and submit"
                            >
                              <Button
                                variant="contained"
                                onClick={this.handleCloseSubmit}
                                disabled={!this.state.showCropper}
                                style={
                                  this.state.showCropper
                                    ? this.styles.button
                                    : this.styles.button.hidden
                                }
                              >
                                Submit
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
                        found, rides, etc. All submissions must follow the Student News guidelines
                        and will be reviewed at the discretion of The Office of Student Life...
                        <a href="https://gordonedu.sharepoint.com/:b:/g/StudentLife/admin/EY22_o3g6vFEsfT2nYY-8JwB34OlYmA1oaE1f4FTGD2gew">
                          More Details
                        </a>
                      </Typography>
                    </Grid>
                  </Grid>
                </DialogContent>

                {/* CANCEL/SUBMIT/EDIT */}
                {
                  <DialogActions>
                    <Button variant="contained" onClick={this.handleWindowClose.bind(this)}>
                      Cancel
                    </Button>
                    {this.state.currentlyEditing === false ? submitButton : editButton}
                  </DialogActions>
                }
              </Dialog>

              {/* USER FEEDBACK */}
              <Snackbar
                open={this.state.snackbarOpen}
                message={this.state.snackbarMessage}
                onClose={this.handleSnackbarClose}
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
                    onClick={this.handleSnackbarClose}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              ></Snackbar>

              <Grid item xs={12} lg={8} style={{ marginBottom: '7rem' }}>
                {/* list of news */}
                {content}
              </Grid>
            </Grid>
          </>
        );
      }
      // If the user is offline
      else {
        news = (
          <Grid container justify="center" spacing="16">
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent
                  style={{
                    margin: 'auto',
                    textAlign: 'center',
                  }}
                >
                  <Grid
                    item
                    xs={2}
                    alignItems="center"
                    style={{
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <NoConnectionImage />
                  </Grid>
                  <br />
                  <h1>Please Re-establish Connection</h1>
                  <h4>Viewing Events has been deactivated due to loss of network.</h4>
                  <br />
                  <br />
                  <Button
                    color="primary"
                    backgroundColor="white"
                    variant="outlined"
                    onClick={() => {
                      window.location.pathname = '';
                    }}
                  >
                    Back To Home
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      }
      return news;
    } else {
      return (
        <Grid container justify="center">
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent
                style={{
                  margin: 'auto',
                  textAlign: 'center',
                }}
              >
                <h1>You are not logged in.</h1>
                <br />
                <h4>You must be logged in to view use Student News.</h4>
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    window.location.pathname = '';
                  }}
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    }
  }
}
