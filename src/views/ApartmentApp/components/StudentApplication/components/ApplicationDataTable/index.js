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
} from '@mui/material/';
import EmailIcon from '@mui/icons-material/Email';
import { DateTime } from 'luxon';
// @TODO CSSMODULES - outside directory
import styles from '../../../../ApartmentApp.module.css';

/** @typedef { import('services/housing').ApplicationDetails } ApplicationDetails */

/**
 * Renders a card displaying a table of data about the current application
 *
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
      <CardHeader title="Your Application Details" className={styles.apartment_card_header} />
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
                      <div
                        className={
                          styles.identification_card_content_card_container_info_email_container
                        }
                      >
                        <EmailIcon
                          className={
                            styles.identification_card_content_card_container_info_email_container_icon
                          }
                        />
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
