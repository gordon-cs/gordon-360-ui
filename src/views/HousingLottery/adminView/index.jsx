import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Link,
} from '@mui/material';
import housingService from 'services/housing';
import styles from '../HousingLottery.module.css';
import { CSVLink } from 'react-csv';

const AdminView = () => {
  const [data, setData] = useState([]);

  const [preference, setPreference] = useState([]);
  const [preferredHall, setPreferredHall] = useState([]);
  const [applicant, setApplicant] = useState([]);
  const [schoolYear, setSchoolYear] = useState([]);

  useEffect(() => {
    housingService.getAllPreference().then(setPreference);
    housingService.getAllPreferredHall().then(setPreferredHall);
    housingService.getAllApplicant().then(setApplicant);
    housingService.getAllSchoolYear().then(setSchoolYear);
  }, []);

  const csvData = data.map((row) => ({
    'Lottery Number': row.lotteryNumber,
    'Applicant 1’s Email': row["Applicant 1's Email"],
    'Applicant 2’s Email': row["Applicant 2's Email"],
    'Applicant 3’s Email': row["Applicant 3's Email"],
    'Applicant 4’s Email': row["Applicant 4's Email"],
    'Preferred Hall 1': row['Preferred Hall 1'],
    'Preferred Hall 2': row['Preferred Hall 2'],
    'Preferred Hall 3': row['Preferred Hall 3'],
    'Preferred Hall 4': row['Preferred Hall 4'],
    'Preferred Hall 5': row['Preferred Hall 5'],
    'Preferred Hall 6': row['Preferred Hall 6'],
    'Preference 1': row['Preference 1'],
    'Preference 2': row['Preference 2'],
    'Class Standing': row.standing, // Add class standing to the CSV
  }));

  const csvHeaders = [
    'Lottery Number',
    'Applicant 1’s Email',
    'Applicant 2’s Email',
    'Applicant 3’s Email',
    'Applicant 4’s Email',
    'Preferred Hall 1',
    'Preferred Hall 2',
    'Preferred Hall 3',
    'Preferred Hall 4',
    'Preferred Hall 5',
    'Preferred Hall 6',
    'Preference 1',
    'Preference 2',
    'Class Standing', // Add class standing header
  ];

  const handleClick = async () => {
    console.log(preference);
    console.log(preferredHall);
    console.log(applicant);
    console.log(schoolYear);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader title="Admin Interface" className={styles.admin_card_header} />
          <CardContent>
            <Button className={styles.exportButton} variant="contained">
              <CSVLink
                data={[csvHeaders, ...csvData]}
                filename={'admin_data.csv'}
                className={styles.csvLink}
              >
                Export as CSV
              </CSVLink>
            </Button>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Lottery Number</TableCell>
                    {Array.from({ length: 4 }, (_, i) => (
                      <TableCell key={`ApplicantEmailHeader${i}`}>
                        Applicant {i + 1}'s Email
                      </TableCell>
                    ))}
                    {Array.from({ length: 6 }, (_, i) => (
                      <TableCell key={`PreferredHallHeader${i}`}>Preferred Hall {i + 1}</TableCell>
                    ))}
                    {Array.from({ length: 2 }, (_, i) => (
                      <TableCell key={`PreferredHallHeader${i}`}>Preference {i + 1}</TableCell>
                    ))}
                    <TableCell>Class Standing</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                    <TableRow key={applicant.ApplicationID}>
                      <TableCell>{applicant.ApplicationID}</TableCell>
                      {Array.from({ length: 4 }, (_, i) => (
                        <TableCell key={`ApplicantEmail${i}`}>{row[`Applicant ${i + 1}'s Email`]}</TableCell>
                      ))}
                      {Array.from({ length: 6 }, (_, i) => (
                        <TableCell key={`PreferredHall${i}`}>{row[`Preferred Hall ${i + 1}`]}</TableCell>
                      ))}
                      <TableCell>{row.preference}</TableCell>
                      <TableCell>{row.standing}</TableCell>
                    </TableRow>
                </TableBody> */}
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        <Button className={styles.submit_button} variant="contained" onClick={handleClick}>
          click to see Json Array (transitory button)
        </Button>
      </Grid>
    </Grid>
  );
};

export default AdminView;
