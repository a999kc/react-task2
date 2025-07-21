import type { Task } from './types';
const LOCAL_STORAGE_KEY = 'task-manager-tasks';

export const saveToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};

export const loadFromLocalStorage = (): Task[] => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Task[];
    return [];
  } catch {
    return [];
  }
};
