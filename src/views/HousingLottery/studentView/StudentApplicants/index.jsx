import { Button, Card, CardContent, CardHeader, Divider, Grid, List, TextField } from '@mui/material';
import { useState } from 'react';
import ApplicantFields from './ApplicantFields';
import styles from './studentApplicants.module.css';
import { useEffect } from 'react';
import user from '../../../../services/user';

const StudentApplicants = ({ setStudentApplicantResult }) => {
  const [applicants, setApplicants] = useState([]);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const profile = await user.getProfileInfo();
        const initialApplicants = [
          { firstName: profile.FirstName, lastName: profile.LastName, email: profile.Email },
          { firstName: '', lastName: '', email: '' },
          { firstName: '', lastName: '', email: '' },
          { firstName: '', lastName: '', email: '' },
        ];
        setApplicants(initialApplicants);
        setEmails(initialApplicants.map((a) => a.email));
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    loadCurrentUser();
  }, []);

  const handleApplicantChange = (index, updatedApplicant) => {
    setApplicants(currentApplicants => {
      const newApplicants = currentApplicants.with(index, updatedApplicant);
      
      setStudentApplicantResult(newApplicants.map(a => a.email));
      return newApplicants;
    });
  };

  return (
    <Card>
      <CardHeader title="Student Applicants" className={styles.applicants_card_header} />
      <CardContent>
        <List container justifyContent="space-between" spacing={2}>
          {applicants.map((applicant, index) => (
            <List item xs={12} key={index}>
              <div className={styles.applicant_field}>
                <ApplicantFields
                  applicant={applicant}
                  onApplicantChange={handleApplicantChange}
                  index={index}
                />
              </div>
              {index < applicants.length - 1 && <Divider />}
            </List>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default StudentApplicants;
