import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import CourseSchedule from './components/CourseSchedule';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { gordonColors } from '../../theme';
import HoursDialog from './components/OfficeHoursDialog';
import RemoveHoursDialog from './components/RemoveHoursDialog';
import EditDescriptionDialog from './components/EditDescriptionDialog';
import TimeAgo from 'react-timeago';

import ScheduleControl from './../../services/schedulecontrol';

import './schedulepanel.css';

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
      disabled: true,
      selectedEvent: null,
      isDoubleClick: false,
      description: null,
      modifiedTimeStamp: null,
    };
    this.scheduleControlInfo = null;

    this.handleIsExpanded = this.handleIsExpanded.bind(this);
    this.handleOfficeHoursOpen = this.handleOfficeHoursOpen.bind(this);
    this.handleOfficeHoursClose = this.handleOfficeHoursClose.bind(this);
    this.handleRemoveOfficeHoursOpen = this.handleRemoveOfficeHoursOpen.bind(this);
    this.handleRemoveOfficeHoursClose = this.handleRemoveOfficeHoursClose.bind(this);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleEditDescriptionOpen = this.handleEditDescriptionOpen.bind(this);
    this.handleEditDescriptionClose = this.handleEditDescriptionClose.bind(this);
    this.handleEditDescriptionButton = this.handleEditDescriptionButton.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  componentWillMount() {
    this.loadData(this.props.profile);
    this.setState({ isExpanded: true });
  }

  loadData = async searchedUser => {
    const scheduleControlPromise = ScheduleControl.getScheduleControl(searchedUser.AD_Username);
    const scheduleControlInfo = await scheduleControlPromise;
    this.scheduleControlInfo = scheduleControlInfo;
    if (this.scheduleControlInfo) {
      this.setState({ isSchedulePrivate: this.scheduleControlInfo.IsSchedulePrivate });
      this.setState({ description: this.scheduleControlInfo.Description });
      this.setState({ modifiedTimeStamp: this.scheduleControlInfo.ModifiedTimeStamp });
    }
    console.log('Schedule Control : ', this.scheduleControlInfo);
  };

  handleOfficeHoursOpen = () => {
    this.setState({ officeHoursOpen: true });
    this.setState({ isDoubleClick: false });
  };

  handleOfficeHoursClose = () => {
    this.setState({ officeHoursOpen: false });
  };

  handleRemoveOfficeHoursOpen = () => {
    this.setState({ removeOfficeHoursOpen: true });
  };

  handleRemoveOfficeHoursClose = () => {
    this.setState({ removeOfficeHoursOpen: false });
  };

  handleRemoveButton = event => {
    if (event.id > 1000) this.setState({ disabled: false });
    this.setState({ selectedEvent: event });
  };

  handleEditDescriptionOpen = () => {
    this.setState({ editDescriptionOpen: true });
  };

  handleEditDescriptionClose = () => {
    this.setState({ editDescriptionOpen: false });
  };

  handleEditDescriptionButton = () => {
    this.setState({ disabled: false });
  };

  handleDescriptionSubmit = async descValue => {
    await ScheduleControl.setScheduleDescription(descValue);
    window.location.reload(); // refresh to show the change
  };

  handleHoursSubmit = mySchedule => {
    console.log('mySchedule', mySchedule);
  };

  handleDoubleClick = event => {
    if (this.props.myProf) {
      this.setState({ officeHoursOpen: true });
      this.setState({ selectedEvent: event });
      this.setState({ isDoubleClick: true });
    }
  };

  handleChangeSchedulePrivacy() {
    this.setState({ isSchedulePrivate: !this.state.isSchedulePrivate });
  }

  handleIsExpanded() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    const { classes } = this.props;
    let isFaculty = String(this.props.profile.PersonType).includes('fac');
    let privacyButton,
      addOfficeHourButton,
      removeOfficeHourButton,
      editDescriptionButton,
      schedulePanel;

    let editDialog = (
      <EditDescriptionDialog
        onDialogSubmit={this.handleDescriptionSubmit}
        handleEditDescriptionClose={this.handleEditDescriptionClose}
        editDescriptionOpen={this.state.editDescriptionOpen}
      />
    );

    let hoursDialog = (
      <HoursDialog
        onDialogSubmit={this.handleHoursSubmit}
        handleOfficeHoursClose={this.handleOfficeHoursClose}
        officeHoursOpen={this.state.officeHoursOpen}
        selectedEvent={this.state.selectedEvent}
        isDoubleClick={this.state.isDoubleClick}
      />
    );

    let removeHoursDialog = (
      <RemoveHoursDialog
        onDialogSubmit={this.handleRemoveSubmit}
        handleRemoveOfficeHoursClose={this.handleRemoveOfficeHoursClose}
        removeOfficeHoursOpen={this.state.removeOfficeHoursOpen}
      />
    );

    if (this.props.myProf && !isFaculty) {
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
          <Typography>
            {this.state.isSchedulePrivate ? 'Hide my course schedule' : 'Show my course schedule'}
          </Typography>
        </Fragment>
      );
    }

    if (this.props.myProf) {
      editDescriptionButton = (
        <Fragment>
          <Button onClick={this.handleEditDescriptionOpen}>EDIT DESCRIPTION</Button>
        </Fragment>
      );
    }

    if (this.props.myProf) {
      addOfficeHourButton = (
        <Fragment>
          <Button onClick={this.handleOfficeHoursOpen}>ADD EVENT</Button>
        </Fragment>
      );
    }

    if (this.props.myProf) {
      removeOfficeHourButton = (
        <Fragment>
          <Button
            onClick={this.handleRemoveOfficeHoursOpen}
            disabled={this.state.disabled} //disabled
          >
            REMOVE EVENT
          </Button>
        </Fragment>
      );
    }

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
          {/* ///////////////////////////////////////////////////////////////////// */}
          <div className="schedule_content">
            {/* <Card> */}
            {/* <CardContent> */}

            <div className="privacy">{privacyButton}</div>

            <div className="last-updated">
              Last updated{' '}
              <TimeAgo date={this.scheduleControlInfo ? this.state.modifiedTimeStamp : null} />
            </div>

            <div className="description">{this.state.description}</div>

            <div className="edit_description">{editDescriptionButton}</div>

            <div className="add_event">{addOfficeHourButton}</div>

            <div className="remove_event">{removeOfficeHourButton}</div>

            <div className="schedule">
              <CourseSchedule
                profile={this.props.profile}
                handleRemoveButton={this.handleRemoveButton.bind(this)}
                handleEditDescriptionButton={this.handleEditDescriptionButton.bind(this)}
                handleDoubleClick={this.handleDoubleClick.bind(this)}
                handleOfficeHoursOpen={this.handleOfficeHoursOpen.bind(this)}
              />
            </div>
            {/* </CardContent> */}
            {/* </Card> */}
            {editDialog}
            {hoursDialog}
            {removeHoursDialog}
          </div>
          {/* //////////////////////////////////////////////////////////////////// */}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );

    return <Fragment>{schedulePanel}</Fragment>;
  }
}

export default withStyles(styles)(GordonSchedulePanel);
