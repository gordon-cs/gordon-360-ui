import { TextField } from '@mui/material';
import styles from '../../../HousingLottery.module.css';

const ApplicantFields = ({ applicant, onApplicantChange, index }) => {
  const handleFieldChange = (field, value) => {
    onApplicantChange(index, { ...applicant, [field]: value });
  };

  return (
    <>
      <TextField
        type="text"
        variant='outlined'
        color='secondary'
        label="First Name"
        onChange={(e) => handleFieldChange('firstName', e.target.value)}
        value={applicant.firstName}
        fullWidth
        required
        className={styles.applicant_name}
        helperText={'*Required'}
      />
      <TextField
        type="text"
        variant='outlined'
        color='secondary'
        label="Last Name"
        onChange={(e) => handleFieldChange('lastName', e.target.value)}
        value={applicant.lastName}
        fullWidth
        required
        className={styles.applicant_name}
        helperText={'*Required'}
      />
      <TextField
        type="email"
        variant='outlined'
        color='secondary'
        label="Email"
        onChange={(e) => handleFieldChange('email', e.target.value)}
        value={applicant.email}
        required
        error={!applicant.email.endsWith('@gordon.edu')}
        helperText={!applicant.email.endsWith('@gordon.edu') ? 'Not a Valid Gordon Email' : '*Required'}
        className={styles.applicant_email}
      />
    </>
  );
};

export default ApplicantFields;

