import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import housingService from 'services/housing';
import styles from './HousingLottery.module.css';
import ApplicantList from './components/StudentApplication/components/ApplicantList/index.jsx';
import InstructionsCard from './components/StudentApplication/components/InstructionsCard/index.jsx';


const HousingLottery = () => {
  const [rank, setRank] = useState('');
  const [hall, setHall] = useState('');


  const handleRank = (event) => {
    setRank(event.target.value);
  };

  const handleHall = (event) => {
    setHall(event.target.value);
  };

  const handleClick = async () => {
    await housingService.addHall(rank, hall);
  };

  const searchHallTitle = <div align="left">Preferred Halls</div>;
  // const searchStudentTitle = <div align="left">Student Applicants</div>;

  return (
    // <div>
    //   <Input onChange={handleChange} />
    //   <button onClick={handleClick}>Submit</button>
    // </div>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} lg={5}>
        <Card>
          <CardHeader title={searchHallTitle} className="gc360_header" />
          <CardContent height="500">
            <Grid container spacing={5}>
              <Grid item xs={3}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Rank"
                  onChange={handleRank}
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Hall"
                  onChange={handleHall}
                  fullWidth
                />
              </Grid>
              <Grid>
                <Button 
                  variant="contained"
                  className={styles.submit_button}
                  onClick={handleClick}
                  >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={5}>
        <ApplicantList/>
      </Grid>
      <Grid item xs={12} lg={6}>
        <InstructionsCard/>
      </Grid>
    </Grid>
  );
};

export default HousingLottery;
