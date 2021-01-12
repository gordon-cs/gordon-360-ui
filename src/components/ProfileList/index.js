import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import user from './../../services/user';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import './profileList.css';
import { withStyles } from '@material-ui/core/styles';
import { gordonColors } from '../../theme';
import {
  createHomeListItem,
  createHomePhoneListItem,
  createMobilePhoneListItem,
  createMajorsListItem,
  createMinorsListItem,
  createAdvisorsListItem,
  createResidenceListItem,
  createDormitoryListItem,
  createMailboxItem,
  createStudentIDItem,
  createSpouseItem,
} from './listItems';
import '../../app.css';

const PRIVATE_INFO = 'Private as requested.';

const styles = {
  colorSwitchBase: {
    color: gordonColors.neutral.lightGray,
    '&$colorChecked': {
      color: gordonColors.primary.cyan,
      '& + $colorBar': {
        backgroundColor: gordonColors.primary.cyan,
      },
    },
  },
  colorBar: {},
  colorChecked: {},
};

// A list of grid row lengths to align all content depending on the amount of items per row
const rowWidths = {
  twoItems: {
    itemOne: {
      xs: 5,
      sm: 5,
      md: 5,
      lg: 5,
    },
    itemTwo: {
      xs: 7,
      sm: 7,
      md: 7,
      lg: 7,
    },
  },
  threeItems: {
    itemOne: {
      xs: 5,
      sm: 5,
      md: 5,
      lg: 5,
    },
    itemTwo: {
      xs: 4,
      sm: 4,
      md: 3,
      lg: 4,
    },
    itemThree: {
      xs: 3,
      sm: 3,
      md: 4,
      lg: 3,
    },
  },
};

// The style of the Grid items
const gridStyle = {
  item: {
    paddingRight: '0.8rem',
    hyphens: 'auto',
    '-ms-hyphens': 'auto',
    '-moz-hyphens': 'auto',
    '-webkit-hyphens': 'auto',
    'word-break': 'break-word',
  },
  lastItem: {
    hyphens: 'auto',
    '-ms-hyphens': 'auto',
    '-moz-hyphens': 'auto',
    '-webkit-hyphens': 'auto',
    'word-break': 'break-word',
  },
};

// all logic for displaying parts of the Personal Information Card is contained in this file
class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myProf: false, //if my profile page
      mobilePhoneDisclaimer: false,
      homePhoneDisclaimer: false,
      addressDisclaimer: false,
      isMobilePhonePrivate: Boolean,
      isSnackbarOpen: false,
      snackbarMessage: '',
      snackBarType: '',
      snackbarKey: 0,
    };
    this.createSnackbar = this.createSnackbar.bind(this);
    this.handleChangeMobilePhonePrivacy = this.handleChangeMobilePhonePrivacy.bind(this);
  }

  /**
   * Attempts to change the privacy of the user's mobile phone on their public profile
   */
  async handleChangeMobilePhonePrivacy() {
    try {
      await user.setMobilePhonePrivacy(!this.state.isMobilePhonePrivate);
      // If no error occured above, then changing the user's mobile phone privacy was successful
      this.setState({ isMobilePhonePrivate: !this.state.isMobilePhonePrivate }, () => {
        this.createSnackbar(
          this.state.isMobilePhonePrivate ? 'Mobile Phone Hidden' : 'Mobile Phone Visible',
          'Success',
        );
      });
    } catch {
      // Changing the user's mobile phone privacy failed
      this.createSnackbar('Privacy Change Failed', 'Error');
    }
  }

  formatPhone(phone) {
    let tele = String(phone);
    if (tele.length === 10) {
      return '(' + tele.slice(0, 3) + ') ' + tele.slice(3, 6) + '-' + tele.slice(6);
    }
    if (tele !== 'undefined') {
      return tele;
    }
  }
  async componentWillMount() {
    this.setState({ isMobilePhonePrivate: this.props.profile.IsMobilePhonePrivate });
    if (!this.props.myProf) {
      this.setState({
        mobilePhoneDisclaimer:
          this.props.profile.IsMobilePhonePrivate === 1 &&
          this.props.profile.MobilePhone !== PRIVATE_INFO,
      });
      this.setState({
        homePhoneDisclaimer:
          String(this.props.profile.PersonType).includes('stu') && this.props.profile.HomePhone,
      });
      this.setState({
        addressDisclaimer:
          String(this.props.profile.PersonType).includes('stu') &&
          (this.props.profile.HomeStreet2 || this.props.profile.HomeStreet1),
      });
    }
  }

  /**
   * Displays the snackbar to the user.
   * @param {String} message The message to display to the user
   * @param {String} messageType The message's type. Either a success or error
   */
  createSnackbar(message, messageType) {
    // Sets the snackbar key as either 0 or 1. This prevents a high number being made.
    this.setState({
      snackbarMessage: message,
      snackbarType: messageType,
      snackbarKey: (this.state.snackbarKey + 1) % 2,
      isSnackbarOpen: true,
    });
  }

  render() {
    // The profile of the user whose information to process and the classes style for the mobile
    // phone privacy switch
    const { classes, profile } = this.props;
    // Used to indicate content that's hidden on a user's public profile
    const privateTextStyle = {
      opacity: this.props.myProf ? '0.5' : '1',
    };

    // Creates the Home Phone List Item
    let homephone = createHomePhoneListItem(
      this.props.profile,
      PRIVATE_INFO,
      rowWidths,
      { privateTextStyle, gridStyle },
      this.state.homePhoneDisclaimer,
      this.formatPhone(profile.HomePhone),
      this.props.myProf,
    );

    // Creates the Mobile Phone List Item
    let mobilephone = createMobilePhoneListItem(
      this.props.profile,
      PRIVATE_INFO,
      rowWidths,
      { privateTextStyle, gridStyle },
      this.state.mobilePhoneDisclaimer,
      this.formatPhone(profile.MobilePhone),
      classes,
      this.state.isMobilePhonePrivate,
      this.props.network,
      this.props.myProf,
      this.handleChangeMobilePhonePrivacy,
    );

    // Creates the Home List Item
    let home = createHomeListItem(
      this.props.profile,
      PRIVATE_INFO,
      rowWidths,
      { privateTextStyle, gridStyle },
      this.state.addressDisclaimer,
    );

    // Creates the Minors List Item
    let minors = createMinorsListItem(this.props.profile, rowWidths, { gridStyle });

    // Creates the Majors List Item
    let majors = createMajorsListItem(this.props.profile, rowWidths, { gridStyle });

    // Creates the Advisors List Item
    let advisors;
    // only show on personal profile
    if(this.props.myProf) {
      advisors = createAdvisorsListItem(this.props.profile, rowWidths, { gridStyle });
    } else {
      advisors = <></>;
    }

    // Creates the Residence List Item
    let residence = createResidenceListItem(this.props.profile, rowWidths, { gridStyle });

    // Creates the Mailbox List Item
    let mailloc = createMailboxItem(this.props.profile, rowWidths, { gridStyle });

    // Creates the Dormitory List Item
    let dorminfo = createDormitoryListItem(
      this.props.profile,
      rowWidths,
      { privateTextStyle, gridStyle },
      this.props.myProf,
    );

    // Creates the Student ID List Item
    let studentID = createStudentIDItem(
      this.props.profile,
      rowWidths,
      { privateTextStyle, gridStyle },
      this.props.myProf,
    );

    // Creates the Spouse List Item
    let spouse = createSpouseItem(this.props.profile, rowWidths, { gridStyle });

    return (
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card className="profile-list-card">
          <Grid container className="profile-list-card-header">
            <CardHeader title="Personal Information" />
          </Grid>
          <CardContent className="profile-list-card-content">
            {majors}
            {minors}
            {advisors}
            {residence}
            {dorminfo}
            {mailloc}
            {mobilephone}
            {studentID}
            {homephone}
            {home}
            {spouse}
            {(this.state.homePhoneDisclaimer ||
              this.state.addressDisclaimer ||
              this.state.mobilePhoneDisclaimer) &&
              !this.props.myProf && (
                <Grid>
                  <Typography align="left" className="disclaimer disclaimer-note">
                    Private by request of student and visible only to faculty and staff
                  </Typography>
                </Grid>
              )}
          </CardContent>
        </Card>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          // Makes every snackbar unique to prevent the same snackbar from being updated
          key={this.state.snackbarKey.toString()}
          open={this.state.isSnackbarOpen}
          autoHideDuration={6000}
          onClose={() => {
            this.setState({ isSnackbarOpen: false });
          }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            // If the message type is Success
            this.state.snackbarType === 'Success' ? (
              <span id="message-id">
                <CheckCircleIcon
                  style={{
                    marginBottom: '-4.5pt',
                    marginRight: '0.5rem',
                  }}
                />
                {this.state.snackbarMessage}
              </span>
            ) : (
              <span id="message-id">
                <ErrorIcon
                  style={{
                    marginBottom: '-4.5pt',
                    marginRight: '0.5rem',
                  }}
                />
                {this.state.snackbarMessage}
              </span>
            )
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => {
                this.setState({ isSnackbarOpen: false });
              }}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(ProfileList);
