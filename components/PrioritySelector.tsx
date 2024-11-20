"use client";
import React, { useState, useRef, useEffect } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface Task {
  id: string;
  name: string;
  dueDate: string;
  assignee: string;
  priority: string;
  description: string;
  status: string;
}

interface PrioritySelectorProps {
  register: UseFormRegister<Task>;
  setValue: UseFormSetValue<Task>;
  name: keyof Task; // This ensures that `name` corresponds to a key in the `Task` type
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  register,
  setValue,
  name,
}) => {
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const priorities = ["Low", "Medium", "High"];

  const handleSelect = (priority: string) => {
    setSelectedPriority(priority);
    setIsDropdownOpen(false);
    // Set the selected priority value in the form
    setValue(name, priority);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getPriorityColor = (priority: string | null) => {
    switch (priority) {
      case "High":
        return "#CB2E27";
      case "Medium":
        return "#FFAD0D";
      case "Low":
        return "#0C6FBF";
      default:
        return "#374151";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="cursor-pointer text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 inline-block"
        style={{ color: getPriorityColor(selectedPriority) }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedPriority || "Set Priority"}
      </div>

      {isDropdownOpen && (
        <div className="absolute top-10 left-0 bg-white border border-gray-300 shadow-md rounded-md w-40 z-10">
          {priorities.map((priority) => (
            <div
              key={priority}
              className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 ${
                selectedPriority === priority ? "font-semibold" : ""
              }`}
              onClick={() => handleSelect(priority)}
            >
              <span className="text-sm">{priority}</span>
            </div>
          ))}
        </div>
      )}

      {/* Registering the component with React Hook Form */}
      <input
        type="hidden"
        {...register(name)} // Register with React Hook Form for the specific key
        value={selectedPriority || ""}
      />
    </div>
  );
};

export default PrioritySelector;
