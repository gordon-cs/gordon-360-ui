import {
  FormControl,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { useState, useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
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
  deletePreferHall,
}) => {
  console.log('rank ' + rank);
  const [hall, setHall] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });

  const selectPreferredHall = (event) => {
    if (preferredHallList.length > 0) {
      for (let i = 0; i < preferredHallList.length; i++) {
        if (event.target.value == preferredHallList[i]) {
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
  console.log('preferredHallList ' + preferredHallList);

  function myFuc() {
    alert('yeah');
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={3}>
        {rank}
      </Grid>

      <Grid item xs={3}>
        <HallSearchField
          name="building"
          value={hall}
          updateValue={(event) => selectPreferredHall(event)}
          options={hallList}
          select
          size={200}
        />
      </Grid>

      <Grid item xs={3}>
        <IconButton
          style={{ marginBottom: '0.5rem' }}
          onClick={() => {
            console.log('onclick');
            deletePreferHall(rank - 1);
          }}
          edge="end"
          aria-label="delete"
          size="large"
        >
          <ClearIcon style={{ fontSize: 20 }} />
        </IconButton>
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

export default HallSlot;
