import Grid from 'material-ui/Grid';
import React, { Component } from 'react';
import Divider from 'material-ui/Divider/Divider';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
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
import LinksDialog from './Components/LinksDialog';
import GordonLoader from './../../components/Loader';
import { socialMediaInfo } from '../../socialMedia';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CROP_DIM = 200; // pixels

export default class MyProfile extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.onDialogSubmit = this.onDialogSubmit.bind(this);

    this.state = {
      username: String,
      button: String,
      isImagePublic: null,
      image: null,
      preview: null,
      loading: true,
      profile: {},
      activities: [],
      files: [],
      photoOpen: false,
      cropperData: { cropBoxDim: null, aspectRatio: null },
      socialLinksOpen: false,
      facebookLink: '',
      linkedInLink: '',
      twitterLink: '',
      instagramLink: '',
    };
  }

  handleExpandClick() {
    this.changePrivacy();
    user.toggleMobilePhonePrivacy();
  }

  handlePhotoOpen = () => {
    this.setState({ photoOpen: true });
  };

  handleCloseSubmit = () => {
    if (this.state.preview) {
      var croppedImage = this.refs.cropper.getCroppedCanvas({ width: CROP_DIM }).toDataURL();
      user.postImage(croppedImage);
      var imageNoHeader = croppedImage.replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
      this.setState({ image: imageNoHeader, photoOpen: false, preview: null });
      window.didProfilePicUpdate = true;
    }
  };

  handleCloseCancel = () => {
    this.setState({ photoOpen: false, preview: null });
  };

  handleResetImage = () => {
    user.resetImage();
    window.didProfilePicUpdate = true;
    this.setState({ photoOpen: false, preview: null });
    this.loadProfile();
  };

  toggleImagePrivacy = () => {
    this.setState({isImagePublic: !this.state.isImagePublic});
    user.setImagePrivacy(this.state.isImagePublic);
  }

  handleSocialLinksOpen = () => {
    this.setState({ socialLinksOpen: true });
  };

  handleSocialLinksClose = () => {
    this.setState({ socialLinksOpen: false });
  };

  onDialogSubmit(fb, tw, li, ig) {
    // For links that have changed, update this.state
    // and send change to database.
    if (fb !== this.state.facebookLink) {
      this.setState({ facebookLink: fb });
      user.updateSocialLink('facebook', fb);
    }
    if (tw !== this.state.twitterLink) {
      this.setState({ twitterLink: tw });
      user.updateSocialLink('twitter', tw);
    }
    if (li !== this.state.linkedInLink) {
      this.setState({ linkedInLink: li });
      user.updateSocialLink('linkedin', li);
    }
    if (ig !== this.state.instagramLink) {
      this.setState({ instagramLink: ig });
      user.updateSocialLink('instagram', ig);
    }
  }

  changePrivacy() {
    if (this.state.button === 'Make Public') {
      this.setState({ button: 'Make Private' });
    } else {
      this.setState({ button: 'Make Public' });
    }
  }

  maxCropPreviewWidth() {
    const breakpointWidth = 960;
    const smallScreenRatio = 0.75;
    const largeScreenRatio = 0.525;
    const maxHeightRatio = 0.5;
    const aspect = this.state.cropperData.aspectRatio;
    console.log(aspect);

    var maxWidth = window.innerWidth *
                   (window.innerWidth < breakpointWidth ? smallScreenRatio : largeScreenRatio);
    var correspondingHeight = maxWidth / aspect;
    var maxHeight = window.innerHeight * maxHeightRatio;
    var correspondingWidth = maxHeight * aspect;

    if (correspondingHeight > maxHeight) {
      return correspondingWidth;
    }
    else {
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
          var displayWidth = (maxWidth > i.width) ? i.width : maxWidth;
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
      this.setState({ profile });
      const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getImage(),
      ]);
      const activities = await user.getMemberships(profile.ID);
      const image = preferredImage || defaultImage;
      this.setState({ image, loading: false, activities });
      this.setState({ isImagePublic: this.state.profile.show_pic })
    } catch (error) {
      this.setState({ error });
    }
    if (this.state.profile.IsMobilePhonePrivate === 0) {
      this.setState({ button: 'Make Private' });
    } else {
      this.setState({ button: 'Make Public' });
    }
    // Set state of social media links to database values after load.
    // If not empty, add domain name back in for display and buttons.
    this.setState({
      facebookLink:
        this.state.profile.Facebook === null || this.state.profile.Facebook === ''
          ? ''
          : socialMediaInfo.facebook.prefix + this.state.profile.Facebook,
      twitterLink:
        this.state.profile.Twitter === null || this.state.profile.Twitter === ''
          ? ''
          : socialMediaInfo.twitter.prefix + this.state.profile.Twitter,
      linkedInLink:
        this.state.profile.LinkedIn === null || this.state.profile.LinkedIn === ''
          ? ''
          : socialMediaInfo.linkedIn.prefix + this.state.profile.LinkedIn,
      instagramLink:
        this.state.profile.Instagram === null || this.state.profile.Instagram === ''
          ? ''
          : socialMediaInfo.instagram.prefix + this.state.profile.Instagram,
    });
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

    let linksDialog = (
      <LinksDialog
        onDialogSubmit={this.onDialogSubmit}
        handleSocialLinksClose={this.handleSocialLinksClose}
        {...this.state}
      />
    );

    // Define what icon buttons will display
    // (only the sites that have links in database)
    let facebookButton;
    let twitterButton;
    let linkedInButton;
    let instagramButton;
    let editButton;
    let linkCount = 0; // To record wether or not any links are displayed
    if (this.state.facebookLink !== '') {
      facebookButton = (
        <Grid item>
          <a href={this.state.facebookLink} className="icon" target="_blank">
            {socialMediaInfo.facebook.icon}
          </a>
        </Grid>
      );
      linkCount += 1;
    }
    if (this.state.twitterLink !== '') {
      twitterButton = (
        <Grid item>
          <a href={this.state.twitterLink} className="icon" target="_blank">
            {socialMediaInfo.twitter.icon}
          </a>
        </Grid>
      );
      linkCount += 1;
    }
    if (this.state.linkedInLink !== '') {
      linkedInButton = (
        <Grid item>
          <a href={this.state.linkedInLink} className="icon" target="_blank">
            {socialMediaInfo.linkedIn.icon}
          </a>
        </Grid>
      );
      linkCount += 1;
    }
    if (this.state.instagramLink !== '') {
      instagramButton = (
        <Grid item>
          <a href={this.state.instagramLink} className="icon" target="_blank">
            {socialMediaInfo.instagram.icon}
          </a>
        </Grid>
      );
      linkCount += 1;
    }
    if (linkCount > 0) {
      editButton = (
        <Grid item>
          <a onClick={this.handleSocialLinksOpen} className="icon">
            {socialMediaInfo.edit.icon}
          </a>
        </Grid>
      );
    } else {
      editButton = (
        <Grid item>
          <a onClick={this.handleSocialLinksOpen} className="edit">
            EDIT SOCIAL MEDIA LINKS
          </a>
        </Grid>
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
                    <Grid container>
                      {facebookButton}
                      {twitterButton}
                      {linkedInButton}
                      {instagramButton}
                      {editButton}
                    </Grid>
                    <Button onClick={this.handlePhotoOpen} raised style={style.button}>
                      Update Photo
                    </Button>
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
                                  this.maxCropPreviewWidth() / this.state.cropperData.aspectRatio,
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
                        <Tooltip id='tooltip-hide' 
                        title={(this.state.isImagePublic) ? 
                               'Only faculty and police will see your photo' : 
                               'Make photo visible to other students'}
                        >
                          <Button
                            onClick={this.toggleImagePrivacy.bind(this)}
                            raised
                            style={style.button}
                          >
                            {(this.state.isImagePublic) ? 'Hide' : 'Show'}
                          </Button>
                        </Tooltip>
                        <Tooltip id='tooltip-reset' title='Restore your original ID photo'>
                          <Button
                            onClick={this.handleResetImage}
                            raised
                            style={{ background: 'tomato', color: 'white' }}
                          >
                            Reset
                          </Button>
                        </Tooltip>
                        <Button onClick={this.handleCloseCancel} raised style={style.button}>
                          Cancel
                        </Button>
                        <Tooltip id='tooltip-submit' title='Crop to current region and submit'>
                          <Button onClick={this.handleCloseSubmit} raised 
                            disabled={!this.state.preview} style={(this.state.preview) ? 
                                                        style.button : 
                                                        {background: 'darkgray', color: 'white'}}
                          >
                            Submit
                          </Button>
                        </Tooltip>
                      </DialogActions>
                    </Dialog>
                    <Dialog
                      open={this.state.socialLinksOpen}
                      keepMounted
                      onClose={this.handleSocialLinksClose}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle id="simple-dialog-title">
                        Edit your social media links
                      </DialogTitle>
                      <DialogContent>{linksDialog}</DialogContent>
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
