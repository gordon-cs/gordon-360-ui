import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  List,
  ListItem,
} from '@mui/material';
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
        <List>
          {applicants.map((applicant, index) => (
            <>
              <ListItem key={index}>
                <div className={styles.applicant_field} style={{ width: '100%' }}>
                  <ApplicantFields
                    applicant={applicant}
                    onApplicantChange={handleApplicantChange}
                    index={index}
                  />
                </div>
              </ListItem>
              {index < applicants.length - 1 && <Divider component="li" />}
            </>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default StudentApplicants;
