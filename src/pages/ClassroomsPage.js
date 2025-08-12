import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ClassroomsPage() {
  const [classrooms, setClassrooms] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setClassrooms([
      {
        id: "cls001",
        name: "5th Standard Elite",
        sections: ["A", "B"],
        teacher: "John Doe",
        capacity: 50,
        roomNumber: "R-101",
      },
      {
        id: "cls002",
        name: "6th Grade Advanced",
        sections: ["A"],
        teacher: "Jane Smith",
        capacity: 40,
        roomNumber: "R-102",
      },
    ]);
  }, []);

  const handleEditClick = (cls) => {
    if (editId && editId !== cls.id) {
      toast.error("Please save or cancel your current changes first.");
      return;
    }
    setEditId(cls.id);
    setEditData({
      name: cls.name,
      sections: cls.sections.join(", "),
      teacher: cls.teacher,
      capacity: cls.capacity,
      roomNumber: cls.roomNumber,
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
      setClassrooms((prev) =>
        prev.map((cls) =>
          cls.id === id
            ? {
                ...cls,
                name: editData.name,
                sections: editData.sections.split(",").map((s) => s.trim()),
                teacher: editData.teacher,
                capacity: Number(editData.capacity),
                roomNumber: editData.roomNumber,
              }
            : cls
        )
      );
      setEditId(null);
      setEditData({});
      setIsSaving(false);
      toast.success("Classroom updated successfully!");
    }, 800);
  };

  const handleDelete = (id) => {
    if (editId === id) {
      toast.error("Save or cancel before deleting this classroom.");
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
                setClassrooms((prev) => prev.filter((cls) => cls.id !== id));
                setIsDeleting(false);
                toast.dismiss(t.id);
                toast.success("Classroom deleted");
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
    <div className="p-6 max-w-full bg-gray-900 min-h-screen text-white">
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
      <h2 className="text-3xl font-semibold mb-4">Classrooms Details</h2>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {classrooms.map((cls) => (
          <div
            key={cls.id}
            className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700"
          >
            {editId === cls.id ? (
              <>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full mb-2 bg-gray-700 rounded px-2 py-1 outline-none"
                />
                <input
                  type="text"
                  value={editData.sections}
                  onChange={(e) => handleChange("sections", e.target.value)}
                  className="w-full mb-2 bg-gray-700 rounded px-2 py-1 outline-none"
                  placeholder="Comma separated"
                />
                <input
                  type="text"
                  value={editData.teacher}
                  onChange={(e) => handleChange("teacher", e.target.value)}
                  className="w-full mb-2 bg-gray-700 rounded px-2 py-1 outline-none"
                />
                <input
                  type="number"
                  value={editData.capacity}
                  onChange={(e) => handleChange("capacity", e.target.value)}
                  className="w-full mb-2 bg-gray-700 rounded px-2 py-1 outline-none"
                  min={0}
                />
                <input
                  type="text"
                  value={editData.roomNumber}
                  onChange={(e) => handleChange("roomNumber", e.target.value)}
                  className="w-full mb-4 bg-gray-700 rounded px-2 py-1 outline-none"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleSave(cls.id)}
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
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-2">{cls.name}</h3>
                <p className="mb-1">
                  <span className="font-semibold">Sections:</span>{" "}
                  {cls.sections.join(", ")}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Teacher:</span> {cls.teacher}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Capacity:</span> {cls.capacity}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Room:</span> {cls.roomNumber}
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleEditClick(cls)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cls.id)}
                    disabled={isDeleting}
                    className={`px-3 py-1 rounded ${
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

      {/* Desktop Table */}
      <div className="hidden md:block rounded-lg overflow-hidden shadow-lg border border-gray-700 bg-gray-800">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left">Classroom Name</th>
              <th className="py-3 px-6 text-left">Sections</th>
              <th className="py-3 px-6 text-left">Teacher</th>
              <th className="py-3 px-6 text-left">Capacity</th>
              <th className="py-3 px-6 text-left">Room Number</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classrooms.map((cls, idx) => (
              <tr
                key={cls.id}
                className={`border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                  idx % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                }`}
              >
                {editId === cls.id ? (
                  <>
                    <td className="py-2 px-6">
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full bg-gray-700 rounded px-2 py-1 outline-none"
                      />
                    </td>
                    <td className="py-2 px-6">
                      <input
                        type="text"
                        value={editData.sections}
                        onChange={(e) => handleChange("sections", e.target.value)}
                        className="w-full bg-gray-700 rounded px-2 py-1 outline-none"
                        placeholder="Comma separated"
                      />
                    </td>
                    <td className="py-2 px-6">
                      <input
                        type="text"
                        value={editData.teacher}
                        onChange={(e) => handleChange("teacher", e.target.value)}
                        className="w-full bg-gray-700 rounded px-2 py-1 outline-none"
                      />
                    </td>
                    <td className="py-2 px-6">
                      <input
                        type="number"
                        value={editData.capacity}
                        onChange={(e) => handleChange("capacity", e.target.value)}
                        className="w-full bg-gray-700 rounded px-2 py-1 outline-none"
                        min={0}
                      />
                    </td>
                    <td className="py-2 px-6">
                      <input
                        type="text"
                        value={editData.roomNumber}
                        onChange={(e) => handleChange("roomNumber", e.target.value)}
                        className="w-full bg-gray-700 rounded px-2 py-1 outline-none"
                      />
                    </td>
                    <td className="py-2 px-6 text-center flex gap-2 justify-center">
                      <button
                        onClick={() => handleSave(cls.id)}
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
                    <td className="py-3 px-6">{cls.name}</td>
                    <td className="py-3 px-6">{cls.sections.join(", ")}</td>
                    <td className="py-3 px-6">{cls.teacher}</td>
                    <td className="py-3 px-6">{cls.capacity}</td>
                    <td className="py-3 px-6">{cls.roomNumber}</td>
                    <td className="py-3 px-6 text-center flex gap-2 justify-center">
                      <button
                        onClick={() => handleEditClick(cls)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cls.id)}
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
    </div>
  );
}
