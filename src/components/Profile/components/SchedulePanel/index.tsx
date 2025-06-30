import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  MenuItem,
  CardHeader,
  Typography,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GordonLoader from 'components/Loader';
import GordonScheduleCalendar from './components/ScheduleCalendar';
import ScheduleDialog from './components/ScheduleDialog';
import styles from './ScheduleHeader.module.css';
import scheduleService, { CourseEvent, Schedule } from 'services/schedule';
import sessionService from 'services/session';
import { Profile } from 'services/user';
import { AuthError } from 'services/error';

type Props = {
  profile: Profile;
  myProf: boolean;
};

const scheduleOpenKey = 'profile.schedule.isOpen';

const GordonSchedulePanel = ({ profile, myProf }: Props) => {
  const [loading, setLoading] = useState(true);
  const [allSchedules, setAllSchedules] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseEvent | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(
    localStorage.getItem(scheduleOpenKey) !== 'false',
  );

  useEffect(() => {
    setLoading(true);

    Promise.all([
      scheduleService.getAllSessionSchedules(profile.AD_Username),
      sessionService.getCurrent(),
    ])
      .then(([allSessionSchedules, currentSession]) => {
        // Sort schedules descending by SessionBeginDate (newest first)
        const sortedSchedules = [...allSessionSchedules].sort(
          (a, b) =>
            new Date(b.session.SessionBeginDate).getTime() -
            new Date(a.session.SessionBeginDate).getTime(),
        );

        setAllSchedules(sortedSchedules);

        const now = new Date();
        const currentSessionEnd = new Date(currentSession.SessionEndDate);

        // Find schedule for current session
        const currentSchedule = sortedSchedules.find(
          (s) => s.session.SessionCode.trim() === currentSession.SessionCode.trim(),
        );

        const hasCoursesInCurrent = (currentSchedule?.courses?.length ?? 0) > 0;

        let defaultSchedule: Schedule | null = null;

        if (now <= currentSessionEnd) {
          // If current session is in progress
          if (hasCoursesInCurrent) {
            // Show current session schedule if student has courses
            defaultSchedule = currentSchedule ?? null;
          } else {
            // Otherwise show next term with courses if any
            defaultSchedule =
              sortedSchedules.find(
                (s) =>
                  new Date(s.session.SessionBeginDate) > currentSessionEnd &&
                  (s.courses?.length ?? 0) > 0,
              ) ?? null;
          }
        } else {
          // If no academic session in progress (current session ended)
          // Show next term with courses if any
          defaultSchedule =
            sortedSchedules.find(
              (s) =>
                new Date(s.session.SessionBeginDate) > currentSessionEnd &&
                (s.courses?.length ?? 0) > 0,
            ) ?? null;
        }

        // If still no schedule found, fallback to most recent schedule with courses
        if (!defaultSchedule) {
          defaultSchedule = sortedSchedules.find((s) => (s.courses?.length ?? 0) > 0) ?? null;
        }

        setSelectedSchedule(defaultSchedule);
        setLoading(false);
      })
      .catch((reason: AuthError) => {
        console.error('Failed to fetch schedules:', reason);
        setLoading(false);
      });
  }, [profile.AD_Username]);

  const toggleIsScheduleOpen = () => {
    setIsScheduleOpen((wasOpen) => {
      localStorage.setItem(scheduleOpenKey, String(!wasOpen));
      return !wasOpen;
    });
  };

  return loading ? (
    <GordonLoader />
  ) : (
    <>
      <Accordion
        expanded={isScheduleOpen}
        onChange={toggleIsScheduleOpen}
        TransitionProps={{ unmountOnExit: true }}
      >
        {allSchedules.length > 0 ? (
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
            aria-controls="schedule"
            id="schedule-header"
            className={`gc360_header ${styles.accordionHeader}`}
          >
            <Grid container className={styles.header}>
              <CardHeader title={'Course Schedule'} />
            </Grid>
          </AccordionSummary>
        ) : (
          <div />
        )}
        {allSchedules.length > 0 ? (
          <AccordionDetails>
            <Grid container justifyContent="center" spacing={4}>
              <Grid item xs={12} lg={3}>
                <TextField
                  label="Term"
                  id="schedule-session"
                  value={selectedSchedule?.session.SessionCode ?? ''}
                  onChange={(e) =>
                    setSelectedSchedule(
                      allSchedules.find((s) => s.session.SessionCode === e.target.value) ?? null,
                    )
                  }
                  select
                >
                  {allSchedules.map(
                    ({ session: { SessionDescription: description, SessionCode: code } }) => (
                      <MenuItem value={code} key={code}>
                        {description}
                      </MenuItem>
                    ),
                  )}
                </TextField>
              </Grid>
              <Grid lg={7}></Grid>
              {selectedSchedule ? (
                <>
                  <Grid item className={styles.addCalendarInfoText}>
                    {myProf && (
                      <Typography className={styles.addCalendarInfoText}>
                        Click on Course to add Schedule to Personal Calendar
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} lg={10}>
                    <GordonScheduleCalendar
                      schedule={selectedSchedule}
                      onSelectEvent={setSelectedCourse}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Typography color="error">No schedule available to display.</Typography>
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        ) : (
          <div />
        )}
      </Accordion>
      {myProf && selectedCourse && selectedSchedule && (
        <ScheduleDialog
          onClose={() => setSelectedCourse(null)}
          course={selectedCourse}
          session={selectedSchedule.session}
        />
      )}
    </>
  );
};

export default GordonSchedulePanel;
