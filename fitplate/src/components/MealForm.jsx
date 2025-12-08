import React, { useState } from "react";
import apiClient from "../api/client";

export default function MealForm({ isOpen, onClose, onSaved }) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [tags, setTags] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null; // don't render anything if modal is closed

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // very light validation
    if (!name.trim() || !calories) {
      setError("Name and calories are required.");
      return;
    }

    try {
      setSubmitting(true);

      await apiClient.post("/meals/", {
        name: name.trim(),
        calories: Number(calories),
        tags: tags.trim() || null,
      });

      // reset form
      setName("");
      setCalories("");
      setTags("");

      if (onSaved) onSaved(); // ask parent to re-fetch meals
      onClose();
    } catch (err) {
      console.error("Failed to create meal:", err);
      setError("Could not save the meal. Check backend logs.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold text-white">Add New Meal</h2>

        {error && (
          <p className="mb-3 rounded bg-red-500/80 px-3 py-2 text-sm text-white">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-200">Name</label>
            <input
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Grilled Chicken Salad"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-200">
              Calories
            </label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="e.g. 450"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-200">
              Tags (optional, comma-separated)
            </label>
            <input
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. lunch, high-protein"
            />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-500 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 text-sm font-medium text-white hover:from-purple-500 hover:to-pink-400 disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save Meal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}