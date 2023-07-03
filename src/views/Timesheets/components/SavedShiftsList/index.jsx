//Displays shifts and sets up buttons for submitting shifts
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import GordonLoader from 'components/Loader';
import { Component } from 'react';
import jobs from 'services/jobs';
import ShiftItem from '../ShiftItem';
import styles from './SavedShiftsList.module.css';

export default class SavedShiftsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shifts: [],
      directSupervisor: null,
      reportingSupervisor: null,
      selectedSupervisor: null,
      showSubmissionConfirmation: false,
    };

    this.prevJob = null;
  }

  handleSubmitButtonClick = () => {
    this.setState({ showSubmissionConfirmation: true });
  };

  onClose = () => {
    this.setState({ showSubmissionConfirmation: false });
  };

  submitShiftsToSupervisor = (shifts, supervisorID) =>
    jobs.submitShiftsForUser(shifts, supervisorID).then(() => {
      this.setState({
        selectedSupervisor: null,
        showSubmissionConfirmation: false,
      });
      this.props.loadShifts();
    });

  getTotalHours = (total, currentShift) => {
    return total + currentShift.HOURS_WORKED;
  };

  getEstimatedPay = (total, currentShift) => {
    return total + currentShift.HOURS_WORKED * currentShift.HOURLY_RATE;
  };

  getSupervisors() {
    jobs.getSupervisorNameForJob(this.props.directSupervisor).then((response) => {
      let directSupervisor =
        response[0].FIRST_NAME + ' ' + response[0].LAST_NAME + ' (Direct Supervisor)';
      let directSupervisorObject = {
        name: directSupervisor,
        id: this.props.directSupervisor,
      };

      jobs.getSupervisorNameForJob(this.props.reportingSupervisor).then((response) => {
        let supervisor =
          response[0].FIRST_NAME + ' ' + response[0].LAST_NAME + ' (Reporting Supervisor)';
        this.setState({
          directSupervisor: directSupervisorObject,
          reportingSupervisor: {
            name: supervisor,
            id: this.props.reportingSupervisor,
          },
        });
      });
    });
  }

  componentDidMount() {
    let { shifts, directSupervisor, reportingSupervisor } = this.props;
    let supervisorIdsReady = directSupervisor && reportingSupervisor;
    let shouldGetSupervisors;
    if (shifts.length > 0) {
      shouldGetSupervisors =
        this.props.cardTitle === 'Saved Shifts' &&
        (shifts[0].EML !== this.prevJob ||
          !this.state.directSupervisor ||
          !this.state.reportingSupervisor);
      this.prevJob = shifts[0].EML;
    } else {
      shouldGetSupervisors =
        this.props.cardTitle === 'Saved Shifts' &&
        supervisorIdsReady &&
        (!this.state.directSupervisor || !this.state.reportingSupervisor) &&
        shifts !== null;
    }
    if (shouldGetSupervisors) {
      this.getSupervisors();
    }
  }

  componentDidUpdate() {
    let { shifts, directSupervisor, reportingSupervisor } = this.props;
    let supervisorIdsReady = directSupervisor && reportingSupervisor;
    let shouldGetSupervisors;
    if (shifts.length > 0) {
      shouldGetSupervisors =
        this.props.cardTitle === 'Saved Shifts' &&
        (shifts[0].EML !== this.prevJob ||
          !this.state.directSupervisor ||
          !this.state.reportingSupervisor);
      this.prevJob = shifts[0].EML;
    } else {
      shouldGetSupervisors =
        this.props.cardTitle === 'Saved Shifts' &&
        supervisorIdsReady &&
        (!this.state.directSupervisor || !this.state.reportingSupervisor) &&
        shifts !== null;
    }
    if (shouldGetSupervisors) {
      this.getSupervisors();
    }
  }

  render() {
    let { cardTitle } = this.props;
    let totalHoursWorked = this.props.shifts.reduce(this.getTotalHours, 0);
    let totalEstimatedPay = this.props.shifts.reduce(this.getEstimatedPay, 0).toFixed(2);

    let confirmationBox = (
      <Grid container>
        <Grid item>
          <Dialog
            open={this.state.showSubmissionConfirmation}
            keepMounted
            align="center"
            onBackdropClick={this.onClose}
          >
            <DialogTitle>Are you sure you want to submit your shifts?</DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Button color="error" onClick={this.onClose} variant="contained">
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      this.submitShiftsToSupervisor(
                        this.props.shifts,
                        this.state.selectedSupervisor.id,
                      );
                    }}
                    color="primary"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    );

    let header = (
      <Grid item xs={12} className={styles.headerStyle}>
        <div>
          <Grid container direction="row">
            <Grid item xs={3}>
              <Typography className={styles.headerItem} variant="body2">
                JOB
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={styles.headerItem} variant="body2">
                IN
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={styles.headerItem} variant="body2">
                OUT
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={styles.headerItem} variant="body2">
                RATE
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={styles.headerItem} variant="body2">
                HOURS
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );

    let shiftsList = null;
    shiftsList = this.props.shifts.map((shift, index) => (
      <ShiftItem
        deleteShift={this.props.deleteShift}
        editShift={this.props.editShift}
        value={shift}
        key={index}
      />
    ));

    const supervisorDropdown = (
      <FormControl className={styles.formControl} fullWidth align="left">
        <InputLabel className="disable_select">Submit To</InputLabel>
        <Select
          value={this.state.selectedSupervisor}
          onChange={(e) => {
            this.setState({
              selectedSupervisor: e.target.value,
            });
          }}
          input={<Input id="supervisor" />}
        >
          <MenuItem label="direct supervisor" value={this.state.directSupervisor}>
            <Typography>
              {this.state.directSupervisor !== null && this.state.directSupervisor.name}
            </Typography>
          </MenuItem>
          <MenuItem label="reporting supervisor" value={this.state.reportingSupervisor}>
            <Typography>
              {this.state.reportingSupervisor !== null && this.state.reportingSupervisor.name}
            </Typography>
          </MenuItem>
        </Select>
      </FormControl>
    );

    let content = <></>;
    if (this.props.shifts.length === null) {
      content = (
        <Card>
          <CardContent>
            <GordonLoader />
          </CardContent>
        </Card>
      );
    } else if (this.props.shifts.length > 0) {
      content = (
        <>
          {confirmationBox}
          <Card>
            <CardContent>
              <CardHeader className="disable_select" title={cardTitle} />
              <Grid
                className={styles.shift_list}
                container
                spacing={2}
                justifyContent="space-around"
                alignItems="center"
                alignContent="center"
              >
                {header}
                {shiftsList}
              </Grid>
            </CardContent>
            {(cardTitle === 'Saved Shifts' ||
              cardTitle === 'Approved Shifts' ||
              cardTitle === 'Submitted Shifts') && (
              <CardContent>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography className="disable_select" variant="h6">
                      Total hours worked: {totalHoursWorked}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="disable_select" variant="h6">
                      Estimated gross pay: ${totalEstimatedPay}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            )}
            <CardActions>
              {cardTitle === 'Saved Shifts' && (
                <Grid container>
                  <Grid container>
                    <Grid item xs={6}>
                      {supervisorDropdown}
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        disabled={this.state.selectedSupervisor === null}
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmitButtonClick}
                      >
                        Submit All Shifts
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </CardActions>
          </Card>
        </>
      );
    }
    return <>{content}</>;
  }
}
