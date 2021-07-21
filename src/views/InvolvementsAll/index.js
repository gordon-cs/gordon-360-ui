import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import InvolvementsGrid from './components/InvolvementsGrid';
import GordonLoader from 'components/Loader';
import Requests from './components/Requests';
import userService from 'services/user';
import involvementService from 'services/activity';
import sessionService from 'services/session';
import useNetworkStatus from 'hooks/useNetworkStatus';
import styles from './InvolvementsAll.module.css';

const InvolvementsAll = ({ location, authentication, history }) => {
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
  const isOnline = useNetworkStatus();

  const sessionFromURL = new URLSearchParams(location.search).get('session');

  useEffect(() => {
    const loadPage = async () => {
      setSessions(await sessionService.getAll());

      if (sessionFromURL) {
        setSelectedSession(sessionFromURL);
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
  }, [authentication, sessionFromURL]);

  const handleSelectSession = async (value) => {
    setSelectedSession(value);
    history.push(`?session=${value}`);
  };

  useEffect(() => {
    const updateInvolvements = async () => {
      setLoading(true);
      setAllInvolvements(await involvementService.getAll(selectedSession));
      setTypes(await involvementService.getTypes(selectedSession));
      if (authentication) {
        const { id } = await userService.getLocalInfo();
        setMyInvolvements(
          await userService.getSessionMembershipsWithoutGuests(id, selectedSession),
        );
      }
      setLoading(false);
    };

    if (selectedSession) {
      updateInvolvements();
    }
  }, [selectedSession, authentication]);

  useEffect(() => {
    setInvolvements(involvementService.filter(allInvolvements, type, search));
  }, [allInvolvements, type, search]);

  let myInvolvementsHeadingText;
  let myInvolvementsNoneText;
  let involvementSessionText = selectedSession
    ? sessions.find((s) => s.SessionCode === selectedSession)?.SessionDescription
    : '';
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

  return (
    <Grid container justifyContent="center" spacing={4}>
      <Grid item className={styles.involvements-filter} xs={12} lg={8}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextField
              id="search"
              label="Search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              margin="none"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="activity-session">Term</InputLabel>
              <Select
                value={selectedSession}
                onChange={(e) => handleSelectSession(e.target.value)}
                input={<Input id="activity-session" />}
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
            <FormControl fullWidth>
              <InputLabel htmlFor="activity-type">Type</InputLabel>
              <Select
                value={type}
                onChange={(event) => setType(event.target.value)}
                input={<Input id="activity-type" />}
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
      </Grid>

      {isOnline && authentication && <Requests />}

      {/* My Involvements (private) */}
      {authentication && (
        <Grid item xs={12} lg={8}>
          <Card>
            <CardHeader
              title={`My ${myInvolvementsHeadingText} Involvements`}
              className={styles.involvements-header}
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
      )}

      {/* All Involvements (public) */}
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader
            title={`${involvementSessionText} Involvements`}
            className={styles.involvements-header}
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
