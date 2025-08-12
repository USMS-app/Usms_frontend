// src/pages/CreateTeacher.js
import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";

const classes = [
  "LKG",
  "UKG",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
];

const sectionsList = ["A", "B", "C", "D", "E"];

export default function CreateTeacher() {
  const [teacherName, setTeacherName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [assignedClass, setAssignedClass] = useState("");
  const [section, setSection] = useState("");
  const [className, setClassName] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !teacherName.trim() ||
      !teacherId.trim() ||
      !assignedClass ||
      !section ||
      !className.trim()
    ) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }
    setError("");
    // TODO: API call to save teacher data here

    setSuccess("Teacher created successfully!");
    // Reset form
    setTeacherName("");
    setTeacherId("");
    setAssignedClass("");
    setSection("");
    setClassName("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 text-white max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6">Create Teacher</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-lg space-y-5"
      >
        {/* Teacher Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Teacher Name</label>
          <input
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Enter teacher name"
            className="w-full px-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
            required
          />
        </div>

        {/* Teacher ID */}
        <div>
          <label className="block text-sm font-semibold mb-1">Teacher ID</label>
          <input
            type="text"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            placeholder="Enter unique teacher ID"
            className="w-full px-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
            required
          />
        </div>

        {/* Assigned Class */}
        <div>
          <label className="block text-sm font-semibold mb-1">Assigned Class</label>
          <select
            value={assignedClass}
            onChange={(e) => setAssignedClass(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
            required
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Section */}
        <div>
          <label className="block text-sm font-semibold mb-1">Section</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
            required
          >
            <option value="">Select Section</option>
            {sectionsList.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>

        {/* Class Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Class Name</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Eg: 1st A"
            className="w-full px-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-400">{success}</p>}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:opacity-90 transition font-semibold"
        >
          <Save size={18} /> Create Teacher
        </button>
      </form>
    </motion.div>
  );
}
