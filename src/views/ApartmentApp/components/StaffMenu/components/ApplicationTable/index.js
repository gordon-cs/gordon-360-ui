import React, { useState } from 'react';
import { orderBy } from 'lodash';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@material-ui/core/';
import ApplicationsTableHead from './components/ApplicationsTableHead';
import ApplicationRow from './components/ApplicationRow';
import './applicationTable.css';

const ApplicationsTable = ({ applications }) => {
  const [order, setOrder] = useState('asc');
  const [iteratee, setIteratee] = useState('apart-app-id');

  const handleRequestSort = (_event, property) => {
    const isAsc = iteratee === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setIteratee(property);
  };

  return (
    <Card>
      <CardHeader title="Apartment Applications" className="apartment-card-header" />
      <CardContent>
        {applications?.length > 0 ? (
          <TableContainer>
            <Table stickyHeader>
              <ApplicationsTableHead
                order={order}
                orderBy={iteratee}
                onRequestSort={handleRequestSort}
              />
              <TableBody className={'double-striped-table'}>
                {orderBy(applications, [iteratee], [order]).map((applicationDetails, index) => (
                  <ApplicationRow
                    key={applicationDetails.ApplicationID}
                    applicationDetails={applicationDetails}
                    labelId={`application-table-${index}`}
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
};

export default ApplicationsTable;
