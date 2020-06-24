//Handles the fetching and preperation for displaying of shifts
import React, { Component } from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardHeader,
    Tabs,
    Tab,
} from '@material-ui/core';
import GordonLoader from '../../../../components/Loader'
import SavedShiftsList from '../../components/SavedShiftsList';
import jobs from '../../../../services/jobs';
import SimpleSnackbar from '../../../../components/Snackbar';
import Media from 'react-media';
import './ShiftDisplay.css'

export default class ShiftDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            tabValue: 0,
            shifts: [],
            jobNames: [],
            selectedJob: '',
            snackbarOpen: false,
        };
        this.jobNamesSet = new Set();
        this.supervisors = [];
        this.savedShifts = [];
        this.submittedShifts = [];
        this.rejectedShifts = [];
        this.approvedShifts = [];
        this.snackbarText = '';
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            this.loadShifts().then(() => {
                if (this.state.jobNames.length > 0) {
                    this.setState({
                        selectedJob: this.state.jobNames[0],
                    });
                }
                this.setState({loading: false})
            });
        })
    }

    handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      this.setState({ snackbarOpen: false })
    };

    loadShifts() {
        const {getSavedShiftsForUser} = this.props;
        return getSavedShiftsForUser().then(data => {
            for (let i = 0; i < data.length; i++) {
                this.jobNamesSet.add(data[i].EML_DESCRIPTION);
            }

            let jobsArray = Array.from(this.jobNamesSet);

            if (!this.jobNamesSet.has(this.state.selectedJob)) {
                if (jobsArray.length > 0) {
                    this.setState({
                        tabValue: 0,
                        selectedJob: jobsArray[0],
                    });
                } else {
                    this.setState({
                        selectedJob: '',
                    })
                }
            }
            this.setState({
                shifts: data,
                jobNames: jobsArray,
            });
        });
    };

    editShift = (rowID, startTime, endTime, hoursWorked) => {
        let promise = jobs.editShift(rowID, startTime, endTime, hoursWorked);
        promise.then(response => {
            this.loadShifts();
        })
        return promise;
    }

    deleteShiftForUser(rowID, emlDesc) {
        let result = jobs.deleteShiftForUser(rowID)
        .then(() => {
            this.jobNamesSet.delete(emlDesc);
            this.loadShifts();
        })
        .catch(() => {
            this.snackbarText = 'There was a problem deleting the shift.';
            this.setState({ snackbarOpen: true });
        });
        return result;
      };

    handleTabChange = (event, value) => {
        this.setState({tabValue: value});
    }

    handleTabSelect(emlDescription) {
        this.setState({selectedJob: emlDescription});
    }

    render() {
        const { shifts } = this.state;
        this.savedShifts.length = 0;
        this.submittedShifts.length = 0;
        this.rejectedShifts.length = 0;
        this.approvedShifts.length = 0;

        for (let i = 0; i < shifts.length; i++) {
            if (shifts[i].EML_DESCRIPTION === this.state.selectedJob) {
                if (shifts[i].STATUS === "Saved") { this.savedShifts.push(shifts[i]) }
                if (shifts[i].STATUS === "Submitted") { this.submittedShifts.push(shifts[i]) }
                if (shifts[i].STATUS === "Rejected") { this.rejectedShifts.push(shifts[i]) }
                if (shifts[i].STATUS === "Approved") { this.approvedShifts.push(shifts[i]) }
            }
        }

        let directSupervisor = this.savedShifts.length > 0 ? this.savedShifts[0].SUPERVISOR : null;
        let reportingSupervisor = this.savedShifts.length > 0 ? this.savedShifts[0].COMP_SUPERVISOR : null;
        let jobTabs = this.state.jobNames && this.state.jobNames.length > 1 ? (
            this.state.jobNames.map((jobName, index) => (
                <Tab
                    className="job-tab"
                    label={jobName}
                    onClick={() => this.handleTabSelect(jobName)}
                    key={index}
                />
            ))
        ) : (
            <></>
        );

        let theTabs = (
            <Media query="(min-width: 600px)">
                {matches => matches ? (
                    <Tabs
                        centered
                        value={this.state.tabValue}
                        onChange={this.handleTabChange}
                        variant="fullWidth"
                        className="job-tabs"
                    >
                        {jobTabs}
                    </Tabs>
                ) : (
                        <Tabs
                            centered
                            value={this.state.tabValue}
                            onChange={this.handleTabChange}
                            orientation='vertical'
                            variant="fullWidth"
                            className="job-tabs"
                        >
                            {jobTabs}
                        </Tabs>
                    )}
            </Media>
        );

        let tabsCard = this.state.jobNames && this.state.jobNames.length > 1 ? (
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <CardHeader className='disable-select' title="Display shifts for:" />
                        {theTabs}
                    </CardContent>
                </Card>
            </Grid>
        ) : (
            <></>
        );

        return ( !this.state.loading ? (
            <>
                {tabsCard}
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SavedShiftsList
                                shifts={this.savedShifts}
                                loadShifts={this.loadShifts.bind(this)}
                                deleteShift={this.deleteShiftForUser.bind(this)}
                                editShift={this.editShift}
                                cardTitle="Saved Shifts"
                                directSupervisor={directSupervisor}
                                reportingSupervisor={reportingSupervisor} />
                        </Grid>
                        <Grid item xs={12}>
                            <SavedShiftsList
                                shifts={this.submittedShifts}
                                loadShifts={this.loadShifts.bind(this)}
                                deleteShift={this.deleteShiftForUser.bind(this)}
                                cardTitle="Submitted Shifts" />
                        </Grid>
                        <Grid item xs={12}>
                            <SavedShiftsList
                                shifts={this.rejectedShifts}
                                loadShifts={this.loadShifts.bind(this)}
                                deleteShift={this.deleteShiftForUser.bind(this)}
                                editShift={this.editShift}
                                cardTitle="Rejected Shifts" />
                        </Grid>
                        <Grid item xs={12}>
                            <SavedShiftsList
                                shifts={this.approvedShifts}
                                loadShifts={this.loadShifts.bind(this)}
                                deleteShift={this.deleteShiftForUser.bind(this)}
                                cardTitle="Approved Shifts" />
                        </Grid>
                    </Grid>
                </Grid>
                <SimpleSnackbar
                    text={this.snackbarText}
                    severity={'error'}
                    open={this.state.snackbarOpen}
                    onClose={this.handleCloseSnackbar} />
            </>
        ) : (
            <Grid item xs={12}>
                <GordonLoader />
            </Grid>
        )
        )
    }
}