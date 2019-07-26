import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dropzone from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import activity from '../../services/activity';
import './activity-profile.css';
import Cropper from 'react-cropper';
import Advisors from './components/Advisors';
import GroupContacts from './components/GroupContacts';
import GordonLoader from '../../components/Loader';
import Membership from './components/Membership';
import membership from '../../services/membership';
import emails from '../../services/emails';
import session from '../../services/session';
import { gordonColors } from '../../theme';
import user from '../../services/user';
//import '../../app.js';

const CROP_DIM = 320; // pixels

class ActivityProfile extends Component {
  constructor(props) {
    super(props);

    this.alertRemoveImage = this.alertRemoveImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openEditActivityDialog = this.openEditActivityDialog.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onEditActivity = this.onEditActivity.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);

    this.state = {
      activityInfo: null,
      activityAdvisors: [],
      activityFollowers: 0,
      activityGroupAdmins: [],
      activityMembersNum: 0,
      activityMembers: [],
      image: null,
      preview: null,
      photoUpdated: false,
      activityStatus: '',
      sessionInfo: null,
      id: '', // User's id
      tempActivityBlurb: '', // For editing activity
      tempActivityJoinInfo: '', // For editing activity
      tempActivityURL: '', // For editing activity
      isAdmin: false, // Boolean for current user
      isSuperAdmin: false, // Boolean for current user
      openEditActivity: false,
      openRemoveImage: false,
      emailList: [],
      participationDescription: [],
      network: 'online',
    };
  }

  async componentWillMount() {
    this.setState({ loading: true });
    const { sessionCode, activityCode } = this.props.match.params;
    if (this.props.Authentication) {
      const [
        activityInfo,
        activityAdvisors,
        activityFollowers,
        activityGroupAdmins,
        activityMembersNum,
        activityStatus,
        sessionInfo,
        id,
        college_role, // for testing purposes only, remove before push
        isAdmin,
        participationDescription,
      ] = await Promise.all([
        activity.get(activityCode),
        activity.getAdvisors(activityCode, sessionCode),
        membership.getFollowersNum(activityCode, sessionCode),
        activity.getGroupAdmins(activityCode, sessionCode),
        membership.getMembersNum(activityCode, sessionCode),
        activity.getStatus(activityCode, sessionCode),
        session.get(sessionCode),
        user.getLocalInfo().id,
        user.getLocalInfo().college_role,
        membership.checkAdmin(user.getLocalInfo().id, sessionCode, activityCode),
        membership.search(user.getLocalInfo().id, sessionCode, activityCode),
      ]);
      if (this.state.isAdmin) {
        const emailList = await emails.get(activityCode);
        this.setState({ emailList });
      }
      this.setState({
        activityInfo,
        activityAdvisors,
        activityFollowers,
        activityGroupAdmins,
        activityMembersNum,
        activityStatus,
        sessionInfo,
        id,
        isAdmin: isAdmin || college_role === 'god',
        isSuperAdmin: college_role === 'god' ? true : false,
        participationDescription,
        tempActivityBlurb: activityInfo.ActivityBlurb,
        tempActivityJoinInfo: activityInfo.ActivityJoinInfo,
        tempActivityURL: activityInfo.ActivityURL,
      });
      if (this.state.isAdmin) {
        const [emailList] = await Promise.all([emails.get(activityCode)]);
        this.setState({ emailList });
      }
      if (
        (this.state.participationDescription[0] &&
          this.state.participationDescription[1] !== 'Guest') ||
        this.state.isSuperAdmin
      ) {
        // Only if the user is in the activity and not a guest can this get called (unless user is
        // a superadmin [god mode])
        // else Unauthorized error
        const activityMembers = await membership.get(
          this.state.activityInfo.ActivityCode,
          this.state.sessionInfo.SessionCode,
        );
        this.setState({ activityMembers });
      }
    } else {
      const [activityInfo, activityStatus, sessionInfo] = await Promise.all([
        activity.get(activityCode),
        activity.getStatus(activityCode, sessionCode),
        session.get(sessionCode),
      ]);
      this.setState({
        activityInfo,
        activityStatus,
        sessionInfo,
      });
    }
    this.setState({ loading: false });
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
            'Sorry, your image is too small! Image dimensions must be at least 320 x 320 pixels.',
          );
        } else {
          var aRatio = i.width / i.height;
          this.setState({ cropperData: { aspectRatio: aRatio } });
          var maxWidth = this.maxCropPreviewWidth();
          var displayWidth = maxWidth > i.width ? i.width : maxWidth;
          var cropDim = this.minCropBoxDim(i.width, displayWidth);
          this.setState({ cropperData: { aspectRatio: aRatio, cropBoxDim: cropDim } });
          this.setState({ preview: dataURL });
          this.setState({ photoUpdated: true });
        }
      }.bind(this);
      i.src = dataURL;
    }.bind(this);
    reader.readAsDataURL(previewImageFile);
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

  onCropperZoom(event) {
    if (event.detail.ratio > 1) {
      event.preventDefault();
      this.refs.cropper.zoomTo(1);
    }
  }

  onDropRejected() {
    alert('Sorry, invalid image file! Only PNG and JPEG images are accepted.');
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  openEditActivityDialog() {
    this.setState({ openEditActivity: true });
  }

  alertRemoveImage() {
    this.setState({ openRemoveImage: true });
  }

  // Called when user submits changes to activity from edit activity dialog box
  async onEditActivity() {
    let data = {
      ACT_CDE: this.state.activityInfo.ActivityCode,
      ACT_URL: this.state.tempActivityURL,
      ACT_BLURB: this.state.tempActivityBlurb,
      ACT_JOIN_INFO: this.state.tempActivityJoinInfo,
    };
    await activity.editActivity(this.state.activityInfo.ActivityCode, data);

    if (this.state.photoUpdated === true) {
      await activity.setActivityImage(this.state.activityInfo.ActivityCode, this.state.image);
    }
    this.onClose();
    this.refresh();
  }

  // Called when confirm remove image from the alert remove image dialog box
  async onRemoveImage() {
    await activity.resetImage(this.state.activityInfo.ActivityCode);
    this.onClose();
    this.refresh();
  }

  onClose() {
    this.setState({
      openRemoveImage: false,
      openEditActivity: false,
      alertRemoveImage: false,
    });
  }

  refresh() {
    window.location.reload();
  }

  handlePhotoOpen = () => {
    this.setState({ photoOpen: true });
  };

  handleCloseCancel = () => {
    this.setState({ photoOpen: false, preview: null });
  };

  handleCloseSelect = () => {
    if (this.state.preview != null) {
      this.setState({ image: this.state.preview });
      var croppedImage = this.refs.cropper.getCroppedCanvas({ width: CROP_DIM }).toDataURL();
      this.setState({ image: croppedImage, photoOpen: false, preview: null });
    }
  };

  parseEmailList = () => {
    var i;
    let justEmails = '';
    for (i = 0; i < this.state.emailList.length; i++) {
      justEmails = justEmails + this.state.emailList[i].Email + ',';
    }
    return justEmails;
  };

  parseAdminEmailList = () => {
    var i;
    let justEmails = '';
    for (i = 0; i < this.state.activityGroupAdmins.length; i++) {
      justEmails = justEmails + this.state.activityGroupAdmins[i].Email + ',';
    }
    return justEmails;
  };

  sendEmail = () => {
    window.location = 'mailto:' + this.parseAdminEmailList() + '?bcc=' + this.parseEmailList();
  };

  render() {
    if (this.state.error) {
      throw this.state.error;
    }

    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', event => {
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

    let content;

    // Creates the content of an activity's profile depending on the status of the network found in local storage
    if (networkStatus === 'online') {
      if (this.props.Authentication) {
        if (this.state.loading === true) {
          content = <GordonLoader />;
        } else {
          let editActivity;
          const redButton = {
            background: gordonColors.secondary.red,
            color: 'white',
          };

          const {
            ActivityDescription: activityDescription,
            ActivityBlurb: activityBlurb,
            ActivityJoinInfo: activityJoinInfo,
            ActivityURL: activityURL,
            ActivityImagePath: activityImagePath,
          } = this.state.activityInfo;
          const { preview } = this.state;

          if (this.state.isAdmin) {
            editActivity = (
              <section align="center" padding={6}>
                <CardContent>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.openEditActivityDialog}
                      >
                        Edit Involvement
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={this.sendEmail}>
                        Email Members/Subscribers
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>

                <Dialog open={this.state.openEditActivity} fullWidth>
                  <DialogTitle> Edit {activityDescription}</DialogTitle>
                  <DialogContent>
                    <Grid align="center" className="activity-image" item>
                      <img
                        alt={activity.activityDescription}
                        src={this.state.image || activityImagePath}
                        className="rounded-corners"
                      />
                    </Grid>
                    <Grid container spacing={2} justify="center">
                      <Grid item>
                        <Button
                          variant="contained"
                          onClick={this.alertRemoveImage}
                          style={redButton}
                        >
                          Remove image
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" onClick={this.handlePhotoOpen} color="primary">
                          Change Image
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
                      <DialogTitle id="simple-dialog-title">Update Involvement Picture</DialogTitle>
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
                          <Grid container justify="center" spacing={6}>
                            <Dropzone
                              onDropAccepted={this.onDropAccepted.bind(this)}
                              onDropRejected={this.onDropRejected.bind(this)}
                              accept="image/jpeg, image/jpg, image/png"
                            >
                              {({ getRootProps, getInputProps }) => (
                                <section>
                                  <div className="photoUploader" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <img
                                      className="rounded-corners"
                                      src={activityImagePath}
                                      alt=""
                                      style={{ 'max-width': '320px', 'max-height': '320px' }}
                                    />
                                  </div>
                                </section>
                              )}
                            </Dropzone>
                          </Grid>
                        )}
                        {preview && (
                          <Grid container justify="center" spacing={6}>
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
                          <Grid container justify="center" spacing={6}>
                            <Grid item>
                              <Button
                                variant="contained"
                                onClick={() => this.setState({ preview: null })}
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
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.handleCloseCancel}
                            >
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.handleCloseSelect}
                              disabled={!this.state.preview}
                            >
                              Select
                            </Button>
                          </Grid>
                        </Grid>
                      </DialogActions>
                    </Dialog>

                    <Dialog open={this.state.openRemoveImage} keepMounted align="center">
                      <DialogTitle>Are you sure you want to remove image?</DialogTitle>
                      <DialogContent>
                        <Grid container spacing={2}>
                          <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.onRemoveImage}
                              raised
                            >
                              OK
                            </Button>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Button variant="contained" onClick={this.onClose} raised>
                              CANCEL
                            </Button>
                          </Grid>
                        </Grid>
                      </DialogContent>
                    </Dialog>
                    <form onSubmit={this.handleSubmit}>
                      <Grid container>
                        <Grid item xs={12}>
                          <TextField
                            label="Description"
                            margin="dense"
                            multiline
                            fullWidth
                            defaultValue={activityBlurb}
                            onChange={this.handleChange('tempActivityBlurb')}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            label="Special Information for Joining"
                            margin="dense"
                            multiline
                            fullWidth
                            defaultValue={activityJoinInfo}
                            onChange={this.handleChange('tempActivityJoinInfo')}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            label="Website"
                            margin="dense"
                            multiline
                            fullWidth
                            defaultValue={activityURL}
                            onChange={this.handleChange('tempActivityURL')}
                          />
                        </Grid>
                      </Grid>
                    </form>
                  </DialogContent>

                  <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.onClose}>
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.onEditActivity}>
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </section>
            );
          }
          const { SessionDescription: sessionDescription } = this.state.sessionInfo;
          let description;
          if (activityBlurb.length !== 0) {
            description = (
              <Typography variant="body2">
                <strong>Description: </strong>
                {activityBlurb}
              </Typography>
            );
          }
          let website;
          if (activityURL.length !== 0) {
            website = (
              <Typography variant="body2">
                <strong>Website: </strong>
                <a href={activityURL} className="gc360-text-link">
                  {' '}
                  {activityURL}
                </a>
              </Typography>
            );
          }
          let subscribersWord, membersWord;
          let groupContacts = <GroupContacts groupAdmin={this.state.activityGroupAdmins} />;
          let advisors = <Advisors advisors={this.state.activityAdvisors} />;
          const subscribersNum = this.state.activityFollowers;
          if (subscribersNum === 1) {
            subscribersWord = 'Subscriber';
          } else {
            subscribersWord = 'Subscribers';
          }
          const membersNum = this.state.activityMembersNum;
          if (membersNum === 1) {
            membersWord = 'Member';
          } else {
            membersWord = 'Members';
          }
          let membership = (
            <Membership
              members={this.state.activityMembers}
              sessionInfo={this.state.sessionInfo}
              activityCode={this.state.activityInfo.ActivityCode}
              activityDescription={this.state.activityInfo.ActivityDescription}
              participationDetail={this.state.participationDetail}
              id={this.state.id}
              isAdmin={this.state.isAdmin}
              isSuperAdmin={this.state.isSuperAdmin}
              status={this.state.activityStatus}
            />
          );
          content = (
            <section className="gordon-activity-profile">
              <Card>
                <CardContent>
                  <Typography align="center" variant="display1">
                    {activityDescription}
                  </Typography>
                  <Grid align="center" className="activity-image" item>
                    <img
                      alt={activity.activityDescription}
                      src={activityImagePath}
                      className="rounded-corners"
                    />
                  </Grid>
                  <Grid item>{editActivity}</Grid>
                  <Typography variant="body2">
                    <strong>Session: </strong>
                    {sessionDescription}
                  </Typography>
                  {description}
                  {website}
                  {groupContacts}
                  {advisors}
                  <Typography>
                    <strong>Special Information for Joining: </strong>
                    {this.state.activityInfo.ActivityJoinInfo}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Current Involvement Roster: </strong>
                    {membersNum} {membersWord} and {subscribersNum} {subscribersWord}
                  </Typography>
                </CardContent>
                {membership}
              </Card>
            </section>
          );
        }
      } else {
        if (this.state.loading === true) {
          content = <GordonLoader />;
        } else {
          let editActivity;

          const {
            ActivityDescription: activityDescription,
            ActivityBlurb: activityBlurb,
            ActivityURL: activityURL,
            ActivityImagePath: activityImagePath,
          } = this.state.activityInfo;

          const { SessionDescription: sessionDescription } = this.state.sessionInfo;
          let description;
          if (activityBlurb.length !== 0) {
            description = (
              <Typography variant="body1">
                <strong>Description: </strong>
                {activityBlurb}
              </Typography>
            );
          }
          let website;
          if (activityURL.length !== 0) {
            website = (
              <Typography variant="body2">
                <strong>Website: </strong>
                <a href={activityURL}> {activityURL}</a>
              </Typography>
            );
          }
          content = (
            <section className="gordon-activity-profile">
              <Card>
                <CardContent>
                  <Typography align="center" variant="display1">
                    {activityDescription}
                  </Typography>
                  <Grid align="center" className="activity-image" item>
                    <img
                      alt={activity.activityDescription}
                      src={activityImagePath}
                      className="rounded-corners"
                    />
                  </Grid>
                  <Grid item>{editActivity}</Grid>
                  <Typography variant="body1">
                    <strong>Session: </strong>
                    {sessionDescription}
                  </Typography>
                  {description}
                  {website}
                </CardContent>
              </Card>
            </section>
          );
        }
      }
    } else {
      content = (
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
                  <img
                    src={require(`${'../../NoConnection.svg'}`)}
                    alt="Internet Connection Lost"
                  />
                </Grid>
                <br />
                <h1>Please Re-establish Connection</h1>
                <h4>Viewing an involvement has been deactivated due to loss of network.</h4>
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

    return (
      <section>
        <Grid container justify="center" spacing={6}>
          <Grid item xs={12} md={12} lg={8}>
            {content}
          </Grid>
        </Grid>
      </section>
    );
  }
}

ActivityProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default withRouter(ActivityProfile);
