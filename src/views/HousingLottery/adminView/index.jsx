import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Link,
} from '@mui/material';
import housingService from 'services/housing';
import styles from '../HousingLottery.module.css';
import { CSVLink } from 'react-csv';
import { setDate } from 'date-fns';

const AdminView = () => {
  const [data, setData] = useState([]);
  const [preference, setPreference] = useState([]);
  const [preferredHall, setPreferredHall] = useState([]);
  const [applicant, setApplicant] = useState([]);
  const [schoolYear, setSchoolYear] = useState([]);
  const [ApplicationID, setApplicationID] = useState([]);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    housingService.getCurrentApplicationID().then(setApplicationID);
    housingService.getAllPreference().then(setPreference);
    housingService.getAllPreferredHall().then(setPreferredHall);
    housingService.getAllApplicant().then(setApplicant);
    housingService.getAllSchoolYear().then(setSchoolYear);
    housingService.getDueDate().then(setDueDate);
  }, []);

  const handleClick = async () => {
    console.log(preference);
    console.log(preferredHall);
    console.log(applicant);
    console.log(schoolYear);
  };
  
  const handleDateChange = (event) => {
    let input = event.target.value.replace(/\D/g, '');

    if (/^\d+$/.test(input)) {
      if (input.length <= 2) {
        setDueDate(input);
      } else if (input.length <= 4) {
        setDueDate(`${input.slice(0, 2)}/${input.slice(2)}`);
      } else {
        setDueDate(`${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4, 8)}`);
      }
    }
  };

  const submitDueDate = async () => {
    await housingService.addDueDate(dueDate);
  };

  const combineData = (applicants, preferredHalls, preferences, schoolYears) => {
    const normalizedData = {};
  
    applicants.forEach(item => {
      if (!normalizedData[item.ApplicationID]) {
        normalizedData[item.ApplicationID] = {
          applicants: [],
          preferredHalls: [],
          preferences: [],
          year: null
        };
      }
      normalizedData[item.ApplicationID].applicants.push(item.Applicant1);
    });
  
    preferredHalls.forEach(item => {
      if (normalizedData[item.ApplicationID]) {
        normalizedData[item.ApplicationID].preferredHalls[item.Rank - 1] = item.HallName;
      }
    });
  
    preferences.forEach(item => {
      if (normalizedData[item.ApplicationID]) {
        normalizedData[item.ApplicationID].preferences.push(item.Preference1);
      }
    });
  
    schoolYears.forEach(item => {
      if (normalizedData[item.ApplicationID]) {
        normalizedData[item.ApplicationID].year = item.Year1;
      }
    });
  
    return normalizedData;
  };  
  
  const combinedData = combineData(applicant,preferredHall,preference,schoolYear);
  
  const csvData = Object.keys(combinedData).map((applicationId) => {
    const appData = combinedData[applicationId];
    return {
      'Lottery Number': applicationId, 
      //Jan 28: Now we still treat ApplicationID is used as Lottery Number
      'Applicant 1`s Email': appData.applicants[0] || '',
      'Applicant 2`s Email': appData.applicants[1] || '',
      'Applicant 3`s Email': appData.applicants[2] || '',
      'Applicant 4`s Email': appData.applicants[3] || '',
      'Preferred Hall 1': appData.preferredHalls[0] || '',
      'Preferred Hall 2': appData.preferredHalls[1] || '',
      'Preferred Hall 3': appData.preferredHalls[2] || '',
      'Preferred Hall 4': appData.preferredHalls[3] || '',
      'Preferred Hall 5': appData.preferredHalls[4] || '',
      'Preferred Hall 6': appData.preferredHalls[5] || '',
      'Preference 1': appData.preferences[0] || '',
      'Preference 2': appData.preferences[1] || '',
      'Class Standing': appData.year || '',
    };
  });

  const csvHeaders = [
    {label:'Lottery Number',key:'Lottery Number'},
    {label:'Applicant 1`s Email',key:'Applicant 1`s Email'},
    {label:'Applicant 2`s Email',key:'Applicant 2`s Email'},
    {label:'Applicant 3`s Email',key:'Applicant 3`s Email'},
    {label:'Applicant 4`s Email',key:'Applicant 4`s Email'},
    {label:'Preferred Hall 1',key:'Preferred Hall 1'},
    {label:'Preferred Hall 2',key:'Preferred Hall 2'},
    {label:'Preferred Hall 3',key:'Preferred Hall 3'},
    {label:'Preferred Hall 4',key:'Preferred Hall 4'},
    {label:'Preferred Hall 5',key:'Preferred Hall 5'},
    {label:'Preferred Hall 6',key:'Preferred Hall 6'},
    {label:'Preference 1',key:'Preference 1'},
    {label:'Preference 2',key:'Preference 2'},
    {label:'Class Standing',key:'Class Standing'},
  ];


  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={8}>
        <Grid>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Due Date"
            value={dueDate}
            onChange={handleDateChange}
            margin="normal"
            helperText="* MM/DD/YYYY"
          />
          <Button
            className={styles.submit_button}
            variant="contained"
            onClick={submitDueDate}
          >
            Submit
          </Button>
        </Grid>
        <Card>
          <CardHeader title="Admin Interface" className={styles.admin_card_header} />
          <CardContent>
          <Button className={styles.exportButton} variant="contained">
      <CSVLink
        data={csvData}
        headers={csvHeaders}
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
          <TableCell key={`PreferenceHeader${i}`}>Preference {i + 1}</TableCell>
        ))}
        <TableCell>Class Standing</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
  {Object.keys(combinedData).map((ApplicationID, index) => {
    const appData = combinedData[ApplicationID];
    return (
      <TableRow key={ApplicationID}>
        <TableCell>{ApplicationID}</TableCell>
        {Array.from({ length: 4 }, (_, i) => (
          <TableCell key={`ApplicantEmail${i}`}>
            {appData.applicants && appData.applicants.length > i ? appData.applicants[i] : ''}
          </TableCell>
        ))}
        {Array.from({ length: 6 }, (_, i) => (
       <TableCell key={`PreferredHall${i}`}>
            {appData.preferredHalls && appData.preferredHalls.length > i ? appData.preferredHalls[i] : ''}
          </TableCell>
        ))} 
        {Array.from({ length: 2 }, (_, i) => (
          <TableCell key={`Preference${i}`}>
            {appData.preferences && appData.preferences.length > i ? appData.preferences[i] : ''}
          </TableCell>
        ))}
        <TableCell>{appData.year || ''}</TableCell>
      </TableRow>
    );
  })}
</TableBody>
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
