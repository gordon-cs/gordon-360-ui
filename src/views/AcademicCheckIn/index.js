import React, { useState /*, useEffect*/ } from 'react';
import AcademicCheckInWelcome from 'views/AcademicCheckIn/components/AcademicCheckInWelcome';
import EmergencyContactUpdate from 'views/AcademicCheckIn/components/EmergencyContactUpdate';
import UpdatePhone from 'views/AcademicCheckIn/components/UpdatePhone';
import { Button, Grid, Card, CardHeader, Box } from '@material-ui/core';
// import { checkInStatus } from 'services/checkIn';

import './index.css';
import PrivacyAgreement from './components/PrivacyAgreement';
import RaceEthnicity from './components/RaceEthnicity';
import ConfirmCheckIn from './components/ConfirmCheckIn';

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

  const holdStatus = false; // checkIn.getHoldStatus();

  const [values, setValues] = useState({
    studentFirstName: 'Silas',
    studentLastName: 'White',
    registrationHold: false,
    highSchoolTranscriptHold: false,
    financialHold: false,
    medicalHold: false,
    laVidaHold: false,
    declarationOfMajorHold: false,
    isRegistered: true,
    isIncoming: false,
    firstName1: '',
    lastName1: '',
    relationship1: '',
    homePhone1: '',
    homePhone1IN: false,
    mobilePhone1: '',
    mobilePhone1IN: false,
    firstName2: '',
    lastName2: '',
    relationship2: '',
    homePhone2: '',
    homePhone2IN: false,
    mobilePhone2: '',
    mobilePhone2IN: false,
    firstName3: '',
    lastName3: '',
    relationship3: '',
    homePhone3: '',
    homePhone3IN: false,
    mobilePhone3: '',
    mobilePhone3IN: false,
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
    none: false,
  });

  const handleNext = () => {
    setActiveStep((nextStep) => nextStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((previousStep) => previousStep - 1);
  };

  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
    console.log(values);
  };

  const handleCheck = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.checked });
  };

  const handleSubmit = () => {
    alert(
      `🧙‍♂️ \n
      FirstName: ${values.firstName1}`,
    );
  };

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12} md={9} lg={6}>
        <Card className="academicCheckIn">
          <CardHeader title="Academic Check In" className="checkIn-header" padding={30} />
          <Box m={2}>
            <Grid container justify="center" alignItems="center" direction="column" spacing={1}>
              <Grid item>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    {activeStep === 0 && <AcademicCheckInWelcome values={values} />}

                    {activeStep === 1 && (
                      <EmergencyContactUpdate
                        values={values}
                        handleChange={handleChange}
                        handleCheck={handleCheck}
                      />
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
                    {activeStep === 5 && <ConfirmCheckIn values={values} />}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <br />
              </Grid>
              <Grid item>
                <Grid container justify="center" className="button-container" spacing={2}>
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
                      style={activeStep === steps.length - 1 ? { display: 'none' } : {}}
                      disabled={
                        (activeStep === 0 && holdStatus === true) ||
                        (activeStep === 1 &&
                          (values.firstName1 === '' || values.firstName2 === '')) ||
                        (activeStep === 2 &&
                          values.personalPhone === '' &&
                          values.noPhone === false) ||
                        (activeStep === 3 &&
                          (values.FERPA === false ||
                            values.dataUsage === false ||
                            values.photoConsent === false)) ||
                        (activeStep === 4 && values.ethnicity === '') ||
                        (activeStep === 4 &&
                          !(
                            values.nativeAmerican ||
                            values.asian ||
                            values.blackhawaiian ||
                            values.white ||
                            values.none
                          ))
                      }
                    >
                      {activeStep === 0 ? 'Begin Check-In' : 'Next'}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      style={activeStep === steps.length - 1 ? {} : { display: 'none' }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AcademicCheckIn;
