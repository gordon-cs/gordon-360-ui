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
      dayOfTheWeek: '',
      startHour: '',
      endHour: '',
      hourType: '',
      officeHoursOpen: false,
      checkedC: false,
      checkedMo: false,
      checkedTu: false,
      checkedWe: false,
      checkedTh: false,
      checkedFr: false,
      checkedSa: false,
      checkedSu: false,
      selectedEvent: null,
    };
    this.handleOfficeHoursClose = this.handleOfficeHoursClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps() {
    if (this.props.selectedEvent) this.setState({ selectedEvent: this.props.selectedEvent });
    this.setState({ checkedC: false });
    this.setState({ checkedSu: false });
    this.setState({ checkedMo: false });
    this.setState({ checkedTu: false });
    this.setState({ checkedWe: false });
    this.setState({ checkedTh: false });
    this.setState({ checkedFr: false });
    this.setState({ checkedSa: false });
    this.checkDay();

    console.log('CheckBoxState : ', this.state.checkedMo);
  }

  handleDayOfTheWeekInputChange = e => {
    this.setState({
      dayOfTheWeek: e.target.value,
    });
  };

  handleStartHourChange = e => {
    this.setState({
      startHour: e.target.value,
    });
  };

  handleEndHourChange = e => {
    this.setState({
      endHour: e.target.value,
    });
  };

  handleHourTypeChange = e => {
    this.setState({
      hourType: e.target.value,
    });
  };

  validateForm() {
    this.setState({
      formValid:
        this.state.fbValid && this.state.twValid && this.state.liValid && this.state.igValid,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.handleClose();
  };

  handleChange = name => e => {
    let value = e.target.value;
    this.setState({ [name]: e.target.value }, () => {
      this.validateField(name, value);
    });
  };

  handleOfficeHoursClose = () => {
    this.setState({ officeHoursOpen: false });
  };

  checkDay = () => {
    if (this.state.selectedEvent && this.props.isDoubleClick) {
      if (this.state.selectedEvent.allDay === 1) this.setState({ checkedC: true });
      if (this.state.selectedEvent.resourceId === 1) this.setState({ checkedSu: true });
      if (this.state.selectedEvent.resourceId === 2) this.setState({ checkedMo: true });
      if (this.state.selectedEvent.resourceId === 3) this.setState({ checkedTu: true });
      if (this.state.selectedEvent.resourceId === 4) this.setState({ checkedWe: true });
      if (this.state.selectedEvent.resourceId === 5) this.setState({ checkedTh: true });
      if (this.state.selectedEvent.resourceId === 6) this.setState({ checkedFr: true });
      if (this.state.selectedEvent.resourceId === 7) this.setState({ checkedSa: true });
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
        <DialogTitle className="title">{dialogTitle} schedule item</DialogTitle>

        <DialogContent className="dialog-content">
          <form className="info" onSubmit={this.handleSubmit}>
            <FormGroup row="true" className="dayWeek">
              <FormControlLabel
                control={<Checkbox checked={this.state.checkedSu} value="checkedSu" primary />}
                label="Sunday"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.checkedMo} value="checkedMo" primary />}
                label="Monday"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.checkedTu} value="checkedTu" primary />}
                label="Tuesday"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.checkedWe} value="checkedWe" primary />}
                label="Wednesday"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.checkedTh} value="checkedTh" primary />}
                label="Thursday"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.checkedFr} value="checkedFr" primary />}
                label="Friday"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.checkedSa} value="checkedSa" primary />}
                label="Saturday"
              />
            </FormGroup>

            <div className="start_time">
              <TextField
                label="Start time"
                type="time"
                defaultValue={startTime}
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
                defaultValue={endTime}
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
              control={<Checkbox value="checkedC" primary />}
              label="All day"
              className="alldaycheckbox"
            />
            <div className="office-hours-title">
              <TextField
                label="Location"
                fullWidth
                value={this.state.firstNameSearchValue}
                onChange={this.handleFirstNameInputChange}
                onKeyDown={this.handleEnterKeyPress}
              />
            </div>
            <div className="office-hours-desc">
              <TextField
                label="Description"
                fullWidth
                defaultValue={description}
                value={this.state.firstNameSearchValue}
                onChange={this.handleFirstNameInputChange}
                onKeyDown={this.handleEnterKeyPress}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions className="buttons">
          <Button onClick={this.props.handleOfficeHoursClose} variant="contained" style={button}>
            Cancel
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
