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
import scheduleService from 'services/schedule';
import sessionService from 'services/session';

const GordonSchedulePanel = ({ profile, myProf }) => {
  const [loading, setLoading] = useState(true);
  const [allSchedules, setAllSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState();

  useEffect(() => {
    setLoading(true);

    Promise.all([
      scheduleService.getAllSessionSchedules(profile.AD_Username),
      sessionService.getCurrent(),
    ]).then(([allSessionSchedules, currentSession]) => {
      setAllSchedules(allSessionSchedules);
      const defaultSchedule =
        // If there is a schedule for the current session, make it d4fault
        allSessionSchedules.find((s) => s.session.SessionCode === currentSession.SessionCode) ??
        // Otherwise, use the most recent session
        allSessionSchedules[0];
      setSelectedSchedule(defaultSchedule);

      setLoading(false);
    });
  }, [profile.AD_Username]);

  return loading ? (
    <GordonLoader />
  ) : (
    <>
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
          aria-controls="schedule"
          id="schedule-header"
          className="gc360_header"
        >
          <CardHeader className={styles.accordionHeader} title={'Schedule'} />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container justifyContent="center" align="left" spacing={4}>
            <Grid item xs={12} lg={3}>
              <TextField
                label="Term"
                id="schedule-session"
                value={selectedSchedule.session.SessionCode}
                onChange={(e) =>
                  setSelectedSchedule(
                    allSchedules.find((s) => s.session.SessionCode === e.target.value),
                  )
                }
                select
              >
                {allSchedules.map(
                  ({ session: { SessionDescription: description, SessionCode: code } }) => (
                    <MenuItem label={description} value={code} key={code}>
                      {description}
                    </MenuItem>
                  ),
                )}
              </TextField>
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
                schedule={selectedSchedule}
                onSelectEvent={setSelectedCourse}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {myProf && (
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
