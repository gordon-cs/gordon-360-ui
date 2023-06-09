import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Switch,
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import GordonLoader from 'components/Loader';
import { Markup } from 'interweave';
import { Component, Fragment } from 'react';
import schedulecontrol from 'services/schedulecontrol';
import { formatTimeAgo } from 'services/utils';
import { gordonColors } from 'theme';
import EditDescriptionDialog from './components/EditDescriptionDialog';
import GordonScheduleCalendar from './components/ScheduleCalendar';
import styles from './ScheduleHeader.module.css';

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
      isExpanded: false,
      disabled: true,
      selectedEvent: null, //see if we actually need this later
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
    const replaced = this.state.description;

    const { classes } = this.props;
    let isFaculty = String(this.props.profile.PersonType).includes('fac');

    let editDescriptionButton, schedulePanel, editDialog, lastUpdate;

    lastUpdate = (
      <div style={{ color: gordonColors.primary.cyan }}>
        <Typography style={{ fontSize: '0.9rem' }}>Last Updated</Typography>
        {Boolean(this.scheduleControlInfo) && (
          <Typography>{formatTimeAgo(this.state.modifiedTimeStamp)}</Typography>
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

    let panelTitle = '';
    this.props.myProf ? (this.state.isExpanded = false) : (this.state.isExpanded = true);
    this.state.isExpanded ? (panelTitle = 'Hide') : (panelTitle = 'Show');
    if (this.state.loading) {
      schedulePanel = <GordonLoader />;
    } else if (!this.props.myProf && !isFaculty) {
      schedulePanel = (
        <>
          <Grid item xs={12} className={styles.schedules}>
            <Grid container className={styles.schedules_header}>
              <CardHeader title="Profile Note" />
            </Grid>
            <Card className={styles.memberships_card}>
              <CardContent align="left">{replaced}</CardContent>
            </Card>
          </Grid>
        </>
      );
    } else {
      schedulePanel = (
        <>
          <Grid container className={styles.schedules_header}>
            <CardHeader title="Schedule" />
          </Grid>
          <Card className={styles.schedules_card}>
            <Accordion
              TransitionProps={{ unmountOnExit: true }}
              onChange={this.handleIsExpanded}
              defaultExpanded={this.props.myProf}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{panelTitle} Schedule</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="row" justifyContent="center" align="left">
                  {this.props.isOnline && (
                    <Grid container direction="row" item xs={12} lg={10}>
                      <Grid item align="center" xs={2}>
                        <Typography>Office Hours:</Typography>
                        <item>{editDescriptionButton}</item>
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        justifyContent="flex-start"
                        classname={styles.officeHourText}
                      >
                        <item>
                          <Markup classname={styles.officeHourText} content={replaced} />
                        </item>
                      </Grid>

                      {/* THIS IS FOR LAST UPDATED */}
                      {/* <Grid
                        container
                        direction="column"
                        item
                        xs={12}
                        lg={8}
                        alignItems="flex-start"
                        justifyContent="flex-start"
                      >
                        {lastUpdate}
                      </Grid> */}
                    </Grid>
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
                </Grid>

                {editDialog}
              </AccordionDetails>
            </Accordion>
          </Card>
        </>
      );
    }

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>{schedulePanel}</LocalizationProvider>
    );
  }
}

export default withStyles(styles2)(GordonSchedulePanel);
