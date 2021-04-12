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

/**
 * Renders a card displaying a table of data about the current application
 * @param {Object} props The React component props
 * @param {String} props.dateSubmitted The date the application was submitted
 * @param {String} props.dateModified The date the application was last modified
 * @param {String} props.editorUsername The username of the application's editor
 * @returns {JSX.Element} JSX Element for the data table card
 */
const ApplicationDataTable = ({ dateSubmitted, dateModified, editorUsername, editorEmail }) => {
  function createData(label, value) {
    return { label, value };
  }

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
