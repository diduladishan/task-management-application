import React, { useEffect, useState } from "react";
import AddTaskCard, { Task } from "@/components/AddTaskCard";
import TaskCard from "./TaskCard";
import toast, { Toaster } from "react-hot-toast";

interface ColumnProps {
  title: string;
  color: string;
  status: "todo" | "in-progress" | "completed";
}

const Column: React.FC<ColumnProps> = ({ title, color, status }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTask = () => {
    setIsAdding(true);
  };

  const handleSaveTask = (task: Omit<Task, "status">) => {
    setTasks((prev) => [...prev, { ...task, status }]);
    setIsAdding(false);
    toast.success("Task saved successfully!");
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    toast.success("Task deleted successfully!");
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    toast.success("Task updated successfully!");
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem(`tasks-${status}`);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [status]);

  useEffect(() => {
    localStorage.setItem(`tasks-${status}`, JSON.stringify(tasks));
  }, [tasks, status]);

  return (
    <div className="flex flex-col w-1/3 bg-gray-100 border border-dashed border-gray-300 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <span className={`w-3 h-3 rounded-full bg-${color} mr-2`}></span>
          {title}
        </h2>
        <button className="text-xl font-bold" onClick={handleAddTask}>
          +
        </button>
      </div>

      <div className="flex-grow">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onSave={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))
        ) : (
          <div className="text-gray-500 text-center py-4">No tasks</div>
        )}
      </div>

      {isAdding && <AddTaskCard onSave={handleSaveTask} />}
      <Toaster />
    </div>
  );
};

export default Column;
