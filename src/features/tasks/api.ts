import type { Task } from './types';

const STORAGE_KEY = 'task-manager-tasks';

function loadTasks(): Task[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function getTasks(): Task[] {
  return loadTasks();
}

export function getTaskById(id: string): Task | undefined {
  return loadTasks().find((task) => task.id === id);
}

export function createTask(task: Task): void {
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
}

export function updateTask(id: string, data: Partial<Task>): void {
  const tasks = loadTasks().map((task) =>
    task.id === id ? { ...task, ...data } : task
  );
  saveTasks(tasks);
}

export function deleteTask(id: string): void {
  const tasks = loadTasks().filter((task) => task.id !== id);
  saveTasks(tasks);
}

export function searchTasks(query: string): Task[] {
  const tasks = loadTasks();
  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.date.includes(query)
  );
}
