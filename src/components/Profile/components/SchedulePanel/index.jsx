import React, { useState, useEffect, Fragment } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import GordonLoader from 'components/Loader';
import { formatDistanceToNow } from 'date-fns';
import { Markup } from 'interweave';
import schedulecontrol from 'services/schedulecontrol';
import { gordonColors } from 'theme';
import EditDescriptionDialog from './components/EditDescriptionDialog';
import GordonScheduleCalendar from './components/ScheduleCalendar';
import styles from './ScheduleHeader.module.css';

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
  const [scheduleControlInfo, setScheduleControlInfo] = useState(null);
  // Remove the line: let scheduleControlInfo = null;

  useEffect(() => {
    loadData(props.profile);
  }, [props.profile]);

  const loadData = async (searchedUser) => {
    try {
      const scheduleControlInfo = await schedulecontrol.getScheduleControl(
        searchedUser.AD_Username,
      );
      if (scheduleControlInfo) {
        setScheduleControlInfo({
          isSchedulePrivate: scheduleControlInfo.IsSchedulePrivate,
          description: scheduleControlInfo.Description
            ? scheduleControlInfo.Description.replace(new RegExp('SlSh', 'g'), '/')
                .replace(new RegExp('CoLn', 'g'), ':')
                .replace(new RegExp('dOT', 'g'), '.')
            : '',
          modifiedTimeStamp: scheduleControlInfo.ModifiedTimeStamp,
        });
      }
    } catch (e) {
      setLoading(false);
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

  let editDescriptionButton, schedulePanel, editDialog, lastUpdate;

  lastUpdate = (
    <div style={{ color: gordonColors.primary.cyan }}>
      <Typography style={{ fontSize: '1rem' }}>Last Updated</Typography>
      {Boolean(scheduleControlInfo) && (
        <Typography>
          {formatDistanceToNow(new Date(modifiedTimeStamp), { addSuffix: true })}
        </Typography>
      )}
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

  if (loading) {
    schedulePanel = <GordonLoader />;
  } else {
    schedulePanel = (
      <>
        <Accordion
          TransitionProps={{ unmountOnExit: true }}
          onChange={handleIsExpanded}
          defaultExpanded={props.myProf}
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
            {props.isOnline && (
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
                      <Markup content={description} />
                    </item>
                    <Divider />
                  </Grid>
                </Grid>
              </>
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

            {editDialog}
          </AccordionDetails>
        </Accordion>
      </>
    );
  }

  return <LocalizationProvider dateAdapter={AdapterDateFns}>{schedulePanel}</LocalizationProvider>;
};

export default GordonSchedulePanel;
