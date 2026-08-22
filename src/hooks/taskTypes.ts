export type TaskStatus = "todo" | "in-progress" | "done";

export type FormFields = {
  id: number;
  title: string;
  task_status: TaskStatus;
};

export interface CreateTaskRequest {
  id: number;
  title: string;
  task_status: TaskStatus;
}

export interface Task {
  id: number;
  title: string;
  task_status: TaskStatus;
}

export interface updateTasks {
  id?: number;
  title?: string;
  task_status?: string;
}
