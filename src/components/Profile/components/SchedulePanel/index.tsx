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
  Dialog,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogActions,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GordonLoader from 'components/Loader';
import GordonScheduleCalendar from './components/ScheduleCalendar';
import ScheduleDialog from './components/ScheduleDialog';
import styles from './ScheduleHeader.module.css';
import scheduleService, { CourseEvent, formatTermDescription, Schedule } from 'services/schedule';
import { Profile } from 'services/user';
import academicTermService from 'services/academicTerm';
import { Button } from '@mui/material';
import { getFinalExamEvents, formatFinalExamEvent, FinalExamEvent } from 'services/event';

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
  const [finalExamOpen, setFinalExamOpen] = useState(false);
  const [finalExams, setFinalExams] = useState<FinalExamEvent[]>([]);
  const [finalExamsLoading, setFinalExamsLoading] = useState(false);
  const [currentSessionCode, setCurrentSessionCode] = useState<string | null>(null);
  const [currentFinalSessionCode, setCurrentFinalSessionCode] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      scheduleService.getAllTermSchedules(profile.AD_Username),
      academicTermService.getCurrentTerm(),
    ]).then(([allTermSchedules, currentTerm]) => {
      setAllSchedules(allTermSchedules);
      const defaultSchedule =
        // If there is a schedule for the current term, make it d4fault
        allTermSchedules.find(
          (s) =>
            s.term.YearCode === currentTerm.YearCode && s.term.TermCode === currentTerm.TermCode,
        ) ??
        // Otherwise, use the most recent term
        allTermSchedules[0];
      setSelectedSchedule(defaultSchedule);
      setLoading(false);
    });
  }, [profile.AD_Username]);

  const toggleIsScheduleOpen = () => {
    setIsScheduleOpen((wasOpen) => {
      localStorage.setItem(scheduleOpenKey, String(!wasOpen));
      return !wasOpen;
    });
  };

  const handleShowFinalExams = () => {
    setFinalExamOpen(true);
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
              <Grid item style={{ minWidth: 180 }}>
                {selectedSchedule?.session.SessionCode === currentFinalSessionCode && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleShowFinalExams}
                    fullWidth
                  >
                    Final Exam Schedule
                  </Button>
                )}
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
                    />
                  </Grid>
                </>
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
          term={selectedSchedule?.term}
        />
      )}
      <Dialog open={finalExamOpen} onClose={() => setFinalExamOpen(false)} maxWidth="md" fullWidth>
        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', px: 3, py: 2 }}>
          <Typography variant="h6">Final Exam Schedule</Typography>
        </Box>
        <DialogContent>
          {finalExamsLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
              <GordonLoader />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'info.light' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Course</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {finalExams.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No final exams found for this term.
                    </TableCell>
                  </TableRow>
                ) : (
                  finalExams.map((exam, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{exam.Event_Name}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.time}</TableCell>
                      <TableCell>{exam.Location}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFinalExamOpen(false)} color="primary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GordonSchedulePanel;
