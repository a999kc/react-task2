import classes from '@styles/TaskForm.module.css';
import { Link, useNavigate, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { useTaskStore } from '../store';
import type { TaskCategory, TaskPriority, TaskStatus, Task } from '../types';

const TaskForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const taskToEdit = useTaskStore((state) =>
    state.tasks.find((t) => t.id === id)
  );

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [date, setDate] = useState<string>('');


  useEffect(() => {
    if (id && taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setCategory(taskToEdit.category);
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
      setDate(taskToEdit.date.slice(0, 10));
    }
  }, [id, taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Заполните все обязательные поля');
      return;
    }

    if (!category || !status || !priority) {
      alert('Заполните поля статуса,категории и приоритета');
      return;
    }

    const newTask: Task = {
      id: taskToEdit ? taskToEdit.id : Date.now().toString(),
      title,
      description,
      category: category as TaskCategory,
      status: status as TaskStatus,
      priority: priority as TaskPriority,
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
    };

    taskToEdit ? updateTask(newTask) : addTask(newTask);
    navigate('/');
  };

  return (
    <section className={classes.createTask}>
      <div className={classes.container}>
        <div className={classes.headerRow}>
          <Link to="/" className={classes.backLink}>
            ← Назад
          </Link>
        </div>
        <h2 className={classes.createTaskHeader}>
          {taskToEdit ? 'Редактировать задачу' : 'Создать задачу'}
        </h2>
        <form
          className={classes.createTaskForm}
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label htmlFor="title">Заголовок</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label htmlFor="category">Категория</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-- Выберите --</option>
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
              <option value="Documentation">Documentation</option>
              <option value="Refactor">Refactor</option>
              <option value="Test">Test</option>
            </select>
          </div>

          <div>
            <label htmlFor="status">Статус</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">-- Выберите --</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority">Приоритет</label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">-- Выберите --</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {taskToEdit ? (
            <div>
              <label htmlFor="date">Дата создания</label>
              <input
                disabled={!!id === false}
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          ) : (
            <></>
          )}

          <div>
            <button type="submit" disabled={!title} onClick={handleSubmit}>
              {taskToEdit ? 'Сохранить изменения' : 'Создать задачу'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TaskForm;
