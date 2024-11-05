import { useState, useEffect } from 'react';
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
  const [showList, setShowList] = useState(false);
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [assignments, setAssignments] = useState([]);

  // Every function that will run when the page is loaded/refreshed
  useEffect(() => {
    fetchRoomRanges();
    assignmentList();
    //raList();
  }, []);

  // Fetches the list of room ranges from the API endpoint "Housing/room-ranges"
  const fetchRoomRanges = () => {
    setTimeout(() => setShowList(true), 1000);
    http
      .get('Housing/room-ranges')
      .then((response) => {
        setRoomRanges(response);
      })
      .catch((error) => console.error('Error fetching room ranges:', error));
  };

  // Fetches the list of all the RAs from the API endpoint "Housing/ras"
  const raList = (build) => {
    http
      .get('Housing/ras')
      .then((response) => {
        // Filter through the response to only get RAs whos building codes match the
        // user selected building
        const buildingCodes = response.filter((code) => code.BLDG_Code === build);
        setPeople(Array.isArray(response) ? buildingCodes : []);
      })
      .catch((error) => console.error('Error fetching RA list:', error));
  };

  // Fetches the list of RA room range assignments from the API endpoint "Housing/RangeAssignments"
  const assignmentList = () => {
    http
      .get('Housing/RangeAssignments')
      .then((response) => {
        console.log('Assignments:', response);
        setAssignments(Array.isArray(response) ? response : []);
      })
      .catch((error) => console.error('Error fetching RA range assignment list:', error));
  };

  const clearRoomInputs = () => {
    setRoomStart('');
    setRoomEnd('');
  };

  // Post request to the API endpoint "Housing/roomrange" which adds the user inputed room range
  // to our "Hall_Assignment_Ranges" database which the FetchRoomRanges() function pulls from
  const addRoomRange = () => {
    if (building && roomStart && roomEnd) {
      console.log('building', building);
      setShowList(false);
      const body = { Hall_ID: building, Room_Start: roomStart, Room_End: roomEnd };
      http
        .post('Housing/roomrange', body)
        .then((response) => {
          clearRoomInputs();
          fetchRoomRanges();
        })
        .catch((error) => {
          console.error('Error adding room range:', error);
          window.alert('Error adding room range: ' + error);
          fetchRoomRanges();
        });
      clearRoomInputs();
    }
  };

  // Delete request to the API endpoint "Housing/roomrange/{rangeId}" which
  // deletes the user selected room range
  const removeRoomRange = () => {
    if (selectedRoomRange !== null) {
      setShowList(false);
      const rangeId = roomRanges[selectedRoomRange].RangeID;
      http
        .del(`Housing/roomrange/${rangeId}`)
        .then(() => {
          fetchRoomRanges();
          setSelectedRoomRange(null);
        })
        .catch((error) => {
          console.error('Error removing room range:', error);
          window.alert('Error removing room range: ' + error);
        });
    }
  };

  // Post request to API endpoint "Housing/assign-ra" which assigns
  // the user selected RA to the user selected room range
  const assignPersonToRange = () => {
    if (selectedPerson !== null && selectedRoomRange !== null) {
      const assignedRange = {
        range_ID: roomRanges[selectedRoomRange].RangeID,
        ra_ID: people[selectedPerson].ID,
      };
      http
        .post('Housing/assign-ra', assignedRange)
        .then((response) => {
          setSelectedPerson(null);
          setSelectedRoomRange(null);
          assignmentList();
        })
        .catch((error) => {
          console.error('Error assigning person to range: ', error);
          window.alert('Error assigning person to range: ' + error);
        });
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
          onChange={(e) => {
            setBuilding(e.target.value);
            raList(e.target.value);
          }}
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
        {showList ? (
          roomRanges.length > 0 ? (
            roomRanges.map((range, index) => (
              <ListItem
                key={index}
                onClick={() => setSelectedRoomRange(index)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: selectedRoomRange === index ? 'primary.main' : 'transparent',
                  color: selectedRoomRange === index ? 'black' : 'black',
                  '&:hover': { backgroundColor: 'secondary.main' },
                }}
              >
                {range.Hall_ID}: {range.Room_Start} - {range.Room_End}
              </ListItem>
            ))
          ) : (
            <ListItem>No room ranges set</ListItem>
          )
        ) : (
          <ListItem>Loading room ranges...</ListItem>
        )}
      </List>

      <Typography variant="h6">Assign Person</Typography>

      <List>
        {people.map((person, index) => (
          <ListItem
            key={index}
            onClick={() => setSelectedPerson(index)}
            sx={{
              cursor: 'pointer',
              backgroundColor: selectedPerson === index ? 'primary.main' : 'transparent',
              color: selectedPerson === index ? 'black' : 'black',
              '&:hover': { backgroundColor: 'secondary.main' },
            }}
          >
            {person.FirstName} {person.LastName}
          </ListItem>
        ))}
      </List>

      <Button variant="contained" onClick={assignPersonToRange}>
        Assign Person
      </Button>

      <Typography variant="h6">Assignments</Typography>

      <List>
        {assignments.length > 0 ? (
          assignments.map((assignment, index) => {
            return (
              <ListItem key={index}>
                {assignment.Fname} {assignment.Lname}: {assignment.Hall_Name}{' '}
                {assignment.Room_Start} - {assignment.Room_End}
                {/*<Button onClick={() => removeAssignment(index)}>*/}
                {/*  Remove*/}
                {/*</Button>*/}
              </ListItem>
            );
          })
        ) : (
          <ListItem>No Assignments set</ListItem>
        )}
      </List>
    </Box>
  );
};

export default RoomRanges;
