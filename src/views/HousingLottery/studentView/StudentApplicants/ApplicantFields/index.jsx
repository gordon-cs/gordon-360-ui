import { TextField } from '@mui/material';
import styles from '../../../HousingLottery.module.css';

const ApplicantFields = ({ applicant, onApplicantChange, index }) => {
  const domain = '@gordon.edu';
  const placeholder = index === 0 ? '' : 'firstname.lastname';

  const handleFieldChange = (e) => {
    onApplicantChange(index, { ...applicant, email: e.target.value });
  };

  const handleBlur = (e) => {
    const value = e.target.value;
    if (value && !value.includes('@')) {
      onApplicantChange(index, { ...applicant, email: value + domain });
    }
  };

  const disabled = index === 0;
  const disabledClass = disabled ? styles.applicant_disabled : '';
  const displayPlaceholder = !applicant.email && index !== 0;

  return (
    <>
      <TextField
        type="email"
        variant="outlined"
        color="secondary"
        label="Email"
        onBlur={handleBlur}
        onChange={handleFieldChange}
        value={applicant.email}
        placeholder={displayPlaceholder ? placeholder : ''}
        className={`${styles.applicant_email} ${disabledClass}`}
        disabled={disabled}
        required
        InputProps={{
          style: { color: displayPlaceholder ? '#aaa' : 'black' }, // Placeholder color
          endAdornment: displayPlaceholder && <span style={{ color: '#aaa' }}>{domain}</span>,
        }}
        error={applicant.email !== '' && !applicant.email.endsWith('@gordon.edu')}
        helperText={
          applicant.email === '' || applicant.email.endsWith('@gordon.edu')
            ? ''
            : 'Not a Valid Gordon Email'
        }
      />
    </>
  );
};

export default ApplicantFields;
