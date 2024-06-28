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
import involvementService from 'services/activity';
import sessionService from 'services/session';
import DATA from './dummy-posters/dummyposters';
import { useLocation } from 'react-router-dom';

const Posters = () => {
  const [openUploadForm, setOpenUploadForm] = useState(false);
  const { profile } = useUser();
  const [allInvolvements, setAllInvolvements] = useState([]);
  const [myInvolvements, setMyInvolvements] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [croppedImage, setCroppedImage] = useState(null);
  const location = useLocation();

  const pizzaSlice = DATA.slice(0, 2);
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
            participationTypes: Participation.GroupAdmin,
          }),
        );
      }
    };

    if (selectedSession) {
      updateInvolvements();
    }
  }, [selectedSession, profile]);

  useEffect(() => {}, [allInvolvements]);

  const handleCropSubmit = (imageData) => {
    setCroppedImage(imageData);
  };

  return (
    <Grid container justifyContent="center" spacing={4}>
      <Dialog
        maxWidth="md"
        fullWidth
        open={openUploadForm}
        onClose={() => setOpenUploadForm(false)}
      >
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={croppedImage ? 6 : 12}>
              <Card variant="outlined">
                <CardHeader title="Upload Poster" className="gc360_header" />
                <CardContent>
                  <UploadForm
                    onClose={() => setOpenUploadForm(false)}
                    onCropSubmit={handleCropSubmit}
                  />
                </CardContent>
              </Card>
            </Grid>

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
        </DialogContent>
      </Dialog>

      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader
            title={
              <Grid container direction="row" alignItems="center">
                <Grid item xs={7} align="left">
                  My Upcoming Club Events
                </Grid>
                {myInvolvements.length > 0 && (
                  <Grid item xs={5} align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setOpenUploadForm(true)}
                    >
                      Upload Poster
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
                <Grid item xs={6} sm={4} md={3} lg={3} key={item.key}>
                  <Card variant="outlined">
                    <CardActionArea component="div">
                      <CardMedia
                        loading="lazy"
                        component="img"
                        alt={item.alt}
                        src={item.image}
                        title={item.title}
                      />
                      <CardContent>
                        <Typography className={'Poster Title'}>{item.title}</Typography>
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
          <CardHeader title="All Posters" className="gc360_header" />
          <CardContent>
            <Grid container direction="row" spacing={4}>
              {DATA.map((item) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={item.key}>
                  <Card variant="outlined">
                    <CardActionArea component="div">
                      <CardMedia
                        loading="lazy"
                        component="img"
                        alt={item.alt}
                        src={item.image}
                        title={item.title}
                      />
                      <CardContent>
                        <Typography className={'Poster Title'}>{item.title}</Typography>
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
