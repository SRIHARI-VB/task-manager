import React, { useState } from "react";
import { Task } from "@/types/task";
import Sidebar from "./Sidebar";
import TaskList from "./TaskList";
import TodayTasks from "./TodayTasks";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import TaskForm from "./TaskForm";
import { toast } from "sonner";

const CURRENT_USER_ID = "1"; // John Doe

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentFilter, setCurrentFilter] = useState<"all" | "my">("all");

  const handleAddTask = () => {
    setEditingTask(null);
    setIsDialogOpen(true);
  };

  const handleSubmitTask = (task: Task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, task]);
    }
    setIsDialogOpen(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully");
  };

  const handleFilterChange = (filter: "all" | "my") => {
    setCurrentFilter(filter);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        onAddTask={handleAddTask}
        onFilterChange={handleFilterChange}
        currentFilter={currentFilter}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <h2 className="text-2xl font-bold mb-2">
            {currentFilter === "all" ? "All Tasks" : "My Tasks"}
          </h2>
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            showMyTasksOnly={currentFilter === "my"}
            currentUserId={CURRENT_USER_ID}
          />
        </div>

        <div className="w-96 p-6 overflow-auto">
          <TodayTasks tasks={tasks} onEdit={handleEditTask} />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>{editingTask ? "Edit Task" : "Add Task"}</DialogTitle>
          <TaskForm
            onSubmit={handleSubmitTask}
            onCancel={() => setIsDialogOpen(false)}
            editTask={editingTask || undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
