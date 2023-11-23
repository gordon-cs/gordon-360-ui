import { Button, Card, CardContent, CardHeader, Grid, TextField, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import HallSlot from './HallSlotComponent';
import housingService from 'services/housing';
import styles from '../../HousingLottery.module.css';
import ClearIcon from '@mui/icons-material/Clear';

const PreferredHallsCard = () => {
  const [count, setCount] = useState(1);
  const [hallList, setHallList] = useState([]);
  const [preferredHallList, setPreferredHallList] = useState([]);
  const [hallSlotArray, setHallSlotArray] = useState([]);
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

  // const hallSlotArray = Array(count).fill(0);
  // const [hallSlotArray, sethallSlotArray] = useState(initialhallSlotArray);

  function deletePreferHall(myNum) {
    setHallSlotArray(hallSlotArray.filter((a) => a.id !== myNum));
  }

  // const addHallSlot = () => {
  //   setCount(count + 1);
  //   sethallSlotArray([
  //     ...hallSlotArray,
  //     { id: count, name: "preferredHallList" }
  //   ])
  //   console.log("hallSlotArray" + hallSlotArray);
  // }

  // useEffect(() => {
  //   sethallSlotArray(myhallSlotArray);
  // }, [count]);

  const handleIncrementClick = (index) => {
    const updatedHallSlotArray = hallSlotArray.map((h) => {
      var temp = Object.assign({}, h);
      if (temp.id > index) {
        console.log('h.id > index before ' + temp.id);
        temp.id = temp.id - 1;
        console.log('h.id > index after ' + temp.id);
      }
      console.log('before return ' + temp.id);
      return temp;
    });
    setHallSlotArray(updatedHallSlotArray);
    setCount(count - 1);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title={searchHallTitle} className="gc360_header" />
          <CardContent height="500">
            <div className={styles.rankLabel}>Rank</div>
            <Grid id="hallSlots">
              {/* {hallSlotArray.map((value, index) => (
                <HallSlot
                  rank={index + 1}
                  hallList={hallList}
                  preferredHallList={preferredHallList}
                  updatePreferredHallList={updatePreferredHallList}
                  deletePreferHall={deletePreferHall}
                />
              ))} */}
              {hallSlotArray.map((h) => (
                <Grid container spacing={5} key={h.id}>
                  <Grid item xs={3}>
                    {h.id}
                  </Grid>
                  <Grid item xs={3}>
                    {h.name}
                  </Grid>
                  <Grid item xs={3}>
                    <IconButton
                      style={{ marginBottom: '0.5rem' }}
                      onClick={() => {
                        const temp = h.id;
                        setHallSlotArray(hallSlotArray.filter((a) => a.id !== h.id));
                        console.log(hallSlotArray);
                        handleIncrementClick(temp);
                        console.log('delete working ' + h.id);
                      }}
                      edge="end"
                      aria-label="delete"
                      size="large"
                    >
                      <ClearIcon style={{ fontSize: 20 }} />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="flex-end"
              style={{ marginTop: 'auto' }}
            >
              <Button
                className={styles.addHall_button}
                variant="outlined"
                startIcon={<AddIcon fontSize="inherit" />}
                onClick={() => {
                  setCount(count + 1);
                  setHallSlotArray([
                    ...hallSlotArray,
                    {
                      id: count,
                      name: (
                        <HallSlot
                          rank={count}
                          hallList={hallList}
                          preferredHallList={preferredHallList}
                          updatePreferredHallList={updatePreferredHallList}
                          deletePreferHall={deletePreferHall}
                        />
                      ),
                    },
                  ]);
                }}
              >
                Add a Hall
              </Button>
              <Button className={styles.submit_button} variant="contained" onClick={handleClick}>
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
