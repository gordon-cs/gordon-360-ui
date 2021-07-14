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
    makePrivate: false,
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

  /** Formats a number for display
  *   @param {string} phoneNum - the unformatted phone number
  *   @returns {string} - the formatted phone number
  */
  function formatNumber(phoneNum){
    let a, b, c;
    a = phoneNum.slice(0, 2);
    b = phoneNum.slice(3, 5);
    c = phoneNum.slice(6,);
    return ("(" + a + ")" + b + "-" + c);
  }

  useEffect(() => {
    const loadData = async () => {
      let profile = await user.getProfileInfo();
      setBasicInfo({
        studentFirstName: profile.FirstName,
        studentLastName: profile.LastName,
      });
      let contacts = await checkInService.getEmergencyContacts(
        profile.AD_Username.toLowerCase(),
      );

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

      setPersonalPhone({
        personalPhone: profile.MobilePhone,
      });
      setLoading(false);
    };

    if (authentication) {
      loadData();
    }

  }, [authentication, loading]);

  const handleNext = () => {
    setActiveStep((nextStep) => nextStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((previousStep) => previousStep - 1);
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

  const handleSubmit = () => {
    console.log(`Done 🧙‍♂️`);
    checkInService.submitContact(emergencyContact1);
    checkInService.submitContact(emergencyContact2);
    checkInService.submitContact(emergencyContact3);
    checkInService.submitPhone(personalPhone);
  };

  let content;
  if (loading === true) {
    content = <GordonLoader />;
  } else if (!authentication) {
    content = <GordonUnauthorized feature={'Academic Checkin'} />;
  } else {
    content = (
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={9} lg={6}>
          <Card className="academicCheckIn">
            <CardHeader title="Academic Check In" className="checkIn-header" padding={30} />
            <Box m={2}>
              <Grid container justifyContent="center" alignItems="center" direction="column" spacing={1}>
                <Grid item>
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                      {activeStep === 0 && (
                        <AcademicCheckInWelcome basicInfo={basicInfo} holds={holds} />
                      )}

                      {activeStep === 1 && (
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
                          emergencyContact1={emergencyContact1}
                          emergencyContact2={emergencyContact2}
                          emergencyContact3={emergencyContact3}
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
                  <Grid container justifyContent="center" className="button-container" spacing={2}>
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
