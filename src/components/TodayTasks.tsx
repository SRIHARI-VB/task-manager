import React from "react";
import { Task } from "@/types/task";
import { isTaskForToday, formatDateTime } from "@/lib/taskUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TodayTasksProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
}

// Dummy assignees data
const assignees = [
  { id: "1", name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" },
  { id: "2", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane" },
  {
    id: "3",
    name: "Robert Johnson",
    avatar: "https://i.pravatar.cc/150?u=robert",
  },
  { id: "4", name: "Emily Davis", avatar: "https://i.pravatar.cc/150?u=emily" },
  {
    id: "5",
    name: "Michael Brown",
    avatar: "https://i.pravatar.cc/150?u=michael",
  },
];

const TodayTasks: React.FC<TodayTasksProps> = ({ tasks, onEdit }) => {
  const todayTasks = tasks.filter(isTaskForToday);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in-progress":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-200"
          >
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 border-amber-200"
          >
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-200"
          >
            Low
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-800 border-gray-200"
          >
            Medium
          </Badge>
        );
    }
  };

  const getAssigneeName = (id: string) => {
    const assignee = assignees.find((a) => a.id === id);
    return assignee ? assignee.name : "Unassigned";
  };

  return (
    <div className="border rounded-md p-4 bg-white">
      <h2 className="text-lg font-medium mb-4">Today's Tasks</h2>
      {todayTasks.length === 0 ? (
        <p className="text-center text-gray-500 py-4">
          No tasks scheduled for today
        </p>
      ) : (
        <div className="space-y-3">
          {todayTasks.map((task) => (
            <Card
              key={task.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onEdit(task)}
            >
              <CardHeader className="py-2 px-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">
                    {task.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                      {task.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {getPriorityBadge(task.priority)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-1 px-3 text-xs text-gray-600">
                <p>
                  <span className="font-medium">Description:</span>{" "}
                  {task.description}
                </p>
                <p>
                  <span className="font-medium">Time:</span>{" "}
                  {formatDateTime(task.startTime)}
                </p>
                <p>
                  <span className="font-medium">Assignee:</span>{" "}
                  {getAssigneeName(task.assignee || "")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayTasks;
