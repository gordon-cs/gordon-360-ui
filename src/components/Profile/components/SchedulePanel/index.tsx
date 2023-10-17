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
import scheduleService, { Schedule, CourseEvent, scheduleResources } from 'services/schedule';
import sessionService from 'services/session';
import { Profile } from 'services/user';

type Props = {
  profile: Profile;
  myProf: boolean;
};

const GordonSchedulePanel = ({ profile, myProf }: Props) => {
  const [loading, setLoading] = useState(true);
  const [allSchedules, setAllSchedules] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseEvent | null>(null);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      scheduleService.getSchedules(myProf ? undefined : profile.AD_Username),
      sessionService.getCurrent(),
    ]).then(([allSessionSchedules, currentSession]) => {
      setAllSchedules(allSessionSchedules);
      const defaultSchedule =
        // If there is a schedule for the current session, make it d4fault
        allSessionSchedules.find((s) => s.Session.SessionCode === currentSession.SessionCode) ??
        // Otherwise, use the most recent session
        allSessionSchedules[0];
      setSelectedSchedule(defaultSchedule);

      setLoading(false);
    });
  }, [profile.AD_Username, myProf]);

  return loading ? (
    <GordonLoader />
  ) : (
    <>
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
          aria-controls="schedule"
          id="schedule-header"
          className={`gc360_header ${styles.accordionHeader}`}
        >
          <CardHeader title={'Schedule'} />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container justifyContent="center" spacing={4}>
            <Grid item xs={12} lg={3}>
              <TextField
                label="Term"
                id="schedule-session"
                value={selectedSchedule?.Session.SessionCode ?? ''}
                onChange={(e) =>
                  setSelectedSchedule(
                    allSchedules.find((s) => s.Session.SessionCode === e.target.value) ?? null,
                  )
                }
                select
              >
                {allSchedules.map(
                  ({ Session: { SessionDescription: description, SessionCode: code } }) => (
                    <MenuItem value={code} key={code}>
                      {description}
                    </MenuItem>
                  ),
                )}
              </TextField>
            </Grid>
            <Grid lg={7}></Grid>
            {selectedSchedule && (
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
                    activeDays={scheduleResources.filter(
                      (r) =>
                        (r.id !== 'S' && r.id !== 'U') ||
                        selectedSchedule.Courses.some((c) => c.resourceId === r.id),
                    )}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      {myProf && selectedCourse && selectedSchedule && (
        <ScheduleDialog onClose={() => setSelectedCourse(null)} course={selectedCourse} />
      )}
    </>
  );
};

export default GordonSchedulePanel;
