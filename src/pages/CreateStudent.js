// src/pages/CreateStudent.js
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

export default function CreateStudent() {
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [assignedClass, setAssignedClass] = useState("");
  const [section, setSection] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [parentName, setParentName] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !studentName.trim() ||
      !studentId.trim() ||
      !assignedClass ||
      !section ||
      !rollNumber.trim() ||
      !parentName.trim()
    ) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }
    setError("");
    // TODO: API call to save student data

    setSuccess("Student created successfully!");
    // Reset form
    setStudentName("");
    setStudentId("");
    setAssignedClass("");
    setSection("");
    setRollNumber("");
    setParentName("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 text-white max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6">Create Student</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-lg space-y-5"
      >
        {/* Student Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Student Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name"
            className="w-full px-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
            required
          />
        </div>

        {/* Student ID */}
        <div>
          <label className="block text-sm font-semibold mb-1">Student ID</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter unique student ID"
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

        {/* Roll Number */}
        <div>
          <label className="block text-sm font-semibold mb-1">Roll Number</label>
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter roll number"
            className="w-full px-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
            required
          />
        </div>

        {/* Parent/Guardian Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Parent/Guardian Name</label>
          <input
            type="text"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            placeholder="Enter parent or guardian name"
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
          <Save size={18} /> Create Student
        </button>
      </form>
    </motion.div>
  );
}
