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
            jobNames: [],
        };

        this.submittedShiftListComponent = null;
        this.rejectedShiftListComponent = null;
    }

    componentDidMount() {
        console.log()
        this.loadSavedShifts();
    }

    loadSavedShifts() {
        const {userId, getSavedShiftsForUser} = this.props; 
        console.log('user ID:', userId);
        getSavedShiftsForUser(userId).then(data => {
            this.setState({
                shifts: data,
                jobNames: [...new Set(this.state.shifts.EML_DESCRIPTION)],
            });
            console.log(data, this.state.shifts);
            console.log('job names:', this.state.jobNames);
        }).catch(error => {console.log('error:', error)});
    };

    handleTabChange = (event, value) => {
        this.setState({tabValue: value});
    }

    render() {
        // const {userId, getSavedShiftsForUser, setSavedShiftListComponent} = this.props;
        // let savedShiftsList =  userId !== '' ? (
        //     <SavedShiftsList ref={setSavedShiftListComponent} submittedList={this.submittedShiftListComponent} getShifts={getSavedShiftsForUser} userID={userId} cardTitle="Saved Shifts" />
        // ) : (
        //     <>
        //         <CardContent>
        //             <GordonLoader />
        //         </CardContent>
        //     </>
        // );

        // let submittedShiftsList = userId !== '' ? (
        //     <SavedShiftsList ref={comp => {this.submittedShiftListComponent = comp}} getShifts={getSavedShiftsForUser} userID={userId} cardTitle="Submitted Shifts" />
        // ) : (
        //     <>
        //         <CardContent>
        //             <GordonLoader />
        //         </CardContent>
        //     </>
        // );

        // let approvedShiftsList = userId !== '' ? (
        //     <SavedShiftsList getShifts={getSavedShiftsForUser} userID={userId} cardTitle="Approved Shifts" />
        // ) : (
        //     <>
        //         <CardContent>
        //             <GordonLoader />
        //         </CardContent>
        //     </>
        // );

        // let rejectedShiftsList = userId !== '' ? (
        //     <SavedShiftsList ref={comp => {this.rejectedShiftListComponent = comp}} getShifts={getSavedShiftsForUser} userID={userId} cardTitle="Rejected Shifts" />
        // ) : (
        //     <>
        //         <CardContent>
        //             <GordonLoader />
        //         </CardContent>
        //     </>
        // );

        // return (
        //     <>
        //         <Grid item xs={12}>
        //             <Card>
        //                 <CardContent>
        //                     <CardHeader title="Display shifts for:" />
        //                     <Tabs centered value={this.state.tabValue} onChange={this.handleTabChange} fullWidth={false} className="job-tabs">
        //                         <Tab
        //                             className="job-tab"
        //                             label="code nerd"
        //                         />
        //                         <Tab
        //                             className="job-tab"
        //                             label="media nerd"
        //                         />
        //                         <Tab
        //                             className="job-tab"
        //                             label="DML"
        //                         />
        //                     </Tabs>
        //                 </CardContent>
        //             </Card>
        //         </Grid>
        //         <Grid item xs={12}>
        //             <Grid container spacing={2}>
        //                 <Grid item xs={12}>
        //                     {savedShiftsList}
        //                 </Grid>
        //                 <Grid item xs={12}>
        //                     {submittedShiftsList}
        //                 </Grid>
        //                 <Grid item xs={12}>
        //                     {rejectedShiftsList}
        //                 </Grid>
        //                 <Grid item xs={12}>
        //                     {approvedShiftsList}
        //                 </Grid>
        //             </Grid>
        //         </Grid>
        //     </>
        // )

        return null;
    }
}