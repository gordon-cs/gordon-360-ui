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
import styles from './ScheduleHeader.module.css';
import scheduleService, { getTermId, Term } from 'services/schedule';
import { isAfter, startOfToday } from 'date-fns';

type Props = {
  username: string;
  myProf: boolean;
};

const scheduleOpenKey = 'profile.schedule.isOpen';
const GordonSchedulePanel = ({ username, myProf }: Props) => {
  const [loading, setLoading] = useState(true);
  const [terms, setTerms] = useState<Term[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<Term | undefined>();
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(
    localStorage.getItem(scheduleOpenKey) !== 'false',
  );

  useEffect(() => {
    const loadTermsAndCourses = async () => {
      setLoading(true);

      const terms = await scheduleService.getTerms(username);
      setTerms(terms);

      const currentTerm = terms.find((term) => isAfter(new Date(term.Start), startOfToday()));
      // Term defaults to the current term, or else the most recent term
      const defaultTerm = currentTerm ?? terms.at(0);

      setSelectedTerm(defaultTerm);

      setLoading(false);
    };

    loadTermsAndCourses();
  }, [username]);
  const toggleIsScheduleOpen = () => {
    setIsScheduleOpen((wasOpen) => {
      localStorage.setItem(scheduleOpenKey, String(!wasOpen));
      return !wasOpen;
    });
  };

  // Don't display Schedule Panel when there are no terms with course schedules
  if (terms?.length < 1) return null;

  const handleSelectTerm = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTerm = terms.find((t) => getTermId(t) === event.target.value);
    setSelectedTerm(selectedTerm);
  };

  return (
    <Accordion
      expanded={isScheduleOpen}
      onChange={toggleIsScheduleOpen}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
        aria-controls="schedule"
        id="schedule-header"
        className={`gc360_header ${styles.accordionHeader}`}
      >
        <CardHeader title={'Course Schedule'} />
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
                value={selectedTerm ? getTermId(selectedTerm) : ''}
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
                      Click a course to add it to your calendar
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} lg={10}>
                  <GordonScheduleCalendar
                    term={selectedTerm}
                    username={username}
                    isPersonalProfile={myProf}
                  />
                </Grid>
              </>
            )}
          </Grid>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default GordonSchedulePanel;
