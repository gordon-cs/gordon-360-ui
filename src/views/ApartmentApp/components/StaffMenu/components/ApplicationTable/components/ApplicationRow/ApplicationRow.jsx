import { useState, Fragment } from 'react';
import { Collapse, IconButton, TableCell, TableRow } from '@mui/material/';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ApplicantSubTable from './components/ApplicantSubTable/ApplicationSubTable';
import HallSubTable from './components/HallSubTable/HallSubTable';

// @TODO CSSMODULES - outside directory
import styles from '../../../../../../ApartmentApp.module.css';

const ApplicationRow = ({ applicationDetails, labelId }) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
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
        <TableCell className={styles.collapsible_row} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ApplicantSubTable applicants={applicationDetails.Applicants} />
          </Collapse>
        </TableCell>
        <TableCell className={styles.collapsible_row} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <HallSubTable apartmentChoices={applicationDetails.ApartmentChoices} />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default ApplicationRow;
