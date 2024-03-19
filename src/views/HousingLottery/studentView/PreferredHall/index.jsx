import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import HallSlot from './HallSlotComponent';
import housingService from 'services/housing';
import styles from '../../HousingLottery.module.css';
import GordonSnackbar from 'components/Snackbar';

const PreferredHallsCard = ({ setPreferredHallResult }) => {
  const [hallList, setHallList] = useState([]);
  const [preferredHallList, setPreferredHallList] = useState(['', '', '', '', '', '']);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const searchHallTitle = <div align="left">Preferred Halls</div>;
  const [storedPreferredHallList, setStoredPreferredHallList] = useState();

  useEffect(() => {
    housingService.getTraditionalHalls().then(setHallList);
    housingService.getUserPreferredHall().then(setStoredPreferredHallList);
  }, []);
  console.log(storedPreferredHallList);
  useEffect(() => {
    if (storedPreferredHallList) {
      for (let i = 1; i <= storedPreferredHallList.length; i++) {
        const hallName = storedPreferredHallList.find((r) => r.Rank === i)?.HallName;
        console.log("I'm here! 1");
        updatePreferredHallList(i, hallName);
        console.log("I'm here! 2");
      }
    }
  }, [storedPreferredHallList]);
  function updatePreferredHallList(rank, hall) {
    setPreferredHallList((oldList) => {
      let newList = [...oldList];
      newList[rank - 1] = hall;
      console.log(newList);
      return newList;
    });
    setPreferredHallResult((oldList) => {
      let newList = [...oldList];
      newList[rank - 1] = hall;
      console.log(newList);
      return newList;
    });
  }
  console.log(preferredHallList);

  return (
    <Grid container>
      <Grid item xs={12} lg={12}>
        <Card>
          <CardHeader title={searchHallTitle} className="gc360_header" />
          <CardContent height="500">
            <div className={styles.rankLabel}>Rank</div>
            <Grid id="hallSlots">
              <Grid container spacing={5}>
                <Grid item xs={3}>
                  1
                </Grid>
                <Grid item xs={3}>
                  <HallSlot
                    rank={1}
                    hallList={hallList}
                    preferredHallList={preferredHallList}
                    updatePreferredHallList={updatePreferredHallList}
                    storedPreferredHallList={storedPreferredHallList}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                <Grid item xs={3}>
                  2
                </Grid>
                <Grid item xs={3}>
                  <HallSlot
                    rank={2}
                    hallList={hallList}
                    preferredHallList={preferredHallList}
                    updatePreferredHallList={updatePreferredHallList}
                    storedPreferredHallList={storedPreferredHallList}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                <Grid item xs={3}>
                  3
                </Grid>
                <Grid item xs={3}>
                  <HallSlot
                    rank={3}
                    hallList={hallList}
                    preferredHallList={preferredHallList}
                    updatePreferredHallList={updatePreferredHallList}
                    storedPreferredHallList={storedPreferredHallList}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                <Grid item xs={3}>
                  4
                </Grid>
                <Grid item xs={3}>
                  <HallSlot
                    rank={4}
                    hallList={hallList}
                    preferredHallList={preferredHallList}
                    updatePreferredHallList={updatePreferredHallList}
                    storedPreferredHallList={storedPreferredHallList}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                <Grid item xs={3}>
                  5
                </Grid>
                <Grid item xs={3}>
                  <HallSlot
                    rank={5}
                    hallList={hallList}
                    preferredHallList={preferredHallList}
                    updatePreferredHallList={updatePreferredHallList}
                    storedPreferredHallList={storedPreferredHallList}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                <Grid item xs={3}>
                  6
                </Grid>
                <Grid item xs={3}>
                  <HallSlot
                    rank={6}
                    hallList={hallList}
                    preferredHallList={preferredHallList}
                    updatePreferredHallList={updatePreferredHallList}
                    storedPreferredHallList={storedPreferredHallList}
                  />
                </Grid>
              </Grid>
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
