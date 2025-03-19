import React, { useState, useEffect, useCallback } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import {
  fetchActiveRDOnCalls,
  fetchRDNames,
  createRDOnCall,
  updateRDOnCall,
  deleteRDOnCall,
} from 'services/residentLife/RD_OnCall';
import SimpleSnackbar from 'components/Snackbar';
import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';

const RDOnCallForm = () => {
  const { mode } = useColorScheme();
  const [onCallList, setOnCallList] = useState([]);
  const [rdNames, setRDNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [currentOnCall, setCurrentOnCall] = useState({
    On_Call_ID: null,
    RD_ID: '',
    Start_Date: '',
    End_Date: '',
  });

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

  useEffect(() => {
    loadRDNames();
    loadOnCallList();
  }, []);

  const loadRDNames = async () => {
    try {
      const names = await fetchRDNames();
      setRDNames(names);
    } catch (error) {
      console.error('Error fetching RD names:', error);
      createSnackbar(error, 'error');
    }
  };

  const loadOnCallList = async () => {
    setLoading(true);
    try {
      const response = await fetchActiveRDOnCalls();
      const transformed = response.map((item) => ({
        On_Call_ID: item.Record_ID,
        RD_ID: String(item.RD_ID),
        Start_Date: formatDateForInput(item.Start_Date),
        End_Date: formatDateForInput(item.End_Date),
      }));
      setOnCallList(transformed);
    } catch (error) {
      console.error('Error fetching on-call list:', error);
      createSnackbar(error, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format date for input field
  const formatDateForInput = (fullDateStr) => (fullDateStr ? fullDateStr.split('T')[0] : '');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentOnCall((prev) => ({ ...prev, [name]: value }));
  };

  // new on-call entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRDOnCall({
        rdId: +currentOnCall.RD_ID,
        Start_Date: currentOnCall.Start_Date,
        End_Date: currentOnCall.End_Date,
      });
      await loadOnCallList();
      resetOnCallForm();
      createSnackbar('Successfully created RD on-call record!', 'success');
    } catch (error) {
      console.error('Error creating RD On-Call:', error);
      createSnackbar(error, 'error');
    }
  };

  // existing on-call entry
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!currentOnCall.On_Call_ID) {
      const msg = 'No On_Call_ID found for editing.';
      console.error(msg);
      createSnackbar(msg, 'error');
      return;
    }
    try {
      await updateRDOnCall(currentOnCall.On_Call_ID, {
        RD_ID: +currentOnCall.RD_ID,
        Start_Date: currentOnCall.Start_Date,
        End_Date: currentOnCall.End_Date,
      });
      await loadOnCallList();
      resetOnCallForm();
      createSnackbar('Successfully updated RD on-call record!', 'success');
    } catch (error) {
      console.error('Error updating on-call entry:', error);
      createSnackbar(error, 'error');
    }
  };

  const editOnCall = (entry) => {
    setEditing(true);
    setCurrentOnCall({
      On_Call_ID: entry.On_Call_ID,
      RD_ID: entry.RD_ID,
      Start_Date: entry.Start_Date,
      End_Date: entry.End_Date,
    });
  };

  const deleteOnCallEntry = async (On_Call_ID) => {
    try {
      await deleteRDOnCall(On_Call_ID);
      setOnCallList((prev) => prev.filter((item) => item.On_Call_ID !== On_Call_ID));
      createSnackbar('Successfully deleted on-call entry!', 'success');
    } catch (error) {
      console.error('Error deleting on-call entry:', error);
      createSnackbar(error, 'error');
    }
  };

  const resetOnCallForm = () => {
    setEditing(false);
    setCurrentOnCall({
      On_Call_ID: null,
      RD_ID: '',
      Start_Date: '',
      End_Date: '',
    });
  };

  // convert rd id to name from rd list
  const getRDNameFromID = (rdid) => {
    const found = rdNames.find((rd) => rd.RD_ID === rdid);
    return found ? found.RD_Name : 'Unknown RD';
  };

  const housingadmin = useAuthGroups(AuthGroup.HousingAdmin);
  const RD = useAuthGroups(AuthGroup.ResidentDirector);
  const developer = useAuthGroups(AuthGroup.HousingDeveloper);

  if (housingadmin || RD || developer) {
    return (
      <>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Typography
              variant="h3"
              align="center"
              style={{
                color: mode === 'dark' ? '#f8b619' : '#36b9ed',
              }}
            >
              RD On-Call Scheduler
            </Typography>
          </Grid>

          {/* Form Scheduler */}
          <Grid item xs={12} md={5}>
            <Card elevation={3}>
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  style={{
                    color: mode === 'dark' ? '#f8b619' : '#36b9ed',
                  }}
                >
                  {editing ? 'Edit On-Call Entry' : 'Create On-Call Entry'}
                </Typography>

                <form onSubmit={editing ? handleEdit : handleSubmit}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>RD Name</InputLabel>
                    <Select
                      name="RD_ID"
                      value={currentOnCall.RD_ID}
                      onChange={handleInputChange}
                      required
                      label="RD Name"
                    >
                      {rdNames.map((rd) => (
                        <MenuItem key={rd.RD_ID} value={rd.RD_ID}>
                          {rd.RD_Name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    name="startDate"
                    InputLabelProps={{ shrink: true }}
                    value={currentOnCall.Start_Date}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    name="endDate"
                    InputLabelProps={{ shrink: true }}
                    value={currentOnCall.End_Date}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 2 }}
                  />

                  <Grid container spacing={2}>
                    {editing && (
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={resetOnCallForm}
                          fullWidth
                        >
                          Cancel Edit
                        </Button>
                      </Grid>
                    )}
                    <Grid item xs={editing ? 6 : 12}>
                      <Button variant="contained" color="secondary" type="submit" fullWidth>
                        {editing ? 'Save Changes' : 'Create Entry'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* On Call List */}
          <Grid item xs={12} md={5}>
            <Card elevation={3}>
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  style={{
                    color: mode === 'dark' ? '#f8b619' : '#36b9ed',
                  }}
                >
                  Current On-Call List
                </Typography>

                {loading ? (
                  <Typography color="textSecondary">Loading on-call entries...</Typography>
                ) : onCallList.length === 0 ? (
                  <Typography color="textSecondary">No active on-call entries</Typography>
                ) : (
                  <div style={{ height: '600px', overflow: 'hidden' }}>
                    <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
                      {onCallList.map((entry) => (
                        <Card
                          key={entry.On_Call_ID}
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
                              <strong>RD: {getRDNameFromID(entry.RD_ID)}</strong>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              <strong>Start Date:</strong> {entry.Start_Date}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              <strong>End Date:</strong> {entry.End_Date}
                            </Typography>
                          </div>

                          <div style={{ marginBottom: '16px' }}>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              onClick={() => editOnCall(entry)}
                              style={{ marginRight: '16px' }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={async () => {
                                await deleteOnCallEntry(entry.On_Call_ID);
                                loadOnCallList();
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
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
      </>
    );
  }
};

export default RDOnCallForm;
