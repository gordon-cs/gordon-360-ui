import React, { useState } from 'react';
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

const ShiftDisplay = (props) => {
    const [submittedShiftListComponent, setSubmittedShiftListComponent] = useState(null);
    // Remove these comments when the variable below is used!
    // eslint-disable-next-line
    const [rejectedShiftListComponent, setRejectedShiftListComponent] = useState(null);
    const [tabValue, setTabValue] = useState(0);

    const {userId, getSavedShiftsForUser, setSavedShiftListComponent} = props;

    let savedShiftsList =  userId !== '' ? (
        <SavedShiftsList ref={setSavedShiftListComponent} submittedList={submittedShiftListComponent} getShifts={getSavedShiftsForUser} userID={userId} cardTitle="Saved Shifts" />
    ) : (
        <>
            <CardContent>
                <GordonLoader />
            </CardContent>
        </>
    );

    let submittedShiftsList = userId !== '' ? (
        <SavedShiftsList ref={setSubmittedShiftListComponent} getShifts={props.getSavedShiftsForUser} userID={userId} cardTitle="Submitted Shifts" />
    ) : (
        <>
            <CardContent>
                <GordonLoader />
            </CardContent>
        </>
    );

    let approvedShiftsList = userId !== '' ? (
        <SavedShiftsList getShifts={props.getSavedShiftsForUser} userID={userId} cardTitle="Approved Shifts" />
    ) : (
        <>
            <CardContent>
                <GordonLoader />
            </CardContent>
        </>
    );

    let rejectedShiftsList = userId !== '' ? (
        <SavedShiftsList ref={setRejectedShiftListComponent} getShifts={props.getSavedShiftsForUser} userID={userId} cardTitle="Rejected Shifts" />
    ) : (
        <>
            <CardContent>
                <GordonLoader />
            </CardContent>
        </>
    );

    let handleTabChange = (event, value) => {
        setTabValue(value);
    }


    return (
        <>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <CardHeader title="Display shifts for:" />
                        <Tabs centered value={tabValue} onChange={handleTabChange} fullWidth={false} className="job-tabs">
                            <Tab
                                className="job-tab"
                                label="code nerd"
                            />
                            <Tab
                                className="job-tab"
                                label="media nerd"
                            />
                            <Tab
                                className="job-tab"
                                label="DML"
                            />
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

export default ShiftDisplay;