import http from '../http';

export type Task = {
  Name: string;
  Description: string;
  Hall_ID: string;
  Is_Recurring: boolean;
  Frequency: string;
  Interval: number;
  Start_Date: Date;
  End_Date?: Date;
  Created_Date: Date;
  Completed_Date?: Date;
  Completed_By?: string;
  Occur_Date?: Date;
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

const completeTask = (Task_ID: number, Completed_By: string) =>
  http.patch(`Housing/halls/task/Complete/${Task_ID}`, Completed_By);

const incompleteTask = (Task_ID: number) => http.patch(`Housing/halls/task/Incomplete/${Task_ID}`);

const getActiveTasksForHall = (Hall_ID: string): Promise<Task[]> =>
  http.get(`Housing/Halls/${Hall_ID}/ActiveTasks`);

const getTasksForHall = (Hall_ID: string): Promise<DailyTask[]> =>
  http.get(`Housing/Halls/${Hall_ID}/DailyTasks`);

export { completeTask, incompleteTask, getActiveTasksForHall, getTasksForHall };
