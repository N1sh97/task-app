"use client";

import { Task, TaskStatus } from "@/hooks/taskTypes";
import { useEffect, useState } from "react";
import { deleteTask, getTasks, updateTask } from "@/hooks/tasks";
import styles from "./form.module.css";

const statusOrder: TaskStatus[] = ["todo", "in-progress", "done"];

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      await deleteTask(id);

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEditing = (id: number, currentTitle: string) => {
    setEditingId(id);
    setEditText(currentTitle);
  };

  const saveEdit = async (id: number) => {
    if (editText.trim() === "") {
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
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleStatusChange = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const nextIndex =
      (statusOrder.indexOf(task.task_status) + 1) % statusOrder.length;
    const newStatus = statusOrder[nextIndex];

    try {
      // Update backend first
      await updateTask(id, { task_status: newStatus });

      // Then update local state
      setTasks(
        tasks.map((t) => (t.id === id ? { ...t, task_status: newStatus } : t)),
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className={styles.container}>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <span
              className={`${styles.statusTag} ${styles[task.task_status.replace("-", "")]}`}
              onClick={() => handleStatusChange(task.id)}
            >
              {task.task_status}
            </span>

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

export default TaskList;
