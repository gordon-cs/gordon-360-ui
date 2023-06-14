import React, { useState, useEffect, Fragment } from 'react';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import withStyles from '@mui/styles/withStyles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import GordonLoader from 'components/Loader';
import { Markup } from 'interweave';
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

const GordonSchedulePanel = (props) => {
  const [myProf, setMyProf] = useState(false);
  const [isExpanded, setIsExpanded] = useState(props, myProf ? false : true);
  const [disabled, setDisabled] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [description, setDescription] = useState('');
  const [modifiedTimeStamp, setModifiedTimeStamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resourceId, setResourceId] = useState(0);
  const [reloadCall, setReloadCall] = useState(false);
  const [editDescriptionOpen, setEditDescriptionOpen] = useState(false);

  let scheduleControlInfo = null;

  useEffect(() => {
    loadData(props.profile);
  }, [props.profile]);

  const loadData = async (searchedUser) => {
    try {
      const scheduleControlInfo = await schedulecontrol.getScheduleControl(
        searchedUser.AD_Username,
      );
      this.scheduleControlInfo = scheduleControlInfo;
    } catch (e) {
      setLoading(false);
    }
    if (this.scheduleControlInfo) {
      setScheduleControlInfo({
        isSchedulePrivate: this.scheduleControlInfo.IsSchedulePrivate,
        description: this.scheduleControlInfo.Description
          ? this.scheduleControlInfo.Description.replace(new RegExp('SlSh', 'g'), '/')
              .replace(new RegExp('CoLn', 'g'), ':')
              .replace(new RegExp('dOT', 'g'), '.')
          : '',
        modifiedTimeStamp: this.scheduleControlInfo.ModifiedTimeStamp,
      });
    }
    setLoading(false);
  };

  const handleEditDescriptionOpen = () => {
    setEditDescriptionOpen(true);
  };

  const handleEditDescriptionClose = () => {
    setEditDescriptionOpen(false);
  };

  const handleEditDescriptionButton = () => {
    setDisabled(false);
  };

  const handleDescriptionSubmit = async (descValue) => {
    await schedulecontrol.setScheduleDescription(descValue);
    loadData(props.profile);
  };

  const handleDoubleClick = (event) => {
    if (props.myProf && event.id > 1000) {
      setState({
        myScheduleOpen: true,
        selectedEvent: event,
        isDoubleClick: true,
      });
    }
  };

  const handleIsExpanded = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  const reloadHandler = () => {
    setReloadCall(false);
  };

  const replaced = description;

  const { classes } = props;
  const isFaculty = String(props.profile.PersonType).includes('fac');

  let editDescriptionButton, schedulePanel, editDialog, lastUpdate;

  lastUpdate = (
    <div style={{ color: gordonColors.primary.cyan }}>
      <Typography style={{ fontSize: '0.9rem' }}>Last Updated</Typography>
      {Boolean(scheduleControlInfo) && <Typography>{formatTimeAgo(modifiedTimeStamp)}</Typography>}
    </div>
  );

  if (props.myProf) {
    editDialog = (
      <EditDescriptionDialog
        onDialogSubmit={handleDescriptionSubmit}
        handleEditDescriptionClose={handleEditDescriptionClose}
        editDescriptionOpen={editDescriptionOpen}
        descriptiontext={description}
      />
    );
  }

  if (props.myProf) {
    editDescriptionButton = (
      <Fragment>
        <IconButton
          style={{ marginBottom: '0.5rem' }}
          onClick={handleEditDescriptionOpen}
          size="large"
        >
          <EditIcon style={{ fontSize: 20 }} />
        </IconButton>
      </Fragment>
    );
  }

  let panelTitle = isExpanded ? 'Hide' : 'Show';
  if (loading) {
    schedulePanel = <GordonLoader />;
  } else if (!props.myProf && !isFaculty) {
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
            onChange={handleIsExpanded}
            defaultExpanded={props.myProf}
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
                {props.isOnline && (
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
                    profile={props.profile}
                    myProf={props.myProf}
                    handleEditDescriptionButton={handleEditDescriptionButton}
                    handleDoubleClick={handleDoubleClick}
                    reloadHandler={reloadHandler}
                    reloadCall={reloadCall}
                    isOnline={props.isOnline}
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

  return <LocalizationProvider dateAdapter={AdapterDateFns}>{schedulePanel}</LocalizationProvider>;
};

export default withStyles(styles2)(GordonSchedulePanel);
