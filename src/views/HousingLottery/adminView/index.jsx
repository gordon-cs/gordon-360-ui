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
} from '@mui/material';
import housingService from 'services/housing';
import styles from '../HousingLottery.module.css';

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

        // Add columns for applicant's emails
        for (let i = 0; i < 5; i++) {
          rowData[`Applicant ${i + 1}'s Email`] = applicant.emails[i] || '';
        }

        // Add columns for preferred halls
        for (let i = 0; i < 6; i++) {
          rowData[`Preferred Hall ${i + 1}`] = preferredHall[index].halls[i] || '';
        }

        return rowData;
      });

      setData(combinedData);
    };

    fetchData();
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={8}>
        <Paper elevation={3} className={styles.AdminCard}> 
          <Typography variant="h5" className={styles.pageTitle}>
            Admin Interface
          </Typography>
          <Button className={styles.exportButton} variant="contained">
            Export as Spreadsheet
          </Button>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Lottery Number</TableCell>
                  {Array.from({ length: 5 }, (_, i) => (
                    <TableCell key={`ApplicantEmailHeader${i}`}>
                      Applicant {i + 1}'s Email
                    </TableCell>
                  ))}
                  {Array.from({ length: 6 }, (_, i) => (
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
                    {Array.from({ length: 5 }, (_, i) => (
                      <TableCell key={`ApplicantEmail${i}`}>{row[`Applicant ${i + 1}'s Email`]}</TableCell>
                    ))}
                    {Array.from({ length: 6 }, (_, i) => (
                      <TableCell key={`PreferredHall${i}`}>{row[`Preferred Hall ${i + 1}`]}</TableCell>
                    ))}
                    <TableCell>{row.preference}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminView;
