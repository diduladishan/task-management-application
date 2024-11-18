"use client";

import React, { useState } from "react";
import TaskCard from "@/components/TaskCard";
import AddTaskCard, { Task } from "@/components/AddTaskCard";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTask = () => {
    setIsAdding(true);
  };

  const handleSaveTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
    setIsAdding(false);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <button
        onClick={handleAddTask}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onSave={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
      {isAdding && <AddTaskCard onSave={handleSaveTask} />}
    </div>
  );
};

export default Home;
