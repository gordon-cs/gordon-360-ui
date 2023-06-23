import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  IconButton,
  Card,
  CardHeader,
  Divider,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import GordonLoader from 'components/Loader';
import { formatDistanceToNow } from 'date-fns';
import { Markup } from 'interweave';
import { Component, Fragment } from 'react';
import schedulecontrol from 'services/schedulecontrol';
import { gordonColors } from 'theme';
import EditDescriptionDialog from './components/EditDescriptionDialog';
import GordonScheduleCalendar from './components/ScheduleCalendar';
import styles from './ScheduleHeader.module.css';

class GordonSchedulePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myProf: false, //myProf is boolean value that determines whether this is myprofile or not. this.props.profile actually contains profile data.
      isExpanded: false,
      disabled: true,
      selectedEvent: null,
      isDoubleClick: false,
      description: '',
      modifiedTimeStamp: null,
      loading: true,
      resourceId: 0,
      reloadCall: false,
    };
    this.scheduleControlInfo = null;

    this.handleIsExpanded = this.handleIsExpanded.bind(this);
    this.handleEditDescriptionOpen = this.handleEditDescriptionOpen.bind(this);
    this.handleEditDescriptionClose = this.handleEditDescriptionClose.bind(this);
    this.handleEditDescriptionButton = this.handleEditDescriptionButton.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
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

  handleDoubleClick = (event) => {
    if (this.props.myProf && event.id > 1000) {
      this.setState({ myScheduleOpen: true, selectedEvent: event, isDoubleClick: true });
    }
  };

  handleIsExpanded() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  reloadHandler() {
    this.setState({ reloadCall: false });
  }

  render() {
    let editDescriptionButton, schedulePanel, editDialog, lastUpdate;

    lastUpdate = (
      <div style={{ color: gordonColors.primary.cyan }}>
        <Typography style={{ fontSize: '1rem' }}>Last Updated</Typography>
        {Boolean(this.scheduleControlInfo) && (
          <Typography>
            {formatDistanceToNow(new Date(this.state.modifiedTimeStamp), { addSuffix: true })}
          </Typography>
        )}
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
    }

    if (this.props.myProf) {
      editDescriptionButton = (
        <Fragment>
          <IconButton
            style={{ marginBottom: '0.5rem' }}
            onClick={this.handleEditDescriptionOpen}
            size="large"
          >
            <EditIcon style={{ fontSize: 20 }} />
          </IconButton>
        </Fragment>
      );
    }

    if (this.state.loading) {
      schedulePanel = <GordonLoader />;
    } else {
      schedulePanel = (
        <>
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            onChange={this.handleIsExpanded}
            defaultExpanded={this.props.myProf}
          >
            <AccordionSummary
              className={styles.header}
              expandIcon={<ExpandMoreIcon color="secondary" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography fontSize={24}>Schedule</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {this.props.isOnline && (
                <>
                  <Grid container direction="row" item xs={12} lg={12} spacing={2}>
                    <Grid item lg={1}></Grid>
                    <Grid item xs={4} lg={1} align="left" classname={styles.officeHourText}>
                      <Markup content="Office Hours: " />

                      <item>{editDescriptionButton}</item>
                    </Grid>
                    <Grid item xs={7} lg={9} align="left" classname={styles.officeHourText}>
                      <Divider />
                      <item>
                        <Markup content={this.state.description} />
                      </item>
                      <Divider />
                    </Grid>
                  </Grid>
                </>
              )}
              <Grid item xs={12} lg={10}>
                <GordonScheduleCalendar
                  profile={this.props.profile}
                  myProf={this.props.myProf}
                  handleEditDescriptionButton={this.handleEditDescriptionButton.bind(this)}
                  handleDoubleClick={this.handleDoubleClick.bind(this)}
                  reloadHandler={this.reloadHandler}
                  reloadCall={this.state.reloadCall}
                  isOnline={this.props.isOnline}
                />
              </Grid>

              {editDialog}
            </AccordionDetails>
          </Accordion>
        </>
      );
    }

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>{schedulePanel}</LocalizationProvider>
    );
  }
}

export default GordonSchedulePanel;
