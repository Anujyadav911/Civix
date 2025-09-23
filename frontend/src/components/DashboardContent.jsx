import React from "react";
import { useAuth } from "../context/AuthContext";

const DashboardContent = () => {
  const { user } = useAuth();

  if (!user) return null; // Or a loading spinner

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="font-semibold text-[#2D3E50]">
          Welcome back, {user.name}!
        </h2>
        <p className="text-gray-600">
          See what's happening in your community and make your voice heard.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#E84C3D]">
          <h3 className="text-gray-500 text-sm">My Petitions</h3>
          <p className="text-2xl font-bold text-[#2D3E50]">0</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#E84C3D]">
          <h3 className="text-gray-500 text-sm">Successful Petitions</h3>
          <p className="text-2xl font-bold text-[#2D3E50]">0</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#E84C3D]">
          <h3 className="text-gray-500 text-sm">Polls Created</h3>
          <p className="text-2xl font-bold text-[#2D3E50]">0</p>
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
