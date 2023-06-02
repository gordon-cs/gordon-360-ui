import { Grid, Typography, Chip, IconButton, Menu, MenuItem, Divider, Switch } from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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
import RecIMBracket from 'views/RecIM/components/RecIMBracket/index';
import MatchForm from 'views/RecIM/components/Forms/MatchForm';
import { useWindowSize } from 'hooks';
import { windowBreakWidths } from 'theme';
import { deleteMatchList } from 'services/recim/match';
import GordonLoader from 'components/Loader';

const ScheduleList = ({
  isAdmin,
  series,
  activityID,
  reload,
  setReload,
  activityTeams,
  createSnackbar,
}) => {
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const [width] = useWindowSize();
  const [showAdminTools, setShowAdminTools] = useState(false);
  const [showDetailsMenu, setShowDetailsMenu] = useState(false);
  const [openAutoSchedulerDisclaimer, setOpenAutoSchedulerDisclaimer] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openConfirmDeleteMatches, setOpenConfirmDeleteMatches] = useState(false);
  const [disclaimerContent, setDisclaimerContent] = useState('');
  const [openEditSeriesForm, setOpenEditSeriesForm] = useState(false);
  const [openSeriesScheduleForm, setOpenSeriesScheduleForm] = useState(false);
  const [showBracket, setShowBracket] = useState(false);
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
  const handleEditSeriesMenuClick = () => {
    setOpenEditSeriesForm(true);
    closeMenusAndForms();
  };

  const handleCreateMatch = () => {
    setOpenMatchForm(true);
    closeMenusAndForms();
  };

  const handleSeriesScheduleMenuClick = () => {
    setOpenSeriesScheduleForm(true);
    closeMenusAndForms();
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
    setLoading(true);
    scheduleSeriesMatches(series.ID).then((res) => {
      setOpenAutoSchedulerDisclaimer(false);
      setReload((prev) => !prev);
      setLoading(false);
    });
  };

  const handleDelete = () => {
    setDisclaimerContent(
      <Typography margin={4}>
        <Typography variant="body1" paragraph>
          You are attempting to delete:{' '}
          <i>
            Series #{series.ID}, {series.Name}
          </i>
          .
        </Typography>
        <Typography variant="body1" paragraph>
          This includes the series itself along with:{' '}
          <i>
            {series.Match.length} match
            {series.Match.length !== 1 && `es`}
          </i>
          .
        </Typography>
        <Typography variant="body1" paragraph>
          <b>Are you sure you want to delete? This process is irreversible.</b>
        </Typography>
      </Typography>,
    );
    setOpenConfirmDelete(true);
    closeMenusAndForms();
  };

  const handleDeleteMatches = () => {
    setDisclaimerContent(
      <Typography margin={2}>
        <Typography variant="body1" paragraph>
          You are attempting to delete all matches in:{' '}
          <i>
            Series #{series.ID}, {series.Name}
          </i>
          .
        </Typography>
        <Typography variant="body1" paragraph>
          This includes:{' '}
          <i>
            {series.Match.length} match
            {series.Match.length !== 1 && `es`}
          </i>
          .
        </Typography>
        <Typography variant="body1" paragraph>
          <b>Are you sure you want to delete? This process is irreversible.</b>
        </Typography>
      </Typography>,
    );
    setOpenConfirmDeleteMatches(true);
    closeMenusAndForms();
  };

  const handleConfirmDelete = () => {
    setLoading(true);
    deleteSeriesCascade(series.ID).then((res) => {
      setOpenConfirmDelete(false);
      setReload(!reload);
      setLoading(false);
    });
  };

  const handleConfirmDeleteMatches = async () => {
    setLoading(true);
    deleteMatchList(series.Match).then(() => {
      setOpenConfirmDeleteMatches(false);
      setLoading(false);
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
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
              <MoreHorizIcon inline />
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
            Auto-schedule series
          </MenuItem>
          <MenuItem
            dense
            onClick={handleSeriesScheduleMenuClick}
            className={styles.menuButton}
            divider
          >
            Edit schedule
          </MenuItem>
          <MenuItem dense onClick={handleDeleteMatches} className={styles.redButton}>
            Delete matches
          </MenuItem>
          <Typography className={styles.menuTitle}>Series</Typography>
          <MenuItem dense onClick={handleEditSeriesMenuClick} className={styles.menuButton}>
            Edit series info
          </MenuItem>
          <MenuItem dense onClick={handleCreateMatch} className={styles.menuButton}>
            Create a match
          </MenuItem>
          <MenuItem dense onClick={handleDelete} className={styles.redButton}>
            Delete
          </MenuItem>
        </Menu>
      </Grid>

      {series.Type === 'Single Elim' && series.Match.length > 0 && (
        <Grid container justifyContent="center" alignItems="center">
          show bracket
          <Switch color="secondary" onClick={(event) => setShowBracket(event.target.checked)} />
        </Grid>
      )}

      {series.Match.length ? (
        showBracket ? (
          <RecIMBracket series={series} />
        ) : (
          <MatchList matches={series.Match} activityID={activityID} />
        )
      ) : (
        <Typography className={styles.secondaryText}>
          Games have not yet been scheduled for this series.
        </Typography>
      )}
      {}
      <GordonDialogBox
        open={openAutoSchedulerDisclaimer}
        title="Auto-Scheduler Disclaimer"
        fullWidth
        maxWidth="sm"
        buttonClicked={() => handleConfirmAutoSchedule()}
        buttonName={loading ? 'Scheduling...' : 'I Understand'}
        isButtonDisabled={loading}
        cancelButtonClicked={() => setOpenAutoSchedulerDisclaimer(false)}
        cancelButtonName="Cancel"
      >
        <ContentCard title={`You are attempting to use the auto-scheduler for ${series.Name}`}>
          {disclaimerContent}
        </ContentCard>
      </GordonDialogBox>
      <GordonDialogBox
        title="Confirm Delete"
        open={openConfirmDelete}
        cancelButtonClicked={() => setOpenConfirmDelete(false)}
        buttonName={loading ? 'Deleting...' : 'Delete series'}
        isButtonDisabled={loading}
        buttonClicked={() => handleConfirmDelete()}
        severity="error"
      >
        {disclaimerContent}
      </GordonDialogBox>
      <GordonDialogBox
        title="Confirm Delete Matches"
        open={openConfirmDeleteMatches}
        cancelButtonClicked={() => setOpenConfirmDeleteMatches(false)}
        isButtonDisabled={loading}
        buttonName={loading ? 'Deleting...' : 'Delete matches'}
        buttonClicked={() => handleConfirmDeleteMatches()}
        severity="error"
      >
        {disclaimerContent}
      </GordonDialogBox>
      <SeriesForm
        createSnackbar={createSnackbar}
        onClose={() => setReload((prev) => !prev)}
        openSeriesForm={openEditSeriesForm}
        setOpenSeriesForm={(bool) => setOpenEditSeriesForm(bool)}
        activityID={series.ActivityID}
        series={series}
        activityTeams={activityTeams}
      />
      <SeriesScheduleForm
        createSnackbar={createSnackbar}
        onClose={() => setReload((prev) => !prev)}
        openSeriesScheduleForm={openSeriesScheduleForm}
        setOpenSeriesScheduleForm={(bool) => setOpenSeriesScheduleForm(bool)}
        seriesID={series.ID}
      />
      <MatchForm
        createSnackbar={createSnackbar}
        onClose={() => setReload((prev) => !prev)}
        openMatchInformationForm={openMatchForm}
        setOpenMatchInformationForm={(bool) => setOpenMatchForm(bool)}
        series={series}
      />
    </>
  );
};

export default ScheduleList;
