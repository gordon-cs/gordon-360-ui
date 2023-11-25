import { Button, Card, CardContent, CardHeader, Grid, TextField, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import HallSlot from './HallSlotComponent';
import housingService from 'services/housing';
import styles from '../../HousingLottery.module.css';
import ClearIcon from '@mui/icons-material/Clear';
import GordonSnackbar from 'components/Snackbar';

const PreferredHallsCard = () => {
  const [count, setCount] = useState(1);
  const [hallList, setHallList] = useState([]);
  const [preferredHallList, setPreferredHallList] = useState([]);
  const [hallSlotArray, setHallSlotArray] = useState([]);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const searchHallTitle = <div align="left">Preferred Halls</div>;

  useEffect(() => {
    housingService.getTraditionalHalls().then(setHallList);
  }, []);

  function updatePreferredHallList(rank, hall) {
    let newList = preferredHallList;
    newList[rank - 1] = hall;
    setPreferredHallList(newList);
  }

  // const updatePreferredHallList = (rank, hall) => {
  //   setPreferredHallList([
  //     ...preferredHallList,
  //     {
  //       id: rank,
  //       name: hall
  //     },
  //   ]);
  //   console.log("rank " + rank + " preferredHallList " + preferredHallList.length)
  //   return preferredHallList;
  // }

  const handleClick = async () => {
    await housingService.addHall(preferredHallList);
  };

  const handleChangeRank = (index, filteredArray) => {
    const updatedHallSlotArray = filteredArray.map((h) => {
      var temp = Object.assign({}, h);
      if (temp.id > index) {
        temp.id = temp.id - 1;
      }
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
                        let filteredArray = hallSlotArray.filter((a) => a.id !== h.id);
                        let temp = preferredHallList;
                        setPreferredHallList(temp.splice(h.id - 1, 1));
                        console.log(preferredHallList);
                        console.log(filteredArray);
                        handleChangeRank(h.id, filteredArray);
                        setHallSlotArray(hallSlotArray.filter((a) => a.id !== h.id));
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
                id="add_hall"
                className={styles.addHall_button}
                variant="outlined"
                startIcon={<AddIcon fontSize="inherit" />}
                onClick={() => {
                  if (count <= 6) {
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
                          />
                        ),
                      },
                    ]);
                  }
                  if (count > 6) {
                    setSnackbar({
                      message: 'You can select up to six halls.',
                      severity: 'error',
                      open: true,
                    });
                  }
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
      <GordonSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.message}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </Grid>
  );
};

export default PreferredHallsCard;
