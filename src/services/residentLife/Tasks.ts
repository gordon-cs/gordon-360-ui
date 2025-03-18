import http from '../http';

export type Task = {
  Name: string;
  Description: string;
  HallID: string;
  IsRecurring: boolean;
  Frequency: string;
  Interval: number;
  StartDate: Date;
  EndDate?: Date;
  CreatedDate: Date;
  CompletedDate?: Date;
  CompletedBy?: string;
  OccurDate?: Date;
};

export type DailyTask = {
  Task_ID: number;
  Name: string;
  Description: string;
  Hall_ID: string;
  Completed_Date?: Date;
  Completed_By?: string;
  Occur_Date?: Date;
};

const createTask = (newTask: Task) => http.post('Housing/halls/task', newTask);

const updateTask = (taskID: number, newTask: Task) =>
  http.patch(`Housing/halls/task/${taskID}`, newTask);

const deleteTask = (taskID: number) => http.del(`Housing/halls/task/${taskID}`);

const completeTask = (taskID: number, completedBy: string) =>
  http.patch(`Housing/halls/task/Complete/${taskID}`, completedBy);

const incompleteTask = (taskID: number) => http.patch(`Housing/halls/task/Incomplete/${taskID}`);

const getActiveTasksForHall = (hallID: string): Promise<Task[]> =>
  http.get(`Housing/Halls/${hallID}/ActiveTasks`);

const getTasksForHall = (hallID: string): Promise<DailyTask[]> =>
  http.get(`Housing/Halls/${hallID}/DailyTasks`);

export {
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  incompleteTask,
  getActiveTasksForHall,
  getTasksForHall,
};
