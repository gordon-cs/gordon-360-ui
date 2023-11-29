import { Button, Card, CardContent, CardHeader, Grid, List } from '@mui/material';
import PreferredHallsCard from './studentView/PreferredHall';
import PreferredHall from './studentView/PreferredHall';
import StudentApplicants from './studentView/StudentApplicants/index.jsx';



const HousingLottery = () => {



  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} lg={10}>
        <PreferredHall />
      </Grid>
      <Grid item xs={12} lg={5}>
        <StudentApplicants/>
      </Grid> 
    </Grid>
  );
};

export default HousingLottery;
