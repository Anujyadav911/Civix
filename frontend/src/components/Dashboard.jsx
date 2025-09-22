import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  FileText,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Switched to useAuth for consistency
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // 1. Import toast

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth(); // Get user and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears the user's session
    // 2. Add the success toast notification here
    toast.success("You have been logged out successfully.");
    navigate("/login"); // Redirects to the login page
  };

  // Add a loading state for when user data is being fetched from localStorage
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#2D3E50] text-white shadow-md transform transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static`}
      >
        <div className="p-6 text-xl font-bold flex justify-between items-center">
          Civix <span className="text-gray-400 text-sm">Beta</span>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        <nav className="mt-6 space-y-2">
          <a
            href="#"
            className="flex items-center px-6 py-2 bg-[#E84C3D] text-white rounded-r-full"
          >
            <Home className="w-5 h-5 mr-3" /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-2 hover:bg-[#E84C3D] hover:text-white text-gray-200"
          >
            <FileText className="w-5 h-5 mr-3" /> Petitions
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-2 hover:bg-[#E84C3D] hover:text-white text-gray-200"
          >
            <BarChart2 className="w-5 h-5 mr-3" /> Polls
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-2 hover:bg-[#E84C3D] hover:text-white text-gray-200"
          >
            <Users className="w-5 h-5 mr-3" /> Officials
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-2 hover:bg-[#E84C3D] hover:text-white text-gray-200"
          >
            <BarChart2 className="w-5 h-5 mr-3" /> Reports
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-2 hover:bg-[#E84C3D] hover:text-white text-gray-200"
          >
            <Settings className="w-5 h-5 mr-3" /> Settings
          </a>
        </nav>

        <div className="mt-6 border-t border-gray-600">
          <a
            href="#"
            className="flex items-center px-6 py-3 hover:bg-[#E84C3D] hover:text-white text-gray-200"
          >
            <HelpCircle className="w-5 h-5 mr-3" /> Help & Support
          </a>
        </div>

        {/* Logout Button */}
        <div className="mt-auto border-t border-gray-600 p-4">
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-6">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-6 font-medium">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-[#2D3E50]" />
            </button>
            <nav className="hidden sm:flex space-x-4 md:space-x-6 text-[#2D3E50]">
              <a href="#" className="text-[#E84C3D]">
                Home
              </a>
              <a href="#">Petitions</a>
              <a href="#">Polls</a>
              <a href="#">Reports</a>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-[#2D3E50] text-white w-8 h-8 flex items-center justify-center rounded-full">
              {user.name[0].toUpperCase()}
            </span>
            <span className="font-medium text-[#2D3E50]">{user.name}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 bg-white shadow rounded-lg p-4">
          <div className="bg-[#2D3E50] text-white w-12 h-12 flex items-center justify-center rounded-full">
            {user.name[0].toUpperCase()}
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <h2 className="font-semibold text-[#2D3E50]">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.role}</p>
            <p className="text-gray-600 text-sm">{user.location}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#2D3E50]">
            Welcome back, {user.name}!
          </h2>
          <p className="text-gray-600">
            See what's happening in your community and make your voice heard.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#E84C3D]">
            <h3 className="text-gray-500 text-sm">My Petitions</h3>
            <p className="text-2xl font-bold text-[#2D3E50]">0</p>
            <p className="text-gray-500 text-sm">petitions</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#E84C3D]">
            <h3 className="text-gray-500 text-sm">Successful Petitions</h3>
            <p className="text-2xl font-bold text-[#2D3E50]">0</p>
            <p className="text-gray-500 text-sm">or under review</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#E84C3D]">
            <h3 className="text-gray-500 text-sm">Polls Created</h3>
            <p className="text-2xl font-bold text-[#2D3E50]">0</p>
            <p className="text-gray-500 text-sm">polls</p>
          </div>
        </div>

        {/* Active Petitions */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold mb-3 text-[#2D3E50]">
            Active Petitions Near You
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              "All Categories",
              "Environment",
              "Infrastructure",
              "Education",
              "Public Safety",
              "Transportation",
              "Healthcare",
              "Housing",
            ].map((cat, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded-full text-sm ${
                  i === 0
                    ? "bg-[#E84C3D] text-white"
                    : "bg-gray-100 text-[#2D3E50]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-500">
              Showing for:{" "}
              <span className="font-medium text-[#2D3E50]">
                {user.location}
              </span>
            </p>
          </div>
          <p className="text-gray-500 text-center py-6">
            No petitions found with the current filters.
          </p>
          <div className="text-center">
            <button className="px-4 py-2 bg-[#2D3E50] text-white rounded-lg hover:bg-[#E84C3D] transition">
              Clear Filters
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
