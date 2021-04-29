import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core/';
import EmailIcon from '@material-ui/icons/Email';
import { DateTime } from 'luxon';

/** @typedef { import('services/housing').ApplicationDetails } ApplicationDetails */

/**
 * Renders a card displaying a table of data about the current application
 * @param {Object} props The React component props
 * @param {ApplicationDetails} props.applicationDetails Object containing the details of this application
 * @returns {JSX.Element} JSX Element for the data table card
 */
const ApplicationDataTable = ({ applicationDetails }) => {
  function createData(label, value) {
    return { label, value };
  }

  let dateSubmitted = applicationDetails.DateSubmitted;
  let dateModified = applicationDetails.DateModified;
  let editorUsername = applicationDetails.EditorProfile?.AD_Username;
  let editorEmail = applicationDetails.EditorProfile?.Email;
  let rows = [
    createData(
      'Last Submitted: ',
      dateSubmitted ? DateTime.fromISO(dateSubmitted).toLocaleString() : 'Not yet submitted',
    ),
    createData(
      'Last Modified: ',
      dateModified ? DateTime.fromISO(dateModified).toLocaleString() : 'Not yet saved',
    ),
    createData('Application Editor: ', editorUsername ?? 'None'),
  ];

  return (
    <Card>
      <CardHeader title="Your Application Details" className="apartment-card-header" />
      <CardContent>
        <TableContainer>
          <Table>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.label}>
                  <TableCell component="th" scope="row">
                    {row.label}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
              {editorUsername && editorEmail && (
                <TableRow>
                  <TableCell colSpan={2}>
                    <a href={`mailto:${editorEmail}`}>
                      <div className="identification-card-content-card-container-info-email-container">
                        <EmailIcon className="identification-card-content-card-container-info-email-container-icon" />
                        <Typography variant="body1">{editorEmail}</Typography>
                      </div>
                    </a>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ApplicationDataTable;
