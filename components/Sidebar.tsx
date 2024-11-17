import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <ul>
        <li>
          <Link
            href="/home"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/tasks"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Tasks
          </Link>
        </li>
        <li>
          <Link
            href="/report"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Report
          </Link>
        </li>
        <li>
          <Link
            href="/insights"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Insights
          </Link>
        </li>
        <li>
          <Link
            href="/inbox"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Inbox
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
