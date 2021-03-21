import React, { useState } from 'react';
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
  TableSortLabel,
  Typography,
} from '@material-ui/core/';
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

const headCells = [
  { id: 'apart-app-id', numeric: true, disablePadding: false, label: 'Application ID' },
  { id: 'editor-username', numeric: false, disablePadding: true, label: 'Editor' },
  { id: 'num-applicants', numeric: true, disablePadding: false, label: '# of Applicants' },
  { id: 'gender', numeric: false, disablePadding: true, label: 'Gender' },
  { id: 'hall', numeric: false, disablePadding: true, label: 'First Hall Choice' },
  { id: 'total-pts', numeric: true, disablePadding: false, label: 'Total Points' },
  { id: 'avg-pts', numeric: true, disablePadding: false, label: 'Avg. Points' },
];

const ApplicationsTable = ({ applications }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('apart-app-id');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <Card>
      <CardHeader title="Apartment Applications" className="apartment-card-header" />
      <CardContent>
        {applications ? (
          <TableContainer>
            <Table stickyHeader>
              <TableHead className={'stylized-table-head'}>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell align="center">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={'double-striped-table'}>
                {stableSort(applications, getComparator(order, orderBy)).map(
                  (applicationDetails, index) => (
                    <ApplicationRow
                      key={applicationDetails.ApplicationID}
                      applicationDetails={applicationDetails}
                    />
                  ),
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
