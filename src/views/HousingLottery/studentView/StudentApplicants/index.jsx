import { Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import ApplicantFields from './ApplicantFields';
import styles from '../../HousingLottery.module.css';

const StudentApplicants = () => {
  const initialApplicants = [
    { firstName: '', lastName: '', email: '' },
    { firstName: '', lastName: '', email: '' },
    { firstName: '', lastName: '', email: '' },
    { firstName: '', lastName: '', email: '' }
  ];

  const [applicants, setApplicants] = useState(initialApplicants);
  const [emails, setEmails] = useState(initialApplicants.map(applicant => applicant.email));

  const handleApplicantChange = (index, updatedApplicant) => {
    const newApplicants = [...applicants];
    newApplicants[index] = updatedApplicant;
    setApplicants(newApplicants);

    const newEmails = [...emails];
    newEmails[index] = updatedApplicant.email;
    setEmails(newEmails);
  };

  //   We will be having set number of applicants for the MVP and for now.
  // const addApplicant = () => {
  //   setApplicants([...applicants, { firstName: '', lastName: '', email: '' }]);
  //   setEmails([...emails, '']);
  // };

  const handleSubmit = () => {
    console.log(emails);
  };

  return (
    <Card>
      <CardHeader title="Student Applicants" className={styles.applicants_card_header} />
      <CardContent>
        <Grid container justifyContent="space-between" spacing={2}>
          {applicants.map((applicant, index) => (
            <Grid item xs={12} key={index}>
              <div className={styles.applicant_field}>
                <ApplicantFields
                  applicant={applicant}
                  onApplicantChange={handleApplicantChange}
                  index={index}
                />
              </div>
              <Divider/>
            </Grid>
          ))}
          <Grid item xs={12} container justifyContent="flex-end" style={{ marginTop: 'auto' }}>
            {/* <Button
              style={{ marginRight:20}}
              variant="outlined"
              color="primary"
              startIcon={<AddIcon fontSize="inherit" />}
              onClick={addApplicant}
            >
              Add Applicant
            </Button> */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentApplicants;
