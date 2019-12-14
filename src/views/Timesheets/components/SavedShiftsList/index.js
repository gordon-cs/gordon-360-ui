import React, { Component } from 'react';
import {
  Typography,
  Grid,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Divider,
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
    };
  }

  componentDidMount() {
    const { userID } = this.props;
    this.props.getShifts(userID).then(shifts => {
      console.log('Shift:', shifts[0]);
      this.setState({
        shifts: shifts,
      });
      jobs.getSupervisorNameForJob(shifts[0].SUPERVISOR).then(response => {
        console.log('Get supervisor response:', response);
      });
    });
  }

  reloadDataAfterDelete() {
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

  render() {
    const deleteShiftForUser = (rowID, userID) => {
      let result = jobs.deleteShiftForUser(rowID, userID).then(response => {
        this.reloadDataAfterDelete();
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
          value={'selectedJob'}
          // onChange={e => {
          //   setSelectedJob(e.target.value);
          // }}
          input={<Input id="supervisor" />}
        >
          <MenuItem label="None" value="">
            <em>None</em>
          </MenuItem>
          {/* {jobsMenuItems} */}
        </Select>
      </FormControl>
    );

    let content;
    if (this.state.shifts.length === null) {
      content = (
        <>
          <Divider
            style={{
              backgroundColor: '#adadad',
              marginLeft: '8px',
              marginRight: '8px',
            }}
          />
          <CardContent>
            <GordonLoader />
          </CardContent>
        </>
      );
    } else if (this.state.shifts.length > 0) {
      content = (
        <>
          <Divider
            style={{
              backgroundColor: '#adadad',
              marginLeft: '8px',
              marginRight: '8px',
            }}
          />
          <CardContent>
            <CardHeader title="Saved Shifts" />
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
              {/* <div className="shift-list"> */}
              {shiftsList}
              {/* </div> */}
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container>
              <Grid item xs={6}>
                {supervisorDropdown}
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary">
                  Submit All Shifts
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </>
      );
    } else {
      content = <></>;
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
