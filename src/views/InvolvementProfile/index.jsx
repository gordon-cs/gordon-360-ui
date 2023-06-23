import {
  Button,
  Card,
  CardContent,
  CardHeader,
  DialogContentText,
  Grid,
  Link,
  List,
  TextField,
  Typography,
} from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonOffline from 'components/GordonOffline';
import GordonLoader from 'components/Loader';
import { useAuthGroups, useNetworkStatus, useUser } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import Dropzone from 'react-dropzone';
import { useParams } from 'react-router';
import involvementService from 'services/activity';
import { AuthGroup } from 'services/auth';
import emailsService from 'services/emails';
import membershipService from 'services/membership';
import sessionService from 'services/session';
import ContactListItem from './components/ContactListItem';
import Membership from './components/Membership';
import styles from './InvolvementProfile.module.css';

const CROP_DIM = 320; // pixels

const InvolvementProfile = () => {
  const [involvementInfo, setInvolvementInfo] = useState(null);
  const [contacts, setContacts] = useState([]);
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
  const isSiteAdmin = useAuthGroups(AuthGroup.SiteAdmin);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRemoveImageDialogOpen, setIsRemoveImageDialogOpen] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [cropperData, setCropperData] = useState({});
  const isOnline = useNetworkStatus();
  const cropperRef = useRef();
  const { sessionCode, involvementCode } = useParams();
  const { profile, loading: loadingProfile } = useUser();

  useEffect(() => {
    const loadPage = async () => {
      if (profile) {
        const [involvementInfo, contacts, sessionInfo, isAdmin] = await Promise.all([
          involvementService.get(involvementCode),
          involvementService.getContacts(involvementCode, sessionCode),
          sessionService.get(sessionCode),
          membershipService.checkAdmin(profile.AD_Username, sessionCode, involvementCode),
        ]);

        setInvolvementInfo(involvementInfo);
        setContacts(contacts);
        setSessionInfo(sessionInfo);
        setIsAdmin(isAdmin);
        setTempBlurb(involvementInfo.ActivityBlurb);
        setTempJoinInfo(involvementInfo.ActivityJoinInfo);
        setTempURL(involvementInfo.ActivityURL);

        if (isAdmin || isSiteAdmin) {
          setEmailList(await emailsService.getPerActivity(involvementCode, { sessionCode }));
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
  }, [involvementCode, isSiteAdmin, sessionCode, profile]);

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
    const breakpointWidth = 900;
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
    const data = {
      Description: tempBlurb,
      JoinInfo: tempJoinInfo,
      Url: tempURL,
    };
    await involvementService.editActivity(involvementInfo.ActivityCode, data);
    setInvolvementInfo((i) => ({
      ...i,
      ActivityBlurb: tempBlurb,
      ActivityURL: tempURL,
      ActivityJoinInfo: tempJoinInfo,
    }));

    if (photoUpdated === true) {
      const { ActivityImagePath: newImagePath } = await involvementService.setActivityImage(
        involvementInfo.ActivityCode,
        image,
      );
      setInvolvementInfo((i) => ({ ...i, ActivityImagePath: newImagePath }));
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

  if (!isOnline) {
    return <GordonOffline feature="This involvement" />;
  }

  let content;
  if (loading) {
    content = <GordonLoader />;
  } else {
    const { SessionDescription } = sessionInfo;
    const { ActivityBlurb, ActivityDescription, ActivityURL, ActivityImagePath, ActivityJoinInfo } =
      involvementInfo;

    const editInvolvement = loadingProfile ? (
      <GordonLoader />
    ) : isAdmin || isSiteAdmin ? (
      <Grid item>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => setIsEditDialogOpen(true)}>
              Edit Involvement
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href={`mailto:${parseEmailsFromList(emailList)}`}
            >
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
              className="rounded_corners"
            />
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                onClick={() => setIsRemoveImageDialogOpen(true)}
                className={styles._removeImage}
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
            {!preview && (
              <>
                <DialogContentText
                  id="edit-involvement-image-dialog-description"
                  className={styles._dialogContentText}
                >
                  {window.innerWidth < 600
                    ? 'Tap Image to Browse Files'
                    : 'Drag & Drop Picture, or Click to Browse Files'}
                </DialogContentText>
                <Dropzone
                  onDropAccepted={onDropAccepted.bind(this)}
                  onDropRejected={onDropRejected.bind(this)}
                  accept={{
                    'image/*': ['.jpeg', ',jpg', '.png'],
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div className={styles.photoUploader} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <img
                          className={'rounded_corners' + styles._imageDrop}
                          src={ActivityImagePath}
                          alt=""
                        />
                      </div>
                    </section>
                  )}
                </Dropzone>
              </>
            )}
            {preview && (
              <Grid
                container
                justifyContent="center"
                spacing={2}
                className={styles.update_image_components}
              >
                <Grid item>
                  <Cropper
                    ref={cropperRef}
                    src={preview}
                    className={styles._cropper / cropperData.aspectRatio}
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
              </Grid>
            )}
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
                  size="small"
                  multiline
                  fullWidth
                  defaultValue={ActivityBlurb}
                  onChange={(event) => setTempBlurb(event.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Special Information for Joining"
                  size="small"
                  multiline
                  fullWidth
                  defaultValue={ActivityJoinInfo}
                  onChange={(event) => setTempJoinInfo(event.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Website"
                  size="small"
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
              <img alt={ActivityDescription} src={ActivityImagePath} className="rounded_corners" />
            </Grid>
            {editInvolvement}
            <Grid item align="center">
              {ActivityBlurb && <Typography>{ActivityBlurb}</Typography>}
              {ActivityURL?.length !== 0 && (
                <Typography>
                  <a href={ActivityURL} className={'gc360_text_link' + styles._activityURL}>
                    {ActivityURL}
                  </a>
                </Typography>
              )}
            </Grid>

            {loadingProfile ? (
              <GordonLoader />
            ) : profile ? (
              <>
                <hr width="70%"></hr>

                <Grid item>
                  <Typography>
                    <strong>Group Contacts</strong>
                  </Typography>
                  <List>
                    {contacts.map((contact, index) => (
                      <ContactListItem key={index} contact={contact} />
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
                  isSiteAdmin={isSiteAdmin}
                  toggleIsAdmin={() => setIsAdmin((a) => !a)}
                />
              </>
            ) : null}
          </Grid>
        </CardContent>
      </Card>
    );
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
