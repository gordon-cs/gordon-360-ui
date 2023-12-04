import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import HallSlot from './HallSlotComponent';
import housingService from 'services/housing';
import styles from '../../HousingLottery.module.css';
import GordonSnackbar from 'components/Snackbar';

const PreferredHallsCard = () => {
  const [hallList, setHallList] = useState([]);
  const [preferredHallList, setPreferredHallList] = useState(['', '', '', '', '', '']);
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

  const handleClick = async () => {
    await housingService.addHall(preferredHallList);
  };

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
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="flex-end"
              style={{ marginTop: 'auto' }}
            >
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
