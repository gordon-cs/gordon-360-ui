import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListSubheader,
  List,
  ListItem,
  Link,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { completeTask, getTasksForHall } from 'services/residentLife/Tasks';
import { getRACurrentHalls } from 'services/residentLife/RA_Checkin';
import { useUser } from 'hooks';
import GordonDialogBox from 'components/GordonDialogBox';
import SimpleSnackbar from 'components/Snackbar';

const TaskList = () => {
  const [taskList, setTaskList] = useState([]);

  const { profile } = useUser();
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [taskCheckedOpen, setTaskCheckedOpen] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [disabledList, setDisabledList] = useState([]);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [hallList, setHallList] = useState([]);
  const [confirmTask, setConfirmTask] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

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
          updatedTasks.push({ hallID: hall, tasks });
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

      setCheckedList((prev) => {
        const newCheckedList = prev.map((hall, hIndex) =>
          hIndex === hallIndex
            ? hall.map((checked, tIndex) => (tIndex === taskIndex ? true : checked))
            : hall,
        );
        return newCheckedList;
      });

      setDisabledList((prev) => {
        const newDisabledList = prev.map((hall, hIndex) =>
          hIndex === hallIndex
            ? hall.map((disabled, tIndex) => (tIndex === taskIndex ? true : disabled))
            : hall,
        );
        return newDisabledList;
      });

      createSnackbar(`Completed task: ${taskList[hallIndex].tasks[taskIndex].Name}`, 'success');

      setTaskCheckedOpen(false);
      setConfirmTask(null);
    } catch (error) {
      console.error('Error completing task', error);
      createSnackbar('Failed to complete task. Please try again.', 'error');
    }
  };

  useEffect(() => {
    if (taskList.length > 0) {
      const newCheckedList = taskList.map((hall) =>
        hall.tasks.map((task) => task.CompletedDate !== null),
      );
      setCheckedList(newCheckedList);
      setDisabledList(newCheckedList);
    }
  }, [taskList]);

  const handleTaskChecked = (hallIndex, taskIndex, taskID) => {
    setConfirmTask({ hallIndex, taskIndex, taskID });
    setTaskCheckedOpen(true);
  };

  const handleClickDescription = (hallIndex, taskIndex) => {
    const selectedTask = taskList[hallIndex]?.tasks[taskIndex];
    setSelectedDescription(selectedTask?.Description || 'No description provided');
    setDescriptionOpen(true);
  };

  return (
    <Grid item xs={12} md={12} padding={0}>
      <Card>
        <CardHeader title={`On-Call Tasks`} className="gc360_header" />
        <CardContent>
          <Typography>
            <List>
              {taskList.length > 0 ? (
                taskList.map((hallData, hallIndex) => (
                  <React.Fragment key={hallData.hallID}>
                    <ListSubheader>{hallData.hallID}</ListSubheader>
                    {hallData.tasks.length > 0 ? (
                      hallData.tasks.map((task, index) => (
                        <ListItem
                          key={task.TaskID}
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
                            onClick={() => handleTaskChecked(hallIndex, index, task.TaskID)}
                            dense
                          >
                            <ListItemIcon>
                              <Checkbox
                                id={`task-checkbox-${task.TaskID}`}
                                edge="start"
                                checked={
                                  checkedList[hallIndex]?.[index] ?? task.CompletedDate !== null
                                }
                                disabled={
                                  disabledList[hallIndex]?.[index] ?? task.CompletedDate !== null
                                }
                              />
                            </ListItemIcon>
                          </ListItemButton>
                          <ListItemText primary={task.Name} />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem key={`no-tasks-${hallData.hallID}`}>
                        <ListItemText>No tasks available for {hallData.hallID}</ListItemText>
                      </ListItem>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText>No tasks to see</ListItemText>
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
          />
          <GordonDialogBox
            open={descriptionOpen}
            onClose={() => setDescriptionOpen(false)}
            title="Task Description"
            buttonName="Close"
            buttonClicked={() => setDescriptionOpen(false)}
          >
            <Grid item>{selectedDescription}</Grid>
          </GordonDialogBox>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TaskList;
