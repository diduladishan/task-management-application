// components/Droppable.tsx
import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const Droppable: React.FC<DroppableProps> = ({
  id,
  title,
  children,
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-blue-300 rounded-md p-4 shadow-md min-h-[300px]"
    >
      <h2 className="text-center text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
};
