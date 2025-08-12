// src/pages/CreateClassroom.js
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Save } from "lucide-react";

export default function CreateClassroom() {
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

  const teachers = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Davis",
    "Sarah Wilson",
  ];

  const [className, setClassName] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [sections, setSections] = useState(["A"]);
  const [teacher, setTeacher] = useState("");
  const [capacity, setCapacity] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const handleAddSection = () => {
    setSections([...sections, ""]);
  };

  const handleRemoveSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSectionChange = (index, value) => {
    const updated = [...sections];
    updated[index] = value;
    setSections(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newClassroom = {
      className,
      classLevel,
      sections,
      teacher,
      capacity,
      roomNumber,
    };
    console.log("Classroom Created:", newClassroom);
    alert("Classroom created successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 text-white"
    >
      <h2 className="text-2xl font-bold mb-6">Create Classroom</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-lg space-y-4"
      >
        {/* Classroom Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Classroom Name
          </label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
            placeholder="Eg: 5th Standard Elite"
            required
          />
        </div>

        {/* Class Level */}
        <div>
          <label className="block text-sm font-semibold mb-1">Class</label>
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
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

        {/* Sections */}
        <div>
          <label className="block text-sm font-semibold mb-1">Sections</label>
          {sections.map((section, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={section}
                onChange={(e) =>
                  handleSectionChange(index, e.target.value.toUpperCase())
                }
                className="flex-1 px-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
                placeholder="Eg: A"
                required
              />
              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSection(index)}
                  className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition"
                >
                  <Minus size={16} />
                </button>
              )}
              {index === sections.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="p-2 rounded-full bg-green-600 hover:bg-green-700 transition"
                >
                  <Plus size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Assign Class Teacher */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Assign Class Teacher
          </label>
          <select
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Max Capacity
          </label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
            placeholder="Eg: 50"
            required
          />
        </div>

        {/* Room Number */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Room Number
          </label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
            placeholder="Eg: R-201"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:opacity-90 transition font-semibold"
        >
          <Save size={18} /> Create Classroom
        </button>
      </form>
    </motion.div>
  );
}