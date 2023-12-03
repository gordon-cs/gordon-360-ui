import { Button, Grid } from '@mui/material';
import housingService from 'services/housing';
import styles from '../HousingLottery.module.css';

const AdminView = () => {
  const handleClick = async () => {
    const preference = await housingService.getAllPreference();
    const preferredHall = await housingService.getAllPreferredHall();
    const applicant = await housingService.getAllApplicant();
    const schoolYear = await housingService.getAllSchoolYear();
    console.log('preference' + preference);
    console.log('preferredHall' + preferredHall);
    console.log('applicant' + applicant);
    console.log('schoolYear' + schoolYear);
  };

  return (
    <Button className={styles.submit_button} variant="contained" onClick={handleClick}>
      Json Array
    </Button>
  );
};

export default AdminView;
