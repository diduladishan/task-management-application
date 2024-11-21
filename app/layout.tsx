import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="mb-2">
          <Navbar />
        </div>

        <div className="flex h-screen">
          <Sidebar />

          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
