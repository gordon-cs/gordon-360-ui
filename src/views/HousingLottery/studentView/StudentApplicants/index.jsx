import { Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import ApplicantFields from './ApplicantFields';
import styles from '../../HousingLottery.module.css';


const StudentApplicants = () => {
  const [applicants, setApplicants] = useState([{ firstName: '', lastName: '', email: '' }]);
  const [emails, setEmails] = useState([]);

  const handleApplicantChange = (index, updatedApplicant) => {
    const newApplicants = [...applicants];
    newApplicants[index] = updatedApplicant;
    setApplicants(newApplicants);

    const newEmails = [...emails];
    newEmails[index] = updatedApplicant.email;
    setApplicants(newEmails);
  };

  const addApplicant = () => {
    setApplicants([...applicants, { firstName: '', lastName: '', email: '' }]);
    setEmails([...emails, '']);
  };

  const handleSubmit = () => {
    console.log(emails);
  };

  return (
    <Card>
      <CardHeader title="Student Applicants" className={styles.applicants_card_header} />
      <CardContent>
        <Grid container justifyContent="space-between" spacing={2}>
          {applicants.map((applicant, index) => (
            <Grid item xs={12} key={index} >
              <div className={styles.applicant_field} >
                <ApplicantFields
                  applicant={applicant}
                  onApplicantChange={handleApplicantChange}
                  index={index}
                />
              </div>
              <Divider/>
              <div className={styles.applicant_field} >
                <ApplicantFields
                  applicant={applicant}
                  onApplicantChange={handleApplicantChange}
                  index={index}
                />
              </div>
              <Divider/>
              <div className={styles.applicant_field} >
                <ApplicantFields
                  applicant={applicant}
                  onApplicantChange={handleApplicantChange}
                  index={index}
                />
              </div>
              <Divider/>
              <div className={styles.applicant_field} >
                <ApplicantFields
                  applicant={applicant}
                  onApplicantChange={handleApplicantChange}
                  index={index}
                />
              </div>
            </Grid>
          ))}
          <Grid 
            item xs={12} 
            container
            justifyContent="flex-end"
            alignItems="flex-end"
            style={{ marginTop: 'auto' }}
          >
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
