"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  selectedPriority?: string | null;
  setSelectedPriority: any;
  initialValue?: string;
}

export default function PrioritySelector({
  setSelectedPriority,
  selectedPriority,
  initialValue,
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const priorities = ["Low", "Medium", "High"];

  const handleSelect = (priority: string) => {
    setSelectedPriority(priority);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (initialValue) {
      setSelectedPriority(initialValue);
    }
  }, [initialValue]);

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
        className="cursor-pointer text-sm p-3 rounded-md hover:bg-gray-100 inline-block border border-gray-200 w-full"
        style={{
          color: getPriorityColor(selectedPriority ?? initialValue ?? ""),
        }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedPriority || initialValue || "Set Priority"}
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
}
