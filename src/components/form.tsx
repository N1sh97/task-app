"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./form.module.css";
import { useState } from "react";
import { createTask, deleteTask, updateTask } from "@/hooks/tasks";
import { FormFields, TaskStatus } from "@/hooks/taskTypes";

const TaskForm = () => {
  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: { task_status: "todo" },
  });
  const [tasks, setTasks] = useState<
    { id: number; title: string; status: TaskStatus }[]
  >([]);
  const [error, setError] = useState("");
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (data.title.trim() === "") {
      setError("Please add a task");
      return;
    }
    try {
      const newTask = await createTask({
        id: data.id,
        title: data.title,
        task_status: data.task_status,
      });
      setTasks([
        ...tasks,
        {
          id: newTask.id,
          title: newTask.title,
          status: newTask.task_status ?? "todo",
        },
      ]);
      setError("");
    } catch {
      setError("Failed to create task. Please try again.");
    }
  };

  const handleRemove = async (id: number) => {
    try {
      await deleteTask(id);

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Used AI for handleRemove function

  const startEditing = (id: number, currentTitle: string) => {
    setEditingId(id);
    setEditText(currentTitle);
  };

  const saveEdit = async (id: number) => {
    if (editText.trim() === "") {
      setError("Task title cannot be empty");
      return;
    }
    try {
      await updateTask(id, { title: editText });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, title: editText } : task,
        ),
      );

      setEditingId(null);
      setEditText("");
      setError("");
    } catch (error) {
      console.error("Failed to update task:", error);
      setError("Failed to update task");
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const statusOrder: TaskStatus[] = ["todo", "in-progress", "done"];

  const handleStatusChange = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const nextIndex =
      (statusOrder.indexOf(task.status) + 1) % statusOrder.length;
    const newStatus = statusOrder[nextIndex];

    try {
      // Update backend first
      await updateTask(id, { task_status: newStatus });

      // Then update local state
      setTasks(
        tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your To Do</h1>

      <form className={styles.addTaskForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.addTaskInput}
          placeholder="Add new task"
          {...register("title")}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className={styles.addButton}>
          +
        </button>
      </form>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <button
              type="button"
              className={`${styles.statusTag} ${styles[task.status.replace("-", "")]}`}
              onClick={() => handleStatusChange(task.id)}
            >
              {task.status}
            </button>

            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  className={styles.addTaskInput}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={() => saveEdit(task.id)}
                >
                  ✓
                </button>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={cancelEditing}
                >
                  ✕
                </button>
              </>
            ) : (
              <>
                <span className={styles.taskText}>{task.title}</span>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => startEditing(task.id, task.title)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => handleRemove(task.id)}
                >
                  ×
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskForm;
