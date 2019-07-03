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
import user from './../../services/user';
import { gordonColors } from '../../theme';
import HoursDialog from './components/OfficeHoursDialog';
import RemoveHoursDialog from './components/RemoveHoursDialog';
import EditDescriptionDialog from './components/EditDescriptionDialog';

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
    };
    this.handleIsExpanded = this.handleIsExpanded.bind(this);
    this.handleOfficeHoursOpen = this.handleOfficeHoursOpen.bind(this);
    this.handleOfficeHoursClose = this.handleOfficeHoursClose.bind(this);
    this.handleRemoveOfficeHoursOpen = this.handleRemoveOfficeHoursOpen.bind(this);
    this.handleRemoveOfficeHoursClose = this.handleRemoveOfficeHoursClose.bind(this);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleEditDescriptionOpen = this.handleEditDescriptionOpen.bind(this);
    this.handleEditDescriptionClose = this.handleEditDescriptionClose.bind(this);
    this.handleEditDescriptionButton = this.handleEditDescriptionButton.bind(this);
  }

  handleOfficeHoursOpen = () => {
    this.setState({ officeHoursOpen: true });
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

  handleRemoveButton = () => {
    this.setState({ disabled: false });
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
    let privacyButton,
      addOfficeHourButton,
      removeOfficeHourButton,
      editDescriptionButton,
      schedulePanel;

    let editDialog = (
      <EditDescriptionDialog
        onDialogSubmit={this.onDialogSubmit}
        handleEditDescriptionClose={this.handleEditDescriptionClose}
        editDescriptionOpen={this.state.editDescriptionOpen}
      />
    );

    let hoursDialog = (
      <HoursDialog
        onDialogSubmit={this.onDialogSubmit}
        handleOfficeHoursClose={this.handleOfficeHoursClose}
        officeHoursOpen={this.state.officeHoursOpen}
      />
    );

    let removeHoursDialog = (
      <RemoveHoursDialog
        onDialogSubmit={this.onDialogSubmit}
        handleRemoveOfficeHoursClose={this.handleRemoveOfficeHoursClose}
        removeOfficeHoursOpen={this.state.removeOfficeHoursOpen}
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
      editDescriptionButton = (
        <Fragment>
          <Button onClick={this.handleEditDescriptionOpen}>EDIT DESCRIPTION</Button>
        </Fragment>
      );
    }

    if (this.props.myProf && isFaculty) {
      addOfficeHourButton = (
        <Fragment>
          <Button onClick={this.handleOfficeHoursOpen}>ADD EVENT</Button>
        </Fragment>
      );
    }

    if (this.props.myProf && isFaculty) {
      removeOfficeHourButton = (
        <Fragment>
          <Button
            onClick={this.handleRemoveOfficeHoursOpen} //disabled
          >
            REMOVE EVENT
          </Button>
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
            {/* ///////////////////////////////////////////////////////////////////// */}
            <div className="schedule_content">
              {/* <Card> */}
              {/* <CardContent> */}
              <div className="title">My Schedule</div>

              <div className="privacy">{privacyButton}</div>

              <div className="description">Insert description here</div>

              <div className="edit_description">{editDescriptionButton}</div>

              <div className="add_event">{addOfficeHourButton}</div>

              <div className="remove_event">{removeOfficeHourButton}</div>

              <div className="schedule">
                <CourseSchedule profile={this.props.profile} />
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
    }

    return <Fragment>{schedulePanel}</Fragment>;
  }
}

export default withStyles(styles)(GordonSchedulePanel);
