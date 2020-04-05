import React, { Component } from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardHeader,
    Tabs,
    Tab,
} from '@material-ui/core';
import SavedShiftsList from '../../components/SavedShiftsList';
import GordonLoader from '../../../../components/Loader';
import jobs from '../../../../services/jobs';
import './ShiftDisplay.css'

export default class ShiftDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
            shifts: [],
            selectedJob: '',
        };
        this.jobNamesSet = new Set();
        this.jobNamesArray = null;
        this.supervisors = [];
        this.savedShifts = [];
        this.submittedShifts = [];
        this.rejectedShifts = [];
        this.approvedShifts = [];
    }

    componentDidMount() {
        this.loadShifts().then(() => {
            if (this.jobNamesArray.length > 0) {
                this.setState({
                    selectedJob: this.jobNamesArray[0],
                })
            }
        });
    }

    loadShifts() {
        const {getSavedShiftsForUser} = this.props;
        return getSavedShiftsForUser().then(data => {
            this.setState({
                shifts: data,
            });
            for (let i = 0; i < this.state.shifts.length; i++) {
                this.jobNamesSet.add(this.state.shifts[i].EML_DESCRIPTION);
            }
            this.jobNamesArray = Array.from(this.jobNamesSet);
        });
    };

    deleteShiftForUser(rowID, userID) {
        let result = jobs.deleteShiftForUser(rowID, userID).then(response => {
          this.loadShifts();
        });
        return result;
      };

    handleTabChange = (event, value) => {
        this.setState({tabValue: value});
    }

    handleTabSelect(emlDescription) {
        this.setState({selectedJob: emlDescription});
    }

    getSupervisors(direct, reporting) {
        this.supervisors = [];
        jobs.getSupervisorNameForJob(direct).then(response => {
            let directSupervisor = response[0].FIRST_NAME + ' ' + response[0].LAST_NAME + ' (Direct Supervisor)';
            let directSupervisorObject = {
                name: directSupervisor,
                id: direct,
            };
            this.supervisors.push(directSupervisorObject);

            jobs.getSupervisorNameForJob(reporting).then(response => {
                let reportingSupervisor = response[0].FIRST_NAME + ' ' + response[0].LAST_NAME + ' (Reporting Supervisor)';
                let reportingSupervisorObject = {
                    name: reportingSupervisor,
                    id: reporting,
                }
                this.supervisors.push(reportingSupervisorObject);
                return this.supervisors;
            });
        }).catch(error => {
            console.log('Error:', error);
            return this.supervisors;
        });
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

        if (this.savedShifts.length > 0) {
            this.getSupervisors(this.savedShifts[0].SUPERVISOR, this.savedShifts[0].COMP_SUPERVISOR);
        }
        let directSupervisor = this.savedShifts.length > 0 ? this.savedShifts[0].SUPERVISOR : null;
        let reportingSupervisor = this.savedShifts.length > 0 ? this.savedShifts[0].COMP_SUPERVISOR : null;
        let jobTabs = this.jobNamesArray && this.jobNamesArray.length > 1 ? (
            this.jobNamesArray.map(jobName => (
                <Tab
                    className="job-tab"
                    label={jobName}
                    onClick={() => this.handleTabSelect(jobName)}
                />
            ))
        ) : (
            <></>
        );

        return (
            <>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <CardHeader title="Display shifts for:" />
                            <Tabs
                                centered
                                value={this.state.tabValue}
                                onChange={this.handleTabChange}
                                fullWidth={false}
                                className="job-tabs"
                                >
                                {jobTabs}
                            </Tabs>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SavedShiftsList
                                shifts={this.savedShifts}
                                loadShifts={this.loadShifts.bind(this)}
                                deleteShift={this.deleteShiftForUser.bind(this)}
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
            </>
        )
    }
}