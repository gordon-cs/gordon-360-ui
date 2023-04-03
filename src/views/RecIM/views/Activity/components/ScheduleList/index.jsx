import { Grid, Typography, Chip, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';
import TuneIcon from '@mui/icons-material/Tune';
import { ContentCard } from 'views/RecIM/components/Forms/Form/components/ContentCard';
import { MatchList } from 'views/RecIM/components/List';
import UpdateIcon from '@mui/icons-material/Update';
import RestoreIcon from '@mui/icons-material/Restore';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {
  formatDateTimeRange,
  standardDate,
  standardTimeOnly,
} from 'views/RecIM/components/Helpers';
import { format, isPast, isFuture } from 'date-fns';
import {
  deleteSeriesCascade,
  scheduleSeriesMatches,
  getSeriesSchedule,
} from 'services/recim/series';
import { useState, useEffect } from 'react';
import styles from './../../Activity.module.css';
import SeriesForm from 'views/RecIM/components/Forms/SeriesForm';
import SeriesScheduleForm from 'views/RecIM/components/Forms/SeriesScheduleForm';
import MatchForm from 'views/RecIM/components/Forms/MatchForm';
import { useWindowSize } from 'hooks';
import { windowBreakWidths } from 'theme';

const ScheduleList = ({ isAdmin, series, activityID, reload, setReload, activityTeams }) => {
  const [anchorEl, setAnchorEl] = useState();
  const [width] = useWindowSize();
  const [showAdminTools, setShowAdminTools] = useState(false);
  const [showDetailsMenu, setShowDetailsMenu] = useState(false);
  const [openAutoSchedulerDisclaimer, setOpenAutoSchedulerDisclaimer] = useState(false);
  const [openDeleteDisclaimer, setOpenDeleteDisclaimer] = useState(false);
  const [disclaimerContent, setDisclaimerContent] = useState('');
  const [openEditSeriesForm, setOpenEditSeriesForm] = useState(false);
  const [openSeriesScheduleForm, setOpenSeriesScheduleForm] = useState(false);
  const [openMatchForm, setOpenMatchForm] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [seriesSchedule, setSeriesSchedule] = useState();

  useEffect(() => {
    if (width < windowBreakWidths.breakSM) setIsMobileView(true);
    else setIsMobileView(false);
  }, [width]);

  useEffect(() => {
    const loadSchedule = async () => {
      let fetchedSchedule = await getSeriesSchedule(series.ID);
      if (fetchedSchedule.ID !== 0) setSeriesSchedule(fetchedSchedule);
    };
    loadSchedule();
  }, [series]);

  // default closure
  const closeMenusAndForms = () => {
    setAnchorEl(null);
    setShowAdminTools(false);
    setShowDetailsMenu(false);
  };

  // edit button
  const handleEditSeries = () => {
    setOpenEditSeriesForm(true);
    closeMenusAndForms();
  };

  const handleCreateMatch = () => {
    setOpenMatchForm(true);
    closeMenusAndForms();
  };

  const handleSeriesSchedule = () => {
    setOpenSeriesScheduleForm(true);
    closeMenusAndForms();
  };

  const handleFormSubmit = (status, setOpenForm) => {
    setReload((prev) => !prev);
    setOpenForm(false);
  };

  // autoschedule button
  const handleAutoSchedule = () => {
    const numMatches = (type, numTeams) => {
      switch (type) {
        case 'Round Robin':
          return (numTeams * (numTeams - 1)) / 2;
        case 'Single Elim':
          return numTeams - 1;
        case 'Ladder':
          return 1; //temporary
        case 'Double Elim':
          return numTeams * 2 - 1;
        default:
          return null;
      }
    };
    setDisclaimerContent(
      <Typography margin={4}>
        <Typography variant="body1" paragraph>
          {series.Match.length > 0 &&
            `${series.Name} already has ${series.Match.length} on-going/scheduled matches.`}
          You are attempting to create an additional {''}
          <b>{numMatches(series.Type, series.TeamStanding.length)}</b> {''}
          matches in the format of {series.Type} among {series.TeamStanding.length} teams
        </Typography>

        <Typography variant="body1" paragraph>
          Each match has an estimated length of {series.Schedule.EstMatchTime} minutes, with a 15
          minutes buffer in between each match. Matches will be scheduled to start on {''}
          {standardDate(series.StartDate, false)}, or the earliest available day, at{' '}
          {format(Date.parse(series.Schedule.StartTime), 'h:mmaaa')}.{' '}
        </Typography>
      </Typography>,
    );
    setOpenAutoSchedulerDisclaimer(true);
    closeMenusAndForms();
  };

  const handleConfirmAutoSchedule = () => {
    scheduleSeriesMatches(series.ID).then((res) => {
      setOpenAutoSchedulerDisclaimer(false);
      setReload((prev) => !prev);
    });
  };

  // delete button
  const handleDelete = () => {
    setDisclaimerContent(
      <Typography margin={4}>
        <Typography variant="body1" paragraph>
          <b>{`Be advised, this process is irreversible.`}</b>
        </Typography>
        <Typography variant="body1" paragraph>
          {`You are attempting to delete: Series #${series.ID}, ${series.Name}.`}
        </Typography>
        <Typography variant="body1" paragraph>
          {`This includes the Series itself along with: `}
          <b>{series.Match.length}</b>
          {` number of Matches. `}
        </Typography>
      </Typography>,
    );
    setOpenDeleteDisclaimer(true);
    closeMenusAndForms();
  };

  const handleConfirmDelete = () => {
    deleteSeriesCascade(series.ID).then((res) => {
      setOpenDeleteDisclaimer(false);
      setReload(!reload);
    });
  };

  const handleOpenScheduleDetails = (e) => {
    handleButtonClick(e);
    setShowDetailsMenu(true);
  };

  // menu button click
  const handleOpenAdminTools = (e) => {
    handleButtonClick(e);
    setShowAdminTools(true);
  };

  const handleButtonClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const status = () => {
    // future series
    if (isFuture(Date.parse(series.StartDate)))
      return <Chip icon={<UpdateIcon />} label="scheduled" color="secondary" size="small"></Chip>;
    // past series
    else if (isPast(Date.parse(series.EndDate)))
      return <Chip icon={<RestoreIcon />} label="completed" color="success" size="small"></Chip>;
    // current series
    return (
      <Chip
        icon={<ScheduleIcon />}
        label="ongoing"
        size="small"
        className={styles.ongoingChip}
      ></Chip>
    );
  };
  const scheduleMenu = () => {
    let daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let reformatedSchedule = [];
    daysArr.forEach((day) => {
      reformatedSchedule.push({
        Day: isMobileView ? day.substring(0, 1) : day,
        Available: seriesSchedule?.AvailableDays[day],
      });
    });
    return (
      <Menu
        open={showDetailsMenu}
        onClose={closeMenusAndForms}
        anchorEl={anchorEl}
        className={styles.menu}
      >
        <Typography className={styles.menuTitle}>{series?.Name}'s Schedule</Typography>
        <Divider />
        <Typography className={styles.menuTitle}>
          {standardTimeOnly(seriesSchedule?.StartTime)} -{' '}
          {standardTimeOnly(seriesSchedule?.EndTime)}
        </Typography>
        <Grid container direction="row" xs={12} className={styles.seriesScheduleMenu}>
          {reformatedSchedule.map((day) => (
            <Grid item direction="column">
              <Typography
                className={`${
                  day.Available
                    ? styles.seriesScheduleMenuItem_available
                    : styles.seriesScheduleMenuItem
                }`}
              >
                {day.Day}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Menu>
    );
  };

  return (
    <>
      <Grid container className={styles.seriesHeader} alignItems="center" columnSpacing={1}>
        <Grid item container direction="column" xs={6} sm={5}>
          <Typography variant="h6" className={styles.seriesMainText}>
            {series.Name}{' '}
          </Typography>
          <Typography className={styles.seriesSecondaryText}>{series.Type}</Typography>
        </Grid>
        {isMobileView && (
          <Grid item xs={5} textAlign="right">
            {status()}
          </Grid>
        )}
        <Grid item xs={6} sm={3}>
          <Typography className={styles.seriesDateText}>
            {formatDateTimeRange(series.StartDate, series.EndDate)}
          </Typography>
        </Grid>
        {!isMobileView && (
          <Grid item xs={6} sm={2.5}>
            {status()}
          </Grid>
        )}

        {isAdmin && (
          <Grid container item xs={5} sm={1} justifyContent="right">
            <IconButton onClick={handleOpenAdminTools}>
              <TuneIcon inline />
            </IconButton>{' '}
          </Grid>
        )}
        {/* reformats seriesSchedule to take the place of admin tools so that user have a cleaner visual */}
        {!isAdmin && seriesSchedule && (
          <Grid container item xs={5} sm={1} justifyContent="right">
            <IconButton onClick={handleOpenScheduleDetails}>
              <CalendarTodayIcon inline />
            </IconButton>{' '}
          </Grid>
        )}
        {isAdmin && seriesSchedule && (
          <Grid container item xs={12} justifyContent="center">
            <IconButton onClick={handleOpenScheduleDetails}>
              <CalendarTodayIcon inline />
            </IconButton>{' '}
          </Grid>
        )}
        {/* details menu */}
        {scheduleMenu()}
        {/* options menu */}
        <Menu
          open={showAdminTools}
          onClose={closeMenusAndForms}
          anchorEl={anchorEl}
          className={styles.menu}
        >
          <Typography className={styles.menuTitle}>Schedule</Typography>
          <MenuItem
            dense
            disabled={series.TeamStanding.length === 0}
            onClick={handleAutoSchedule}
            className={styles.menuButton}
          >
            Auto-schedule Series
          </MenuItem>
          <MenuItem dense onClick={handleSeriesSchedule} className={styles.menuButton} divider>
            Edit Schedule
          </MenuItem>
          <Typography className={styles.menuTitle}>Series</Typography>
          <MenuItem dense onClick={handleEditSeries} className={styles.menuButton}>
            Edit Series Info
          </MenuItem>
          <MenuItem dense onClick={handleCreateMatch} className={styles.menuButton}>
            Create a Match
          </MenuItem>
          <MenuItem dense onClick={handleDelete} className={styles.redButton}>
            Delete
          </MenuItem>
        </Menu>
      </Grid>
      {series.Match.length ? (
        <MatchList matches={series.Match} activityID={activityID} />
      ) : (
        <Typography className={styles.secondaryText}>
          Games have not yet been scheduled for this series.
        </Typography>
      )}
      <GordonDialogBox
        open={openAutoSchedulerDisclaimer}
        title="Auto-Scheduler Disclaimer"
        fullWidth
        maxWidth="sm"
        buttonClicked={() => handleConfirmAutoSchedule()}
        buttonName="I Understand"
        cancelButtonClicked={() => setOpenAutoSchedulerDisclaimer(false)}
        cancelButtonName="Cancel"
      >
        <ContentCard title={`You are attempting to use the auto-scheduler for ${series.Name}`}>
          {disclaimerContent}
        </ContentCard>
      </GordonDialogBox>
      <GordonDialogBox
        open={openDeleteDisclaimer}
        title="Delete Disclaimer"
        fullWidth
        maxWidth="sm"
        buttonClicked={() => handleConfirmDelete()}
        buttonName="I Understand"
        cancelButtonClicked={() => setOpenDeleteDisclaimer(false)}
        cancelButtonName="Cancel"
      >
        <ContentCard title={`You are attempting DELETE '${series.Name}'`}>
          {disclaimerContent}
        </ContentCard>
      </GordonDialogBox>
      {openEditSeriesForm && (
        <SeriesForm
          closeWithSnackbar={(status) => {
            handleFormSubmit(status, setOpenEditSeriesForm);
          }}
          openSeriesForm={openEditSeriesForm}
          setOpenSeriesForm={(bool) => setOpenEditSeriesForm(bool)}
          activityID={series.ActivityID}
          series={series}
          activityTeams={activityTeams}
        />
      )}
      {openSeriesScheduleForm && (
        <SeriesScheduleForm
          closeWithSnackbar={(status) => {
            handleFormSubmit(status, setOpenSeriesScheduleForm);
          }}
          openSeriesScheduleForm={openSeriesScheduleForm}
          setOpenSeriesScheduleForm={(bool) => setOpenSeriesScheduleForm(bool)}
          seriesID={series.ID}
        />
      )}
      {openMatchForm && (
        <MatchForm
          closeWithSnackbar={(status) => {
            handleFormSubmit(status, setOpenMatchForm);
          }}
          openMatchInformationForm={openMatchForm}
          setOpenMatchInformationForm={(bool) => setOpenMatchForm(bool)}
          series={series}
        />
      )}
    </>
  );
};

export default ScheduleList;
