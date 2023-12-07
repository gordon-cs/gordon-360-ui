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

  useEffect(() => {
    const fetchData = async () => {
      const preference = await housingService.getAllPreference();
      const preferredHall = await housingService.getAllPreferredHall();
      const applicants = await housingService.getAllApplicants();
      const schoolYear = await housingService.getAllSchoolYear();

      // Combine the fetched data into a single array of objects
      const combinedData = applicants.map((applicant, index) => {
        const rowData = {
          lotteryNumber: index + 1,
          preference: JSON.stringify(preference[index]), // Assuming preference is an object
        };

        // Limit the number of applicants to 4
        for (let i = 0; i < 4; i++) {
          rowData[`Applicant ${i + 1}'s Email`] = applicant.emails[i] || '';
        }

        // Limit the number of preferred halls to 3
        for (let i = 0; i < 3; i++) {
          rowData[`Preferred Hall ${i + 1}`] = preferredHall[index].halls[i] || '';
        }

        return rowData;
      });

      setData(combinedData);
    };

    fetchData();
  }, []);

  const csvData = data.map((row) => ({
    'Lottery Number': row.lotteryNumber,
    'Applicant 1’s Email': row['Applicant 1\'s Email'],
    'Applicant 2’s Email': row['Applicant 2\'s Email'],
    'Applicant 3’s Email': row['Applicant 3\'s Email'],
    'Applicant 4’s Email': row['Applicant 4\'s Email'],
    'Preferred Hall 1': row['Preferred Hall 1'],
    'Preferred Hall 2': row['Preferred Hall 2'],
    'Preferred Hall 3': row['Preferred Hall 3'],
    'Preference': row.preference,
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
    'Preference',
  ];

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
                    {Array.from({ length: 3 }, (_, i) => (
                      <TableCell key={`PreferredHallHeader${i}`}>
                        Preferred Hall {i + 1}
                      </TableCell>
                    ))}
                    <TableCell>Preference</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.lotteryNumber}>
                      <TableCell>{row.lotteryNumber}</TableCell>
                      {Array.from({ length: 4 }, (_, i) => (
                        <TableCell key={`ApplicantEmail${i}`}>{row[`Applicant ${i + 1}'s Email`]}</TableCell>
                      ))}
                      {Array.from({ length: 3 }, (_, i) => (
                        <TableCell key={`PreferredHall${i}`}>{row[`Preferred Hall ${i + 1}`]}</TableCell>
                      ))}
                      <TableCell>{row.preference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdminView;
