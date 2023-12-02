import { useState } from 'react';
import { Button, Grid } from '@mui/material';
import PreferredHall from './PreferredHall';
import StudentApplicants from './StudentApplicants/index.jsx';
import Preference from './PreferenceBox';
import housingService from 'services/housing';
import styles from '../HousingLottery.module.css';

const StudentView = () => {
  const [preferredHallResult, setPreferredHallResult] = useState([]);
  const [studentApplicantResult, setStudentApplicantResult] = useState([]);

  const handleClick = async () => {
    await housingService.addHall(preferredHallResult);
    await housingService.addApplicant(studentApplicantResult);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} lg={10}>
        <PreferredHall setPreferredHallResult={setPreferredHallResult} />
      </Grid>
      <Grid item xs={12} lg={10}>
        <Preference />
      </Grid>
      <Grid item xs={12} lg={5}>
        <StudentApplicants setStudentApplicantResult={setStudentApplicantResult} />
      </Grid>
      <Button className={styles.submit_button} variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </Grid>
  );
};

export default StudentView;
