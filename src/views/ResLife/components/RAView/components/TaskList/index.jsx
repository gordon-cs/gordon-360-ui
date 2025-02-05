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
import { React, useCallback, useEffect, useState } from 'react';
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
import { useUser } from 'hooks';
import GordonDialogBox from 'components/GordonDialogBox';
import SimpleSnackbar from 'components/Snackbar';

const TaskList = () => {
  //const [taskTEMPList, setTaskList] = useState([]);
  const taskList = [
    {
      TaskID: 0,
      Name: 'Clean',
      Description: 'please clean',
      HallID: 'brom',
    },
    {
      TaskID: 1,
      Name: 'more Clean',
      Description: 'please more clean',
      HallID: 'ferr',
    },
    {
      TaskID: 2,
      Name: 'take out trash',
      Description: 'trashcan full',
      HallID: 'fult',
    },
    {
      TaskID: 3,
      Name: 'posters put up',
      Description: 'please please posters',
      HallID: 'evan',
    },
  ];
  //const { profile } = useUser();
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [taskCheckedOpen, setTaskCheckedOpen] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [disabledList, setDisabledList] = useState([]);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  // useEffect(() => {
  //   const fetchTaskList = async () => {
  //     try {
  //       // also needs hallID aka a new api
  //       const tasks = await getTasksForHall();
  //       setTaskList(tasks);
  //     } catch {}
  //   };
  //   fetchTaskList();
  // });

  const testTaskList = [
    {
      TaskID: 0,
      Name: 'Clean',
      Description: 'please clean',
      HallID: 'brom',
    },
    {
      TaskID: 1,
      Name: 'more Clean',
      Description: 'please more clean',
      HallID: 'ferr',
    },
    {
      TaskID: 2,
      Name: 'take out trash',
      Description: 'trashcan full',
      HallID: 'fult',
    },
    {
      TaskID: 3,
      Name: 'posters put up',
      Description: 'please please posters',
      HallID: 'evan',
    },
  ];

  const handleConfirm = async (index, taskID) => {
    try {
      //await completeTask(taskID, profile.ID);
      setTaskCheckedOpen(false);
      setCheckedList[index] = true;
      setDisabledList[index] = true;
      createSnackbar(`Completed task: ${setCheckedList[index].Name}`, 'success');
    } catch (error) {
      console.error('Error completing task', error);
      createSnackbar('Failed to complete task. Please try again.', 'error');
    }
  };

  const handleTaskChecked = (index, taskID) => {
    return (
      <GordonDialogBox
        open={taskCheckedOpen}
        onClose={() => setTaskCheckedOpen(false)}
        title={'Complete Task'}
        buttonName="Confirm"
        buttonClicked={handleConfirm(index, taskID)}
        cancelButtonName="CANCEL"
        cancelButtonClicked={() => setTaskCheckedOpen(false)}
      ></GordonDialogBox>
    );
  };

  const handleClickDescription = (taskIndex) => {
    return (
      <GordonDialogBox
        open={descriptionOpen}
        onClose={() => setDescriptionOpen(false)}
        title={'Task Description'}
      >
        <Grid Item>
          {taskList[taskIndex].Description.length == 0
            ? 'No description provided'
            : taskList[taskIndex].Description}
        </Grid>
      </GordonDialogBox>
    );
  };

  // map through array of tasks
  // component of list item name, checkbox, and description
  // if description is not blank, return, otherwise "No description provided"
  return (
    <Grid item xs={12} md={12} padding={0}>
      <Card>
        <CardHeader title={`On-Call Tasks`} className="gc360_header" />
        <CardContent>
          <Typography>
            <List>
              {taskList.length == 0 ? (
                <ListItem>
                  <ListItemText>No tasks to see</ListItemText>
                </ListItem>
              ) : (
                taskList.map((task, index) => {
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="description"
                        onClick={handleClickDescription}
                      >
                        <CommentIcon />
                      </IconButton>
                    }
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleTaskChecked(index, task.TaskID)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          //id={index}
                          edge="start"
                          checked={checkedList[index]}
                          disabled={disabledList[index]}
                        />
                      </ListItemIcon>
                    </ListItemButton>
                    <ListItemText id={index} primary={task.Name} />
                  </ListItem>;
                })
              )}
            </List>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TaskList;
