import React from "react";

export default function MealCard({ meal, onToggleFavorite }) {
  const { name, calories, tags, is_favorite } = meal;

  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/60 transition">
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">
          {name}
        </h3>
        <p className="text-xs text-gray-300 mb-2">
          {calories} kcal
        </p>
        {tags && (
          <p className="text-[11px] text-gray-400 italic">
            {tags}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onToggleFavorite}
          className={`text-xs px-3 py-1 rounded-full border ${
            is_favorite
              ? "bg-yellow-400 text-gray-900 border-yellow-300"
              : "border-gray-600 text-gray-200 hover:border-yellow-300"
          }`}
        >
          {is_favorite ? "★ Favourite" : "☆ Mark favourite"}
        </button>

        {/* placeholder for future: edit/open details */}
        {/* <button className="text-xs text-purple-300 hover:text-purple-200">
          Details
        </button> */}
      </div>
    </div>
  );
}