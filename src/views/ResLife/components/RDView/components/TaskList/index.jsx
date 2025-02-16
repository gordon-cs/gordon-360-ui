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
import { addTask, editTask, fetchTasks, removeTask } from 'services/residentLife/RD_TaskList';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedHall, setSelectedHall] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    taskID: null,
    name: '',
    description: '',
    hallId: '',
    isRecurring: false,
    frequency: '',
    interval: 0,
    startDate: '',
    endDate: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (selectedHall) {
      loadTasks(selectedHall);
    }
  }, [selectedHall]);

  const loadTasks = async (hallId) => {
    setLoading(true);

    try {
      const response = await fetchTasks(hallId);
      console.log('response', response);
      setTasks((prevTasks) => {
        if (
          prevTasks.length !== response.length ||
          !prevTasks.every((task, index) => task.TaskID === response[index]?.TaskID)
        ) {
          return response;
        }
        return prevTasks;
      });
      console.log('tasks', tasks);
    } catch (error) {
      console.error('Error fetching RA/ACs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCurrentTask((prevTask) => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { ...currentTask, hallId: selectedHall };
      await addTask(newTask);
      loadTasks(selectedHall);
      resetTaskForm();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      if (!currentTask.taskID) {
        console.error('Error: Task ID is missing');
        return;
      }

      const updatedTask = { ...currentTask, hallId: selectedHall };
      await editTask(currentTask.taskID, updatedTask);
      loadTasks(selectedHall);
      resetTaskForm();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const editTask = (task) => {
    //setCurrentTask(task);
    setCurrentTask({
      taskID: task.TaskID,
      name: task.Name,
      description: task.Description,
      hallId: task.HallID,
      isRecurring: task.IsRecurring,
      frequency: task.Frequency,
      interval: task.Interval,
      startDate: task.StartDate ? task.StartDate.split('T')[0] : '',
      endDate: task.EndDate ? task.EndDate.split('T')[0] : '',
    });
    setEditing(true);
  };

  const deleteTask = async (taskID) => {
    try {
      await removeTask(taskID);
      setTasks(tasks.filter((task) => task.taskID !== taskID));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

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

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <h1 style={{ textAlign: 'center' }}>Task Manager</h1>
      </Grid>

      <Grid item xs={10}>
        <h2>Choose a Building</h2>
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
                value={currentTask.name || ''}
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
                value={currentTask.description || ''}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                name="startDate"
                InputLabelProps={{ shrink: true }}
                value={currentTask.startDate ? currentTask.startDate.split('T')[0] : ''}
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
                value={currentTask.endDate ? currentTask.endDate.split('T')[0] : ''}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="isRecurring"
                    checked={!!currentTask.isRecurring} // Ensures boolean value
                    onChange={(e) =>
                      handleInputChange({
                        target: { name: 'isRecurring', value: e.target.checked },
                      })
                    }
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
                    inputProps={{ min: 1 }}
                    required
                    sx={{ mb: 2 }}
                  />
                </>
              )}

              <Button variant="contained" color="primary" type="submit" fullWidth>
                {editing ? 'Edit Task' : 'Create Task'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={5}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Task List ({hallDisplayNames[selectedHall] || selectedHall})
            </Typography>
            {loading ? (
              <Typography color="textSecondary">Loading tasks...</Typography>
            ) : tasks.length === 0 ? (
              <Typography color="textSecondary">No tasks for this building</Typography>
            ) : (
              <ol>
                {tasks.map((task) => (
                  <li
                    key={task.taskID}
                    className="p-2 border rounded-lg bg-gray-100"
                    style={{ marginBottom: '16px' }}
                  >
                    <div>
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
                    <div className="flex gap-2">
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
                          loadTasks(selectedHall); // Function to reload the task list
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TaskList;
