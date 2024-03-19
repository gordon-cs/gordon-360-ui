import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { HallSearchField } from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';
import GordonSnackbar from 'components/Snackbar';

/**
 *
 * @param {number} rank
 * @returns
 */
const HallSlot = ({
  rank,
  hallList,
  preferredHallList,
  updatePreferredHallList,
  storedPreferredHallList,
}) => {
  const [hall, setHall] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });

  // console.log(rank)
  // console.log(preferredHallList)
  // useEffect(() => {
  //   if (preferredHallList) {
  //     const hallName = preferredHallList.find((r) => r.Rank === rank)?.HallName;
  //     setHall(hallName);
  //     console.log("I'm here! 1");
  //     updatePreferredHallList(rank, hallName);
  //     console.log("I'm here! 2");
  //   }
  // }, [preferredHallList]);

  // useEffect(() => {
  //     for (let i = 1; i <= storedPreferredHallList; i++) {
  //       const hallName = storedPreferredHallList.find((r) => r.Rank === i)?.HallName;
  //       console.log("I'm here! 1");
  //       updatePreferredHallList(rank, hallName);
  //       console.log("I'm here! 2");
  //       setHall(hallName);
  //     }
  // }, []);

  const selectPreferredHall = (event) => {
    if (preferredHallList.length > 0) {
      for (let i = 0; i < preferredHallList.length; i++) {
        if (event.target.value == preferredHallList[i] && event.target.value != '') {
          setSnackbar({
            message: 'You have already selected this hall.',
            severity: 'error',
            open: true,
          });
          return;
        }
      }
    }
    setHall(event.target.value);
    updatePreferredHallList(rank, event.target.value);
  };
  console.log(preferredHallList);

  return (
    <Grid container spacing={5}>
      <HallSearchField
        name="building"
        value={hall}
        updateValue={(event) => selectPreferredHall(event)}
        options={hallList}
        select
        size={200}
      />
      <GordonSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.message}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </Grid>
  );
};

export default HallSlot;
