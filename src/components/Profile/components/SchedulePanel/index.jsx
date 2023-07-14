import React, { useState, useEffect, Fragment, useCallback } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardHeader,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import GordonLoader from 'components/Loader';
import GordonScheduleCalendar from './components/ScheduleCalendar';
import ScheduleDialog from './components/ScheduleDialog';
import styles from './ScheduleHeader.module.css';
import scheduleService from 'services/schedule';
import { useNetworkStatus, useUser } from 'hooks';
import sessionService from 'services/session';

const GordonSchedulePanel = (props) => {
  const [myProf, setMyProf] = useState(false);
  const [isExpanded, setIsExpanded] = useState(props, myProf ? false : true);
  const [loading, setLoading] = useState(true);
  const [reloadCall, setReloadCall] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [currentAcademicSession, setCurrentAcademicSession] = useState('');
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedCourseInfo, setSelectedCourseInfo] = useState();
  const [firstDay, setFirstDay] = useState('');
  const [lastDay, setLastDay] = useState('');
  const [recurringDays, setRecurringDays] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseLocation, setCourseLocation] = useState('');
  const [courseStart, setCourseStart] = useState('');
  const [courseEnd, setCourseEnd] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const isOnline = useNetworkStatus();
  const sessionFromURL = new URLSearchParams(location.search).get('session');

  useEffect(() => {
    const loadPage = async () => {
      setSessions(await sessionService.getAll());
      if (sessionFromURL) {
        setSelectedSession(sessionService.encodeSessionCode(sessionFromURL));
      } else {
        const { SessionCode: currentSessionCode } = await sessionService.getCurrent();
        setCurrentAcademicSession(currentSessionCode);
        const currSession = await sessionService.getCurrent();
        const firstDay = currSession.SessionBeginDate;
        const lastDay = currSession.SessionEndDate;

        setFirstDay(firstDay);
        setLastDay(lastDay);
      }
    };
    loadPage();
  }, [sessionFromURL]);

  const handleSelectSession = async (value) => {
    setSelectedSession(value);
    reloadHandler();
    const currSession = await sessionService.get(value);
    const firstDay = currSession.SessionBeginDate;
    const lastDay = currSession.SessionEndDate;

    setFirstDay(firstDay);
    setLastDay(lastDay);
  };

  useEffect(() => {
    loadData(props.profile);
  }, [props.profile]);

  const loadData = async (searchedUser) => {
    try {
      const schedule = await scheduleService.getSchedule(searchedUser.AD_Username, props.term);
      setProfile(profileInfo);
      setEventInfo(scheduleService.makeScheduleCourses(schedule));
    } catch (e) {}
    setLoading(false);
  };

  const handleScheduleDialogOpen = useCallback((calEvent) => {
    if (props.myProf) {
      setScheduleDialogOpen(true);
      setRecurringDays(calEvent.meetingDays.map((day) => `${day}`).join(', '));
      setCourseTitle(calEvent.title.split('in')[0]);
      setCourseLocation(calEvent.title.split('in')[1]);
      setCourseStart(calEvent.start);
      setCourseEnd(calEvent.end);
      setSelectedCourseInfo(calEvent);
    }
  }, []);

  const handleScheduleDialogClose = () => {
    setScheduleDialogOpen(false);
  };

  const handleIsExpanded = () => setIsExpanded((prevExpanded) => !prevExpanded);

  const reloadHandler = () => {
    setReloadCall((val) => !val);
  };

  const { classes } = props;

  let scheduleDialog;

  if (props.myProf) {
    scheduleDialog = (
      <ScheduleDialog
        scheduleDialogOpen={scheduleDialogOpen}
        handleScheduleDialogClose={handleScheduleDialogClose}
        courseInfo={selectedCourseInfo}
        recurringDays={recurringDays}
        courseTitle={courseTitle}
        courseLocation={courseLocation}
        firstDay={firstDay}
        lastDay={lastDay}
        courseStart={courseStart}
        courseEnd={courseEnd}
      />
    );
  }

  return loading ? (
    <GordonLoader />
  ) : (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {
        <>
          <Accordion TransitionProps={{ unmountOnExit: true }} onChange={handleIsExpanded}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={styles.header}
            >
              <CardHeader className={styles.accordionHeader} title={'Schedule'} />
            </AccordionSummary>
            <AccordionDetails>
              <Grid container direction="row" justifyContent="center" align="left" spacing={4}>
                <Grid item xs={12} lg={3} spacing={2}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel id="schedule session">Term</InputLabel>
                    <Select
                      labelId="schedule-session"
                      id="schedule-session"
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
                <Grid lg={7}></Grid>
                <Grid item align="center" className={styles.addCalendarInfoText}>
                  <Typography className={styles.addCalendarInfoText}>
                    Click on Course to add Schedule to Personal Calendar
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={10}>
                  <GordonScheduleCalendar
                    profile={props.profile}
                    term={selectedSession}
                    myProf={props.myProf}
                    reloadCall={reloadCall}
                    isOnline={props.isOnline}
                    onSelectEvent={handleScheduleDialogOpen}
                  />
                </Grid>
              </Grid>
              {scheduleDialog}
            </AccordionDetails>
          </Accordion>
        </>
      }
    </LocalizationProvider>
  );
};

export default GordonSchedulePanel;
