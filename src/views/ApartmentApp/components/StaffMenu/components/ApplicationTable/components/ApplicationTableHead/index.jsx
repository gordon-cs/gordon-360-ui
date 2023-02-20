import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material/';

// @TODO CSSMODULES - outside directory
import styles from '../../../../../../ApartmentApp.module.css';

const headCells = [
  { id: 'ApplicationID', numeric: true, disablePadding: false, label: 'Application ID' },
  { id: 'EditorUsername', numeric: false, disablePadding: true, label: 'Editor' },
  { id: 'NumApplicants', numeric: true, disablePadding: false, label: '# of Applicants' },
  { id: 'Gender', numeric: false, disablePadding: true, label: 'Gender' },
  { id: 'FirstHall', numeric: false, disablePadding: true, label: 'First Hall Choice' },
  { id: 'TotalPoints', numeric: true, disablePadding: false, label: 'Total Points' },
  { id: 'AvgPoints', numeric: true, disablePadding: false, label: 'Avg. Points' },
];

const ApplicationTableHead = ({ iteratee, order, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={styles.stylized_table_head}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={iteratee === headCell.id ? order : false}
          >
            <TableSortLabel
              active={iteratee === headCell.id}
              direction={iteratee === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              aria-labelledby={
                iteratee === headCell.id
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

ApplicationTableHead.propTypes = {
  iteratee: PropTypes.string.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default ApplicationTableHead;
