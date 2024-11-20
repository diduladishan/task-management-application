"use client";
import AddTaskCard, { Task } from "@/components/AddTaskCard";
import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import toast, { Toaster } from "react-hot-toast";
import TaskCard from "./TaskCard";

interface ColumnProps {
  title: string;
  color: string;
  status: "todo" | "in-progress" | "completed";
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Column: React.FC<ColumnProps> = ({
  title,
  color,
  status,
  tasks,
  setTasks,
}) => {
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

  return (
    <div className="flex flex-col w-1/3 bg-gray-100 border border-dashed border-gray-300 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <span className={`w-3 h-3 rounded-full bg-${color} mr-2`}></span>
          {title} ({tasks.length})
        </h2>
        <button className="text-xl font-bold" onClick={handleAddTask}>
          +
        </button>
      </div>

      <Droppable
        droppableId={status}
        isDropDisabled={isAdding}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-grow space-y-2 ${
              snapshot.isDraggingOver ? "bg-blue-100" : ""
            }`}
          >
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        height: snapshot.isDragging
                          ? `${
                              snapshot.draggingOver === status
                                ? "auto"
                                : "100px"
                            }`
                          : "inherit",
                      }}
                    >
                      <TaskCard
                        task={task}
                        onSave={handleEditTask}
                        onDelete={handleDeleteTask}
                      />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">No tasks</div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isAdding && <AddTaskCard onSave={handleSaveTask} />}
      <Toaster />
    </div>
  );
};

export default Column;
