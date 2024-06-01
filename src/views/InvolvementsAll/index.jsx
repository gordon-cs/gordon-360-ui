import {
  Card,
  CardContent,
  CardHeader,
  Divider,
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
import { useSearchParams } from 'react-router-dom';
import involvementService from 'services/activity';
import membershipService, { NonGuestParticipations } from 'services/membership';
import sessionService from 'services/session';
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
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    sessionService.getAll().then(setSessions);
  }, []);

  useEffect(() => {
    const loadPage = async () => {
      const sessionFromURL = searchParams.get('session');
      if (sessionFromURL) {
        setSelectedSession(sessionFromURL);
      } else {
        const { SessionCode: currentSessionCode } = await sessionService.getCurrent();
        setCurrentAcademicSession(currentSessionCode);

        const involvements = await involvementService.getAll(currentSessionCode);
        if (involvements.length > 0) {
          setSelectedSession(currentSessionCode);
        } else if (sessions) {
          let indexOfCurrentSession = sessions.findIndex(
            (session) => session.SessionCode === currentSessionCode,
          );

          for (const session of sessions.slice(indexOfCurrentSession)) {
            const newInvolvements = await involvementService.getAll(session.SessionCode);
            if (newInvolvements.length !== 0) {
              setSelectedSession(session.SessionCode);
              break;
            }
          }
        }
      }
    };
    loadPage();
  }, [searchParams, sessions]);

  const handleSelectSession = async (value) => {
    setSelectedSession(value);
    setSearchParams((urlSearchParams) => urlSearchParams.set('session', value), {
      replace: searchParams.get('session'),
    });
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
    myInvolvementsNoneText =
      "It looks like you're not currently a member of any involvements. Get connected below!";
  } else {
    myInvolvementsNoneText = 'No personal involvements found for this term';
  }

  return (
    <Grid container justifyContent="center" spacing={4}>
      {!isOnline ? null : loadingProfile ? (
        <GordonLoader />
      ) : (
        profile && <Requests profile={profile} session={selectedSession} />
      )}

      {/* All Involvements (public) */}
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader title={`${involvementSessionText} Involvements`} className="gc360_header" />
          <CardContent>
            <Grid container spacing={2}>
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
            <br />
            {loading ? (
              <GordonLoader />
            ) : (
              <>
                {myInvolvements && (
                  <>
                    <InvolvementsGrid
                      involvements={myInvolvements}
                      sessionCode={selectedSession}
                      noInvolvementsText={myInvolvementsNoneText}
                    />
                    <br />
                    <Divider />
                    <br />
                  </>
                )}
                <InvolvementsGrid
                  involvements={
                    myInvolvements.length > 0
                      ? involvements.filter(
                          (i) => !myInvolvements.some((m) => m.ActivityCode === i.ActivityCode),
                        )
                      : involvements
                  }
                  sessionCode={selectedSession}
                  noInvolvementsText="There aren't any involvements for the selected session and type"
                />
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default InvolvementsAll;
