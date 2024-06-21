import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  CardMedia,
  TextField,
  CardActionArea,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostersGrid from 'views/Posters/components/PostersGrid';
import GordonLoader from 'components/Loader';
import TestPoster from 'views/Posters/images/TestPoster.jpg';
import DATA from 'views/Posters/dummy-posters/dummyposters.jsx';
import membershipService, { Participation } from 'services/membership';
import InvolvemetnsAll from 'views/InvolvementsAll/index.jsx';
import PosterAdminCard from 'views/Posters/components/PosterAdminCard/index.jsx';
import { AuthGroup } from 'services/auth';
import sessionService from 'services/session';
import { useAuthGroups, useNetworkStatus, useUser } from 'hooks';
import { useLocation, useNavigate } from 'react-router-dom';

const Posters = () => {
  // const [shouldShowAdmin, setShouldShowAdmin] = useState(true);
  // const isSiteAdmin = useAuthGroups(AuthGroup.SiteAdmin);
  const pizzaSlice = DATA.slice(0, 2);
  // let content;
  // if (shouldShowAdmin) {
  //   content = (
  //     <>
  //       {(shouldShowAdmin) && (
  //         <PosterAdminCard/>
  //       )}
  //       </>
  //     );
  //   } else{
  //     content =(null);
  //   }
  // const { profile, loading: loadingProfile } = useUser();
  const [currentAcademicSession, setCurrentAcademicSession] = useState('');
  const [involvements, setInvolvements] = useState([]);
  const [allInvolvements, setAllInvolvements] = useState([]);
  const [myInvolvements, setMyInvolvements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [sessions, setSessions] = useState([]);
  const [type, setType] = useState('');
  const [types, setTypes] = useState([]);
  const { profile, loading: loadingProfile } = useUser();
  const isOnline = useNetworkStatus();
  const navigate = useNavigate();
  const location = useLocation();

  //const sessionFromURL = new URLSearchParams(location.search).get('session');

  // useEffect(() => {
  //   const loadPage = async () => {
  //     setSessions(await sessionService.getAll());

  //     if (sessionFromURL) {
  //       setSelectedSession(sessionService.encodeSessionCode(sessionFromURL));
  //     } else {
  //       const { SessionCode: currentSessionCode } = await sessionService.getCurrent();
  //       setCurrentAcademicSession(currentSessionCode);

  //       const [involvements, sessions] = await Promise.all([
  //         involvementService.getAll(currentSessionCode),
  //         sessionService.getAll(),
  //       ]);
  //       if (involvements.length === 0) {
  //         let IndexOfCurrentSession = sessions.findIndex(
  //           (session) => session.SessionCode === currentSessionCode,
  //         );

  //         for (let k = IndexOfCurrentSession + 1; k < sessions.length; k++) {
  //           const newInvolvements = await involvementService.getAll(sessions[k].SessionCode);
  //           if (newInvolvements.length !== 0) {
  //             setSelectedSession(sessions[k].SessionCode);

  //             break;
  //           }
  //         }
  //       } else {
  //         setSelectedSession(currentSessionCode);
  //       }
  //     }
  //   };
  //   loadPage();
  // }, [sessionFromURL]);

  // const handleSelectSession = async (value) => {
  //   setSelectedSession(value);
  //   value = sessionService.decodeSessionCode(value);
  //   navigate(`?session=${value}`);
  // };

  // useEffect(() => {
  //   const updateInvolvements = async () => {
  //     setLoading(true);
  //     setAllInvolvements(await involvementService.getAll(selectedSession));
  //     setTypes(await involvementService.getTypes(selectedSession));
  //     if (profile) {
  //       setMyInvolvements(
  //         await membershipService.get({
  //           username: profile.AD_Username,
  //           sessionCode: selectedSession,
  //           participationTypes: NonGuestParticipations,
  //         }),
  //       );
  //     }
  //     setLoading(false);
  //   };

  //   if (selectedSession) {
  //     updateInvolvements();
  //   }
  // }, [selectedSession, profile]);

  return (
    <Grid container justifyContent="center" spacing={4}>
      {/*true ? content : null*/}

      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader
            title={
              <Grid container direction="row" alignItems="center">
                <Grid item xs={7} align="left">
                  My Upcoming Club Events
                </Grid>
                <Grid item xs={5} align="right">
                  <Button variant="contained" color="secondary" component={Link} to="/involvements">
                    My Involvements
                  </Button>
                </Grid>
              </Grid>
            }
            className="gc360_header"
          />
          <CardContent>
            <Grid container direction="row" spacing={4} className={'test1'}>
              {pizzaSlice.map((item) => {
                return (
                  <Grid item xs={6} sm={4} md={3} lg={3} key={item.key}>
                    <Card variant="outlined">
                      <CardActionArea component={Link} to="/Page404">
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
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* <Grid item xs={12} lg={8}> 
      <Card>
        <CardHeader title={"Search Campus Events"} className="gc360_header" />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <TextField
                  id="search"
                  variant="filled"
                  label="Search Upcoming Events"
                  type="search"
                  //value={search}
                  //onChange={(event) => setSearch(event.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
    </Grid> */}

      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader
            title={
              <Grid container direction="row" alignItems="center">
                <Grid item xs={7} align="left">
                  Upcoming Public Events
                </Grid>
                <Grid item xs={5} align="right">
                  <Button variant="contained" color="secondary" component={Link} to="/Events">
                    Campus Events
                  </Button>
                </Grid>
              </Grid>
            }
            className="gc360_header"
          />
          <CardContent>
            <PostersGrid
              posters={DATA}
              sessionCode={'0'}
              noPostersText="There aren't any involvements for the selected session and type"
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Posters;
