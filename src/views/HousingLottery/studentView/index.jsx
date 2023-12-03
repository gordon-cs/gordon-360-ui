import { useState } from 'react';
import { Button, Grid } from '@mui/material';
import PreferredHall from './PreferredHall';
import StudentApplicants from './StudentApplicants/index.jsx';
import Preference from './PreferenceBox';
import housingService from 'services/housing';
import styles from '../HousingLottery.module.css';
import { nanoid } from 'nanoid';
import GordonSnackbar from 'components/Snackbar';

const StudentView = () => {
  const [preferredHallResult, setPreferredHallResult] = useState([]);
  const [studentApplicantResult, setStudentApplicantResult] = useState([]);
  const [preferenceResult, setPreferenceResult] = useState([]);
  const applicantion_id = nanoid(8);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });

  const handleClick = async () => {
    try {
      console.log(applicantion_id);
      await housingService.addApplicant(applicantion_id, studentApplicantResult);
      await housingService.addHall(applicantion_id, preferredHallResult);
      await housingService.addPreference(applicantion_id, preferenceResult);
    } catch {
      setSnackbar({
        message: 'Application fail to submit. Please check your information or contact CTS.',
        severity: 'error',
        open: true,
      });
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} lg={10}>
        <PreferredHall setPreferredHallResult={setPreferredHallResult} />
      </Grid>
      <Grid item xs={12} lg={10}>
        <Preference setPreferenceResult={setPreferenceResult} />
      </Grid>
      <Grid item xs={12} lg={5}>
        <StudentApplicants setStudentApplicantResult={setStudentApplicantResult} />
      </Grid>
      <Button className={styles.submit_button} variant="contained" onClick={handleClick}>
        Submit
      </Button>
      <GordonSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.message}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </Grid>
  );
};

export default StudentView;
