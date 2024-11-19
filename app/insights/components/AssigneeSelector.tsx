"use client";
import React, { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";

interface Assignee {
  id: number;
  name: string;
  avatar: string;
}

const AssigneeSelector: React.FC = () => {
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee | null>(
    null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const assignees: Assignee[] = [
    { id: 1, name: "John Taylor", avatar: "/profile-photos/profilePic1.jpg" },
    { id: 2, name: "Jane Doe", avatar: "/profile-photos/profilePic2.jpg" },
    { id: 3, name: "Alice Smith", avatar: "/profile-photos/profilePic3.jpg" },
  ];

  const handleSelect = (assignee: Assignee) => {
    setSelectedAssignee(assignee);
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
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-gray-200"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedAssignee ? (
          <img
            src={selectedAssignee.avatar}
            alt={selectedAssignee.name}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <CgProfile size={24} />
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
              <img
                src={assignee.avatar}
                alt={assignee.name}
                className="w-8 h-8 rounded-full"
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
