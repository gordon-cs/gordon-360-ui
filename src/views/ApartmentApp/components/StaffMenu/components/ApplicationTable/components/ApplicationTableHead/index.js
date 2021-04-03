import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core/';

const headCells = [
  { id: 'apart-app-id', numeric: true, disablePadding: false, label: 'Application ID' },
  { id: 'editor-username', numeric: false, disablePadding: true, label: 'Editor' },
  { id: 'num-applicants', numeric: true, disablePadding: false, label: '# of Applicants' },
  { id: 'gender', numeric: false, disablePadding: true, label: 'Gender' },
  { id: 'hall', numeric: false, disablePadding: true, label: 'First Hall Choice' },
  { id: 'total-pts', numeric: true, disablePadding: false, label: 'Total Points' },
  { id: 'avg-pts', numeric: true, disablePadding: false, label: 'Avg. Points' },
];

const ApplicationsTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
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
              aria-labelledby={
                orderBy === headCell.id
                  ? order === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'
                  : null
              }
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">Details</TableCell>
      </TableRow>
    </TableHead>
  );
};

ApplicationsTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default ApplicationsTableHead;
