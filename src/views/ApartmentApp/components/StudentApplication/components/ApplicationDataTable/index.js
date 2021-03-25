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
} from '@material-ui/core/';

/**
 * Renders a card displaying a table of data about the current application
 * @param {Object} props The React component props
 * @param {String} props.dateSubmitted The date the application was submitted
 * @param {String} props.dateModified The date the application was last modified
 * @param {String} props.editorUsername The username of the application's editor
 * @returns {JSX.Element} JSX Element for the data table card
 */
const ApplicationDataTable = ({ dateSubmitted, dateModified, editorUsername }) => {
  function createData(label, value) {
    return { label, value };
  }

  let rows = [];

  if (dateSubmitted) {
    rows.push(createData('Last Submitted: ', dateSubmitted));
  } else {
    rows.push(createData('Last Submitted: ', 'Not yet submitted'));
  }

  if (dateModified) {
    rows.push(createData('Last Modified: ', dateModified));
  }

  if (editorUsername) {
    rows.push(createData('Application Editor: ', editorUsername));
  }

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
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ApplicationDataTable;
