import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tab,
} from '@mui/material';
import GordonLoader from 'components/Loader';
import { useNetworkStatus, useUser } from 'hooks';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import involvementService from 'services/involvements';
import membershipService, { NonGuestParticipations } from 'services/membership';
import sessionService from 'services/session';
import InvolvementsGrid from './components/InvolvementsGrid';
import Requests from './components/Requests';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import styles from './Involvements.module.css';

const InvolvementsAll = () => {
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
  const [tabIndex, setTabIndex] = useState('1');

  const sessionFromURL = new URLSearchParams(location.search).get('session');

  useEffect(() => {
    const loadPage = async () => {
      setSessions(await sessionService.getAll());

      if (sessionFromURL) {
        setSelectedSession(sessionService.encodeSessionCode(sessionFromURL));
      } else {
        const { SessionCode: currentSessionCode } = await sessionService.getCurrent();
        setCurrentAcademicSession(currentSessionCode);

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
    loadPage();
  }, [sessionFromURL]);

  const handleSelectSession = async (value) => {
    setSelectedSession(value);
    value = sessionService.decodeSessionCode(value);
    navigate(`?session=${value}`);
  };

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    const updateInvolvements = async () => {
      setLoading(true);
      setAllInvolvements(await involvementService.getAll(selectedSession));
      setTypes(await involvementService.getTypes(selectedSession));
      if (profile) {
        setMyInvolvements(
          await membershipService.get({
            username: profile.AD_Username,
            sessionCode: selectedSession,
            participationTypes: NonGuestParticipations,
          }),
        );
      }
      setLoading(false);
    };

    if (selectedSession) {
      updateInvolvements();
    }
  }, [selectedSession, profile]);

  useEffect(() => {
    setInvolvements(involvementService.filter(allInvolvements, type, search));
  }, [allInvolvements, type, search]);

  let myInvolvementsHeadingText;
  let myInvolvementsNoneText;
  let involvementSessionText =
    sessions.find((s) => s.SessionCode === selectedSession)?.SessionDescription ?? '';
  if (involvementSessionText.includes('Academic Year')) {
    involvementSessionText = involvementSessionText.substring(
      0,
      involvementSessionText.indexOf('Academic Year'),
    );
  }
  if (selectedSession === currentAcademicSession && selectedSession !== '') {
    myInvolvementsHeadingText = 'Current';
    myInvolvementsNoneText =
      "It looks like you're not currently a member of any involvements. Get connected below!";
  } else {
    myInvolvementsHeadingText = involvementSessionText;
    myInvolvementsNoneText = 'No personal involvements found for this term';
  }

  const searchPageTitle = (
    <div align="left">
      <b className={styles.involvements_gordon_text}> Gordon </b>
      Involvements
    </div>
  );

  return (
    <Grid container justifyContent="center" spacing={4}>
      <Grid item xs={12} lg={8}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={8} marginTop={1}>
                <CardHeader title={searchPageTitle} />
              </Grid>
              <Grid item xs={12} md={6} lg={4} marginTop={2}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="activity-session">Term</InputLabel>
                  <Select
                    labelId="activity-session"
                    id="activity-session"
                    value={selectedSession}
                    onChange={(e) => handleSelectSession(e.target.value)}
                  >
                    {(isOnline
                      ? sessions
                      : sessions.filter((item) => item.SessionCode === selectedSession)
                    ).map(({ SessionDescription: description, SessionCode: code }) => (
                      <MenuItem label={description} value={code} key={code}>
                        {description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TabContext value={tabIndex}>
              <Grid item xs={16} marginTop={2}>
                <TabList
                  onChange={handleChangeTab}
                  aria-label="involvements tabs"
                  variant="fullWidth"
                  centered
                  indicatorColor="secondary"
                >
                  <Tab label="Personal" className="gc360_header" value="1" />
                  <Tab label="Requests" className="gc360_header" value="2" />
                  <Tab label="All" className="gc360_header" value="3" />
                </TabList>
              </Grid>
              <TabPanel value="1">
                {loadingProfile || loading ? (
                  <GordonLoader />
                ) : (
                  profile && (
                    <Grid item xs={12} lg={12}>
                      <InvolvementsGrid
                        involvements={myInvolvements}
                        sessionCode={selectedSession}
                        noInvolvementsText={myInvolvementsNoneText}
                      />
                    </Grid>
                  )
                )}
              </TabPanel>
              <TabPanel value="2">
                <Grid
                  item
                  xs={12}
                  lg={12}
                  xl={12}
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  {!isOnline ? null : loadingProfile ? (
                    <GordonLoader />
                  ) : (
                    profile && <Requests profile={profile} session={selectedSession} />
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value="3">
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={6} marginBottom={4}>
                      <TextField
                        id="search"
                        variant="filled"
                        label="Search"
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} marginBottom={4}>
                      <FormControl fullWidth variant="filled">
                        <InputLabel id="activity-type">Type</InputLabel>
                        <Select
                          labelId="activity-type"
                          id="activity-type"
                          value={type}
                          onChange={(event) => setType(event.target.value)}
                        >
                          <MenuItem label="All" value="">
                            <em>All</em>
                          </MenuItem>
                          {types.map((type) => (
                            <MenuItem value={type} key={type}>
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  {loading ? (
                    <GordonLoader />
                  ) : (
                    <InvolvementsGrid
                      involvements={involvements}
                      sessionCode={selectedSession}
                      noInvolvementsText="There aren't any involvements for the selected session and type"
                    />
                  )}
                </Grid>
              </TabPanel>
            </TabContext>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default InvolvementsAll;
