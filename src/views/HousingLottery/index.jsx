import { Grid } from '@mui/material';
import StudentView from './studentView';
import AdminView from './adminView';

const HousingLottery = () => {
  return (
    <Grid>
      <StudentView />
      <AdminView />
    </Grid>
  );
};

export default HousingLottery;
