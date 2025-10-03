import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../Utils/api";
import { toast } from "react-toastify";

const CitizenDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    myPetitions: 0,
    successfulPetitions: 0,
    pollsCreated: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        toast.error("Could not load dashboard stats.");
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="font-semibold text-[#2D3E50]">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-gray-600">See what's happening in your community.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#E84C3D]">
          <h3 className="text-gray-500 text-sm">My Petitions</h3>
          <p className="text-2xl font-bold text-[#2D3E50]">
            {stats.myPetitions}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#E84C3D]">
          <h3 className="text-gray-500 text-sm">Successful Petitions</h3>
          <p className="text-2xl font-bold text-[#2D3E50]">
            {stats.successfulPetitions}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#E84C3D]">
          <h3 className="text-gray-500 text-sm">Polls Created</h3>
          <p className="text-2xl font-bold text-[#2D3E50]">
            {stats.pollsCreated}
          </p>
        </div>
      </div>
    </>
  );
};

export default CitizenDashboard;
