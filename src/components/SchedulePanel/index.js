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

import schedulecontrol from './../../services/schedulecontrol';

import './schedulepanel.css';
import myschedule from '../../services/myschedule';

import GordonLoader from '../../components/Loader';

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
      myProf: false,  //myProf is boolean value that determines whether this is myprofile or not. this.props.profile actually contains profile data.
      isSchedulePrivate: 0,
      isExpanded: false,
      officeHoursOpen: false,
      disabled: true,
      selectedEvent: null,
      isDoubleClick: false,
      description: '',
      modifiedTimeStamp: null,
      loading: true,
      start:'08:00',
      end:'17:00',
      resourceId: 0,
      reloadCall: false,
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
    this.handleRemoveSubmit = this.handleRemoveSubmit.bind(this);
    this.reloadHandler = this.reloadHandler.bind(this);
  }

  componentWillMount() {
    this.loadData(this.props.profile);
  }

  loadData = async searchedUser => {
    try {
      const scheduleControlInfo = await schedulecontrol.getScheduleControl(searchedUser.AD_Username);
      this.scheduleControlInfo = scheduleControlInfo;
    } catch (e) {
      this.setState({ loading: false });
    }
    if (this.scheduleControlInfo) {
      this.setState({ isSchedulePrivate: this.scheduleControlInfo.IsSchedulePrivate,
        description: this.scheduleControlInfo.Description ? 
        this.scheduleControlInfo.Description.replace(new RegExp("SlSh", 'g'), '/').replace(new RegExp("CoLn", 'g'), ':')
      .replace(new RegExp("dOT", 'g'), '.') : '',
       modifiedTimeStamp: this.scheduleControlInfo.ModifiedTimeStamp });
    }
    this.setState({ loading: false });
  };

  handleOfficeHoursOpen = slotInfo => {
    if (this.props.myProf){
      this.setState({ officeHoursOpen: true });
      if (slotInfo){
        let startTime = slotInfo.start.toTimeString().split(":");
        let endTime = slotInfo.end.toTimeString().split(":");
        this.setState({start:startTime[0] + ":" + startTime[1],
          end:endTime[0] + ":" + endTime[1], resourceId: slotInfo.resourceId,
        });
      }
      this.setState({ isDoubleClick: false });
    }
  };

  handleOfficeHoursClose = () => {
    this.setState({
      officeHoursOpen: false,
      isDoubleClick: false,
      selectedEvent: null,
    });
  };

  handleRemoveOfficeHoursOpen = () => {
    this.setState({ removeOfficeHoursOpen: true });
  };

  handleRemoveOfficeHoursClose = () => {
    this.setState({ removeOfficeHoursOpen: false });
  };

  handleRemoveButton = event => {
    if (event.id > 1000) {
      this.setState({ disabled: false, selectedEvent: event });
    } else {
      this.setState({ disabled: true});
    }
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
    await schedulecontrol.setScheduleDescription(descValue);
    this.loadData(this.props.profile);
  };

  handleHoursSubmit = mySchedule => {
    var data = {
      Event_ID: null,
      Gordon_ID: this.props.profile.ID,
      DESCRIPTION: mySchedule.description,
      LOCATION: mySchedule.location,
      MON_CDE: mySchedule.monday ? 'M' : null,
      TUE_CDE: mySchedule.tuesday ? 'T' : null,
      WED_CDE: mySchedule.wednesday ? 'W' : null,
      THU_CDE: mySchedule.thursday ? 'R' : null,
      FRI_CDE: mySchedule.friday ? 'F' : null,
      SAT_CDE: mySchedule.saturday ? 'S' : null,
      SUN_CDE: mySchedule.sunday ? 'N' : null,
      IS_ALLDAY: mySchedule.allDay ? 1 : 0,
      BEGIN_TIME: mySchedule.startHour,
      END_TIME: mySchedule.endHour,
    };

    if (this.state.isDoubleClick) {
      this.setState({ isDoubleClick: false });
      data.Event_ID = this.state.selectedEvent.id;
      myschedule
        .updateMySchedule(data)
        .then(value => {
        this.loadData(this.props.profile);
        this.setState({reloadCall:true});
        })
        .catch(error => {
          alert('There was an error while updating the event');
          console.log(error);
        });
    } else {
      myschedule
        .addMySchedule(data)
        .then(value => {
        this.loadData(this.props.profile);
        this.setState({reloadCall:true});
        })
        .catch(error => {
          alert('There was an error while adding the event');
          console.log(error);
        });
    }
  };

  handleRemoveSubmit() {
    myschedule
      .deleteMySchedule(this.state.selectedEvent.id)
      .then(value => {
        this.loadData(this.props.profile);
        this.setState({reloadCall:true});
      })
      .catch(error => {
        alert('There was an error while removing the event');
        console.log(error);
      });
  }

  handleDoubleClick = event => {
    if (this.props.myProf && event.id > 1000) {
      this.setState({ officeHoursOpen: true, selectedEvent: event, isDoubleClick: true });
    }
  };

  handleChangeSchedulePrivacy() {
    this.setState({ isSchedulePrivate: !this.state.isSchedulePrivate }, () => {
      schedulecontrol.setSchedulePrivacy(this.state.isSchedulePrivate);
    });
  }

  handleIsExpanded() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  reloadHandler(){
    this.setState({reloadCall:false});
  }

  render() {
    const { classes } = this.props;
    let isFaculty = String(this.props.profile.PersonType).includes('fac');
    let privacyButton,
      removeOfficeHourButton,
      editDescriptionButton,
      schedulePanel,
      editDialog,
      hoursDialog,
      removeHoursDialog;

      if(this.props.myProf){
        editDialog = (
          <EditDescriptionDialog
            onDialogSubmit={this.handleDescriptionSubmit}
            handleEditDescriptionClose={this.handleEditDescriptionClose}
            editDescriptionOpen={this.state.editDescriptionOpen}
            descriptiontext={this.state.description}
          />
        );
    
        hoursDialog = (
          <HoursDialog
            onDialogSubmit={this.handleHoursSubmit}
            handleOfficeHoursClose={this.handleOfficeHoursClose}
            officeHoursOpen={this.state.officeHoursOpen}
            selectedEvent={this.state.selectedEvent}
            isDoubleClick={this.state.isDoubleClick}
            startTime={this.state.start}
            endTime={this.state.end}
            resourceId={this.state.resourceId}
          />
        );
    
        removeHoursDialog = (
          <RemoveHoursDialog
            onDialogSubmit={this.handleRemoveSubmit}
            handleRemoveOfficeHoursClose={this.handleRemoveOfficeHoursClose}
            removeOfficeHoursOpen={this.state.removeOfficeHoursOpen}
          />
        );
      }


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
    if (this.state.loading) {
      schedulePanel = <GordonLoader />;
    } else {
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
            <div className="schedule_content">

              <div className="privacy">{privacyButton}</div>

              <div className="last-updated">
                Last updated{' '}
                <TimeAgo date={this.scheduleControlInfo ? this.state.modifiedTimeStamp : null} />
              </div>

              <div className="description">{this.state.description}</div>

              <div className="edit_description">{editDescriptionButton}</div>

              <div className="remove_event">{removeOfficeHourButton}</div>

              <div className="schedule">
                <CourseSchedule
                  profile={this.props.profile}
                  myProf={this.props.myProf}
                  handleRemoveButton={this.handleRemoveButton.bind(this)}
                  handleEditDescriptionButton={this.handleEditDescriptionButton.bind(this)}
                  handleDoubleClick={this.handleDoubleClick.bind(this)}
                  handleOfficeHoursOpen={this.handleOfficeHoursOpen.bind(this)}
                  schedulePrivacy={this.state.isSchedulePrivate}
                  reloadHandler={this.reloadHandler}
                  reloadCall={this.state.reloadCall}
                />
              </div>
              {editDialog}
              {hoursDialog}
              {removeHoursDialog}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    }

    return <Fragment>{schedulePanel}</Fragment>;
  }
}

export default withStyles(styles)(GordonSchedulePanel);
