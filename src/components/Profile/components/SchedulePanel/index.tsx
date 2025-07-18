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
import scheduleService, { CourseEvent, formatTermDescription, Schedule } from 'services/schedule';
import { Profile } from 'services/user';
import academicTermService from 'services/academicTerm';

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
    const loadSchedules = async () => {
      setLoading(true);
      try {
        const [allTermSchedules, currentTerm] = await Promise.all([
          scheduleService.getAllTermSchedules(profile.AD_Username),
          academicTermService.getCurrentTerm(),
        ]);

        const sortedSchedules = [...allTermSchedules].sort(
          (a, b) => new Date(b.term.BeginDate).getTime() - new Date(a.term.BeginDate).getTime(),
        );
        setAllSchedules(sortedSchedules);

        const now = new Date();
        const currentStart = new Date(currentTerm.BeginDate);
        const currentEnd = new Date(currentTerm.EndDate);

        const currentSchedule = sortedSchedules.find(
          (s) =>
            s.term.YearCode === currentTerm.YearCode &&
            s.term.TermCode === currentTerm.TermCode &&
            (s.courses?.length ?? 0) > 0,
        );

        const futureWithCourses = sortedSchedules.find(
          (s) => new Date(s.term.BeginDate) > currentEnd && (s.courses?.length ?? 0) > 0,
        );

        const anyWithCourses = sortedSchedules.find((s) => (s.courses?.length ?? 0) > 0);

        const defaultSchedule = currentSchedule || futureWithCourses || anyWithCourses || null;
        setSelectedSchedule(defaultSchedule);
      } catch (err) {
        console.error('Failed to load schedule or current term:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSchedules();
  }, [profile.AD_Username]);

  const toggleIsScheduleOpen = () => {
    setIsScheduleOpen((prev) => {
      const next = !prev;
      localStorage.setItem(scheduleOpenKey, String(next));
      return next;
    });
  };

  if (loading) return <GordonLoader />;

  return (
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
              <CardHeader title="Course Schedule" />
            </Grid>
          </AccordionSummary>
        ) : (
          <div />
        )}

        {allSchedules.length > 0 && (
          <AccordionDetails>
            <Grid container justifyContent="center" spacing={4}>
              <Grid item xs={12} lg={3}>
                <TextField
                  label="Term"
                  id="schedule-term"
                  value={selectedSchedule?.term.BeginDate ?? ''}
                  onChange={(e) =>
                    setSelectedSchedule(
                      allSchedules.find((s) => s.term.BeginDate === e.target.value) ?? null,
                    )
                  }
                  select
                >
                  {allSchedules.map(({ term }) => (
                    <MenuItem value={term.BeginDate} key={term.BeginDate}>
                      {formatTermDescription(term)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid lg={7} />

              {selectedSchedule ? (
                <>
                  {myProf && (
                    <Grid item className={styles.addCalendarInfoText}>
                      <Typography color="secondary">
                        Click on Course to add Schedule to Personal Calendar
                      </Typography>
                    </Grid>
                  )}
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
        )}
      </Accordion>

      {myProf && selectedCourse && selectedSchedule && (
        <ScheduleDialog
          onClose={() => setSelectedCourse(null)}
          course={selectedCourse}
          term={selectedSchedule.term}
        />
      )}
    </>
  );
};

export default GordonSchedulePanel;
