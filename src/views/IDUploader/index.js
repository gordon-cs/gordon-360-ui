import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  withWidth,
} from '@material-ui/core';
import 'cropperjs/dist/cropper.css';
import { Component, createRef } from 'react';
import Cropper from 'react-cropper';
import Dropzone from 'react-dropzone';
import { authenticate } from 'services/auth';
import errorLog from 'services/errorLog';
import user from 'services/user';
import { gordonColors } from 'theme';
import styles from './IDUploader.module.css';
import IdCardDefault from './image-default.png';
import IdCardGreen from './image-green.png';
import IdCardTop from './image-top.png';

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
    this.cropperRef = createRef();
  }

  handleUploadPhoto = () => {
    this.setState({ photoOpen: true });
  };

  handleCloseSubmit = () => {
    if (this.state.preview != null) {
      var croppedImage = this.cropperRef.current.cropper
        .getCroppedCanvas({ width: CROP_DIM })
        .toDataURL();
      this.postCroppedImage(croppedImage, 0);
      var imageNoHeader = croppedImage.replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
      this.setState({
        image: imageNoHeader,
        photoOpen: false,
        preview: null,
        IdCardPlaceholder: croppedImage,
      });
      window.postMessage('update-profile-picture', window.location.origin);
    }
  };

  async postCroppedImage(croppedImage, attemptNumber) {
    let profile = await user.getProfileInfo();
    let logMessage = `ID photo submission #${attemptNumber} for ${
      profile.fullName
    } from ${errorLog.parseNavigator(navigator)}`;
    try {
      await user.postIDImage(croppedImage);
      this.setState({ submitDialogOpen: true });
    } catch (error) {
      logMessage += `, but image failed to post with error: ${error}`;
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
    reader.onload = function () {
      var dataURL = reader.result.toString();
      var i = new Image();
      i.onload = function () {
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
      this.cropperRef.current.cropper.zoomTo(1);
    }
  }

  onCropperMove() {
    // Keyboard support for cropping
    document.addEventListener('keydown', (e) => {
      if (this.cropperRef.current.cropper != null) {
        let data = this.cropperRef.current.cropper.getCropBoxData();
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
        this.cropperRef.current.cropper.setCropBoxData(data);
      }
    });
  }

  render() {
    const { preview } = this.state;

    const style = {
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

      instructionsText: {
        fontSize: '15pt',
      },
    };

    return (
      <Grid container justifyContent="center" spacing={2}>
        {this.props.authentication ? (
          <>
            <Grid item xs={12} md={6} lg={8}>
              <Card>
                <CardContent>
                  <Grid container justifyContent="center" direction="column">
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
                        reasonable representation of your face for an official campus ID card. As
                        long as it meets the criteria, most cameras on a phone will work fine.
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

            <Grid item xs={12} md={6} lg={4}>
              <Grid container justifyContent="center">
                <Card raised={true}>
                  <Grid item style={{ margin: '10px' }}>
                    <img
                      src={IdCardTop}
                      alt="ID card top with Gordon College logo."
                      className={styles.placeholder_id}
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container style={{ width: '406px' }}>
                      <Grid
                        item
                        style={{ marginLeft: '10px', width: '320px', marginBottom: '5px' }}
                      >
                        <img
                          src={this.state.IdCardPlaceholder}
                          alt="Placeholder ID."
                          className={styles.placeholder_id}
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                      </Grid>
                      <Grid item style={{ marginLeft: '7px', width: '53px', marginBottom: '5px' }}>
                        <img
                          src={IdCardGreen}
                          alt="Colored bar with text 'student'."
                          className={styles.placeholder_id}
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader title="You are not logged in" />
                <CardContent>
                  Please log in to upload an ID photo. You can press the back button or follow the
                  URL "360.gordon.edu/id" to return to this page.
                </CardContent>
                <CardActions>
                  <Button color="secondary" variant="contained" onClick={authenticate}>
                    Login
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        )}

        <Dialog
          open={this.state.photoOpen}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <div className={styles.gc360_id_dialog}>
            <DialogTitle className={styles.gc360_id_dialog_title} id="simple-dialog-title">
              Update ID Picture
            </DialogTitle>
            <DialogContent className={styles.gc360_id_dialog_content}>
              <DialogContentText className={styles.gc360_id_dialog_content_text}>
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
                      <div className={styles.gc360_id_dialog_content_dropzone} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <img
                          className={styles.gc360_id_dialog_content_dropzone_img}
                          src={`data:image/jpg;base64,${this.state.image}`}
                          alt=""
                          style={{ maxWidth: '140px', maxHeight: '140px' }}
                        />
                      </div>
                    </section>
                  )}
                </Dropzone>
              )}
              {preview && (
                <div className={styles.gc360_id_dialog_content_cropper}>
                  <Cropper
                    ref={this.cropperRef}
                    src={preview}
                    style={{
                      maxWidth: this.maxCropPreviewWidth(),
                      maxHeight: this.maxCropPreviewWidth() / this.state.cropperData.aspectRatio,
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
                  className={styles.gc360_id_dialog_content_button}
                >
                  Choose Another Image
                </Button>
              )}
            </DialogContent>
            <DialogActions className={styles.gc360_id_dialog_actions}>
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
        >
          <DialogTitle id="simple-dialog-title">Photo Submitted</DialogTitle>
          <DialogContent>
            <DialogContentText className={styles.submittedText}>
              We got your photo!
              <br />
              You should now see it on your MyProfile page, but it may
              <br />
              take a couple of days for it to be approved for public view.
              <br />
              CTS will contact you if there’s an issue.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2} justifyContent="flex-end">
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
        >
          <DialogTitle id="simple-dialog-title">Photo Submitted</DialogTitle>
          <DialogContent>
            <DialogContentText className={styles.submittedText}>
              Looks like something went wrong on our end! <br /> Try resubmitting your photo.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2} justifyContent="flex-end">
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
