import http from '../http';

type Task = {
  taskID: number;
  name: string;
  description: string;
  hallId: string;
  isRecurring: boolean;
  frequency: string;
  interval: number;
  startDate: string;
  endDate: string;
  createdDate: string;
  completedDate?: string;
  completedBy?: string;
  occurDate?: string;
};

type NewTask = Omit<Task, 'taskID' | 'createdDate' | 'completedDate' | 'completedBy'>;

// Post request to the API endpoint "Housing/halls/task" which adds a new task
const addTask = (newTask: NewTask): Promise<Task[]> => http.post('Housing/halls/task', newTask);

// Fetches the list of tasks from the API endpoint "Housing/Halls/${hallId}/ActiveTasks"
const fetchTasks = (hallId: string): Promise<Task[]> =>
  http.get(`Housing/Halls/${hallId}/ActiveTasks`);

// Delete request to remove a specific task by ID using endpoint "Housing/halls/task/${taskID}"
const removeTask = (taskID: number) => http.del(`Housing/halls/task/${taskID}`);

// Patch request to the API endpoint "Housing/halls/task/${taskID}" which edits an existing task
const editTask = (taskID: number, updatedTask: Partial<Task>) =>
  http.patch(`Housing/halls/task/${taskID}`, updatedTask);

export { addTask, editTask, fetchTasks, removeTask };
