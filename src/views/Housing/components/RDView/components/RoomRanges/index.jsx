import React, { useState } from 'react';
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
  const [selectedRoomRange, setSelectedRoomRange] = useState('');
  const [people, setPeople] = useState(['Mya Randolph', 'Jason Asonye', 'Danya Li', 'Ross Clark']);
  const [selectedPerson, setSelectedPerson] = useState('');
  const [assignments, setAssignments] = useState([]);

  const clearRoomInputs = () => {
    setBuilding('');
    setRoomStart('');
    setRoomEnd('');
  };

  const clearSelections = () => {
    setSelectedPerson('');
    setSelectedRoomRange('');
  };

  // Use the filter method to create a new array excluding the selected room range
  const removeRoomRange = () => {
    if (selectedRoomRange !== null) {
      setRoomRanges((prev) => prev.filter((_, index) => index !== selectedRoomRange));
    }
  };

  // Create a new room range from the inputs and update the roomRanges array, then reset the inputs
  const addRoomRange = () => {
    if (building && roomStart && roomEnd) {
      const newRoomRange = `${building} ${roomStart} - ${roomEnd}`;
      setRoomRanges((prev) => [...prev, newRoomRange]);
      clearRoomInputs();
    }
  };

  // Creates room assignment which assigns a person to a room and adds it to the assignments array
  const assignPersonToRoom = () => {
    if (selectedPerson !== null && selectedRoomRange !== null) {
      const assignment = `${people[selectedPerson]}: ${roomRanges[selectedRoomRange]}`;
      setAssignments((prev) => [...prev, assignment]);
      clearSelections();
    }
  };

  // Remove selected assignment from assignments array on the provided index when remove button
  // next to the persons assignment is clicked
  const removeAssignment = (index) => {
    setAssignments((prev) => prev.filter((_, i) => i !== index));
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
        <InputLabel id="Building"> Building </InputLabel>
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
          <MenuItem value="Ferrin">Ferrin</MenuItem>
          <MenuItem value="Bromley">Bromley</MenuItem>
          <MenuItem value="Tavilla">Tavilla</MenuItem>
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
            {range}
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

      <Button variant="contained" onClick={assignPersonToRoom} color="primary" sx={{ mt: 2 }}>
        Assign Person
      </Button>

      <Typography variant="h6" sx={{ mt: 3, color: 'white' }}>
        Assignments
      </Typography>

      <List>
        {assignments.map((assignment, index) => (
          <ListItem
            key={index}
            onClick={() => removeAssignment(index)}
            sx={{ cursor: 'pointer', color: 'white' }}
          >
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
