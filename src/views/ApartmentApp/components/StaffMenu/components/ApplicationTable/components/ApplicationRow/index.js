import React from 'react';
import { Collapse, IconButton, TableCell, TableRow } from '@material-ui/core/';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ApplicantSubTable from './components/ApplicantSubTable';
import HallSubTable from './components/HallSubTable';

const ApplicationRow = ({ applicationDetails }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow key={applicationDetails.AprtAppID} onClick={() => setOpen(!open)}>
        <TableCell component="th" scope="row" align="right">
          {applicationDetails.AprtAppID}
        </TableCell>
        <TableCell>{applicationDetails.Username}</TableCell>
        <TableCell align="right">{applicationDetails.Applicants.length}</TableCell>
        <TableCell align="center">{applicationDetails.Gender}</TableCell>
        <TableCell>{applicationDetails.ApartmentChoices[0].HallName || 'N/A'}</TableCell>
        <TableCell align="right">{applicationDetails.TotalPoints || 'N/A'}</TableCell>
        <TableCell align="right">{applicationDetails.AvgPoints || 'N/A'}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ApplicantSubTable applicants={applicationDetails.Applicants} />
          </Collapse>
        </TableCell>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <HallSubTable apartmentChoices={applicationDetails.ApartmentChoices} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default ApplicationRow;
