import { useState, useEffect, useCallback } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControlLabel,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router';

import {
  createStatus,
  removeStatus,
  updateStatus,
  getActiveStatusListForRA,
} from 'services/residentLife/RA_Statuses';
import SimpleSnackbar from 'components/Snackbar';
import { useColorScheme } from '@mui/material/styles';
import { useUser } from 'hooks';

// Days options for the multi-select
const daysOptions = [
  { value: 'sun', label: 'Sunday' },
  { value: 'mon', label: 'Monday' },
  { value: 'tue', label: 'Tuesday' },
  { value: 'wed', label: 'Wednesday' },
  { value: 'thu', label: 'Thursday' },
  { value: 'fri', label: 'Friday' },
  { value: 'sat', label: 'Saturday' },
];

const StatusManager = () => {
  const { mode } = useColorScheme();
  const [selectedDay, setSelectedDay] = useState('');
  const [daysWithEvents, setDaysWithEvents] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const { profile } = useUser();
  const [confirmDeleteStatus, setConfirmDeleteStatus] = useState(null);
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

  // All parameters of a status that will be filled later
  const [currentStatus, setCurrentStatus] = useState({
    Status_Name: '',
    RA_ID: '',
    Is_Recurring: false,
    Days_Of_Week: [],
    Start_Time: '',
    End_Time: '',
    Start_Date: '',
    End_Date: '',
    Available: true,
  });

  useEffect(() => {
    if (selectedDay) {
      loadStatusListByDay(profile?.ID, selectedDay);
    }
  }, [profile, selectedDay]);

  useEffect(() => {
    if (profile?.ID) {
      loadDaysWithEvents(profile.ID);
    }
  }, [profile]);

  const loadDaysWithEvents = async (RA_ID) => {
    try {
      const response = await getActiveStatusListForRA(RA_ID);
      const activeDays = new Set();

      response.forEach((status) => {
        if (status.Days_Of_Week) {
          const days = status.Days_Of_Week.split(',');
          days.forEach((d) => activeDays.add(d));
        }
      });

      setDaysWithEvents(Array.from(activeDays));
    } catch (error) {
      console.error('Error loading days with events', error);
    }
  };

  const loadStatusListByDay = async (RA_ID, day) => {
    setLoading(true);
    try {
      const response = await getActiveStatusListForRA(RA_ID);

      // Filter statuses that match the selected day
      const filteredStatuses = response.filter((status) => {
        if (status.Days_Of_Week && typeof status.Days_Of_Week === 'string') {
          return status.Days_Of_Week.split(',').includes(day);
        }
        return false;
      });

      console.log('Filtered status list for the day:', filteredStatuses);
      setStatusList(filteredStatuses);
    } catch (error) {
      console.error('Error fetching status by day', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEditedStatusListByDay = async (RA_ID, day) => {
    setLoading(true);
    try {
      const response = await getActiveStatusListForRA(RA_ID);

      // Filter statuses that match the selected day
      const filteredStatuses = response.filter((status) => {
        if (status.Days_Of_Week && typeof status.Days_Of_Week === 'string') {
          return status.Days_Of_Week.split(',').includes(day);
        }
        return false;
      });

      console.log('Filtered status list for the day:', filteredStatuses);
      setStatusList(filteredStatuses);
    } catch (error) {
      console.error('Error fetching status by day', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCurrentStatus((prevStatus) => {
      let updatedStatus = { ...prevStatus, [name]: type === 'checkbox' ? checked : value };

      // When turning off recurring, clear Days_Of_Week and set End_Date equal to Start_Date.
      if (name === 'Is_Recurring') {
        if (!checked) {
          updatedStatus.End_Date = prevStatus.Start_Date;
          updatedStatus.Days_Of_Week = [];
        } else {
          updatedStatus.End_Date = ''; // Allow user to manually enter an end date when checked
        }
      }

      // If handling time input, store it in 24-hour format
      if (name === 'Start_Time' || name === 'End_Time') {
        updatedStatus[name] = dayjs(value).format('HH:mm');
      }
      return updatedStatus;
    });
  };

  // Function to handle form submission when adding new statuses
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the website from reloading
    try {
      let newStatus = { ...currentStatus, RA_ID: profile.ID };
      // Convert the Days_Of_Week array to a comma-separated string for the API
      if (newStatus.Is_Recurring) {
        if (Array.isArray(newStatus.Days_Of_Week) && newStatus.Days_Of_Week.length > 0) {
          newStatus.Days_Of_Week = newStatus.Days_Of_Week.join(',');
        }
      } else {
        const dayOfWeek = dayjs(newStatus.Start_Date).format('ddd').toLowerCase();
        newStatus.Days_Of_Week = dayOfWeek; // Set the status date's calculated day of the week
      }
      console.log('newStatus', newStatus);
      await createStatus(newStatus);
      createSnackbar('Status created successfully!', 'success');
      loadStatusListByDay(profile.ID, selectedDay);
      loadDaysWithEvents(profile.ID);
      resetStatusForm();
    } catch (error) {
      console.error('Error adding status:', error);
      createSnackbar('Error creating status: ' + error.error, 'error');
    }
  };

  // // Function to handle form submission when adding updated statuses
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      // Check if the task has a task ID
      if (!currentStatus.Status_ID) {
        console.error('Error: Status ID is missing');
        createSnackbar('Error: Status ID is missing', 'error');
        return;
      }
      let updatedStatus = { ...currentStatus, RA_ID: profile.ID };
      // Convert the Days_Of_Week array to a comma-separated string for the API
      if (updatedStatus.Is_Recurring) {
        if (Array.isArray(updatedStatus.Days_Of_Week) && updatedStatus.Days_Of_Week.length > 0) {
          updatedStatus.Days_Of_Week = updatedStatus.Days_Of_Week.join(',');
        }
      } else {
        const dayOfWeek = dayjs(updatedStatus.Start_Date).format('ddd').toLowerCase();
        updatedStatus.Days_Of_Week = dayOfWeek; // Set the status date's calculated day of the week
      }
      console.log('edited Status:', updatedStatus);
      await updateStatus(currentStatus.Status_ID, updatedStatus);
      loadEditedStatusListByDay(profile.ID, selectedDay);
      loadDaysWithEvents(profile.ID);
      resetStatusForm();
      createSnackbar('Status updated successfully!', 'success');
    } catch (error) {
      console.error('Error editing status:', error);
      createSnackbar('Error updating status: ' + error.error, 'error');
    }
  };

  // Function to fill in the form with data that user wants to edit
  // Names go off of ViewModel
  const editStatus = (status) => {
    console.log('Status', status);
    setCurrentStatus({
      Status_ID: status.Status_ID,
      Status_Name: status.Status_Name,
      RA_ID: status.RA_ID,
      Is_Recurring: status?.Is_Recurring,
      Days_Of_Week: status.Days_Of_Week ? status.Days_Of_Week.split(',') : [], //split csv into array
      Start_Date: status.Start_Date ? status.Start_Date.split('T')[0] : '',
      End_Date: status.End_Date ? status.End_Date.split('T')[0] : '',
      Start_Time: status.Start_Time,
      End_Time: status.End_Time,
      Available: status.Available,
    });
    setEditing(true);
  };

  const cancelEdit = () => {
    resetStatusForm();
  };

  // Function to delete a status
  const deleteStatus = async (StatusID) => {
    try {
      await removeStatus(StatusID);
      setStatusList(statusList.filter((status) => status.Status_ID !== StatusID));
      loadDaysWithEvents(profile.ID);
      createSnackbar('Status deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting status:', error);
      createSnackbar('Error deleting status: ' + error.error, 'error');
    }
  };

  // Function to reset the form inputs
  const resetStatusForm = () => {
    setCurrentStatus({
      Status_Name: '',
      RA_ID: '',
      Is_Recurring: false,
      Days_Of_Week: [],
      Start_Time: '',
      End_Time: '',
      Start_Date: '',
      End_Date: '',
      Available: true,
    });
    setEditing(false);
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Grid container alignItems="center">
            {/* Left column: Go Back button */}
            <Grid
              item
              xs={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                Back to ResLife
              </Button>
            </Grid>

            {/* Middle column: page heading */}
            <Grid item xs={4}>
              <Typography
                variant="h3"
                align="center"
                style={{
                  color: mode === 'dark' ? '#f8b619' : '#36b9ed',
                }}
              >
                Status Manager
              </Typography>
            </Grid>
            <Grid item xs={4} />
          </Grid>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {editing ? 'Edit Status' : 'Create Status'}
              </Typography>
              <form onSubmit={editing ? handleEdit : handleSubmit}>
                <TextField
                  fullWidth
                  label="Status Name"
                  name="Status_Name"
                  value={currentStatus.Status_Name}
                  onChange={handleInputChange}
                  required
                  sx={{ mb: 2 }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                      <TimePicker
                        label="Start Time"
                        name="Start_Time"
                        value={
                          currentStatus.Start_Time ? dayjs(currentStatus.Start_Time, 'HH:mm') : null
                        }
                        onChange={(newValue) =>
                          setCurrentStatus((prev) => ({
                            ...prev,
                            Start_Time: dayjs(newValue).format('HH:mm'),
                          }))
                        }
                        required
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <TimePicker
                        label="End Time"
                        name="End_Time"
                        value={
                          currentStatus.End_Time ? dayjs(currentStatus.End_Time, 'HH:mm') : null
                        }
                        onChange={(newValue) =>
                          setCurrentStatus((prev) => ({
                            ...prev,
                            End_Time: dayjs(newValue).format('HH:mm'),
                          }))
                        }
                        required
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>
                <TextField
                  fullWidth
                  label={currentStatus.Is_Recurring ? 'Start Date' : 'Status Date'}
                  type="date"
                  name="Start_Date"
                  InputLabelProps={{ shrink: true }}
                  value={currentStatus.Start_Date ? currentStatus.Start_Date.split('T')[0] : ''}
                  onChange={(e) => {
                    handleInputChange(e);
                    if (!currentStatus.Is_Recurring) {
                      setCurrentStatus((prevStatus) => ({
                        ...prevStatus,
                        End_Date: e.target.value,
                      }));
                    }
                  }}
                  required
                  sx={{ mb: 2 }}
                />
                {currentStatus.Is_Recurring && (
                  <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    name="End_Date"
                    InputLabelProps={{ shrink: true }}
                    value={currentStatus.End_Date ? currentStatus.End_Date.split('T')[0] : ''}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 2 }}
                  />
                )}
                {currentStatus.Is_Recurring && (
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="days-of-week-label">Days of Week</InputLabel>
                    <Select
                      labelId="days-of-week-label"
                      id="days-of-week"
                      multiple
                      name="Days_Of_Week"
                      value={currentStatus.Days_Of_Week || []}
                      onChange={(e) =>
                        setCurrentStatus((prev) => ({
                          ...prev,
                          Days_Of_Week: e.target.value,
                        }))
                      }
                      renderValue={(selected) => selected.join(', ')}
                      label="Days of Week"
                      required
                    >
                      {daysOptions.map((day) => (
                        <MenuItem key={day.value} value={day.value}>
                          <Checkbox
                            checked={
                              currentStatus.Days_Of_Week &&
                              currentStatus.Days_Of_Week.indexOf(day.value) > -1
                            }
                          />
                          <ListItemText primary={day.label} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Available"
                      checked={currentStatus.Available}
                      onChange={handleInputChange}
                    />
                  }
                  label="Available"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Is_Recurring"
                      checked={currentStatus.Is_Recurring}
                      onChange={handleInputChange}
                    />
                  }
                  label="Recurring Status"
                />
                <Grid container spacing={2}>
                  {editing && (
                    <Grid item xs={6}>
                      <Button variant="contained" color="primary" onClick={cancelEdit} fullWidth>
                        Cancel Edit
                      </Button>
                    </Grid>
                  )}
                  <Grid item xs={editing ? 6 : 12}>
                    <Button variant="contained" color="secondary" type="submit" fullWidth>
                      {editing ? 'Save Changes' : 'Create Status'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {profile?.FirstName || 'User'}'s Status List
              </Typography>

              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Days with events are highlighted in blue.
              </Typography>

              <FormControl fullWidth>
                <InputLabel id="selected-day-label">Select A Day</InputLabel>
                <Select
                  label="Select a day"
                  value={selectedDay || ''}
                  onChange={async (event) => {
                    setSelectedDay(event.target.value);
                    if (selectedDay) {
                      await loadStatusListByDay(profile?.ID, selectedDay);
                    }
                  }}
                  fullWidth
                  margin="normal"
                >
                  {daysOptions.map((day) => (
                    <MenuItem
                      key={day.value}
                      value={day.value}
                      style={daysWithEvents.includes(day.value) ? { color: '#00AEEF' } : {}}
                    >
                      <ListItemText primary={`${day.label}`} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box mb="2vh" />
              {loading ? (
                <Typography color="textSecondary">Loading status list...</Typography>
              ) : statusList.length === 0 ? (
                <Typography color="textSecondary">No status for this day</Typography>
              ) : (
                <div style={{ height: '600px', overflow: 'hidden' }}>
                  <dt style={{ maxHeight: '100%', overflowY: 'auto' }}>
                    {statusList.map((status) => (
                      <Card
                        key={status.Status_ID}
                        className="p-2 border rounded-lg bg-gray-100"
                        style={{
                          marginBottom: '16px',
                          textAlign: 'center',
                          border: `2px solid ${mode === 'dark' ? '#f8b619' : '#36b9ed'}`,
                          backgroundColor: mode === 'dark' ? '#033948' : '#d3e4fd',
                        }}
                      >
                        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            <strong>{status.Status_Name}</strong>
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Start Date: </strong>{' '}
                            {new Date(status.Start_Date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>End Date: </strong>{' '}
                            {new Date(status.End_Date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Start Time: </strong>{' '}
                            {dayjs(status.Start_Time, 'HH:mm').format('hh:mm A')}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>End Time: </strong>{' '}
                            {dayjs(status.End_Time, 'HH:mm').format('hh:mm A')}
                          </Typography>
                          {status.Days_Of_Week && (
                            <Typography variant="body2" color="textSecondary">
                              <strong>Days: </strong> {status.Days_Of_Week}
                            </Typography>
                          )}
                          <Typography variant="body2" color="textSecondary">
                            <strong>Available: </strong> {status.Available ? 'Yes' : 'No'}
                          </Typography>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => editStatus(status)}
                            sx={{ mr: 3 }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => setConfirmDeleteStatus(status)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </dt>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <SimpleSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
      <Dialog open={!!confirmDeleteStatus} onClose={() => setConfirmDeleteStatus(null)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this status?
            {confirmDeleteStatus?.Is_Recurring && (
              <>
                <br />
                <strong>This will delete all events in the recurring series.</strong>
              </>
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              editStatus(confirmDeleteStatus);
              setConfirmDeleteStatus(null);
            }}
            color="primary"
          >
            Edit Instead
          </Button>
          <Button onClick={() => setConfirmDeleteStatus(null)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await deleteStatus(confirmDeleteStatus.Status_ID);
              await loadDaysWithEvents(profile.ID);
              await loadEditedStatusListByDay(profile.ID, selectedDay);
              setConfirmDeleteStatus(null);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StatusManager;
