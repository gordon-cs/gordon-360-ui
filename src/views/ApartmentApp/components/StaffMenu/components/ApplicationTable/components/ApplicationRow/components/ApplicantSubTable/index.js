import React, { useState, useEffect } from 'react';
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

/**
 * @typedef { import('services/housing').ApartmentApplicant } ApartmentApplicant
 */

/**
 * Renders the applicant sub-table for the apartment application staff page
 * @param {Object} props The React component props
 * @param {ApartmentApplicant[]} props.applicants Array of applicant info
 * @returns {JSX.Element} JSX Element for the applicant sub-table
 */
const ApplicantSubTable = ({ applicants }) => {
  const [thisYear, setThisYear] = useState();

  useEffect(() => {
    setThisYear(new Date().getFullYear());
  }, []);

  return (
    <Box margin={1}>
      <Toolbar className={'stylized-table-toolbar'} disableGutters>
        <Typography variant="h6" gutterBottom component="div">
          Applicants
        </Typography>
      </Toolbar>
      <Table size="small" aria-label="applicants" className={'sub-table'}>
        <TableHead className={'stylized-table-head'}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Age (As of Sept. 1, {thisYear})</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Off-Campus Program</TableCell>
            <TableCell>Probation</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={'striped-table'}>
          {applicants.map((applicantInfo) => (
            <TableRow key={applicantInfo.Username}>
              <TableCell component="th" scope="row">
                {applicantInfo.Username}
              </TableCell>
              <TableCell align="center">{applicantInfo.Age}</TableCell>
              <TableCell>{applicantInfo.Class}</TableCell>
              <TableCell>{applicantInfo.OffCampusProgram}</TableCell>
              <TableCell>{applicantInfo.Probation}</TableCell>
              <TableCell align="right">{applicantInfo.Points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ApplicantSubTable;
