import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import api from "../Utils/api";

const OfficialDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({
    totalPetitions: 0,
    updatedPetitions: 0,
    totalPolls: 0,
    updatedPolls: 0,
  });
  const [allPetitions, setAllPetitions] = useState([]);
  const [allPolls, setAllPolls] = useState([]);
  const [view, setView] = useState("stats"); // 'stats', 'petitions', or 'polls'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        // Fetch all dashboard data, all petitions, and all polls at the same time
        const [statsRes, petitionsRes, pollsRes] = await Promise.all([
          api.get("/dashboard/official-stats"),
          api.get("/petitions"),
          api.get("/polls"),
        ]);
        setStats(statsRes.data.stats);
        setAllPetitions(petitionsRes.data);
        setAllPolls(pollsRes.data);
      } catch (err) {
        toast.error("Could not load all dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchAllData();
    }
  }, [authLoading, user]);

  const handleStatusUpdate = async (petitionId, newStatus) => {
    try {
      const res = await api.put(`/petitions/${petitionId}/status`, {
        status: newStatus,
      });

      setAllPetitions((prev) =>
        prev.map((p) =>
          p._id === petitionId ? { ...p, status: res.data.status } : p
        )
      );
      toast.success("Petition status updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status.");
    }
  };

  if (authLoading || loading) {
    return <div className="p-6 text-center">Loading Official Dashboard...</div>;
  }

  // A function to render the main content based on the 'view' state
  const renderContent = () => {
    switch (view) {
      case "petitions":
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#2D3E50] mb-4">
              All Petitions ({allPetitions.length})
            </h3>
            <div className="space-y-4">
              {allPetitions.map((petition) => (
                <div
                  key={petition._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg border"
                >
                  <div>
                    <Link
                      to={`/petitions/${petition._id}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {petition.title}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {petition.signatures.length} signatures •{" "}
                      {petition.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <select
                      defaultValue={petition.status}
                      onChange={(e) =>
                        handleStatusUpdate(petition._id, e.target.value)
                      }
                      className="text-sm border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#3498DB]"
                    >
                      <option value="Active">Active</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "polls":
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#2D3E50] mb-4">
              All Polls ({allPolls.length})
            </h3>
            <div className="space-y-4">
              {allPolls.map((poll) => (
                <div
                  key={poll._id}
                  className="p-3 bg-gray-50 rounded-lg border"
                >
                  <p className="font-semibold">{poll.question}</p>
                  <p className="text-sm text-gray-500">
                    {poll.location} •{" "}
                    {poll.options.reduce((acc, opt) => acc + opt.votes, 0)}{" "}
                    total votes
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      default: // 'stats' view
        return (
          <div className="text-center text-gray-500 p-4">
            Select a view above to see all petitions or polls.
          </div>
        );
    }
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-[#2D3E50]">
          Official Dashboard
        </h2>
        <p className="text-gray-600">
          Welcome, {user?.name}! Review and manage all civic engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#E84C3D]">
          <h3 className="text-gray-500 text-sm">Total Petitions</h3>
          <p className="text-2xl font-bold text-[#2D3E50]">
            {stats.totalPetitions}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#3498DB]">
          <h3 className="text-gray-500 text-sm">Updated Petitions</h3>
          <p className="text-2xl font-bold text-[#2D3E50]">
            {stats.updatedPetitions}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#2ECC71]">
          <h3 className="text-gray-500 text-sm">Total Polls</h3>
          <p className="text-2xl font-bold text-[#2D3E50]">
            {stats.totalPolls}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#F1C40F]">
          <h3 className="text-gray-500 text-sm">Updated Polls</h3>
          <p className="text-2xl font-bold text-[#2D3E50]">
            {stats.updatedPolls}
          </p>
        </div>
      </div>

      <div className="mb-6 flex space-x-4 border-b pb-4">
        <button
          onClick={() => setView("stats")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            view === "stats"
              ? "bg-[#2D3E50] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Dashboard Stats
        </button>
        <button
          onClick={() => setView("petitions")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            view === "petitions"
              ? "bg-[#2D3E50] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Show All Petitions
        </button>
        <button
          onClick={() => setView("polls")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            view === "polls"
              ? "bg-[#2D3E50] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Show All Polls
        </button>
      </div>

      {renderContent()}
    </>
  );
};

export default OfficialDashboard;
