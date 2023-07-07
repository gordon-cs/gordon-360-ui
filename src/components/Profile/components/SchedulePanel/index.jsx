import React, { useState, useEffect, Fragment } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardHeader,
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
import scheduleService from 'services/schedule';
import { useNetworkStatus, useUser } from 'hooks';
import sessionService from 'services/session';

const GordonSchedulePanel = (props) => {
  const [myProf, setMyProf] = useState(false);
  const [isExpanded, setIsExpanded] = useState(props, myProf ? false : true);
  const [disabled, setDisabled] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState();
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [description, setDescription] = useState('');
  const [modifiedTimeStamp, setModifiedTimeStamp] = useState();
  const [loading, setLoading] = useState(true);
  const [resourceId, setResourceId] = useState(0);
  const [reloadCall, setReloadCall] = useState(false);
  const [editDescriptionOpen, setEditDescriptionOpen] = useState(false);
  const [scheduleControlInfo, setScheduleControlInfo] = useState();
  const [sessions, setSessions] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [currentAcademicSession, setCurrentAcademicSession] = useState('');

  const [selectedSession, setSelectedSession] = useState('');
  const isOnline = useNetworkStatus();

  const sessionFromURL = new URLSearchParams(location.search).get('session');

  useEffect(() => {
    const loadPage = async () => {
      setSessions(await sessionService.getAll());

      if (sessionFromURL) {
        setSelectedSession(sessionService.encodeSessionCode(sessionFromURL));
      } else {
        const { SessionCode: currentSessionCode } = await sessionService.getCurrent();
        setCurrentAcademicSession(currentSessionCode);
      }
    };
    loadPage();
  }, [sessionFromURL]);

  const handleSelectSession = async (value) => {
    setSelectedSession(value);
    reloadHandler();
  };

  useEffect(() => {
    loadData(props.profile);
  }, [props.profile]);

  const loadData = async (searchedUser) => {
    try {
      const scheduleControlInfo = await schedulecontrol.getScheduleControl(
        searchedUser.AD_Username,
      );
      console.log({ scheduleControlInfo });
      const schedule = await scheduleService.getSchedule(searchedUser.AD_Username, props.term);
      setEventInfo(scheduleService.makeScheduleCourses(schedule));
      if (scheduleControlInfo) {
        setDescription(
          scheduleControlInfo.Description
            ? // We decided to leave the regex code for now because the data stored in the database
              // before changing the api is still in the regex form.
              scheduleControlInfo.Description.replace(new RegExp('SlSh', 'g'), '/')
                .replace(new RegExp('CoLn', 'g'), ':')
                .replace(new RegExp('dOT', 'g'), '.')
            : '',
        );
        setModifiedTimeStamp(scheduleControlInfo.ModifiedTimeStamp);
      }
    } catch (e) {}
    setLoading(false);
  };
  console.log({ description });
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

  const handleIsExpanded = () => setIsExpanded((prevExpanded) => !prevExpanded);

  const reloadHandler = () => {
    setReloadCall((val) => !val);
  };

  const replaced = description;

  const { classes } = props;

  let editDescriptionButton, editDialog, lastUpdate;

  lastUpdate = (
    <div style={{ color: gordonColors.primary.cyan }}>
      <Typography style={{ fontSize: '0.9rem' }}>Last Updated</Typography>
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
  // console.log({ replaced });
  return loading ? (
    <GordonLoader />
  ) : (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {
        <>
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            onChange={handleIsExpanded}
            defaultExpanded={!props.myProf}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={styles.header}
            >
              <CardHeader className={styles.accordionHeader} title={'Course Schedule'} />
            </AccordionSummary>
            <AccordionDetails>
              <Grid container direction="row" justifyContent="center" align="left" spacing={4}>
                {props.isOnline && (
                  <Grid container direction="row" item xs={12} lg={12} spacing={2}>
                    <Grid item lg={1}></Grid>
                    <Grid item xs={4} lg={1} align="left" className={styles.officeHourText}>
                      <Markup content="Public Office Hours Note: " />
                      {editDescriptionButton}
                    </Grid>
                    <Grid item xs={7} lg={9} align="left">
                      <Divider />
                      <Markup content={replaced} />
                      <Divider />
                    </Grid>
                  </Grid>
                )}
                <Grid item xs={12} lg={3} spacing={2}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel id="schedule session">Term</InputLabel>
                    <Select
                      labelId="schedule-session"
                      id="schedule-session"
                      value={selectedSession}
                      onChange={(e) => handleSelectSession(e.target.value)}
                    >
                      {(isOnline
                        ? sessions
                        : sessions.filter((item) => item.SessionCode === selectedSession)
                      ).map(({ SessionDescription: description, SessionCode: code }) => (
                        <MenuItem label={description} value={code} key={code}>
                          {description}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid lg={7}></Grid>
                <Grid item xs={12} lg={10}>
                  <GordonScheduleCalendar
                    profile={props.profile}
                    term={selectedSession}
                    myProf={props.myProf}
                    handleEditDescriptionButton={handleEditDescriptionButton}
                    reloadCall={reloadCall}
                    isOnline={props.isOnline}
                  />
                </Grid>
              </Grid>
              {editDialog}
            </AccordionDetails>
          </Accordion>
        </>
      }
    </LocalizationProvider>
  );
};

export default GordonSchedulePanel;
