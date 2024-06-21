//import memberships from involvements to autofill club field

//call this file from individual involvement as well as main poster page

//form needs fields:
//autofill uploaders name - potentially club leader title
//uploading club
//upload date
//expiration date
//filters? tags? ministry etc.
//Visibility?
//student life approval?

//make calls to club service filling in club code appropriately

/*https://www.gordon.edu/studenthandbook/collegeevents#:~:text=Any%20individual%20or%20group%20desiring,and%2For%20the%20Design%20Center.*/
//import Form from '../Form';

import { useState, useEffect, useMemo } from 'react';
import Form from 'views/RecIM/components/Forms/Form';
// const UploadPosterForm = ({
//     poster,
//     onClose,
//     createSnackbar,
//     openPosterForm,
//     setOpenPosterForm,
//     setCreatedInstance,
// }) =>  {

//     const [loading, setLoading] = useState(true);
//     const [isSaving, setSaving] = useState(false);
//     const [posterTypes, setPosterTypes] = useState([]);
//     const [posterStatusTypes, setPosterStatusTypes] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//           setLoading(true);
//         //   await Promise.all([
//         //     // getAllSports().then(setSports),
//         //     // getActivityTypes().then(setActivityTypes),
//         //     // getActivityStatusTypes().then(setActivityStatusTypes),
//         //   ]);
//           setLoading(false);
//         };
//         fetchData();
//       }, []);

//     const posterFields = [
//         {
//             label: 'Title',
//             name: 'title',
//             type: 'text',
//             required: true,
//             helperText: '*Required',
//         },
//         {
//             label: 'Date Start',
//             name: 'startDate',
//             type: 'datetime',
//             required: false,
//             helperText: '*Required',
//           },
//           {
//             label: 'Date End',
//             name: 'endDate',
//             type: 'datetime',
//             required: false,
//             helperText: '',
//           },
//         //   {
//         //     label: 'Event Type',
//         //     name: 'typeID',
//         //     type: 'select',
//         //     menuItems: activityTypes.map((type) => type.Description),
//         //     required: true,
//         //     helperText: '*Required',
//         //   },
//         //handle image here
//     ];

//     // if (poster){
//     //     posterFields.push(
//     //         {
//     //             label:
//     //         }
//     //     )
//     // };
//     const currentInfo = useMemo(() => {
//         if (poster) {
//           return {
//             name: poster.Name,
//             startDate: poster.StartDate,
//             endDate: poster.EndDate,
//           };
//         }
//         return {
//           name: '',
//           startDate: null,
//           endDate: null,
//         };
//       }, [poster]);

//       const handleConfirm = () => {
//         return(null);
//       };
//     return(
//         <Form
//         formTitles={{ name: 'Poster', formType: poster ? 'Edit' : 'Create' }}
//         fields={[posterFields]}
//         currentInfo={currentInfo}
//         loading={loading}
//         isSaving={null}
//         setOpenForm={setOpenPosterForm}
//         openForm={openPosterForm}
//         handleConfirm={handleConfirm}
//       />
//     );
// };

// export default UploadPosterForm;

const UploadPosterForm = ({ name }) => {
  // const posterFields =[
  //   {
  //     label: 'Name',
  //     name: 'name',
  //     type: 'text',
  //     required: true,
  //     helperText: '*Required',
  //   },
  // ]

  const handleConfirm = () => {
    console.log('hnadle clodse');
  };

  return (
    <Form
      formTitles={{ name: 'Poster' }}
      fields={[null]}
      currentInfo={null}
      loading={false}
      isSaving={false}
      setOpenForm={true}
      openForm={true}
      handleConfirm={handleConfirm}
    />
  );
};
export default UploadPosterForm;
