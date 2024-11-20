"use client";
import Board from "@/components/Board";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <input
          type="text"
          placeholder="Search tasks"
          className="px-4 py-2 border rounded-lg w-full"
        />
        <div className="text-gray-600 px-4">🔍</div>
      </header>
      <main>
        <Board />
      </main>
    </div>
  );
};

export default Home;
