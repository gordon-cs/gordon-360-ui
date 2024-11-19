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
import {
  fetchRoomRanges,
  raList,
  fetchAssignmentList,
  addRoomRange,
  removeRoomRange,
  removeAssignment,
  assignPersonToRange,
} from 'services/residentLife/roomRanges';

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
    setTimeout(() => setShowList(true), 1000);
    fetchRoomRanges()
      .then((response) => {
        setRoomRanges(response);
        console.log(response);
      })
      .catch((error) => console.error('Error fetching room ranges:', error));
    fetchAssignmentList()
      .then((response) => {
        console.log('Assignments:', response);
        setAssignments(response);
      })
      .catch((error) => console.error('Error fetching RA range assignment list:', error));
    //raList();
  }, []);

  const clearRoomInputs = () => {
    setRoomStart('');
    setRoomEnd('');
  };

  const onClickRoomRange = () => {
    if (building && roomStart && roomEnd) {
      const body = { Hall_ID: building, Room_Start: roomStart, Room_End: roomEnd };
      addRoomRange(body)
        .then((response) => {
          clearRoomInputs();
          fetchRoomRanges()
            .then((response) => {
              setRoomRanges(response);
              console.log(response);
            })
            .catch((error) => console.error('Error fetching room ranges:', error));
        })
        .catch((error) => {
          console.error('Error adding room range:', error);
          window.alert('Error adding room range: ' + error);
          fetchRoomRanges();
        });
      clearRoomInputs();
    }
  };

  const onClickRemoveRoomRange = () => {
    console.log(selectedRoomRange);
    const range_id = roomRanges[selectedRoomRange].RangeID;
    console.log(range_id);
    removeRoomRange(range_id)
      .then(() => {
        fetchRoomRanges()
          .then((response) => {
            setRoomRanges(response);
            console.log(response);
          })
          .catch((error) => console.error('Error fetching room ranges:', error));
        setSelectedRoomRange(null);
      })
      .catch((error) => {
        console.error('Error removing room range:', error);
        window.alert('Error removing room range: ' + error);
      });
  };

  const onClickAssignPerson = () => {
    if (selectedPerson !== null && selectedRoomRange !== null) {
      const newRange = {
        Range_ID: roomRanges[selectedRoomRange].RangeID,
        Ra_ID: people[selectedPerson].ID,
      };

      assignPersonToRange(newRange)
        .then(() => {
          setSelectedPerson(null);
          setSelectedRoomRange(null);
          fetchAssignmentList()
            .then((response) => {
              console.log('Assignments:', response);
              setAssignments(response);
            })
            .catch((error) => console.error('Error fetching RA range assignment list:', error));
        })
        .catch((error) => {
          console.error('Error assigning person to range: ', error);
          window.alert('Error assigning person to range: ' + error);
        });
    }
  };

  const onClickRemoveAssignment = (index) => {
    const rangeId = assignments[index].Range_ID;
    removeAssignment(rangeId)
      .then(() => {
        fetchAssignmentList()
          .then((response) => {
            console.log('Assignments:', response);
            setAssignments(response);
          })
          .catch((error) => console.error('Error fetching RA range assignment list:', error));
      })
      .catch((error) => {
        console.error('Error removing assignment:', error);
        window.alert('Error removing assignment: ' + error);
      });
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
            raList(e.target.value)
              .then((response) => {
                console.log('ra list:', response);
                // Filter through the response to only get RAs whos building codes match the
                // user selected building
                const buildingCodes = response.filter((code) => code.BLDG_Code === e.target.value);
                setPeople(Array.isArray(response) ? buildingCodes : []);
              })
              .catch((error) => console.error('Error fetching RA list:', error));
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

      <Button variant="contained" onClick={onClickRoomRange} sx={{ mt: 2 }}>
        Save Range
      </Button>

      <Button
        variant="contained"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering list item click
          onClickRemoveRoomRange();
        }}
        sx={{ mt: 2, ml: 1 }}
      >
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

      <Button variant="contained" onClick={onClickAssignPerson}>
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
                <Button
                  onClick={() => {
                    onClickRemoveAssignment(index);
                  }}
                >
                  Remove
                </Button>
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
