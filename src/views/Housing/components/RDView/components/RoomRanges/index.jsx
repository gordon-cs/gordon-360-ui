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
import http from '../../../../../../services/http';

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
    fetchRoomRanges();
  });

  const fetchRoomRanges = () => {
    http
      .get('Housing/room-ranges')
      .then((response) => {
        console.log('API response:', response); // Log the entire response object to see structure
        setRoomRanges(response);
      })
      .catch((error) => console.error('Error fetching room ranges:', error));
  };

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
      const body = { Hall_ID: building, Room_Start: roomStart, Room_End: roomEnd };

      http
        .post('Housing/roomrange', body)
        .then((response) => {
          setRoomRanges((prev) =>
            Array.isArray(prev) ? [...prev, response.data] : [response.data],
          );
          clearRoomInputs();
        })
        .catch((error) => console.error('Error adding room range:', error));

      clearRoomInputs();
    }
  };

  const removeRoomRange = () => {
    if (selectedRoomRange !== null) {
      const rangeId = roomRanges[selectedRoomRange].Range_ID;

      http
        .delete(`/Housing/roomrange/${rangeId}`)
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

      http
        .post('/Housing/RA_Assigned_Ranges')
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

  return (
    <Box p={3}>
      <Typography variant="h4">Room Assignment</Typography>

      <Typography variant="h6">Add Room Range</Typography>

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
          <MenuItem value="BRO">Bromley</MenuItem>
          <MenuItem value="FER">Ferrin</MenuItem>
          <MenuItem value="EVN">Evans</MenuItem>
          <MenuItem value="WIL">Wilson</MenuItem>
          <MenuItem value="CHA">Chase</MenuItem>
          <MenuItem value="TAV">Tavilla</MenuItem>
          <MenuItem value="FUL">Fulton</MenuItem>
          <MenuItem value="NYL">Nyland</MenuItem>
          <MenuItem value="GRA">Grace</MenuItem>
          <MenuItem value="MCI">MacInnis</MenuItem>
          <MenuItem value="CON">Conrad</MenuItem>
          <MenuItem value="RID">Rider</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Room Start"
        value={roomStart}
        onChange={(e) => setRoomStart(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Room End"
        value={roomEnd}
        onChange={(e) => setRoomEnd(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" onClick={addRoomRange} sx={{ mt: 2 }}>
        Save Range
      </Button>

      <Button variant="contained" onClick={removeRoomRange} sx={{ mt: 2, ml: 1 }}>
        Remove Range
      </Button>

      <Typography variant="h6">Room Ranges</Typography>

      <List>
        {roomRanges.length > 0 ? (
          roomRanges.map((range, index) => (
            <ListItem key={index} onClick={() => setSelectedRoomRange(index)}>
              {range.Hall_Id}: {range.Room_Start} - {range.Room_End}
            </ListItem>
          ))
        ) : (
          <ListItem>No room ranges set</ListItem>
        )}
      </List>

      <Typography variant="h6">Assign Person</Typography>

      {/*<List>*/}
      {/*  {people.map((person, index) => (*/}
      {/*    <ListItem*/}
      {/*      key={index}*/}
      {/*      onClick={() => setSelectedPerson(index)}*/}
      {/*    >*/}
      {/*      {person}*/}
      {/*    </ListItem>*/}
      {/*  ))}*/}
      {/*</List>*/}

      <Button variant="contained" onClick={assignPersonToRoom}>
        Assign Person
      </Button>

      <Typography variant="h6">Assignments</Typography>

      {/*<List>*/}
      {/*  {assignments.map((assignment, index) => (*/}
      {/*    <ListItem key={index}>*/}
      {/*      {assignment}*/}
      {/*      <Button onClick={() => removeAssignment(index)}>*/}
      {/*        Remove*/}
      {/*      </Button>*/}
      {/*    </ListItem>*/}
      {/*  ))}*/}
      {/*</List>*/}
    </Box>
  );
};

export default RoomRanges;
