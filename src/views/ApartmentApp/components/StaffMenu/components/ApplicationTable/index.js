import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core/';
import ApplicationRow from './components/ApplicationRow';
import './applicationTable.css';

const ApplicationsTable = ({ applications }) => (
  <Card>
    <CardHeader title="Apartment Applications" className="apartment-card-header" />
    <CardContent>
      {applications ? (
        <TableContainer>
          <Table stickyHeader>
            <TableHead className={'stylized-table-head'}>
              <TableRow>
                <TableCell align="center">Application ID</TableCell>
                <TableCell align="center">Editor</TableCell>
                <TableCell align="center"># of Applicants</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">First Hall Choice</TableCell>
                <TableCell align="center">Total Points</TableCell>
                <TableCell align="center">Avg. Points</TableCell>
                <TableCell align="center">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={'double-striped-table'}>
              {applications.map((applicationDetails) => (
                <ApplicationRow
                  key={applicationDetails.AprtAppID}
                  applicationDetails={applicationDetails}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">
          Could not load any applications for the current semester.
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default ApplicationsTable;
