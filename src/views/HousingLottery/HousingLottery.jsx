import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import housingService from 'services/housing';
import styles from './HousingLottery.module.css';
import ApplicantList from './components/StudentApplication/components/ApplicantList';
import Agreements from './components/StudentApplication/components/Agreements';


const HousingLottery = () => {
  const [rank, setRank] = useState('');
  const [hall, setHall] = useState('');
  const [canEditApplication, setCanEditApplication] = useState(false);
  const [agreements, setAgreements] = useState(false); // Represents the state of the agreements card. True if all checkboxes checked, false otherwise
  const [deleting, setDeleting] = useState(false);



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

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} lg={5}>
        <Card>
          <CardHeader title={searchHallTitle} className="gc360_header" />
          <CardContent height="500">
            <Grid container spacing={5}>
              <Grid item xs={3}>
                <TextField
                  id="rank-input"
                  variant="standard"
                  label="Rank"
                  onChange={handleRank}
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="hall-input"
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
      <Grid item xs={12} lg={5}>
        <Agreements
          deleting={deleting}
          onChange={(newState) => setAgreements(newState)}
        />
      </Grid> 
    </Grid>
  );
}

export default HousingLottery;
