import { useTaskStore } from '../store';
import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import classes from '@styles/TaskList.module.css';
import { getTasks } from '../api';
import type { TaskCategory, TaskPriority, TaskStatus } from '../types';

const TaskList = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | 'All'>(
    'All'
  );
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'All'>(
    'All'
  );

  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  if (tasks.length === 0) {
    return <p style={{ textAlign: 'center' }}>Задач пока нет</p>;
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesTitle = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return (
      (categoryFilter === 'All' || task.category === categoryFilter) &&
      (statusFilter === 'All' || task.status === statusFilter) &&
      (priorityFilter === 'All' || task.priority === priorityFilter) &&
      matchesTitle
    );
  });

  return (
    <section className={classes.taskListWrapper}>
      <div className={classes.filterPanel}>
        <select
          className={classes.select}
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value as TaskCategory | 'All')
          }
        >
          <option value="All">Все категории</option>
          <option value="Bug">Bug</option>
          <option value="Feature">Feature</option>
          <option value="Documentation">Documentation</option>
          <option value="Refactor">Refactor</option>
          <option value="Test">Test</option>
        </select>

        <select
          className={classes.select}
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as TaskStatus | 'All')
          }
        >
          <option value="All">Все статусы</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select
          className={classes.select}
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value as TaskPriority | 'All')
          }
        >
          <option value="All">Все приоритеты</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={classes.input}
        />
      </div>

      <div className={classes.taskList}>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
};

export default TaskList;
