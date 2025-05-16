
import React from "react";
import { Task } from "@/types/task";
import { formatDateTime } from "@/lib/taskUtils";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dummy assignees data
const assignees = [
  { id: "1", name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" },
  { id: "2", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane" },
  { id: "3", name: "Robert Johnson", avatar: "https://i.pravatar.cc/150?u=robert" },
  { id: "4", name: "Emily Davis", avatar: "https://i.pravatar.cc/150?u=emily" },
  { id: "5", name: "Michael Brown", avatar: "https://i.pravatar.cc/150?u=michael" },
];

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "todo":
        return "To Do";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Medium</Badge>;
    }
  };
  
  const getAssigneeName = (id: string) => {
    const assignee = assignees.find(a => a.id === id);
    return assignee ? assignee.name : "Unassigned";
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{task.title}</CardTitle>
          <div className="flex gap-2">
            {getPriorityBadge(task.priority)}
            <Badge className={getStatusColor(task.status)}>
              {getStatusText(task.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
        <div className="grid grid-cols-2 text-xs text-gray-500">
          <div>
            <p><span className="font-medium">Start:</span> {formatDateTime(task.startTime)}</p>
            <p><span className="font-medium">End:</span> {formatDateTime(task.endTime)}</p>
          </div>
          <div className="text-right">
            <p><span className="font-medium">Assignee:</span> {getAssigneeName(task.assignee)}</p>
            <p><span className="font-medium">Priority:</span> {task.priority}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-2">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2"
            onClick={() => onEdit(task)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
