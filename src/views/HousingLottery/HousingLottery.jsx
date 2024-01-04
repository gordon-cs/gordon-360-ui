import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import housingService from 'services/housing';
import styles from './HousingLottery.module.css';
import ApplicantList from './components/StudentApplication/components/ApplicantList';
import Agreements from './components/StudentApplication/components/Agreements';


const HousingLottery = () => {
  const [rank, setRank] = useState('');
  const [hall, setHall] = useState('');
  const [canEditApplication, setCanEditApplication] = useState(false);
  const [agreements, setAgreements] = useState(false); // Represents the state of the agreements card. True if all checkboxes checked, false otherwise
  const [deleting, setDeleting] = useState(false);



  const handleRank = (event) => {
    setRank(event.target.value);
  };

  const handleHall = (event) => {
    setHall(event.target.value);
  };

  const handleClick = async () => {
    await housingService.addHall(rank, hall);
  };

  const searchHallTitle = <div align="left">Preferred Halls</div>;
  // const searchStudentTitle = <div align="left">Student Applicants</div>;

  return (
    // <div>
    //   <Input onChange={handleChange} />
    //   <button onClick={handleClick}>Submit</button>
    // </div>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} lg={5}>
        <Card>
          <CardHeader title={searchHallTitle} className="gc360_header" />
          <CardContent height="500">
            <Grid container spacing={5}>
              <Grid item xs={3}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Rank"
                  onChange={handleRank}
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Hall"
                  onChange={handleHall}
                  fullWidth
                />
              </Grid>
              <Grid>
                <Button 
                  variant="contained"
                  className={styles.submit_button}
                  onClick={handleClick}
                  >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={5}>
        <ApplicantList/>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Agreements
          deleting={deleting}
          onChange={(newState) => setAgreements(newState)}
        />
      </Grid> 
    </Grid>
  );
};

export default HousingLottery;


//
//
//
//
// Testing nb.1
//
//
//
//
//
//


// import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
// import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
// import housingService from 'services/housing';
// import styles from './HousingLottery.module.css';
// import ApplicantList from './components/StudentApplication/components/ApplicantList/index.jsx';

// /**
//  * 
//  * @param {StudentProfileInfo} props.userProfile The student profile info of the current user
//  * @returns 
//  */
// const HousingLottery = ({ userProfile }) => {
//   console.log('userProfile', userProfile);

//   const BLANK_APPLICATION_DETAILS = {
//     ApplicationID: null,
//     DateSubmitted: null,
//     DateModified: null,
//     EditorProfile: null,
//     Applicants: [],
//     ApartmentChoices: [],
//   };

//   const [loading, setLoading] = useState(true);
//   const [rank, setRank] = useState('');
//   const [hall, setHall] = useState('');
//   const [canEditApplication, setCanEditApplication] = useState(false);
//   const [applicationDetails, setApplicationDetails] = useState(BLANK_APPLICATION_DETAILS);
  
//   const handleChangeEditor = (profile) => {
//     if (canEditApplication && profile) {
//       if (
//         applicationDetails.Applicants.some(
//           (applicant) => applicant.Profile.AD_Username === profile.AD_Username,
//         )
//       ) {
//         setNewEditorProfile(profile);

//         let insertText = '';
//         if (profile.fullName) {
//           insertText = ` to ${profile.fullName}`;
//         } else if (profile?.FirstName && profile?.LastName) {
//           insertText = ` to ${profile.FirstName} ${profile.LastName}`;
//         }
//         const dialogText = (
//           <span>
//             You are about to change the editor{insertText}.
//             <br />
//             If you change the application editor, you will no longer be able to edit this
//             application yourself. All unsaved changes will be saved automatically.
//             <br />
//             Are you sure you want to change the application editor?
//           </span>
//         );
//         createDialog(DIALOG_PROPS.changeEditor, dialogText);
//       }
//     }
//   };
  

//   useEffect(
//     () =>
//       setCanEditApplication(
//         userProfile?.AD_Username === applicationDetails?.EditorProfile?.AD_Username ?? false,
//       ),
//     [applicationDetails?.EditorProfile?.AD_Username, userProfile?.AD_Username],
//   );

//   useEffect(
//     () =>
//       setCanEditApplication(
//         userProfile?.AD_Username === applicationDetails?.EditorProfile?.AD_Username ?? false,
//       ),
//     [applicationDetails?.EditorProfile?.AD_Username, userProfile?.AD_Username],
//   );

//   const loadApplication = useCallback(async () => {
//     const initializeNewApplication = () => {
//       const initialApplicants = [
//         { Profile: userProfile, Username: userProfile.AD_Username, OffCampusProgram: '' },
//       ];
//       setApplicationDetails({
//         ...BLANK_APPLICATION_DETAILS,
//         EditorProfile: userProfile,
//         Gender: userProfile.Gender,
//         Applicants: initialApplicants,
//       });
//       setUnsavedChanges(true);
//     };

//     let result = false;
//     try {
//       // Check if the current user is on an application. Returns the application ID number if found
//       const newApplicationID = await housing.getCurrentApplicationID();
//       if (newApplicationID > 0) {
//         setApplicationExists(true);
//         const newApplicationDetails = await housing.getApartmentApplication(newApplicationID);
//         setApplicationDetails(newApplicationDetails);
//         setUnsavedChanges(false);
//         result = true;
//       } else {
//         throw createError(new Error('Invalid application ID'), { status: 404 });
//       }
//     } catch (e) {
//       if (e instanceof NotFoundError) {
//         initializeNewApplication();
//       } else if (e instanceof AuthError) {
//         const debugMessage =
//           'Received a 401 (Unauthorized) response, which should not be possible in this case. Please try refreshing the page, or contact CTS for support.';
//         console.error(`Debug Message: ${debugMessage}`);
//         createSnackbar(debugMessage, 'error');
//       } else {
//         throw e;
//       }
//     } finally {
//       setNewEditorProfile(null);
//       return result;
//     }
//   }, [userProfile]);

//   useEffect(() => {
//     setLoading(true);
//     loadApplication();
//     setLoading(false);
//   }, [userProfile, loadApplication]);

//   const addApplicant = async (newApplicantUsername) => {
//     try {
//       // Get the profile of the selected user
//       const newApplicantProfile = await user.getProfileInfo(newApplicantUsername);
//       let newApplicantObject = {
//         ApplicationID: applicationDetails.ApplicationID,
//         Profile: newApplicantProfile,
//         Username: newApplicantUsername, // Used for convenient array sorting.
//         OffCampusProgram: '',
//       };

//       if (
//         applicationDetails.Applicants.some(
//           (applicant) => applicant.Profile.AD_Username === newApplicantUsername,
//         )
//       ) {
//         // Display an error if the selected user is already in the list
//         createSnackbar(`${newApplicantProfile.fullName} is already in the list.`, 'info');
//       } else {
//         const validApplicant = await isApplicantValid(newApplicantObject);
//         // Any relevant errors and snackbar messages are handled by `isApplicantValid()` internally
//         if (validApplicant) {
//           // Add the profile object to the list of applicants
//           setApplicationDetails((prevApplicationDetails) => ({
//             ...prevApplicationDetails,
//             Applicants: [...prevApplicationDetails.Applicants, newApplicantObject],
//           }));
//           setUnsavedChanges(true);
//         }
//       }
//     } catch (error) {
//       createSnackbar(
//         'Something went wrong while trying to add this person. Please try again.',
//         'error',
//       );
//       console.log(error);
//     }
//   };
  
  
//   const handleRank = (event) => {
//     setRank(event.target.value);
//   };

//   const handleHall = (event) => {
//     setHall(event.target.value);
//   };

//   const handleClick = async () => {
//     await housingService.addHall(rank, hall);
//   };

//   const searchHallTitle = <div align="left">Preferred Halls</div>;
//   // const searchStudentTitle = <div align="left">Student Applicants</div>;

//   return (
//     // <div>
//     //   <Input onChange={handleChange} />
//     //   <button onClick={handleClick}>Submit</button>
//     // </div>
//     <Grid container spacing={2} justifyContent="center">
//       <Grid item xs={12} lg={5}>
//         <Card>
//           <CardHeader title={searchHallTitle} className="gc360_header" />
//           <CardContent height="500">
//             <Grid container spacing={5}>
//               <Grid item xs={3}>
//                 <TextField
//                   id="standard-basic"
//                   variant="standard"
//                   label="Rank"
//                   onChange={handleRank}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={8}>
//                 <TextField
//                   id="standard-basic"
//                   variant="standard"
//                   label="Hall"
//                   onChange={handleHall}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid>
//                 <Button 
//                   variant="contained"
//                   className={styles.submit_button}
//                   onClick={handleClick}
//                   >
//                   Submit
//                 </Button>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Grid>
//       <Grid item xs={12} lg={5}>
//       <ApplicantList
//         disabled={
//           !canEditApplication ||
//           applicationDetails.Applicants?.length > MAX_NUM_APPLICANTS
//         }
//         editorProfile={applicationDetails.EditorProfile}
//         applicants={applicationDetails.Applicants ?? []}
//         onSearchSubmit={(searchSelection) =>
//           searchSelection && addApplicant(searchSelection)
//         }
//         onChangeEditor={handleChangeEditor}
//         onApplicantRemove={handleApplicantRemove}
//       />
//       </Grid>
//     </Grid>
//   );
// };

// export default HousingLottery;
