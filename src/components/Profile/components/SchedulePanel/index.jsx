import { useState, useEffect } from 'react';
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
  const [allSessionCourses, setAllSessionCourses] = useState([]);
  const [session, setSession] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState();

  useEffect(() => {
    setLoading(true);

    Promise.all([
      scheduleService.getAllSessionCourses(profile.AD_Username),
      sessionService.getCurrent(),
    ]).then(([allSessionCourses, currentSession]) => {
      setAllSessionCourses(allSessionCourses);

      // If current session has courses, make it default session
      if (allSessionCourses.some((s) => s.SessionCode === currentSession.SessionCode)) {
        setSession(currentSession);
      } else {
        // Else default session should be most recent session that has courses
        // Destructure session schedule to ignore AllCourses, creating an object of type Session
        const { AllCourses: _, ...defaultSession } = allSessionCourses[0];
        setSession(defaultSession);
      }

      setLoading(false);
    });
  }, [profile.AD_Username]);

  const handleSelectSession = (value) => sessionService.get(value).then(setSession);

  return loading ? (
    <GordonLoader />
  ) : (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {
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
                    value={session.SessionCode}
                    onChange={(e) => handleSelectSession(e.target.value)}
                  >
                    {(isOnline
                      ? allSessionCourses
                      : allSessionCourses.filter((item) => item.SessionCode === session.SessionCode)
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
                  session={session}
                  allCourses={allSessionCourses}
                  myProf={myProf}
                  isOnline={isOnline}
                  onSelectEvent={setSelectedCourse}
                />
              </Grid>
            </Grid>
            {myProf && (
              <ScheduleDialog
                onClose={() => setSelectedCourse(null)}
                course={selectedCourse}
                session={session}
              />
            )}
          </AccordionDetails>
        </Accordion>
      }
    </LocalizationProvider>
  );
};

export default GordonSchedulePanel;
