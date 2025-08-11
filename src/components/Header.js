// src/components/Header.js
import { Sun, Moon, Menu } from "lucide-react";
import { useState } from "react";

export default function Header({ toggleSidebar }) {
  const [dark, setDark] = useState(true);

  return (
    <header className="flex justify-between items-center bg-gray-800/80 backdrop-blur-lg p-4 shadow-md">
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        <button className="sm:hidden" onClick={toggleSidebar}>
          <Menu className="text-white" size={24} />
        </button>
        <h2 className="text-xl font-semibold text-white">Dashboard</h2>
      </div>
      <button
        onClick={() => setDark(!dark)}
        className="p-2 rounded-full hover:bg-gray-700 transition"
      >
        {dark ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-300" />}
      </button>
    </header>
  );
}
