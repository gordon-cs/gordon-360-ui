import { TextField } from '@mui/material';
import styles from './applicantFields.module.css';

const ApplicantFields = ({ applicant, onApplicantChange, index }) => {
  const handleFieldChange = (field, value) => {
    onApplicantChange(index, { ...applicant, [field]: value });
  };

  const disabled = index === 0;
  const disabledClass = disabled ? styles.applicant_disabled : '';

  return (
    <>
      <TextField
        type="text"
        variant="outlined"
        color="secondary"
        label="First Name"
        onChange={(e) => handleFieldChange('firstName', e.target.value)}
        value={applicant.firstName}
        fullWidth
        disabled={disabled}
        required
        className={`${styles.applicant_name} ${disabledClass}`}
      />
      <TextField
        type="text"
        variant="outlined"
        color="secondary"
        label="Last Name"
        onChange={(e) => handleFieldChange('lastName', e.target.value)}
        value={applicant.lastName}
        fullWidth
        disabled={disabled}
        required
        className={`${styles.applicant_name} ${disabledClass}`}
      />
      <TextField
        type="email"
        variant="outlined"
        color="secondary"
        label="Email"
        onChange={(e) => handleFieldChange('email', e.target.value)}
        value={applicant.email}
        disabled={disabled}
        required
        error={applicant.email !== '' && !applicant.email.endsWith('@gordon.edu')}
        helperText={
          applicant.email === '' || applicant.email.endsWith('@gordon.edu')
            ? ''
            : 'Not a Valid Gordon Email'
        }
        className={`${styles.applicant_email} ${disabledClass}`}
      />
    </>
  );
};

export default ApplicantFields;
