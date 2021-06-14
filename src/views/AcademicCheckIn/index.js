import React, { useState } from 'react';
import AcademicCheckInWelcome from 'views/AcademicCheckIn/components/AcademicCheckInWelcome';
import EmergencyContactUpdate from 'views/AcademicCheckIn/components/EmergencyContactUpdate';
import UpdatePhone from 'views/AcademicCheckIn/components/UpdatePhone';
import { Button, Grid, Card, CardHeader, Box } from '@material-ui/core';
import { checkInStatus } from 'services/checkIn';
import { gordonColors } from 'theme';
import './index.css';
import PrivacyAgreement from './components/PrivacyAgreement';
import RaceEthnicity from './components/RaceEthnicity';
const AcademicCheckIn = () => {
  const [activeStep, setActiveStep] = useState(0);

  const getSteps = () => {
    return [
      'Main Form',
      'Emergency Contact',
      'Update Phone',
      'Privacy Terms',
      'Race Question',
      'Confirm',
    ];
  };

  const steps = getSteps();

  const [values, setValues] = useState({
    firstName1: '',
    lastName1: '',
    relationship1: '',
    homePhone1: '',
    mobilePhone1: '',
    firstName2: '',
    lastName2: '',
    relationship2: '',
    homePhone2: '',
    mobilePhone2: '',
    firstName3: '',
    lastName3: '',
    relationship3: '',
    homePhone3: '',
    mobilePhone3: '',
    personalPhone: '',
  });

  const handleNext = () => {
    setActiveStep((nextStep) => nextStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((previousStep) => previousStep - 1);
  };

  function handleChange(evt) {
    setValues({ ...values, [evt.target.name]: evt.target.value });
    console.log(values);
  }

  const handleSubmit = () => {
    alert(
      `🧙‍♂️ \n
      FirstName: ${values.firstname1}`,
    );
  };

  let blue = gordonColors.primary.blue;

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={9}>
        <Card>
          <Grid container justify="center" alignItems="center" direction="column" spacing={1}>
            <Grid item xs={12}>
              <CardHeader title="Academic Check In" className="checkIn-header" />
            </Grid>
            <Box m={2}>
              <Grid item>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={12}>
                    {activeStep === 0 && <AcademicCheckInWelcome handleChange={handleChange} />}

                    {activeStep === 1 && (
                      <EmergencyContactUpdate values={values} handleChange={handleChange} />
                    )}

                    {activeStep === 2 && (
                      <UpdatePhone values={values} handleChange={handleChange} />
                    )}

                    {activeStep === 3 && <PrivacyAgreement />}

                    {activeStep === 4 && <RaceEthnicity />}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <br />
              </Grid>
              <Grid item>
                <Grid container justify="center" spacing={2}>
                  <Grid item>
                    <Button
                      style={activeStep === 0 ? { display: 'none' } : {}}
                      variant="contained"
                      onClick={handlePrev}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      style={activeStep === steps.length ? { display: 'none' } : {}}
                    >
                      {activeStep === 0 ? 'Begin Check-In' : 'Next'}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      style={activeStep === steps.length ? {} : { display: 'none' }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AcademicCheckIn;
