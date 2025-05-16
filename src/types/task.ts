
export type TaskStatus = "todo" | "in-progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  startTime: string;
  endTime: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
};

export type TaskFormData = Omit<Task, "id" | "createdAt">;
