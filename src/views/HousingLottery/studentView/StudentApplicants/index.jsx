import { Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import ApplicantFields from './ApplicantFields';
import styles from './studentApplicants.module.css';
import { useEffect } from 'react';
import user from '../../../../services/user';
import housing from '../../../../services/housing';

const StudentApplicants = ({ setStudentApplicantResult }) => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const loadApplicants = async () => {
      try {
        const profile = await user.getProfileInfo();
        const storedRoommatesData = await housing.getUserRoommate();
        const filteredRoommateEmails = storedRoommatesData
          .filter((data) => data.Email && data.Email !== profile.Email)
          .map((data) => data.Email);
        const initialApplicants = [
          { email: profile.Email },
          ...filteredRoommateEmails.map((email) => ({ email })),
        ];
        while (initialApplicants.length < 4) {
          initialApplicants.push({ email: '' });
        }
        setApplicants(initialApplicants);
        setStudentApplicantResult(initialApplicants.map((applicant) => applicant.email));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    loadApplicants();
  }, []);

  const handleApplicantChange = (index, updatedEmail) => {
    const updatedApplicants = [...applicants];
    updatedApplicants[index] = { ...updatedApplicants[index], email: updatedEmail };
    setApplicants(updatedApplicants);
    setStudentApplicantResult(updatedApplicants.map((applicant) => applicant.email));
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
                  disabled={index === 0}
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
