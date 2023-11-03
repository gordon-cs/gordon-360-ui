import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import HallSlot from './HallSlotComponent';
import housingService from 'services/housing';
import styles from '../../HousingLottery.module.css';

const PreferredHallsCard = () => {
  const [count, setCount] = useState(1);
  // let rankList = [];
  // const [preferredHallList, setPreferredHallList] = useState([]); // map or dictionary
  let preferredHallList = [];
  const searchHallTitle = <div align="left">Preferred Halls</div>;
  const [hallList, setHallList] = useState([]);

  useEffect(() => {
    housingService.getTraditionalHalls().then(setHallList);
  }, []);

  // useEffect(() => { }, [count]);

  // const addHall = () => {
  //   rankList.push(count);
  //   console.log("count: " + count + ", list: " + rankList);
  //   setCount(count + 1);
  // }

  function updatePreferredHallList(rank, hall) {
    preferredHallList[rank - 1] = hall;
  }

  const addPreferredHall = () => {
    setCount(count + 1);
    console.log(count);
    let html = `<HallSlot rank={2} hallList={hallList} func={updatePreferredHallList} />`;
    document.getElementById('hallSlots').insertAdjacentHTML('beforeend', html.outerHTML);
  };

  const handleClick = async () => {
    await housingService.addHall(preferredHallList);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title={searchHallTitle} className="gc360_header" />
          <CardContent height="500">
            <Grid id="hallSlots">
              <HallSlot rank={1} hallList={hallList} func={updatePreferredHallList} />
              {/* <HallSlot rank={2} hallList={hallList} func={updatePreferredHallList} />
              <HallSlot rank={3} hallList={hallList} func={updatePreferredHallList} /> */}
              {/* {Array(count).fill(<HallSlot rank={count} hallList={hallList} func={updatePreferredHallList} />)} */}
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" onClick={addPreferredHall}>
                Add a Hall
              </Button>
            </Grid>
          </CardContent>
          <Button onClick={handleClick}>Submit</Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PreferredHallsCard;
