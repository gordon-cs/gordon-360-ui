import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { gordonColors } from '../../../../theme';
import Checkbox from '@material-ui/core/Checkbox';

import './officehoursdialog.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class HoursDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startHourInput: '08:00',
      endHourInput: '17:00',
      officeHoursOpen: false,
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
    };
    this.handleOfficeHoursClose = this.handleOfficeHoursClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEvent !== this.props.selectedEvent)
      this.setState({ selectedEvent: nextProps.selectedEvent });
    this.checkDay();
  }

  componentWillMount() {}

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let descriptionValid = this.state.descriptionValid;
    let locationValid = this.state.locationValid;
    let startHourValid = this.state.startHourValid;
    let endHourValid = this.state.endHourValid;

    // Require that content havint appropriate size
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
          parseInt(value, 10) >= 5 &&
          parseInt(value, 10) <= 10;
        fieldValidationErrors.startHourInput = startHourValid ? '' : 'Start Time is not Valid';
        break;
      case 'endHourInput':
        endHourValid =
          value.trim() !== '' &&
          parseInt(this.state.startHourInput, 10) < parseInt(value, 10) &&
          parseInt(value, 10) >= 5 &&
          parseInt(value, 10) <= 22;
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
  }

  handleSubmit = e => {
    e.preventDefault();

    var startHour = this.state.startHourInput;
    var endHour = this.state.endHourInput;
    var location = this.state.locationInput;
    var description = this.state.descriptionInput;

    var mySchedule = {
      startHour: startHour,
      endHour: endHour,
      location: location,
      description: description,
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

  validateCheck = dayofWeek => {
    var valid = false;
    for (let day in dayofWeek) {
      if (dayofWeek[day]) {
        valid = true;
      }
    }
    this.setState({ checkedValid: valid }, () => {
      this.validateForm();
    });
  };

  handleChange = name => e => {
    let value = e.target.value;
    this.setState({ [name]: e.target.value }, () => {
      this.validateField(name, value);
    });
  };

  handleCheckboxChange = name => e => {
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

  handleOfficeHoursClose = () => {
    this.validateForm();
    this.setState({ officeHoursOpen: false });
  };

  handleClose = () => {
    this.props.handleOfficeHoursClose();

    this.setState({ formValid: true });
  };

  handleReset = () => {
    this.setState({
      startHourInput: '08:00',
      endHourInput: '17:00',
      officeHoursOpen: false,
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

  checkDay = () => {
    if (this.state.selectedEvent && this.props.isDoubleClick) {
      if (this.state.selectedEvent.allDay === 1) this.setState({ checkedC: true });
      if (this.state.selectedEvent.resourceId === 1)
        this.setState({ dayofWeek: { checkedSu: true } });
      if (this.state.selectedEvent.resourceId === 2)
        this.setState({ dayofWeek: { checkedMo: true } });
      if (this.state.selectedEvent.resourceId === 3)
        this.setState({ dayofWeek: { checkedTu: true } });
      if (this.state.selectedEvent.resourceId === 4)
        this.setState({ dayofWeek: { checkedWe: true } });
      if (this.state.selectedEvent.resourceId === 5)
        this.setState({ dayofWeek: { checkedTh: true } });
      if (this.state.selectedEvent.resourceId === 6)
        this.setState({ dayofWeek: { checkedFr: true } });
      if (this.state.selectedEvent.resourceId === 7)
        this.setState({ dayofWeek: { checkedSa: true } });
    }
  };

  render() {
    const button = {
      background: gordonColors.primary.cyan,
      color: 'white',
    };
    let dialogTitle = 'Add a';
    let description = null;
    let startHour;
    let startMin;
    let startTime = '08:00';
    let endHour;
    let endMin;
    let endTime = '17:00';

    if (this.state.selectedEvent && this.props.isDoubleClick) {
      dialogTitle = 'Edit the';

      description = this.state.selectedEvent.title;
      startHour = this.state.selectedEvent.start.getHours();
      startMin = this.state.selectedEvent.start.getMinutes();
      startHour < 10
        ? (startHour = '0' + startHour.toString())
        : (startHour = startHour.toString());
      startMin < 10 ? (startMin = '0' + startMin.toString()) : (startMin = startMin.toString());
      startTime = startHour + ':' + startMin;

      endHour = this.state.selectedEvent.end.getHours();
      endMin = this.state.selectedEvent.end.getMinutes();
      endHour < 10 ? (endHour = '0' + endHour.toString()) : (endHour = endHour.toString());
      endMin < 10 ? (endMin = '0' + endMin.toString()) : (endMin = endMin.toString());
      endTime = endHour + ':' + endMin;
    }

    return (
      <Dialog
        open={this.props.officeHoursOpen}
        onClose={this.props.handleOfficeHoursClose}
        fullWidth="true"
        maxWidth="md"
        className="time-tile"
      >
        <DialogTitle className="add-title">{dialogTitle} schedule item</DialogTitle>

        <DialogContent className="dialog-content">
          <form className="info" onSubmit={this.handleSubmit}>
            <FormGroup row="true" className="dayWeek">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkedDayofWeek.checkedSu}
                    value={this.state.checkedDayofWeek.checkedSu}
                    onChange={this.handleCheckboxChange('checkedSu')}
                    primary
                  />
                }
                label="Sunday"
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
                label="Monday"
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
                label="Tuesday"
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
                label="Wednesday"
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
                label="Thursday"
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
                label="Friday"
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
                label="Saturday"
              />
            </FormGroup>

            <div className="start_time">
              <TextField
                label="Start time"
                type="time"
                defaultValue={startTime}
                disabled={this.state.checkedC}
                value={this.state.startHourInput}
                onChange={this.handleChange('startHourInput')}
                error={!this.state.startHourValid}
                helperText={this.state.startHourValid ? '' : this.state.formErrors.startHourInput}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </div>
            <div className="end_time">
              <TextField
                label="End time"
                type="time"
                disabled={this.state.checkedC}
                defaultValue={endTime}
                value={this.state.endHourInput}
                onChange={this.handleChange('endHourInput')}
                error={!this.state.endHourValid}
                helperText={this.state.endHourValid ? '' : this.state.formErrors.endHourInput}
                primary
                style={{ marginLeft: '10%' }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  value={this.state.checkedC}
                  checked={this.state.checkedC}
                  onChange={this.handleCheckboxChange('checkedC')}
                  primary
                />
              }
              label="All day"
              className="alldaycheckbox"
            />
            <div className="office-hours-title">
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
            <div className="office-hours-desc">
              <TextField
                label="Description"
                fullWidth
                defaultValue={description}
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
        <DialogActions className="buttons">
          <Button onClick={this.props.handleOfficeHoursClose} variant="contained" style={button}>
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
  }
}
