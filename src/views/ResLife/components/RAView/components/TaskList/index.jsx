import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListSubheader,
  List,
  ListItem,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import { completeTask, incompleteTask, getTasksForHall } from 'services/residentLife/Tasks';
import { getRACurrentHalls } from 'services/residentLife/RA_Checkin';
import { useUser } from 'hooks';
import GordonDialogBox from 'components/GordonDialogBox';
import SimpleSnackbar from 'components/Snackbar';

import { checkIfCheckedIn } from 'services/residentLife/RA_Checkin';

const TaskList = () => {
  const [taskList, setTaskList] = useState([]);
  const { profile } = useUser();
  const [isCheckedIn, setCheckedIn] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [taskCheckedOpen, setTaskCheckedOpen] = useState(false);
  const [incompleteTaskDialogOpen, setIncompleteTaskDialogOpen] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [disabledList, setDisabledList] = useState([]);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [hallList, setHallList] = useState([]);
  const [confirmTask, setConfirmTask] = useState(null);
  const [confirmIncompleteTask, setConfirmIncompleteTask] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  useEffect(() => {
    const fetchIsCheckdIn = async () => {
      if (profile?.ID) {
        try {
          const isChecked = await checkIfCheckedIn(profile.ID);
          setCheckedIn(isChecked);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchIsCheckdIn();
  }, [profile?.ID]);

  useEffect(() => {
    const fetchCheckedInHalls = async () => {
      try {
        const halls = await getRACurrentHalls(profile.AD_Username);
        setHallList(halls);
        console.log(halls);
      } catch (error) {
        console.log('Error fetching halls', error);
      }
    };
    fetchCheckedInHalls();
  }, []);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const updatedTasks = [];
        for (const hall of hallList) {
          const tasks = await getTasksForHall(hall);
          updatedTasks.push({ Hall_ID: hall, tasks });
        }
        setTaskList(updatedTasks);
      } catch (error) {
        console.log('Error fetching tasks', error);
      }
    };

    if (hallList.length > 0) {
      fetchTaskList();
    }
  }, [hallList]);

  const handleConfirm = async () => {
    if (!confirmTask) {
      console.error('No task selected for confirmation.');
      return;
    }

    const { hallIndex, taskIndex, taskID } = confirmTask;

    try {
      await completeTask(taskID, profile.ID);

      setCheckedList((prev) =>
        prev.map((hall, hIndex) =>
          hIndex === hallIndex
            ? hall.map((checked, tIndex) => (tIndex === taskIndex ? true : checked))
            : hall,
        ),
      );

      setDisabledList((prev) =>
        prev.map((hall, hIndex) =>
          hIndex === hallIndex
            ? hall.map((disabled, tIndex) => (tIndex === taskIndex ? true : disabled))
            : hall,
        ),
      );

      createSnackbar(`Completed task: ${taskList[hallIndex].tasks[taskIndex].Name}`, 'success');

      setTaskCheckedOpen(false);
      setConfirmTask(null);
    } catch (error) {
      console.error('Error completing task', error);
      createSnackbar('Failed to complete task. Please try again.', 'error');
    }
  };

  const handleMarkIncompleteConfirm = async () => {
    if (!confirmIncompleteTask) {
      console.error('No task selected for incomplete confirmation.');
      return;
    }

    const { hallIndex, taskIndex, taskID } = confirmIncompleteTask;

    try {
      await incompleteTask(taskID, profile.ID);

      setCheckedList((prev) =>
        prev.map((hall, hIndex) =>
          hIndex === hallIndex
            ? hall.map((checked, tIndex) => (tIndex === taskIndex ? false : checked))
            : hall,
        ),
      );

      setDisabledList((prev) =>
        prev.map((hall, hIndex) =>
          hIndex === hallIndex
            ? hall.map((disabled, tIndex) => (tIndex === taskIndex ? false : disabled))
            : hall,
        ),
      );

      createSnackbar(
        `Marked task as incomplete: ${taskList[hallIndex].tasks[taskIndex].Name}`,
        'success',
      );

      setIncompleteTaskDialogOpen(false);
      setConfirmIncompleteTask(null);
    } catch (error) {
      console.error('Error marking task as incomplete', error);
      createSnackbar('Failed to mark task as incomplete. Please try again.', 'error');
    }
  };

  useEffect(() => {
    if (taskList.length > 0) {
      const newCheckedList = taskList.map((hall) =>
        hall.tasks.map((task) => task.Completed_Date !== null),
      );
      setCheckedList(newCheckedList);
      setDisabledList(newCheckedList);
    }
  }, [taskList]);

  const handleTaskChecked = (hallIndex, taskIndex, taskID, taskCompleted) => {
    if (taskCompleted) {
      setConfirmIncompleteTask({ hallIndex, taskIndex, taskID });
      setIncompleteTaskDialogOpen(true);
    } else {
      setConfirmTask({ hallIndex, taskIndex, taskID });
      setTaskCheckedOpen(true);
    }
  };

  const handleClickDescription = (hallIndex, taskIndex) => {
    const selectedTask = taskList[hallIndex]?.tasks[taskIndex];
    setSelectedDescription(selectedTask?.Description || 'No description provided');
    setDescriptionOpen(true);
  };

  return (
    <Grid item xs={12} md={12} padding={0}>
      <Card>
        <CardHeader align="center" title={`On-Duty Tasks`} className="gc360_header" />
        <CardContent>
          <Typography>
            <List disablePadding>
              {isCheckedIn ? (
                taskList.length > 0 ? (
                  taskList.map((hallData, hallIndex) => (
                    <React.Fragment key={hallData.Hall_ID}>
                      <ListSubheader>{hallData.Hall_ID}</ListSubheader>
                      {hallData.tasks.length > 0 ? (
                        hallData.tasks.map((task, index) => (
                          <ListItem
                            key={task.Task_ID}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="description"
                                onClick={() => handleClickDescription(hallIndex, index)}
                              >
                                <CommentIcon />
                              </IconButton>
                            }
                          >
                            <ListItemButton
                              onClick={() =>
                                handleTaskChecked(
                                  hallIndex,
                                  index,
                                  task.Task_ID,
                                  checkedList[hallIndex]?.[index] || task.Completed_Date !== null,
                                )
                              }
                              dense
                            >
                              <ListItemIcon>
                                <FormControlLabel
                                  label={task.Name}
                                  control={
                                    <Checkbox
                                      id={`task-checkbox-${task.Task_ID}`}
                                      edge="start"
                                      checked={
                                        checkedList[hallIndex]?.[index] ??
                                        task.Completed_Date !== null
                                      }
                                      disabled={
                                        disabledList[hallIndex]?.[index] ??
                                        task.Completed_Date !== null
                                      }
                                    />
                                  }
                                />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                        ))
                      ) : (
                        <ListItem key={`no-tasks-${hallData.Hall_ID}`}>
                          <ListItemText>No tasks available for {hallData.Hall_ID}</ListItemText>
                        </ListItem>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText>No tasks to see</ListItemText>
                  </ListItem>
                )
              ) : (
                <ListItem>
                  <ListItemText>
                    Tasks unavailable - only On-Duty Staff can view hall tasks
                  </ListItemText>
                </ListItem>
              )}
            </List>
          </Typography>
          <GordonDialogBox
            open={taskCheckedOpen}
            onClose={() => setTaskCheckedOpen(false)}
            title={'Complete Task'}
            buttonName="Confirm"
            buttonClicked={handleConfirm}
            cancelButtonName="CANCEL"
            cancelButtonClicked={() => setTaskCheckedOpen(false)}
          >
            <br />
            Are you sure you have completed this task?
          </GordonDialogBox>
          <GordonDialogBox
            open={incompleteTaskDialogOpen}
            onClose={() => setIncompleteTaskDialogOpen(false)}
            title={'Mark Task as Incomplete'}
            buttonName="Confirm"
            buttonClicked={handleMarkIncompleteConfirm}
            cancelButtonName="CANCEL"
            cancelButtonClicked={() => setIncompleteTaskDialogOpen(false)}
          >
            <br />
            Are you sure you want to mark this task as incomplete?
          </GordonDialogBox>
          <GordonDialogBox
            open={descriptionOpen}
            onClose={() => setDescriptionOpen(false)}
            title="Task Description"
            buttonName="Close"
            buttonClicked={() => setDescriptionOpen(false)}
          >
            <br />
            {selectedDescription}
          </GordonDialogBox>
          <SimpleSnackbar
            open={snackbar.open}
            text={snackbar.message}
            severity={snackbar.severity}
            onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TaskList;
