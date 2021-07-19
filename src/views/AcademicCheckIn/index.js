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
import CompletedCheckIn from './components/CompletedCheckIn';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import user from 'services/user';
//🧙‍♂️
const AcademicCheckIn = (props) => {
  const [activeStep, setActiveStep] = useState(0);

  const getSteps = () => {
    return [
      'Main Form',
      'Emergency Contact',
      'Update Phone',
      'Privacy Terms',
      'Race Question',
      'Confirm',
      'Completed Check In',
    ];
  };

  const steps = getSteps();

  const [loading, setLoading] = useState(true);

  const [emergencyContact1, setEmergencyContact1] = useState({
    SEQ_NUM: 1,
    firstname: '',
    lastname: '',
    relationship: '',
    HomePhone: '',
    MobilePhone: '',
  });

  const [emergencyContact2, setEmergencyContact2] = useState({
    SEQ_NUM: 2,
    firstname: '',
    lastname: '',
    relationship: '',
    HomePhone: '',
    MobilePhone: '',
  });

  const [emergencyContact3, setEmergencyContact3] = useState({
    SEQ_NUM: 3,
    firstname: '',
    lastname: '',
    relationship: '',
    HomePhone: '',
    MobilePhone: '',
  });

  const [emergencyContactINTL1, setEmergencyContactINTL1] = useState({
    HomePhoneIN: false,
    MobilePhoneIN: false,
  });

  const [emergencyContactINTL2, setEmergencyContactINTL2] = useState({
    HomePhoneIN: false,
    MobilePhoneIN: false,
  });

  const [emergencyContactINTL3, setEmergencyContactINTL3] = useState({
    HomePhoneIN: false,
    MobilePhoneIN: false,
  });

  const [holds, setHolds] = useState(null);

  const [hasMajorHold, setMajorHold] = useState(false);

  const [personalPhone, setPersonalPhone] = useState({
    personalPhone: '',
    makePrivate: false,
    noPhone: false,
  });

  const [privacyAgreements, setPrivacyAgreements] = useState({
    FERPA: false,
    dataUsage: false,
    photoConsent: false,
  });

  const [demographic, setDemographic] = useState({
    ethnicity: -3,
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
    ID: '',
  });

  useEffect(() => {
    const loadData = async () => {
      let profile = await user.getProfileInfo();
      setBasicInfo({
        studentFirstName: profile.FirstName,
        studentLastName: profile.LastName,
        ID: profile.ID,
      });
      let hasCheckedIn = await checkInService.getStatus(profile.ID);
      if (!hasCheckedIn && profile.PersonType.includes('stu')) {
        let tempHolds = await checkInService.getHolds();
        setHolds(tempHolds);
        if (
          tempHolds.RegistrarHold ||
          tempHolds.HighSchoolTranscriptHold ||
          tempHolds.FinancialHold ||
          tempHolds.MedicalHold ||
          tempHolds.MajorHold ||
          tempHolds.MustRegisterForClasses
        ) {
          setMajorHold(true);
        }

        let contacts = await checkInService.getEmergencyContacts(profile.AD_Username.toLowerCase());

        if (contacts[0]) {
          setEmergencyContact1(contacts[0]);
          setEmergencyContactINTL1({
            HomePhoneIN: contacts[0].HomePhone.startsWith('+'),
            MobilePhoneIN: contacts[0].MobilePhone.startsWith('+'),
          });
        }

        if (contacts[1]) {
          setEmergencyContact2(contacts[1]);
          setEmergencyContactINTL2({
            HomePhoneIN: contacts[1].HomePhone.startsWith('+'),
            MobilePhoneIN: contacts[1].MobilePhone.startsWith('+'),
          });
        }

        if (contacts[2]) {
          setEmergencyContact3(contacts[2]);
          setEmergencyContactINTL3({
            HomePhoneIN: contacts[2].HomePhone.startsWith('+'),
            MobilePhoneIN: contacts[2].MobilePhone.startsWith('+'),
          });
        }
        if (profile.MobilePhone) {
          setPersonalPhone({
            personalPhone: profile.MobilePhone,
          });
        }
      } else {
        setActiveStep(6);
      }
      setLoading(false);
    };

    if (props.authentication) {
      loadData();
    }
  }, [props.authentication, loading]);

  const handleNext = () => {
    setActiveStep((nextStep) => nextStep + 1);
    window.history.pushState(activeStep, null, '');
    console.log("pushing", activeStep, window.history.state)
  };

  const handlePrev = () => {
    setActiveStep((previousStep) => previousStep - 1);
    window.history.pushState(activeStep, null, '');
  };

  window.history.replaceState(activeStep, null, '');


  window.onpopstate = function (event) {
    if (event.state !== null) {
      setActiveStep(event.state);
    }
  };

  const handleChangeEmergContact1 = (evt) => {
    setEmergencyContact1({ ...emergencyContact1, [evt.target.name]: evt.target.value });
  };

  const handleChangeEmergContact2 = (evt) => {
    setEmergencyContact2({ ...emergencyContact2, [evt.target.name]: evt.target.value });
  };

  const handleChangeEmergContact3 = (evt) => {
    setEmergencyContact3({ ...emergencyContact3, [evt.target.name]: evt.target.value });
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

  const handleCheckEmergContact1 = (evt) => {
    setEmergencyContactINTL1({ ...emergencyContactINTL1, [evt.target.name]: evt.target.checked });
  };

  const handleCheckEmergContact2 = (evt) => {
    setEmergencyContactINTL2({ ...emergencyContactINTL2, [evt.target.name]: evt.target.checked });
  };

  const handleCheckEmergContact3 = (evt) => {
    setEmergencyContactINTL3({ ...emergencyContactINTL3, [evt.target.name]: evt.target.checked });
  };

  const handleCheckPersonalPhone = (evt) => {
    setPersonalPhone({ ...personalPhone, [evt.target.name]: evt.target.checked });
  };

  const handleCheckDemographic = (evt) => {
    setDemographic({ ...demographic, [evt.target.name]: evt.target.checked });
  };

  function formatDemographic(data) {
    let formattedData = {
      Ethnicity: parseInt(data.ethnicity),
      Race: '',
    };
    if (data.none) {
      formattedData.Race = '3';
    } else {
      if (data.nativeAmerican) {
        formattedData.Race += '4,';
      }
      if (data.asian) {
        formattedData.Race += '5,';
      }
      if (data.black) {
        formattedData.Race += '6,';
      }
      if (data.hawaiian) {
        formattedData.Race += '7,';
      }
      if (data.white) {
        formattedData.Race += '8,';
      }
    }
    return formattedData;
  }

  const handleSubmit = () => {
    checkInService.submitContact(emergencyContact1);
    checkInService.submitContact(emergencyContact2);
    checkInService.submitContact(emergencyContact3);
    checkInService.submitPhone(personalPhone);
    checkInService.submitDemographic(formatDemographic(demographic));
    //checkInService.markCompleted(basicInfo.ID);
    setActiveStep(6);
  };

  let content;

  if (loading === true) {
    content = <GordonLoader />;
  } else if (!props.authentication) {
    content = <GordonUnauthorized feature={'Academic Checkin'} />;
  } else {
    content = (
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={9} lg={6}>
          <Card className="academicCheckIn">
            <CardHeader title="Academic Check In" className="checkIn-header" padding={30} />
            <Box m={2}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
                spacing={1}
              >
                <Grid item>
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                      {window.history.state === 0 && (
                        <AcademicCheckInWelcome
                          basicInfo={basicInfo}
                          hasMajorHold={hasMajorHold}
                          holds={holds}
                        />
                      )}

                      {window.history.state === 1 && (
                        <EmergencyContactUpdate
                          emergencyContact1={emergencyContact1}
                          emergencyContact2={emergencyContact2}
                          emergencyContact3={emergencyContact3}
                          emergencyContactINTL1={emergencyContactINTL1}
                          emergencyContactINTL2={emergencyContactINTL2}
                          emergencyContactINTL3={emergencyContactINTL3}
                          handleChangeEmergContact1={handleChangeEmergContact1}
                          handleChangeEmergContact2={handleChangeEmergContact2}
                          handleChangeEmergContact3={handleChangeEmergContact3}
                          handleCheckEmergContact1={handleCheckEmergContact1}
                          handleCheckEmergContact2={handleCheckEmergContact2}
                          handleCheckEmergContact3={handleCheckEmergContact3}
                        />
                      )}

                      {window.history.state === 2 && (
                        <UpdatePhone
                          personalPhone={personalPhone}
                          handleChangePersonalPhone={handleChangePersonalPhone}
                          handleCheckPersonalPhone={handleCheckPersonalPhone}
                        />
                      )}

                      {window.history.state === 3 && (
                        <PrivacyAgreement
                          privacyAgreements={privacyAgreements}
                          handleCheckPrivacyAgreements={handleCheckPrivacyAgreements}
                        />
                      )}

                      {window.history.state === 4 && (
                        <RaceEthnicity
                          demographic={demographic}
                          handleChangeDemographic={handleChangeDemographic}
                          handleCheckDemographic={handleCheckDemographic}
                        />
                      )}
                      {window.history.state === 5 && (
                        <ConfirmCheckIn
                          emergencyContact1={emergencyContact1}
                          emergencyContact2={emergencyContact2}
                          emergencyContact3={emergencyContact3}
                          personalPhone={personalPhone}
                          demographic={demographic}
                        />
                      )}
                      {window.history.state === 6 && <CompletedCheckIn basicInfo={basicInfo} />}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <br />
                </Grid>
                <Grid item>
                  <Grid container justifyContent="center" className="button-container" spacing={2}>
                    <Grid item>
                      <Button
                        style={
                          activeStep === 0 || activeStep === steps.length - 1
                            ? { display: 'none' }
                            : {}
                        }
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
                        style={activeStep >= steps.length - 2 ? { display: 'none' } : {}}
                        disabled={
                          (activeStep === 0 && hasMajorHold) ||
                          (activeStep === 1 &&
                            (emergencyContact1.firstname === '' ||
                              emergencyContact1.lastname === '' ||
                              emergencyContact1.relationship === '' ||
                              emergencyContact1.HomePhone === '' ||
                              emergencyContact1.MobilePhone === '')) ||
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
                              demographic.black ||
                              demographic.hawaiian ||
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
                        style={activeStep === steps.length - 2 ? {} : { display: 'none' }}
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
