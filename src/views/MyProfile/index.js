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
import Activities from './../../components/ActivityList';
import GordonLoader from './../../components/Loader';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Switch } from 'material-ui';

const CROP_DIM = 200; // pixels

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleChangePrivacy = this.handleChangePrivacy.bind(this);

    this.state = {
      username: String,
      privacy: Number,
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

  handleChangePrivacy() {
    user.toggleMobilePhonePrivacy();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleCloseSubmit = () => {
    if (this.state.preview != null) {
      var croppedImage = this.refs.cropper.getCroppedCanvas({ width: CROP_DIM }).toDataURL();
      user.postImage(croppedImage);
      window.didProfilePicUpdate = true;
      var imageNoHeader = croppedImage.replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
      this.setState({ image: imageNoHeader });
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
    this.loadProfile();
  }

  async loadProfile() {
    this.setState({ loading: true });
    try {
      const profile = await user.getProfileInfo();
      this.setState({ privacy: profile.IsMobilePhonePrivate });
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

    let address;
    let homeStreet;
    if (
      this.state.profile.Country === 'United States Of America' ||
      this.state.profile.Country === ''
    ) {
      address = `${this.state.profile.HomeCity},${this.state.profile.HomeState}`;
      homeStreet = `${this.state.profile.HomeStreet2}`;
    } else {
      address = `${this.state.profile.Country}`;
    }

    if (this.state.profile.PersonType === 'fac') {
      var Office = (
        <CardContent>
          <CardHeader title="Office Information" />
          <List>
            <ListItem>
              <Typography>
                Room: {this.state.profile.BuildingDescription}, {this.state.profile.OnCampusRoom}
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Typography>Office Phone: {this.state.profile.OnCampusPhone}</Typography>
            </ListItem>
            <Divider />

            <ListItem>
              <Typography>Office Hours: {this.state.profile.office_hours}</Typography>
            </ListItem>
          </List>
        </CardContent>
      );

      var PersonalInfo = (
        <List>
          <ListItem>
            <Typography>Department: {this.state.profile.OnCampusDepartment}</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography>Email: {this.state.profile.Email}</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography>Phone: {this.state.profile.HomePhone}</Typography>
          </ListItem>
          <Divider />
        </List>
      );
    }
    if (this.state.profile.PersonType === 'stu') {
      var PersonalInfo = (
        <List>
          <ListItem>
            <Typography>Major: {this.state.profile.Major1Description}</Typography>
          </ListItem>

          <Divider />

          <ListItem>
            <Grid container xs={6} sm={6} md={6} lg={6}>
              <Grid item>
                <Typography>Cell Phone: {this.state.profile.MobilePhone}</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" justify="flex-end" xs={8} sm={6} md={6} lg={6}>
              <Grid item>
                <Switch onClick={this.handleChangePrivacy} checked={!this.state.privacy} />
              </Grid>
              <Grid item>
                <Typography>{this.state.privacy ? 'Private' : 'Public'}</Typography>
              </Grid>
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
      );
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

                    {PersonalInfo}

                    <CardHeader title="Home Address" />
                    <List>
                      <ListItem>
                        <Typography>Home: {address}</Typography>
                      </ListItem>
                      <Divider />
                      {homeStreet && (
                        <ListItem>
                          <Typography>Street: {this.state.profile.HomeStreet2}</Typography>
                        </ListItem>
                      )}

                      <Divider />
                    </List>
                  </CardContent>
                  {Office}
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
