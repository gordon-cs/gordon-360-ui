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
      const combinedData = applicants.map((applicant, index) => ({
        lotteryNumber: index + 1,
        applicantEmails: applicant.emails.join(', '), // Assuming emails is an array
        preferredHalls: preferredHall[index].halls.join(', '), // Assuming halls is an array
        preference: preference[index], // Assuming preference is an object
      }));

      setData(combinedData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Button className={styles.submit_button} variant="contained">
        Export as Spreadsheet
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lottery Number</TableCell>
              <TableCell>Applicant 1’s Email</TableCell>
              <TableCell>Applicant 2’s Email</TableCell>
              <TableCell>Applicant 3’s Email</TableCell>
              <TableCell>Applicant 4’s Email</TableCell>
              <TableCell>Applicant 5’s Email</TableCell>
              <TableCell>Preferred Hall 1</TableCell>
              <TableCell>Preferred Hall 2</TableCell>
              <TableCell>Preferred Hall 3</TableCell>
              <TableCell>Preferred Hall 4</TableCell>
              <TableCell>Preferred Hall 5</TableCell>
              <TableCell>Preferred Hall 6</TableCell>
              <TableCell>Preference</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.lotteryNumber}>
                <TableCell>{row.lotteryNumber}</TableCell>
                <TableCell>{row.applicantEmails}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{row.preferredHalls}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{JSON.stringify(row.preference)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminView;
