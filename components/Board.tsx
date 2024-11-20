import React from "react";
import Column from "@/components/Column";

const Board: React.FC = () => {
  return (
    <div className="flex space-x-4 p-6">
      <Column title="Todo" color="yellow-500" status="todo" />
      <Column title="In Progress" color="blue-500" status="in-progress" />
      <Column title="Completed" color="green-500" status="completed" />
    </div>
  );
};

export default Board;
