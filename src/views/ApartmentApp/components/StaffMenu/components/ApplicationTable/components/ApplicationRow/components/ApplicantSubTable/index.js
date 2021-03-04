import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@material-ui/core/';

const ApplicantSubTable = ({ applicants }) => (
  <Box margin={1}>
    <Toolbar className={'stylized-table-head'}>
      <Typography variant="h6" gutterBottom component="div">
        Applicants
      </Typography>
    </Toolbar>
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="center">Age</TableCell>
          <TableCell>Off-Campus Program</TableCell>
          <TableCell>Probation</TableCell>
          <TableCell align="right">Points</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {applicants.map((applicantInfo) => (
          <TableRow className={'stylized-table-row'} key={applicantInfo.Username}>
            <TableCell component="th" scope="row">
              {applicantInfo.Username}
            </TableCell>
            <TableCell align="center">{applicantInfo.Age}</TableCell>
            <TableCell>{applicantInfo.OffCampusProgram}</TableCell>
            <TableCell>{applicantInfo.Probation}</TableCell>
            <TableCell align="right">{applicantInfo.Points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);

export default ApplicantSubTable;
