import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import './involvement-profile.css';
import Cropper from 'react-cropper';
import Advisors from './components/Advisors';
import GroupContacts from './components/GroupContacts';
import GordonLoader from 'components/Loader';
import Membership from './components/Membership';
import membershipService from 'services/membership';
import emailsService from 'services/emails';
import sessionService from 'services/session';
import involvementService from 'services/activity';
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
import { useParams } from 'react-router';

const CROP_DIM = 320; // pixels

const InvolvementProfile = ({ authentication }) => {
  const [involvementInfo, setInvolvementInfo] = useState(null);
  const [advisors, setAdvisors] = useState([]);
  const [groupAdmins, setGroupAdmins] = useState([]);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [photoUpdated, setPhotoUpdated] = useState(false);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tempBlurb, setTempBlurb] = useState('');
  const [tempJoinInfo, setTempJoinInfo] = useState('');
  const [tempURL, setTempURL] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Boolean for current user
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRemoveImageDialogOpen, setIsRemoveImageDialogOpen] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [cropperData, setCropperData] = useState({});
  const isOnline = useNetworkStatus();
  const cropperRef = useRef();
  const { sessionCode, involvementCode } = useParams();

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      if (authentication) {
        const [
          involvementInfo,
          advisors,
          groupAdmins,
          sessionInfo,
          college_role, // for testing purposes only, remove before push
          isAdmin,
        ] = await Promise.all([
          involvementService.get(involvementCode),
          involvementService.getAdvisors(involvementCode, sessionCode),
          involvementService.getGroupAdmins(involvementCode, sessionCode),
          sessionService.get(sessionCode),
          userService.getLocalInfo().college_role,
          membershipService.checkAdmin(userService.getLocalInfo().id, sessionCode, involvementCode),
        ]);

        setInvolvementInfo(involvementInfo);
        setAdvisors(advisors);
        setGroupAdmins(groupAdmins);
        setSessionInfo(sessionInfo);
        setIsAdmin(isAdmin || college_role === 'god');
        setTempBlurb(involvementInfo.ActivityBlurb);
        setTempJoinInfo(involvementInfo.ActivityJoinInfo);
        setTempURL(involvementInfo.ActivityURL);

        if (isAdmin) {
          setEmailList(await emailsService.get(involvementCode));
        }

        setLoading(false);
      } else {
        const [involvementInfo, sessionInfo] = await Promise.all([
          involvementService.get(involvementCode),
          sessionService.get(sessionCode),
        ]);
        setInvolvementInfo(involvementInfo);
        setSessionInfo(sessionInfo);
        setLoading(false);
      }
    };
    loadPage();
  }, [involvementCode, authentication, sessionCode]);

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

  const onEditInvolvement = async () => {
    let data = {
      ACT_CDE: involvementInfo.ActivityCode,
      ACT_URL: tempURL,
      ACT_BLURB: tempBlurb,
      ACT_JOIN_INFO: tempJoinInfo,
    };
    await involvementService.editActivity(involvementInfo.ActivityCode, data);

    if (photoUpdated === true) {
      await involvementService.setActivityImage(involvementInfo.ActivityCode, image);
    }
    setIsEditDialogOpen(false);
    refresh();
  };

  // Called when confirm remove image from the alert remove image dialog box
  const onRemoveImage = async () => {
    await involvementService.resetImage(involvementInfo.ActivityCode);
    setIsRemoveImageDialogOpen(false);
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
      'mailto:' + parseEmailsFromList(groupAdmins) + '?bcc=' + parseEmailsFromList(emailList);
  };

  let content;

  if (isOnline) {
    if (loading) {
      content = <GordonLoader />;
    } else {
      const { SessionDescription } = sessionInfo;
      const {
        ActivityBlurb,
        ActivityDescription,
        ActivityURL,
        ActivityImagePath,
        ActivityJoinInfo,
      } = involvementInfo;

      const redButton = {
        background: gordonColors.secondary.red,
        color: 'white',
      };

      const editInvolvement = isAdmin ? (
        <Grid item>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => setIsEditDialogOpen(true)}>
                Edit Involvement
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={sendEmail}>
                Email Members/Subscribers
              </Button>
            </Grid>
          </Grid>

          <Dialog open={isEditDialogOpen} fullWidth aria-labelledby="edit-involvement-dialog-title">
            <DialogTitle id="edit-involvement-dialog-title">
              {' '}
              Edit {ActivityDescription}
            </DialogTitle>
            <DialogContent>
              <Grid align="center" className="involvement-image" item>
                <img
                  alt={ActivityDescription}
                  src={image || ActivityImagePath}
                  className="rounded-corners"
                />
              </Grid>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => setIsRemoveImageDialogOpen(true)}
                    style={redButton}
                  >
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
                aria-labelledby="edit-involvement-image-dialog-title"
                aria-describedby="edit-involvement-image-dialog-description"
                fullWidth
              >
                <DialogTitle id="edit-involvement-image-dialog-title">
                  Update Involvement Picture
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="edit-involvement-image-dialog-description">
                    {window.innerWidth < 600
                      ? 'Tap Image to Browse Files'
                      : 'Drag & Drop Picture, or Click to Browse Files'}
                  </DialogContentText>
                  <Grid container justify="center" spacing={2}>
                    {!preview && (
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
                                src={ActivityImagePath}
                                alt=""
                                style={{ 'max-width': '320px', 'max-height': '320px' }}
                              />
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    )}
                    {preview && (
                      <>
                        <Grid item>
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

                        <Grid item>
                          <Button variant="contained" onClick={() => setPreview(null)}>
                            Choose Another Image
                          </Button>
                        </Grid>
                      </>
                    )}
                  </Grid>
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

              <Dialog open={isRemoveImageDialogOpen} keepMounted align="center">
                <DialogTitle>Are you sure you want to remove image?</DialogTitle>
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <Button variant="contained" color="primary" onClick={onRemoveImage} raised>
                        OK
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <Button
                        variant="contained"
                        onClick={() => setIsRemoveImageDialogOpen(false)}
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
                      defaultValue={ActivityBlurb}
                      onChange={(event) => setTempBlurb(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Special Information for Joining"
                      margin="dense"
                      multiline
                      fullWidth
                      defaultValue={ActivityJoinInfo}
                      onChange={(event) => setTempJoinInfo(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Website"
                      margin="dense"
                      multiline
                      fullWidth
                      defaultValue={ActivityURL}
                      onChange={(event) => setTempURL(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>

            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={onEditInvolvement}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      ) : null;

      content = (
        <Card>
          <CardHeader align="center" title={ActivityDescription} subheader={SessionDescription} />
          <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid align="center" item>
                <img
                  alt={ActivityDescription}
                  src={ActivityImagePath}
                  className="rounded-corners"
                />
              </Grid>
              {editInvolvement}
              <Grid item align="center">
                {ActivityBlurb && <Typography>{ActivityBlurb}</Typography>}
                {ActivityURL?.length !== 0 && (
                  <Typography>
                    <a
                      href={ActivityURL}
                      className="gc360-text-link"
                      style={{ fontWeight: 'bold' }}
                    >
                      {ActivityURL}
                    </a>
                  </Typography>
                )}
              </Grid>

              {authentication && (
                <>
                  <hr width="70%"></hr>

                  <Grid item>
                    <GroupContacts groupAdmins={groupAdmins} />
                  </Grid>
                  <Grid item>
                    <Advisors advisors={advisors} />
                  </Grid>
                  <Grid item>
                    <Typography>
                      <strong>Special Information for Joining: </strong>
                      {ActivityJoinInfo}
                    </Typography>
                  </Grid>
                  <Membership involvementDescription={ActivityDescription} isAdmin={isAdmin} />
                </>
              )}
            </Grid>
          </CardContent>
        </Card>
      );
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
    <Grid container justify="center">
      <Grid item xs={12} lg={8}>
        {content}
      </Grid>
    </Grid>
  );
};

InvolvementProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default InvolvementProfile;
