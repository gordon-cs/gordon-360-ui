import React, { useState, useEffect } from 'react';
import AcademicCheckInWelcome from 'views/AcademicCheckIn/components/AcademicCheckInWelcome';
import EmergencyContactUpdate from 'views/AcademicCheckIn/components/EmergencyContactUpdate';
import UpdatePhone from 'views/AcademicCheckIn/components/UpdatePhone';
import { Button, Grid, Card, CardHeader, Box } from '@material-ui/core';
import checkInService from 'services/checkIn';
import './index.css';
import PrivacyAgreement from './components/PrivacyAgreement';
import RaceEthnicity from './components/RaceEthnicity';
import ConfirmCheckIn from './components/ConfirmCheckIn';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import user from 'services/user';

const AcademicCheckIn = ({ authentication }) => {
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

  const holdStatus = false;

  const [loading, setLoading] = useState(true);

  const [emergencyContacts, setEmergencyContacts] = useState({
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
  });

  const [holds, setHolds] = useState({
    registrationHold: false,
    highSchoolTranscriptHold: false,
    financialHold: false,
    medicalHold: false,
    laVidaHold: false,
    declarationOfMajorHold: false,
    isRegistered: true,
    isIncoming: false,
  });

  const [personalPhone, setPersonalPhone] = useState({
    personalPhone: '',
    makePublic: false,
    noPhone: false,
  });

  const [privacyAgreements, setPrivacyAgreements] = useState({
    FERPA: false,
    dataUsage: false,
    photoConsent: false,
  });

  const [demographic, setDemographic] = useState({
    ethnicity: '',
    nativeAmerican: false,
    asian: false,
    black: false,
    hawaiian: false,
    white: false,
    none: false,
  });

  const [basicInfo, setBasicInfo] = useState({
    studentFirstName: '',
    studentLastName: '',
  });

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setProfile(await (user.getProfileInfo()))
        console.log(profile)
        setEmergencyContacts(await checkInService.getEmergencyContacts(profile.AD_Username.toLowerCase()))
      } catch (error) {
        console.log(error);
      }
    };

    if (authentication) {
      loadData();
    }
    setLoading(false);
  }, [authentication, profile]);

  const handleNext = () => {
    setActiveStep((nextStep) => nextStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((previousStep) => previousStep - 1);
  };

  const handleChangeEmergContact = (evt) => {
    setEmergencyContacts({ ...emergencyContacts, [evt.target.name]: evt.target.value });
  };

  const handleChangePersonalPhone = (evt) => {
    setPersonalPhone({ ...personalPhone, [evt.target.name]: evt.target.value });
  };

  const handleChangeDemographic = (evt) => {
    setDemographic({ ...demographic, [evt.target.name]: evt.target.value });
  };

  const handleCheckPrivacyAgreements = (evt) => {
    setPrivacyAgreements({ ...privacyAgreements, [evt.target.name]: evt.target.checked });
  };

  const handleCheckEmergContact = (evt) => {
    setEmergencyContacts({ ...emergencyContacts, [evt.target.name]: evt.target.checked });
  };

  const handleCheckPersonalPhone = (evt) => {
    setPersonalPhone({ ...personalPhone, [evt.target.name]: evt.target.checked });
  };

  const handleCheckDemographic = (evt) => {
    setDemographic({ ...demographic, [evt.target.name]: evt.target.checked });
  };

  const splitEmergencyContacts = (emergencyContacts) => {
    return [
      {
        firstName: emergencyContacts.firstName1,
        lastName: emergencyContacts.lastName1,
        homePhone: emergencyContacts.homePhone1,
        mobilePhone: emergencyContacts.mobilePhone1,
        relationship: emergencyContacts.relationship1,
      },
      {
        firstName: emergencyContacts.firstName2,
        lastName: emergencyContacts.lastName2,
        homePhone: emergencyContacts.homePhone2,
        mobilePhone: emergencyContacts.mobilePhone2,
        relationship: emergencyContacts.relationship2,
      },
      {
        firstName: emergencyContacts.firstName3,
        lastName: emergencyContacts.lastName3,
        homePhone: emergencyContacts.homePhone3,
        mobilePhone: emergencyContacts.mobilePhone3,
        relationship: emergencyContacts.relationship3,
      },
    ];
  };

  const handleSubmit = () => {
    alert(`Done 🧙‍♂️`);
    splitEmergencyContacts(emergencyContacts).forEach((contact) => {
      checkInService.submitContact(contact);
    });
  };

  let content;
  if (loading === true) {
    content = <GordonLoader />;
  } else if (!authentication) {
    content = <GordonUnauthorized feature={'Academic Checkin'} />;
  } else {
    content = (
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} md={9} lg={6}>
          <Card className="academicCheckIn">
            <CardHeader title="Academic Check In" className="checkIn-header" padding={30} />
            <Box m={2}>
              <Grid container justify="center" alignItems="center" direction="column" spacing={1}>
                <Grid item>
                  <Grid container justify="center" alignItems="center">
                    <Grid item>
                      {activeStep === 0 && (
                        <AcademicCheckInWelcome basicInfo={basicInfo} holds={holds} />
                      )}

                      {activeStep === 1 && (
                        <EmergencyContactUpdate
                          emergencyContacts={emergencyContacts}
                          handleChangeEmergContact={handleChangeEmergContact}
                          handleCheckEmergContact={handleCheckEmergContact}
                        />
                      )}

                      {activeStep === 2 && (
                        <UpdatePhone
                          personalPhone={personalPhone}
                          handleChangePersonalPhone={handleChangePersonalPhone}
                          handleCheckPersonalPhone={handleCheckPersonalPhone}
                        />
                      )}

                      {activeStep === 3 && (
                        <PrivacyAgreement
                          privacyAgreements={privacyAgreements}
                          handleCheckPrivacyAgreements={handleCheckPrivacyAgreements}
                        />
                      )}

                      {activeStep === 4 && (
                        <RaceEthnicity
                          demographic={demographic}
                          handleChangeDemographic={handleChangeDemographic}
                          handleCheckDemographic={handleCheckDemographic}
                        />
                      )}
                      {activeStep === 5 && (
                        <ConfirmCheckIn
                          emergencyContacts={emergencyContacts}
                          personalPhone={personalPhone}
                          demographic={demographic}
                        />
                      )}
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
                            (emergencyContacts.firstName1 === '' ||
                              emergencyContacts.firstName2 === '')) ||
                          (activeStep === 2 &&
                            personalPhone.personalPhone === '' &&
                            personalPhone.noPhone === false) ||
                          (activeStep === 3 &&
                            (privacyAgreements.FERPA === false ||
                              privacyAgreements.dataUsage === false ||
                              privacyAgreements.photoConsent === false)) ||
                          (activeStep === 4 && demographic.ethnicity === '') ||
                          (activeStep === 4 &&
                            !(
                              demographic.nativeAmerican ||
                              demographic.asian ||
                              demographic.blackhawaiian ||
                              demographic.white ||
                              demographic.none
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
  }

  return content;
};

export default AcademicCheckIn;
