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
import { addTask, updateTask, fetchTasks, removeTask } from 'services/residentLife/RD_TaskList';
import { useColorScheme } from '@mui/material/styles';
import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';

const TaskList = () => {
  const { mode } = useColorScheme();
  const [tasks, setTasks] = useState([]);
  const [selectedHall, setSelectedHall] = useState('');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  // All parameters of a task that will be filled later
  const [currentTask, setCurrentTask] = useState({
    // taskID: null,
    name: '',
    description: '',
    hallId: '',
    isRecurring: false,
    frequency: '',
    interval: 0,
    startDate: '',
    endDate: '',
  });

  // UseEffect - Immediately runs `loadTasks`
  useEffect(() => {
    if (selectedHall) {
      loadTasks(selectedHall);
    }
  }, [selectedHall]);

  // Function to get all the tasks from the selected hall
  const loadTasks = async (hallId) => {
    setLoading(true);

    try {
      // Wait until all tasks are fetched from API
      const response = await fetchTasks(hallId);
      console.log('fetchTasks response', response);

      // prevTasks - represents current state of value before any changes
      // if length changes or some task IDs do not match, return new task array
      // else nothing has changed, so return prevTasks
      setTasks((prevTasks) => {
        if (
          prevTasks.length !== response.length ||
          !prevTasks.every((task, index) => task.TaskID === response[index]?.TaskID)
        ) {
          return response;
        }
        return prevTasks;
      });
    } catch (error) {
      console.error('Error fetching hall tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEditedTasks = async (hallId) => {
    setLoading(true);

    try {
      // Wait until all tasks are fetched from API
      const response = await fetchTasks(hallId);
      console.log('fetchTasks response', response);

      // prevTasks - represents current state of value before any changes
      // if length changes or some task IDs do not match, return new task array
      // else nothing has changed, so return prevTasks
      setTasks(response);
    } catch (error) {
      console.error('Error fetching hall tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCurrentTask((prevTask) => {
      let updatedTask = { ...prevTask, [name]: type === 'checkbox' ? checked : value };

      // If "Recurring Task" is unchecked, set endDate to startDate
      if (name === 'isRecurring') {
        if (!checked) {
          updatedTask.endDate = prevTask.startDate;
        } else {
          updatedTask.endDate = ''; // Allow user to manually enter an end date when checked
        }
      }

      return updatedTask;
    });
  };

  // Function to handle form submission when adding new tasks
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the website from reloading
    try {
      const newTask = { ...currentTask, hallId: selectedHall };

      console.log('About to run addTask');
      await addTask(newTask);
      console.log('Ran addTask');

      console.log('About to run loadTasks');
      loadTasks(selectedHall);
      console.log('Ran loadTasks');

      resetTaskForm();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // // Function to handle form submission when adding updated tasks
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      // Check if the task has a task ID
      if (!currentTask.taskID) {
        console.error('Error: Task ID is missing');
        return;
      }

      const updatedTask = { ...currentTask, hallId: selectedHall };

      console.log('About to run updateTask');
      await updateTask(currentTask.taskID, updatedTask);
      console.log('Ran updateTasks');

      console.log('About to run loadTasks');
      loadEditedTasks(selectedHall);
      console.log('Ran loadTasks');

      resetTaskForm();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  // Function to fill in the form with data that user wants to edit
  const editTask = (task) => {
    setCurrentTask({
      taskID: task.TaskID,
      name: task.Name,
      description: task.Description,
      hallId: task.HallID,
      isRecurring: task?.IsRecurring,
      frequency: task.Frequency,
      interval: task.Interval,
      startDate: task.StartDate ? task.StartDate.split('T')[0] : '',
      endDate: task.EndDate ? task.EndDate.split('T')[0] : '',
    });
    setEditing(true);
  };

  const cancelEdit = () => {
    resetTaskForm();
  };

  // Function to delete a task
  const deleteTask = async (taskID) => {
    try {
      await removeTask(taskID);
      setTasks(tasks.filter((task) => task.taskID !== taskID));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Function to reset the form inputs
  const resetTaskForm = () => {
    setCurrentTask({
      name: '',
      description: '',
      hallId: selectedHall,
      isRecurring: false,
      frequency: '',
      interval: 0,
      startDate: '',
      endDate: '',
    });
    setEditing(false);
  };

  const hallDisplayNames = {
    BRO: 'Bromley',
    FER: 'Ferrin',
    WIL: 'Wilson',
    EVN: 'Evans',
    CHA: 'Chase',
    TAV: 'Tavilla',
    NYL: 'Nyland',
    FUL: 'Fulton',
    GRA: 'Grace',
    MCI: 'MacInnis',
    CON: 'Conrad',
    RID: 'Rider',
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
            Task Manager
          </Typography>
        </Grid>

        <Grid item xs={10}>
          <Typography
            variant="h6"
            fontWeight="bold"
            align="left"
            style={{
              color: mode === 'dark' ? '#f8b619' : '#36b9ed',
            }}
          >
            Select a Hall
          </Typography>
          <FormControl fullWidth>
            <Select value={selectedHall} onChange={(e) => setSelectedHall(e.target.value)}>
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
        </Grid>

        <Grid item xs={12} md={5}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {editing ? 'Edit Task' : 'Create Task'}
              </Typography>

              <form onSubmit={editing ? handleEdit : handleSubmit}>
                <TextField
                  fullWidth
                  label="Task Name"
                  name="name"
                  // value={currentTask.name || ''
                  value={currentTask.name}
                  onChange={handleInputChange}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Description (Optional)"
                  name="description"
                  multiline
                  rows={3}
                  // value={currentTask.description || ''}
                  value={currentTask.description}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label={currentTask.isRecurring ? 'Start Date' : 'Task Date'}
                  type="date"
                  name="startDate"
                  InputLabelProps={{ shrink: true }}
                  value={currentTask.startDate ? currentTask.startDate.split('T')[0] : ''}
                  onChange={(e) => {
                    handleInputChange(e);
                    if (!currentTask.isRecurring) {
                      setCurrentTask((prevTask) => ({ ...prevTask, endDate: e.target.value }));
                    }
                  }}
                  required
                  sx={{ mb: 2 }}
                />

                {currentTask.isRecurring && (
                  <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    name="endDate"
                    InputLabelProps={{ shrink: true }}
                    value={currentTask.endDate ? currentTask.endDate.split('T')[0] : ''}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 2 }}
                  />
                )}

                <FormControlLabel
                  control={
                    <Checkbox
                      name="isRecurring"
                      checked={currentTask.isRecurring}
                      onChange={handleInputChange}
                    />
                  }
                  label="Recurring Task"
                />

                {currentTask.isRecurring && (
                  <>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Frequency</InputLabel>
                      <Select
                        name="frequency"
                        value={currentTask.frequency || ''}
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
                      name="interval"
                      value={currentTask.interval || ''}
                      onChange={handleInputChange}
                      inputProps={{
                        min: 1,
                        placeholder: currentTask.interval
                          ? `Current: ${currentTask.interval}`
                          : 'How often will this task be repeated? (e.g. Weekly 2 = bi-weekly)',
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
                      {editing ? 'Save Changes' : 'Create Task'}
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
                Task List ({hallDisplayNames[selectedHall] || selectedHall})
              </Typography>
              {loading ? (
                <Typography color="textSecondary">Loading tasks...</Typography>
              ) : tasks.length === 0 ? (
                <Typography color="textSecondary">No tasks for this building</Typography>
              ) : (
                <div style={{ height: '600px', overflow: 'hidden' }}>
                  <dt style={{ maxHeight: '100%', overflowY: 'auto' }}>
                    {tasks.map((task) => (
                      <Card
                        key={task.taskID}
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
                            <strong>{task.Name}</strong>
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Start Date: </strong>{' '}
                            {new Date(task.StartDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>End Date: </strong>{' '}
                            {new Date(task.EndDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </Typography>

                          {task.Frequency && (
                            <>
                              <Typography variant="body2" color="textSecondary">
                                <strong>Frequency: </strong> {task.Frequency}
                              </Typography>

                              <Typography variant="body2" color="textSecondary">
                                <strong>Interval: </strong> {task.Interval}
                              </Typography>
                            </>
                          )}
                        </div>
                        <div className="flex gap-2" style={{ marginBottom: '16px' }}>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => editTask(task)}
                            sx={{ mr: 3 }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={async () => {
                              await deleteTask(task.TaskID);
                              loadTasks(selectedHall);
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

export default TaskList;
