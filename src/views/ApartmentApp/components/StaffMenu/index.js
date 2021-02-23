import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  IconButton,
} from '@material-ui/core/';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import GordonLoader from '../../../../components/Loader';
import housing from '../../../../services/housing';
import '../../apartmentApp.css';

const ApplicationRow = ({ key, applicationDetails }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow key={key}>
        <TableCell component="th" scope="row">
          {applicationDetails.AprtAppID}
        </TableCell>
        <TableCell align="right">{applicationDetails.Username}</TableCell>
        <TableCell align="right">{applicationDetails.Applicants.length}</TableCell>
        <TableCell align="right">{applicationDetails.Gender}</TableCell>
        <TableCell align="right">
          {applicationDetails.ApartmentChoices[0].HallName || 'N/A'}
        </TableCell>
        <TableCell align="right">{applicationDetails.TotalPoints || 'N/A'}</TableCell>
        <TableCell align="right">{applicationDetails.AvgPoints || 'N/A'}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const ApplicationsTable = ({ applications }) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Application ID</TableCell>
          <TableCell>Names</TableCell>
          <TableCell># of Applicants</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Preferred Halls</TableCell>
          <TableCell>Total Points</TableCell>
          <TableCell>Avg. Points</TableCell>
          <TableCell>Details</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {applications.map((applicationDetails) => (
          <ApplicationRow
            key={applicationDetails.AprtAppID}
            applicationDetails={applicationDetails}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const StaffMenu = ({ userProfile, authentication }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [applications, setApplications] = useState([]);

  /**
   * Attempt to load an all existing application for the current semester
   */
  const loadAllCurrentApplications = useCallback(async () => {
    // TODO: Implement this once save/load of application data has been implemented in the backend
    setLoading(true);
    let applicationDetailsArray = await housing.getAllApartmentApplications();
    if (applicationDetailsArray) {
      //? Some additional processing may be needed in the future, rather than just directly assigning the state variable.
      //? Details will not be known until the corresponding endpoint has been finalized for the backend
      setApplications(applicationDetailsArray);
    }
    setLoading(false);
  });

  useEffect(() => {
    loadAllCurrentApplications();
  }, [userProfile, loadAllCurrentApplications]);

  const handleDownloadCSV = () => {
    //! This feature is not yet implemented. This is a placeholder
    console.log('Good news: The button worked.');
    console.log('Bad news: This feature is not yet implemented.');
  };

  if (loading) {
    return <GordonLoader />;
  } else {
    return (
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="Apartment Application Staff Interface"
              className="apartment-card-header"
            />
            <CardContent>
              <h1>
                Apartment application is currently available for students only. Support for staff
                will come soon!
              </h1>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={10}>
          <Card>
            <CardHeader title="I'll put a title here in a sec" className="apartment-card-header" />
            <CardContent>
              <Grid container direction="row" justify="flex-end" spacing={2}>
                <Grid item xs={6} sm={8}>
                  <Typography variant="body1">
                    Click the button to download a spreadsheet of the submitted applications for the
                    current semester
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Button
                    variant="contained"
                    onClick={handleDownloadCSV}
                    color="primary"
                    fullWidth
                    disabled={!authentication}
                  >
                    Create a new application
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={10}>
          <Card>
            <CardHeader title="Results" className="apartment-card-header" />
            <CardContent>
              {applications ? (
                <ApplicationsTable applications={applications} />
              ) : (
                <Typography variant="body1">
                  Could not load any applications for the current semester.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
};

export default StaffMenu;
