import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  FormControlLabel,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import {
  createStatus,
  removeStatus,
  updateStatus,
  getActiveStatusListForRA,
  getDailyStatusListForRA,
} from 'services/residentLife/Status';
import { useColorScheme } from '@mui/material/styles';
import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';

const StatusManager = () => {
  const { mode } = useColorScheme();
  const [statusList, setStatusList] = useState([]);
  const [RA, setRA] = useState('50223925');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  // const { profile } = useUser();

  // All parameters of a status that will be filled later
  const [currentStatus, setCurrentStatus] = useState({
    // StatusID: '',
    StatusName: '',
    RaID: '',
    IsRecurring: true,
    Frequency: '',
    Interval: 0,
    Start_Time: '',
    End_Time: '',
    startDate: '',
    endDate: '',
    Created_Date: '',
    Available: true,
  });

  // UseEffect - Immediately runs `loadStatusList`
  useEffect(() => {
    loadStatusList(RA);
  }, [RA]);

  // Function to get all the statuses from the selected hall
  const loadStatusList = async (RaID) => {
    setLoading(true);

    try {
      // Wait until all statuses are fetched from API
      // const response = await getDailyStatusListForRA(RaID);
      const response = await getActiveStatusListForRA(RaID);
      console.log('getActiveStatusListForRA response', response);

      // prevStatuses - represents current state of value before any changes
      // if length changes or some task IDs do not match, return new task array
      // else nothing has changed, so return prevStatuses
      setStatusList((prevStatuses) => {
        if (
          prevStatuses.length !== response.length ||
          !prevStatuses.every((status, index) => status.statusID === response[index]?.StatusID)
        ) {
          return response;
        }
        return prevStatuses;
      });
    } catch (error) {
      console.error('Error fetching hall statuses:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEditedStatusList = async (RaID) => {
    setLoading(true);

    try {
      // Wait until all statuses are fetched from API
      // const response = await getDailyStatusListForRA(RaID);
      const response = await getActiveStatusListForRA(RaID);
      console.log('getActiveStatusListForRA edit response', response);
      setStatusList(response);
    } catch (error) {
      console.error('Error fetching RA statuses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle changes in the form
  // const handleInputChange = (e) => {
  //   const { name, value, type, checked } = e.target;

  //   setCurrentStatus((prevStatus) => {
  //     let updatedStatus = { ...prevStatus, [name]: type === 'checkbox' ? checked : value };

  //     // If "Recurring Status" is unchecked, set endDate to startDate
  //     if (name === 'isRecurring') {
  //       if (!checked) {
  //         updatedStatus.endDate = prevStatus.startDate;
  //       } else {
  //         updatedStatus.endDate = ''; // Allow user to manually enter an end date when checked
  //       }
  //     }

  //     return updatedStatus;
  //   });
  // };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCurrentStatus((prevStatus) => {
      let updatedStatus = { ...prevStatus, [name]: type === 'checkbox' ? checked : value };

      // If "Recurring Status" is unchecked, set endDate to startDate
      if (name === 'isRecurring') {
        if (!checked) {
          updatedStatus.endDate = prevStatus.startDate;
        } else {
          updatedStatus.endDate = ''; // Allow user to manually enter an end date when checked
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
      console.log('RA:', RA);
      const newStatus = { ...currentStatus, RaID: RA };
      console.log('newStatus', newStatus);
      console.log('About to run addStatus');
      await createStatus(newStatus);
      console.log('Ran addStatus');

      console.log('About to run loadStatusList');
      loadStatusList(RA);
      console.log('Ran loadStatusList');

      resetStatusForm();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // // Function to handle form submission when adding updated statuses
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      // Check if the task has a task ID
      if (!currentStatus.StatusID) {
        console.error('Error: Status ID is missing');
        return;
      }

      const updatedStatus = { ...currentStatus, RaID: RA };
      console.log('edited Status:', updatedStatus);
      console.log('About to run updateStatus');
      await updateStatus(currentStatus.StatusID, updatedStatus);
      console.log('Ran updateStatus');

      console.log('About to run loadStatusList');
      loadEditedStatusList(RA);
      console.log('Ran loadStatusList');

      resetStatusForm();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  // Function to fill in the form with data that user wants to edit
  // Names go off of ViewModel
  const editStatus = (status) => {
    console.log('Status', status);
    setCurrentStatus({
      StatusID: status.StatusID,
      StatusName: status.StatusName,
      RaID: status.RaID,
      IsRecurring: status?.IsRecurring,
      Frequency: status.Frequency,
      Interval: status.Interval,
      startDate: status.StartDate ? status.StartDate.split('T')[0] : '',
      endDate: status.EndDate ? status.EndDate.split('T')[0] : '', // should be uppercase
      Start_Time: status.Start_Time,
      End_Time: status.End_Time,
      Available: true,
    });
    console.log('current Status:', currentStatus);
    setEditing(true);
  };

  const cancelEdit = () => {
    resetStatusForm();
  };

  // Function to delete a status
  const deleteStatus = async (statusID) => {
    try {
      await removeStatus(statusID);
      setStatusList(statusList.filter((status) => status.statusID !== statusID));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Function to reset the form inputs
  const resetStatusForm = () => {
    setCurrentStatus({
      StatusName: '',
      RaID: '',
      IsRecurring: true,
      Frequency: '',
      Interval: 0,
      Start_Time: null,
      End_Time: null,
      startDate: '',
      endDate: '',
      Created_Date: '',
      Available: true,
    });
    setEditing(false);
  };

  const housingadmin = useAuthGroups(AuthGroup.HousingAdmin);
  const RD = useAuthGroups(AuthGroup.ResidentDirector);
  const developer = useAuthGroups(AuthGroup.HousingDeveloper);

  if (housingadmin || RD || developer) {
    return (
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
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
                  name="StatusName"
                  value={currentStatus.StatusName}
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
                  label={currentStatus.IsRecurring ? 'Start Date' : 'Status Date'}
                  type="date"
                  name="startDate"
                  InputLabelProps={{ shrink: true }}
                  value={currentStatus.startDate ? currentStatus.startDate.split('T')[0] : ''}
                  onChange={(e) => {
                    handleInputChange(e);
                    if (!currentStatus.IsRecurring) {
                      setCurrentStatus((prevStatus) => ({
                        ...prevStatus,
                        endDate: e.target.value,
                      }));
                    }
                  }}
                  required
                  sx={{ mb: 2 }}
                />

                {currentStatus.IsRecurring && (
                  <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    name="endDate"
                    InputLabelProps={{ shrink: true }}
                    value={currentStatus.endDate ? currentStatus.endDate.split('T')[0] : ''}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 2 }}
                  />
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
                      name="IsRecurring"
                      checked={currentStatus.IsRecurring}
                      onChange={handleInputChange}
                    />
                  }
                  label="Recurring Status"
                />

                {currentStatus.IsRecurring && (
                  <>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Frequency</InputLabel>
                      <Select
                        name="Frequency"
                        value={currentStatus.Frequency || ''}
                        onChange={handleInputChange}
                        required
                        label="Frequency"
                      >
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      label="Interval"
                      type="number"
                      name="Interval"
                      value={currentStatus.Interval || ''}
                      onChange={handleInputChange}
                      inputProps={{
                        min: 1,
                        placeholder: currentStatus.Interval
                          ? `Current: ${currentStatus.Interval}`
                          : 'How often will this status be repeated? (e.g. Weekly 2 = bi-weekly)',
                      }}
                      required
                      sx={{ mb: 2 }}
                    />
                  </>
                )}

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
                Status by Day
              </Typography>
              {loading ? (
                <Typography color="textSecondary">Loading status list...</Typography>
              ) : statusList.length === 0 ? (
                <Typography color="textSecondary">No status for this day</Typography>
              ) : (
                <div style={{ height: '600px', overflow: 'hidden' }}>
                  <dt style={{ maxHeight: '100%', overflowY: 'auto' }}>
                    {statusList.map((status) => (
                      <Card
                        key={status.StatusID}
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
                            <strong>{status.StatusName}</strong>
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Start Date: </strong>{' '}
                            {new Date(status.StartDate).toLocaleDateString('en-US', {
                              //change back to Start_Date
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>End Date: </strong>{' '}
                            {new Date(status.EndDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Start Time: </strong> {status.Start_Time}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>End Time: </strong> {status.End_Time}
                          </Typography>

                          {status.Frequency && (
                            <>
                              <Typography variant="body2" color="textSecondary">
                                <strong>Frequency: </strong> {status.Frequency}
                              </Typography>

                              <Typography variant="body2" color="textSecondary">
                                <strong>Interval: </strong> {status.Interval}
                              </Typography>
                            </>
                          )}

                          <Typography variant="body2" color="textSecondary">
                            <strong>Available: </strong> {status.Available ? 'Yes' : 'No'}
                          </Typography>
                        </div>
                        <div className="flex gap-2" style={{ marginBottom: '16px' }}>
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
                            onClick={async () => {
                              await deleteStatus(status.StatusID);
                              loadStatusList(RA);
                            }}
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
    );
  }
};

export default StatusManager;
