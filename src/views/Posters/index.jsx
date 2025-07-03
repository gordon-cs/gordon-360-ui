import { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  CardMedia,
  CardActionArea,
  Dialog,
  DialogContent,
} from '@mui/material';
import UploadForm from './Forms/Forms/UploadForm';
import GordonSnackbar from 'components/Snackbar';
import { Participation } from 'services/membership';
import membershipService from 'services/membership';
import involvementService from 'services/involvements';
import sessionService from 'services/session';
import { useNavigate } from 'react-router-dom';
import { getCurrentPosters, hidePoster } from 'services/poster';
import { useLocation } from 'react-router-dom';
import CropPoster from './Forms/Forms/CropPoster';
import { AuthGroup, signOut } from 'services/auth';
import { useAuthGroups, useNetworkStatus, useUser, useWindowSize } from 'hooks';
import FileUploadedRoundIcon from '@mui/icons-material/FileUploadRounded';
import GordonLoader from 'components/Loader';
import { create } from 'lodash';

const LOADER_SIZE = 50;

const Posters = () => {
  const [openUploadForm, setOpenUploadForm] = useState(false);
  const [loadingInvolvements, setLoadingInvolvements] = useState(true);
  const { profile } = useUser();
  const [myUploadedPosterIds, setMyUploadedPosterIds] = useState(new Set());
  const [allInvolvements, setAllInvolvements] = useState([]);
  const [myInvolvements, setMyInvolvements] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [croppedImage, setCroppedImage] = useState(null);
  const location = useLocation();
  const [openCropPoster, setOpenCropPoster] = useState(false);
  const [allPosters, setAllPosters] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [posterToDelete, setPosterToDelete] = useState(null);
  const isSiteAdmin = useAuthGroups(AuthGroup.SiteAdmin);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [posterToEdit, setPosterToEdit] = useState(null);

  const [snackbar, setSnackbar] = useState({
    message: '',
    severity: '',
    open: false,
  });

  const createSnackbar = (message, severity, link, linkText) => {
    setSnackbar({
      message,
      severity,
      open: true,
      link,
      linkText,
    });
  };

  const isOnline = useNetworkStatus();
  const navigate = useNavigate();

  const isMyClub = (ClubCode, posterID) => {
    return (
      myInvolvements.some(
        (inv) =>
          inv.ActivityCode === ClubCode &&
          ['MEMBR', 'LEAD', 'ADV', 'GUEST'].includes(inv.Participation),
      ) || myUploadedPosterIds.has(posterID)
    );
  };

  const pizzaSlice = allPosters.filter((item) => isMyClub(item.ClubCode, item.ID));
  const otherPosters = allPosters.filter((item) => !isMyClub(item.ClubCode, item.ID));
  const sessionFromURL = new URLSearchParams(location.search).get('session');

  useEffect(() => {
    const loadPosters = async () => {
      const posters = await getCurrentPosters();
      setAllPosters(posters);
    };
    loadPosters();
  }, []);

  useEffect(() => {
    const loadButton = async () => {
      if (sessionFromURL) {
        setSelectedSession(sessionService.encodeSessionCode(sessionFromURL));
      } else {
        const { SessionCode: currentSessionCode } = await sessionService.getCurrent();
        const [involvements, sessions] = await Promise.all([
          involvementService.getAll(currentSessionCode),
          sessionService.getAll(),
        ]);
        if (involvements.length === 0) {
          let IndexOfCurrentSession = sessions.findIndex(
            (session) => session.SessionCode === currentSessionCode,
          );
          for (let k = IndexOfCurrentSession + 1; k < sessions.length; k++) {
            const newInvolvements = await involvementService.getAll(sessions[k].SessionCode);
            if (newInvolvements.length !== 0) {
              setSelectedSession(sessions[k].SessionCode);
              break;
            }
          }
        } else {
          setSelectedSession(currentSessionCode);
        }
      }
    };
    loadButton();
  }, [sessionFromURL]);

  useEffect(() => {
    const updateInvolvements = async () => {
      setLoadingInvolvements(true);
      setAllInvolvements(await involvementService.getAll(selectedSession));

      if (profile) {
        const memberships = await membershipService.get({
          username: profile.AD_Username,
          sessionCode: selectedSession,
          participationTypes: ['MEMBR', 'LEAD', 'ADV', 'GUEST'],
        });
        setMyInvolvements(memberships);
      }

      setLoadingInvolvements(false);
    };

    if (selectedSession) {
      updateInvolvements();
    }
  }, [selectedSession, profile]);

  const handleCropSubmit = (imageData) => {
    setCroppedImage(imageData);
  };

  const clearOnClose = () => {
    setOpenUploadForm(false);
    setCroppedImage(null);
  };

  // NEW: Delete dialog logic
  const handleDeleteClick = (poster) => {
    setPosterToDelete(poster);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (posterToDelete) {
      await hidePoster(posterToDelete.ID);
      setAllPosters((prev) => prev.filter((p) => p.ID !== posterToDelete.ID));
      setOpenDeleteDialog(false);
      setPosterToDelete(null);
      createSnackbar('Poster deleted successfully', 'success');
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setPosterToDelete(null);
  };

  const getClubName = (involvementCode) => {
    const involvement = allInvolvements.find((inv) => inv.InvolvementCode === involvementCode);
    return involvement ? involvement.Name : involvementCode;
  };

  console.log('Rendering Posters list:', allPosters);

  return (
    <Grid container justifyContent="center" spacing={4}>
      <Dialog
        maxWidth="md"
        fullWidth
        open={openEditDialog}
        onClose={() => {
          setOpenEditDialog(false);
          setPosterToEdit(null);
        }}
      >
        <Card variant="outlined">
          <CardHeader title="Edit Poster" className="gc360_header" />
          <DialogContent>
            {/* We will add the edit form here next */}
            {posterToEdit && (
              <UploadForm
                poster={posterToEdit} // Pass the poster to pre-fill the form
                createSnackbar={createSnackbar}
                onClose={() => {
                  setOpenEditDialog(false);
                  setPosterToEdit(null);
                }}
                onSubmitSuccess={(updatedPoster) => {
                  console.log('Updated poster received in Posters:', updatedPoster);
                  setAllPosters((prev) =>
                    prev.some((p) => p.ID === updatedPoster.ID)
                      ? prev.map((p) => (p.ID === updatedPoster.ID ? updatedPoster : p))
                      : [updatedPoster, ...prev],
                  );
                  setOpenEditDialog(false);
                  setPosterToEdit(null);
                }}
              />
            )}
          </DialogContent>
        </Card>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog
        maxWidth="md"
        fullWidth
        open={openUploadForm}
        onClose={() => setOpenUploadForm(false)}
      >
        <Grid bgcolor={'var(--mui-palette-neutral-light)'} container spacing={0}>
          <Grid item xs={12} md={croppedImage ? 6 : 12}>
            <Card variant="outlined">
              <CardHeader title="Upload Poster" className="gc360_header" />
              <UploadForm
                onClose={clearOnClose}
                onCropSubmit={handleCropSubmit}
                createSnackbar={createSnackbar}
                onSubmitSuccess={(createdPoster) => {
                  const normalizedPoster = {
                    ...createdPoster,
                    ClubCode: createdPoster.ACT_CDE,
                    ID: createdPoster.ID || crypto.randomUUID(),
                  };

                  setAllPosters((prev) => [normalizedPoster, ...prev]);
                  setMyUploadedPosterIds((prev) => new Set(prev).add(normalizedPoster.ID));
                  setOpenUploadForm(false);
                  setCroppedImage(null);
                }}
              />
            </Card>
          </Grid>
          <Dialog open={openCropPoster} onClose={() => setOpenCropPoster(false)}>
            <CardHeader
              title={
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={7} align="left">
                    Upload Poster
                  </Grid>
                </Grid>
              }
              className="gc360_header"
            />
            <DialogContent>
              <CropPoster
                open={openCropPoster}
                onClose={() => setOpenCropPoster(false)}
                onSubmit={handleCropSubmit}
              />
            </DialogContent>
          </Dialog>
          {croppedImage && (
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardHeader title="Preview" className="gc360_header" />

                <CardMedia
                  loading="lazy"
                  component="img"
                  alt="Cropped Image"
                  src={croppedImage}
                  title="Cropped Image"
                />
              </Card>
            </Grid>
          )}
        </Grid>
      </Dialog>

      {/* NEW: Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogContent>
          <Typography variant="h6">Are you sure you want to delete this poster?</Typography>
          <Grid container spacing={2} justifyContent="flex-end" marginTop={2}>
            <Grid item>
              <Button onClick={handleCancelDelete} color="secondary" variant="outlined">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleConfirmDelete} color="error" variant="contained">
                Delete
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <style>
        {`
    .poster-card {
      transition: transform 0.4s cubic-bezier(.4,2,.6,1), box-shadow 0.4s;
      box-shadow: none;
      z-index: 1;
      position: relative;
    }

    .poster-card:hover {
      transform: scale(1.07) translateY(-8px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
      z-index: 10;
    }

    .poster-club {
      opacity: 0;
      max-height: 0;
      transition: opacity 0.4s, max-height 0.4s;
      overflow: hidden;
    }

    .poster-card:hover .poster-club {
      transition: transform 0.7s cubic-bezier(.4,2,.6,1), opacity 0.7s;
      opacity: 1;
    }

    .delete-button-wrapper {
      text-align: center;
      margin: 0px;
      
    }

    .delete-button {
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.4s ease, transform 0.4s ease;
      pointer-events: none; /* Prevents hover flickering */
    }

    .poster-card:hover .delete-button {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  `}
      </style>

      {/* My Posters Section */}
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader
            title={
              <Grid container direction="row" alignItems="center" paddingRight={'5px'}>
                <Grid item xs={7} align="left">
                  My Upcoming Club Events
                </Grid>
                {myInvolvements.some(
                  (inv) =>
                    inv.Participation === Participation.Advisor ||
                    inv.Participation === Participation.Leader,
                ) && (
                  <Grid item xs={5} align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setOpenUploadForm(true)}
                    >
                      {/(iPhone|iPod)/i.test(navigator.userAgent) ? (
                        <FileUploadedRoundIcon />
                      ) : (
                        'Upload Poster'
                      )}
                    </Button>
                  </Grid>
                )}
              </Grid>
            }
            className="gc360_header"
          />
          <CardContent>
            {loadingInvolvements ? (
              <GordonLoader size={LOADER_SIZE} />
            ) : (
              <Grid container direction="row" spacing={4}>
                {pizzaSlice.map((item) => (
                  <Grid item xs={6} sm={4} md={3} lg={2.4} key={item.ID}>
                    <Card variant="outlined" className="poster-card">
                      {item.Priority === 1 && (
                        <Typography
                          variant="h3"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 12,
                            color: 'red',
                            fontWeight: 'bold',
                            fontSize: '3rem',
                            zIndex: 3,
                            userSelect: 'none',
                            fontFamily: '"Orbitron", "Montserrat", "Roboto", sans-serif',
                            textShadow: '2px 2px 8px #00000055',
                          }}
                        >
                          !
                        </Typography>
                      )}
                      <CardActionArea
                        onClick={() => {
                          if (isOnline) {
                            const currentSessionCode =
                              sessionService.encodeSessionCode(selectedSession);
                            navigate(`/activity/${currentSessionCode}/${item.ClubCode}`);
                          }
                        }}
                      >
                        <CardMedia
                          loading="lazy"
                          component="img"
                          alt={item.Alt}
                          src={item.ImagePath}
                          title={item.Title}
                        />
                        <CardContent>
                          <Typography className={'Poster Title'}>{item.Title}</Typography>
                        </CardContent>
                      </CardActionArea>
                      {myInvolvements.some(
                        (inv) =>
                          (inv.ActivityCode === item.ClubCode &&
                            (inv.Participation === Participation.Advisor ||
                              inv.Participation === Participation.Leader)) ||
                          isSiteAdmin,
                      ) && (
                        <div className="delete-button-wrapper">
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setPosterToEdit(item);
                              setOpenEditDialog(true);
                            }}
                            className="delete-button"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteClick(item)}
                            className="delete-button"
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Other Posters Section */}
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader title="Other Posters" className="gc360_header" />
          <CardContent>
            {loadingInvolvements ? (
              <GordonLoader size={LOADER_SIZE} />
            ) : (
              <Grid container direction="row" spacing={4}>
                {otherPosters.map((item) => (
                  <Grid item xs={6} sm={4} md={3} lg={2.4} key={item.ID}>
                    <Card variant="outlined" className="poster-card">
                      {item.Priority === 1 && (
                        <Typography
                          variant="h3"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 12,
                            color: 'red',
                            fontWeight: 'bold',
                            fontSize: '3rem',
                            zIndex: 3,
                            userSelect: 'none',
                            fontFamily: '"Orbitron", "Montserrat", "Roboto", sans-serif',
                            textShadow: '2px 2px 8px #00000055',
                          }}
                        >
                          !
                        </Typography>
                      )}
                      <CardActionArea
                        onClick={() => {
                          if (isOnline) {
                            const currentSessionCode =
                              sessionService.encodeSessionCode(selectedSession);
                            navigate(`/activity/${currentSessionCode}/${item.ClubCode}`);
                          }
                        }}
                      >
                        <CardMedia
                          loading="lazy"
                          component="img"
                          alt={item.alt}
                          src={item.ImagePath}
                          title={item.Title}
                        />
                        <CardContent>
                          <Typography className={'Poster Title'}>{item.Title}</Typography>
                          <Typography variant="body2" color="textSecondary" className="poster-club">
                            {getClubName(item.ClubCode)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      {myInvolvements.some((inv) => isSiteAdmin) && (
                        <div className="delete-button-wrapper">
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteClick(item)}
                            className="delete-button"
                          >
                            Delete&nbsp;Poster
                          </Button>
                        </div>
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Grid>
      <GordonSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        link={snackbar.link}
        linkText={snackbar.linkText}
      />
    </Grid>
  );
};

export default Posters;
