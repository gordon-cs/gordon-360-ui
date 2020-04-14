import React, { Component } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { gordonColors } from '../../../../theme';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import './ShiftItem.css';

const PickerInput = (props) => {
  return (
  <>
    <TextField
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
      dateTimeIn: null,
      dateTimeOut: null,
      dateInIsFuture: false,
      dateOutIsFuture: false,
      enteredFutureTime: false,
      errorText: '',
      isOverlappingShift: false,
    };
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
    let dayIn = this.state.dateTimeIn;
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
    if (this.state.dateTimeIn && this.state.dateTimeOut) {
      enteredFutureTime = (this.state.dateTimeIn.getTime() > now) || (this.state.dateTimeOut.getTime() > now);
      timeDiff = this.state.dateTimeOut.getTime() - this.state.dateTimeIn.getTime();
      timeOutIsBeforeTimeIn = timeDiff < 0;
      zeroLengthShift = timeDiff === 0;
      shiftTooLong = timeDiff / 1000 / 60 / 60 > 20;

      this.setState({
        dateInIsFuture: this.state.dateTimeIn.getTime() > now,
        dateOutIsFuture: this.state.dateTimeOut.getTime() > now,
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

    console.log(enteredFutureTime, timeOutIsBeforeTimeIn, zeroLengthShift, shiftTooLong, isOverlappingShift, timeDiff);
    console.log(this.state.errorText);
  }



  handleDateInChange = date => {
    this.setState({dateTimeIn: date}, this.checkForError);
  }

  handleDateOutChange = date => {
    this.setState({dateTimeOut: date}, this.checkForError);
  }

  render() {
    const shift = this.props.value;
    const { deleteShift } = this.props;
    const {
      ID,
      EML_DESCRIPTION,
      SHIFT_START_DATETIME,
      SHIFT_END_DATETIME,
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
    if (this.state.editing) {
      timeInDisp = (
        <DateTimePicker
          variant="inline"
          disableFuture
          value={this.state.dateTimeIn}
          onChange={this.handleDateInChange}
          format="MM/dd HH:mm"
          TextFieldComponent={PickerInput}
        />
      )
    } else {
      timeInDisp = <Typography variant="body2">{dateTimeIn}</Typography>
    }

    let timeOutDisp;
    if (this.state.editing) {
      timeOutDisp = (
        <DateTimePicker
          variant="inline"
          disableFuture
          value={this.state.dateTimeOut}
          shouldDisableDate={this.disableDisallowedDays}
          onChange={this.handleDateOutChange}
          onClose={this.checkForError}
          format="MM/dd HH:mm"
          TextFieldComponent={PickerInput}
        />
      )
    } else {
      timeOutDisp = <Typography variant="body2">{dateTimeOut}</Typography>
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
                      deleteShift(ID, EML_DESCRIPTION);
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
    
    let shiftItemIcons;
    console.log(errorText !== '')
    if (STATUS === 'Saved' || STATUS === 'Rejected') {
      if (this.state.editing) {
        shiftItemIcons = (
          <Grid container direction='row'>
            <Grid item xs={12} md={6}>
              <IconButton disabled={errorText !== ''}>
                <CheckOutlinedIcon style={{color: 'green'}} />
              </IconButton>
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
                      dateTimeIn: new Date(SHIFT_START_DATETIME),
                      dateTimeOut: new Date(SHIFT_END_DATETIME),
                    })
                  }}>
                <EditOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <IconButton onClick={this.handleDeleteButtonClick}>
                <DeleteForeverOutlinedIcon
                />
              </IconButton>
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

    let descColumn = errorText === '' ? (
      <Typography variant="body2">{EML_DESCRIPTION}</Typography>
    ) : (
      <Typography variant="body2">{errorText}</Typography>
    );

    return (
      <Grid item xs={12} className="shift-item">
        {confirmationBox}
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={3}>
                <Typography variant="body2">{descColumn}</Typography>
              </Grid>
              <Grid item xs={2}>
                {timeInDisp}
              </Grid>
              <Grid item xs={2}>
                {timeOutDisp}
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">{HOURLY_RATE}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">{HOURS_WORKED}</Typography>
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
    );
  }
}

const styles = {
  redButton: {
    background: gordonColors.secondary.red,
    color: 'white',
  },
}
