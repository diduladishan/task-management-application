import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddTaskCardProps {
  onSave: (task: Task) => void;
}

// In AddTaskCard.tsx
export interface Task {
  id: number;
  name: string;
  dueDate: string | null;
  assignee: string | null;
  priority: string | null;
  description: string | null; // Add description here
}

const AddTaskCard: React.FC<AddTaskCardProps> = ({ onSave }) => {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [assignee, setAssignee] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);

  const handleSave = () => {
    if (!taskName || !dueDate || !assignee || !priority) {
      alert("Please fill in all fields");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      name: taskName,
      dueDate,
      assignee,
      priority,
      description: null,
    };

    onSave(newTask);
    resetForm();
  };

  const resetForm = () => {
    setTaskName("");
    setDueDate(null);
    setAssignee(null);
    setPriority(null);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="date"
        value={dueDate ?? ""}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <select
        value={assignee ?? ""}
        onChange={(e) => setAssignee(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="" disabled>
          Select Assignee
        </option>
        <option value="John Doe">John Doe</option>
        <option value="Jane Smith">Jane Smith</option>
        <option value="Alice Brown">Alice Brown</option>
      </select>
      <select
        value={priority ?? ""}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="" disabled>
          Select Priority
        </option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
      >
        Save Task
      </button>
    </div>
  );
};

export default AddTaskCard;
