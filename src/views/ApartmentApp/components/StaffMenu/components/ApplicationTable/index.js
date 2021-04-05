import React, { useState } from 'react';
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

// Code copied from https://material-ui.com/components/tables/#sorting-amp-selecting
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// Code copied from https://material-ui.com/components/tables/#sorting-amp-selecting
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Code copied from https://material-ui.com/components/tables/#sorting-amp-selecting
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const ApplicationsTable = ({ applications }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('apart-app-id');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody className={'double-striped-table'}>
                {stableSort(applications, getComparator(order, orderBy)).map(
                  (applicationDetails, index) => {
                    const labelId = `application-table-${index}`;

                    return (
                      <ApplicationRow
                        key={applicationDetails.ApplicationID}
                        applicationDetails={applicationDetails}
                        labelId={labelId}
                      />
                    );
                  },
                )}
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
