import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CardContent,
  Grid,
  Typography,
  withWidth,
} from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import { gordonColors } from '../../theme';
import IdCardDefault from '../IDUploader/image-default.png';
import IdCardGreen from '../IDUploader/image-green.png';
import IdCardTop from '../IDUploader/image-top.png';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './IDUploader.css';
import user from '../../services/user';
import errorLog from '../../services/errorLog';
import Login from '../Login';

const CROP_DIM = 1200; // pixels
class IDUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      preview: null,
      photoOpen: false,
      submitDialogOpen: false,
      errorDialogOpen: false,
      cropperData: { cropBoxDim: null, aspectRatio: null },
      files: [],
      IdCardPlaceholder: IdCardDefault,
    };
  }

  handleUploadPhoto = () => {
    this.setState({ photoOpen: true });
  };

  handleCloseSubmit = () => {
    if (this.state.preview != null) {
      var croppedImage = this.refs.cropper.getCroppedCanvas({ width: CROP_DIM }).toDataURL();
      this.postCroppedImage(croppedImage, 0);
      var imageNoHeader = croppedImage.replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
      this.setState({
        image: imageNoHeader,
        photoOpen: false,
        preview: null,
        IdCardPlaceholder: croppedImage,
      });
      window.didProfilePicUpdate = true;
    }
  };

  async postCroppedImage(croppedImage, attemptNumber) {
    let profile = await user.getProfileInfo();
    let logMessage =
      'ID photo submission #' +
      attemptNumber +
      ' for ' +
      profile.fullName +
      ' from ' +
      errorLog.parseNavigator(navigator);
    try {
      await user.postIDImage(croppedImage);
      this.setState({ submitDialogOpen: true });
    } catch (error) {
      let errorMessage = ', but image failed to post with error: ' + error;
      logMessage = errorMessage + logMessage;
      if (attemptNumber < 5) {
        this.postCroppedImage(croppedImage, attemptNumber + 1);
      } else {
        this.setState({ errorDialogOpen: true });
      }
    }
    errorLog.postErrorMessage(logMessage);
  }

  handleCloseCancel = () => {
    this.setState({ photoOpen: false, preview: null });
  };

  handleCloseOkay = () => {
    this.setState({ submitDialogOpen: false, errorDialogOpen: false });
  };

  maxCropPreviewWidth() {
    /* this logic was probably great but I did not have time to learn it and fix it.
       The fix it needs is replacing use of innerWidth with this.props.width (converted
       from a string like 'xs' to a numerical size like 360
       If you have time, please: make this function better */

    //const breakpointWidth = 960;
    //const smallScreenRatio = 0.75;
    //const largeScreenRatio = 0.525;
    //const maxHeightRatio = 0.5;

    // const aspect = this.state.cropperData.aspectRatio;
    // var maxWidth =
    //   window.innerWidth *
    //   (window.innerWidth < breakpointWidth ? smallScreenRatio : largeScreenRatio);
    // var correspondingHeight = maxWidth / aspect;
    // var maxHeight = window.innerHeight * maxHeightRatio;
    // var correspondingWidth = maxHeight * aspect;

    // if (correspondingHeight > maxHeight) {
    //   return correspondingWidth;
    // } else {
    //   return maxWidth;
    // }

    const smallScreenRatio = 0.5;
    const largeScreenRatio = 0.25;
    const w = this.props.width;
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

  minCropBoxDim(imgWidth, dispWidth) {
    return (CROP_DIM * dispWidth) / imgWidth;
  }

  onDropAccepted(fileList) {
    var previewImageFile = fileList[0];
    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result.toString();
      var i = new Image();
      i.onload = function() {
        if (i.width < CROP_DIM || i.height < CROP_DIM) {
          alert(
            'Sorry, your image is too small! Image dimensions must be at least 1200 x 1200 pixels.',
          );
        } else {
          var aRatio = i.width / i.height;
          this.setState({ cropperData: { aspectRatio: aRatio } });
          var maxWidth = this.maxCropPreviewWidth();
          var displayWidth = maxWidth > i.width ? i.width : maxWidth;
          var cropDim = this.minCropBoxDim(i.width, displayWidth);
          this.setState({ cropperData: { aspectRatio: aRatio, cropBoxDim: cropDim } });
          this.setState({ preview: dataURL });
          this.onCropperMove();
        }
      }.bind(this);
      i.src = dataURL;
    }.bind(this);
    reader.readAsDataURL(previewImageFile);
  }

  onDropRejected() {
    alert('Sorry, invalid image file! Only PNG and JPEG images are accepted.');
  }

  onCropperZoom(event) {
    if (event.detail.ratio > 1) {
      event.preventDefault();
      this.refs.cropper.zoomTo(1);
    }
  }

  onCropperMove() {
    // Keyboard support for cropping
    document.addEventListener('keydown', e => {
      if (this.refs.cropper != null) {
        let data = this.refs.cropper.getCropBoxData();
        if (e.code === 'ArrowUp') {
          data.top -= 5;
        } else if (e.code === 'ArrowDown') {
          data.top += 5;
        } else if (e.code === 'ArrowRight') {
          data.left += 5;
        } else if (e.code === 'ArrowLeft') {
          data.left -= 5;
        } else if (e.code === 'Equal') {
          data.height += 5;
          data.width += 5;
        } else if (e.code === 'Minus') {
          data.height -= 5;
          data.width -= 5;
        }
        this.refs.cropper.setCropBoxData(data);
      }
    });
  }

  render() {
    const { preview } = this.state;

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
        background: gordonColors.primary.cyan,
        color: 'white',
      },

      uploadButton: {
        background: gordonColors.primary.cyan,
        color: 'white',
        marginTop: '20px',
      },

      uncontainedButton: {
        color: gordonColors.primary.cyan,
      },

      media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
      },

      instructionsText: {
        fontSize: '15pt',
      },
    };

    let content;
    if (this.props.Authentication) {
      content = (
        <Fragment>
          <Grid item xs={12} md={6} lg={8}>
            <Card>
              <CardContent>
                <Grid container justify="center" direction="column">
                  <Grid item align="center">
                    <Typography align="center" variant="h6" style={{ fontWeight: 'bold' }}>
                      ID Photo Guidelines
                    </Typography>
                    <Typography align="left" variant="body2" style={style.instructionsText}>
                      <br />
                      1. Facial features must be identifiable. <br />
                      2. No sunglasses or hats. <br />
                      3. Photo must include your shoulders to the top of your head. <br />
                      4. While this does not need to be a professional photo, it does need to be a
                      reasonable representation of your face for an official campus ID card. As long
                      as it meets the criteria, most cameras on a phone will work fine.
                    </Typography>
                  </Grid>
                  <Grid item align="center">
                    <Button
                      variant="contained"
                      style={style.uploadButton}
                      onClick={this.handleUploadPhoto}
                    >
                      Tap to Upload
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4} justify="center">
            <Grid container justify="center">
              <Card raised={true}>
                <Grid item style={{ margin: '10px' }}>
                  <div>
                    <img
                      src={IdCardTop}
                      alt="ID card top with Gordon College logo."
                      className="placeholder-id"
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <Grid container style={{ width: '406px' }}>
                    <Grid item style={{ marginLeft: '10px', width: '320px', marginBottom: '5px' }}>
                      <div>
                        <img
                          src={this.state.IdCardPlaceholder}
                          alt="Placeholder ID."
                          className="placeholder-id"
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                      </div>
                    </Grid>
                    <Grid item style={{ marginLeft: '7px', width: '53px', marginBottom: '5px' }}>
                      <div>
                        <img
                          src={IdCardGreen}
                          alt="Colored bar with text 'student'."
                          className="placeholder-id"
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Fragment>
      );
    } else {
      content = (
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
                <h4>
                  Please log in to upload an ID photo. You can press the back button or follow the
                  URL "360.gordon.edu/id" to return to this page.
                </h4>
                <br />
                {/*<Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    window.location.pathname = '';
                  }}
                >
                  Login
                </Button>*/}
                <Login onLogIn={this.props.onLogIn} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container justify="center" spacing="2">
        {content}

        <Dialog
          open={this.state.photoOpen}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="gc360-id-dialog">
            <DialogTitle className="gc360-id-dialog_title" id="simple-dialog-title">
              Update ID Picture
            </DialogTitle>
            <DialogContent className="gc360-id-dialog_content">
              <DialogContentText className="gc360-id-dialog_content_text">
                {this.props.width === 'md' || this.props.width === 'sm' || this.props.width === 'xs'
                  ? 'Tap Image to Browse Files'
                  : 'Drag & Drop Picture, or Click to Browse Files'}
                <br /> Use the arrow keys to move the crop box.
                <br /> Use + or - to resize.
              </DialogContentText>
              {!preview && (
                <Dropzone
                  onDropAccepted={this.onDropAccepted.bind(this)}
                  onDropRejected={this.onDropRejected.bind(this)}
                  accept="image/jpeg, image/jpg, image/png"
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div className="gc360-id-dialog_content_dropzone" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <img
                          className="gc360-id-dialog_content_dropzone_img"
                          src={`data:image/jpg;base64,${this.state.image}`}
                          alt=""
                          style={{ 'max-width': '140px', 'max-height': '140px' }}
                        />
                      </div>
                    </section>
                  )}
                </Dropzone>
              )}
              {preview && (
                <div className="gc360-id-dialog_content_cropper">
                  <Cropper
                    ref="cropper"
                    src={preview}
                    style={{
                      'max-width': this.maxCropPreviewWidth(),
                      'max-height': this.maxCropPreviewWidth() / this.state.cropperData.aspectRatio,
                    }}
                    autoCropArea={1}
                    viewMode={3}
                    aspectRatio={1}
                    highlight={false}
                    background={false}
                    zoom={this.onCropperZoom.bind(this)}
                    zoomable={false}
                    dragMode={'none'}
                    move={this.onCropperMove.bind(this)}
                    minCropBoxWidth={this.state.cropperData.cropBoxDim}
                    minCropBoxHeight={this.state.cropperData.cropBoxDim}
                  />
                </div>
              )}
              {preview && (
                <Button
                  variant="contained"
                  onClick={() => this.setState({ preview: null })}
                  style={style.button}
                  className="gc360-id-dialog_content_button"
                >
                  Choose Another Image
                </Button>
              )}
            </DialogContent>
            <DialogActions className="gc360-id-dialog_actions">
              <Button variant="contained" onClick={this.handleCloseCancel} style={style.button}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={this.handleCloseSubmit}
                disabled={!this.state.preview}
                style={
                  this.state.preview ? style.button : { background: 'darkgray', color: 'white' }
                }
              >
                Submit
              </Button>
            </DialogActions>
          </div>
        </Dialog>

        <Dialog
          open={this.state.submitDialogOpen}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          maxWidth="false"
        >
          <DialogTitle id="simple-dialog-title">Photo Submitted</DialogTitle>
          <DialogContent>
            <DialogContentText className="submittedText">
              Your ID photo has been sent successfully! <br /> CTS will contact you if your photo
              does not meet the stated criteria.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2} justify="flex-end">
              <Grid item />
              <Grid item>
                <Button variant="contained" onClick={this.handleCloseOkay} style={style.button}>
                  Okay
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.errorDialogOpen}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          maxWidth="false"
        >
          <DialogTitle id="simple-dialog-title">Photo Submitted</DialogTitle>
          <DialogContent>
            <DialogContentText className="submittedText">
              Looks like something went wrong on our end! <br /> Try resubmitting your photo.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2} justify="flex-end">
              <Grid item />
              <Grid item>
                <Button variant="contained" onClick={this.handleCloseOkay} style={style.button}>
                  Okay
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

export default withWidth()(IDUploader);
