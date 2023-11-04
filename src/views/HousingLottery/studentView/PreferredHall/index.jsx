import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import HallSlot from './HallSlotComponent';
import housingService from 'services/housing';
import styles from '../../HousingLottery.module.css';

const PreferredHallsCard = () => {
  const [count, setCount] = useState(1);
  const [hallList, setHallList] = useState([]);
  const [preferredHallList, setPreferredHallList] = useState([]);
  let myPreferredHallList = [];
  const searchHallTitle = <div align="left">Preferred Halls</div>;

  useEffect(() => {
    housingService.getTraditionalHalls().then(setHallList);
  }, []);

  // useEffect(() => {
  //   setPreferredHallList(myPreferredHallList);
  // }, [myPreferredHallList]);

  // function updatePreferredHallList(rank, hall) {
  //   myPreferredHallList[rank - 1] = hall;
  //   // setPreferredHallList(myPreferredHallList);
  //   console.log("myPreferredHallList: " + myPreferredHallList)
  //   console.log("preferredHallList: " + preferredHallList)
  // }

  function updatePreferredHallList(rank, hall) {
    let newList = preferredHallList;
    console.log('newList before ' + newList);
    newList[rank - 1] = hall;
    console.log('newList after ' + newList);
    setPreferredHallList(newList);
  }

  const handleClick = async () => {
    await housingService.addHall(preferredHallList);
  };

  const hallArray = Array(count).fill(0);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title={searchHallTitle} className="gc360_header" />
          <CardContent height="500">
            <Grid id="hallSlots">
              {hallArray.map((value, index) => (
                <HallSlot rank={index + 1} hallList={hallList} func={updatePreferredHallList} />
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
