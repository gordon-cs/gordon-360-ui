import { Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import ApplicantFields from './ApplicantFields';
import styles from '../../HousingLottery.module.css';
import { useEffect } from 'react';
import user from '../../../../services/user';

const StudentApplicants = ({ setStudentApplicantResult }) => {
  const [applicants, setApplicants] = useState([]);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        // Assuming that 'user.getProfileInfo' is a function that returns the current user's profile
        const profile = await user.getProfileInfo();
        // Now we have the user's profile, set the first applicant's data
        const initialApplicants = [
          { firstName: profile.FirstName, lastName: profile.LastName, email: profile.Email },
          { firstName: '', lastName: '', email: '' },
          { firstName: '', lastName: '', email: '' },
          { firstName: '', lastName: '', email: '' },
        ];
        setApplicants(initialApplicants);
        // Set the emails for the applicant result
        setEmails(initialApplicants.map((a) => a.email));
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    loadCurrentUser();
  }, []);

  const handleApplicantChange = (index, updatedApplicant) => {
    const newApplicants = [...applicants];
    newApplicants[index] = updatedApplicant;
    setApplicants(newApplicants);

    const newEmails = [...emails];
    newEmails[index] = updatedApplicant.email;
    setEmails(newEmails);
    setStudentApplicantResult(newEmails);
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
              {index < applicants.length - 1 && <Divider />}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentApplicants;
