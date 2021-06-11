import React, { useState } from 'react';
import AcademicCheckInWelcome from 'views/AcademicCheckIn/components/AcademicCheckInWelcome';
import EmergencyContactUpdate from 'views/AcademicCheckIn/components/EmergencyContactUpdate';
import UpdatePhone from 'views/AcademicCheckIn/components/UpdatePhone';
import { Button, Grid, Card, CardHeader } from '@material-ui/core';
import { checkInStatus } from 'services/checkIn';
import './index.css';
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
    phone1: '',
    firstName2: '',
    lastName2: '',
    phone2: '',
    personalPhone: '',
  });

  const handleNext = () => {
    setActiveStep((nextStep) => nextStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((previousStep) => previousStep - 1);
  };

  const handleChange = (input) => (e) => {
    setValues({ ...values, [input]: e.target.value });
  };

  const handleSubmit = () => {
    alert(
      `🧙‍♂️ \n
      FirstName: ${values.firstname1}`,
    );
  };

  return (
    <Grid container justify="center" spacing={2}>
      <Card minWidth={4000}>
        <CardHeader title="Academic Check In" className="checkIn-header" />
        <Grid item xs={12} md={8} direction="row" spacing={10}>
          <Grid container justify="center" alignItems="center">
            {activeStep === 0 && <AcademicCheckInWelcome handleChange={handleChange} />}

            {activeStep === 1 && (
              <EmergencyContactUpdate values={values} handleChange={handleChange} />
            )}

            {activeStep === 2 && <UpdatePhone values={values} handleChange={handleChange} />}
            <Grid spacing={4}>
              <Button disabled={activeStep === 0} variant="contained" onClick={handlePrev}>
                Back
              </Button>

              <Button
                variant="contained"
                onClick={handleNext}
                style={activeStep === steps.length ? { display: 'none' } : {}}
              >
                Next
              </Button>

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
      </Card>
    </Grid>
  );
};

export default AcademicCheckIn;
