import { useState, useEffect, ChangeEvent } from 'react';
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
import scheduleService, { CourseEvent, Term } from 'services/schedule';
import { Profile } from 'services/user';
import { compareDesc, isAfter, startOfToday } from 'date-fns';

type Props = {
  profile: Profile;
  myProf: boolean;
};

const GordonSchedulePanel = ({ profile, myProf }: Props) => {
  const [loading, setLoading] = useState(true);
  const [terms, setTerms] = useState<Term[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [courses, setCourses] = useState<CourseEvent[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseEvent | null>(null);

  useEffect(() => {
    setLoading(true);

    scheduleService.getTerms(profile.AD_Username).then((terms) => {
      setTerms(terms);

      const currentTerm = terms
        .toSorted((a, b) => compareDesc(new Date(a.Start), new Date(b.Start)))
        .find((term) => isAfter(new Date(term.Start), startOfToday()));
      const defaultTerm = currentTerm ?? terms[0];
      setSelectedTerm(defaultTerm);

      setLoading(false);
    });
  }, [profile.AD_Username]);

  const handleSelectTerm = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const selectedTerm =
      terms.find((t) => t.YearCode + t.TermCode + t.SubtermCode === event.target.value) ?? null;
    setSelectedTerm(selectedTerm);
    if (selectedTerm) {
      setLoading(true);
      scheduleService
        .getCourses(
          profile.AD_Username,
          selectedTerm.YearCode,
          selectedTerm.TermCode,
          selectedTerm.SubtermCode,
        )
        .then(setCourses)
        .then(() => setLoading(false));
    }
  };

  return (
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
        {loading ? (
          <GordonLoader />
        ) : (
          <Grid container justifyContent="center" spacing={4}>
            <Grid item xs={12} lg={3}>
              <TextField
                label="Term"
                id="schedule-session"
                value={
                  selectedTerm
                    ? selectedTerm.YearCode + selectedTerm.TermCode + selectedTerm.SubtermCode
                    : ''
                }
                onChange={handleSelectTerm}
                select
              >
                {terms.map(({ Description, YearCode, TermCode, SubtermCode }) => (
                  <MenuItem
                    value={YearCode + TermCode + SubtermCode}
                    key={YearCode + TermCode + SubtermCode}
                  >
                    {Description}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid lg={7}></Grid>
            {selectedTerm && (
              <>
                {myProf && (
                  <Grid item className={styles.addCalendarInfoText}>
                    <Typography className={styles.addCalendarInfoText}>
                      Click on Course to add Schedule to Personal Calendar
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} lg={10}>
                  <GordonScheduleCalendar
                    courses={courses}
                    termDescription={selectedTerm.Description}
                    onSelectEvent={setSelectedCourse}
                  />
                </Grid>
              </>
            )}
          </Grid>
        )}

        {selectedCourse && selectedTerm && (
          <ScheduleDialog
            onClose={() => setSelectedCourse(null)}
            course={selectedCourse}
            myProf={myProf}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default GordonSchedulePanel;
