import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // assuming react-router
import { Edit, Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";

// Dummy fetch function to simulate getting students for this teacher
// Replace with actual API calls
const fetchStudents = (teacherId) =>
  Promise.resolve([
    {
      id: "stu001",
      name: "Alice Johnson",
      class: "5th",
      section: "A",
      rollNumber: "12",
      parentName: "Mary Johnson",
    },
    {
      id: "stu002",
      name: "Bob Smith",
      class: "5th",
      section: "A",
      rollNumber: "15",
      parentName: "John Smith",
    },
  ]);

export default function TeacherDashboard({ teacher }) {
  // teacher is an object { id, name, age, dateOfJoining }
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    // Fetch students for this teacher
    fetchStudents(teacher.id).then(setStudents);
  }, [teacher.id]);

  // Delete student handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      // Call API to delete, then update state:
      setStudents((prev) => prev.filter((s) => s.id !== id));
      // TODO: call backend API to delete student by id
    }
  };

  // Start editing a student
  const handleEditClick = (student) => {
    setEditingStudent(student.id);
    setEditData(student);
  };

  // Handle change in edit form
  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  // Save edited student info
  const handleSaveEdit = () => {
    // TODO: call API to save updated student info

    setStudents((prev) =>
      prev.map((stu) => (stu.id === editingStudent ? editData : stu))
    );
    setEditingStudent(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingStudent(null);
    setEditData({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 max-w-4xl mx-auto text-white"
    >
      {/* Teacher Profile */}
      <div className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow mb-8">
        <h1 className="text-3xl font-bold mb-3">{teacher.name}</h1>
        <p><strong>ID:</strong> {teacher.id}</p>
        <p><strong>Age:</strong> {teacher.age}</p>
        <p><strong>Date of Joining:</strong> {teacher.dateOfJoining}</p>
      </div>

      {/* Create Student Button */}
      <div className="mb-6">
        <Link
          to="/create-student"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          <Plus size={20} /> Create New Student
        </Link>
      </div>

      {/* Students List */}
      <div className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Your Students</h2>
        {students.length === 0 ? (
          <p>No students assigned yet.</p>
        ) : (
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-gray-900/90 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                {editingStudent === student.id ? (
                  <>
                    <input
                      type="text"
                      className="p-2 rounded bg-gray-700 text-white flex-grow"
                      value={editData.name}
                      onChange={(e) => handleEditChange("name", e.target.value)}
                    />
                    <input
                      type="text"
                      className="p-2 rounded bg-gray-700 text-white w-20"
                      value={editData.class}
                      onChange={(e) => handleEditChange("class", e.target.value)}
                    />
                    <input
                      type="text"
                      className="p-2 rounded bg-gray-700 text-white w-16"
                      value={editData.section}
                      onChange={(e) => handleEditChange("section", e.target.value)}
                    />
                    <input
                      type="text"
                      className="p-2 rounded bg-gray-700 text-white w-20"
                      value={editData.rollNumber}
                      onChange={(e) =>
                        handleEditChange("rollNumber", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className="p-2 rounded bg-gray-700 text-white flex-grow"
                      value={editData.parentName}
                      onChange={(e) =>
                        handleEditChange("parentName", e.target.value)
                      }
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-1 bg-green-600 rounded hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-grow space-y-1">
                      <p className="font-semibold text-lg">{student.name}</p>
                      <p>
                        Class: {student.class} - Section: {student.section} - Roll #:{" "}
                        {student.rollNumber}
                      </p>
                      <p>Parent: {student.parentName}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditClick(student)}
                        className="p-2 bg-blue-600 rounded hover:bg-blue-700 transition"
                        title="Edit Student"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="p-2 bg-red-600 rounded hover:bg-red-700 transition"
                        title="Delete Student"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
