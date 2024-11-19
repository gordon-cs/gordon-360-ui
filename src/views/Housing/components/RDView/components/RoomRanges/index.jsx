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
  Card,
  CardContent,
  CardActions,
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

  const fetchRaList = (building) => {
    console.log(building);
    raList()
      .then((response) => {
        const buildingCodes = response.filter((code) => code.BLDG_Code === building);
        setPeople(response ? buildingCodes : []);
        console.log(response);
      })
      .catch((error) => console.error('Error fetching RAs:', error));
  };

  const onClickAddRoomRange = () => {
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
      <Typography variant="h4" gutterBottom>
        Room Assignment
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Add Room Range</Typography>
          <Typography variant="body1" gutterBottom>
            Select a building and specify a start and end room number. Click "Save Range" to add it
            to the list of room ranges.
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="Building">Building</InputLabel>
            <Select
              label="select building"
              value={building}
              onChange={(e) => {
                setBuilding(e.target.value);
                fetchRaList(e.target.value);
              }}
              fullWidth
              margin="normal"
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
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={onClickAddRoomRange}>
            Save Range
          </Button>
        </CardActions>
      </Card>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Room Ranges</Typography>
          <Typography variant="body1" gutterBottom>
            The list below shows the current room ranges. Click on a range to select it, then use
            "Remove" to delete it.
          </Typography>
          <List>
            {showList ? (
              roomRanges.length > 0 ? (
                roomRanges.map((range, index) => (
                  <ListItem
                    key={index}
                    onClick={() => setSelectedRoomRange(index)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      cursor: 'pointer',
                      backgroundColor:
                        selectedRoomRange === index ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                      '&:hover .remove-btn': {
                        borderColor: 'black',
                        color: 'black',
                      },
                    }}
                  >
                    <Box>
                      {range.Hall_ID}: {range.Room_Start} - {range.Room_End}
                    </Box>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering list item click
                        onClickRemoveRoomRange();
                      }}
                      className="remove-btn"
                    >
                      Remove
                    </Button>
                  </ListItem>
                ))
              ) : (
                <ListItem>No room ranges set</ListItem>
              )
            ) : (
              <ListItem>Loading room ranges...</ListItem>
            )}
          </List>
        </CardContent>
      </Card>

      <Typography variant="h6">Room Ranges</Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Assign Person</Typography>
          <Typography variant="body1" gutterBottom>
            Select a person from the list below to assign to the chosen room range. The list is
            populated based on the selected building in the 'Add Room Range' section.
          </Typography>
          <List>
            {people.map((person, index) => (
              <ListItem
                key={index}
                onClick={() => setSelectedPerson(index)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: selectedPerson === index ? 'primary.main' : 'transparent',
                  '&:hover': { backgroundColor: 'secondary.main' },
                }}
              >
                {person.FirstName} {person.LastName}
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={onClickAssignPerson}>
            Assign Person
          </Button>
        </CardActions>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">Assignments</Typography>
          <Typography variant="body1" gutterBottom>
            View current assignments below. Click "Remove" next to an assignment to delete it.
          </Typography>
          <List>
            {assignments.length > 0 ? (
              assignments.map((assignment, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box>
                    {assignment.Fname} {assignment.Lname}: {assignment.Hall_Name}{' '}
                    {assignment.Room_Start} - {assignment.Room_End}
                  </Box>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => onClickRemoveAssignment(index)}
                    sx={{
                      '&:hover': {
                        borderColor: 'black',
                        color: 'black',
                      },
                    }}
                  >
                    Remove
                  </Button>
                </ListItem>
              ))
            ) : (
              <ListItem>No Assignments set</ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RoomRanges;
