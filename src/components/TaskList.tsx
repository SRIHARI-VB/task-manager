
import React, { useState } from "react";
import { Task, TaskStatus, TaskPriority } from "@/types/task";
import TaskCard from "./TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import TaskForm from "./TaskForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

// Import the assignees data
const assignees = [
  { id: "1", name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" },
  { id: "2", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane" },
  { id: "3", name: "Robert Johnson", avatar: "https://i.pravatar.cc/150?u=robert" },
  { id: "4", name: "Emily Davis", avatar: "https://i.pravatar.cc/150?u=emily" },
  { id: "5", name: "Michael Brown", avatar: "https://i.pravatar.cc/150?u=michael" },
];

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  showMyTasksOnly?: boolean;
  currentUserId?: string;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onEdit, 
  onDelete, 
  showMyTasksOnly = false,
  currentUserId = "1" // Default as John Doe for demo purposes
}) => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TaskStatus | "all">("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTask(null);
  };

  // Filter tasks based on multiple criteria
  const filteredTasks = tasks.filter(task => {
    // Filter by search text
    const matchesSearch = 
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());
    
    // Filter by tab (status)
    const matchesTab = tab === "all" || task.status === tab;
    
    // Filter by priority
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    
    // Filter by assignee
    const matchesAssignee = assigneeFilter === "all" || task.assignee === assigneeFilter;
    
    // Filter by "my tasks" if needed
    const matchesMine = !showMyTasksOnly || task.assignee === currentUserId;
    
    return matchesSearch && matchesTab && matchesPriority && matchesAssignee && matchesMine;
  });

  const getAssigneeName = (id: string) => {
    const assignee = assignees.find(a => a.id === id);
    return assignee ? assignee.name : id;
  };

  const resetFilters = () => {
    setPriorityFilter("all");
    setAssigneeFilter("all");
    setTab("all");
    setSearch("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel className="font-semibold text-xs text-muted-foreground pt-2">
              Priority
            </DropdownMenuLabel>
            <DropdownMenuItem 
              className={priorityFilter === "all" ? "bg-accent" : ""}
              onClick={() => setPriorityFilter("all")}
            >
              All Priorities
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={priorityFilter === "high" ? "bg-accent" : ""}
              onClick={() => setPriorityFilter("high")}
            >
              High
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={priorityFilter === "medium" ? "bg-accent" : ""}
              onClick={() => setPriorityFilter("medium")}
            >
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={priorityFilter === "low" ? "bg-accent" : ""}
              onClick={() => setPriorityFilter("low")}
            >
              Low
            </DropdownMenuItem>
            
            {!showMyTasksOnly && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="font-semibold text-xs text-muted-foreground">
                  Assignee
                </DropdownMenuLabel>
                <DropdownMenuItem 
                  className={assigneeFilter === "all" ? "bg-accent" : ""}
                  onClick={() => setAssigneeFilter("all")}
                >
                  All Assignees
                </DropdownMenuItem>
                {assignees.map(assignee => (
                  <DropdownMenuItem 
                    key={assignee.id}
                    className={assigneeFilter === assignee.id ? "bg-accent" : ""}
                    onClick={() => setAssigneeFilter(assignee.id)}
                  >
                    {assignee.name}
                  </DropdownMenuItem>
                ))}
              </>
            )}
            
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={resetFilters}>
              Reset Filters
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="all" value={tab} onValueChange={(value) => setTab(value as TaskStatus | "all")}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="todo">To Do</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No tasks found</p>
          ) : (
            filteredTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onEdit={handleEdit} 
                onDelete={onDelete} 
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="todo" className="mt-4">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No to-do tasks found</p>
          ) : (
            filteredTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onEdit={handleEdit} 
                onDelete={onDelete} 
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="mt-4">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No in-progress tasks found</p>
          ) : (
            filteredTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onEdit={handleEdit} 
                onDelete={onDelete} 
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No completed tasks found</p>
          ) : (
            filteredTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onEdit={handleEdit} 
                onDelete={onDelete} 
              />
            ))
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>{editingTask ? "Edit Task" : "Add Task"}</DialogTitle>
          {editingTask && (
            <TaskForm
              onSubmit={(updatedTask) => {
                onEdit(updatedTask);
                handleCloseDialog();
              }}
              onCancel={handleCloseDialog}
              editTask={editingTask}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskList;
