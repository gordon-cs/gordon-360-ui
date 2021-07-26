import React, { useState, useEffect } from 'react';
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
} from '@material-ui/core/';
import housing from 'services/housing';

// @TODO CSSMODULES - outside directory
import styles from '../../../../ApartmentApp.module.css';

/**
 * Renders a card displaying the apartment application instructions
 * @returns {JSX.Element} JSX Element for the instructions card
 */
const InstructionsCard = () => {
  const [apartmentSelectionDate, setApartmentSelectionDate] = useState();
  const [thisYear, setThisYear] = useState();

  useEffect(() => {
    const loadSelectionDate = async () =>
      setApartmentSelectionDate(await housing.getApartmentSelectionDate());

    loadSelectionDate();

    setThisYear(new Date().getFullYear());
  }, []);

  const rows = [
    { description: 'Current First Year', points: 1 },
    { description: 'Current Sophomore', points: 2 },
    { description: 'Current Junior', points: 3 },
    { description: 'Current Senior', points: 4 },
    { description: '23+ years old', points: 1 },
    { description: 'Full-time, off-campus program credit', points: 1 },
    { description: 'Academic probation', points: -1 },
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
        <Typography variant="body1" paragraph>
          Apartments provide an alternative to the traditional residence hall setting and offer a
          unique community experience. To be eligible to live in an apartment, students must be at
          least 20 years old as of Sept. 1, {thisYear} <strong>or</strong> a current junior or
          senior. Students who were on disciplinary probation at any time during the {thisYear - 1}-
          {thisYear} academic year must also receive approval from the Dean of Student Care to be
          eligible to apply for an apartment. Each applicant must be registered as a full-time
          student by apartment selection night ({apartmentSelectionDate}).
        </Typography>
        <Typography variant="body1" paragraph>
          Each group of students desiring to live in a Tavilla or Bromley apartment or in The
          Village must submit an application. Your application can include a student who is studying
          aproad or not enrolled for the Spring {thisYear} semester &ndash; simply list their name
          on the application.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Full-time, off-campus program credit:</strong> Students fulfilling academic
          program requirements through student teaching or a full-time internship will qualify for
          the full-time, off-campus program credit. It is the responsibility of applicants to claim
          this credit on the application.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Applications must be for a full apartment:</strong> If applying for a six-person
          apartment, there must be six people on the application who will be here for the{' '}
          <strong className={styles.over_emphasized}>fall semester</strong> (four people on a
          four-person application, etc.). Applications with an incorrect number of applicants will
          not be considered.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>An application is not a guarantee!</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          Due to the large number of applications typically recieved for apartments, not all
          applications will be awarded an apartment. If you do not receive an apartment, you will
          need to secure housing through the housing lottery.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>How are apartments awarded?</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          Apartments are awarded in order of point total for each type of apartment (4-person,
          6-person, etc.). Each individual on an application will have points given/taken away using
          the following scale:
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
        <Typography variant="subtitle1" gutterBottom>
          <strong>If You Are Approved...</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          You will be notified of your placement in an apartment/Village{' '}
          <strong>
            <em>building</em>
          </strong>{' '}
          no later than {apartmentSelectionDate}. Further information about specific apartment/room
          selection will be communicated in that email.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InstructionsCard;
