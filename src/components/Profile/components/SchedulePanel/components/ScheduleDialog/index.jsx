import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import 'add-to-calendar-button';
import { format, setDay } from 'date-fns';
import styles from './ScheduleDialog.module.css';

const dayArr = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

const formatter = (date, display, isAllDay) => {
  if (isAllDay) return null;

  return format(new Date(date), display);
};

const ScheduleDialog = (props) => {
  return (
    <Dialog open={props.scheduleDialogOpen} keepMounted fullWidth={true} maxWidth="xs">
      <div>
        {props.courseInfo && (
          <>
            <DialogTitle className={styles.dialogTitle} align="center">
              Course Information
            </DialogTitle>
            <DialogContent>
              <Typography className={styles.courseTitle} align="left">
                Title: {props.courseTitle}
              </Typography>
              <Typography className={styles.courseInfo} align="left">
                Room: {props.courseLocation}
              </Typography>
              <Typography className={styles.courseInfo} align="left">
                {props.courseInfo.allDay ? (
                  'Time: ASYNC'
                ) : (
                  <>
                    Time:
                    {formatter(props.courseStart, " hh:mm aaaaa'm' ")}-
                    {formatter(props.courseEnd, " hh:mm aaaaa'm' ")}
                  </>
                )}
              </Typography>
              <Typography className={styles.courseInfo} align="left">
                Week Day(s): {props.recurringDays}
              </Typography>
              <Typography className={styles.courseInfo} align="left">
                Term Date: {formatter(props.firstDay, 'yyyy-MM-dd')} to
                {formatter(props.lastDay, ' yyyy-MM-dd')}
              </Typography>
            </DialogContent>
          </>
        )}
        <DialogActions className={styles.DialogActions}>
          {/* There are two separate add-to-calendar button elements because Google calendar is the only
          calendar that supports recurring events, the other add-to-calendar button is for the other
          options that users can choose and manually set the course as recurring */}

          <Grid container lg={12} xs={12}>
            {props.courseInfo && (
              <>
                <Grid item xs={0} lg={1}></Grid>
                <Grid item lg={2} align="right">
                  <add-to-calendar-button
                    name={props.courseTitle}
                    // We had to add 1 to the index for the resourceId because the setDay function
                    // starts at 0 for Sunday which we don't include in the course schedule
                    startDate={formatter(
                      setDay(
                        new Date(props.firstDay),
                        dayArr.indexOf(props.courseInfo?.resourceId) + 1,
                      ),
                      'yyyy-MM-dd',
                    )}
                    // By the nature of the add-to-calendar package, we have to set the startTime
                    // and endTime as null if they are all day events.
                    startTime={formatter(props.courseStart, 'HH:mm', props.courseInfo.allDay)}
                    endTime={formatter(props.courseEnd, 'HH:mm', props.courseInfo.allDay)}
                    description={
                      props.courseInfo.allDay ? 'Asynchronous Course' : 'Synchronous Course'
                    }
                    Location={props.courseLocation}
                    options="'Google'"
                    buttonsList
                    hideTextLabelButton
                    buttonStyle="round"
                    recurrence={
                      'RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=' +
                      props.recurringDays +
                      ';UNTIL=' +
                      formatter(props.lastDay, 'yyyyMMdd')
                    }
                    lightMode="bodyScheme"
                    Timezone="currentBrowser"
                  ></add-to-calendar-button>
                </Grid>
                <Grid item lg={8} align="left">
                  <add-to-calendar-button
                    name={props.courseTitle}
                    startDate={format(
                      setDay(
                        new Date(props.firstDay),
                        dayArr.indexOf(props.courseInfo.resourceId) + 1,
                      ),
                      'yyyy-MM-dd',
                    )}
                    startTime={formatter(props.courseStart, 'HH:mm', props.courseInfo.allDay)}
                    endTime={formatter(props.courseEnd, 'HH:mm', props.courseInfo.allDay)}
                    description={
                      props.courseInfo.allDay ? 'Asynchronous Course' : 'Synchronous Course'
                    }
                    Location={props.courseLocation}
                    options="'Microsoft 365','Apple', 'Outlook.com','MicrosoftTeams'"
                    buttonsList
                    hideTextLabelButton
                    buttonStyle="round"
                    lightMode="bodyScheme"
                    Timezone="currentBrowser"
                  ></add-to-calendar-button>
                </Grid>
              </>
            )}
          </Grid>
          <Grid className={styles.cancelButton}>
            <Button onClick={props.handleScheduleDialogClose} variant="contained">
              Cancel
            </Button>
          </Grid>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ScheduleDialog;
