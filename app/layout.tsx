import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import "./globals.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {/* Sidebar on the left */}
        <div className="flex h-screen">
          <Sidebar />
          {/* Content area on the right */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
