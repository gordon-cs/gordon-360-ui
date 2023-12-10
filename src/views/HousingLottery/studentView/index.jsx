import { useState } from 'react';
import { Button, Grid } from '@mui/material';
import PreferredHall from './PreferredHall';
import StudentApplicants from './StudentApplicants/index.jsx';
import Preference from './PreferenceBox';
import Agreements from './Agreements';
import Instructions from './Instructions';
import housingService from 'services/housing';
import styles from '../HousingLottery.module.css';
import { nanoid } from 'nanoid';
import GordonSnackbar from 'components/Snackbar';

const StudentView = () => {
  const [preferredHallResult, setPreferredHallResult] = useState([]);
  const [studentApplicantResult, setStudentApplicantResult] = useState([]);
  const [preferenceResult, setPreferenceResult] = useState([]);
  const application_id = nanoid(8);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  console.log('Preferred Hall Result:', preferredHallResult);
  console.log('Student Applicant Result:', studentApplicantResult);
  console.log('Preference Result:', preferenceResult);

  const handleClick = async () => {
    if (preferredHallResult.includes('')) {
      setSnackbar({
        message: 'Please complete all hall preferences before submitting.',
        severity: 'warning',
        open: true,
      });
      return;
    }

    try {
      console.log(application_id);
      await housingService.addApplicant(application_id, studentApplicantResult);
      await housingService.addHall(application_id, preferredHallResult);
      await housingService.addPreference(application_id, preferenceResult);
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
      <Grid item xs={10}>
        <Instructions />
      </Grid>
      <Grid item xs={12} lg={5}>
        <StudentApplicants setStudentApplicantResult={setStudentApplicantResult} />
      </Grid>
      <Grid container item xs={12} lg={5} spacing={2} direction="row" alignItems="flex-start">
        <Grid item xs={12}>
          <PreferredHall setPreferredHallResult={setPreferredHallResult} />
        </Grid>
        <Grid item xs={12}>
          <Preference setPreferenceResult={setPreferenceResult} />
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Agreements />
      </Grid>
      <Grid item xs={10} container justifyContent="flex-end">
        <Button className={styles.submit_button} variant="contained" onClick={handleClick}>
          Submit
        </Button>
      </Grid>
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
