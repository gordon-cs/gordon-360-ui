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
import { Participation } from 'services/membership';
import membershipService from 'services/membership';
import { useUser } from 'hooks';
import involvementService from 'services/involvements';
import sessionService from 'services/session';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useNavigate } from 'react-router-dom';
import { getCurrentPosters } from 'services/poster';
import DATA from './dummy-posters/dummyposters';
import { useLocation } from 'react-router-dom';
import CropPoster from './Forms/Forms/CropPoster';

const Posters = () => {
  const [openUploadForm, setOpenUploadForm] = useState(false);
  const { profile } = useUser();
  const [allInvolvements, setAllInvolvements] = useState([]);
  const [myInvolvements, setMyInvolvements] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [croppedImage, setCroppedImage] = useState(null);
  const location = useLocation();
  const [openCropPoster, setOpenCropPoster] = useState(false);

  const [allPosters, setAllPosters] = useState([]);
  const isMyClub = (org) =>
    myInvolvements.some(
      (inv) =>
        inv.ActivityCode === org && ['MEMBR', 'LEAD', 'ADV', 'GUEST'].includes(inv.Participation),
    );

  const pizzaSlice = DATA.filter((item) => isMyClub(item.org));
  const otherPosters = DATA.filter((item) => !pizzaSlice.includes(item));

  const sessionFromURL = new URLSearchParams(location.search).get('session');

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
      setAllInvolvements(await involvementService.getAll(selectedSession));
      if (profile) {
        setMyInvolvements(
          await membershipService.get({
            username: profile.AD_Username,
            sessionCode: selectedSession,
            participationTypes: ['MEMBR', 'LEAD', 'ADV', 'GUEST'],
          }),
        );
      }
    };

    if (selectedSession) {
      updateInvolvements();
    }
  }, [selectedSession, profile]);

  useEffect(() => {
    console.log('myInvolvements:', myInvolvements);
  }, [myInvolvements]);

  useEffect(() => {}, [allInvolvements]);

  const handleCropSubmit = (imageData) => {
    setCroppedImage(imageData);
  };
  const clearOnClose = (e) => {
    setOpenUploadForm(false);
    setCroppedImage(null);
  };

  const isOnline = useNetworkStatus();
  const navigate = useNavigate();
  // Helper to get club name from involvement code
  const getClubName = (involvementCode) => {
    const involvement = allInvolvements.find((inv) => inv.InvolvementCode === involvementCode);
    return involvement ? involvement.Name : involvementCode;
  };

  return (
    <Grid container justifyContent="center" spacing={4}>
      <Dialog
        maxWidth="md"
        fullWidth
        open={openUploadForm}
        onClose={() => setOpenUploadForm(false)}
      >
        <Grid bgcolor={'var(--mui-palette-neutral-light)'} container spacing={4}>
          <Grid item xs={12} md={croppedImage ? 6 : 12}>
            <Card variant="outlined">
              <CardHeader title="Upload Poster" className="gc360_header" />
              <UploadForm onClose={clearOnClose} onCropSubmit={handleCropSubmit} />
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
                <CardActionArea>
                  <CardMedia
                    onClick={() => setOpenCropPoster(true)}
                    loading="lazy"
                    component="img"
                    alt="Cropped Image"
                    src={croppedImage}
                    title="Cropped Image"
                  />
                </CardActionArea>
              </Card>
            </Grid>
          )}
        </Grid>
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
        `}
      </style>

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
                      Upload{'\u00A0'}Poster
                    </Button>
                  </Grid>
                )}
              </Grid>
            }
            className="gc360_header"
          />
          <CardContent>
            <Grid container direction="row" spacing={4} className={'test1'}>
              {pizzaSlice.map((item) => (
                <Grid item xs={6} sm={4} md={3} lg={2.4} key={item.key}>
                  <Card variant="outlined" className="poster-card">
                    <CardActionArea
                      onClick={() => {
                        if (isOnline) {
                          const currentSessionCode =
                            sessionService.encodeSessionCode(selectedSession);
                          navigate(`/activity/${currentSessionCode}/${item.org}`);
                        }
                      }}
                    >
                      <CardMedia
                        loading="lazy"
                        component="img"
                        alt={item.alt}
                        src={item.image}
                        title={item.title}
                      />
                      <CardContent>
                        <Typography className={'Poster Title'}>{item.title}</Typography>
                        <Typography variant="body2" color="textSecondary" className="poster-club">
                          {getClubName(item.org)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader title="Other Posters" className="gc360_header" />
          <CardContent>
            <Grid container direction="row" spacing={4}>
              {otherPosters.map((item) => (
                <Grid item xs={6} sm={4} md={3} lg={2.4} key={item.key}>
                  <Card variant="outlined" className="poster-card">
                    <CardActionArea
                      onClick={() => {
                        if (isOnline) {
                          const currentSessionCode =
                            sessionService.encodeSessionCode(selectedSession);
                          navigate(`/activity/${currentSessionCode}/${item.org}`);
                        }
                      }}
                    >
                      <CardMedia
                        loading="lazy"
                        component="img"
                        alt={item.alt}
                        src={item.image}
                        title={item.title}
                      />
                      <CardContent>
                        <Typography className={'Poster Title'}>{item.title}</Typography>
                        <Typography variant="body2" color="textSecondary" className="poster-club">
                          {getClubName(item.org)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Posters;
