import React from 'react';
import { Collapse, IconButton, TableCell, TableRow } from '@material-ui/core/';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ApplicantSubTable from './components/ApplicantSubTable';
import HallSubTable from './components/HallSubTable';

const ApplicationRow = ({ applicationDetails, labelId }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow key={applicationDetails.ApplicationID} onClick={() => setOpen(!open)}>
        <TableCell align="center" component="th" id={labelId} scope="row">
          {applicationDetails.ApplicationID}
        </TableCell>
        <TableCell align="center">
          {applicationDetails.EditorUsername ?? applicationDetails.EditorProfile.AD_Username}
        </TableCell>
        <TableCell align="center">{applicationDetails.NumApplicants}</TableCell>
        <TableCell align="center">{applicationDetails.Gender}</TableCell>
        <TableCell align="center">{applicationDetails.FirstHall}</TableCell>
        <TableCell align="center">{applicationDetails.TotalPoints ?? 'N/A'}</TableCell>
        <TableCell align="center">{applicationDetails.AvgPoints ?? 'N/A'}</TableCell>
        <TableCell align="center" padding="none">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={styles.collapsible-row} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ApplicantSubTable applicants={applicationDetails.Applicants} />
          </Collapse>
        </TableCell>
        <TableCell className={styles.collapsible-row} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <HallSubTable apartmentChoices={applicationDetails.ApartmentChoices} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default ApplicationRow;
