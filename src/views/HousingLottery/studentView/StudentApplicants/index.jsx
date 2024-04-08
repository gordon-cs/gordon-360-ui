import { Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import ApplicantFields from './ApplicantFields';
import styles from './studentApplicants.module.css';
import { useEffect } from 'react';
import user from '../../../../services/user';
import housing from '../../../../services/housing';

const StudentApplicants = ({ setStudentApplicantResult }) => {
  const [applicants, setApplicants] = useState([]);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const loadApplicants = async () => {
      try {
        const profile = await user.getProfileInfo();
        const storedRoommatesData = await housing.getUserRoommate();
        const roommateEmails = storedRoommatesData
          .map((data) => data.Applicant1)
          .filter((email) => email !== profile.Email)
          .reverse();
        const initialApplicants = [{ email: profile.Email }];
        roommateEmails.forEach((email) => {
          initialApplicants.push({ email });
        });
        while (initialApplicants.length < 4) {
          initialApplicants.push({ email: '' });
        }
        setApplicants(initialApplicants);
        setEmails(initialApplicants.map((applicant) => applicant.email));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    loadApplicants();
  }, []);

  const handleApplicantChange = (index, email) => {
    setApplicants((currentApplicants) => {
      const newApplicants = currentApplicants.map((applicant, idx) =>
        idx === index ? { ...applicant, email: email } : applicant,
      );
      setStudentApplicantResult(newApplicants.map((a) => a.email));
      return newApplicants;
    });
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
