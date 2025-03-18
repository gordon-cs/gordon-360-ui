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
    on_Call_ID: null,
    RD_ID: '',
    start_Date: '',
    end_Date: '',
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
        onCallID: item.RecoRD_ID,
        RD_ID: String(item.RD_ID),
        startDate: formatDateForInput(item.Start_Date),
        endDate: formatDateForInput(item.End_Date),
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
        startDate: currentOnCall.start_Date,
        endDate: currentOnCall.end_Date,
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
    if (!currentOnCall.on_Call_ID) {
      const msg = 'No onCallID found for editing.';
      console.error(msg);
      createSnackbar(msg, 'error');
      return;
    }
    try {
      await updateRDOnCall(currentOnCall.on_Call_ID, {
        RD_ID: +currentOnCall.RD_ID,
        Start_Date: currentOnCall.start_Date,
        End_Date: currentOnCall.end_Date,
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
      onCallID: entry.on_Call_ID,
      RD_ID: entry.RD_ID,
      startDate: entry.start_Date,
      endDate: entry.end_Date,
    });
  };

  const deleteOnCallEntry = async (onCallID) => {
    try {
      await deleteRDOnCall(onCallID);
      setOnCallList((prev) => prev.filter((item) => item.on_Call_ID !== onCallID));
      createSnackbar('Successfully deleted on-call entry!', 'success');
    } catch (error) {
      console.error('Error deleting on-call entry:', error);
      createSnackbar(error, 'error');
    }
  };

  const resetOnCallForm = () => {
    setEditing(false);
    setCurrentOnCall({
      onCallID: null,
      RD_ID: '',
      startDate: '',
      endDate: '',
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
                    value={currentOnCall.start_Date}
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
                    value={currentOnCall.end_Date}
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
                          key={entry.onCallID}
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
                              <strong>Start Date:</strong> {entry.start_Date}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              <strong>End Date:</strong> {entry.end_Date}
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
                                await deleteOnCallEntry(entry.on_Call_ID);
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
