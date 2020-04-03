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
import './ShiftDisplay.css'

export default class ShiftDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
            shifts: [],
        };
        this.jobNamesSet = new Set();
        this.jobNamesArray = null;
        this.submittedShiftListComponent = null;
        this.rejectedShiftListComponent = null;
    }

    componentDidMount() {
        console.log()
        this.loadSavedShifts();
    }

    loadSavedShifts() {
        const {getSavedShiftsForUser} = this.props;
        getSavedShiftsForUser().then(data => {
            this.setState({
                shifts: data,
            });
            for (let i = 0; i < this.state.shifts.length; i++) {
                this.jobNamesSet.add(this.state.shifts[i].EML_DESCRIPTION);
            }
            this.jobNamesArray = Array.from(this.jobNamesSet);
            console.log('job names:', this.jobNamesArray);
        });
    };

    handleTabChange = (event, value) => {
        this.setState({tabValue: value});
    }

    render() {
        const {userId, getSavedShiftsForUser, setSavedShiftListComponent} = this.props;
        let savedShiftsList =  userId !== '' ? (
            <SavedShiftsList ref={setSavedShiftListComponent} submittedList={this.submittedShiftListComponent} getShifts={getSavedShiftsForUser} cardTitle="Saved Shifts" />
        ) : (
            <>
                <CardContent>
                    <GordonLoader />
                </CardContent>
            </>
        );

        let submittedShiftsList = userId !== '' ? (
            <SavedShiftsList ref={comp => {this.submittedShiftListComponent = comp}} getShifts={getSavedShiftsForUser} userID={userId} cardTitle="Submitted Shifts" />
        ) : (
            <>
                <CardContent>
                    <GordonLoader />
                </CardContent>
            </>
        );

        let approvedShiftsList = userId !== '' ? (
            <SavedShiftsList getShifts={getSavedShiftsForUser} userID={userId} cardTitle="Approved Shifts" />
        ) : (
            <>
                <CardContent>
                    <GordonLoader />
                </CardContent>
            </>
        );

        let rejectedShiftsList = userId !== '' ? (
            <SavedShiftsList ref={comp => {this.rejectedShiftListComponent = comp}} getShifts={getSavedShiftsForUser} userID={userId} cardTitle="Rejected Shifts" />
        ) : (
            <>
                <CardContent>
                    <GordonLoader />
                </CardContent>
            </>
        );

        let jobTabs = this.jobNamesArray ? (
            this.jobNamesArray.map(jobName => (
                <Tab
                    className="job-tab"
                    label={jobName}
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
                            {savedShiftsList}
                        </Grid>
                        <Grid item xs={12}>
                            {submittedShiftsList}
                        </Grid>
                        <Grid item xs={12}>
                            {rejectedShiftsList}
                        </Grid>
                        <Grid item xs={12}>
                            {approvedShiftsList}
                        </Grid>
                    </Grid>
                </Grid>
            </>
        )
    }
}