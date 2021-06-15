import React, { useState } from 'react';
import AcademicCheckInWelcome from 'views/AcademicCheckIn/components/AcademicCheckInWelcome';
import EmergencyContactUpdate from 'views/AcademicCheckIn/components/EmergencyContactUpdate';
import UpdatePhone from 'views/AcademicCheckIn/components/UpdatePhone';
import { Button, Grid, Card, CardHeader, Box } from '@material-ui/core';
import { checkInStatus } from 'services/checkIn';
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
    makePublic: false,
    noPhone: false,
    FERPA: false,
    dataUsage: false,
    photoConsent: false,
    ethnicity: '',
    nativeAmerican: false,
    asian: false,
    black: false,
    hawaiian: false,
    white: false,
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

  const handleCheck = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
  };

  const handleSubmit = () => {
    alert(
      `🧙‍♂️ \n
      FirstName: ${values.firstname1}`,
    );
  };

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={5}>
        <Card>
          <CardHeader title="Academic Check In" className="checkIn-header" padding={30} />
          <Grid item>
            <Box m={2}>
              <Grid container justify="center" alignItems="center" direction="column" spacing={1}>
                <Grid item>
                  <Grid container justify="center" alignItems="center">
                    <Grid item xs={11}>
                      {activeStep === 0 && <AcademicCheckInWelcome handleChange={handleChange} />}

                      {activeStep === 1 && (
                        <EmergencyContactUpdate values={values} handleChange={handleChange} />
                      )}

                      {activeStep === 2 && (
                        <UpdatePhone
                          values={values}
                          handleChange={handleChange}
                          handleCheck={handleCheck}
                        />
                      )}

                      {activeStep === 3 && (
                        <PrivacyAgreement values={values} handleCheck={handleCheck} />
                      )}

                      {activeStep === 4 && (
                        <RaceEthnicity
                          values={values}
                          handleChange={handleChange}
                          handleCheck={handleCheck}
                        />
                      )}
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
              </Grid>
            </Box>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AcademicCheckIn;
