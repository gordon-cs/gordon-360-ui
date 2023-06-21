import { Box, Button, Card, CardHeader, Grid } from '@mui/material';
import GordonUnauthenticated from 'components/GordonUnauthenticated';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import checkInService from 'services/checkIn';
import EmergencyContactUpdate from 'views/EnrollmentCheckIn/components/EmergencyContactUpdate';
import EnrollmentCheckInWelcome from 'views/EnrollmentCheckIn/components/EnrollmentCheckInWelcome';
import UpdatePhone from 'views/EnrollmentCheckIn/components/UpdatePhone';
import CompletedCheckIn from './components/CompletedCheckIn';
import ConfirmCheckIn from './components/ConfirmCheckIn';
import PrivacyAgreement from './components/PrivacyAgreement';
// import RaceEthnicity from './components/RaceEthnicity';
import styles from './EnrollmentCheckIn.module.css';

const steps = [
  'Main Form',
  'Emergency Contact',
  'Update Phone',
  'Privacy Terms',
  // 'Race Question',
  'Confirm',
  'Completed Check In',
];

const EnrollmentCheckIn = (props) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { profile, loading: loadingProfile } = useUser();

  const [loading, setLoading] = useState(true);

  const [emergencyContact1, setEmergencyContact1] = useState({
    SEQ_NUMBER: 1,
    FirstName: '',
    LastName: '',
    Relationship: '',
    HomePhone: '',
    MobilePhone: '',
  });

  const [emergencyContact2, setEmergencyContact2] = useState({
    SEQ_NUMBER: 2,
    FirstName: '',
    LastName: '',
    Relationship: '',
    HomePhone: '',
    MobilePhone: '',
  });

  const [emergencyContact3, setEmergencyContact3] = useState({
    SEQ_NUMBER: 3,
    FirstName: '',
    LastName: '',
    Relationship: '',
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

  const [phoneInfo, setPhoneInfo] = useState({
    PersonalPhone: '',
    MakePrivate: false,
    NoPhone: false,
  });

  const [privacyAgreements, setPrivacyAgreements] = useState({
    FERPA: false,
    dataUsage: false,
    photoConsent: false,
  });

  // const [demographic, setDemographic] = useState({
  //   Ethnicity: -3,
  //   NativeAmerican: false,
  //   Asian: false,
  //   Black: false,
  //   Hawaiian: false,
  //   White: false,
  //   None: false,
  // });

  useEffect(() => {
    const loadData = async () => {
      if (profile) {
        let hasCheckedIn = await checkInService.getStatus();
        if (!hasCheckedIn && profile.PersonType.includes('stu')) {
          let tempHolds = await checkInService.getHolds();
          setHolds(tempHolds);
          setMajorHold(
            tempHolds?.RegistrarHold ||
              tempHolds?.HighSchoolTranscriptHold ||
              tempHolds?.FinancialHold ||
              tempHolds?.MedicalHold ||
              tempHolds?.MajorHold,
          );

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
          if (profile.MobilePhone) {
            setPhoneInfo({
              PersonalPhone: profile.MobilePhone,
              MakePrivate: Boolean(profile.IsMobilePhonePrivate),
              NoPhone: false,
            });
          }
        } else {
          setActiveStep(5);
        }
      }
      // We only want to stop loading now if the profile has already been loaded.
      setLoading(loadingProfile);
    };
    loadData();
  }, [profile, loadingProfile]);

  useEffect(() => {
    navigate('/enrollmentcheckin', { replace: true, state: { step: activeStep } });
  }, [activeStep, navigate]);

  const handleNext = () => {
    navigate('/enrollmentcheckin', { state: { step: activeStep } });
    setActiveStep((nextStep) => nextStep + 1);
  };

  const handlePrev = () => {
    navigate('/enrollmentcheckin', { state: { step: activeStep } });
    setActiveStep((previousStep) => previousStep - 1);
  };

  window.onpopstate = function (event) {
    if (event.state !== null) {
      setActiveStep(event.state.state.step);
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

  const handleChangePhoneInfo = (evt) => {
    setPhoneInfo({ ...phoneInfo, [evt.target.name]: evt.target.value });
  };

  // const handleChangeDemographic = (evt) => {
  //   setDemographic({ ...demographic, [evt.target.name]: evt.target.value });
  // };

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

  const handleCheckPhoneInfo = (evt) => {
    setPhoneInfo({ ...phoneInfo, [evt.target.name]: evt.target.checked });
  };

  // const handleCheckDemographic = (evt) => {
  //   setDemographic({ ...demographic, [evt.target.name]: evt.target.checked });
  // };

  // function formatDemographic(data) {
  //   let formattedData = {
  //     Ethnicity: data.Ethnicity,
  //     Race: '',
  //   };
  //   if (data.None) {
  //     formattedData.Race = '3';
  //   } else {
  //     if (data.NativeAmerican) {
  //       formattedData.Race += '4,';
  //     }
  //     if (data.Asian) {
  //       formattedData.Race += '5,';
  //     }
  //     if (data.Black) {
  //       formattedData.Race += '6,';
  //     }
  //     if (data.Hawaiian) {
  //       formattedData.Race += '7,';
  //     }
  //     if (data.White) {
  //       formattedData.Race += '8,';
  //     }
  //   }
  //   return formattedData;
  // }

  const handleSubmit = () => {
    checkInService.submitContact(emergencyContact1);
    checkInService.submitContact(emergencyContact2);
    checkInService.submitContact(emergencyContact3);
    checkInService.submitPhone(phoneInfo);
    // checkInService.submitDemographic(formatDemographic(demographic));
    checkInService.markCompleted(profile.ID);
    setActiveStep(5);
  };

  if (loading || loadingProfile) {
    return <GordonLoader />;
  } else if (!profile) {
    return <GordonUnauthenticated feature={'Enrollment Check-in'} />;
  } else {
    return (
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={9} lg={6}>
          <Card className={styles.enrollmentCheckIn}>
            <CardHeader
              title="Enrollment Check In"
              className={styles.checkIn_header}
              padding={30}
            />
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
                      {activeStep === 0 && (
                        <EnrollmentCheckInWelcome hasMajorHold={hasMajorHold} holds={holds} />
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
                          phoneInfo={phoneInfo}
                          handleChangePhoneInfo={handleChangePhoneInfo}
                          handleCheckPhoneInfo={handleCheckPhoneInfo}
                        />
                      )}

                      {activeStep === 3 && (
                        <PrivacyAgreement
                          privacyAgreements={privacyAgreements}
                          handleCheckPrivacyAgreements={handleCheckPrivacyAgreements}
                        />
                      )}

                      {/* {activeStep === 4 && (
                        <RaceEthnicity
                          demographic={demographic}
                          handleChangeDemographic={handleChangeDemographic}
                          handleCheckDemographic={handleCheckDemographic}
                        />
                      )} */}
                      {activeStep === 4 && (
                        <ConfirmCheckIn
                          emergencyContact1={emergencyContact1}
                          emergencyContact2={emergencyContact2}
                          emergencyContact3={emergencyContact3}
                          phoneInfo={phoneInfo}
                          // demographic={demographic}
                        />
                      )}
                      {activeStep === 5 && <CompletedCheckIn />}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <br />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    justifyContent="center"
                    className={styles.button_container}
                    spacing={2}
                  >
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
                          (activeStep === 0 && (hasMajorHold || holds?.MustRegisterForClasses)) ||
                          (activeStep === 1 &&
                            (emergencyContact1.FirstName === '' ||
                              emergencyContact1.LastName === '' ||
                              emergencyContact1.Relationship === '' ||
                              (emergencyContact1.HomePhone === '' &&
                                emergencyContact1.MobilePhone === ''))) ||
                          (activeStep === 2 &&
                            phoneInfo.PersonalPhone === '' &&
                            phoneInfo.NoPhone === false) ||
                          (activeStep === 3 &&
                            (privacyAgreements.FERPA === false ||
                              privacyAgreements.dataUsage === false ||
                              privacyAgreements.photoConsent === false))
                          // (activeStep === 4 && demographic.Ethnicity === '') ||
                          // (activeStep === 4 &&
                          //   !(
                          //     demographic.NativeAmerican ||
                          //     demographic.Asian ||
                          //     demographic.Black ||
                          //     demographic.Hawaiian ||
                          //     demographic.White ||
                          //     demographic.None
                          //   ))
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
};

export default EnrollmentCheckIn;
