"use client";
import React, { useState, useRef, useEffect } from "react";

const PrioritySelector: React.FC = () => {
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const priorities = ["Low", "Medium", "High"];

  const handleSelect = (priority: string) => {
    setSelectedPriority(priority);
    setIsDropdownOpen(false);
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
    </div>
  );
};

export default PrioritySelector;
