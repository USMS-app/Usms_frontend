// src/pages/StudentsPage.js
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // TODO: Replace with real API fetch
    setStudents([
      {
        id: "stu001",
        name: "Alice Johnson",
        studentId: "S1001",
        class: "5th Standard Elite",
        section: "A",
        rollNumber: "12",
        parentName: "Mary Johnson",
      },
      {
        id: "stu002",
        name: "Bob Smith",
        studentId: "S1002",
        class: "5th Standard Elite",
        section: "B",
        rollNumber: "15",
        parentName: "John Smith",
      },
    ]);
  }, []);

  const handleEdit = (id) => {
    toast.success(`Editing student with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    toast.error(`Deleted student with ID: ${id}`);
  };

  return (
    <div className="p-6 text-white">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-6">Students Details</h2>

      {/* Mobile View - Cards */}
      <div className="md:hidden space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700"
          >
            <h3 className="text-xl font-bold mb-2">{student.name}</h3>
            <p><span className="font-semibold">Student ID:</span> {student.studentId}</p>
            <p><span className="font-semibold">Class:</span> {student.class}</p>
            <p><span className="font-semibold">Section:</span> {student.section}</p>
            <p><span className="font-semibold">Roll Number:</span> {student.rollNumber}</p>
            <p><span className="font-semibold">Parent/Guardian:</span> {student.parentName}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(student.id)}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-2 px-4">Student Name</th>
              <th className="py-2 px-4">Student ID</th>
              <th className="py-2 px-4">Class</th>
              <th className="py-2 px-4">Section</th>
              <th className="py-2 px-4">Roll Number</th>
              <th className="py-2 px-4">Parent/Guardian</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-b border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.studentId}</td>
                <td className="py-2 px-4">{student.class}</td>
                <td className="py-2 px-4">{student.section}</td>
                <td className="py-2 px-4">{student.rollNumber}</td>
                <td className="py-2 px-4">{student.parentName}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
