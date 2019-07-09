import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import Dropzone from 'react-dropzone';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonBase from '@material-ui/core/ButtonBase';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import ProfileList from './../../components/ProfileList';
import Office from './../../components/OfficeList';
import EmailIcon from '@material-ui/icons/Email';
import user from './../../services/user';
import activity from './../../services/activity';
import { gordonColors } from '../../theme';
import MyProfileActivityList from './../../components/MyProfileActivityList';
import LinksDialog from './Components/LinksDialog';
import { socialMediaInfo } from '../../socialMedia';
import { Link } from 'react-router-dom';
import './myProfile.css';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import GordonLoader from '../../components/Loader';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const CROP_DIM = 200; // pixels
//MyProfile
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.onDialogSubmit = this.onDialogSubmit.bind(this);

    this.state = {
      username: String,
      button: String,
      isImagePublic: null,
      image: null,
      preview: null,
      hasNickName: Boolean,
      nickname: String,
      loading: true,
      profileinfo: null,
      officeinfo: null,
      profile: {},
      memberships: [],
      involvementsAndTheirPrivacy: [],
      files: [],
      photoOpen: false,
      cropperData: { cropBoxDim: null, aspectRatio: null },
      socialLinksOpen: false,
      facebookLink: '',
      linkedInLink: '',
      twitterLink: '',
      instagramLink: '',
      isSnackBarOpen: false,
    };
  }

  handlePhotoOpen = () => {
    this.setState({ photoOpen: true });
  };

  handleCloseSubmit = () => {
    if (this.state.preview != null) {
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
    this.setState({ isImagePublic: !this.state.isImagePublic });
    user.setImagePrivacy(this.state.isImagePublic);
    this.setState({ photoOpen: false, preview: null });
    this.setState({ isSnackBarOpen: true });
  };

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

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ isSnackBarOpen: false });
  };

  componentWillMount() {
    this.loadProfile();
  }

  hasNickName(profile) {
    let Name = String(profile.fullName);
    let FirstName = Name.split(' ')[0];
    this.setState({ hasNickName: FirstName !== profile.NickName && profile.NickName !== '' });
  }

  async getInvolvementAndPrivacyDictionary(membershipsList) {
    let involvementAndPrivacyDictionary = [];
    for (let i = 0; i < membershipsList.length; i++) {
      let involvement = await activity.get(membershipsList[i].ActivityCode);
      involvementAndPrivacyDictionary.push({
        key: membershipsList[i],
        value: involvement.Privacy,
      });
    }
    return involvementAndPrivacyDictionary;
  }

  async loadProfile() {
    this.setState({ loading: true });
    try {
      const profile = await user.getProfileInfo();
      let profileinfo = (
        <ProfileList profile={profile} myProf={true}>
          {' '}
        </ProfileList>
      );
      let officeinfo = <Office profile={profile} />;
      this.setState({ profileinfo: profileinfo });
      this.setState({ officeinfo: officeinfo });
      this.setState({ profile });
      const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getImage(),
      ]);
      const memberships = await user.getMembershipsAlphabetically(profile.ID);
      const involvementsAndTheirPrivacy = await this.getInvolvementAndPrivacyDictionary(
        memberships,
      );
      const image = preferredImage || defaultImage;
      this.setState({ image, loading: false, memberships, involvementsAndTheirPrivacy });
      this.setState({ isImagePublic: this.state.profile.show_pic });
      this.hasNickName(profile);
    } catch (error) {
      this.setState({ error });
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
    let involvementAndPrivacyList;
    if (this.state.memberships.length === 0) {
      involvementAndPrivacyList = (
        <div>
          <Link to={`/activities`}>
            <Typography variant="body2" className="noInvolvements">
              No Involvements to display. Click here to see Involvements around campus!
            </Typography>
          </Link>
        </div>
      );
    } else {
      involvementAndPrivacyList = this.state.involvementsAndTheirPrivacy.map(
        involvementPrivacyKeyValuePair => (
          <MyProfileActivityList
            Membership={involvementPrivacyKeyValuePair.key}
            InvolvementPrivacy={involvementPrivacyKeyValuePair.value}
          />
        ),
      );
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
    let linkCount = 0; // To record whether or not any links are displayed
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
        <Grid item style={{ marginTop: '5px' }}>
          <a onClick={this.handleSocialLinksOpen} className="edit-icon">
            {socialMediaInfo.edit.icon}
          </a>
        </Grid>
      );
    } else {
      editButton = (
        <Grid item>
          <Button onClick={this.handleSocialLinksOpen} style={style.uncontainedButton}>
            EDIT SOCIAL MEDIA LINKS
          </Button>
        </Grid>
      );
    }

    return (
      <div>
        {this.state.loading && <GordonLoader />}
        {!this.state.loading && (
          <div>
            <Grid container justify="center" spacing="16">
              <Grid item xs={12} lg={10}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      alignItems="center"
                      align="center"
                      justify="center"
                      spacing="16"
                    >
                      <Grid item xs={6}>
                        <Link to={`/profile/${this.state.profile.AD_Username}`}>
                          <Button style={style.uncontainedButton}>View My Public Profile</Button>
                        </Link>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ButtonBase
                          onClick={this.handlePhotoOpen}
                          focusRipple
                          alt=""
                          className="profile-image"
                          style={{ 'border-radius': '0.5rem' }}
                        >
                          <img
                            src={`data:image/jpg;base64,${this.state.image}`}
                            alt="Profile"
                            className="rounded-corners"
                            style={{ 'max-height': '200px', 'min-width': '160px' }}
                          />
                          <span className="imageBackdrop" />
                          <GridListTileBar className="tile-bar" title="Photo Options" />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container align="center" alignItems="center">
                          <Grid item xs={12}>
                            <CardHeader
                              title={
                                this.state.hasNickName
                                  ? this.state.profile.fullName +
                                    ' (' +
                                    this.state.profile.NickName +
                                    ')'
                                  : this.state.profile.fullName
                              }
                              subheader={this.state.profile.Class}
                            />
                            <Grid container spacing="16" align="center" justify="center">
                              {facebookButton}
                              {twitterButton}
                              {linkedInButton}
                              {instagramButton}
                              {editButton}
                            </Grid>
                            {this.state.profile.Email !== '' && (
                              <div
                                style={{
                                  marginTop: '20px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              >
                                <a href={`mailto:${this.state.profile.Email}`}>
                                  <div
                                    className="email-link-container"
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      alignContent: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <EmailIcon
                                      className="email-link"
                                      style={{ marginRight: '0.75rem' }}
                                    />
                                    <Typography className="email-link">
                                      {this.state.profile.Email}
                                    </Typography>
                                  </div>
                                </a>
                              </div>
                            )}
                            <Dialog
                              open={this.state.photoOpen}
                              keepMounted
                              onClose={this.handleClose}
                              aria-labelledby="alert-dialog-slide-title"
                              aria-describedby="alert-dialog-slide-description"
                              maxWidth="false"
                            >
                              <DialogTitle id="simple-dialog-title">
                                Update Profile Picture
                              </DialogTitle>
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
                                        'max-height':
                                          this.maxCropPreviewWidth() /
                                          this.state.cropperData.aspectRatio,
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
                                  <Grid item>
                                    <Tooltip
                                      classes={{ tooltip: 'tooltip' }}
                                      id="tooltip-hide"
                                      title={
                                        this.state.isImagePublic
                                          ? 'Only faculty and police will see your photo'
                                          : 'Make photo visible to other students'
                                      }
                                    >
                                      <Button
                                        variant="contained"
                                        onClick={this.toggleImagePrivacy.bind(this)}
                                        style={style.button}
                                      >
                                        {this.state.isImagePublic ? 'Hide' : 'Show'}
                                      </Button>
                                    </Tooltip>
                                  </Grid>
                                  <Grid item>
                                    <Tooltip
                                      classes={{ tooltip: 'tooltip' }}
                                      id="tooltip-reset"
                                      title="Restore your original ID photo"
                                    >
                                      <Button
                                        variant="contained"
                                        onClick={this.handleResetImage}
                                        style={{ background: 'tomato', color: 'white' }}
                                      >
                                        Reset
                                      </Button>
                                    </Tooltip>
                                  </Grid>
                                  <Grid item>
                                    <Button
                                      variant="contained"
                                      onClick={this.handleCloseCancel}
                                      style={style.button}
                                    >
                                      Cancel
                                    </Button>
                                  </Grid>
                                  <Grid item>
                                    <Tooltip
                                      classes={{ tooltip: 'tooltip' }}
                                      id="tooltip-submit"
                                      title="Crop to current region and submit"
                                    >
                                      <Button
                                        variant="contained"
                                        onClick={this.handleCloseSubmit}
                                        disabled={!this.state.preview}
                                        style={
                                          this.state.preview
                                            ? style.button
                                            : { background: 'darkgray', color: 'white' }
                                        }
                                      >
                                        Submit
                                      </Button>
                                    </Tooltip>
                                  </Grid>
                                </Grid>
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
                              <Typography align="center" variant="caption">
                                Copy and paste your links below
                              </Typography>
                              {linksDialog}
                            </Dialog>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} lg={5}>
                <Grid container spacing={16}>
                  {this.state.profileinfo}
                  {this.state.officeinfo}
                </Grid>
              </Grid>
              <Grid item xs={12} lg={5}>
                <Grid container>
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Grid container direction="row" alignItems="center">
                          <Grid item xs={7}>
                            <CardHeader title="Involvements" />
                          </Grid>
                          <Grid item xs={5} align="right">
                            <Link to="/transcript">
                              <Button variant="contained" style={style.button}>
                                Co-Curricular Transcript
                              </Button>
                            </Link>
                          </Grid>
                        </Grid>

                        <List>{involvementAndPrivacyList}</List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <div>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={this.state.isSnackBarOpen}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={
                  <span id="message-id">
                    <CheckCircleIcon
                      style={{
                        marginBottom: '-4.5pt',
                        marginRight: '1rem',
                      }}
                    />
                    Success!
                  </span>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.handleClose}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
