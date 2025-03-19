import http from '../http';

type Task = {
  Task_ID: number;
  name: string;
  description: string;
  Hall_ID: string;
  Is_Recurring: boolean;
  frequency: string;
  interval: number;
  Start_Date: string;
  End_Date: string;
  Created_Date: string;
  Completed_Date?: string;
  Completed_By?: string;
  Occur_Date?: string;
};

type NewTask = Omit<Task, 'task_ID' | 'created_Date' | 'completed_Date' | 'completed_By'>;

// Post request to the API endpoint "Housing/halls/task" which adds a new task
const addTask = (newTask: NewTask): Promise<Task[]> => http.post('Housing/halls/task', newTask);

// Fetches the list of tasks from the API endpoint "Housing/Halls/${hallId}/ActiveTasks"
const fetchTasks = (hallId: string): Promise<Task[]> =>
  http.get(`Housing/Halls/${hallId}/ActiveTasks`);

// Delete request to remove a specific task by ID using endpoint "Housing/halls/task/${taskID}"
const removeTask = (taskID: number) => http.del(`Housing/halls/task/${taskID}`);

// Patch request to the API endpoint "Housing/halls/task/${taskID}" which updates an existing task
const updateTask = (taskID: number, updatedTask: Partial<NewTask>): Promise<Task[]> =>
  http.patch(`Housing/halls/task/${taskID}`, updatedTask);

export { addTask, updateTask, fetchTasks, removeTask };
