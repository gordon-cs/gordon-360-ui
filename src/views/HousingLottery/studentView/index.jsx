import { useEffect, useState } from 'react';
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
import user from '../../../services/user';

const StudentView = () => {
  const [email, setEmail] = useState('');
  const [studentApplicantResult, setStudentApplicantResult] = useState([]);
  useEffect(async () => {
    const profile = await user.getProfileInfo();
    setEmail(profile.Email);
    setStudentApplicantResult([email]);
  }, [email]);
  const [preferredHallResult, setPreferredHallResult] = useState([]);
  const [preferenceResult, setPreferenceResult] = useState([]);
  const application_id = nanoid(8);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [areAllAgreementsChecked, setAreAllAgreementsChecked] = useState(false);
  const [areAllHallsSelected, setAreAllHallsSelected] = useState(false);
  console.log('Preferred Hall Result:', preferredHallResult);
  console.log('Student Applicant Result:', studentApplicantResult);
  console.log('Preference Result:', preferenceResult);

  const handleAgreementsChange = (allChecked) => {
    const agreementData = [allChecked];
    console.log('Agreement Data:', agreementData);
    setAreAllAgreementsChecked(allChecked);
  };

  const handlePreferenceChange = (newPreferences) => {
    setPreferenceResult(newPreferences);
    console.log('Preference Data:', newPreferences);
  };

  const handleClick = async () => {
    if (!areAllAgreementsChecked) {
      setSnackbar({
        message: 'Please agree to all terms before submitting.',
        severity: 'error',
        open: true,
      });
      return;
    }

    if (!areAllHallsSelected) {
      setSnackbar({
        message: 'Please select all preferred halls before submitting.',
        severity: 'error',
        open: true,
      });
      return;
    }

    const invalidEmail = studentApplicantResult.some(
      (applicant) => applicant.email && !applicant.email.endsWith('@gordon.edu'),
    );
    if (invalidEmail) {
      setSnackbar({
        message:
          'One or more emails are not valid Gordon emails. Please correct them before submitting.',
        severity: 'error',
        open: true,
      });
      return;
    }

    try {
      console.log(application_id);
      await housingService.addApplicant(application_id, studentApplicantResult);
      await housingService.addHall(application_id, preferredHallResult);
      await housingService.addPreference(application_id, preferenceResult);
      setSnackbar({
        message: 'Application submitted successfully!',
        severity: 'success',
        open: true,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      setSnackbar({
        message: 'Application fail to submit. Please check your information or contact CTS.',
        severity: 'error',
        open: true,
      });
    }
  };

  const handleHallSelectionChange = (areSelected) => {
    setAreAllHallsSelected(areSelected);
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
          <PreferredHall
            setPreferredHallResult={setPreferredHallResult}
            onHallSelectionChange={handleHallSelectionChange}
            onValidationChange={handleHallSelectionChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Preference onPreferenceChange={handlePreferenceChange} />
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Agreements onChange={handleAgreementsChange} />
      </Grid>
      <Grid item xs={10} container justifyContent="flex-end">
        <Button
          className={styles.submit_button}
          variant="contained"
          onClick={handleClick}
          disabled={!areAllAgreementsChecked}
        >
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
