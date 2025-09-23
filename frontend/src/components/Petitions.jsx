import React, { useMemo, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Petitions = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Hook for navigation
  const [petitions, setPetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Filter State ---
  const [activeTag, setActiveTag] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // --- Fetch Petitions from API ---
  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/petitions", {
          withCredentials: true,
        });
        setPetitions(res.data);
      } catch (err) {
        toast.error("Failed to fetch petitions.");
      } finally {
        setLoading(false);
      }
    };
    fetchPetitions();
  }, []);

  // --- Derived filter options ---
  const locations = useMemo(() => {
    const uniq = Array.from(new Set(petitions.map((p) => p.location)));
    return ["All Locations", ...uniq];
  }, [petitions]);

  const categories = useMemo(() => {
    const uniq = Array.from(new Set(petitions.map((p) => p.category)));
    return ["All Categories", ...uniq];
  }, [petitions]);

  const statuses = ["All", "Active", "Closed"];

  // --- Filtered results ---
  const filteredPetitions = useMemo(() => {
    if (!user) return [];
    return petitions.filter((p) => {
      if (
        selectedLocation !== "All Locations" &&
        p.location !== selectedLocation
      )
        return false;
      if (
        selectedCategory !== "All Categories" &&
        p.category !== selectedCategory
      )
        return false;
      if (selectedStatus !== "All" && p.status !== selectedStatus) return false;
      if (activeTag === "My Petitions" && p.owner._id !== user.id) return false;
      if (activeTag === "Signed by Me" && !p.signatures.includes(user.id))
        return false;
      return true;
    });
  }, [
    petitions,
    selectedLocation,
    selectedCategory,
    selectedStatus,
    activeTag,
    user,
  ]);

  const handleSign = async (petitionId) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/petitions/${petitionId}/sign`,
        {},
        { withCredentials: true }
      );
      setPetitions((prev) =>
        prev.map((p) => (p._id === petitionId ? res.data : p))
      );
      toast.success("Petition signed successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to sign petition.");
    }
  };

  function clearFilters() {
    setActiveTag("All");
    setSelectedLocation("All Locations");
    setSelectedCategory("All Categories");
    setSelectedStatus("All");
  }

  function circleProgressProps(percent, radius = 22) {
    const circumference = 2 * Math.PI * radius;
    const dashoffset =
      circumference * (1 - Math.max(0, Math.min(100, percent)) / 100);
    return { circumference, dashoffset, radius };
  }

  if (loading) {
    return <div className="p-6 text-center">Loading petitions...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2D3E50]">Petitions</h1>
          <p className="text-gray-600">
            Explore, support, and track petitions shaping your community.
          </p>
        </div>
        <button
          onClick={() => navigate("/petitions/create")}
          className="px-4 py-2 bg-[#E84C3D] text-white font-semibold rounded-lg hover:bg-red-600 transition"
        >
          Create New Petition
        </button>
      </div>

      {/* Top filter row */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
        {/* Left: tag chips */}
        <div className="flex flex-wrap gap-3">
          {["All", "My Petitions", "Signed by Me"].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeTag === tag
                  ? "bg-[#E84C3D] text-white shadow"
                  : "bg-white text-[#2D3E50] hover:bg-[#E84C3D] hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Filter inputs */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 text-[#2D3E50] hover:bg-gray-300 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing{" "}
        <strong className="text-[#2D3E50]">{filteredPetitions.length}</strong>{" "}
        petition(s)
      </div>

      {/* Petition Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPetitions.map((petition) => {
          const percent = petition.goal
            ? Math.round((petition.signatures.length / petition.goal) * 100)
            : 0;
          const { circumference, dashoffset, radius } =
            circleProgressProps(percent);
          const hasSigned = user && petition.signatures.includes(user.id);

          return (
            <article
              key={petition._id}
              className="relative bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 hover:-translate-y-2 transform transition-all shadow-md hover:shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-[#E84C3D] uppercase">
                  {petition.category}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(petition.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-[#2D3E50] mb-2">
                {petition.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                {petition.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      className="-rotate-90"
                    >
                      <circle
                        cx="24"
                        cy="24"
                        r={radius}
                        stroke="#e6e6e6"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r={radius}
                        stroke="#E84C3D"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-[#2D3E50]">
                      {petition.signatures.length}/{petition.goal}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Signatures</div>
                    <div className="text-sm font-medium text-[#2D3E50]">
                      {percent}%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      petition.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {petition.status}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {petition.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 mt-auto">
                <button className="px-3 py-1 text-sm border border-[#2D3E50] text-[#2D3E50] rounded-lg hover:bg-[#2D3E50] hover:text-white transition">
                  View
                </button>
                <button
                  onClick={() => handleSign(petition._id)}
                  className={`px-3 py-1 text-sm text-white rounded-lg transition ${
                    hasSigned || petition.status !== "Active"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#E84C3D] hover:opacity-90"
                  }`}
                  disabled={hasSigned || petition.status !== "Active"}
                >
                  {hasSigned ? "Signed" : "Sign"}
                </button>
              </div>
            </article>
          );
        })}
        {filteredPetitions.length === 0 && (
          <div className="col-span-full bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-600">
            No petitions found with the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Petitions; // Make sure to use default export
