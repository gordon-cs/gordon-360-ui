import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { gordonColors } from '../../../../theme';

export default class RemoveHoursDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dayOfTheWeek: '',
      startHour: '',
      endHour: '',
      hourType: '',
      removeOfficeHoursOpen: false,
    };
    this.handleRemoveOfficeHoursClose = this.handleRemoveOfficeHoursClose.bind(this);
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

    var fb = this.state.facebookInput;
    var tw = this.state.twitterInput;
    var li = this.state.linkedInInput;
    var ig = this.state.instagramInput;

    this.props.onDialogSubmit(fb, tw, li, ig);
    this.handleClose();
  };

  handleChange = name => e => {
    let value = e.target.value;
    this.setState({ [name]: e.target.value }, () => {
      this.validateField(name, value);
    });
  };

  handleRemoveOfficeHoursClose = () => {
    this.setState({ removeOfficeHoursOpen: false });

    // Reset changed fields
    if (this.state.facebookInput !== this.props.facebookLink) {
      this.setState({
        facebookInput: this.props.facebookLink,
        fbValid: true,
        formErrors: { facebookInput: '' },
      });
    }
    if (this.state.twitterInput !== this.props.twitterLink) {
      this.setState({
        twitterInput: this.props.twitterLink,
        twValid: true,
        formErrors: { twitterInput: '' },
      });
    }
    if (this.state.linkedInInput !== this.props.linkedInLink) {
      this.setState({
        linkedInInput: this.props.linkedInLink,
        liValid: true,
        formErrors: { linkedInInput: '' },
      });
    }
    if (this.state.instagramInput !== this.props.instagramLink) {
      this.setState({
        instagramInput: this.props.instagramLink,
        igValid: true,
        formErrors: { instagramInput: '' },
      });
    }
    this.setState({ formValid: true });
  };

  render() {
    const button = {
      background: gordonColors.primary.cyan,
      color: 'white',
    };

    return (
      <Fragment>
        <Dialog
          open={this.props.removeOfficeHoursOpen}
          keepMounted
          onClose={this.props.handleRemoveOfficeHoursClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {/* <Box fontSize="h6.fontSize" m={1}>Are you sure about removing this event?</Box> */}
          <DialogTitle className="title">Are you sure about removing this event?</DialogTitle>
          <DialogActions className="buttons">
            <Button
              onClick={this.props.handleRemoveOfficeHoursClose}
              variant="contained"
              style={button}
            >
              No
            </Button>
            <Button variant="contained" style={button}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
