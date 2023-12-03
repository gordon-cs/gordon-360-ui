import { Grid } from '@mui/material';
import { useState } from 'react';
import { HallSearchField } from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';
import GordonSnackbar from 'components/Snackbar';

/**
 *
 * @param {number} rank
 * @returns
 */
const HallSlot = ({ rank, hallList, preferredHallList, updatePreferredHallList }) => {
  const [hall, setHall] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });

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
