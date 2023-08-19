import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import GordonLimitedAvailability from 'components/GordonLimitedAvailability';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthenticated from 'components/GordonUnauthenticated';
import GordonLoader from 'components/Loader';
import SimpleSnackbar from 'components/Snackbar';
import { isValid, set } from 'date-fns';
import { useNetworkStatus, useUser } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import jobsService from 'services/jobs';
import ShiftDisplay from './components/ShiftDisplay';
import styles from './Timesheets.module.css';
import { theme360 } from 'theme';

const MINIMUM_SHIFT_LENGTH = 0.08; // Minimum length for a shift is 5 minutes, 1/12 hour
const MILLISECONDS_PER_HOUR = 3600000;

const withNoSeconds = (date) => set(date, { seconds: 0, milliseconds: 0 });

const Timesheets = (props) => {
  const [userJobs, setUserJobs] = useState([]);
  const [selectedDateIn, setSelectedDateIn] = useState(null);
  const [selectedDateOut, setSelectedDateOut] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [hoursWorkedInDecimal, setHoursWorkedInDecimal] = useState(0.0);
  const [userShiftNotes, setUserShiftNotes] = useState('');
  const [shiftDisplayComponent, setShiftDisplayComponent] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [clockInOut, setClockInOut] = useState('Clock In');
  const [isUserStudent, setIsUserStudent] = useState(true);
  const [errorText, setErrorText] = useState(null);
  const isOnline = useNetworkStatus();
  const { profile, loading } = useUser();

  useEffect(() => {
    if (profile) {
      setIsUserStudent(profile.PersonType.includes('stu'));
    }
  }, [profile]);

  useEffect(() => {
    async function getClockInOutStatus() {
      try {
        let status = await jobsService.clockOut();

        if (status[0].currentState) {
          setClockInOut('Clock Out');

          setSelectedDateIn(withNoSeconds(new Date(status[0].timestamp)));
        } else {
          setClockInOut('Clock In');
        }
      } catch (error) {
        //do nothing
      }
    }

    if (profile) {
      getClockInOutStatus();
    }
  }, [profile]);

  useEffect(() => {
    const loadJobs = async () => {
      const areShiftTimesValid = validateShiftTimes(selectedDateIn, selectedDateOut);
      if (areShiftTimesValid) {
        const jobs = await jobsService.getJobs(selectedDateIn, selectedDateOut);
        setUserJobs(jobs);
      }
    };
    loadJobs();
  }, [selectedDateIn, selectedDateOut]);

  const validateShiftTimes = (timeIn, timeOut) => {
    if (timeIn === null || timeOut === null) {
      setErrorText(null);
      return false;
    }

    if (!isValid(timeIn)) {
      setErrorText('Start time is not a valid date.');
      return false;
    }

    if (!isValid(timeOut)) {
      setErrorText('End time is not a valid date.');
      return false;
    }

    const now = Date.now();
    if (timeIn.getTime() > now || timeOut.getTime() > now) {
      setErrorText('A shift cannot begin or end in the future.');
      return false;
    }

    const shiftLength = timeOut.getTime() - timeIn.getTime();

    if (shiftLength < 0) {
      setErrorText('A shift cannot end before it starts.');
      return false;
    }

    if (shiftLength === 0) {
      setErrorText('The entered shift has zero length.');
      return false;
    }

    const shiftLengthInHours = shiftLength / MILLISECONDS_PER_HOUR;

    if (shiftLengthInHours > 20) {
      setErrorText('A shift cannot be longer than 20 hours.');
      return false;
    }

    setErrorText(null);

    let roundedShiftLength = (Math.round(shiftLengthInHours * 12) / 12).toFixed(2);
    if (roundedShiftLength < MINIMUM_SHIFT_LENGTH) {
      roundedShiftLength = MINIMUM_SHIFT_LENGTH;
    }
    setHoursWorkedInDecimal(roundedShiftLength);

    return true;
  };

  const tooltipRef = useRef();

  if (!isOnline) {
    return <GordonOffline feature="Timesheets" />;
  }

  if (loading) {
    return <GordonLoader />;
  }

  if (!profile) {
    return <GordonUnauthenticated feature={'timesheets'} />;
  }

  if (!isUserStudent) {
    // return <GordonLimitedAvailability pageName="TimeSheets" />;
  }

  const handleSaveButtonClick = () => {
    let timeIn = selectedDateIn;
    let timeOut = selectedDateOut;
    setSaving(true);

    if (selectedDateIn.getDay() === 6 && selectedDateOut.getDay() === 0) {
      let timeOut2 = new Date(timeOut.getTime());
      let timeIn2 = new Date(timeOut.getTime());
      timeIn2.setHours(0);
      timeIn2.setMinutes(0);

      timeOut.setDate(timeIn.getDate());
      timeOut.setHours(23);
      timeOut.setMinutes(59);

      let timeDiff2 = timeOut2.getTime() - timeIn2.getTime();
      let calculatedTimeDiff2 = timeDiff2 / MILLISECONDS_PER_HOUR;
      let roundedHourDifference2 = (Math.round(calculatedTimeDiff2 * 12) / 12).toFixed(2);
      if (roundedHourDifference2 < MINIMUM_SHIFT_LENGTH) {
        roundedHourDifference2 = MINIMUM_SHIFT_LENGTH; //minimum 1/12th hour (5 minutes) for working a shift.
      }

      // Do not save the shift if it has zero length
      if (calculatedTimeDiff2 > 0) {
        saveShift(
          selectedJob.EMLID,
          timeIn2,
          timeOut2,
          roundedHourDifference2,
          userShiftNotes,
          profile.AD_Username,
        )
          .then(() => {
            setSnackbarSeverity('info');
            setSnackbarText(
              'Your entered shift spanned two pay weeks, so it was automatically split into two shifts.',
            );
            setSnackbarOpen(true);
          })
          .catch((err) => {
            console.log(err);
            setSaving(false);
            if (typeof err === 'string' && err.toLowerCase().includes('overlap')) {
              setSnackbarText(
                'The shift was automatically split because it spanned a pay week, but one of the two derived shifts conflicted with a previously entered one. Please review your saved shifts.',
              );
              setSnackbarSeverity('error');
              setSnackbarOpen(true);
            } else if (err?.Message?.toLowerCase()?.includes('invalid shift times')) {
              setSnackbarText(
                'There was a problem saving your shift. Double check your shift start time and end time, and contact CTS if the problem persists.',
              );
              setSnackbarSeverity('error');
              setSnackbarOpen(true);
            } else {
              setSnackbarText('There was a problem saving the shift.');
              setSnackbarSeverity('error');
              setSnackbarOpen(true);
            }
          });
      }
    }

    let timeDiff1 = timeOut.getTime() - timeIn.getTime();
    let calculatedTimeDiff = timeDiff1 / MILLISECONDS_PER_HOUR;
    let roundedHourDifference = (Math.round(calculatedTimeDiff * 12) / 12).toFixed(2);
    if (roundedHourDifference < MINIMUM_SHIFT_LENGTH) {
      roundedHourDifference = MINIMUM_SHIFT_LENGTH; //minimum 1/12th hour (5 minutes) for working a shift.
    }

    saveShift(
      selectedJob.EMLID,
      timeIn,
      timeOut,
      roundedHourDifference,
      userShiftNotes,
      profile.AD_Username,
    )
      .then((result) => {
        shiftDisplayComponent.loadShifts();
        setSelectedDateOut(null);
        setSelectedDateIn(null);
        setUserShiftNotes('');
        setUserJobs([]);
        setHoursWorkedInDecimal(0);
        setSaving(false);
      })
      .catch((err) => {
        setSaving(false);
        console.log(err);
        if (typeof err === 'string' && err.toLowerCase().includes('overlap')) {
          setSnackbarText(
            'You have already entered hours that fall within this time frame. Please review the times you entered above and try again.',
          );
          setSnackbarSeverity('warning');
          setSnackbarOpen(true);
        } else if (err?.Message?.toLowerCase()?.includes('invalid shift times')) {
          setSnackbarText(
            'There was a problem saving your shift. Double check your shift start time and end time, and contact CTS if the problem persists.',
          );
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        } else {
          setSnackbarText('There was a problem saving the shift.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      });
  };

  const saveShift = async (eml, shiftStart, shiftEnd, hoursWorked, shiftNotes, lastChangedBy) => {
    await jobsService.saveShiftForUser(
      eml,
      shiftStart,
      shiftEnd,
      hoursWorked,
      shiftNotes,
      lastChangedBy,
    );
  };

  const jobsMenuItems = userJobs ? (
    userJobs.map((job) => (
      <MenuItem label={job.POSTITLE} value={job} key={job.EMLID}>
        {job.POSTITLE}
      </MenuItem>
    ))
  ) : (
    <></>
  );

  const changeState = async () => {
    if (clockInOut === 'Clock In') {
      setClockInOut('Clock Out');
      await jobsService.clockIn(true);
      setSelectedDateIn(withNoSeconds(new Date()));
    }
    if (clockInOut === 'Clock Out') {
      setClockInOut('Reset');
      await jobsService.clockIn(false);
      setSelectedDateOut(withNoSeconds(new Date()));
      await jobsService.deleteClockIn();
    }
    if (clockInOut === 'Reset') {
      setClockInOut('Clock In');
      setSelectedDateIn(null);
      setSelectedDateOut(null);
      setHoursWorkedInDecimal(0);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const jobDropdown = (
    <FormControl
      disabled={userJobs === null || userJobs.length === 0}
      style={{
        width: 252,
      }}
    >
      <InputLabel className="disable_select">Jobs</InputLabel>
      <Select
        value={selectedJob ?? ''}
        onChange={(e) => {
          setSelectedJob(e.target.value);
        }}
        input={<Input id="job" />}
      >
        <MenuItem label="None" value="">
          <em>None</em>
        </MenuItem>
        {jobsMenuItems}
      </Select>
    </FormControl>
  );

  const handleShiftNotesChanged = (event) => {
    setUserShiftNotes(event.target.value);
  };

  const saveButton = saving ? (
    <GordonLoader size={32} />
  ) : (
    <Button
      disabled={
        errorText ||
        selectedDateIn === null ||
        selectedDateOut === null ||
        selectedJob === null ||
        selectedJob === ''
      }
      variant="contained"
      color="primary"
      onClick={handleSaveButtonClick}
    >
      Save
    </Button>
  );

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container>
          <Card>
            <CardHeader title="Timesheets is moving!" />
            <CardContent>
              <Typography>
                Timesheets is moving from Gordon 360 to{' '}
                <a
                  class="gc360_text_link"
                  href="https://gordon.criterionhcm.com/ui/#"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Criterion
                </a>
                . All timesheets for August 20th or later must be entered in Criterion.
              </Typography>
            </CardContent>
          </Card>
        </Container>
        <Grid container spacing={2} className={styles.timesheets}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={
                  <Grid item alignItems="center">
                    <div className={styles.header_tooltip_container}>
                      <Tooltip
                        classes={{ tooltip: styles.tooltip }}
                        disableFocusListener
                        disableTouchListener
                        title={
                          // eslint-disable-next-line no-multi-str
                          'Student employees are not permitted to work more than 20 total hours\
                      per work week, or more than 40 hours during winter, spring, and summer breaks.\
                      \
                      To request permission for a special circumstance, please email\
                      student-employment@gordon.edu before exceeding this limit.'
                        }
                        placement="bottom"
                      >
                        <div ref={tooltipRef}>
                          <CardHeader className="disable_select" title="Enter a shift" />
                          <InfoOutlinedIcon
                            className={styles.tooltip_icon}
                            style={{
                              fontSize: 18,
                            }}
                          />
                        </div>
                      </Tooltip>
                    </div>
                  </Grid>
                }
                className="gc360_header"
              ></CardHeader>
              <CardContent
                style={{
                  marginLeft: 8,
                  marginTop: 8,
                }}
              >
                <Grid container spacing={2} alignItems="center" alignContent="center">
                  <Grid item md={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={changeState}
                      className={styles.clockInOutButton}
                    >
                      {' '}
                      {clockInOut}
                    </Button>
                  </Grid>
                </Grid>
                <br />
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                  alignContent="center"
                >
                  <Grid item xs={12} md={6} lg={3}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Start Time"
                      value={selectedDateIn}
                      onChange={setSelectedDateIn}
                      className="disable_select"
                      PopperProps={{
                        //Style overrides for the dateTimePicker, fixes dark mode
                        sx: {
                          '& .MuiDayPicker-weekDayLabel': {
                            color: theme360.vars.palette.neutral.contrastText,
                          },
                          '& .MuiPickersDay-root': {
                            backgroundColor: theme360.vars.palette.neutral.light,
                            color: theme360.vars.palette.neutral.contrastText,
                          },
                          '& .MuiPickersDay-root:hover': {
                            backgroundColor: theme360.vars.palette.neutral.main,
                          },
                          '& .MuiPickersDay-root:disabled': {
                            backgroundColor: theme360.vars.palette.neutral.main,
                          },
                          '& .MuiClockNumber-root': {
                            color: theme360.vars.palette.neutral.contrastText,
                          },
                        },
                      }}
                      disableFuture
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="End Time"
                      value={selectedDateOut ?? selectedDateIn}
                      onChange={setSelectedDateOut}
                      className="disable_select"
                      PopperProps={{
                        //Style overrides for the dateTimePicker, fixes dark mode
                        sx: {
                          '& .MuiDayPicker-weekDayLabel': {
                            color: theme360.vars.palette.neutral.contrastText,
                          },
                          '& .MuiPickersDay-root': {
                            backgroundColor: theme360.vars.palette.neutral.light,
                            color: theme360.vars.palette.neutral.contrastText,
                          },
                          '& .MuiPickersDay-root:hover': {
                            backgroundColor: theme360.vars.palette.neutral.main,
                          },
                          '& .MuiPickersDay-root:disabled': {
                            backgroundColor: theme360.vars.palette.neutral.main,
                          },
                          '& .MuiClockNumber-root': {
                            color: theme360.vars.palette.neutral.contrastText,
                          },
                          '& .PrivatePickersToolbarText-root': {
                            color: theme360.vars.palette.neutral.contrastText,
                          },
                        },
                      }}
                      disableFuture
                      showToolbar={true}
                      disabled={selectedDateIn === null}
                      minDateTime={selectedDateIn}
                      openTo="hours"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    {jobDropdown}
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      className="disable_select"
                      style={{
                        width: 252,
                      }}
                      label="Shift Notes"
                      multiline
                      maxRows="3"
                      value={userShiftNotes}
                      onChange={handleShiftNotesChanged}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <Typography className="disable_select">
                      Hours worked: {hoursWorkedInDecimal}
                    </Typography>
                  </Grid>
                  {errorText && (
                    <Grid item xs={12}>
                      <Typography variant="overline" color="error">
                        {errorText}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    {saveButton}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={'disable_select'}>
                      <Link
                        className="gc360_text_link"
                        href="https://reports.gordon.edu/Reports/Pages/Report.aspx?ItemPath=%2fStudent+Timesheets%2fPaid+Hours+By+Pay+Period"
                        underline="always"
                        target="_blank"
                        rel="noopener"
                      >
                        View historical paid time
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <ShiftDisplay ref={setShiftDisplayComponent} />
        </Grid>
      </LocalizationProvider>
      <SimpleSnackbar
        text={snackbarText}
        severity={snackbarSeverity}
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

const Notice = () => (
  <Container>
    <Card>
      <CardHeader title="Timesheets have moved" />
      <CardContent>
        <Typography>
          Student Timesheets are now located on{' '}
          <a
            class="gc360_text_link"
            href="https://gordon.criterionhcm.com/ui/#"
            target="_blank"
            rel="noreferrer noopener"
          >
            Criterion
          </a>
          . If you are attempting to enter time for a job worked prior to 8/20/23 please email{' '}
          <a
            class="gc360_text_link"
            href="mailto:payroll@gordon.edu"
            target="_blank"
            rel="noreferrer noopener"
          >
            Payroll@Gordon.edu
          </a>
          .
        </Typography>
      </CardContent>
    </Card>
  </Container>
);

const switchOverDate = new Date('2023-08-27 00:00');
const Component = () => (Date.now() > switchOverDate ? <Notice /> : <Timesheets />);

export default Component;
