import React from 'react';
import { Collapse, IconButton, TableCell, TableRow } from '@material-ui/core/';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ApplicantSubTable from './components/ApplicantSubTable';
import HallSubTable from './components/HallSubTable';
import './applicationRow.css';

const ApplicationRow = ({ applicationDetails }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        className={'stylized-table-row'}
        key={applicationDetails.AprtAppID}
        onClick={() => setOpen(!open)}
      >
        <TableCell align="center" component="th" scope="row">
          {applicationDetails.AprtAppID}
        </TableCell>
        <TableCell align="center">{applicationDetails.EditorUsername}</TableCell>
        <TableCell align="center">{applicationDetails.Applicants.length}</TableCell>
        <TableCell align="center">{applicationDetails.Gender}</TableCell>
        <TableCell align="center">
          {applicationDetails.ApartmentChoices[0].HallName || 'N/A'}
        </TableCell>
        <TableCell align="center">{applicationDetails.TotalPoints || 'N/A'}</TableCell>
        <TableCell align="center">{applicationDetails.AvgPoints || 'N/A'}</TableCell>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={'apartment-sub-table'} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ApplicantSubTable applicants={applicationDetails.Applicants} />
          </Collapse>
        </TableCell>
        <TableCell className={'apartment-sub-table'} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <HallSubTable apartmentChoices={applicationDetails.ApartmentChoices} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default ApplicationRow;
