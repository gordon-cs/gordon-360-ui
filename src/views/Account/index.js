import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { gordonColors } from '../../theme';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CROP_DIM = 200; // pixels
export default class IDUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      preview: null,
      photoOpen: false,
    };
  }

  handleUploadPhoto = () => {
    this.setState({ photoOpen: true });
  };

  handleCloseSubmit = () => {
    if (this.state.preview != null) {
      var croppedImage = this.refs.cropper.getCroppedCanvas({ width: CROP_DIM }).toDataURL();
      //user.postImage(croppedImage);
      var imageNoHeader = croppedImage.replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
      this.setState({ image: imageNoHeader, photoOpen: false, preview: null });
      window.didProfilePicUpdate = true;
    }
  };

  handleCloseCancel = () => {
    this.setState({ photoOpen: false, preview: null });
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
            'Sorry, your image is too small! Image dimensions must be at least 200 x 200 pixels.',
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
    console.log(this.state);
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
      uncontainedButton: {
        color: gordonColors.primary.cyan,
      },
    };

    return (
      <div>
        <Grid container justify="center" spacing="16">
          <Grid item xs={12} lg={10}>
            <img
              src={`data:image/jpg;base64,${this.state.image}`}
              alt="Profile"
              className="rounded-corners"
              style={{ 'max-height': '200px', 'min-width': '160px' }}
            />
          </Grid>
          <Grid item xs={12} lg={10}>
            <Button variant="contained" onClick={this.handleUploadPhoto}>
              Upload new Student ID Photo
            </Button>
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
          <DialogTitle id="simple-dialog-title">Update Profile Picture</DialogTitle>
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
                    src={`data:image/jpg;base64,${this.state.image}`}
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
          <DialogActions />
        </Dialog>
      </div>
    );
  }
}
