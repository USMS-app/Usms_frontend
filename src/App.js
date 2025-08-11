// src/App.js
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import CreateClassroom from "./pages/CreateClassroom";
import CreateTeacher from "./pages/CreateTeacher";
import CreateStudent from "./pages/CreateStudent";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className="flex bg-gray-900 min-h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-4 bg-gray-900 text-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create-classroom" element={<CreateClassroom />} />
              <Route path="/create-teacher" element={<CreateTeacher />} />
              <Route path="/create-student" element={<CreateStudent />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
