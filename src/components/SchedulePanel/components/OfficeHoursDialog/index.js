import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
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
        maxWidth="md"
        className="time-tile"
      >
        <DialogTitle className="title">Edit your office hours</DialogTitle>

        <DialogContent className="dialog-content">
          <form className="info" onSubmit={this.handleSubmit}>
            <FormGroup row="true" className="dayWeek">
              <FormControlLabel control={<Checkbox value="checkedSu" primary />} label="Sunday" />
              <FormControlLabel control={<Checkbox value="checkedMo" primary />} label="Monday" />
              <FormControlLabel control={<Checkbox value="checkedTu" primary />} label="Tuesday" />
              <FormControlLabel
                control={<Checkbox value="checkedWe" primary />}
                label="Wednesday"
              />
              <FormControlLabel control={<Checkbox value="checkedTh" primary />} label="Thursday" />
              <FormControlLabel control={<Checkbox value="checkedFr" primary />} label="Friday" />
              <FormControlLabel control={<Checkbox value="checkedSa" primary />} label="Saturday" />
            </FormGroup>

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
