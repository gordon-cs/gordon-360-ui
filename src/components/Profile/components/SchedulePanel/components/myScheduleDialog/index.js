import React, { Fragment } from 'react';

import { gordonColors } from 'theme';
import myschedule from 'services/myschedule';
import {
  FormHelperText,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormGroup,
  TextField,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { KeyboardTimePicker } from '@material-ui/pickers';

// Default values
const STARTHOUR = '08:00';
const ENDHOUR = '17:00';

export default class MyScheduleDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startHourInput: STARTHOUR,
      endHourInput: ENDHOUR,
      myScheduleOpen: false,
      checkedC: false,
      checkedDayofWeek: {
        checkedMo: false,
        checkedTu: false,
        checkedWe: false,
        checkedTh: false,
        checkedFr: false,
        checkedSa: false,
        checkedSu: false,
      },
      selectedEvent: null,
      descriptionInput: '',
      locationInput: '',
      descriptionValid: false,
      locationValid: false,
      startHourValid: true,
      endHourValid: true,
      formValid: false,
      checkedValid: false,
      formErrors: {
        descriptionInput: '',
        locationInput: '',
        checkedInput: '',
        startHourValid: '',
        endHourValid: '',
      },
    };
    this.handleMyScheduleClose = this.handleMyScheduleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Case : Edit(doubleclick)
    if (nextProps.selectedEvent && this.state.selectedEvent !== nextProps.selectedEvent) {
      this.setState({ selectedEvent: nextProps.selectedEvent }, () => {
        myschedule
          .getMyScheduleEventId(this.state.selectedEvent.id)
          .then((event) => {
            this.checkDay(event);
            this.checkTime(event);
            let eventDescLoc = this.state.selectedEvent.title.split(' in ');
            this.setState({
              descriptionInput: eventDescLoc[0],
              locationInput: eventDescLoc[1],
              descriptionValid: true,
              locationValid: true,
              startHourValid: true,
              endHourValid: true,
              formValid: true,
              checkedValid: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
      // Case : Add(selecslot)
    } else {
      this.handleReset();
      this.setState({
        checkedDayofWeek: {
          checkedSu: nextProps.resourceId === 1 ? true : false,
          checkedMo: nextProps.resourceId === 2 ? true : false,
          checkedTu: nextProps.resourceId === 3 ? true : false,
          checkedWe: nextProps.resourceId === 4 ? true : false,
          checkedTh: nextProps.resourceId === 5 ? true : false,
          checkedFr: nextProps.resourceId === 6 ? true : false,
          checkedSa: nextProps.resourceId === 7 ? true : false,
        },
        startHourInput: nextProps.startTime,
        endHourInput: nextProps.endTime,
        checkedValid: true,
        startHourValid: true,
        endHourValid: true,
      });
    }
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let descriptionValid = this.state.descriptionValid;
    let locationValid = this.state.locationValid;
    let startHourValid = this.state.startHourValid;
    let endHourValid = this.state.endHourValid;

    // Require that content has appropriate size and format
    switch (fieldName) {
      case 'descriptionInput':
        descriptionValid = value.trim() !== '' && value.length < 50;
        fieldValidationErrors.descriptionInput = descriptionValid ? '' : 'Description is not Valid';
        break;
      case 'locationInput':
        locationValid = value.trim() !== '' && value.length < 50;
        fieldValidationErrors.locationInput = locationValid ? '' : 'Location is not Valid';
        break;
      case 'startHourInput':
        startHourValid =
          value.trim() !== '' &&
          parseInt(this.state.endHourInput, 10) > parseInt(value, 10) &&
          parseInt(value.trim(), 10) > 5 &&
          parseInt(value.trim(), 10) <= 22;
        fieldValidationErrors.startHourInput = startHourValid ? '' : 'Start Time is not Valid';
        endHourValid =
          this.state.endHourInput.trim() !== '' &&
          parseInt(value.trim(), 10) < parseInt(this.state.endHourInput.trim(), 10) &&
          parseInt(this.state.endHourInput.trim(), 10) > 5 &&
          parseInt(this.state.endHourInput.trim(), 10) <= 22;
        fieldValidationErrors.endHourInput = endHourValid ? '' : 'End Time is not Valid';
        break;
      case 'endHourInput':
        startHourValid =
          this.state.startHourInput.trim() !== '' &&
          parseInt(value.trim(), 10) > parseInt(this.state.startHourInput.trim(), 10) &&
          parseInt(this.state.startHourInput.trim(), 10) > 5 &&
          parseInt(this.state.startHourInput.trim(), 10) <= 22;
        fieldValidationErrors.startHourInput = startHourValid ? '' : 'Start Time is not Valid';
        endHourValid =
          value.trim() !== '' &&
          parseInt(this.state.startHourInput, 10) < parseInt(value.trim(), 10) &&
          parseInt(value.trim(), 10) > 5 &&
          parseInt(value.trim(), 10) <= 22;
        fieldValidationErrors.endHourInput = endHourValid ? '' : 'End Time is not Valid';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        descriptionValid: descriptionValid,
        locationValid: locationValid,
        startHourValid: startHourValid,
        endHourValid: endHourValid,
      },
      () => {
        this.validateForm();
      },
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.locationValid &&
        this.state.descriptionValid &&
        this.state.startHourValid &&
        this.state.endHourValid &&
        this.state.checkedValid,
    });
    console.log('Form Valid ', this.state.formValid);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var mySchedule = {
      startHour: this.state.startHourInput,
      endHour: this.state.endHourInput,
      location: this.state.locationInput,
      description: this.state.descriptionInput,
      monday: this.state.checkedDayofWeek.checkedMo,
      tuesday: this.state.checkedDayofWeek.checkedTu,
      wednesday: this.state.checkedDayofWeek.checkedWe,
      thursday: this.state.checkedDayofWeek.checkedTh,
      friday: this.state.checkedDayofWeek.checkedFr,
      saturday: this.state.checkedDayofWeek.checkedSa,
      sunday: this.state.checkedDayofWeek.checkedSu,
      allDay: this.state.checkedC,
    };
    this.props.onDialogSubmit(mySchedule);

    this.handleClose();
  };

  validateCheck = (dayofWeek) => {
    let fieldValidationErrors = this.state.formErrors;
    var valid = false;
    for (let day in dayofWeek) {
      if (dayofWeek[day]) {
        valid = true;
      }
    }
    fieldValidationErrors.checkedInput = valid ? '' : 'At least one day has to be checked';
    this.setState({ checkedValid: valid, formErrors: fieldValidationErrors }, () => {
      this.validateForm();
    });
  };

  handlePickerChange = (name) => (date, value) => {
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleChange = (name) => (e) => {
    let value = e.target.value;
    this.setState({ [name]: e.target.value }, () => {
      this.validateField(name, value);
    });
  };

  handleCheckboxChange = (name) => (e) => {
    if (name === 'checkedC') {
      this.setState({ checkedC: e.target.checked });
      if (e.target.checked) {
        // if allday checked
        this.setState({
          formValid:
            this.state.locationValid && this.state.descriptionValid && this.state.checkedValid,
          startHourValid: true,
          endHourValid: true,
        });
      } else {
        // if allday unchecked
        this.validateField('startHourInput', this.state.startHourInput);
        this.validateField('endHourInput', this.state.endHourInput);
      }
    } else {
      var dayofWeek = this.state.checkedDayofWeek;
      dayofWeek[name] = e.target.checked;

      this.validateCheck(dayofWeek);
      this.setState({ checkedDayofWeek: dayofWeek });
    }
  };

  handleMyScheduleClose = () => {
    this.validateForm();
    this.setState({ myScheduleOpen: false });
  };

  handleClose = () => {
    this.props.handleMyScheduleClose();
    this.setState({
      formValid: true,
      selectedEvent: null,
    });
  };

  handleReset = () => {
    this.setState({
      startHourInput: STARTHOUR,
      endHourInput: ENDHOUR,
      myScheduleOpen: false,
      checkedC: false,
      checkedDayofWeek: {
        checkedMo: false,
        checkedTu: false,
        checkedWe: false,
        checkedTh: false,
        checkedFr: false,
        checkedSa: false,
        checkedSu: false,
      },
      selectedEvent: null,
      descriptionInput: '',
      locationInput: '',
      descriptionValid: false,
      locationValid: false,
      startHourValid: true,
      endHourValid: true,
      formValid: false,
      checkedValid: false,
      formErrors: {
        descriptionInput: '',
        locationInput: '',
        startHourValid: '',
        endHourValid: '',
      },
    });
  };

  // For Edit Only
  checkDay = (event) => {
    if (event) {
      this.setState({
        checkedC: event.IS_ALLDAY === 1 ? true : false,
        checkedDayofWeek: {
          checkedSu: event.SUN_CDE === 'N' ? true : false,
          checkedMo: event.MON_CDE === 'M' ? true : false,
          checkedTu: event.TUE_CDE === 'T' ? true : false,
          checkedWe: event.WED_CDE === 'W' ? true : false,
          checkedTh: event.THU_CDE === 'R' ? true : false,
          checkedFr: event.FRI_CDE === 'F' ? true : false,
          checkedSa: event.SAT_CDE === 'S' ? true : false,
        },
      });
    }
  };

  // For Edit Only
  checkTime = (event) => {
    if (event) {
      let startSplit = event.BEGIN_TIME.split(':');
      let start = startSplit[0] + ':' + startSplit[1];
      let endSplit = event.END_TIME.split(':');

      let end = endSplit[0] + ':' + endSplit[1];
      this.setState({
        startHourInput: start,
        endHourInput: end,
      });
    }
  };

  render() {
    const button = {
      background: gordonColors.primary.cyan,
      color: 'white',
    };
    let dialogTitle = 'Add a';

    if (this.props.isDoubleClick) {
      dialogTitle = 'Edit the';
    }
    let myScheduleDialog;

    myScheduleDialog = (
      <Dialog
        open={this.props.myScheduleOpen}
        onClose={this.props.handleMyScheduleClose}
        fullWidth="true"
        maxWidth="md"
      >
        <DialogTitle>{dialogTitle} schedule item</DialogTitle>

        <DialogContent>
          <form onSubmit={this.handleSubmit}>
            <FormControl error={!this.state.checkedValid}>
              <FormHelperText>
                {this.state.checkedValid ? '' : this.state.formErrors.checkedInput}
              </FormHelperText>
              <FormGroup row="true">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedDayofWeek.checkedSu}
                      value={this.state.checkedDayofWeek.checkedSu}
                      onChange={this.handleCheckboxChange('checkedSu')}
                      primary
                    />
                  }
                  label={<Typography style={{ fontSize: '0.9rem' }}>Sunday</Typography>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedDayofWeek.checkedMo}
                      value={this.state.checkedDayofWeek.checkedMo}
                      onChange={this.handleCheckboxChange('checkedMo')}
                      primary
                    />
                  }
                  label={<Typography style={{ fontSize: '0.9rem' }}>Monday</Typography>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedDayofWeek.checkedTu}
                      value={this.state.checkedDayofWeek.checkedTu}
                      onChange={this.handleCheckboxChange('checkedTu')}
                      primary
                    />
                  }
                  label={<Typography style={{ fontSize: '0.9rem' }}>Tuesday</Typography>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedDayofWeek.checkedWe}
                      value={this.state.checkedDayofWeek.checkedWe}
                      onChange={this.handleCheckboxChange('checkedWe')}
                      primary
                    />
                  }
                  label={<Typography style={{ fontSize: '0.9rem' }}>Wednesday</Typography>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedDayofWeek.checkedTh}
                      value={this.state.checkedDayofWeek.checkedTh}
                      onChange={this.handleCheckboxChange('checkedTh')}
                      primary
                    />
                  }
                  label={<Typography style={{ fontSize: '0.9rem' }}>Thursday</Typography>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedDayofWeek.checkedFr}
                      value={this.state.checkedDayofWeek.checkedFr}
                      onChange={this.handleCheckboxChange('checkedFr')}
                      primary
                    />
                  }
                  label={<Typography style={{ fontSize: '0.9rem' }}>Friday</Typography>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedDayofWeek.checkedSa}
                      value={this.state.checkedDayofWeek.checkedSa}
                      onChange={this.handleCheckboxChange('checkedSa')}
                      primary
                    />
                  }
                  label={<Typography style={{ fontSize: '0.9rem' }}>Saturday</Typography>}
                />
              </FormGroup>
            </FormControl>

            <div>
              <KeyboardTimePicker
                style={{ width: '20%' }}
                label="Start time"
                ampm={false}
                variant="inline"
                disabled={this.state.checkedC}
                minutesStep={5}
                inputValue={this.state.startHourInput}
                onChange={this.handlePickerChange('startHourInput')}
                error={!this.state.startHourValid}
                helperText={this.state.startHourValid ? '' : this.state.formErrors.startHourInput}
              />
              <KeyboardTimePicker
                style={{ width: '20%' }}
                label="End time"
                ampm={false}
                variant="inline"
                disabled={this.state.checkedC}
                minutesStep={5}
                inputValue={this.state.endHourInput}
                onChange={this.handlePickerChange('endHourInput')}
                error={!this.state.endHourValid}
                helperText={this.state.endHourValid ? '' : this.state.formErrors.endHourInput}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={this.state.checkedC}
                    checked={this.state.checkedC}
                    onChange={this.handleCheckboxChange('checkedC')}
                    primary
                  />
                }
                label={<Typography style={{ fontSize: '0.9rem' }}>All Day</Typography>}
                style={{ verticalAlign: 'bottom', marginLeft: '1.5%' }}
              />
            </div>
            <div>
              <TextField
                label="Location"
                fullWidth
                value={this.state.locationInput}
                onChange={this.handleChange('locationInput')}
                error={!this.state.locationValid}
                helperText={this.state.locationValid ? '' : this.state.formErrors.locationInput}
                onKeyDown={this.handleEnterKeyPress}
              />
            </div>
            <div>
              <TextField
                label="Description"
                fullWidth
                value={this.state.descriptionInput}
                onChange={this.handleChange('descriptionInput')}
                error={!this.state.descriptionValid}
                helperText={
                  this.state.descriptionValid ? '' : this.state.formErrors.descriptionInput
                }
                onKeyDown={this.handleEnterKeyPress}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleMyScheduleClose} variant="contained" style={button}>
            Cancel
          </Button>
          <Button onClick={this.handleReset} variant="contained" style={button}>
            Reset
          </Button>
          <Button
            onClick={this.handleSubmit}
            type="submit"
            disabled={!this.state.formValid}
            variant="contained"
            style={button}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );

    return <Fragment>{myScheduleDialog}</Fragment>;
  }
}
