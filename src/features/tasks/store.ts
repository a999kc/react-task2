import { create } from 'zustand';
import type { TaskStore } from './types';
import { saveToLocalStorage } from './utils.ts';

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => {
      const Tasks = [...state.tasks, task];
      saveToLocalStorage(Tasks);
      return { tasks: Tasks };
    }),
  updateTask: (updatedTask) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      saveToLocalStorage(updatedTasks);
      return { tasks: updatedTasks };
    }),
  deleteTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      saveToLocalStorage(updatedTasks);
      return { tasks: updatedTasks };
    }),
  setTasks: (tasks) =>
    set(() => {
      saveToLocalStorage(tasks);
      return { tasks };
    }),
}));
