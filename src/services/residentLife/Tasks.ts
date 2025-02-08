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
  TaskID: number;
  Name: string;
  Description: string;
  HallID: string;
  CompletedDate?: Date;
  CompletedBy?: string;
  OccurDate?: Date;
};

const createTask = (newTask: Task) => http.post('Housing/halls/task', newTask);

const updateTask = (taskID: number, newTask: Task) =>
  http.patch(`Housing/halls/task/${taskID}`, newTask);

const deleteTask = (taskID: number) => http.del(`Housing/halls/task/${taskID}`);

const completeTask = (taskID: number, completedBy: string) =>
  http.patch(`Housing/halls/task/Complete/${taskID}`, completedBy);

const getActiveTasksForHall = (hallID: string): Promise<Task[]> =>
  http.get(`Housing/Halls/${hallID}/ActiveTasks`);

const getTasksForHall = (hallID: string): Promise<Task[]> =>
  http.get(`Housing/Halls/${hallID}/DailyTasks`);

const getRACurrentHalls = (userName: string): Promise<String[]> =>
  http.get(`Housing/halls/on-calls/${userName}/locations`);

export {
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  getActiveTasksForHall,
  getTasksForHall,
  getRACurrentHalls,
};
