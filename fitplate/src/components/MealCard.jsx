
import React from "react";

export default function MealCard({ meal, onToggleFavorite, onAddToPlan, onDelete }) {
  const { name, calories, prep_time, category, description, is_favorite } = meal;

  const categoryColors = {
    breakfast: "bg-yellow-500/20 text-yellow-300",
    lunch: "bg-green-500/20 text-green-300",
    dinner: "bg-purple-500/20 text-purple-300",
    snack: "bg-pink-500/20 text-pink-300",
  };

  return (
    <div className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg">
      <div className="p-5 flex flex-col justify-between h-full">
        {/* Header: category + prep time + favorite */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-xs rounded-full ${categoryColors[category] || "bg-gray-500/20 text-gray-300"}`}>
              {category}
            </span>
            <span className="text-xs text-gray-400">⏱️ {prep_time} min</span>
          </div>
          <button
            onClick={onToggleFavorite}
            className={`p-2 rounded-full transition-all ${
              is_favorite
                ? "bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 animate-pulse"
                : "bg-gray-700/50 text-gray-400 hover:bg-gray-600 hover:text-white"
            }`}
            title={is_favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {is_favorite ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Meal name and description */}
        <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{description}</p>

        {/* Stats + actions */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 flex items-center gap-1">
            🔥 {calories} cal
          </span>
          <div className="flex gap-2">
            {onAddToPlan && (
              <button
                onClick={onAddToPlan}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm"
              >
                Add to Plan
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded text-sm"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
