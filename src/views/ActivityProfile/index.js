import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import activityService from 'services/activity';
import './activity-profile.css';
import Cropper from 'react-cropper';
import Advisors from './components/Advisors';
import GroupContacts from './components/GroupContacts';
import GordonLoader from 'components/Loader';
import Membership from './components/Membership';
import membershipService from 'services/membership';
import emailsService from 'services/emails';
import sessionService from 'services/session';
import { gordonColors } from 'theme';
import { ReactComponent as NoConnectionImage } from 'NoConnection.svg';
import userService from 'services/user';
import {
  CardHeader,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import useNetworkStatus from 'hooks/useNetworkStatus';

const CROP_DIM = 320; // pixels

const ActivityProfile = (props) => {
  const [activityInfo, setActivityInfo] = useState(null);
  const [activityAdvisors, setActivityAdvisors] = useState([]);
  const [activityFollowers, setActivityFollowers] = useState(0);
  const [activityGroupAdmins, setActivityGroupAdmins] = useState([]);
  const [activityMembersNum, setActivityMembersNum] = useState(0);
  const [activityMembers, setActivityMembers] = useState([]);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [photoUpdated, setPhotoUpdated] = useState(false);
  const [activityStatus, setActivityStatus] = useState('');
  const [sessionInfo, setSessionInfo] = useState(null);
  const [id, setId] = useState(''); // User's id
  const [loading, setLoading] = useState(true);
  const [tempActivityBlurb, setTempActivityBlurb] = useState(''); // For editing activity
  const [tempActivityJoinInfo, setTempActivityJoinInfo] = useState(''); // For editing activity
  const [tempActivityURL, setTempActivityURL] = useState(''); // For editing activity
  const [isAdmin, setIsAdmin] = useState(false); // Boolean for current user
  const [isSuperAdmin, setIsSuperAdmin] = useState(false); // Boolean for current user
  const [openEditActivity, setOpenEditActivity] = useState(false);
  const [openRemoveImage, setOpenRemoveImage] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [participationDescription, setParticipationDescription] = useState([]);
  const [cropperData, setCropperData] = useState({});
  const isOnline = useNetworkStatus();
  const cropperRef = useRef();

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      const { sessionCode, activityCode } = props.match.params;
      if (props.authentication) {
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
          activityService.get(activityCode),
          activityService.getAdvisors(activityCode, sessionCode),
          membershipService.getFollowersNum(activityCode, sessionCode),
          activityService.getGroupAdmins(activityCode, sessionCode),
          membershipService.getMembersNum(activityCode, sessionCode),
          activityService.getStatus(activityCode, sessionCode),
          sessionService.get(sessionCode),
          userService.getLocalInfo().id,
          userService.getLocalInfo().college_role,
          membershipService.checkAdmin(userService.getLocalInfo().id, sessionCode, activityCode),
          membershipService.search(userService.getLocalInfo().id, sessionCode, activityCode),
        ]);
        const emailList = isAdmin ? await emailsService.get(activityCode) : null;
        const isSuperAdmin = college_role === 'god';

        setActivityInfo(activityInfo);
        setActivityAdvisors(activityAdvisors);
        setActivityFollowers(activityFollowers);
        setActivityGroupAdmins(activityGroupAdmins);
        setActivityMembersNum(activityMembersNum);
        setActivityStatus(activityStatus);
        setSessionInfo(sessionInfo);
        setId(id);
        setIsAdmin(isAdmin || isSuperAdmin);
        setIsSuperAdmin(isSuperAdmin);
        setParticipationDescription(participationDescription);
        setTempActivityBlurb(activityInfo.ActivityBlurb);
        setTempActivityJoinInfo(activityInfo.ActivityJoinInfo);
        setTempActivityURL(activityInfo.ActivityURL);
        setEmailList(emailList);
        setLoading(false);

        if (
          (participationDescription[0] && participationDescription[1] !== 'Guest') ||
          isSuperAdmin
        ) {
          // Only if the user is in the activity and not a guest can this get called (unless user is
          // a superadmin [god mode])
          // else Unauthorized error
          const activityMembers = await membershipService.get(
            activityInfo.ActivityCode,
            sessionInfo.SessionCode,
          );
          setActivityMembers(activityMembers);
        }
      } else {
        const [activityInfo, activityStatus, sessionInfo] = await Promise.all([
          activityService.get(activityCode),
          activityService.getStatus(activityCode, sessionCode),
          sessionService.get(sessionCode),
        ]);
        setActivityInfo(activityInfo);
        setActivityStatus(activityStatus);
        setSessionInfo(sessionInfo);
        setLoading(false);
      }
    };
    loadPage();
  }, [props.authentication, props.match.params]);

  const onDropAccepted = (fileList) => {
    var previewImageFile = fileList[0];
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result.toString();
      var i = new Image();
      i.onload = function () {
        if (i.width < CROP_DIM || i.height < CROP_DIM) {
          alert(
            'Sorry, your image is too small! Image dimensions must be at least 320 x 320 pixels.',
          );
        } else {
          var aRatio = i.width / i.height;
          setCropperData({ aspectRatio: aRatio });
          var maxWidth = maxCropPreviewWidth();
          var displayWidth = maxWidth > i.width ? i.width : maxWidth;
          var cropDim = minCropBoxDim(i.width, displayWidth);
          setCropperData({ aspectRatio: aRatio, cropBoxDim: cropDim });
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
    const aspect = cropperData.aspectRatio;
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
  };

  const minCropBoxDim = (imgWidth, dispWidth) => {
    return (CROP_DIM * dispWidth) / imgWidth;
  };

  const onCropperZoom = (event) => {
    if (event.detail.ratio > 1) {
      event.preventDefault();
      cropperRef.current.cropper.zoomTo(1);
    }
  };

  const onDropRejected = () => {
    alert('Sorry, invalid image file! Only PNG and JPEG images are accepted.');
  };

  const openEditActivityDialog = () => setOpenEditActivity(true);

  const alertRemoveImage = () => setOpenRemoveImage(true);

  // Called when user submits changes to activity from edit activity dialog box
  const onEditActivity = async () => {
    let data = {
      ACT_CDE: activityInfo.ActivityCode,
      ACT_URL: tempActivityURL,
      ACT_BLURB: tempActivityBlurb,
      ACT_JOIN_INFO: tempActivityJoinInfo,
    };
    await activityService.editActivity(activityInfo.ActivityCode, data);

    if (photoUpdated === true) {
      await activityService.setActivityImage(activityInfo.ActivityCode, image);
    }
    setOpenEditActivity(false);
    refresh();
  };

  // Called when confirm remove image from the alert remove image dialog box
  const onRemoveImage = async () => {
    await activityService.resetImage(activityInfo.ActivityCode);
    setOpenRemoveImage(false);
    refresh();
  };

  const refresh = () => {
    window.location.reload();
  };

  const handlePhotoOpen = () => {
    setPhotoOpen(true);
  };

  const handleCloseCancel = () => {
    setPhotoOpen(false);
    setPreview(null);
  };

  const handleCloseSelect = () => {
    if (preview != null) {
      setImage(preview);
      var croppedImage = cropperRef.current.cropper
        .getCroppedCanvas({ width: CROP_DIM })
        .toDataURL();
      setImage(croppedImage);
      setPhotoOpen(false);
      setPreview(null);
    }
  };

  const parseEmailsFromList = (list) => {
    return list.map((e) => e.Email).join(',');
  };

  const sendEmail = () => {
    window.location =
      'mailto:' +
      parseEmailsFromList(activityGroupAdmins) +
      '?bcc=' +
      parseEmailsFromList(emailList);
  };

  let content;

  // Creates the content of an activity's profile depending on the status of the network found in local storage
  if (isOnline) {
    if (props.authentication) {
      if (loading) {
        content = <GordonLoader />;
      } else {
        let editActivity;
        const redButton = {
          background: gordonColors.secondary.red,
          color: 'white',
        };

        if (isAdmin) {
          editActivity = (
            <section align="center" padding={6}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={openEditActivityDialog}>
                    Edit Involvement
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={sendEmail}>
                    Email Members/Subscribers
                  </Button>
                </Grid>
              </Grid>

              <Dialog open={openEditActivity} fullWidth>
                <DialogTitle> Edit {activityInfo?.ActivityDescription}</DialogTitle>
                <DialogContent>
                  <Grid align="center" className="activity-image" item>
                    <img
                      alt={activityService.activityDescription}
                      src={image || activityInfo?.ActivityImagePath}
                      className="rounded-corners"
                    />
                  </Grid>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button variant="contained" onClick={alertRemoveImage} style={redButton}>
                        Remove image
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" onClick={handlePhotoOpen} color="primary">
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
                            onDropAccepted={onDropAccepted.bind(this)}
                            onDropRejected={onDropRejected.bind(this)}
                            accept="image/jpeg, image/jpg, image/png"
                          >
                            {({ getRootProps, getInputProps }) => (
                              <section>
                                <div className="photoUploader" {...getRootProps()}>
                                  <input {...getInputProps()} />
                                  <img
                                    className="rounded-corners"
                                    src={activityInfo?.ActivityImagePath}
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
                              'max-height': maxCropPreviewWidth() / cropperData.aspectRatio,
                            }}
                            autoCropArea={1}
                            viewMode={3}
                            aspectRatio={1}
                            highlight={false}
                            background={false}
                            zoom={onCropperZoom.bind(this)}
                            zoomable={false}
                            dragMode={'none'}
                            minCropBoxWidth={cropperData.cropBoxDim}
                            minCropBoxHeight={cropperData.cropBoxDim}
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
                          <Button variant="contained" color="primary" onClick={handleCloseCancel}>
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
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={onRemoveImage}
                            raised
                          >
                            OK
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <Button
                            variant="contained"
                            onClick={() => setOpenRemoveImage(false)}
                            raised
                          >
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
                          defaultValue={activityInfo?.ActivityBlurb}
                          onChange={(event) => setTempActivityBlurb(event.target.value)}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          label="Special Information for Joining"
                          margin="dense"
                          multiline
                          fullWidth
                          defaultValue={activityInfo?.ActivityJoinInfo}
                          onChange={(event) => setTempActivityJoinInfo(event.target.value)}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          label="Website"
                          margin="dense"
                          multiline
                          fullWidth
                          defaultValue={activityInfo?.ActivityURL}
                          onChange={(event) => setTempActivityURL(event.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </form>
                </DialogContent>

                <DialogActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenEditActivity(false)}
                  >
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
        const { ActivityBlurb: activityBlurb } = activityInfo;
        let website;
        if (activityInfo?.ActivityURL?.length !== 0) {
          website = (
            <Typography variant="body2">
              <a
                href={activityInfo?.ActivityURL}
                className="gc360-text-link"
                style={{ fontWeight: 'bold' }}
              >
                {activityInfo?.ActivityURL}
              </a>
            </Typography>
          );
        }
        let subscribersWord, membersWord;
        let groupContacts = <GroupContacts groupAdmin={activityGroupAdmins} />;
        let advisors = <Advisors advisors={activityAdvisors} />;
        const subscribersNum = activityFollowers;
        if (subscribersNum === 1) {
          subscribersWord = 'Subscriber';
        } else {
          subscribersWord = 'Subscribers';
        }
        const membersNum = activityMembersNum;
        if (membersNum === 1) {
          membersWord = 'Member';
        } else {
          membersWord = 'Members';
        }
        let membership = (
          <Membership
            members={activityMembers}
            sessionInfo={sessionInfo}
            activityCode={activityInfo.ActivityCode}
            activityDescription={activityInfo.ActivityDescription}
            participationDetail={participationDescription}
            id={id}
            isAdmin={isAdmin}
            isSuperAdmin={isSuperAdmin}
            status={activityStatus}
          />
        );
        content = (
          <section className="gordon-activity-profile">
            <Card>
              <CardHeader
                title={activityInfo?.ActivityDescription}
                subheader={sessionDescription}
              />
              <CardContent>
                <Grid align="center" className="activity-image" item>
                  <img
                    alt={activityService.activityDescription}
                    src={activityInfo?.ActivityImagePath}
                    className="rounded-corners"
                  />
                </Grid>
                <Grid item>{editActivity}</Grid>
                <Grid item style={{ padding: '16px' }}>
                  {activityBlurb && <Typography variant="body2">{activityBlurb}</Typography>}
                  <Typography variant="subtitle1">{website}</Typography>
                </Grid>

                <hr width="70%"></hr>
                <br></br>

                {/* Activity Description */}
                <Grid container direction="column" align="left">
                  {groupContacts}
                  {advisors}
                  <Typography variant="body2">
                    <strong>Special Information for Joining: </strong>
                    {activityInfo.ActivityJoinInfo}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Current Involvement Roster: </strong>
                    {membersNum} {membersWord} and {subscribersNum} {subscribersWord}
                  </Typography>
                  {/* negative margin necessary because of default padding on Membership */}
                  {/* perhaps defaults can be changed eventually if all use cases checked */}
                  {membership}
                </Grid>
              </CardContent>
            </Card>
          </section>
        );
      }
    } else {
      if (loading === true) {
        content = <GordonLoader />;
      } else {
        let editActivity;

        const { SessionDescription: sessionDescription } = sessionInfo;
        const { ActivityDescription: activityDescription } = activityInfo;
        let description;
        if (activityInfo?.ActivityBlurb?.length !== 0) {
          description = (
            <Typography variant="body1">
              <strong>Description: </strong>
              {activityInfo?.ActivityBlurb}
            </Typography>
          );
        }
        let website;
        if (activityInfo?.ActivityURL?.length !== 0) {
          website = (
            <Typography variant="body2">
              <strong>Website: </strong>
              <a href={activityInfo?.ActivityURL}> {activityInfo?.ActivityURL}</a>
            </Typography>
          );
        }
        content = (
          <section className="gordon-activity-profile">
            <Card>
              <CardContent>
                <Typography align="center" variant="h4">
                  {activityDescription}
                </Typography>
                <Grid align="center" className="activity-image" item>
                  <img
                    alt={activityService.activityDescription}
                    src={activityInfo?.ActivityImagePath}
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
                <NoConnectionImage />
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
    <Grid container justify="center" spacing={6}>
      <Grid item xs={12} md={12} lg={8}>
        {content}
      </Grid>
    </Grid>
  );
};

ActivityProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default withRouter(ActivityProfile);
