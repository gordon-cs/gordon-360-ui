import { Grid, Typography, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';
import TuneIcon from '@mui/icons-material/Tune';
import { ContentCard } from 'views/RecIM/components/Forms/components/ContentCard';
import { MatchList } from 'views/RecIM/components/List';
import UpdateIcon from '@mui/icons-material/Update';
import RestoreIcon from '@mui/icons-material/Restore';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { standardDate } from 'views/RecIM/components/Helpers';
import { DateTime } from 'luxon';
import { deleteSeriesCascade, scheduleSeriesMatches } from 'services/recim/series';
import { useState } from 'react';
import styles from './../../Activity.module.css';
import SeriesForm from 'views/RecIM/components/Forms/SeriesForm';
import SeriesScheduleForm from 'views/RecIM/components/Forms/SeriesScheduleForm';

const ScheduleList = ({ isAdmin, series, activityID, reload, setReload }) => {
  const [anchorEl, setAnchorEl] = useState();
  const openMenu = Boolean(anchorEl);
  const [openAutoSchedulerDisclaimer, setOpenAutoSchedulerDisclaimer] = useState(false);
  const [openDeleteDisclaimer, setOpenDeleteDisclaimer] = useState(false);
  const [disclaimerContent, setDisclaimerContent] = useState('');
  const [openEditSeriesForm, setOpenEditSeriesForm] = useState(false);
  const [openSeriesScheduleForm, setOpenSeriesScheduleForm] = useState(false);
  let startDate = DateTime.fromISO(series.StartDate);
  let endDate = DateTime.fromISO(series.EndDate);

  // default closure
  const handleClose = () => {
    setAnchorEl(null);
  };

  // edit button
  const handleEditSeries = () => {
    setOpenEditSeriesForm(true);
    handleClose();
  };

  const handleSeriesSchedule = () => {
    setOpenSeriesScheduleForm(true);
    handleClose();
  };

  const handleEditSeriesForm = (status) => {
    setReload((prev) => !prev);
    setOpenEditSeriesForm(false);
  };

  const handleSeriesScheduleForm = (status) => {
    setReload((prev) => !prev);
    setOpenSeriesScheduleForm(false);
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
          {standardDate(startDate, false)}, or the earliest available day, at{' '}
          {DateTime.fromISO(series.Schedule.StartTime).toLocaleString(DateTime.TIME_SIMPLE)}.{' '}
        </Typography>
      </Typography>,
    );
    setOpenAutoSchedulerDisclaimer(true);
    handleClose();
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
    handleClose();
  };

  const handleConfirmDelete = () => {
    deleteSeriesCascade(series.ID).then((res) => {
      setOpenDeleteDisclaimer(false);
      setReload(!reload);
    });
  };

  // menu button click
  const handleButtonClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const status = () => {
    let now = DateTime.fromMillis(Date.now());
    // future series
    if (now < startDate)
      return <Chip icon={<UpdateIcon />} label="scheduled" color="secondary" size="small"></Chip>;
    // past series
    else if (now > endDate)
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
  return (
    <>
      <Grid container className={styles.seriesHeader} alignItems="center" columnSpacing={1}>
        <Grid item container direction="column" xs={6} sm={5}>
          <Typography variant="h6" className={styles.seriesMainText}>
            {series.Name}{' '}
          </Typography>
          <Typography className={styles.seriesSecondaryText}>{series.Type}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography className={styles.seriesDateText}>
            {standardDate(startDate, false)} - {standardDate(endDate, false)}
          </Typography>
        </Grid>
        <Grid container item xs={6} sm={3} justifyContent="center">
          {status()}
        </Grid>

        {isAdmin && (
          <Grid container item xs={6} sm={1} justifyContent="center">
            <IconButton onClick={handleButtonClick}>
              <TuneIcon inline />
            </IconButton>{' '}
          </Grid>
        )}

        <Menu open={openMenu} onClose={handleClose} anchorEl={anchorEl}>
          <MenuItem dense onClick={handleEditSeries} divider>
            Edit Series Info
          </MenuItem>
          <MenuItem dense onClick={handleSeriesSchedule} divider>
            Edit Schedule
          </MenuItem>
          <MenuItem
            dense
            disabled={series.TeamStanding.length === 0}
            onClick={handleAutoSchedule}
            divider
          >
            Auto-schedule
          </MenuItem>
          <MenuItem dense onClick={handleDelete} className={styles.redButton}>
            Delete
          </MenuItem>
        </Menu>
      </Grid>
      {series.Match.length ? (
        <MatchList matches={series.Match} activityID={activityID} />
      ) : (
        <Typography variant="body1" paragraph>
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
            handleEditSeriesForm(status);
          }}
          openSeriesForm={openEditSeriesForm}
          setOpenSeriesForm={(bool) => setOpenEditSeriesForm(bool)}
          activityID={series.ActivityID}
          series={series}
        />
      )}
      {openSeriesScheduleForm && (
        <SeriesScheduleForm
          closeWithSnackbar={(status) => {
            handleSeriesScheduleForm(status);
          }}
          openSeriesScheduleForm={openSeriesScheduleForm}
          setOpenSeriesScheduleForm={(bool) => setOpenSeriesScheduleForm(bool)}
          seriesID={series.ID}
        />
      )}
    </>
  );
};

export default ScheduleList;
