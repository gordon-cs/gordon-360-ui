import { useState, useEffect, useCallback } from 'react';
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
  fetchMissingRooms,
} from 'services/residentLife/roomRanges';
import { useColorScheme } from '@mui/material/styles';
import SimpleSnackbar from 'components/Snackbar';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getAllHalls } from 'services/residentLife/halls';
import GordonLoader from 'components/Loader';

const RoomRanges = () => {
  const { mode } = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [allHalls, setAllHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);
  const [roomStart, setRoomStart] = useState('');
  const [roomEnd, setRoomEnd] = useState('');
  const [allRoomRanges, setAllRoomRanges] = useState([]);
  const [filteredRoomRanges, setFilteredRoomRanges] = useState([]);
  const [selectedRoomRange, setSelectedRoomRange] = useState(null);
  const [allRAs, setAllRAs] = useState([]);
  const [filteredRAs, setFilteredRAs] = useState([]);
  const [selectedRA, setSelectedRA] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [unassignedRooms, setUnassignedRooms] = useState([]);
  const [filteredUnassigned, setFilteredUnassigned] = useState([]);
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    message: '',
    severity: null,
    open: false,
  });

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  const handleSnackbarClose = () => {
    setSnackbar((s) => ({ ...s, open: false }));
  };

  // Fetch data when the page loads
  useEffect(() => {
    Promise.all([
      getAllHalls()
        .then(setAllHalls)
        .catch((err) => {
          console.error(`Error fetching halls: ${err}`);
          createSnackbar('Could not load halls.', 'error');
        }),

      fetchRoomRanges()
        .then(setAllRoomRanges)
        .catch((error) => console.error('Error fetching room ranges:', error)),

      fetchAssignmentList()
        .then(setAssignments)
        .catch((error) => console.error('Error fetching assignments:', error)),

      fetchMissingRooms()
        .then(setUnassignedRooms)
        .catch((error) => console.error('Error fetching missing rooms:', error)),
    ]).then(() => setIsLoading(false));
  }, [createSnackbar]);

  // Update filtered data when building changes
  useEffect(() => {
    if (selectedHall) {
      const filteredRanges = allRoomRanges.filter((range) => range.Hall_ID === selectedHall);
      setFilteredRoomRanges(filteredRanges);

      const filteredRAs = allRAs.filter((person) => person.BLDG_Code === selectedHall);
      setFilteredRAs(filteredRAs);

      const filteredUnassigendrooms = unassignedRooms.filter(
        (room) => room.Building_Code === selectedHall,
      );
      setFilteredUnassigned(filteredUnassigendrooms);

      const filteredAssign = assignments.filter(
        (assignment) => assignment.Hall_ID === selectedHall,
      );
      setFilteredAssignments(filteredAssign);
    } else {
      setFilteredRoomRanges([]);
      setFilteredRAs([]);
      setFilteredAssignments([]);
    }
  }, [selectedHall, allRoomRanges, allRAs, assignments, unassignedRooms]);

  const clearRoomInputs = () => {
    setRoomStart('');
    setRoomEnd('');
  };

  const fetchRaList = (building) => {
    console.log('Selected Building:', building);
    raList()
      .then((response) => {
        const buildingCodes = response.filter((code) => code.BLDG_Code === building);
        setAllRAs(response ? buildingCodes : []);
        console.log('RA List:', response);
      })
      .catch((error) => console.error('Error fetching RAs:', error));
  };

  const onClickAddRoomRange = () => {
    if (selectedHall && roomStart && roomEnd) {
      const body = { Hall_ID: selectedHall, Room_Start: roomStart, Room_End: roomEnd };
      addRoomRange(body)
        .then(() => {
          clearRoomInputs();
          fetchRoomRanges()
            .then((response) => setAllRoomRanges(response))
            .catch((error) => console.error('Error fetching room ranges:', error));
        })
        .catch((error) => {
          console.error('Error adding room range:', error);
          createSnackbar('Error adding room range: ' + error, 'error');
        });
    }
  };

  const onClickRemoveRoomRange = (rangeId) => {
    removeRoomRange(rangeId)
      .then(() => {
        fetchRoomRanges()
          .then((response) => setAllRoomRanges(response))
          .catch((error) => console.error('Error fetching room ranges:', error));
        // Reload assignment list
        fetchAssignmentList() //reload assignemnt list as a assignment could be removed as well by this action
          .then((response) => setAssignments(response))
          .catch((error) => console.error('Error fetching assignments:', error));
        setSelectedRoomRange(null);
      })
      .catch((error) => {
        console.error('Error removing room range:', error);
        createSnackbar('Error removing room range: ' + error, 'error');
      });
  };

  const onClickAssignPerson = () => {
    if (selectedRA && selectedRoomRange) {
      const newRange = {
        Range_ID: selectedRoomRange,
        RA_ID: selectedRA,
      };

      assignPersonToRange(newRange)
        .then(() => {
          setSelectedRA(null);
          setSelectedRoomRange(null);
          fetchAssignmentList()
            .then((response) => setAssignments(response))
            .catch((error) => console.error('Error fetching assignments:', error));
        })
        .catch((error) => {
          console.error('Error assigning person to range:', error);
          createSnackbar('Error assigning person to room range: ' + error, 'error');
        });
    }
  };

  const onClickRemoveAssignment = (rangeId) => {
    removeAssignment(rangeId)
      .then(() => {
        fetchAssignmentList()
          .then((response) => setAssignments(response))
          .catch((error) => console.error('Error fetching assignments:', error));
      })
      .catch((error) => {
        console.error('Error removing assignment:', error);
        createSnackbar('Error removing assignment: ' + error, 'error');
      });
  };

  if (isLoading) {
    return <GordonLoader />;
  }

  return (
    <>
      <Box p={3}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back to ResLife
        </Button>
        <Typography
          variant="h3"
          align="center"
          style={{
            color: mode === 'dark' ? '#f8b619' : '#36b9ed',
            marginBottom: '10px',
          }}
        >
          Room Assignments
        </Typography>

        {/* Building Selection Section */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Building Selection</Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{
                color: '#9cb0b6',
              }}
            >
              Select a building to update the list of available RAs and room ranges for that
              building. This will also adjust the assignments you can view or modify.
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="Building">Building</InputLabel>
              <Select
                label="Select building"
                value={selectedHall ?? ''}
                onChange={(e) => {
                  setSelectedHall(e.target.value);
                  fetchRaList(e.target.value);
                }}
                fullWidth
                margin="normal"
              >
                {allHalls.map(({ Name, BuildingCode }) => (
                  <MenuItem value={BuildingCode}>{Name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* Add Room Range Section */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Add Room Range</Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{
                color: '#9cb0b6',
              }}
            >
              When creating a room range, enter only the root number for rooms. For example, if a
              room number is B20, B20A, or similar, enter it as 20. Select a building, specify a
              start and end room number, and click "Save Range" to add it.
            </Typography>
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

        {/* Room Ranges Section */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Room Ranges</Typography>
            <List>
              {isLoading ? (
                <ListItem>Loading room ranges...</ListItem>
              ) : filteredRoomRanges.length > 0 ? (
                filteredRoomRanges.map((range) => (
                  <ListItem
                    key={range.Range_ID}
                    onClick={() => setSelectedRoomRange(range.Range_ID)}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor:
                        selectedRoomRange === range.Range_ID ? 'primary.main' : 'transparent',
                      '&:hover': {
                        textDecoration: 'none',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '@media (hover: none)': {
                          backgroundColor: 'transparent',
                          color: 'inherit',
                        },
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
                      sx={{ ml: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickRemoveRoomRange(range.Range_ID);
                      }}
                    >
                      Remove
                    </Button>
                  </ListItem>
                ))
              ) : (
                <ListItem style={{ color: '#9cb0b6' }}>
                  Please select a building to see the list of Room Ranges.
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>

        {/* Assign Person Section */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Assign Person</Typography>
            <List>
              {filteredRAs.length > 0 ? (
                <>
                  <Typography variant="body1" gutterBottom style={{ color: '#9cb0b6' }}>
                    Select a room range and a person, then click "Assign Person" to add them to the
                    room assignments list below.
                  </Typography>
                  {filteredRAs.map((person) => (
                    <ListItem
                      key={person.ID}
                      onClick={() => setSelectedRA(person.ID)}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: selectedRA === person.ID ? 'primary.main' : 'transparent',
                        color: selectedRA === person.ID ? 'white' : 'inherit',
                        '&:hover': {
                          textDecoration: 'none',
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '@media (hover: none)': {
                            backgroundColor: 'transparent',
                            color: 'inherit',
                          },
                        },
                      }}
                    >
                      {person.First_Name} {person.Last_Name}
                    </ListItem>
                  ))}
                </>
              ) : (
                <ListItem style={{ color: '#9cb0b6' }}>
                  Please select a building to see the list of RAs for that building.
                </ListItem>
              )}
            </List>
          </CardContent>

          <CardActions>
            <Button variant="contained" onClick={onClickAssignPerson}>
              Assign Person
            </Button>
          </CardActions>
        </Card>

        {/* Assignments Section */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Assignments</Typography>
            <List>
              {filteredAssignments.length > 0 ? (
                filteredAssignments.map((assignment) => (
                  <ListItem key={assignment.Range_ID}>
                    <Box>
                      {assignment.First_Name} {assignment.Last_Name}: {assignment.Hall_Name}{' '}
                      {assignment.Room_Start} - {assignment.Room_End}
                    </Box>

                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      sx={{ ml: 1 }}
                      onClick={() => onClickRemoveAssignment(assignment.Range_ID)}
                    >
                      Remove
                    </Button>
                  </ListItem>
                ))
              ) : (
                <ListItem style={{ color: '#9cb0b6' }}>
                  Please select a building to see the list of assignments.
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>

        {/* Unassigned Rooms Section */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Unassigned Rooms</Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{ color: mode === 'dark' ? '#f8b619' : '#36b9ed' }}
            >
              The rooms below do not fall under any of the current room ranges.
            </Typography>
            <List>
              {filteredUnassigned.length > 0 ? (
                filteredUnassigned.map((room) => (
                  <ListItem key={room.Room_Number}>
                    <Box>{room.Room_Name}</Box>
                  </ListItem>
                ))
              ) : (
                <ListItem style={{ color: '#9cb0b6' }}>
                  No unassigned rooms available for the selected hall.
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>
      </Box>
      <SimpleSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default RoomRanges;
