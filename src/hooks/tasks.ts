import { api } from "./axios";
import { CreateTaskRequest, Task, updateTasks } from "./taskTypes";

// POST / create task
export const createTask = async (task: CreateTaskRequest) => {
  try {
    const response = await api.post("/tasks", task);
    console.log(response.data, "response");
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// GET /tasks
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// GET /tasks/{id}
export const getTask = async (id: number): Promise<Task> => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
};

// PUT / Update tasks

export const updateTask = async (id: number, task:updateTasks): Promise<Task> => {
  try {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// DELETE / Delete tasks
export const deleteTask = async (id: number): Promise<Task> => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};