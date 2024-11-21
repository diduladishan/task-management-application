"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import { LiaTasksSolid } from "react-icons/lia";
import { GoGraph } from "react-icons/go";
import { GoLightBulb } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";

import { IoSettingsOutline } from "react-icons/io5";
const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "bg-[#0359E0] text-white" : "bg-[#f6f6f6]";

  return (
    <div className="w-64 bg-white text-[#474747] font-semibold h-screen p-4">
      <ul>
        <li>
          <Link
            href="/home"
            className={`block py-2 px-4 mb-4 rounded ${isActive("/home")}`}
          >
            <div className="flex gap-2">
              <IoHomeOutline className="text-[24px]" /> Home
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/tasks"
            className={`block py-2 px-4 mb-4 rounded ${isActive("/tasks")}`}
          >
            <div className="flex gap-2">
              <LiaTasksSolid className="text-[24px]" />
              Tasks
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/report"
            className={`block py-2 px-4 mb-4 rounded ${isActive("/report")}`}
          >
            <div className="flex gap-2">
              <GoGraph className="text-[24px]" /> Report
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/insights"
            className={`block py-2 px-4 mb-4 rounded ${isActive("/insights")}`}
          >
            <div className="flex gap-2">
              <GoLightBulb className="text-[24px]" /> Insights
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/inbox"
            className={`block py-2 px-4 mb-4 rounded ${isActive("/inbox")}`}
          >
            <div className="flex gap-2">
              <IoNotificationsOutline className="text-[24px]" />
              Inbox
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className={`block py-2 px-4  rounded ${isActive("/settings")}`}
          >
            <div className="flex gap-2">
              <IoSettingsOutline className="text-[24px]" />
              Settings
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
