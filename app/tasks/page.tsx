"use client";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaCalendar } from "react-icons/fa";

type Profile = {
  image: string;
  name: string;
};

export default function TasksPage() {
  const [showTaskCard, setShowTaskCard] = useState(false);

  const [taskName, setTaskName] = useState("Write a task name");
  const [isEditing, setIsEditing] = useState(false);

  const [showProfileList, setShowProfileList] = useState(false);

  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const profiles: Profile[] = [
    { image: "/profile-photos/profilePic1.jpg", name: "Ricky Ponting" },
    { image: "/profile-photos/profilePic2.jpg", name: "Devon Conway" },
    { image: "/profile-photos/profilePic3.jpg", name: "Steve Smith" },
    { image: "/profile-photos/profilePic4.jpg", name: "Virat Kohli" },
    { image: "/profile-photos/profilePic5.jpg", name: "Kusal Mendis" },
  ];

  return (
    <div>
      <p
        className="text-black text-[18px] cursor-pointer"
        onClick={() => setShowTaskCard(!showTaskCard)}
      >
        Add Task
      </p>

      {showTaskCard && (
        <div className="w-[250px] bg-[#4c9e54] p-4 rounded-md mt-4">
          {isEditing ? (
            <input
              type="text"
              className="text-black text-[16px] mb-5 p-1 border border-gray-300 rounded w-full"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsEditing(false);
                }
              }}
              autoFocus
            />
          ) : (
            <p
              className="text-black text-[16px] mb-5 cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              {taskName}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="relative">
              {selectedProfile ? (
                <img
                  src={selectedProfile.image}
                  alt={selectedProfile.name}
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setShowProfileList(!showProfileList)}
                />
              ) : (
                <CgProfile
                  className="text-[32px] cursor-pointer"
                  onClick={() => setShowProfileList(!showProfileList)}
                />
              )}

              {showProfileList && (
                <div className="absolute top-10 left-0 bg-white border border-gray-300 rounded shadow-md p-2 w-[200px]">
                  {profiles.map((profile, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 mb-2 cursor-pointer"
                      onClick={() => {
                        setSelectedProfile(profile);
                        setShowProfileList(false);
                      }}
                    >
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <p className="text-black text-[14px]">{profile.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <FaCalendar className="text-[32px]" />
          </div>

          <p className="text-black text-[16px]">Set Priority</p>
        </div>
      )}
    </div>
  );
}
