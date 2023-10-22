import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import housingService from 'services/housing';
import styles from './HousingLottery.module.css';

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

  return (
    // <div>
    //   <Input onChange={handleChange} />
    //   <button onClick={handleClick}>Submit</button>
    // </div>
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={6}>
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
              <Grid item xs={6}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Hall"
                  onChange={handleHall}
                  fullWidth
                />
              </Grid>
              <Button variant="contained" className={styles.submit_button} onClick={handleClick}>
                Submit
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HousingLottery;
