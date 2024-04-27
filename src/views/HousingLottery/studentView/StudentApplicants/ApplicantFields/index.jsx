import { TextField } from '@mui/material';
import styles from './applicantFields.module.css';

const ApplicantFields = ({ applicant, onApplicantChange, index }) => {
  const handleFieldChange = (field, value) => {
    onApplicantChange(index, { ...applicant, [field]: value });
  };

  return (
    <>
      <TextField
        type="email"
        variant='outlined'
        color='secondary'
        label="Email"
        onChange={(e) => handleFieldChange('email', e.target.value)}
        value={applicant.email}
        required
        error={applicant.email !== '' && !applicant.email.endsWith('@gordon.edu')}
        helperText={applicant.email === '' || applicant.email.endsWith('@gordon.edu') ? '' : 'Not a Valid Gordon Email'}
        className={styles.applicant_email}
        disabled={index === 0}
        
      />
    </>
  );
};

export default ApplicantFields;

