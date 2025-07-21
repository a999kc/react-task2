export type TaskCategory =
  | 'Bug'
  | 'Feature'
  | 'Documentation'
  | 'Refactor'
  | 'Test';
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export type Task = {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  date: string;
};

export type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
};

export const isTaskCategory = (value: any): value is TaskCategory =>
  ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'].includes(value);

export const isTaskStatus = (value: any): value is TaskStatus =>
  ['To Do', 'In Progress', 'Done'].includes(value);

export const isTaskPriority = (value: any): value is TaskPriority =>
  ['Low', 'Medium', 'High'].includes(value);
