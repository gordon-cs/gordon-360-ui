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
  // Open by default unless user has stored preference
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(() => {
    const stored = localStorage.getItem(scheduleOpenKey);
    return stored === null ? true : stored !== 'false';
  });

  useEffect(() => {
    setLoading(true);

    Promise.all([
      scheduleService.getAllSessionSchedules(profile.AD_Username),
      sessionService.getCurrent(),
    ])
      .then(([allSessionSchedules, currentSession]) => {
        // Sort schedules descending by start date (newest first)
        const sortedSchedules = [...allSessionSchedules].sort(
          (a, b) =>
            new Date((b.session as any).SessionBeginDate).getTime() -
            new Date((a.session as any).SessionBeginDate).getTime(),
        );

        setAllSchedules(sortedSchedules);

        // Find current session schedule
        const currentSchedule = sortedSchedules.find(
          (s) => s.session.SessionCode.trim() === currentSession.SessionCode.trim(),
        );
        const hasCoursesInCurrent = (currentSchedule?.courses?.length ?? 0) > 0;

        let defaultSchedule: Schedule | undefined;

        if (hasCoursesInCurrent) {
          // Show current session schedule if student has courses
          defaultSchedule = currentSchedule;
        } else {
          // Otherwise, try to find next future session with courses
          const currentStart = new Date(currentSession.SessionBeginDate).getTime();

          const futureScheduleWithCourses = sortedSchedules.find(
            (s) =>
              new Date((s.session as any).SessionBeginDate).getTime() > currentStart &&
              (s.courses?.length ?? 0) > 0,
          );

          if (futureScheduleWithCourses) {
            defaultSchedule = futureScheduleWithCourses;
          } else {
            // Otherwise fallback: most recent schedule with courses
            defaultSchedule = sortedSchedules.find((s) => (s.courses?.length ?? 0) > 0);
          }
        }

        setSelectedSchedule(defaultSchedule ?? null);
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
          <div></div>
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
          <div></div>
        )}
      </Accordion>
      {myProf && selectedCourse && selectedSchedule && (
        <ScheduleDialog
          onClose={() => setSelectedCourse(null)}
          course={selectedCourse}
          session={selectedSchedule?.session}
        />
      )}
    </>
  );
};

export default GordonSchedulePanel;
