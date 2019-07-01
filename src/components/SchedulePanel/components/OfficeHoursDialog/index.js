import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
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
      checkedDay: false,
      officeHoursOpen: false,
    };
    this.handleOfficeHoursClose = this.handleOfficeHoursClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    const button = {
      background: gordonColors.primary.cyan,
      color: 'white',
    };

    return (
      <Dialog
        open={this.props.officeHoursOpen}
        onClose={this.props.handleOfficeHoursClose}
        fullWidth="true"
        maxWidth="sm"
        className="time-tile"
      >
        <DialogTitle className="title">Edit your office hours</DialogTitle>

        <DialogContent className="dialog-content">
          <form className="info" onSubmit={this.handleSubmit}>
            <FormControl className="dayWeek">
              <InputLabel>Select day</InputLabel>
              <Select
                value={this.state.dayOfTheWeek}
                onChange={this.handleDayOfTheWeekInputChange}
                input={<Input id="weekday" />}
              >
                <MenuItem label="monday" value="Monday" resourceID="2">
                  <em>Monday</em>
                </MenuItem>
                <MenuItem label="tuesday" value="Tuesday" resourceID="3">
                  <em>Tuesday</em>
                </MenuItem>
                <MenuItem label="wednesday" value="Wednesday" resourceID="4">
                  <em>Wednesday</em>
                </MenuItem>
                <MenuItem label="thursday" value="Thrusday" resourceID="5">
                  <em>Thursday</em>
                </MenuItem>
                <MenuItem label="friday" value="Friday" resourceID="6">
                  <em>Friday</em>
                </MenuItem>
                <MenuItem label="saturday" value="Saturday" resourceID="7">
                  <em>Saturday</em>
                </MenuItem>
                <MenuItem label="sunday" value="Sunday" resourceID="1">
                  <em>Sunday</em>
                </MenuItem>
              </Select>
            </FormControl>

            <div className="start_time">
              <TextField
                label="Start time"
                type="time"
                defaultValue="08:00"
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
                defaultValue="17:00"
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
                  value="checkedC"
                  primary
                  // style={{ marginLeft: '50%' }}
                />
              }
              label="All day"
              className="alldaycheckbox"
            />
            <div className="office-hours-title">
              <TextField
                label="Title"
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
