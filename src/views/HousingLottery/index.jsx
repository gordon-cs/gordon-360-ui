import { Card, CardContent, CardHeader, Grid, Input, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import housingService from 'services/housing';

const HousingLottery = () => {
  const [rank, setRank] = useState('');
  const [search, setSearch] = useState('');


  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleRank = (event) => {
    setRank(event.target.value);
  };
  
  // const handleClick = async () => {
  //   await housingService.addRoommate(message);
  // };

  const searchHallTitle = (
    <div align="left">
      Preferred Halls
    </div>
  );

  return (
    // <div>
    //   <Input onChange={handleChange} />
    //   <button onClick={handleClick}>Submit</button>
    // </div>
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title = {searchHallTitle} className="gc360_header"/>
          <CardContent height= "500">
            <Grid container spacing={5}>
              <Grid item xs={3}>
              <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Rank"
                  inputProps={{inputMode:'numeric'}}
                  value={search}
                  onChange={handleSearch}
                  fullWidth
              />
              </Grid>
              <Grid item xs={5}>
              <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Hall"
                  value={rank}
                  onChange={handleRank}
                  fullWidth
              />
              </Grid>
            </Grid>
          </CardContent>  
        </Card>
      </Grid>
    </Grid>
  );
};

export default HousingLottery;
