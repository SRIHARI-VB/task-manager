
import { Task } from "@/types/task";

// Get current date in ISO format but only the date part
export const getCurrentDate = (): string => {
  return new Date().toISOString().split("T")[0];
};

// Format date and time for display
export const formatDateTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// Check if a task is scheduled for today
export const isTaskForToday = (task: Task): boolean => {
  const today = getCurrentDate();
  const taskStartDate = task.startTime.split("T")[0];
  
  return taskStartDate === today;
};

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
