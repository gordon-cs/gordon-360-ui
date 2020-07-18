import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Majors from './../../components/MajorList';
import Minors from './../../components/MinorList';
import user from './../../services/user';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import LockIcon from '@material-ui/icons/Lock';
import './profileList.css';
import { withStyles } from '@material-ui/core/styles';
import { gordonColors } from '../../theme';
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
    };
  }

  async loadProfileInfo() {
    try {
      const profile = await user.getProfileInfo();
      this.setState({ isMobilePhonePrivate: profile.IsMobilePhonePrivate });
    } catch (error) {
      this.setState({ error });
    }
  }

  handleChangeMobilePhonePrivacy() {
    this.setState({ isMobilePhonePrivate: !this.state.isMobilePhonePrivate });
    user.setMobilePhonePrivacy(!this.state.isMobilePhonePrivate);
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
  componentWillMount() {
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

  render() {
    const { classes } = this.props;
    // Used to indicate content that's hidden on a user's public profile
    const privateTextStyle = {
      opacity: this.props.myProf ? '0.5' : '1',
    };

    let address,
      homephone,
      mobilephone,
      home,
      department,
      minors,
      majors,
      residence,
      mailloc,
      dorminfo,
      studentID;
    const { profile } = this.props;

    // Creates the city and state address of the user
    let userAddress;
    if (this.props.profile.HomeCity === PRIVATE_INFO) {
      userAddress = 'Private as requested';
    } else if (
      this.props.profile.Country === 'United States Of America' ||
      this.props.profile.Country === ''
    ) {
      userAddress = `${this.props.profile.HomeCity}, ${this.props.profile.HomeState}`;
    } else {
      userAddress = `${this.props.profile.Country}`;
    }

    // Creates the address of the user
    address = (
      <Typography>
        {this.props.profile.HomeStreet2 && (
          <span
            className={this.state.addressDisclaimer ? 'disclaimer' : ''}
            style={privateTextStyle}
          >
            {this.props.profile.HomeStreet2},&nbsp;
          </span>
        )}
        {userAddress}
      </Typography>
    );

    // Creates the Home Info List Item for the user's Public Profile
    if (address !== '') {
      // Gets the row item widths
      const rowItemOne = rowWidths.twoItems.itemOne;
      const rowItemTwo = rowWidths.twoItems.itemTwo;
      home = (
        <div>
          <ListItem>
            <Grid container justify="center">
              <Grid
                container
                xs={rowItemOne.xs}
                sm={rowItemOne.sm}
                md={rowItemOne.md}
                lg={rowItemOne.lg}
                style={gridStyle.item}
                alignItems="center"
              >
                <Typography className={this.state.addressDisclaimer ? 'disclaimer' : ''}>
                  Home:
                </Typography>
              </Grid>
              <Grid
                container
                xs={rowItemTwo.xs}
                sm={rowItemTwo.sm}
                md={rowItemTwo.md}
                lg={rowItemTwo.lg}
                style={gridStyle.lastItem}
                alignItems="center"
              >
                <Typography>{address}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );
    }

    // Creates the Home Phone Info List Item
    if (this.props.profile.HomePhone !== undefined && this.props.profile.HomePhone !== '') {
      // Gets the row item widths
      const rowItemOne = rowWidths.twoItems.itemOne;
      const rowItemTwo = rowWidths.twoItems.itemTwo;
      homephone = (
        <div>
          <ListItem>
            <Grid container justify="center">
              <Grid
                container
                xs={rowItemOne.xs}
                sm={rowItemOne.sm}
                md={rowItemOne.md}
                lg={rowItemOne.lg}
                style={gridStyle.item}
                alignItems="center"
              >
                <Typography className={this.state.homePhoneDisclaimer ? 'disclaimer' : ''}>
                  Home Phone:
                </Typography>
              </Grid>
              <Grid
                container
                xs={rowItemTwo.xs}
                sm={rowItemTwo.sm}
                md={rowItemTwo.md}
                lg={rowItemTwo.lg}
                style={gridStyle.lastItem}
                alignItems="center"
              >
                {this.props.profile.HomePhone !== PRIVATE_INFO && !this.props.myProf && (
                  <a href={'tel:' + this.props.profile.HomePhone} className="number">
                    <Typography
                      className={this.state.homePhoneDisclaimer ? 'disclaimer' : 'gc360-text-link'}
                    >
                      {this.formatPhone(this.props.profile.HomePhone)}
                    </Typography>
                  </a>
                )}
                {this.props.profile.HomePhone === PRIVATE_INFO && (
                  <Typography>Private as requested</Typography>
                )}
                {this.props.myProf && (
                  <Typography
                    style={
                      String(this.props.profile.PersonType).includes('stu') ? privateTextStyle : ''
                    }
                  >
                    {this.formatPhone(this.props.profile.HomePhone)}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );
    }

    // Creates the Mobile Phone Info List Item for the user's Public Profile
    if (this.props.profile.MobilePhone !== undefined && this.props.profile.MobilePhone !== '') {
      // Gets the row item widths
      const rowItemOne = rowWidths.twoItems.itemOne;
      const rowItemTwo = rowWidths.twoItems.itemTwo;
      mobilephone = (
        <div>
          <ListItem>
            <Grid container justify="center">
              <Grid
                container
                xs={rowItemOne.xs}
                sm={rowItemOne.sm}
                md={rowItemOne.md}
                lg={rowItemOne.lg}
                style={gridStyle.item}
                alignItems="center"
              >
                <Typography className={this.state.mobilePhoneDisclaimer ? 'disclaimer' : ''}>
                  Mobile Phone:
                </Typography>
              </Grid>
              <Grid
                container
                xs={rowItemTwo.xs}
                sm={rowItemTwo.sm}
                md={rowItemTwo.md}
                lg={rowItemTwo.lg}
                style={gridStyle.lastItem}
                alignItems="center"
              >
                {this.props.profile.MobilePhone !== PRIVATE_INFO && (
                  <a href={'tel:' + this.props.profile.MobilePhone} className="number">
                    <Typography
                      className={
                        this.state.mobilePhoneDisclaimer ? 'disclaimer' : 'gc360-text-link'
                      }
                    >
                      {this.formatPhone(this.props.profile.MobilePhone)}
                    </Typography>
                  </a>
                )}
                {this.props.profile.MobilePhone === PRIVATE_INFO && (
                  <Typography>Private as requested</Typography>
                )}
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );
    }

    // Creates the Mobile Phone Info List Item for the user's My Profile
    if (this.props.myProf && this.props.profile.MobilePhone) {
      // Gets the row item widths
      const rowItemOne = rowWidths.threeItems.itemOne;
      const rowItemTwo = rowWidths.threeItems.itemTwo;
      const rowItemThree = rowWidths.threeItems.itemThree;
      mobilephone = (
        <div>
          <ListItem>
            <Grid container alignItems="center" justify="center">
              <Grid
                container
                xs={rowItemOne.xs}
                sm={rowItemOne.sm}
                md={rowItemOne.md}
                lg={rowItemOne.lg}
                style={gridStyle.item}
                alignItems="center"
              >
                <Typography>Mobile Phone:</Typography>
              </Grid>
              <Grid
                coontainer
                xs={rowItemTwo.xs}
                sm={rowItemTwo.sm}
                md={rowItemTwo.md}
                lg={rowItemTwo.lg}
                style={{
                  ...gridStyle.item,
                  ...(this.state.isMobilePhonePrivate ? privateTextStyle : ''),
                }}
                alignItems="center"
              >
                <Typography>{this.formatPhone(this.props.profile.MobilePhone)}</Typography>
              </Grid>

              <Grid
                container
                xs={rowItemThree.xs}
                sm={rowItemThree.sm}
                md={rowItemThree.md}
                lg={rowItemThree.lg}
                style={gridStyle.lastItem}
                alignItems="center"
              >
                <Grid container justify="center" alignItems="center" direction="column">
                  {this.props.network === 'online' && (
                    <Switch
                      onChange={() => {
                        this.handleChangeMobilePhonePrivacy();
                      }}
                      checked={!this.state.isMobilePhonePrivate}
                      classes={{
                        switchBase: classes.colorSwitchBase,
                        checked: classes.colorChecked,
                        bar: classes.colorBar,
                      }}
                    />
                  )}
                  <Typography>{this.state.isMobilePhonePrivate ? 'Private' : 'Public'}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );
    }

    // Shows the majors and minors list items if the user is a student
    if (String(this.props.profile.PersonType).includes('stu')) {
      // Creates the Minors List Item
      if (String(this.props.profile.Minors).length !== 0) {
        minors = (
          <Minors minors={this.props.profile.Minors} rowWidths={rowWidths} gridStyle={gridStyle} />
        );
      }

      // Creates the Majors List Item
      majors = (
        <Majors majors={this.props.profile.Majors} rowWidths={rowWidths} gridStyle={gridStyle} />
      );

      // Creates the Residence List Item
      if (this.props.profile.OnOffCampus !== '') {
        // Gets the row item widths
        const rowItemOne = rowWidths.twoItems.itemOne;
        const rowItemTwo = rowWidths.twoItems.itemTwo;
        residence = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid
                  container
                  xs={rowItemOne.xs}
                  sm={rowItemOne.sm}
                  md={rowItemOne.md}
                  lg={rowItemOne.lg}
                  style={gridStyle.item}
                  alignItems="center"
                >
                  <Typography>On/Off Campus:</Typography>
                </Grid>
                <Grid
                  container
                  xs={rowItemTwo.xs}
                  sm={rowItemTwo.sm}
                  md={rowItemTwo.md}
                  lg={rowItemTwo.lg}
                  style={gridStyle.lastItem}
                  alignItems="center"
                >
                  <Typography>{this.props.profile.OnOffCampus}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        );
      }
    }

    // Creates the Dorm Info List Item
    if (
      String(this.props.profile.PersonType).includes('stu') &&
      (profile.BuildingDescription || profile.Hall)
    ) {
      // Gets the row item widths
      const rowItemOne = rowWidths.twoItems.itemOne;
      const rowItemTwo = rowWidths.twoItems.itemTwo;
      dorminfo = (
        <div>
          <ListItem>
            <Grid container justify="center">
              <Grid
                container
                xs={rowItemOne.xs}
                sm={rowItemOne.sm}
                md={rowItemOne.md}
                lg={rowItemOne.lg}
                style={gridStyle.item}
                alignItems="center"
              >
                <Typography>Dormitory: </Typography>
              </Grid>
              <Grid
                container
                xs={rowItemTwo.xs}
                sm={rowItemTwo.sm}
                md={rowItemTwo.md}
                lg={rowItemTwo.lg}
                style={gridStyle.lastItem}
                alignItems="center"
              >
                <Typography>
                  {profile.BuildingDescription ? profile.BuildingDescription : profile.Hall}
                  {this.props.myProf && profile.OnCampusRoom ? (
                    <span style={privateTextStyle}>, Room {profile.OnCampusRoom}</span>
                  ) : (
                    ''
                  )}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );
    }

    // Creates the Faculty Department List Item
    if (String(this.props.profile.PersonType).includes('fac')) {
      if (this.props.profile.OnCampusDepartment !== '') {
        // Gets the row item widths
        const rowItemOne = rowWidths.twoItems.itemOne;
        const rowItemTwo = rowWidths.twoItems.itemTwo;
        department = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid
                  container
                  xs={rowItemOne.xs}
                  sm={rowItemOne.sm}
                  md={rowItemOne.md}
                  lg={rowItemOne.lg}
                  style={gridStyle.item}
                  alignItems="center"
                >
                  <Typography>Department:</Typography>
                </Grid>
                <Grid
                  container
                  xs={rowItemTwo.xs}
                  sm={rowItemTwo.sm}
                  md={rowItemTwo.md}
                  lg={rowItemTwo.lg}
                  style={gridStyle.lastItem}
                  alignItems="center"
                >
                  <Typography>{this.props.profile.OnCampusDepartment}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        );
      }
    }

    // Creates the Mailbox Info List Item
    if (
      String(this.props.profile.PersonType).includes('stu') &&
      this.props.profile.Mail_Location !== '' &&
      this.props.profile.Mail_Location !== undefined
    ) {
      // Gets the row item widths
      const rowItemOne = rowWidths.twoItems.itemOne;
      const rowItemTwo = rowWidths.twoItems.itemTwo;
      mailloc = (
        <div>
          <ListItem>
            <Grid container justify="center">
              <Grid
                container
                xs={rowItemOne.xs}
                sm={rowItemOne.sm}
                md={rowItemOne.md}
                lg={rowItemOne.lg}
                style={gridStyle.item}
                alignItems="center"
              >
                <Typography>Mailbox:</Typography>
              </Grid>
              <Grid
                container
                xs={rowItemTwo.xs}
                sm={rowItemTwo.sm}
                md={rowItemTwo.md}
                lg={rowItemTwo.lg}
                style={gridStyle.lastItem}
                alignItems="center"
              >
                <Typography>#{this.props.profile.Mail_Location}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );
    }

    // Creates the Student ID List Item
    if (this.props.myProf && String(this.props.profile.PersonType).includes('stu')) {
      // Gets the row item widths
      const rowItemOne = rowWidths.threeItems.itemOne;
      const rowItemTwo = rowWidths.threeItems.itemTwo;
      const rowItemThree = rowWidths.threeItems.itemThree;
      studentID = (
        <div>
          <ListItem>
            <Grid container justify="center" alignItems="center">
              <Grid
                container
                xs={rowItemOne.xs}
                sm={rowItemOne.sm}
                md={rowItemOne.md}
                lg={rowItemOne.lg}
                style={gridStyle.item}
                alignItems="center"
              >
                <Typography>Student ID:</Typography>
              </Grid>
              <Grid
                coontainer
                xs={rowItemTwo.xs}
                sm={rowItemTwo.sm}
                md={rowItemTwo.md}
                lg={rowItemTwo.lg}
                justify="right"
                style={gridStyle.item}
              >
                <Typography style={privateTextStyle}>{this.props.profile.ID}</Typography>
              </Grid>
              <Grid
                item
                xs={rowItemThree.xs}
                sm={rowItemThree.sm}
                md={rowItemThree.md}
                lg={rowItemThree.lg}
                style={gridStyle.lastItem}
                justify="right"
                align="center"
              >
                <Grid container justify="center">
                  <Grid item>
                    <LockIcon className="lock-icon" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );
    }

    return (
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card className="profile-list-card">
          <Grid container className="profile-list-card-header">
            <CardHeader title="Personal Information" />
          </Grid>
          <CardContent className="profile-list-card-content">
            {majors}
            {minors}
            {residence}
            {dorminfo}
            {mailloc}
            {department}
            {mobilephone}
            {studentID}
            {homephone}
            {home}
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
      </Grid>
    );
  }
}

export default withStyles(styles)(ProfileList);
