// src/pages/TeachersPage.js
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // TODO: Replace with real API fetch
    setTeachers([
      {
        id: "tch001",
        name: "John Doe",
        age: 35,
        dateOfJoining: "2020-06-15",
        assignedClasses: ["5th Standard Elite", "6th Grade Advanced"],
      },
      {
        id: "tch002",
        name: "Jane Smith",
        age: 29,
        dateOfJoining: "2019-03-20",
        assignedClasses: ["4th Standard Basics"],
      },
    ]);
  }, []);

  const handleEditClick = (teacher) => {
    if (editId && editId !== teacher.id) {
      toast.error("Please save or cancel your current changes first.");
      return;
    }
    setEditId(teacher.id);
    setEditData({
      name: teacher.name,
      age: teacher.age,
      dateOfJoining: teacher.dateOfJoining,
      assignedClasses: teacher.assignedClasses.join(", "),
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({});
    toast("Edit cancelled", { icon: "✏️" });
  };

  const handleSave = (id) => {
    if (isSaving) return;
    setIsSaving(true);

    setTimeout(() => {
      setTeachers((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                name: editData.name,
                age: Number(editData.age),
                dateOfJoining: editData.dateOfJoining,
                assignedClasses: editData.assignedClasses
                  .split(",")
                  .map((s) => s.trim()),
              }
            : t
        )
      );
      setEditId(null);
      setEditData({});
      setIsSaving(false);
      toast.success("Teacher updated successfully!");
    }, 800);
  };

  const handleDelete = (id) => {
    if (editId === id) {
      toast.error("Save or cancel before deleting this teacher.");
      return;
    }
    if (isDeleting) return;

    toast(
      (t) => (
        <span className="text-white">
          Are you sure?
          <div className="mt-2 flex gap-2">
            <button
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
              onClick={() => {
                setIsDeleting(true);
                setTeachers((prev) => prev.filter((t) => t.id !== id));
                setIsDeleting(false);
                toast.dismiss(t.id);
                toast.success("Teacher deleted");
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </span>
      ),
      { duration: 5000 }
    );
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 text-white">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
          },
        }}
      />
      <h2 className="text-3xl font-bold mb-6">Teachers Details</h2>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-2 px-4">Teacher Name</th>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Age</th>
              <th className="py-2 px-4">Date of Joining</th>
              <th className="py-2 px-4">Assigned Classes</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr
                key={teacher.id}
                className="border-b border-gray-700 hover:bg-gray-800 transition"
              >
                {editId === teacher.id ? (
                  <>
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full bg-gray-700 rounded px-2 py-1 outline-none"
                      />
                    </td>
                    <td className="py-2 px-4">{teacher.id}</td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        value={editData.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                        className="w-full bg-gray-700 rounded px-2 py-1 outline-none"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="date"
                        value={editData.dateOfJoining}
                        onChange={(e) =>
                          handleChange("dateOfJoining", e.target.value)
                        }
                        className="w-full bg-gray-700 rounded px-2 py-1 outline-none"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        value={editData.assignedClasses}
                        onChange={(e) =>
                          handleChange("assignedClasses", e.target.value)
                        }
                        className="w-full bg-gray-700 rounded px-2 py-1 outline-none"
                        placeholder="Comma separated"
                      />
                    </td>
                    <td className="py-2 px-4 flex gap-2 justify-center">
                      <button
                        onClick={() => handleSave(teacher.id)}
                        disabled={isSaving}
                        className={`px-3 py-1 rounded ${
                          isSaving
                            ? "bg-green-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4">{teacher.name}</td>
                    <td className="py-2 px-4">{teacher.id}</td>
                    <td className="py-2 px-4">{teacher.age}</td>
                    <td className="py-2 px-4">{teacher.dateOfJoining}</td>
                    <td className="py-2 px-4">
                      {teacher.assignedClasses.join(", ")}
                    </td>
                    <td className="py-2 px-4 flex gap-2 justify-center">
                      <button
                        onClick={() => handleEditClick(teacher)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.id)}
                        disabled={isDeleting}
                        className={`px-3 py-1 rounded ${
                          isDeleting
                            ? "bg-red-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700"
          >
            {editId === teacher.id ? (
              <>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full bg-gray-700 rounded px-2 py-1 outline-none mb-2"
                />
                <p className="mb-2 text-sm text-gray-400">ID: {teacher.id}</p>
                <input
                  type="number"
                  value={editData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  className="w-full bg-gray-700 rounded px-2 py-1 outline-none mb-2"
                />
                <input
                  type="date"
                  value={editData.dateOfJoining}
                  onChange={(e) =>
                    handleChange("dateOfJoining", e.target.value)
                  }
                  className="w-full bg-gray-700 rounded px-2 py-1 outline-none mb-2"
                />
                <input
                  type="text"
                  value={editData.assignedClasses}
                  onChange={(e) => handleChange("assignedClasses", e.target.value)}
                  className="w-full bg-gray-700 rounded px-2 py-1 outline-none mb-2"
                  placeholder="Comma separated"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(teacher.id)}
                    disabled={isSaving}
                    className={`flex-1 px-3 py-1 rounded ${
                      isSaving
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold">{teacher.name}</h3>
                <p className="text-sm text-gray-400">ID: {teacher.id}</p>
                <p>Age: {teacher.age}</p>
                <p>Date of Joining: {teacher.dateOfJoining}</p>
                <p>Assigned Classes: {teacher.assignedClasses.join(", ")}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleEditClick(teacher)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id)}
                    disabled={isDeleting}
                    className={`flex-1 px-3 py-1 rounded ${
                      isDeleting
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
