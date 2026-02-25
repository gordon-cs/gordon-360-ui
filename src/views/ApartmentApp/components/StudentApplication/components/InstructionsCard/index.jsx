import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material/';
import { ApplicationProcessDates } from 'services/housing';
import { format } from 'date-fns';
// @TODO CSSMODULES - outside directory
import styles from '../../../../ApartmentApp.module.css';

/**
 * Renders a card displaying the apartment application instructions
 *
 * @returns {JSX.Element} JSX Element for the instructions card
 */
const InstructionsCard = () => {
  const thisYear = new Date().getFullYear();

  const rows = [
    { description: 'Current Freshman', points: 1 },
    { description: 'Current Sophomore', points: 2 },
    { description: 'Current Junior', points: 3 },
    { description: 'Current Senior', points: 4 },
    { description: '23+ years old', points: 1 },
    { description: 'Full-time, off-campus program credit', points: 1 },
    { description: 'Academic/Chapel probation', points: -1 },
    { description: 'Possible academic suspension', points: -2 },
    { description: `${thisYear - 1}-${thisYear} Disciplinary Probation`, points: -3 },
  ];

  return (
    <Card>
      <CardHeader
        title="On-Campus Apartments"
        subheader="Information and Guidelines"
        className={styles.apartment_card_header}
      />
      <CardContent className={styles.apartment_instructions}>
        <Typography variant="h4">Apartment Application Process 2026-2027</Typography>
        <Typography variant="body1" paragraph>
          Apartments provide an alternative to the traditional residence hall setting and offer a
          unique community experience. To be eligible to live in an apartment, students must be at
          least 20 years old <strong>or</strong> have junior or senior academic standing as of Sept.
          1, {thisYear}.
        </Typography>
        <Typography variant="h5">Application Dates</Typography>
        <ul>
          <li>
            Applications are open as of{' '}
            {format(ApplicationProcessDates.applicationAvailableAt, "b 'on' MMMM do")}
          </li>
          <li>
            Applications close at{' '}
            <b>{format(ApplicationProcessDates.applicationSubmissionDeadline, "b 'on' MMMM do")}</b>
          </li>
          <li>
            <b>
              You will be notified of your application status and next steps by{' '}
              {format(ApplicationProcessDates.approvalNotificationBy, 'MMMM do')}
            </b>
          </li>
        </ul>
        <Typography variant="h5">Application & Qualifications</Typography>
        <ul>
          <li>
            <b>Each group of students</b> desiring to live in a Tavilla or Bromley apartment or in
            The Village as a group must submit an application.{' '}
            <i>
              Please note: Students can apply in groups of 4 to live near one another in The
              Village. Students interested living in The Village without a group are still eligible
              to apply for The Village through the non-apartment housing process.
            </i>
          </li>
          <li>
            <b>Full-time and part-time students</b>are allowed to apply for an apartment, but extra
            points will be awarded to full-time students.
            <ul>
              <li>
                Students fulfilling academic program requirements through student teaching or a
                full-time internship will qualify for the full-time, off-campus program credit. It
                is the responsibility of applicants to claim this credit on the application.
              </li>
            </ul>
          </li>
          <li>
            <b>
              You must apply with the correct number of people for the type of apartment you are
              applying to:
            </b>{' '}
            If applying for a six-person apartment, there must be six people on the application who
            will be here for the{' '}
            <b>
              <u>fall semester</u>
            </b>{' '}
            (four people on a four-person application, etc.).{' '}
            <u>Applications with an incorrect number of applicants will not be considered.</u>
          </li>
        </ul>

        <Typography variant="h5">An Application is Not a Guarantee!</Typography>
        <Typography variant="body1" paragraph>
          Due to the large number of applications typically received for apartments, not all
          applications will be awarded an apartment. If you do not receive an apartment, you will
          need to secure housing through the housing lottery.
        </Typography>
        <Typography variant="h5">Point-Scale</Typography>
        <Typography variant="body1" paragraph>
          <b>How are apartments awarded?</b> Apartments are awarded in order of point total for each
          type of apartment (4-person, 6-person, etc.) along with submission time. Each individual
          on an application will have points given/taken away using the following scale:
        </Typography>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={11} lg={9}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.description}>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <br />
        <Typography variant="h5">If You Are Approved</Typography>
        <Typography variant="body1" paragraph>
          You will be notified of your approval for an apartment by{' '}
          {format(ApplicationProcessDates.approvalNotificationBy, 'MMMM do, y')}. Once approved, you
          will receive a “time slot” to attend Housing Selection Night and choose which specific
          building/apartment you would like to live in! Further information about specific
          apartment/room selection will be communicated in that email.
        </Typography>
        <Typography variant="h5">If You Are Not Approved</Typography>
        <Typography variant="body1" paragraph>
          You will need to enter the General Housing Selection process and let the Housing Office
          know if you would prefer to live in a double/triple/quad and who you would like to be your
          roommate(s). Further information about specifics will be communicated in that email.
        </Typography>
        <Typography variant="h5">Further Info</Typography>
        <Typography variant="body1">
          For an FAQ and the latest updates, check the{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="gc360_text_link"
            href="https://gordon.instructure.com/courses/13668/pages/apartment-application-process-2026-2027?module_item_id=695026"
          >
            Apartment Application Process 2026-2027 page in Canvas
          </a>
          .<br /> Questions? Email{' '}
          <a
            className="gc360_text_link"
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:Housing@gordon.edu"
          >
            Housing@gordon.edu
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InstructionsCard;
