import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CourseSchedule from './components/CourseSchedule';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import user from './../../services/user';
import { gordonColors } from '../../theme';
import HoursDialog from './components/OfficeHoursDialog';
import LinksDialog from '../../views/MyProfile/Components/LinksDialog';

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

class GordonSchedulePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myProf: false, //if my profile page
      isSchedulePrivate: Boolean,
      isExpanded: Boolean,
      officeHoursOpen: false,
    };
    this.handleIsExpanded = this.handleIsExpanded.bind(this);
    this.handleOfficeHoursOpen = this.handleOfficeHoursOpen.bind(this);
    this.handleOfficeHoursClose = this.handleOfficeHoursClose.bind(this);
  }

  handleOfficeHoursOpen = () => {
    this.setState({ officeHoursOpen: true });
  };

  handleOfficeHoursClose = () => {
    this.setState({ officeHoursOpen: false });
  };

  async loadProfileInfo() {
    try {
      const profile = await user.getProfileInfo();
      this.setState({ isSchedulePrivate: profile.IsSchedulePrivate });
    } catch (error) {
      this.setState({ error });
    }
  }

  handleChangeSchedulePrivacy() {
    this.setState({ isSchedulePrivate: !this.state.isSchedulePrivate });
    user.setSchedulePrivacy(!this.state.isSchedulePrivate);
  }

  handleIsExpanded() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  componentWillMount() {
    this.setState({ isSchedulePrivate: this.props.profile.IsSchedulePrivate });
    this.setState({ isExpanded: true });
  }

  render() {
    const { classes } = this.props;
    let isFaculty = String(this.props.profile.PersonType).includes('fac');
    let privacyButton, editOfficeHourButton, schedulePanel;

    let hoursDialog = (
      <HoursDialog
        onDialogSubmit={this.onDialogSubmit}
        handleOfficeHoursClose={this.handleOfficeHoursClose}
        officeHoursOpen={this.state.officeHoursOpen}
      />
    );

    if (this.props.myProf) {
      privacyButton = (
        <Fragment>
          <Switch
            onChange={() => {
              this.handleChangeSchedulePrivacy();
            }}
            checked={!this.state.isSchedulePrivate}
            classes={{
              switchBase: classes.colorSwitchBase,
              checked: classes.colorChecked,
              bar: classes.colorBar,
            }}
          />
          <Typography>{this.state.isSchedulePrivate ? 'Private' : 'Public'}</Typography>
        </Fragment>
      );
    }

    if (this.props.myProf && isFaculty) {
      editOfficeHourButton = (
        <Fragment>
          <Button onClick={this.handleOfficeHoursOpen}>EDIT OFFICE HOURS</Button>
        </Fragment>
      );
    }

    if (!this.props.myProf && this.state.isSchedulePrivate) {
      schedulePanel = (
        <ExpansionPanel disabled>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Private as requested</Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      );
    } else {
      let panelTitle = '';
      this.state.isExpanded ? (panelTitle = 'Show') : (panelTitle = 'Hide');
      schedulePanel = (
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }} onChange={this.handleIsExpanded}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{panelTitle} the Schedule</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid item xs={12} lg={12}>
              <Card>
                <CardContent>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={8}>
                      <Grid container xs={12} justify="flex-start">
                        <CardHeader title="Course Schedule" />
                      </Grid>
                    </Grid>
                    <Grid item xs={4} align="right">
                      {privacyButton}
                      {editOfficeHourButton}
                    </Grid>
                    <Grid item xs={12} align="center">
                      <Grid container xs={12} lg={10}>
                        <Grid item xs={12}>
                          <CourseSchedule />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              {hoursDialog}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    }

    return <Fragment>{schedulePanel}</Fragment>;
  }
}

export default withStyles(styles)(GordonSchedulePanel);
