import React from 'react';
import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core/';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const ApplicationRow = ({ keyPassthrough, applicationDetails }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow key={keyPassthrough}>
        <TableCell component="th" scope="row">
          {applicationDetails.AprtAppID}
        </TableCell>
        <TableCell>{applicationDetails.Username}</TableCell>
        <TableCell align="right">{applicationDetails.Applicants.length}</TableCell>
        <TableCell>{applicationDetails.Gender}</TableCell>
        <TableCell>{applicationDetails.ApartmentChoices[0].HallName || 'N/A'}</TableCell>
        <TableCell align="right">{applicationDetails.TotalPoints || 'N/A'}</TableCell>
        <TableCell align="right">{applicationDetails.AvgPoints || 'N/A'}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container>
              <Grid item>
                <Box margin={1}>
                  <Typography variant="h6" gutterBottom component="div">
                    Applicants
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell>Off-Campus Program</TableCell>
                        <TableCell>Probation</TableCell>
                        <TableCell align="right">Points</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {applicationDetails.Applicants.map((applicantInfo) => (
                        <TableRow key={applicantInfo.Username}>
                          <TableCell component="th" scope="row">
                            {applicantInfo.Username}
                          </TableCell>
                          <TableCell align="right">{applicantInfo.Age}</TableCell>
                          <TableCell>{applicantInfo.OffCampusProgram}</TableCell>
                          <TableCell>{applicantInfo.Probation}</TableCell>
                          <TableCell align="right">{applicantInfo.Points}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
              <Grid item>{/* Placehold for hall table */}</Grid>
            </Grid>
          </Collapse>
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
          <TableCell>Editor</TableCell>
          <TableCell align="right"># of Applicants</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Preferred Hall</TableCell>
          <TableCell align="right">Total Points</TableCell>
          <TableCell align="right">Avg. Points</TableCell>
          <TableCell>Details</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {applications.map((applicationDetails) => (
          <ApplicationRow
            key={applicationDetails.AprtAppID}
            keyPassthrough={applicationDetails.AprtAppID}
            applicationDetails={applicationDetails}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ApplicationsTable;
