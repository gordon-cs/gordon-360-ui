import {
  Button,
  Card,
  CardContent,
  CardHeader,
  DialogContentText,
  Grid,
  List,
  TextField,
  Typography,
} from '@material-ui/core';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonLoader from 'components/Loader';
import useNetworkStatus from 'hooks/useNetworkStatus';
import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import Dropzone from 'react-dropzone';
import { useParams } from 'react-router';
import involvementService from 'services/activity';
import emailsService from 'services/emails';
import membershipService from 'services/membership';
import sessionService from 'services/session';
import userService from 'services/user';
import { gordonColors } from 'theme';
import ContactListItem from './components/ContactListItem';
import Membership from './components/Membership';
import styles from './InvolvementProfile.module.css';
import GordonOffline from 'components/GordonOffline';

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
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
        const [involvementInfo, advisors, groupAdmins, sessionInfo, college_role, isAdmin] =
          await Promise.all([
            involvementService.get(involvementCode),
            involvementService.getAdvisors(involvementCode, sessionCode),
            involvementService.getGroupAdmins(involvementCode, sessionCode),
            sessionService.get(sessionCode),
            userService.getLocalInfo().college_role,
            membershipService.checkAdmin(
              userService.getLocalInfo().id,
              sessionCode,
              involvementCode,
            ),
          ]);

        const isSuperAdmin = college_role === 'god';

        setInvolvementInfo(involvementInfo);
        setAdvisors(advisors);
        setGroupAdmins(groupAdmins);
        setSessionInfo(sessionInfo);
        setIsAdmin(isAdmin);
        setIsSuperAdmin(isSuperAdmin);
        setTempBlurb(involvementInfo.ActivityBlurb);
        setTempJoinInfo(involvementInfo.ActivityJoinInfo);
        setTempURL(involvementInfo.ActivityURL);

        if (isAdmin || isSuperAdmin) {
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
    setInvolvementInfo((i) => ({
      ...i,
      ActivityBlurb: tempBlurb,
      ActivityURL: tempURL,
      ActivityJoinInfo: tempJoinInfo,
    }));

    if (photoUpdated === true) {
      await involvementService.setActivityImage(involvementInfo.ActivityCode, image);
      setInvolvementInfo((i) => ({ ...i, ActivityImagePath: image }));
    }
    setIsEditDialogOpen(false);
  };

  const onRemoveImage = async () => {
    await involvementService.resetImage(involvementInfo.ActivityCode);
    setInvolvementInfo(await involvementService.get(involvementCode));
    setIsRemoveImageDialogOpen(false);
  };

  const handleCloseCancel = () => {
    setPhotoOpen(false);
    setPreview(null);
    setPhotoUpdated(false);
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

      const editInvolvement =
        isAdmin || isSuperAdmin ? (
          <Grid item>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEditDialogOpen(true)}
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

            <GordonDialogBox
              open={isEditDialogOpen}
              title={`Edit ${ActivityDescription}`}
              buttonName="Submit"
              buttonClicked={onEditInvolvement}
              cancelButtonClicked={() => setIsEditDialogOpen(false)}
            >
              <Grid align="center" className={styles.involvement_image} item>
                <img
                  alt={ActivityDescription}
                  src={image || ActivityImagePath}
                  className={styles.rounded_corners}
                />
              </Grid>
              <Grid container spacing={2} justifyContent="center">
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
                  <Button variant="contained" onClick={() => setPhotoOpen(true)} color="primary">
                    Change Image
                  </Button>
                </Grid>
              </Grid>

              <GordonDialogBox
                open={photoOpen}
                title="Update Involvement Picture"
                buttonName="Select"
                buttonClicked={handleCloseSelect}
                isButtonDisabled={!preview}
                cancelButtonClicked={handleCloseCancel}
              >
                <DialogContentText id="edit-involvement-image-dialog-description">
                  {window.innerWidth < 600
                    ? 'Tap Image to Browse Files'
                    : 'Drag & Drop Picture, or Click to Browse Files'}
                </DialogContentText>
                <Grid container justifyContent="center" spacing={2}>
                  {!preview && (
                    <Dropzone
                      onDropAccepted={onDropAccepted.bind(this)}
                      onDropRejected={onDropRejected.bind(this)}
                      accept="image/jpeg, image/jpg, image/png"
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div className={styles.photoUploader} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img
                              className={styles.rounded_corners}
                              src={ActivityImagePath}
                              alt=""
                              style={{ maxWidth: '320px', maxHeight: '320px' }}
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
                            maxWidth: maxCropPreviewWidth(),
                            maxHeight: maxCropPreviewWidth() / cropperData.aspectRatio,
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
              </GordonDialogBox>

              <GordonDialogBox
                open={isRemoveImageDialogOpen}
                title="Confirm Removing Image"
                buttonClicked={onRemoveImage}
                cancelButtonClicked={() => setIsRemoveImageDialogOpen(false)}
              >
                Are you sure you want to remove the involvement image?
              </GordonDialogBox>
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
            </GordonDialogBox>
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
                  className={styles.rounded_corners}
                />
              </Grid>
              {editInvolvement}
              <Grid item align="center">
                {ActivityBlurb && <Typography>{ActivityBlurb}</Typography>}
                {ActivityURL?.length !== 0 && (
                  <Typography>
                    <a
                      href={ActivityURL}
                      className="gc360_text_link"
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
                    <Typography>
                      <strong>Group Contacts</strong>
                    </Typography>
                    <List>
                      {groupAdmins.map((admin, index) => (
                        <ContactListItem key={index} contact={admin} />
                      ))}
                    </List>
                  </Grid>
                  <Grid item>
                    <Typography>
                      <strong>Group Advisors</strong>
                    </Typography>
                    <List>
                      {advisors.map((advisor, index) => (
                        <ContactListItem key={index} contact={advisor} />
                      ))}
                    </List>
                  </Grid>
                  <Grid item>
                    <Typography>
                      <strong>To join: </strong>
                      {ActivityJoinInfo}
                    </Typography>
                  </Grid>
                  <Membership
                    involvementDescription={ActivityDescription}
                    isAdmin={isAdmin}
                    isSuperAdmin={isSuperAdmin}
                    toggleIsAdmin={() => setIsAdmin((a) => !a)}
                  />
                </>
              )}
            </Grid>
          </CardContent>
        </Card>
      );
    }
  } else {
    return <GordonOffline feature="This involvement" />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={8}>
        {content}
      </Grid>
    </Grid>
  );
};

export default InvolvementProfile;
