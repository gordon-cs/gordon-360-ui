import Grid from 'material-ui/Grid';
import React, { Component } from 'react';
import Divider from 'material-ui/Divider/Divider';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Dropzone from 'react-dropzone';
import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
} from 'material-ui/Dialog';

import user from './../../services/user';
import { gordonColors } from '../../theme';
import Activities from './Components/ActivityList';
import GordonLoader from './../../components/Loader';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CROP_DIM = 200; // pixels

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);

    this.state = {
      username: String,
      button: String,
      image: null,
      preview: null,
      loading: true,
      profile: {},
      activities: [],
      files: [],
      open: false,
      cropperData: { cropBoxDim: null, aspectRatio: null },
    };
  }

  handleExpandClick() {
    this.changePrivacy();
    user.toggleMobilePhonePrivacy();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleCloseSubmit = () => {
    if (this.state.preview != null) {
      console.log('preview \n' + this.state.preview);
      user.postImage(this.state.preview);
      var imageNoHeader = this.state.preview.replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
      this.setState({ image: imageNoHeader });
      window.didProfilePicUpdate = true;
      this.setState({ open: false, preview: null });
    }
  };

  handleCloseCancel = () => {
    this.setState({ open: false, preview: null });
  };

  handleResetImage = () => {
    user.resetImage();
    this.loadProfile();
    window.didProfilePicUpdate = true;
    this.setState({ open: false, preview: null });
  };

  changePrivacy() {
    if (this.state.button === 'Make Public') {
      this.setState({ button: 'Make Private' });
    } else {
      this.setState({ button: 'Make Public' });
    }
  }

  maxCropPreviewWidth() {
    const breakpointWidth = 800;
    const smallScreenRatio = 0.75;
    const largeScreenRatio = 0.5;
    return (
      window.innerWidth *
      (window.innerWidth < breakpointWidth ? smallScreenRatio : largeScreenRatio)
    );
  }

  minCropBoxDim(imgWidth, dispWidth) {
    return CROP_DIM * dispWidth / imgWidth;
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
          var displayWidth =
            this.maxCropPreviewWidth() > i.width ? i.width : this.maxCropPreviewWidth();
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

  componentWillMount() {
    // const { username } = this.props.match.params.username;
    this.loadProfile();
  }

  async loadProfile() {
    this.setState({ loading: true });
    try {
      const profile = await user.getProfileInfo();
      this.setState({ loading: false, profile });
      const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getImage(),
      ]);
      const activities = await user.getMemberships(profile.ID);
      const image = preferredImage || defaultImage;
      this.setState({ image, loading: false, activities });
    } catch (error) {
      this.setState({ error });
    }
    if (this.state.profile.IsMobilePhonePrivate === 0) {
      this.setState({ button: 'Make Private' });
    } else {
      this.setState({ button: 'Make Public' });
    }
  }

  render() {
    const { preview } = this.state;

    const style = {
      img: {
        maxWidth: '100%',
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
    };

    const photoUploader = {
      padding: '20px',
      justifyContent: 'center',
      alignItems: 'center',
    };

    let activityList;
    if (!this.state.activities) {
      activityList = <GordonLoader />;
    } else {
      activityList = this.state.activities.map(activity => (
        <Activities Activity={activity} key={activity.MembershipID} />
      ));
    }

    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} lg={10}>
            <Card id="print">
              <CardContent>
                <Grid container justify="center">
                  <Grid item xs={6} sm={6} md={6} lg={4}>
                    <img
                      src={`data:image/jpg;base64,${this.state.image}`}
                      alt=""
                      style={style.img}
                    />
                  </Grid>

                  <Grid item xs={6} sm={6} md={6} lg={4}>
                    <CardHeader
                      title={this.state.profile.fullName}
                      subheader={this.state.profile.Class}
                    />
                    <Button onClick={this.handleOpen} raised style={style.button}>
                      Update Photo
                    </Button>
                    <Dialog
                      open={this.state.open}
                      keepMounted
                      onClose={this.handleClose}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                      maxWidth="false"
                    >
                      <DialogTitle id="simple-dialog-title">Update Profile Picture</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Drag &amp; Drop Picture, or Click to Browse Files
                        </DialogContentText>
                        <DialogContentText>
                          <br />
                        </DialogContentText>
                        {!preview && (
                          <Dropzone
                            onDropAccepted={this.onDropAccepted.bind(this)}
                            onDropRejected={this.onDropRejected.bind(this)}
                            accept="image/jpeg,image/jpg,image/png"
                            style={photoUploader}
                          >
                            <Grid container justify="center">
                              <img
                                src={require('./image.png')}
                                alt=""
                                style={{ 'max-width': '100%' }}
                              />
                            </Grid>
                          </Dropzone>
                        )}
                        {preview && (
                          <Grid container justify="center">
                            <Cropper
                              ref="cropper"
                              src={preview}
                              style={{
                                'max-width': this.maxCropPreviewWidth(),
                                'max-height':
                                  this.maxCropPreviewWidth() *
                                  1 /
                                  this.state.cropperData.aspectRatio,
                                justify: 'center',
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
                          <Grid container justify="center">
                            <Grid item>
                              <Button
                                onClick={() => this.setState({ preview: null })}
                                raised
                                style={style.button}
                              >
                                Choose Another Image
                              </Button>
                            </Grid>
                          </Grid>
                        )}
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={this.handleResetImage}
                          raised
                          style={{ background: 'tomato', color: 'white' }}
                        >
                          Reset
                        </Button>
                        <Button onClick={this.handleCloseSubmit} raised style={style.button}>
                          Submit
                        </Button>
                        <Button onClick={this.handleCloseCancel} raised style={style.button}>
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={10}>
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Card>
                  <CardContent>
                    <CardHeader title="Personal Information" />

                    <List>
                      <ListItem>
                        <Typography>Major: {this.state.profile.Major1Description}</Typography>
                      </ListItem>

                      <Divider />

                      <ListItem>
                        <Grid item xs={6} sm={7} md={8} lg={10}>
                          <Typography>Cell Phone: {this.state.profile.MobilePhone}</Typography>
                        </Grid>

                        <Grid item xs={6} sm={5} md={4} lg={1}>
                          <Button onClick={this.handleExpandClick} raised style={style.button}>
                            {this.state.button}
                          </Button>
                        </Grid>
                      </ListItem>

                      <Divider />

                      <ListItem>
                        <Typography>Student ID: {this.state.profile.ID}</Typography>
                      </ListItem>

                      <Divider />

                      <ListItem>
                        <Typography>Email: {this.state.profile.Email}</Typography>
                      </ListItem>

                      <Divider />

                      <ListItem>
                        <Typography>On/Off Campus: {this.state.profile.OnOffCampus}</Typography>
                      </ListItem>

                      <Divider />
                    </List>

                    <CardHeader title="Home Address" />

                    <List>
                      <Divider />

                      <ListItem>
                        <Typography>Street Number: {this.state.profile.HomeStreet2}</Typography>
                      </ListItem>

                      <Divider />

                      <ListItem>
                        <Typography>
                          Home Town: {this.state.profile.HomeCity}, {this.state.profile.HomeState}
                        </Typography>
                      </ListItem>

                      <Divider />
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Card>
                  <CardContent>
                    <CardHeader title="Activities" />
                    <List>{activityList}</List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
