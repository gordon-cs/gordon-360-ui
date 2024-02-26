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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Link,
} from '@mui/material';
import housingService from 'services/housing';
import styles from '../HousingLottery.module.css';
import { CSVLink } from 'react-csv';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    <TableCell>Applicants</TableCell>
    <TableCell>Preferred Halls</TableCell>
    <TableCell>Preferences</TableCell>
    <TableCell>Class Standing</TableCell>
  </TableRow>
</TableHead> 
<TableBody>
  {Object.keys(combinedData).map((applicationId, index) => {
    const appData = combinedData[applicationId];
    const hasMultipleApplicants = appData.applicants.length > 1;
    const hasMultipleHalls = appData.preferredHalls.length > 1;
    const hasMultiplePreferences = appData.preferences.length >1;

    return (
      <TableRow key={applicationId}>
        <TableCell>{applicationId}</TableCell>
        
        {/* Applicants Cell */}
        <TableCell>
          {hasMultipleApplicants ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-applicants-content-${index}`}
                id={`panel-applicants-header-${index}`}
              >
                <Typography>{appData.applicants[0]}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="div">
                  {appData.applicants.slice(1).map((email, idx) => (
                    <div key={idx}>{email}</div>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Typography>{appData.applicants[0]}</Typography>
          )}
        </TableCell>
        <TableCell>
          {hasMultipleHalls ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-halls-content-${index}`}
                id={`panel-halls-header-${index}`}
              >
                <Typography>{appData.preferredHalls[0]}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="div">
                  {appData.preferredHalls.slice(1).map((hall, idx) => (
                    <div key={idx}>{hall}</div>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Typography>{appData.preferredHalls[0]}</Typography>
          )}
        </TableCell>
         {/* Preferences Cell */}
         <TableCell>
          {hasMultiplePreferences ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-preferences-content-${index}`}
                id={`panel-preferences-header-${index}`}
              >
                <Typography>{appData.preferences[0]}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {appData.preferences.slice(1).map((preference, idx) => (
                  <Typography key={idx}>{preference}</Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          ) : (
            <Typography>{appData.preferences[0]}</Typography>
          )}
        </TableCell>
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
