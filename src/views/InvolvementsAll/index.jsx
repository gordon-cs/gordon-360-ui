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
} from '@mui/material';
import GordonLoader from 'components/Loader';
import { useNetworkStatus, useUser } from 'hooks';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import involvementService from 'services/activity';
import membershipService, { NonGuestParticipations } from 'services/membership';
import sessionService from 'services/session';
import { gordonColors } from 'theme';
import InvolvementsGrid from './components/InvolvementsGrid';
import Requests from './components/Requests';

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
    <div align="center">
      Search
      <b style={{ color: 'var(--mui-palette-secondary-main)' }}> Gordon </b>
      Involvements
    </div>
  );

  return (
    <Grid container justifyContent="center" spacing={4}>
      <Grid item xs={12} lg={8}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CardHeader title={searchPageTitle} />
              </Grid>
              <Grid item xs={12} lg={6}>
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
              <Grid item xs={12} md={6} lg={3}>
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
              <Grid item xs={12} md={6} lg={3}>
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
          </CardContent>
        </Card>
      </Grid>

      {!isOnline ? null : loadingProfile ? (
        <GordonLoader />
      ) : (
        profile && <Requests profile={profile} session={selectedSession} />
      )}

      {loadingProfile ? (
        <GordonLoader />
      ) : (
        profile && (
          <Grid item xs={12} lg={8}>
            <Card>
              <CardHeader
                title={`My ${myInvolvementsHeadingText} Involvements`}
                style={{
                  backgroundColor: 'var(--mui-palette-primary-main)',
                  color: gordonColors.neutral.grayShades[50],
                }}
              />
              <CardContent>
                {loading ? (
                  <GordonLoader />
                ) : (
                  <InvolvementsGrid
                    involvements={myInvolvements}
                    sessionCode={selectedSession}
                    noInvolvementsText={myInvolvementsNoneText}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        )
      )}

      {/* All Involvements (public) */}
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader
            title={`${involvementSessionText} Involvements`}
            style={{
              backgroundColor: 'var(--mui-palette-primary-main)',
              color: gordonColors.neutral.grayShades[50],
            }}
          />
          <CardContent>
            {loading ? (
              <GordonLoader />
            ) : (
              <InvolvementsGrid
                involvements={involvements}
                sessionCode={selectedSession}
                noInvolvementsText="There aren't any involvements for the selected session and type"
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default InvolvementsAll;
