import React, { useState } from 'react';
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

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedArea, setSelectedArea] = useState('work');
  const [currentTask, setCurrentTask] = useState({
    id: null,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    isRecurring: false,
    frequency: 'daily',
    interval: 1,
    area: 'work',
  });
  const [editing, setEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentTask({
      ...currentTask,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      ...currentTask,
      id: Date.now(),
      area: selectedArea,
    };

    if (editing) {
      setTasks(tasks.map((task) => (task.id === currentTask.id ? newTask : task)));
      setEditing(false);
    } else {
      setTasks([...tasks, newTask]);
    }

    setCurrentTask({
      id: null,
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      isRecurring: false,
      frequency: 'daily',
      interval: 1,
      area: selectedArea,
    });
  };

  const editTask = (task) => {
    setCurrentTask(task);
    setEditing(true);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => task.area === selectedArea);

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <h1 style={{ textAlign: 'center' }}>Task Manager</h1>
      </Grid>

      {/* Hall Selection */}
      <Grid item xs={10}>
        <h2>Choose a Building</h2>

        <FormControl fullWidth>
          <Select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
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

      {/* Create/Edit Task Card */}
      <Grid item xs={12} md={5}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {editing ? 'Edit Task' : 'Create Task'}
            </Typography>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <TextField
                fullWidth
                label="Task Name"
                name="name"
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
                value={currentTask.description}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  name="startDate"
                  InputLabelProps={{ shrink: true }}
                  value={currentTask.startDate}
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
                  value={currentTask.endDate}
                  onChange={handleInputChange}
                  required
                  sx={{ mb: 2 }}
                />
              </div>
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
                {editing ? 'Update Task' : 'Create Task'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* Task List Card */}
      <Grid item xs={12} md={5}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Task List ({selectedArea})
            </Typography>
            {filteredTasks.length === 0 ? (
              <Typography color="textSecondary">No tasks for this building</Typography>
            ) : (
              <ul className="space-y-4">
                {filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className="p-2 border rounded-lg flex justify-between items-center bg-gray-100"
                  >
                    <div>
                      <Typography variant="subtitle1" fontWeight="bold">
                        <strong>{task.name}</strong>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Start Date: </strong> {task.startDate}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>End Date: </strong> {task.endDate}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Frequency: </strong> {task.frequency}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Interval: </strong> {task.interval}
                      </Typography>
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
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Box mt={6} />
    </Grid>
  );
};

export default TaskList;
