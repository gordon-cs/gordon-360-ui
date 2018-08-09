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
      openEditActivity: false,
      openRemoveImage: false,
      emailList: [],
    };
  }

  async componentWillMount() {
    this.setState({ loading: true });
    const { sessionCode, activityCode } = this.props.match.params;
    const [
      activityInfo,
      activityAdvisors,
      activityFollowers,
      activityGroupAdmins,
      activityMembersNum,
      activityStatus,
      sessionInfo,
      id,
      isAdmin,
      emailList,
    ] = await Promise.all([
      activity.get(activityCode),
      activity.getAdvisors(activityCode, sessionCode),
      membership.getFollowersNum(activityCode, sessionCode),
      activity.getGroupAdmins(activityCode, sessionCode),
      membership.getMembersNum(activityCode, sessionCode),
      activity.getStatus(activityCode, sessionCode),
      session.get(sessionCode),
      user.getLocalInfo().id,
      membership.checkAdmin(user.getLocalInfo().id, sessionCode, activityCode),
      emails.get(activityCode),
    ]);

    this.setState({
      activityInfo,
      activityAdvisors,
      activityFollowers,
      activityGroupAdmins,
      activityMembersNum,
      activityStatus,
      sessionInfo,
      id,
      isAdmin,
      emailList,
    });

    this.setState({
      tempActivityBlurb: activityInfo.ActivityBlurb,
      tempActivityJoinInfo: activityInfo.ActivityJoinInfo,
      tempActivityURL: activityInfo.ActivityURL,
    });

    let participationDetail = await membership.search(
      this.state.id,
      this.state.sessionInfo.SessionCode,
      this.state.activityInfo.ActivityCode,
    );
    if (participationDetail[0] && participationDetail[1] !== 'Guest') {
      // Only if the user is in the activity and not a guest can this get called
      // else Unauthorized error
      const activityMembers = await membership.get(
        this.state.activityInfo.ActivityCode,
        this.state.sessionInfo.SessionCode,
      );
      this.setState({ activityMembers });
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
    let content;
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
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.openEditActivityDialog}
                    raised
                  >
                    Edit Involvement
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={this.sendEmail} raised>
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
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button variant="contained" onClick={this.alertRemoveImage} style={redButton}>
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
                      <Grid container justify="center" spacing="16">
                        <Dropzone
                          onDropAccepted={this.onDropAccepted.bind(this)}
                          onDropRejected={this.onDropRejected.bind(this)}
                          accept="image/jpeg,image/jpg,image/png"
                          className="photoUploader"
                        >
                          <img
                            className="rounded-corners"
                            src={activityImagePath}
                            alt=""
                            style={{ 'max-width': '320px', 'max-height': '320px' }}
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
                      <Grid container justify="center" spacing="16">
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
                    <Grid container spacing={16}>
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
                <Button variant="contained" color="primary" onClick={this.onClose} raised>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={this.onEditActivity} raised>
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
          <Typography variant="body1">
            <strong>Description: </strong>
            {activityBlurb}
          </Typography>
        );
      }
      let website;
      if (activityURL.length !== 0) {
        website = (
          <Typography variant="body1">
            <strong>Website: </strong>
            <a href={activityURL}> {activityURL}</a>
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
              <Typography variant="body1">
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
              <Typography variant="body1">
                <strong>Current Involvement Roster: </strong>
                {membersNum} {membersWord} and {subscribersNum} {subscribersWord}
              </Typography>
            </CardContent>
            {membership}
          </Card>
        </section>
      );
    }

    return (
      <section>
        <Grid container justify="center" spacing="16">
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
