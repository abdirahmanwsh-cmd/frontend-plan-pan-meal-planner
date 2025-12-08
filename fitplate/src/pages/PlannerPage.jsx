import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PlannerPage() {
  const [slots, setSlots] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    fetchSlots();
    fetchMeals();
  }, []);

  // Fetch current planner slots
  async function fetchSlots() {
    setLoading(true);
    try {
      const res = await apiClient.get("/plans/current");
      setSlots(res.data.slots || []);
    } catch (err) {
      console.error(err);
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }

  // Fetch all meals for assignment
  async function fetchMeals() {
    try {
      const res = await apiClient.get("/meals");
      setMeals(res.data);
    } catch (err) {
      console.error("Failed to fetch meals:", err);
      setMeals([]);
    }
  }

  // Open modal for assigning a meal to a slot
  const handleAssignClick = (slot) => {
    setActiveSlot(slot);
    setShowAssignModal(true);
  };

  // Assign selected meal to active slot
  const handleAssignMeal = async (meal) => {
    try {
      // Update backend
      await apiClient.patch(`/plans/current/slots/${activeSlot.id}`, { meal_id: meal.id });

      // Update local state immediately
      setSlots((prev) =>
        prev.map((s) =>
          s.id === activeSlot.id ? { ...s, meal } : s
        )
      );

      setShowAssignModal(false);
      setActiveSlot(null);
    } catch (err) {
      console.error(err);
      alert("Failed to assign meal.");
    }
  };

  // Clear meal from slot
  const handleClearMeal = async (slotId) => {
    try {
      await apiClient.patch(`/plans/current/slots/${slotId}`, { meal_id: null });
      setSlots((prev) =>
        prev.map((s) => (s.id === slotId ? { ...s, meal: null } : s))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to clear meal.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Group slots by day for the grid
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealTimes = ["breakfast", "lunch", "dinner"];
  const slotsByDay = days.map((day) => ({
    day,
    slots: mealTimes.map((meal_time) => slots.find((s) => s.day === day && s.meal_time === meal_time) || { id: `${day}-${meal_time}`, day, meal_time, meal: null }),
  }));

  return (
    <div className="min-h-screen p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Weekly Planner</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Assign meals to each day and meal time.
        </p>
      </header>

      {slots.length === 0 && <EmptyState message="No meals planned yet. Add meals to start building your week." />}

      {/* Weekly grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {slotsByDay.map((dayObj) => (
          <div key={dayObj.day} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-2">
            <h2 className="font-semibold text-center mb-2">{dayObj.day}</h2>
            {dayObj.slots.map((slot) => (
              <div key={slot.id} className="flex flex-col items-center mb-2 p-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm w-full">
                <p className="text-xs mb-1 capitalize">{slot.meal_time}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 text-center">
                  {slot.meal?.name || "No meal assigned"}
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleAssignClick(slot)}
                    className="px-2 py-1 bg-purple-500 hover:bg-purple-600 text-white text-xs rounded"
                  >
                    Assign/Edit
                  </button>
                  {slot.meal && (
                    <button
                      onClick={() => handleClearMeal(slot.id)}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Assign meal modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="mb-4 font-bold text-lg">Assign Meal</h2>
            <ul className="space-y-2">
              {meals.map((meal) => (
                <li key={meal.id}>
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    onClick={() => handleAssignMeal(meal)}
                  >
                    {meal.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
              onClick={() => setShowAssignModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
