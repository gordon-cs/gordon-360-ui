import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { gordonColors } from '../../theme';
import IdCardDefault from '../IDUploader/image-default.png';
import IdCardGreen from '../IDUploader/image-green.png';
import IdCardTop from '../IDUploader/image-top.png';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './IDUploader.css';
import user from '../../services/user';

const CROP_DIM = 1200; // pixels
export default class IDUploader extends Component {
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

  async postCroppedImage(croppedImage, n) {
    try {
      console.log(await user.postIDImage(croppedImage));
      this.setState({ submitDialogOpen: true });
    } catch (error) {
      if (n < 5) {
        this.postCroppedImage(croppedImage, n + 1);
      } else {
        this.setState({ errorDialogOpen: true });
      }
    }
  }

  handleCloseCancel = () => {
    this.setState({ photoOpen: false, preview: null });
  };

  handleCloseOkay = () => {
    this.setState({ submitDialogOpen: false, errorDialogOpen: false });
  };

  maxCropPreviewWidth() {
    const breakpointWidth = 960;
    const smallScreenRatio = 0.75;
    const largeScreenRatio = 0.525;
    const maxHeightRatio = 0.5;
    const aspect = this.state.cropperData.aspectRatio;
    var maxWidth =
      window.innerWidth *
      (window.innerWidth < breakpointWidth ? smallScreenRatio : largeScreenRatio);
    var correspondingHeight = maxWidth / aspect;
    var maxHeight = window.innerHeight * maxHeightRatio;
    var correspondingWidth = maxHeight * aspect;

    if (correspondingHeight > maxHeight) {
      return correspondingWidth;
    } else {
      return maxWidth;
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

    return (
      <Grid container justify="center" spacing="16">
        <Grid item xs={12} md={6} lg={8}>
          <Card>
            <CardContent>
              <Grid container justify="center" direction="column">
                <Grid item align="center">
                  <Typography align="center" variant="title" style={{ fontWeight: 'bold' }}>
                    ID Photo Guidelines
                  </Typography>
                  <Typography align="left" variant="body1" style={style.instructionsText}>
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
            <Card raised="true">
              <Grid item style={{ margin: '10px' }}>
                <div>
                  <img
                    src={IdCardTop}
                    alt="ID Card"
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
                        alt="ID Card"
                        className="placeholder-id"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    </div>
                  </Grid>
                  <Grid item style={{ marginLeft: '7px', width: '53px', marginBottom: '5px' }}>
                    <div>
                      <img
                        src={IdCardGreen}
                        alt="ID Card"
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

        <Dialog
          open={this.state.photoOpen}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          maxWidth="false"
        >
          <DialogTitle id="simple-dialog-title">Update ID Picture</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {window.innerWidth < 600
                ? 'Tap Image to Browse Files'
                : 'Drag & Drop Picture, or Click to Browse Files'}
            </DialogContentText>
            <DialogContentText>
              <br />
            </DialogContentText>
            {!preview && (
              <Grid container justify="center" spacing="16">
                <Dropzone
                  className="dropzone"
                  activeClassName="drop-overlay"
                  onDropAccepted={this.onDropAccepted.bind(this)}
                  onDropRejected={this.onDropRejected.bind(this)}
                  accept="image/jpeg,image/jpg,image/png"
                >
                  <img
                    className="rounded-corners"
                    src={`data:image/png;base64,${this.state.image}`}
                    alt=""
                    style={{ 'max-width': '200px', 'max-height': '200px' }}
                  />
                </Dropzone>
              </Grid>
            )}
            {preview && (
              <Grid container justify="center" spacing="16">
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
                  minCropBoxWidth={this.state.cropperData.cropBoxDim}
                  minCropBoxHeight={this.state.cropperData.cropBoxDim}
                />
              </Grid>
            )}
            {preview && <br />}
            {preview && (
              <Grid container justify="center" spacing="16">
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => this.setState({ preview: null })}
                    style={style.button}
                  >
                    Choose Another Image
                  </Button>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Grid container spacing={8} justify="flex-end">
              <Grid item />
              <Grid item>
                <Button variant="contained" onClick={this.handleCloseCancel} style={style.button}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
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
              </Grid>
            </Grid>
          </DialogActions>
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
            <Grid container spacing={8} justify="flex-end">
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
            <Grid container spacing={8} justify="flex-end">
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
