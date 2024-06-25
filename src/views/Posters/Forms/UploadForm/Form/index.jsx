import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, MenuItem } from '@mui/material';
import membershipService, { Participation } from 'services/membership';

const UploadForm = ({ onClose }) => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState('');

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        // Replace 'username' with the actual username
        const fetchedClubs = await membershipService.get({
          username: 'username',
          participationTypes: Participation.GroupAdmin,
        });
        setClubs(fetchedClubs);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };

    fetchClubs();
  }, []);

  const handleClubChange = (event) => {
    setSelectedClub(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Start Time
          <TextField type="datetime-local" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} color={'GordonBlue'}>
          End Time
          <TextField type="datetime-local" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} paddingTop={20}>
          <TextField label="Title" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Description" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Select Club"
            value={selectedClub}
            onChange={handleClubChange}
            variant="outlined"
            fullWidth
            required
          >
            {clubs.map((club) => (
              <MenuItem key={club.ActivityCode} value={club.ActivityCode}>
                {club.ActivityDescription}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component="label" fullWidth>
            Upload Poster
            <input type="file" hidden />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={onClose}
            style={{ backgroundColor: 'transparent' }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UploadForm;
