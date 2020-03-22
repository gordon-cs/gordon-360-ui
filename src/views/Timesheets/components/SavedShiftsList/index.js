import React, { Component } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import ShiftItem from '../ShiftItem';
import { gordonColors } from '../../../../theme';
import jobs from '../../../../services/jobs';
import GordonLoader from '../../../../components/Loader';
import './SavedShiftsList.css';

export default class SavedShiftsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shifts: [],
      directSupervisor: null,
      reportingSupervisor: null,
      selectedSupervisor: null,
    };
  }

  componentDidMount() {
    this.loadShiftData()
  }

  loadShiftData() {
    const { userID, cardTitle } = this.props;
    this.props.getShifts(userID).then(shifts => {
      let shiftsToKeep = []
      for (let i = 0; i < shifts.length; i++) {
        if (cardTitle === "Saved Shifts") {
          if (shifts[i].STATUS === "Saved") { shiftsToKeep.push(shifts[i]) }
        } else if (cardTitle === "Submitted Shifts") {
          if (shifts[i].STATUS === "Submitted") { shiftsToKeep.push(shifts[i]) }
        } else if (cardTitle === "Rejected Shifts") {
          if (shifts[i].STATUS === "Rejected") { shiftsToKeep.push(shifts[i]) }
        } else if (cardTitle === "Approved Shifts") {
          if (shifts[i].STATUS === "Approved") { shiftsToKeep.push(shifts[i]) }
        }
      }
      this.setState({
        shifts: shiftsToKeep,
      });
      if (shifts.length > 0) {
        jobs.getSupervisorNameForJob(shifts[0].SUPERVISOR).then(response => {
          let supervisor =
            response[0].FIRST_NAME + ' ' + response[0].LAST_NAME + ' (Direct Supervisor)';
          this.setState({
            directSupervisor: {
              name: supervisor,
              id: shifts[0].SUPERVISOR,
            },
          });
        });
        jobs.getSupervisorNameForJob(shifts[0].COMP_SUPERVISOR).then(response => {
          let supervisor =
            response[0].FIRST_NAME + ' ' + response[0].LAST_NAME + ' (Reporting Supervisor)';
          this.setState({
            reportingSupervisor: {
              name: supervisor,
              id: shifts[0].COMP_SUPERVISOR,
            },
          });
        });
      }
    });
  }

  reloadShiftData() {
    const { userID } = this.props;
    this.setState({
      shifts: [],
    });
    this.props.getShifts(userID).then(shifts => {
      this.setState({
        shifts: shifts,
      });
    });
  }

  submitShiftsToSupervisor(shifts, supervisorID) {
    jobs.submitShiftsForUser(shifts, supervisorID).then(response => {
      this.setState({
        selectedSupervisor: null,
      });
      this.loadShiftData();
    });
  }

  render() {
    let { cardTitle } = this.props;
    const deleteShiftForUser = (rowID, userID) => {
      let result = jobs.deleteShiftForUser(rowID, userID).then(response => {
        this.reloadShiftData();
      });
      return result;
    };

    let header = (
      <Grid item xs={12} style={styles.headerStyle}>
        <div>
          <Grid container direction="row">
            <Grid item xs={3}>
              <Typography variant="body2" style={styles.headerItem}>
                JOB
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" style={styles.headerItem}>
                TIME IN
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" style={styles.headerItem}>
                TIME OUT
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" style={styles.headerItem}>
                RATE
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" style={styles.headerItem}>
                HOURS WORKED
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );

    let shiftsList = this.state.shifts.map(shift => (
      <ShiftItem deleteShift={deleteShiftForUser} value={shift} key={shift.EML_DESCRIPTION} />
    ));

    const supervisorDropdown = (
      <FormControl
        style={{
          width: 252,
        }}
      >
        <InputLabel>Submit To</InputLabel>
        <Select
          value={this.state.selectedSupervisor}
          onChange={e => {
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
    if (this.state.shifts.length === null) {
      content = (
        <Card>
          <CardContent>
            <GordonLoader />
          </CardContent>
        </Card>
      );
    } else if (this.state.shifts.length > 0) {
      content = (
        <Card>
          <CardContent>
            <CardHeader title={cardTitle} />
            <Grid
              className="shift-list"
              container
              spacing={2}
              justify="space-around"
              alignItems="center"
              alignContent="center"
              style={styles.boxShadow}
            >
              {header}
              {shiftsList}
            </Grid>
          </CardContent>
          <CardActions>
            {cardTitle === "Saved Shifts" && <Grid container>
              <Grid item xs={6}>
                {supervisorDropdown}
              </Grid>
              <Grid item xs={6}>
                <Button
                  disabled={this.state.selectedSupervisor === null}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.submitShiftsToSupervisor(
                      this.state.shifts,
                      this.state.selectedSupervisor.id,
                    );
                  }}
                >
                  Submit All Shifts
                </Button>
              </Grid>
            </Grid>}
          </CardActions>
        </Card>
      );
    }
    return <>{content}</>;
  }
}

const styles = {
  headerStyle: {
    backgroundColor: gordonColors.primary.blue,
    color: '#FFF',
    padding: '10px',
  },
  headerItem: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  boxShadow: {
    boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, .2)',
  },
};
