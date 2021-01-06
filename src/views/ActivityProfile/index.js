import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
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
import { useNetworkIsOnline } from '../../context/NetworkContext';
import OfflinePanel from '../../components/OfflinePanel';

const CROP_DIM = 320; // pixels

const ActivityProfile = ({ authentication, match }) => {
  const [loading, setLoading] = useState(true);
  const [activityInfo, setActivityInfo] = useState(null);
  const [activityAdvisors, setActivityAdvisors] = useState([]);
  const [activityFollowers, setActivityFollowers] = useState(0);
  const [activityGroupAdmins, setActivityGroupAdmins] = useState([]);
  const [activityMembersNum, setActivityMembersNum] = useState(0);
  const [activityMembers, setActivityMembers] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(null);
  const [cropBoxDim, setCropBoxDim] = useState(null);
  const [photoUpdated, setPhotoUpdated] = useState(false);
  const [activityStatus, setActivityStatus] = useState('');
  const [sessionInfo, setSessionInfo] = useState(null);
  const [id, setId] = useState('');
  const [tempActivityBlurb, setTempActivityBlurb] = useState('');
  const [tempActivityJoinInfo, setTempActivityJoinInfo] = useState('');
  const [tempActivityURL, setTempActivityURL] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [openEditActivity, setOpenEditActivity] = useState(false);
  const [openRemoveImage, setOpenRemoveImage] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const isOnline = useNetworkIsOnline();
  const cropperRef = useRef();

  const load = useCallback(async () => {
    setLoading(true);
    const { sessionCode, activityCode } = match.params;
    if (authentication) {
      const { id, college_role } = await user.getLocalInfo(); // college_role for testing purposes only, remove before push (???)
      const [
        activityInfo,
        activityAdvisors,
        activityFollowers,
        activityGroupAdmins,
        activityMembersNum,
        activityStatus,
        sessionInfo,
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
        membership.checkAdmin(id, sessionCode, activityCode),
        membership.search(id, sessionCode, activityCode),
      ]);
      setActivityInfo(activityInfo);
      setActivityAdvisors(activityAdvisors);
      setActivityFollowers(activityFollowers);
      setActivityGroupAdmins(activityGroupAdmins);
      setActivityMembersNum(activityMembersNum);
      setActivityStatus(activityStatus);
      setSessionInfo(sessionInfo);
      setId(id);
      setIsAdmin(isAdmin || college_role === 'god');
      setIsSuperAdmin(college_role === 'god');
      setTempActivityBlurb(activityInfo.ActivityBlurb);
      setTempActivityJoinInfo(activityInfo.ActivityJoinInfo);
      setTempActivityURL(activityInfo.ActivityURL);

      if (isAdmin) {
        const emailList = await emails.get(activityCode);
        setEmailList(emailList);
      }
      if (
        (participationDescription[0] && participationDescription[1] !== 'Guest') ||
        isSuperAdmin
      ) {
        // Only if the user is in the activity and not a guest can this get called (unless user is
        // a superadmin [god mode])
        // else Unauthorized error
        const activityMembers = await membership.get(
          activityInfo.ActivityCode,
          sessionInfo.SessionCode,
        );
        setActivityMembers(activityMembers);
      }
    } else {
      const [activityInfo, activityStatus, sessionInfo] = await Promise.all([
        activity.get(activityCode),
        activity.getStatus(activityCode, sessionCode),
        session.get(sessionCode),
      ]);
      setActivityInfo(activityInfo);
      setActivityStatus(activityStatus);
      setSessionInfo(sessionInfo);
    }
    setLoading(false);
  }, [isSuperAdmin, authentication, match.params]);

  useEffect(() => {
    load();
  }, [load]);

  const onDropAccepted = (fileList) => {
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
          setAspectRatio(i.width / i.height);
          var maxWidth = maxCropPreviewWidth();
          var displayWidth = maxWidth > i.width ? i.width : maxWidth;
          var cropDim = minCropBoxDim(i.width, displayWidth);
          setCropBoxDim(cropDim);
          setPreview(dataURL);
          setPhotoUpdated(true);
        }
      };
      i.src = dataURL;
    };
    reader.readAsDataURL(previewImageFile);
  };

  const maxCropPreviewWidth = () => {
    const breakpointWidth = 960;
    const smallScreenRatio = 0.75;
    const largeScreenRatio = 0.525;
    const maxHeightRatio = 0.5;
    var maxWidth =
      window.innerWidth *
      (window.innerWidth < breakpointWidth ? smallScreenRatio : largeScreenRatio);
    var correspondingHeight = maxWidth / aspectRatio;
    var maxHeight = window.innerHeight * maxHeightRatio;
    var correspondingWidth = maxHeight * aspectRatio;

    if (correspondingHeight > maxHeight) {
      return correspondingWidth;
    } else {
      return maxWidth;
    }
  };

  const minCropBoxDim = (imgWidth, dispWidth) => {
    return (CROP_DIM * dispWidth) / imgWidth;
  };

  const onCropperZoom = (event) => {
    if (event.detail.ratio > 1) {
      event.preventDefault();
      cropperRef.current.zoomTo(1);
    }
  };

  const onDropRejected = () => {
    alert('Sorry, invalid image file! Only PNG and JPEG images are accepted.');
  };

  // Called when user submits changes to activity from edit activity dialog box
  const onEditActivity = async () => {
    let data = {
      ACT_CDE: activityInfo.ActivityCode,
      ACT_URL: tempActivityURL,
      ACT_BLURB: tempActivityBlurb,
      ACT_JOIN_INFO: tempActivityJoinInfo,
    };
    await activity.editActivity(activityInfo.ActivityCode, data);

    if (photoUpdated === true) {
      await activity.setActivityImage(activityInfo.ActivityCode, image);
    }
    onClose();
    refresh();
  };

  // Called when confirm remove image from the alert remove image dialog box
  const onRemoveImage = async () => {
    await activity.resetImage(activityInfo.ActivityCode);
    onClose();
    refresh();
  };

  const onClose = () => {
    setOpenRemoveImage(false);
    setOpenEditActivity(false);
  };

  // TODO: Why not just load page again?
  const refresh = () => {
    window.location.reload();
  };

  const handleCloseSelect = () => {
    if (preview != null) {
      setImage(preview);
      const croppedImage = cropperRef.current.getCroppedCanvas({ width: CROP_DIM }).toDataURL();
      setImage(croppedImage);
      setPhotoOpen(false);
      setPreview(null);
    }
  };

  const parseEmailList = () => {
    var i;
    let justEmails = '';
    for (i = 0; i < emailList.length; i++) {
      justEmails = justEmails + emailList[i].Email + ',';
    }
    return justEmails;
  };

  const parseAdminEmailList = () => {
    var i;
    let justEmails = '';
    for (i = 0; i < activityGroupAdmins.length; i++) {
      justEmails = justEmails + activityGroupAdmins[i].Email + ',';
    }
    return justEmails;
  };

  const sendEmail = () => {
    window.location = 'mailto:' + parseAdminEmailList() + '?bcc=' + parseEmailList();
  };

  let content;

  if (loading) {
    return <GordonLoader />;
  }
  if (!isOnline) {
    return <OfflinePanel componentName="Activity Profile" />;
  }

  if (authentication) {
    let editActivity;
    const redButton = {
      background: gordonColors.secondary.red,
      color: 'white',
    };

    console.log(activityInfo);
    const {
      ActivityDescription: activityDescription,
      ActivityBlurb: activityBlurb,
      ActivityJoinInfo: activityJoinInfo,
      ActivityURL: activityURL,
      ActivityImagePath: activityImagePath,
    } = activityInfo;

    if (isAdmin) {
      editActivity = (
        <section align="center" padding={6}>
          <CardContent>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenEditActivity(true)}
                >
                  Edit Involvement
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={sendEmail}>
                  Email Members/Subscribers
                </Button>
              </Grid>
            </Grid>
          </CardContent>

          <Dialog open={openEditActivity} fullWidth>
            <DialogTitle> Edit {activityDescription}</DialogTitle>
            <DialogContent>
              <Grid align="center" className="activity-image" item>
                <img
                  alt={activityDescription}
                  src={image || activityImagePath}
                  className="rounded-corners"
                />
              </Grid>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => openRemoveImage(true)}
                    style={redButton}
                  >
                    Remove image
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={() => setPhotoOpen(true)} color="primary">
                    Change Image
                  </Button>
                </Grid>
              </Grid>
              <Dialog
                open={photoOpen}
                keepMounted
                onClose={() => setPhotoOpen(false)}
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
                        onDropAccepted={onDropAccepted}
                        onDropRejected={onDropRejected}
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
                        ref={cropperRef}
                        src={preview}
                        style={{
                          'max-width': maxCropPreviewWidth(),
                          'max-height': maxCropPreviewWidth() / aspectRatio,
                        }}
                        autoCropArea={1}
                        viewMode={3}
                        aspectRatio={1}
                        highlight={false}
                        background={false}
                        zoom={onCropperZoom}
                        zoomable={false}
                        dragMode={'none'}
                        minCropBoxWidth={cropBoxDim}
                        minCropBoxHeight={cropBoxDim}
                      />
                    </Grid>
                  )}
                  {preview && <br />}
                  {preview && (
                    <Grid container justify="center" spacing={6}>
                      <Grid item>
                        <Button variant="contained" onClick={() => setPreview(null)}>
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
                        onClick={() => {
                          setPhotoOpen(false);
                          setPreview(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCloseSelect}
                        disabled={!preview}
                      >
                        Select
                      </Button>
                    </Grid>
                  </Grid>
                </DialogActions>
              </Dialog>

              <Dialog open={openRemoveImage} keepMounted align="center">
                <DialogTitle>Are you sure you want to remove image?</DialogTitle>
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <Button variant="contained" color="primary" onClick={onRemoveImage} raised>
                        OK
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <Button variant="contained" onClick={onClose} raised>
                        CANCEL
                      </Button>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Dialog>
              <form>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      margin="dense"
                      multiline
                      fullWidth
                      defaultValue={activityBlurb}
                      onChange={(e) => setTempActivityBlurb(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Special Information for Joining"
                      margin="dense"
                      multiline
                      fullWidth
                      defaultValue={activityJoinInfo}
                      onChange={(e) => setTempActivityJoinInfo(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Website"
                      margin="dense"
                      multiline
                      fullWidth
                      defaultValue={activityURL}
                      onChange={(e) => setTempActivityURL(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>

            <DialogActions>
              <Button variant="contained" color="primary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={onEditActivity}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </section>
      );
    }
    const { SessionDescription: sessionDescription } = sessionInfo;
    let description;
    if (activityBlurb.length !== 0) {
      description = <Typography variant="body2">{activityBlurb}</Typography>;
    }
    let website;
    if (activityURL.length !== 0) {
      website = (
        <Typography variant="body2">
          <a href={activityURL} className="gc360-text-link" style={{ fontWeight: 'bold' }}>
            {' '}
            {activityURL}
          </a>
        </Typography>
      );
    }
    const subscribersWord = activityFollowers > 1 ? 'Subscribers' : 'Subscriber';
    const membersWord = activityMembersNum > 1 ? 'Members' : 'Member';
    let groupContacts = <GroupContacts groupAdmin={activityGroupAdmins} />;
    let advisors = <Advisors advisors={activityAdvisors} />;
    let membership = (
      <Membership
        members={activityMembers}
        sessionInfo={sessionInfo}
        activityCode={activityInfo.ActivityCode}
        activityDescription={activityInfo.ActivityDescription}
        id={id}
        isAdmin={isAdmin}
        isSuperAdmin={isSuperAdmin}
        status={activityStatus}
      />
    );
    content = (
      <section className="gordon-activity-profile">
        <Card>
          <CardContent>
            <CardHeader title={activityDescription} subheader={sessionDescription} />
            <Grid align="center" className="activity-image" item>
              <img
                alt={activity.activityDescription}
                src={activityImagePath}
                className="rounded-corners"
              />
            </Grid>
            <Grid item>{editActivity}</Grid>
            <Grid item style={{ padding: '16px' }}>
              <Typography variant="body2">{description}</Typography>
              <Typography variant="subtitle1">{website}</Typography>
            </Grid>

            <hr width="70%"></hr>
            <br></br>

            {/* Activity Description */}
            <Grid item justify="center" align="left">
              <Grid container lg={12} direction="column" align="left">
                <Typography variant="body2">{groupContacts}</Typography>
                <Typography variant="body2">{advisors}</Typography>
                <Typography variant="body2">
                  <strong>Special Information for Joining: </strong>
                  {activityInfo.ActivityJoinInfo}
                </Typography>
                <Typography variant="body2">
                  <strong>Current Involvement Roster: </strong>
                  {activityMembersNum} {membersWord} and {activityFollowers} {subscribersWord}
                </Typography>
                {/* negative margin necessary because of default padding on Membership */}
                {/* perhaps defaults can be changed eventually if all use cases checked */}
                <div style={{ marginLeft: '-8px', padding: '8px 0' }}>{membership}</div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </section>
    );
  } else {
    let editActivity;

    const {
      ActivityDescription: activityDescription,
      ActivityBlurb: activityBlurb,
      ActivityURL: activityURL,
      ActivityImagePath: activityImagePath,
    } = activityInfo;

    const { SessionDescription: sessionDescription } = sessionInfo;
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

  return (
    <section>
      <Grid container justify="center" spacing={6}>
        <Grid item xs={12} md={12} lg={8}>
          {content}
        </Grid>
      </Grid>
    </section>
  );
};

ActivityProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default withRouter(ActivityProfile);
