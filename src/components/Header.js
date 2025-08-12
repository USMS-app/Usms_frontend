// src/components/Header.js
import { Sun, Moon, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header({ toggleSidebar }) {
  const [dark, setDark] = useState(true);

  // Load saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const isDark = savedTheme === "dark";
      setDark(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      // Default to dark mode
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <header className="flex justify-between items-center bg-gray-800/80 dark:bg-gray-200/80 backdrop-blur-lg p-4 shadow-md transition-colors">
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        <button className="sm:hidden" onClick={toggleSidebar}>
          <Menu className="text-white dark:text-gray-900" size={24} />
        </button>
        <h2 className="text-xl font-semibold text-white dark:text-gray-900">Dashboard</h2>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-300 transition"
      >
        {dark ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
      </button>
    </header>
  );
}
