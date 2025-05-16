import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, ListFilter, User } from "lucide-react";

interface SidebarProps {
  onAddTask: () => void;
  onFilterChange: (filter: "all" | "my") => void;
  currentFilter: "all" | "my";
}

const Sidebar: React.FC<SidebarProps> = ({
  onAddTask,
  onFilterChange,
  currentFilter,
}) => {
  return (
    <div className="w-64 border-r h-screen p-4 bg-white">
      <div className="flex items-center mb-8">
        <h1 className="text-xl font-bold">Task Manager</h1>
      </div>

      <Button
        className="w-full mb-6 flex items-center bg-blue-900 hover:bg-blue-800"
        onClick={onAddTask}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Task
      </Button>

      <nav>
        <ul className="space-y-2">
          <li>
            <Button
              variant={currentFilter === "all" ? "default" : "ghost"}
              className="w-full justify-start "
              onClick={() => onFilterChange("all")}
            >
              <ListFilter className="mr-2 h-4 w-4" />
              All Tasks
            </Button>
          </li>
          <li>
            <Button
              variant={currentFilter === "my" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onFilterChange("my")}
            >
              <User className="mr-2 h-4 w-4" />
              My Tasks
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
