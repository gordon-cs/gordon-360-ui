import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import HallSlot from './HallSlotComponent';
import housingService from 'services/housing';
import styles from '../../HousingLottery.module.css';

const PreferredHallsCard = () => {
  const [count, setCount] = useState(1);
  const [hallList, setHallList] = useState([]);
  const [preferredHallList, setPreferredHallList] = useState([]);
  const searchHallTitle = <div align="left">Preferred Halls</div>;

  useEffect(() => {
    housingService.getTraditionalHalls().then(setHallList);
  }, []);

  function updatePreferredHallList(rank, hall) {
    let newList = preferredHallList;
    newList[rank - 1] = hall;
    setPreferredHallList(newList);
    return newList;
  }

  const handleClick = async () => {
    await housingService.addHall(preferredHallList);
  };

  const hallArray = Array(count).fill(0);

  function deletePreferHall(myNum) {
    debugger;
    hallArray.splice(myNum, 1);
    console.log('deletePreferHall' + hallArray);
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title={searchHallTitle} className="gc360_header" />
          <CardContent height="500">
            <Grid id="hallSlots">
              {hallArray.map((value, index) => (
                <HallSlot
                  rank={index + 1}
                  hallList={hallList}
                  preferredHallList={preferredHallList}
                  updatePreferredHallList={updatePreferredHallList}
                  deletePreferHall={deletePreferHall}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                Add a Hall
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleClick}>
                Submit
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PreferredHallsCard;
