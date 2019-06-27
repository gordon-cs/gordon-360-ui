import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import FacebookIcon from 'react-icons/lib/fa/facebook';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import LinkedInIcon from 'react-icons/lib/fa/linkedin';
import InstagramIcon from 'react-icons/lib/fa/instagram';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui//core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { gordonColors } from '../../../../theme';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

export default class RemoveHoursDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dayOfTheWeek: '',
      startHour: '',
      endHour: '',
      hourType: '',
      // facebookInput: '',
      // twitterInput: '',
      // linkedInInput: '',
      // instagramInput: '',
      // formErrors: {
      //   facebookInput: '',
      //   twitterInput: '',
      //   linkedInInput: '',
      //   instagramInput: '',
      // },
      // fbValid: true,
      // twValid: true,
      // liValid: true,
      // igValid: true,
      // formValid: true,
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

  // // Update local state as parent state changes
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.facebookLink !== this.props.facebookLink) {
  //     this.setState({ facebookInput: nextProps.facebookLink });
  //   }
  //   if (nextProps.twitterLink !== this.props.twitterLink) {
  //     this.setState({ twitterInput: nextProps.twitterLink });
  //   }
  //   if (nextProps.linkedInLink !== this.props.linkedInLink) {
  //     if (this.props.linkedInLink === undefined) {
  //       this.setState({ linkedInInput: '' });
  //     } else {
  //       this.setState({ linkedInInput: nextProps.linkedInLink });
  //     }
  //   }
  //   if (nextProps.instagramLink !== this.props.instagramLink) {
  //     this.setState({ instagramInput: nextProps.instagramLink });
  //   }
  // }

  // validateField(fieldName, value) {
  //   let fieldValidationErrors = this.state.formErrors;
  //   let fbValid = this.state.fbValid;
  //   let twValid = this.state.twValid;
  //   let liValid = this.state.liValid;
  //   let igValid = this.state.igValid;

  //   let facebook = socialMediaInfo.facebook;
  //   let twitter = socialMediaInfo.twitter;
  //   let linkedIn = socialMediaInfo.linkedIn;
  //   let instagram = socialMediaInfo.instagram;

  //   // Require that content begins with appropriate domain name if not empty
  //   switch (fieldName) {
  //     case 'facebookInput':
  //       fbValid = value === '' || value.indexOf(facebook.prefix) === 0;
  //       fieldValidationErrors.facebookInput = fbValid ? '' : facebook.error;
  //       break;
  //     case 'twitterInput':
  //       twValid = value === '' || value.indexOf(twitter.prefix) === 0;
  //       fieldValidationErrors.twitterInput = twValid ? '' : twitter.error;
  //       break;
  //     case 'linkedInInput':
  //       liValid = value === '' || value.indexOf(linkedIn.prefix) === 0;
  //       fieldValidationErrors.linkedInInput = liValid ? '' : linkedIn.error;
  //       break;
  //     case 'instagramInput':
  //       igValid = value === '' || value.indexOf(instagram.prefix) === 0;
  //       fieldValidationErrors.instagramInput = igValid ? '' : instagram.error;
  //       break;
  //     default:
  //       break;
  //   }
  //   this.setState(
  //     {
  //       formErrors: fieldValidationErrors,
  //       fbValid: fbValid,
  //       twValid: twValid,
  //       liValid: liValid,
  //       igValid: igValid,
  //     },
  //     this.validateForm,
  //   );
  // }

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

    function Row(props) {
      const { index, style } = props;

      return (
        <ListItem button style={style} key={index}>
          <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
      );
    }

    return (
      <Fragment>
        <Dialog
          open={this.props.removeOfficeHoursOpen}
          keepMounted
          onClose={this.props.handleRemoveOfficeHoursClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
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
