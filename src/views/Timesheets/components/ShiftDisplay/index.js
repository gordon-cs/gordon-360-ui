import React, { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    CardHeader,
    CardActions,
} from '@material-ui/core';
import SavedShiftsList from '../../components/SavedShiftsList';
import GordonLoader from '../../../../components/Loader';

const ShiftDisplay = (props) => {
    const [submittedShiftListComponent, setSubmittedShiftListComponent] = useState(null);
    const [rejectedShiftListComponent, setRejectedShiftListComponent] = useState(null);

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


    return (
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <CardHeader title="Display shifts for:" />
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
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ShiftDisplay;