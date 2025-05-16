
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task, TaskFormData, TaskStatus, TaskPriority } from "@/types/task";
import { generateId } from "@/lib/taskUtils";
import { toast } from "sonner";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";

// Dummy assignees data
const assignees = [
  { id: "1", name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" },
  { id: "2", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane" },
  { id: "3", name: "Robert Johnson", avatar: "https://i.pravatar.cc/150?u=robert" },
  { id: "4", name: "Emily Davis", avatar: "https://i.pravatar.cc/150?u=emily" },
  { id: "5", name: "Michael Brown", avatar: "https://i.pravatar.cc/150?u=michael" },
];

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  onCancel: () => void;
  editTask?: Task;
}

const initialFormData: TaskFormData = {
  title: "",
  description: "",
  assignee: "",
  startTime: "",
  endTime: "",
  status: "todo",
  priority: "medium",
};

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, editTask }) => {
  const [formData, setFormData] = useState<TaskFormData>(initialFormData);

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description,
        assignee: editTask.assignee,
        startTime: editTask.startTime,
        endTime: editTask.endTime,
        status: editTask.status,
        priority: editTask.priority || "medium", 
      });
    }
  }, [editTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }
    
    if (!formData.startTime || !formData.endTime) {
      toast.error("Please select both start and end times");
      return;
    }

    if (new Date(formData.endTime) < new Date(formData.startTime)) {
      toast.error("End time cannot be earlier than start time");
      return;
    }
    
    const task: Task = {
      id: editTask?.id || generateId(),
      ...formData,
      createdAt: editTask?.createdAt || new Date().toISOString(),
    };
    
    onSubmit(task);
    toast.success(editTask ? "Task updated successfully" : "Task created successfully");
    setFormData(initialFormData);
  };

  const getAssigneeName = (id: string) => {
    const assignee = assignees.find(a => a.id === id);
    return assignee ? assignee.name : id;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task title"
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task description"
          rows={3}
        />
      </div>
      
      <div>
        <Label htmlFor="assignee">Assignee</Label>
        <Select
          value={formData.assignee}
          onValueChange={(value) => handleSelectChange("assignee", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Assign to someone" />
          </SelectTrigger>
          <SelectContent>
            {assignees.map((assignee) => (
              <SelectItem key={assignee.id} value={assignee.id} className="flex items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={assignee.avatar} alt={assignee.name} />
                    <AvatarFallback>{assignee.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{assignee.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <Label htmlFor="endTime">End Time</Label>
          <Input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange("status", value as TaskStatus)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => handleSelectChange("priority", value as TaskPriority)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{editTask ? "Update" : "Create"} Task</Button>
      </div>
    </form>
  );
};

export default TaskForm;
