import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function PlannerPage() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // define and immediately call fetchSlots so it is ALWAYS in scope
    const fetchSlots = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get("/plans/current");

        // If backend returns 404, treat it as “no plan yet”, not a hard error
      } catch (err) {
        console.error("Failed to load planner:", err);

        if (err.response && err.response.status === 404) {
          // No current plan for this user – empty planner, no red error
          setSlots([]);
          setError(null);
        } else {
          setError("Could not load your weekly planner from the server.");
          setSlots([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100">
      {/* Error banner */}
      {error && (
        <div className="max-w-4xl mx-auto mt-6 px-4">
          <div className="bg-red-600 text-white text-sm px-4 py-3 rounded-md shadow">
            {error}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Weekly planner</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your current plan from the backend. If there’s no plan yet, you’ll
            see an empty planner.
          </p>
        </header>

        {/* Empty state when there is simply no plan / no slots */}
        {slots.length === 0 && !error && (
          <EmptyState message="No meals planned yet. Add some meals to start building your week." />
        )}

        {/* Simple list of slots (day, time, meal) */}
        {slots.length > 0 && (
          <div className="space-y-3">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold capitalize">
                    {slot.day} • {slot.meal_time}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {slot.meal && slot.meal.name
                      ? slot.meal.name
                      : "No meal assigned yet"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}