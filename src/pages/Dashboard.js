// src/pages/Dashboard.js
export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">Welcome, Admin</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold">Total Classrooms</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-red-500 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold">Total Teachers</h3>
          <p className="text-3xl font-bold">8</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-teal-500 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold">Total Students</h3>
          <p className="text-3xl font-bold">240</p>
        </div>
      </div>
    </div>
  );
}
