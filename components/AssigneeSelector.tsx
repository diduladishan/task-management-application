"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";

interface Assignee {
  id: number;
  name: string;
  avatar: string;
}

interface AssigneeSelectorProps {
  assignees: Assignee[];
  value?: Assignee | null;
  onChange?: (assignee: Assignee | null) => void;
  name?: string;
  register?: any;
  className?: string;
}

const AssigneeSelector: React.FC<AssigneeSelectorProps> = ({
  assignees,
  value = null,
  onChange,
  name,
  register,
  className,
}) => {
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee | null>(
    value
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (assignee: Assignee) => {
    setSelectedAssignee(assignee);
    onChange?.(assignee); // Notify parent of selection
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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Hidden input for react-hook-form */}
      <input
        type="hidden"
        {...(register ? register(name) : {})}
        value={selectedAssignee?.id || ""}
      />

      <div
        className="flex w-full items-center gap-3 p-2 border rounded-md cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedAssignee ? (
          <>
            <Image
              src={selectedAssignee.avatar}
              alt={selectedAssignee.name}
              className="w-8 h-8 rounded-full"
              width={32}
              height={32}
            />
            <span className="text-sm whitespace-nowrap font-medium">
              {selectedAssignee.name}
            </span>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <CgProfile size={24} />
            <span className="text-sm text-gray-500">Select Assignee</span>
          </div>
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute top-12 left-0 bg-white border border-gray-300 shadow-md rounded-md w-48 z-10">
          {assignees.map((assignee) => (
            <div
              key={assignee.id}
              className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(assignee)}
            >
              <Image
                src={assignee.avatar}
                alt={assignee.name}
                className="w-8 h-8 rounded-full"
                width={32}
                height={32}
              />
              <span className="text-sm">{assignee.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssigneeSelector;
