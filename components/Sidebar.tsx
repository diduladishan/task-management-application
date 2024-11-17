"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "text-green-500" : "";

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <ul>
        <li>
          <Link
            href="/home"
            className={`block py-2 px-4 hover:bg-gray-700 rounded ${isActive(
              "/home"
            )}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/tasks"
            className={`block py-2 px-4 hover:bg-gray-700 rounded ${isActive(
              "/tasks"
            )}`}
          >
            Tasks
          </Link>
        </li>
        <li>
          <Link
            href="/report"
            className={`block py-2 px-4 hover:bg-gray-700 rounded ${isActive(
              "/report"
            )}`}
          >
            Report
          </Link>
        </li>
        <li>
          <Link
            href="/insights"
            className={`block py-2 px-4 hover:bg-gray-700 rounded ${isActive(
              "/insights"
            )}`}
          >
            Insights
          </Link>
        </li>
        <li>
          <Link
            href="/inbox"
            className={`block py-2 px-4 hover:bg-gray-700 rounded ${isActive(
              "/inbox"
            )}`}
          >
            Inbox
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className={`block py-2 px-4 hover:bg-gray-700 rounded ${isActive(
              "/settings"
            )}`}
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
