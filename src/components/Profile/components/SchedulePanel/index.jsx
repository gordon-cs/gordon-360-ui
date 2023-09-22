import { useState, useEffect, useCallback } from 'react';
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
import sessionService from 'services/session';

const GordonSchedulePanel = ({ profile, myProf, isOnline }) => {
  const [loading, setLoading] = useState(true);
  const [reloadCall, setReloadCall] = useState(false);
  const [currentAcademicSession, setCurrentAcademicSession] = useState('');
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedCourseInfo, setSelectedCourseInfo] = useState();
  const [firstDay, setFirstDay] = useState('');
  const [lastDay, setLastDay] = useState('');
  const [recurringDays, setRecurringDays] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseLocation, setCourseLocation] = useState('');
  const [courseStart, setCourseStart] = useState('');
  const [courseEnd, setCourseEnd] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      scheduleService.getAllCourses(profile.AD_Username),
      sessionService.getCurrent(),
    ]).then(([allCourses, currentSession]) => {
      setAllCourses(allCourses.filter((item) => item.AllCourses.length > 0));
      setCurrentAcademicSession(currentSession.SessionCode);
      setFirstDay(currentSession.SessionBeginDate);
      setLastDay(currentSession.SessionEndDate);

      setLoading(false);
    });
  }, [profile.AD_Username]);

  const handleSelectSession = async (value) => {
    setSelectedSession(value);
    reloadHandler();
    const currSession = await sessionService.get(value);
    const firstDay = currSession.SessionBeginDate;
    const lastDay = currSession.SessionEndDate;

    setFirstDay(firstDay);
    setLastDay(lastDay);
  };

  const handleScheduleDialogOpen = useCallback(
    (calEvent) => {
      if (myProf) {
        setScheduleDialogOpen(true);
        setRecurringDays(calEvent.meetingDays.map((day) => `${day}`).join(', '));
        setCourseName(calEvent.name);
        setCourseTitle(calEvent.title);
        setCourseLocation(calEvent.location);
        setCourseStart(calEvent.start);
        setCourseEnd(calEvent.end);
        setSelectedCourseInfo(calEvent);
      }
    },
    [myProf],
  );

  const reloadHandler = () => {
    setReloadCall((val) => !val);
  };

  let scheduleDialog;

  if (myProf) {
    scheduleDialog = (
      <ScheduleDialog
        scheduleDialogOpen={scheduleDialogOpen}
        handleScheduleDialogClose={() => setScheduleDialogOpen(false)}
        courseInfo={selectedCourseInfo}
        recurringDays={recurringDays}
        courseName={courseName}
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
          <Accordion TransitionProps={{ unmountOnExit: true }}>
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
                        ? allCourses
                        : allCourses.filter((item) => item.SessionCode === selectedSession)
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
                  {myProf && (
                    <Typography className={styles.addCalendarInfoText}>
                      Click on Course to add Schedule to Personal Calendar
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} lg={10}>
                  <GordonScheduleCalendar
                    profile={profile}
                    term={selectedSession === '' ? currentAcademicSession : selectedSession}
                    allCourses={allCourses}
                    myProf={myProf}
                    reloadCall={reloadCall}
                    isOnline={isOnline}
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
