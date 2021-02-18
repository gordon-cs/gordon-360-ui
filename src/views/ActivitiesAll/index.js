import {
  Card,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import './activities-all.css';
import activity from '../../services/activity';
import sessionService from '../../services/session';
import GordonActivityGrid from './components/ActivityGrid';
import GordonLoader from '../../components/Loader';
import user from './../../services/user';
import { gordonColors } from '../../theme';
import Requests from './components/Requests';
import { useNetworkStatus } from '../../contexts/NetworkContext';

const GordonActivitiesAll = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentAcademicSession, setCurrentAcademicSession] = useState('');
  const [profile, setProfile] = useState('');
  const [activities, setActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [myInvolvements, setMyInvolvements] = useState([]);
  const [search, setSearch] = useState('');
  const [session, setSession] = useState('');
  const [sessions, setSessions] = useState([]);
  const [type, setType] = useState('');
  const [types, setTypes] = useState([]);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    window.onpopstate = (e) => {
      window.location.reload();
    };
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    const { SessionCode: sessionCode } = await sessionService.getCurrent();
    const [activities, types, sessions] = await Promise.all([
      activity.getAll(sessionCode),
      activity.getTypes(sessionCode),
      sessionService.getAll(),
    ]);

    //Index of the array "activities" of current session
    var IcurrentSession;
    for (var i = 0; i < sessions.length; i++) {
      if (sessionCode === sessions[i].SessionCode) {
        IcurrentSession = i;
        break;
      }
    }

    let pastActivities,
      pastTypes,
      myPastInvolvements = [];
    let tempSession;
    let backButton = false;
    if (window.location.href.includes('?')) {
      backButton = true;
      tempSession = window.location.href.split('?')[1];
      setSession(tempSession);
      [pastActivities, pastTypes] = await Promise.all([
        activity.getAll(tempSession),
        activity.getTypes(tempSession),
      ]);
    }
    if (props.authentication) {
      try {
        const profile = await user.getProfileInfo();
        const myInvolvements = await user.getSessionMembershipsWithoutGuests(
          profile.ID,
          sessionCode,
        );
        if (backButton) {
          myPastInvolvements = await user.getSessionMembershipsWithoutGuests(
            profile.ID,
            tempSession,
          );
          setSessions(sessions);
          setActivities(pastActivities);
          setAllActivities(pastActivities);
          setMyInvolvements(myPastInvolvements);
          setTypes(pastTypes);
          setProfile(profile);
        } else if (activities.length === 0) {
          for (let k = IcurrentSession - 1; k >= 0; k--) {
            const [newActivities] = await Promise.all([activity.getAll(sessions[k].SessionCode)]);
            if (newActivities.length !== 0) {
              setSession(sessions[k].sessionCode);
              setSessions(sessions);
              setActivities(newActivities);
              setAllActivities(newActivities);
              setMyInvolvements([]);
              setTypes(types);
              setProfile(profile);
              break;
            }
          }
        } else {
          setSession(sessionCode);
          setSessions(sessions);
          setActivities(activities);
          setAllActivities(activities);
          setMyInvolvements(myInvolvements);
          setTypes(types);
          setProfile(profile);
        }
      } catch (error) {
        setError(error);
      }
    } else {
      try {
        if (backButton) {
          setSessions(sessions);
          setActivities(pastActivities);
          setAllActivities(pastActivities);
          setTypes(pastTypes);
        } else if (activities.length === 0) {
          for (let k = IcurrentSession - 1; k >= 0; k--) {
            const [newActivities] = await Promise.all([activity.getAll(sessions[k].SessionCode)]);
            if (newActivities.length !== 0) {
              setSessions(sessions);
              setSession(sessions[k].SessionCode);
              setActivities(newActivities);
              setAllActivities(newActivities);
              setTypes(types);
              break;
            }
          }
        } else {
          setSession(sessionCode);
          setSessions(sessions);
          setActivities(activities);
          setAllActivities(activities);
          setTypes(types);
        }
      } catch (error) {
        setError(error);
      }
    }
    setCurrentAcademicSession(sessionCode);
    setLoading(false);
  }, [props.authentication]);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Gets the information of the new selected session to display to the user.
   *
   * @param {Event} event The event of a session being changed. It contains the value of the new
   *                      selected session.
   */
  const changeSession = async (event) => {
    const newSession = event.target.value;
    setLoading(true);
    setSession(newSession);
    props.history.push(`?${newSession}`);
    const allActivities = await activity.getAll(newSession);
    const types = await activity.getTypes(newSession);
    setActivities(activity.filter(allActivities, type, search));
    setAllActivities(allActivities);
    setTypes(types);
    setMyInvolvements(
      props.authentication
        ? await user.getSessionMembershipsWithoutGuests(profile.ID, newSession)
        : [],
    );
    setLoading(false);
  };

  /**
   * Filters the activities list by the current/selected Activity-Type and the user search.
   *
   * @param {String} name The type of event that occured. Either a 'Search' or 'Type'. A 'Search' is
   *                      a user search and a 'Type' is a selected Activity-Type
   * @returns {Function} An asynchronous function that filters the activities based upon an event's data
   */
  const filter = (name) => {
    if (name === 'search') {
      return (event) => {
        setSearch(event.target.value);
        setActivities(activity.filter(allActivities, type, event.target.value));
      };
    } else {
      return (event) => {
        setType(event.target.value);
        setActivities(activity.filter(allActivities, event.target.value, search));
      };
    }
  };

  /**
   * Creates the My Involvements text for both the header and if the user has no involvements.
   *
   * @returns {Object} An object that contains both MyInvolvements header and no-involvements text
   */
  const createMyInvolvementsText = () => {
    let myInvolvementsHeadingText = '';
    let myInvolvementsNoneText = '';
    // If the current session is the current academic session
    if (session && session === currentAcademicSession) {
      myInvolvementsHeadingText = 'CURRENT';
      myInvolvementsNoneText =
        "It looks like you're not currently a member of any Involvements. Get connected below!";
    }
    // If the current session is not the current academic session
    else {
      // Gets the description of the session
      try {
        let involvementDescription = sessions.filter((s) => {
          return s.SessionCode === session;
        })[0].SessionDescription;
        myInvolvementsHeadingText = involvementDescription.toUpperCase();
        myInvolvementsNoneText = 'No Involvements found for ' + involvementDescription;
      } catch (error) {
        console.error(error);
      }
    }

    return [myInvolvementsHeadingText, myInvolvementsNoneText];
  };

  // If an error occured while getting user's involvements, throw an error
  if (error) {
    throw error;
  }

  // Grid Header Style
  const headerStyle = {
    backgroundColor: gordonColors.primary.blue,
    color: '#FFF',
    padding: '10px',
  };

  let myInvolvementsComp;
  let allInvolvementsComp;
  let [myInvolvementsHeadingText, myInvolvementsNoneText] = createMyInvolvementsText();

  if (loading) {
    myInvolvementsComp = <GordonLoader />;
    allInvolvementsComp = <GordonLoader />;
  } else {
    myInvolvementsComp = (
      <GordonActivityGrid
        activities={myInvolvements}
        sessionCode={session}
        noInvolvementsText={myInvolvementsNoneText}
      />
    );
    allInvolvementsComp = (
      <GordonActivityGrid
        activities={activities}
        sessionCode={session}
        noInvolvementsText="No results for the selected session and type."
      />
    );
  }

  // Creates the sessions list
  const sessionOptions = isOnline
    ? sessions.map(({ SessionDescription: description, SessionCode: code }) => (
        <MenuItem label={description} value={code} key={code}>
          {description}
        </MenuItem>
      ))
    : sessions
        .filter((item) => item.SessionCode === session)
        .map(({ SessionDescription: description, SessionCode: code }) => (
          <MenuItem label={description} value={code} key={code}>
            {description}
          </MenuItem>
        ));

  // Creates the current session's types list
  const typeOptions = types.map((type) => (
    <MenuItem value={type} key={type}>
      {type}
    </MenuItem>
  ));

  let fullContent = (
    <section className="activities-all">
      <Grid container justify="center" spacing={0}>
        <Grid item xs={12} md={12} lg={8}>
          <Grid container className="activities-filter" spacing={2}>
            <Grid item xs={12} md={12} lg={6}>
              <TextField
                id="search"
                label="Search"
                value={search}
                onChange={filter('search')}
                margin="none"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="activity-session">Session</InputLabel>
                <Select
                  value={session}
                  onChange={changeSession}
                  input={<Input id="activity-session" />}
                >
                  {sessionOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="activity-type">Type of Involvement</InputLabel>
                <Select value={type} onChange={filter('type')} input={<Input id="activity-type" />}>
                  <MenuItem label="All" value="">
                    <em>All</em>
                  </MenuItem>
                  {typeOptions}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container align="center" spacing={4} justify="center">
        {/* Shows the user's memberships requests if the user is online */}
        {isOnline && props.authentication && (
          <Grid item xs={12} lg={8}>
            <Card>
              <Requests />
            </Card>
          </Grid>
        )}

        {/* Shows My Involvements Header if the user is authenticated */}
        {props.authentication && (
          <Grid item xs={12} lg={8} fullWidth>
            <Card>
              <div style={headerStyle}>
                <Typography variant="body2" style={headerStyle}>
                  MY {myInvolvementsHeadingText} INVOLVEMENTS
                </Typography>
              </div>
            </Card>
          </Grid>
        )}

        {/* Shows My Involvements Content if the user is authenticated */}
        {props.authentication && (
          <Grid item xs={12} lg={8}>
            {myInvolvementsComp}
          </Grid>
        )}

        <Grid item xs={12} lg={8}>
          <Card>
            <div style={headerStyle}>
              <Typography variant="body2" style={headerStyle}>
                ALL INVOLVEMENTS
              </Typography>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} lg={8}>
          {allInvolvementsComp}
        </Grid>
      </Grid>
    </section>
  );

  return fullContent;
};

export default GordonActivitiesAll;
