"use client";
import { Task } from "@/components/AddTaskCard";
import Column from "@/components/Column";
import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon as CheckCircleIconOutline } from "@heroicons/react/24/outline";

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const currentTasks = Array.from(tasks);

    const [movedTask] = currentTasks.splice(
      currentTasks.findIndex(
        (task) =>
          task.status === source.droppableId &&
          currentTasks.filter((t) => t.status === source.droppableId)[
            source.index
          ] === task
      ),
      1
    );

    movedTask.status = destination.droppableId as Task["status"];

    const destinationTasks = currentTasks.filter(
      (task) => task.status === destination.droppableId
    );
    destinationTasks.splice(destination.index, 0, movedTask);

    const updatedTasks = [
      ...currentTasks.filter((task) => task.status !== destination.droppableId),
      ...destinationTasks,
    ];

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 p-6 h-screen">
        <Column
          title="Todo"
          color="bg-yellow-500"
          status="todo"
          tasks={tasks.filter((task) => task.status === "todo")}
          setTasks={setTasks}
          icon={<CheckCircleIconOutline className="size-6 text-gray-500" />}
        />
        <Column
          title="In Progress"
          color="bg-blue-500"
          status="in-progress"
          tasks={tasks.filter((task) => task.status === "in-progress")}
          setTasks={setTasks}
          icon={<CheckCircleIconOutline className="size-6 text-gray-500" />}
        />
        <Column
          title="Completed"
          color="bg-green-500"
          status="completed"
          tasks={tasks.filter((task) => task.status === "completed")}
          setTasks={setTasks}
          icon={<CheckCircleIcon className="size-6 text-green-500" />}
        />
      </div>
    </DragDropContext>
  );
};

export default Board;
