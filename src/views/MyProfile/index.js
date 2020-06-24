import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React, { useState, useEffect, useRef } from 'react';
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
import storage from '../../services/storage';
import activity from './../../services/activity';
import { gordonColors } from '../../theme';
import MyProfileActivityList from './../../components/MyProfileActivityList';
import LinksDialog from './Components/LinksDialog';
import { socialMediaInfo } from '../../socialMedia';
import { Link } from 'react-router-dom';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import GordonLoader from '../../components/Loader';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import GordonSchedulePanel from '../../components/SchedulePanel';
import './myProfile.css';
import '../../app.css';
import { withWidth } from '@material-ui/core';
import VictoryPromiseDisplay from './Components/VictoryPromiseDisplay/index.js';

const MyProfile = props => {
  const CROP_DIM = 200; // pixels

  const [personType, setPersonType] = useState(null);
  const [isImagePublic, setIsImagePublic] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [hasNickName, setHasNickname] = useState(Boolean);
  const [loading, setLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState(null);
  const [officeInfo, setOfficeInfo] = useState(null);
  const [profile, setProfile] = useState({});
  const [memberships, setMemberships] = useState([]);
  const [involvementsAndTheirPrivacy, setInvolvementsAndTheirPrivacy] = useState([]);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [cropperData, setCropperData] = useState({ cropBoxDim: null, aspectRatio: null });
  const [socialLinksOpen, setSocialLinksOpen] = useState(false);
  const [facebookLink, setFacebookLink] = useState('');
  const [linkedInLink, setLinkedInLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [network, setNetwork] = useState('online');

  const cropper = useRef();

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

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    let networkStatus;
    /* Attempts to get the network status from local storage.
     * If not found, the default value is online
     */
    try {
      networkStatus = storage.get('network-status');
    } catch (error) {
      // Defaults the network to online if not found in local storage
      networkStatus = 'online';
    }

    // Saves the network's status to this component's state
    setNetwork(networkStatus);
  }, [network]);

  useEffect(() => {
    /* Used to re-render the page when the network connection changes.
     *  The state's network variable is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', event => {
      if (
        event.data === 'online' &&
        network === 'offline' &&
        event.origin === window.location.origin
      ) {
        setNetwork('online');
      } else if (
        event.data === 'offline' &&
        network === 'online' &&
        event.origin === window.location.origin
      ) {
        setNetwork('offline');
      }
    });
    return window.removeEventListener('message', () => {});
  }, [network]);

  function handlePhotoOpen() {
    setPhotoOpen(true);
  }

  function handleCloseSubmit() {
    if (preview != null) {
      var croppedImage = cropper.current.getCroppedCanvas({ width: CROP_DIM }).toDataURL();
      user.postImage(croppedImage);
      var imageNoHeader = croppedImage.replace(/data:image\/[A-Za-z]{3,4};base64,/, '');
      setImage(imageNoHeader);
      setPhotoOpen(false);
      setPreview(null);
      window.didProfilePicUpdate = true;
    }
  }

  function handleCloseCancel() {
    setPhotoOpen(false);
    setPreview(null);
  }

  function handleResetImage() {
    user.resetImage();
    window.didProfilePicUpdate = true;
    setPhotoOpen(false);
    setPreview(null);
    loadProfile();
  }

  function toggleImagePrivacy() {
    setIsImagePublic(!isImagePublic);
    user.setImagePrivacy(isImagePublic);
    setPhotoOpen(false);
    setPreview(null);
    setIsSnackBarOpen(true);
  }

  function handleSocialLinksOpen() {
    setSocialLinksOpen(true);
  }

  function handleSocialLinksClose() {
    setSocialLinksOpen(false);
  }

  async function onDialogSubmit(fb, tw, li, ig) {
    // For links that have changed, update state
    // and send change to database.
    if (fb !== facebookLink) {
      setFacebookLink(fb);
      user.updateSocialLink('facebook', fb);
    }
    if (tw !== twitterLink) {
      setTwitterLink(tw);
      user.updateSocialLink('twitter', tw);
    }
    if (li !== linkedInLink) {
      setLinkedInLink(li);
      user.updateSocialLink('linkedin', li);
    }
    if (ig !== instagramLink) {
      user.updateSocialLink('instagram', ig);
      setInstagramLink(ig);
    }
  }

  function maxCropPreviewWidth() {
    // see IDUploader/index.js > maxCropPreviewWidth for commented out code
    // that seemed to have finer tuned logic
    const smallScreenRatio = 0.5;
    const largeScreenRatio = 0.25;
    const w = props.width;
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

  function minCropBoxDim(imgWidth, dispWidth) {
    return (CROP_DIM * dispWidth) / imgWidth;
  }

  function onDropAccepted(fileList) {
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
          setCropperData({ aspectRatio: aRatio });
          var maxWidth = maxCropPreviewWidth();
          var displayWidth = maxWidth > i.width ? i.width : maxWidth;
          var cropDim = minCropBoxDim(i.width, displayWidth);
          setCropperData({ aspectRatio: aRatio, cropBoxDim: cropDim });
          setPreview(dataURL);
        }
      };
      i.src = dataURL;
    };
    reader.readAsDataURL(previewImageFile);
  }

  function onDropRejected() {
    alert('Sorry, invalid image file! Only PNG and JPEG images are accepted.');
  }

  function onCropperZoom(event) {
    if (event.detail.ratio > 1) {
      event.preventDefault();
      cropper.current.zoomTo(1);
    }
  }

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackBarOpen(false);
  }

  function createNickname(profile) {
    let Name = String(profile.fullName);
    let FirstName = Name.split(' ')[0];
    setHasNickname(FirstName !== profile.NickName && profile.NickName !== '');
  }

  async function getInvolvementAndPrivacyDictionary(membershipsList) {
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

  async function loadProfile() {
    setLoading(true);
    let profile;
    try {
      profile = await user.getProfileInfo();
      let profileInfo = (
        <ProfileList profile={profile} myProf={true}>
          {' '}
        </ProfileList>
      );
      const personType = String(profile.PersonType);
      let officeInfo = <Office profile={profile} />;
      setProfileInfo(profileInfo);
      setOfficeInfo(officeInfo);
      setProfile(profile);
      setPersonType(personType);
      const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getImage(),
      ]);
      const memberships = await user.getMembershipsAlphabetically(profile.ID);
      const involvementsAndTheirPrivacy = await getInvolvementAndPrivacyDictionary(memberships);
      const image = preferredImage || defaultImage;
      setImage(image);
      setLoading(false);
      setMemberships(memberships);
      setInvolvementsAndTheirPrivacy(involvementsAndTheirPrivacy);
      setIsImagePublic(profile.show_pic);
      createNickname(profile);
    } catch (error) {
      // Do Nothing
    }
    // Set state of social media links to database values after load.
    // If not empty (null or undefined), add domain name back in for display and buttons.
    setFacebookLink(
      !profile.Facebook || profile.Facebook === ''
        ? ''
        : socialMediaInfo.facebook.prefix + profile.Facebook,
    );
    setTwitterLink(
      !profile.Twitter || profile.Twitter === ''
        ? ''
        : socialMediaInfo.twitter.prefix + profile.Twitter,
    );
    setLinkedInLink(
      !profile.LinkedIn || profile.LinkedIn === ''
        ? ''
        : socialMediaInfo.linkedIn.prefix + profile.LinkedIn,
    );
    setInstagramLink(
      !profile.Instagram || profile.Instagram === ''
        ? ''
        : socialMediaInfo.instagram.prefix + profile.Instagram,
    );
  }

  // AUTHENTICATED
  if (props.Authentication) {
    let involvementAndPrivacyList;
    if (memberships.length === 0) {
      involvementAndPrivacyList = (
        <div>
          <Link to={`/involvements`}>
            <Typography variant="body2" className="noInvolvements">
              No Involvements to display. Click here to see Involvements around campus!
            </Typography>
          </Link>
        </div>
      );
    } else {
      involvementAndPrivacyList = involvementsAndTheirPrivacy.map(
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
        onDialogSubmit={onDialogSubmit}
        handleSocialLinksClose={handleSocialLinksClose}
        facebookLink={facebookLink}
        twitterLink={twitterLink}
        linkedInLink={linkedInLink}
        instagramLink={instagramLink}
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
    let VPScore;

    if (facebookLink !== '') {
      facebookButton = (
        <Grid item>
          <a
            href={facebookLink}
            className="gc360-my-profile_icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialMediaInfo.facebook.icon}
          </a>
        </Grid>
      );
      linkCount += 1;
    }
    if (twitterLink !== '') {
      twitterButton = (
        <Grid item>
          <a
            href={twitterLink}
            className="gc360-my-profile_icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialMediaInfo.twitter.icon}
          </a>
        </Grid>
      );
      linkCount += 1;
    }
    if (linkedInLink !== '') {
      linkedInButton = (
        <Grid item>
          <a
            href={linkedInLink}
            className="gc360-my-profile_icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialMediaInfo.linkedIn.icon}
          </a>
        </Grid>
      );
      linkCount += 1;
    }
    if (instagramLink !== '') {
      instagramButton = (
        <Grid item>
          <a
            href={instagramLink}
            className="gc360-my-profile_icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialMediaInfo.instagram.icon}
          </a>
        </Grid>
      );
      linkCount += 1;
    }
    if (linkCount > 0) {
      editButton = (
        <Grid item>
          <IconButton onClick={handleSocialLinksOpen} className="edit-icon">
            {socialMediaInfo.edit.icon}
          </IconButton>
        </Grid>
      );
    } else {
      editButton = (
        <Grid item>
          <Button onClick={handleSocialLinksOpen} style={style.uncontainedButton}>
            EDIT SOCIAL MEDIA LINKS
          </Button>
        </Grid>
      );
    }
    let profileCardSize = 12;
    if (String(personType).includes('stu')) {
      VPScore = (
        <Grid item xs={12} md={4} lg={4}>
          <VictoryPromiseDisplay />
        </Grid>
      );
      profileCardSize = 8;
    }

    // Creates the My Profile button link depending on the status of the network found in local storage
    let MyProfile;
    // AUTHENTICATED - NETWORK STATUS: ONLINE
    if (network === 'online') {
      MyProfile = (
        <div>
          {loading && <GordonLoader />}
          {!loading && (
            <div>
              <Grid container justify="center" spacing={2}>
                <Grid
                  item
                  xs={12}
                  lg={10}
                  container
                  alignItems="flex-start"
                  align="flex-start"
                  justify="flex-start"
                  spacing={2}
                >
                  <Grid item xs={12} md={profileCardSize} lg={8}>
                    <Card>
                      <CardContent>
                        <Grid
                          container
                          alignItems="center"
                          align="center"
                          justify="center"
                          spacing={2}
                        >
                          {/* ******************************************************* */}
                          <Grid item xs={6}>
                            <Link className="gc360-link" to={`/profile/${profile.AD_Username}`}>
                              <Button style={style.uncontainedButton}>
                                View My Public Profile
                              </Button>
                            </Link>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ButtonBase
                              onClick={handlePhotoOpen}
                              focusRipple
                              alt=""
                              className="profile-image"
                              style={{ 'border-radius': '0.5rem' }}
                            >
                              <img
                                src={`data:image/jpg;base64,${image}`}
                                alt="Profile"
                                className="rounded-corners"
                                style={{
                                  'max-height': '200px',
                                  'min-width': '160px',
                                }}
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
                                    hasNickName
                                      ? profile.fullName + ' (' + profile.NickName + ')'
                                      : profile.fullName
                                  }
                                  subheader={profile.Class}
                                />
                                <Grid container spacing={2} align="center" justify="center">
                                  {facebookButton}
                                  {twitterButton}
                                  {linkedInButton}
                                  {instagramButton}
                                  {editButton}
                                </Grid>
                                {profile.Email !== '' && (
                                  <div
                                    style={{
                                      marginTop: '20px',
                                      display: 'flex',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <a href={`mailto:${profile.Email}`} className="gc360-text-link">
                                      <div
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          alignContent: 'center',
                                          justifyContent: 'center',
                                        }}
                                      >
                                        <EmailIcon
                                          className="gc360-my-profile_icon"
                                          style={{ marginRight: '0.75rem' }}
                                        />
                                        <Typography>{profile.Email}</Typography>
                                      </div>
                                    </a>
                                  </div>
                                )}

                                {/* ******************************************************* */}

                                <Dialog
                                  open={photoOpen}
                                  keepMounted
                                  onClose={handleClose}
                                  aria-labelledby="alert-dialog-slide-title"
                                  aria-describedby="alert-dialog-slide-description"
                                >
                                  <div className="gc360-photo-dialog">
                                    <DialogTitle className="gc360-photo-dialog_title">
                                      Update Profile Picture
                                    </DialogTitle>
                                    <DialogContent className="gc360-photo-dialog_content">
                                      <DialogContentText className="gc360-photo-dialog_content_text">
                                        {props.width === 'md' ||
                                        props.width === 'sm' ||
                                        props.width === 'xs'
                                          ? 'Tap Image to Browse Files'
                                          : 'Drag & Drop Picture, or Click to Browse Files'}
                                      </DialogContentText>
                                      {!preview && (
                                        <Dropzone
                                          onDropAccepted={onDropAccepted}
                                          onDropRejected={onDropRejected}
                                          accept="image/jpeg, image/jpg, image/png"
                                        >
                                          {({ getRootProps, getInputProps }) => (
                                            <section>
                                              <div
                                                className="gc360-photo-dialog_content_dropzone"
                                                {...getRootProps()}
                                              >
                                                <input {...getInputProps()} />
                                                <img
                                                  className="gc360-photo-dialog_content_dropzone_img"
                                                  src={`data:image/jpg;base64,${image}`}
                                                  alt=""
                                                  style={{
                                                    'max-width': '140px',
                                                    'max-height': '140px',
                                                  }}
                                                />
                                              </div>
                                            </section>
                                          )}
                                        </Dropzone>
                                      )}
                                      {preview && (
                                        <div className="gc360-photo-dialog_content_cropper">
                                          <Cropper
                                            ref={cropper}
                                            src={preview}
                                            style={{
                                              'max-width': maxCropPreviewWidth(),
                                              'max-height':
                                                maxCropPreviewWidth() / cropperData.aspectRatio,
                                            }}
                                            autoCropArea={1}
                                            viewMode={3}
                                            aspectRatio={1}
                                            highlight={false}
                                            background={false}
                                            zoom={onCropperZoom}
                                            zoomable={false}
                                            dragMode={'none'}
                                            minCropBoxWidth={cropperData.cropBoxDim}
                                            minCropBoxHeight={cropperData.cropBoxDim}
                                          />
                                        </div>
                                      )}
                                      {preview && (
                                        <Button
                                          variant="contained"
                                          onClick={() => setPreview(null)}
                                          style={style.button}
                                          className="gc360-photo-dialog_content_button"
                                        >
                                          Choose Another Image
                                        </Button>
                                      )}
                                    </DialogContent>
                                    <DialogActions className="gc360-photo-dialog_actions-top">
                                      <Tooltip
                                        classes={{ tooltip: 'tooltip' }}
                                        id="tooltip-hide"
                                        title={
                                          isImagePublic
                                            ? 'Only faculty and police will see your photo'
                                            : 'Make photo visible to other students'
                                        }
                                      >
                                        <Button
                                          variant="contained"
                                          onClick={toggleImagePrivacy}
                                          style={style.button}
                                        >
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
                                          style={{ background: 'tomato', color: 'white' }}
                                        >
                                          Reset
                                        </Button>
                                      </Tooltip>
                                    </DialogActions>
                                    <DialogActions className="gc360-photo-dialog_actions-bottom">
                                      <Button
                                        variant="contained"
                                        onClick={handleCloseCancel}
                                        style={style.button}
                                      >
                                        Cancel
                                      </Button>
                                      <Tooltip
                                        classes={{ tooltip: 'tooltip' }}
                                        id="tooltip-submit"
                                        title="Crop to current region and submit"
                                      >
                                        <Button
                                          variant="contained"
                                          onClick={handleCloseSubmit}
                                          disabled={!preview}
                                          style={
                                            preview
                                              ? style.button
                                              : { background: 'darkgray', color: 'white' }
                                          }
                                        >
                                          Submit
                                        </Button>
                                      </Tooltip>
                                    </DialogActions>
                                  </div>
                                </Dialog>
                                <Dialog
                                  open={socialLinksOpen}
                                  keepMounted
                                  onClose={handleSocialLinksClose}
                                  aria-labelledby="alert-dialog-slide-title"
                                  aria-describedby="alert-dialog-slide-description"
                                >
                                  {linksDialog}
                                </Dialog>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  {VPScore}
                </Grid>

                <Grid item xs={12} lg={10} align="center">
                  <Grid container xs={12} lg={12} spacing={0} justify="center">
                    <Grid item xs={12} lg={12}>
                      <GordonSchedulePanel profile={profile} myProf={true} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} lg={5}>
                  <Grid container spacing={2}>
                    {profileInfo}
                    {officeInfo}
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
                              <Link className="gc360-link" to="/transcript">
                                <Button variant="contained" style={style.button}>
                                  Experience Transcript
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
                  open={isSnackBarOpen}
                  autoHideDuration={6000}
                  onClose={handleClose}
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
                      onClick={handleClose}
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
    // AUTHENTICATED - NETWORK STATUS: OFFLINE
    else {
      MyProfile = (
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
                  {
                    <img
                      src={require(`${'../../NoConnection.svg'}`)}
                      alt="Internet Connection Lost"
                    />
                  }
                </Grid>
                <br />
                <h1>Please Re-establish Connection</h1>
                <h4>Editing your profile has been deactivated due to loss of network.</h4>
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

    return MyProfile;
  }
  // NOT AUTHENTICATED
  else {
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
              <h4>You must be logged in to view your profile.</h4>
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
};

export default withWidth()(MyProfile);
