"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

interface Task {
  id: string;
  name: string;
}

interface TaskContainers {
  todo: Task[];
  inProgress: Task[];
  completed: Task[];
}

const initialTasks: TaskContainers = {
  todo: [{ id: "1", name: "Write a task name" }],
  inProgress: [],
  completed: [],
};

const TaskManagementApp = () => {
  const [tasks, setTasks] = useState<TaskContainers>(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    // No drop location
    if (!over) {
      setActiveId(null);
      return;
    }

    // If the drag is over the same item, do nothing
    if (active.id === over.id) {
      setActiveId(null);
      return;
    }

    // Get the source container (where the item was originally)
    const sourceContainer = findContainer(active.id);
    // Get the destination container (where the item was dropped)
    const destinationContainer = over.id as keyof TaskContainers;

    if (sourceContainer && destinationContainer) {
      const sourceItems = tasks[sourceContainer];
      const destinationItems = tasks[destinationContainer];

      const activeIndex = sourceItems.findIndex(
        (item) => item.id === active.id
      );
      const movedItem = sourceItems[activeIndex];

      // Remove the item from the source container
      const updatedSourceItems = sourceItems.filter(
        (item) => item.id !== active.id
      );
      // Add the item to the destination container
      const updatedDestinationItems = [...destinationItems, movedItem];

      // Update state
      setTasks({
        ...tasks,
        [sourceContainer]: updatedSourceItems,
        [destinationContainer]: updatedDestinationItems,
      });
    }

    setActiveId(null);
  };

  // Find the container that the item belongs to
  const findContainer = (id: string): keyof TaskContainers | undefined => {
    const key = Object.keys(tasks).find((key) =>
      tasks[key as keyof TaskContainers].some((item) => item.id === id)
    );
    return key as keyof TaskContainers | undefined;
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-gray-200 p-8">
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(tasks).map(([key, items]) => (
            <Droppable key={key} id={key} title={key}>
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                {items.map((task: Task) => (
                  <Draggable key={task.id} id={task.id}>
                    <div className="bg-green-200 p-4 rounded-md shadow mb-2">
                      <p className="text-black font-semibold">{task.name}</p>
                    </div>
                  </Draggable>
                ))}
              </SortableContext>
            </Droppable>
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default TaskManagementApp;
