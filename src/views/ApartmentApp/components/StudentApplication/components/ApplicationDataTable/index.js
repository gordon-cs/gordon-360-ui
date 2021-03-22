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
