import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core/';
import ApplicationRow from './components/ApplicationRow';

const ApplicationsTable = ({ applications }) => (
  <TableContainer>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell className={'stylized-table-row'}>Application ID</TableCell>
          <TableCell>Editor</TableCell>
          <TableCell align="right"># of Applicants</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>First Hall Choice</TableCell>
          <TableCell align="right">Total Points</TableCell>
          <TableCell align="right">Avg. Points</TableCell>
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

export default ApplicationsTable;
