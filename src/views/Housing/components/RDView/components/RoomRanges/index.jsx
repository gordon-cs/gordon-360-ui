import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  Button,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Select, MenuItem } from '@mui/material';

const RoomRanges = () => {
  const [building, setBuilding] = useState('');
  const [roomStart, setRoomStart] = useState('');
  const [roomEnd, setRoomEnd] = useState('');
  const [roomRanges, setRoomRanges] = useState([]);
  const [selectedRoomRange, setSelectedRoomRange] = useState(null);
  // Who can be assigned to a room range will later on depend on what hall is choseon
  const [people, setPeople] = useState(['Person 1', 'Person 2', 'Person 3', 'Person 4']);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch('/api/Housing/roomrange')
      .then((response) => response.json())
      .then((data) => setRoomRanges(data))
      .catch((error) => console.error('Error fetching room ranges:', error));

    fetch('/api/Housing/RA_Assigned_Ranges')
      .then((response) => response.json())
      .then((data) => setAssignments(data))
      .catch((error) => console.error('Error fetching assigned ranges:', error));
  }, []);

  const clearRoomInputs = () => {
    setBuilding('');
    setRoomStart('');
    setRoomEnd('');
  };

  const clearSelections = () => {
    setSelectedPerson(null);
    setSelectedRoomRange(null);
  };

  const addRoomRange = () => {
    if (building && roomStart && roomEnd) {
      const newRoomRange = { Hall_ID: building, Room_Start: roomStart, Room_End: roomEnd };

      fetch('/api/Housing/roomrange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoomRange),
      })
        .then((response) => response.json())
        .then((data) => setRoomRanges((prev) => [...prev, data]))
        .catch((error) => console.error('Error adding room range:', error));

      clearRoomInputs();
    }
  };

  const removeRoomRange = () => {
    if (selectedRoomRange !== null) {
      const rangeId = roomRanges[selectedRoomRange].Range_ID;

      fetch(`/api/Housing/roomrange/${rangeId}`, {
        method: 'DELETE',
      })
        .then(() => {
          setRoomRanges((prev) => prev.filter((_, index) => index !== selectedRoomRange));
          setSelectedRoomRange(null);
        })
        .catch((error) => console.error('Error removing room range:', error));
    }
  };
  const assignPersonToRoom = () => {
    if (selectedPerson !== null && selectedRoomRange !== null) {
      const assignedRange = {
        Range_ID: roomRanges[selectedRoomRange].Range_ID,
        Ra_ID: people[selectedPerson],
      };

      fetch('/api/Housing/RA_Assigned_Ranges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assignedRange),
      })
        .then((response) => response.json())
        .then((data) => {
          const assignment = `${data.Ra_ID}: ${data.Range.Hall_ID} ${data.Range.Room_Start} - ${data.Range.Room_End}`;
          setAssignments((prev) => [...prev, assignment]);
          setSelectedPerson(null);
          setSelectedRoomRange(null);
        })
        .catch((error) => console.error('Error assigning person to range:', error));
    }
  };

  const removeAssignment = (index) => {
    const assignmentToRemove = assignments[index];

    fetch(
      `/api/Housing/RA_Assigned_Ranges/${assignmentToRemove.Range_ID}/${assignmentToRemove.Ra_ID}`,
      {
        method: 'DELETE',
      },
    )
      .then(() => {
        setAssignments((prev) => prev.filter((_, i) => i !== index));
      })
      .catch((error) => console.error('Error removing assigned range:', error));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
        Room Assignment
      </Typography>

      <Typography variant="h6" sx={{ color: 'white' }}>
        Add Room Range
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="Building">Building</InputLabel>
        <Select
          label="select building"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ input: { color: 'white' }, bgcolor: 'transparent', border: '1px solid white' }}
          InputLabelProps={{
            sx: { color: 'gray', '&.Mui-focused': { color: 'transparent' } },
          }}
        >
          <MenuItem value="Hall 1">Bromley</MenuItem>
          <MenuItem value="Hall 2">Ferrin</MenuItem>
          <MenuItem value="Hall 3">Evans</MenuItem>
          <MenuItem value="Hall 4">Wilson</MenuItem>
          <MenuItem value="Hall 5">Chase</MenuItem>
          <MenuItem value="Hall 6">Tavilla</MenuItem>
          <MenuItem value="Hall 7">Fulton</MenuItem>
          <MenuItem value="Hall 8">Nyland</MenuItem>
          <MenuItem value="Hall 9">The Village</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Room Start"
        value={roomStart}
        onChange={(e) => setRoomStart(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ input: { color: 'white' }, bgcolor: 'transparent', border: '1px solid white' }}
        InputLabelProps={{
          sx: { color: 'gray', '&.Mui-focused': { color: 'transparent' } },
        }}
      />

      <TextField
        label="Room End"
        value={roomEnd}
        onChange={(e) => setRoomEnd(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ input: { color: 'white' }, bgcolor: 'transparent', border: '1px solid white' }}
        InputLabelProps={{
          sx: { color: 'gray', '&.Mui-focused': { color: 'transparent' } },
        }}
      />

      <Button variant="contained" onClick={addRoomRange} color="primary" sx={{ mt: 2 }}>
        Save Range
      </Button>

      <Button variant="contained" onClick={removeRoomRange} color="secondary" sx={{ mt: 2, ml: 1 }}>
        Remove Range
      </Button>

      <Typography variant="h6" sx={{ mt: 3, color: 'white' }}>
        Room Ranges
      </Typography>

      <List>
        {roomRanges.map((range, index) => (
          <ListItem
            key={index}
            onClick={() => setSelectedRoomRange(index)}
            sx={{
              cursor: 'pointer',
              backgroundColor: selectedRoomRange === index ? 'primary.main' : 'transparent',
              color: selectedRoomRange === index ? 'white' : 'white',
              '&:hover': { backgroundColor: 'secondary.main' },
            }}
          >
            {range.Hall_ID} {range.Room_Start} - {range.Room_End}
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" sx={{ mt: 3, color: 'white' }}>
        Assign Person
      </Typography>

      <List>
        {people.map((person, index) => (
          <ListItem
            key={index}
            onClick={() => setSelectedPerson(index)}
            sx={{
              cursor: 'pointer',
              backgroundColor: selectedPerson === index ? 'primary.main' : 'transparent',
              color: selectedPerson === index ? 'white' : 'white',
              '&:hover': { backgroundColor: 'secondary.main' },
            }}
          >
            {person}
          </ListItem>
        ))}
      </List>

      <Button variant="contained" onClick={assignPersonToRoom} color="primary">
        Assign Person
      </Button>

      <Typography variant="h6" sx={{ mt: 3, color: 'white' }}>
        Assignments
      </Typography>

      <List>
        {assignments.map((assignment, index) => (
          <ListItem key={index} sx={{ cursor: 'pointer', color: 'white' }}>
            {assignment}
            <Button onClick={() => removeAssignment(index)} color="secondary" sx={{ ml: 2 }}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RoomRanges;
