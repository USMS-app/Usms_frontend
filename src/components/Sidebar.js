// src/components/Sidebar.js
import { Link, useLocation } from "react-router-dom";
import { Home, Users, GraduationCap, UserPlus, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const linkClasses = (path) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all ${
      location.pathname === path
        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
        : "text-gray-200 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed sm:static top-0 left-0 h-full w-64 backdrop-blur-lg bg-gray-900/70 text-white p-5 z-50 sm:translate-x-0`}
    >
      {/* Close button for mobile */}
      <div className="sm:hidden flex justify-end mb-4">
        <button onClick={toggleSidebar}>
          <X size={24} />
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        USMS Admin
      </h1>
      <nav className="flex flex-col gap-2">
        <Link to="/" className={linkClasses("/")} onClick={toggleSidebar}>
          <Home size={20} /> Dashboard
        </Link>
        <Link to="/create-classroom" className={linkClasses("/create-classroom")} onClick={toggleSidebar}>
          <GraduationCap size={20} /> Create Classroom
        </Link>
        <Link to="/create-teacher" className={linkClasses("/create-teacher")} onClick={toggleSidebar}>
          <Users size={20} /> Create Teacher
        </Link>
        <Link to="/create-student" className={linkClasses("/create-student")} onClick={toggleSidebar}>
          <UserPlus size={20} /> Create Student
        </Link>
      </nav>
    </motion.div>
  );
}
