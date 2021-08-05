import { Component, Fragment } from 'react';
import GordonScheduleCalendar from './components/ScheduleCalendar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import { gordonColors } from 'theme';
import MyScheduleDialog from './components/myScheduleDialog';
import RemoveScheduleDialog from './components/RemoveScheduleDialog';
import EditDescriptionDialog from './components/EditDescriptionDialog';
import TimeAgo from 'react-timeago';
import schedulecontrol from 'services/schedulecontrol';
import urlRegex from 'url-regex-safe';
import { Markup } from 'interweave';

import myschedule from 'services/myschedule';

import GordonLoader from 'components/Loader';

import {
  Grid,
  Button,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';

// Default values
const STARTHOUR = '08:00';
const ENDHOUR = '17:00';

const styles2 = {
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
      myProf: false, //myProf is boolean value that determines whether this is myprofile or not. this.props.profile actually contains profile data.
      isSchedulePrivate: 0,
      isExpanded: false,
      myScheduleOpen: false,
      disabled: true,
      selectedEvent: null,
      isDoubleClick: false,
      description: '',
      modifiedTimeStamp: null,
      loading: true,
      start: STARTHOUR,
      end: ENDHOUR,
      resourceId: 0,
      reloadCall: false,
    };
    this.scheduleControlInfo = null;

    this.handleIsExpanded = this.handleIsExpanded.bind(this);
    this.handleMyScheduleOpen = this.handleMyScheduleOpen.bind(this);
    this.handleMyScheduleClose = this.handleMyScheduleClose.bind(this);
    this.handleRemoveMyScheduleOpen = this.handleRemoveMyScheduleOpen.bind(this);
    this.handleRemoveMyScheduleClose = this.handleRemoveMyScheduleClose.bind(this);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleEditDescriptionOpen = this.handleEditDescriptionOpen.bind(this);
    this.handleEditDescriptionClose = this.handleEditDescriptionClose.bind(this);
    this.handleEditDescriptionButton = this.handleEditDescriptionButton.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleRemoveSubmit = this.handleRemoveSubmit.bind(this);
    this.reloadHandler = this.reloadHandler.bind(this);
  }

  componentDidMount() {
    this.loadData(this.props.profile);
  }

  loadData = async (searchedUser) => {
    try {
      const scheduleControlInfo = await schedulecontrol.getScheduleControl(
        searchedUser.AD_Username,
      );
      this.scheduleControlInfo = scheduleControlInfo;
    } catch (e) {
      this.setState({ loading: false });
    }
    if (this.scheduleControlInfo) {
      this.setState({
        isSchedulePrivate: this.scheduleControlInfo.IsSchedulePrivate,
        description: this.scheduleControlInfo.Description
          ? this.scheduleControlInfo.Description.replace(new RegExp('SlSh', 'g'), '/')
              .replace(new RegExp('CoLn', 'g'), ':')
              .replace(new RegExp('dOT', 'g'), '.')
          : '',
        modifiedTimeStamp: this.scheduleControlInfo.ModifiedTimeStamp,
      });
    }
    this.setState({ loading: false });
  };

  handleMyScheduleOpen = (slotInfo) => {
    if (this.props.myProf) {
      this.setState({ myScheduleOpen: true });
      if (slotInfo) {
        let startTime = slotInfo.start.toTimeString().split(':');
        let endTime = slotInfo.end.toTimeString().split(':');
        this.setState({
          start: startTime[0] + ':' + startTime[1],
          end: endTime[0] + ':' + endTime[1],
          resourceId: slotInfo.resourceId,
        });
      }
      this.setState({ isDoubleClick: false });
    }
  };

  handleMyScheduleClose = () => {
    this.setState({
      myScheduleOpen: false,
      isDoubleClick: false,
      selectedEvent: null,
    });
  };

  handleRemoveMyScheduleOpen = () => {
    this.setState({ removeMyScheduleOpen: true });
  };

  handleRemoveMyScheduleClose = () => {
    this.setState({ removeMyScheduleOpen: false });
  };

  handleRemoveButton = (event) => {
    if (event.id > 1000) {
      this.setState({ disabled: false, selectedEvent: event });
    } else {
      this.setState({ disabled: true });
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

  handleDescriptionSubmit = async (descValue) => {
    await schedulecontrol.setScheduleDescription(descValue);
    this.loadData(this.props.profile);
  };

  handleMyScheduleSubmit = (mySchedule) => {
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
        .then((value) => {
          this.loadData(this.props.profile);
          this.setState({ reloadCall: true });
        })
        .catch((error) => {
          alert('There was an error while updating the event');
          console.log(error);
        });
    } else {
      myschedule
        .addMySchedule(data)
        .then((value) => {
          this.loadData(this.props.profile);
          this.setState({ reloadCall: true });
        })
        .catch((error) => {
          alert('There was an error while adding the event');
          console.log(error);
        });
    }
  };

  handleRemoveSubmit() {
    myschedule
      .deleteMySchedule(this.state.selectedEvent.id)
      .then((value) => {
        this.loadData(this.props.profile);
        this.setState({ reloadCall: true, disabled: true });
      })
      .catch((error) => {
        alert('There was an error while removing the event');
        console.log(error);
      });
  }

  handleDoubleClick = (event) => {
    if (this.props.myProf && event.id > 1000) {
      this.setState({ myScheduleOpen: true, selectedEvent: event, isDoubleClick: true });
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

  reloadHandler() {
    this.setState({ reloadCall: false });
  }

  render() {
    const replaced = this.state.description.replace(urlRegex({ strict: false }), function (url) {
      if (url.split('://')[0] !== 'http' && url.split('://')[0] !== 'https') {
        return '<a target="_blank" rel="noopener" href="https://' + url + '">' + url + '</a>';
      } else {
        return '<a target="_blank" rel="noopener" href="' + url + '">' + url + '</a>';
      }
    });

    const button = {
      background: gordonColors.primary.cyan,
      color: 'white',
    };
    const { classes } = this.props;
    let isFaculty = String(this.props.profile.PersonType).includes('fac');

    let privacyButton,
      removeOfficeHourButton,
      editDescriptionButton,
      schedulePanel,
      editDialog,
      myScheduleDialog,
      removeScheduleDialog,
      lastUpdate;

    lastUpdate = (
      <div style={{ color: gordonColors.primary.cyan }}>
        <Typography style={{ fontSize: '0.9rem' }}>Last Updated</Typography>
        <TimeAgo date={this.scheduleControlInfo ? this.state.modifiedTimeStamp : null} />
      </div>
    );

    if (this.props.myProf) {
      editDialog = (
        <EditDescriptionDialog
          onDialogSubmit={this.handleDescriptionSubmit}
          handleEditDescriptionClose={this.handleEditDescriptionClose}
          editDescriptionOpen={this.state.editDescriptionOpen}
          descriptiontext={this.state.description}
        />
      );

      myScheduleDialog = (
        <MyScheduleDialog
          onDialogSubmit={this.handleMyScheduleSubmit}
          handleMyScheduleClose={this.handleMyScheduleClose}
          myScheduleOpen={this.state.myScheduleOpen}
          selectedEvent={this.state.selectedEvent}
          isDoubleClick={this.state.isDoubleClick}
          startTime={this.state.start}
          endTime={this.state.end}
          resourceId={this.state.resourceId}
        />
      );

      removeScheduleDialog = (
        <RemoveScheduleDialog
          onDialogSubmit={this.handleRemoveSubmit}
          handleRemoveMyScheduleClose={this.handleRemoveMyScheduleClose}
          removeMyScheduleOpen={this.state.removeMyScheduleOpen}
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
          <Typography style={{ fontSize: '0.9rem' }}>
            {this.state.isSchedulePrivate
              ? 'Course Schedule : Private'
              : 'Course Schedule : Public'}
          </Typography>
        </Fragment>
      );
    }

    if (this.props.myProf) {
      editDescriptionButton = (
        <Fragment>
          <Button variant="contained" style={button} onClick={this.handleEditDescriptionOpen}>
            EDIT DESCRIPTION
          </Button>
        </Fragment>
      );
    }

    if (this.props.myProf) {
      removeOfficeHourButton = (
        <Fragment>
          <Button
            variant="contained"
            style={{ backgroundColor: gordonColors.secondary.red, color: 'white' }}
            onClick={this.handleRemoveMyScheduleOpen}
            disabled={this.state.disabled} //disabled
          >
            REMOVE EVENT
          </Button>
        </Fragment>
      );
    }

    let panelTitle = '';
    this.state.isExpanded ? (panelTitle = 'Hide') : (panelTitle = 'Show');
    if (this.state.loading) {
      schedulePanel = <GordonLoader />;
    } else {
      schedulePanel = (
        <Accordion TransitionProps={{ unmountOnExit: true }} onChange={this.handleIsExpanded}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{panelTitle} the Schedule</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction="row" justifyContent="center">
              {this.props.network === 'online' && (
                <Grid container direction="row" item xs={12} lg={10}>
                  <Grid
                    container
                    item
                    xs={12}
                    lg={8}
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Markup content={replaced} />
                  </Grid>

                  <Grid
                    container
                    direction="column"
                    item
                    xs={12}
                    lg={4}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                  >
                    {privacyButton}
                  </Grid>

                  <Grid item xs={6} lg={2}>
                    {editDescriptionButton}
                  </Grid>

                  <Grid item xs={6} lg={2}>
                    {removeOfficeHourButton}
                  </Grid>

                  <Grid
                    container
                    direction="column"
                    item
                    xs={12}
                    lg={8}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                  >
                    {lastUpdate}
                  </Grid>
                </Grid>
              )}

              <Grid item xs={12} lg={10}>
                <GordonScheduleCalendar
                  profile={this.props.profile}
                  myProf={this.props.myProf}
                  handleRemoveButton={this.handleRemoveButton.bind(this)}
                  handleEditDescriptionButton={this.handleEditDescriptionButton.bind(this)}
                  handleDoubleClick={this.handleDoubleClick.bind(this)}
                  handleMyScheduleOpen={this.handleMyScheduleOpen.bind(this)}
                  schedulePrivacy={this.state.isSchedulePrivate}
                  reloadHandler={this.reloadHandler}
                  reloadCall={this.state.reloadCall}
                  network={this.props.network}
                />
              </Grid>
            </Grid>

            {editDialog}
            {myScheduleDialog}
            {removeScheduleDialog}
          </AccordionDetails>
        </Accordion>
      );
    }

    return <Fragment>{schedulePanel}</Fragment>;
  }
}

export default withStyles(styles2)(GordonSchedulePanel);
