// PlannerPage.jsx - Simple with error handling
import React, { useEffect, useState } from "react";
import PlannerGrid from "../components/PlannerGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import apiClient from "../api/client";

export default function PlannerPage() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSlots();
  }, []);

  async function fetchSlots() {
    try {
      setLoading(true);
      // This will fail if backend isn't running 
      const response = await apiClient.get("/plans/current");
      setSlots(response.data || []);
    } catch (err) {
      console.log("Backend might not be running yet:", err.message);
      setError("Couldn't connect to server");
      // Use empty array so page still renders
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Simple error display - not too fancy
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
          <p className="text-yellow-800">⚠️ {error}</p>
          <p className="text-sm text-yellow-600 mt-1">
            Make sure your backend server is running on port 8000
          </p>
          <button
            onClick={fetchSlots}
            className="mt-2 px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
          >
            Try Again
          </button>
        </div>
        <PlannerGrid slots={slots} /> {/* Still render with empty data */}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold text-center my-4">Weekly Planner</h1>
      <PlannerGrid slots={slots} />
    </div>
  );
}