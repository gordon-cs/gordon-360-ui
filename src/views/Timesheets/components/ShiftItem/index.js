//Representation of a shift
import React, { Component } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  Tooltip,
  DialogTitle,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { gordonColors } from '../../../../theme';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import './ShiftItem.css'
import GordonLoader from '../../../../components/Loader';
import SimpleSnackbar from '../../../../components/Snackbar';

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: 'rgba(255, 255, 255, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const PickerInput = (props) => {
  return (
  <>
    <TextField
      className='shift-edit-picker'
      {...props}
      variant={'outlined'}
      multiline
      rowsMax={2}
      />
  </>
  )
}

export default class ShiftItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteConfirmation: false,
      editing: false,
      newDateTimeIn: null,
      newDateTimeOut: null,
      newHoursWorked: null,
      dateInIsFuture: false,
      dateOutIsFuture: false,
      enteredFutureTime: false,
      errorText: '',
      isOverlappingShift: false,
      deleting: false,
      updating: false,
    };
    this.loaderSize = 20;
    this.snackbarText = '';
    this.snackbarSeverity = '';
  }

  componentDidUpdate(prevProps) {
    if (this.props.value.EML !== prevProps.value.EML) {
      this.setState({
        editing: false,
        newDateTimeIn: null,
        newDateTimeOut: null,
        newHoursWorked: null,
        dateInIsFuture: false,
        dateOutIsFuture: false,
        enteredFutureTime: false,
        errorText: '',
        isOverlappingShift: false,
      })
    }
  }

  handleDeleteButtonClick = () => {
    this.setState({ showDeleteConfirmation: true });
  }

  onClose = () => {
    this.setState({ showDeleteConfirmation: false });
  }

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing })
  }

  isLeapYear = date => {
    if (date.getFullYear() % 4 === 0) {
      if (date.getFullYear() % 100 === 0) {
        if (date.getFullYear() % 400 !== 0) {
          return false;
        }
        if (date.getFullYear() % 400 === 0) {
          return true;
        }
      }
      if (date.getFullYear() % 100 !== 0) {
        return true;
      }
    }
    if (date.getFullYear() % 4 !== 0) {
      return false;
    }
  };

  getNextDate = date => {
    let is30DayMonth =
      date.getMonth() === 3 ||
      date.getMonth() === 5 ||
      date.getMonth() === 8 ||
      date.getMonth() === 10;

    let isFebruary = date.getMonth() === 1;
    let isDecember = date.getMonth() === 11;
    let nextDate;
    let monthToReturn;
    let yearToReturn;

    if (isFebruary) {
      if (this.isLeapYear(date)) {
        if (date.getDate() === 29) {
          nextDate = 1;
          monthToReturn = 2;
          yearToReturn = date.getFullYear();
        } else {
          nextDate = date.getDate() + 1;
          monthToReturn = date.getMonth();
          yearToReturn = date.getFullYear();
        }
      } else if (date.getDate() === 28) {
        nextDate = 1;
        monthToReturn = 2;
        yearToReturn = date.getFullYear();
      } else {
        nextDate = date.getDate() + 1;
        monthToReturn = date.getMonth();
        yearToReturn = date.getFullYear();
      }
    } else if (isDecember) {
      if (date.getDate() === 31) {
        nextDate = 1;
        monthToReturn = 0;
        yearToReturn = date.getFullYear() + 1;
      } else {
        nextDate = date.getDate() + 1;
        monthToReturn = date.getMonth();
        yearToReturn = date.getFullYear();
      }
    } else if (is30DayMonth) {
      if (date.getDate() === 30) {
        nextDate = 1;
        monthToReturn = (date.getMonth() + 1) % 12;
        yearToReturn = date.getFullYear();
      } else {
        nextDate = date.getDate() + 1;
        monthToReturn = date.getMonth();
        yearToReturn = date.getFullYear();
      }
    } else if (!is30DayMonth) {
      if (date.getDate() === 31) {
        nextDate = 1;
        monthToReturn = (date.getMonth() + 1) % 12;
        yearToReturn = date.getFullYear();
      } else {
        nextDate = date.getDate() + 1;
        monthToReturn = date.getMonth();
        yearToReturn = date.getFullYear();
      }
    }

    return {
      date: nextDate,
      month: monthToReturn,
      year: yearToReturn,
    };
  };

  disableDisallowedDays = date => {
    let dayIn = this.state.newDateTimeIn;
    let nextDate = this.getNextDate(dayIn);
    let shouldDisableDate = !(
      (date.getDate() === dayIn.getDate() &&
        date.getMonth() === dayIn.getMonth() &&
        date.getYear() === dayIn.getYear()) ||
      (date.getDate() === nextDate.date &&
        date.getMonth() === nextDate.month &&
        date.getFullYear() === nextDate.year)
    );
    return shouldDisableDate;
  };

  checkForError = () => {
    let now = Date.now();
    let enteredFutureTime = false;
    let timeOutIsBeforeTimeIn = false
    let zeroLengthShift = false;
    let shiftTooLong = false;
    let isOverlappingShift = false;
    let timeDiff;
    let calculatedTimeDiff = timeDiff / 1000 / 60 / 60;
    if (this.state.newDateTimeIn && this.state.newDateTimeOut) {
      enteredFutureTime = (this.state.newDateTimeIn.getTime() > now) || (this.state.newDateTimeOut.getTime() > now);
      timeDiff = this.state.newDateTimeOut.getTime() - this.state.newDateTimeIn.getTime();
      calculatedTimeDiff = timeDiff / 1000 / 60 / 60;
      timeOutIsBeforeTimeIn = timeDiff < 0;
      zeroLengthShift = timeDiff === 0;
      shiftTooLong = calculatedTimeDiff > 20;
      let roundedHourDifference = 0;
      if (calculatedTimeDiff > 0 && calculatedTimeDiff < 0.25) {
        roundedHourDifference = 0.25;
      } else if (calculatedTimeDiff >= 0.25) {
        roundedHourDifference = (Math.round(calculatedTimeDiff * 4) / 4).toFixed(2);
      }

      this.setState({
        newHoursWorked: roundedHourDifference,
        dateInIsFuture: this.state.newDateTimeIn.getTime() > now,
        dateOutIsFuture: this.state.newDateTimeOut.getTime() > now,
        enteredFutureTime: enteredFutureTime,
      })
    }

    if (enteredFutureTime) {
      this.setState({errorText: 'Future time entered.'});
    } else if (timeOutIsBeforeTimeIn) {
      this.setState({errorText: 'A shift cannot end before it starts.'});
    } else if (zeroLengthShift) {
      this.setState({errorText: 'Shift has no length'});
    } else if (shiftTooLong) {
      this.setState({errorText: 'A shift cannot be longer than 20 hours.'});
    } else if (isOverlappingShift) {
      this.setState({errorText: 'The entered shift conflicts with a previous shift.'});
    }
    else {
      this.setState({errorText: ''});
    }
  }

  handleDateInChange = date => {
    this.setState({newDateTimeIn: date}, this.checkForError);
  }

  handleDateOutChange = date => {
    this.setState({newDateTimeOut: date}, this.checkForError);
  }

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarOpen: false })
  };

  onCheckButtonClick = () => {
    this.setState({ updating: true });
    // Split the shift if it spans pay week boundaries
    if (this.state.newDateTimeIn.getDay() === 6 && this.state.newDateTimeOut.getDay() === 0) {
      this.snackbarText = (
        'The edited shift crosses the pay week boundary. You must split it into two shifts, one that ends at 11:59 pm Saturday and one that begins at 12:00 am Sunday. Please edit/save your shifts to reflect this. '
      );
      this.snackbarSeverity = 'warning';
      this.setState({
        snackbarOpen: true,
        updating: false,
      });

    } else {
      this.props.editShift(this.props.value.ID, this.state.newDateTimeIn, this.state.newDateTimeOut, this.state.newHoursWorked)
        .then(() => {
          this.setState({
            editing: false,
            newDateTimeIn: null,
            newDateTimeOut: null,
            newHoursWorked: null,
            dateInIsFuture: false,
            dateOutIsFuture: false,
            enteredFutureTime: false,
            errorText: '',
            isOverlappingShift: false,
            updating: false,
          });
        })
        .catch(error => {
          this.setState({ updating: false });
          if (typeof (error) === 'string' && error.toLowerCase().includes('overlap')) {
            this.snackbarSeverity = 'warning';
            this.snackbarText = 'You have already entered hours that fall within this time frame. Please review the times you entered above and try again.';
          } else {
            this.snackbarSeverity = 'error';
            this.snackbarText = 'There was a problem updating the shift.';
          }
          this.setState({ snackbarOpen: true });
        });
    }
  };

  render() {
    const shift = this.props.value;
    const { deleteShift } = this.props;
    const {
      ID,
      EML_DESCRIPTION,
      SHIFT_START_DATETIME,
      SHIFT_END_DATETIME,
      SHIFT_NOTES,
      COMMENTS,
      HOURLY_RATE,
      HOURS_WORKED,
      STATUS,
    } = shift;
    const { errorText } = this.state;

    const monthIn = SHIFT_START_DATETIME.substring(5, 7);
    const dateIn = SHIFT_START_DATETIME.substring(8, 10);
    const timeIn = SHIFT_START_DATETIME.substring(11, 16);

    const monthOut = SHIFT_END_DATETIME.substring(5, 7);
    const dateOut = SHIFT_END_DATETIME.substring(8, 10);
    const timeOut = SHIFT_END_DATETIME.substring(11, 16);

    const dateTimeIn = monthIn + '/' + dateIn + "\n" + timeIn;
    const dateTimeOut = monthOut + '/' + dateOut + "\n" + timeOut;

    let timeInDisp;
    let timeOutDisp;
    let hoursWorkedDisp;
    if (this.state.editing) {
      timeInDisp = (
        <DateTimePicker
          variant="inline"
          disableFuture
          value={this.state.newDateTimeIn}
          onChange={this.handleDateInChange}
          format="MM/dd HH:mm"
          TextFieldComponent={PickerInput}
        />
      );
      timeOutDisp = (
        <DateTimePicker
          variant="inline"
          disableFuture
          value={this.state.newDateTimeOut}
          shouldDisableDate={this.disableDisallowedDays}
          onChange={this.handleDateOutChange}
          onClose={this.checkForError}
          format="MM/dd HH:mm"
          TextFieldComponent={PickerInput}
        />
      );
      hoursWorkedDisp = (<Typography variant="body2">{this.state.newHoursWorked}</Typography>)
    } else {
      timeInDisp = <Typography variant="body2">{dateTimeIn}</Typography>
      timeOutDisp = <Typography variant="body2">{dateTimeOut}</Typography>
      hoursWorkedDisp = <Typography variant="body2">{HOURS_WORKED.toFixed(2)}</Typography>
    }

    let confirmationBox = (
      <Grid container>
        <Grid item>
          <Dialog
            open={this.state.showDeleteConfirmation}
            keepMounted
            align="center"
            onBackdropClick={this.onClose}
          >
            <DialogTitle>Are you sure you want to delete this shift?</DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Button color="primary" onClick={this.onClose} variant="contained">
                    No
                  </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      this.setState({deleting: true});
                      deleteShift(ID, EML_DESCRIPTION).then(() => {
                        this.setState({deleting: false});
                      });
                      this.onClose();
                    }}
                    style={styles.redButton}>
                    Yes
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    );

    let loaderButton = (
      <IconButton disabled>
        <GordonLoader size={this.loaderSize} />
      </IconButton>
    )
    let deleteButton = (
      <IconButton onClick={this.handleDeleteButtonClick}>
        <DeleteForeverOutlinedIcon style={{ color: gordonColors.secondary.red }} />
      </IconButton>
    );
    if (this.state.deleting) {
      
      deleteButton = loaderButton;
    }

    let checkButton = (
      <IconButton
        disabled={errorText !== ''}
        onClick={this.onCheckButtonClick}>
        <CheckOutlinedIcon style={{ color: 'green' }} />
      </IconButton>
    );
    if (this.state.updating) {
      checkButton = loaderButton;
    }
    
    let shiftItemIcons;
    if (STATUS === 'Saved' || STATUS === 'Rejected') {
      if (this.state.editing) {
        shiftItemIcons = (
          <Grid container direction='row'>
            <Grid item xs={12} md={6}>
              {checkButton}
            </Grid>
            <Grid item xs={12} md={6}>
              <IconButton onClick={this.toggleEditing}>
                <ClearOutlinedIcon
                  style={{color: gordonColors.secondary.red}}
                />
              </IconButton>
            </Grid>
          </Grid>
        )
      } else {
        shiftItemIcons = (
          <Grid container direction='row'>
            <Grid item xs={12} md={6}>
              <IconButton
                  onClick={() => {
                    this.setState({
                      editing: !this.state.editing,
                      newDateTimeIn: new Date(SHIFT_START_DATETIME),
                      newDateTimeOut: new Date(SHIFT_END_DATETIME),
                      newHoursWorked: HOURS_WORKED.toFixed(2),
                    })
                  }}>
                <EditOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} md={6}>
              {deleteButton}
            </Grid>
          </Grid>
        );
      }
    } else {
      shiftItemIcons = (
        <IconButton style={{ visibility: 'hidden' }}>
          <DeleteForeverOutlinedIcon />
        </IconButton>
      );
    }
    
    let shiftNotesTooltip = <></>;
    if (SHIFT_NOTES !== '') {
      shiftNotesTooltip = (
        <CustomTooltip
          disableFocusListener
          disableTouchListener
          className='tooltip-icon'
          title={'Shift note: ' + SHIFT_NOTES}
          placement='top'>
          <MessageOutlinedIcon style={{
            fontSize: 16
            }} />
        </CustomTooltip>
      )
    }

    let shiftCommentTooltip = <></>;
    if (COMMENTS) {
      shiftCommentTooltip = (
        <CustomTooltip
          disableFocusListener
          disableTouchListener
          className='tooltip-icon'
          title={COMMENTS}
          placement='top'>
          <InfoOutlinedIcon style={{ fontSize: 16 }}/>
        </CustomTooltip>
      )
    }

    let descColumn = errorText === '' ? (
      <Typography variant="body2">{EML_DESCRIPTION}</Typography>
    ) : (
      <Typography style={{color: gordonColors.secondary.red}} variant="body2">{errorText}</Typography>
    );

    return (
      <>
        <Grid item xs={12} className="shift-item">
          {confirmationBox}
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={3}>
                  <div className='tooltip-container'>
                    <Typography className='disable-select' variant="body2">{descColumn}</Typography>
                    {shiftCommentTooltip}
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <Typography className='disable-select' variant="body2">{timeInDisp}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography className='disable-select' variant="body2">{timeOutDisp}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography className='disable-select' variant="body2">{HOURLY_RATE.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <div className='tooltip-container'>
                    <Typography className='disable-select' variant="body2">{hoursWorkedDisp}</Typography>
                    {shiftNotesTooltip}
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2">
                    {shiftItemIcons}
                  </Typography>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
        </Grid>
        <SimpleSnackbar
          text={this.snackbarText}
          severity={this.snackbarSeverity}
          open={this.state.snackbarOpen}
          onClose={this.handleCloseSnackbar} />
      </>
    );
  }
}

const styles = {
  redButton: {
    background: gordonColors.secondary.red,
    color: 'white',
  },
}
