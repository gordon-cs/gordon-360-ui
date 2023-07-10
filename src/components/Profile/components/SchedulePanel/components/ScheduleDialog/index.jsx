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

const ScheduleDialog = (props) => {
  return (
    <Dialog open={props.scheduleDialogOpen} keepMounted fullWidth={true} maxWidth="xs">
      <div>
        <DialogTitle className={styles.dialogTitle} align="center">
          Course Information
        </DialogTitle>
        <DialogContent>
          <Typography className={styles.dialogTextLarge} align="left">
            Title: {props.selectedCourseInfo?.title.split('in')[0]}
          </Typography>
          <Typography className={styles.dialogTextMedium} align="left">
            Room: {props.selectedCourseInfo?.title.split('in')[1]}
          </Typography>
          <Typography className={styles.dialogTextMedium} align="left">
            Time:
            {format(
              new Date(props.selectedCourseInfo ? props.selectedCourseInfo.start : null),
              " hh:mm aaaaa'm' ",
            )}
            -
            {format(
              new Date(props.selectedCourseInfo ? props.selectedCourseInfo.end : null),
              " hh:mm aaaaa'm' ",
            )}
          </Typography>
          <Typography className={styles.dialogTextMedium} align="left">
            Week Day(s): {props.recurringDays}
          </Typography>
          <Typography className={styles.dialogTextMedium} align="left">
            Term Date: {format(new Date(props.firstDay), 'yyyy-MM-dd')} to
            {format(new Date(props.lastDay), ' yyyy-MM-dd')}
          </Typography>
        </DialogContent>
        <DialogActions style={{ overflow: 'hidden', flexDirection: 'column' }}>
          {/* There are two separate add-to-calendar button elements because Google calendar is the only
          calendar that supports recurring events, the other add-to-calendar button is for the other
          options that users can choose and manually set the course as recurring */}

          <Grid container lg={12} xs={12}>
            {props.selectedCourseInfo && (
              <>
                <Grid item xs={1} lg={2}></Grid>
                <Grid item lg={2} align="right">
                  <add-to-calendar-button
                    name={props.selectedCourseInfo.title}
                    // We had to add 1 to the index for the resourceId because the setDay function
                    // starts at 0 for Sunday which we don't include in the course schedule
                    startDate={format(
                      setDay(
                        new Date(props.firstDay),
                        dayArr.indexOf(props.selectedCourseInfo?.resourceId) + 1,
                      ),
                      'yyyy-MM-dd',
                    )}
                    // By the nature of the add-to-calendar package, we have to set the startTime
                    // and endTime as null if they are all day events.
                    startTime={
                      props.selectedCourseInfo.allDay
                        ? null
                        : format(new Date(props.selectedCourseInfo?.start), 'HH:mm')
                    }
                    endTime={
                      props.selectedCourseInfo.allDay
                        ? null
                        : format(new Date(props.selectedCourseInfo?.end), 'HH:mm')
                    }
                    description={
                      props.selectedCourseInfo.allDay ? 'Asynchronous Course' : 'Synchronous Course'
                    }
                    Location={props.selectedCourseInfo.title.split('in')[1]}
                    options="'Google', 'Apple'"
                    buttonsList
                    hideTextLabelButton
                    buttonStyle="round"
                    recurrence={
                      'RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=' +
                      props.recurringDays +
                      ';UNTIL=' +
                      format(new Date(props.lastDay), 'yyyyMMdd')
                    }
                    lightMode="bodyScheme"
                    Timezone="currentBrowser"
                  ></add-to-calendar-button>
                </Grid>
                <Grid item lg={6} align="left">
                  <add-to-calendar-button
                    name={props.selectedCourseInfo.title}
                    startDate={format(
                      setDay(
                        new Date(props.firstDay),
                        dayArr.indexOf(props.selectedCourseInfo.resourceId) + 1,
                      ),
                      'yyyy-MM-dd',
                    )}
                    startTime={
                      props.selectedCourseInfo.allDay
                        ? null
                        : format(new Date(props.selectedCourseInfo.start), 'HH:mm')
                    }
                    endTime={
                      props.selectedCourseInfo.allDay
                        ? null
                        : format(new Date(props.selectedCourseInfo.end), 'HH:mm')
                    }
                    description={
                      props.selectedCourseInfo.allDay ? 'Asynchronous Course' : 'Synchronous Course'
                    }
                    Location={props.selectedCourseInfo.title.split('in')[1]}
                    options="'Apple', 'Outlook.com','MicrosoftTeams'"
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
