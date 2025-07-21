import { useNavigate } from 'react-router';
import classes from '@styles/Taskitem.module.css';
import { useTaskStore } from '../store';
import type { Task, TaskCategory, TaskStatus, TaskPriority } from '../types';

type TaskItemProps = {
  task: Task;
};

const categoryColors: Record<TaskCategory, string> = {
  Bug: '#f44336', // ярко-красный
  Feature: '#2196f3', // насыщенный синий
  Documentation: '#4caf50', // насыщенный зелёный
  Refactor: '#ff9800', // ярко-оранжевый
  Test: '#9c27b0', // ярко-фиолетовый
};

const statusColors: Record<TaskStatus, string> = {
  'To Do': '#00bcd4', // яркий голубой
  'In Progress': '#ff5722', // насыщенный оранжево-красный
  Done: '#8bc34a', // ярко-зелёный
};

const priorityColors: Record<TaskPriority, string> = {
  Low: '#00e676', // неоново-зелёный
  Medium: '#ffc107', // ярко-жёлтый
  High: '#d50000', // насыщенный тёмно-красный
};

const TaskItem = ({ task }: TaskItemProps) => {
  const navigate = useNavigate();
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const handleDelete = () => {
    if (confirm('Удалить задачу?')) {
      deleteTask(task.id);
    }
  };

  const handleUpdate = () => {
    navigate(`/task/${task.id}`);
  };

  return (
    <div className={classes.taskItem}>
      <div className={classes.taskHeader}>
        <h3 className={classes.taskTitle}>{task.title}</h3>
        <span className={classes.taskDate}>
          {new Date(task.date).toLocaleDateString()}
        </span>
      </div>

      <p className={classes.taskDescription}>{task.description}</p>

      <div className={classes.taskMeta}>
        <span
          className={classes.taskCategory}
          style={{ backgroundColor: categoryColors[task.category] }}
        >
          {task.category}
        </span>
        <span
          className={classes.taskStatus}
          style={{ backgroundColor: statusColors[task.status] }}
        >
          {task.status}
        </span>
        <span
          className={classes.taskPriority}
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
      </div>

      <div className={classes.taskActions}>
        <button onClick={handleUpdate}>Редактировать</button>
        <button onClick={handleDelete}>Удалить</button>
      </div>
    </div>
  );
};

export default TaskItem;
