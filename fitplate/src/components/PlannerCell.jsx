import React from "react";

export default function PlannerCell({ slot, onEdit }) {
  return (
    <div className="border p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex flex-col justify-between">
      <div>
        <p className="text-sm font-medium">{slot.meal?.name || "Empty"}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{slot.meal_time}</p>
      </div>
      {onEdit && (
        <button
          onClick={() => onEdit(slot)}
          className="mt-2 text-xs text-purple-600 dark:text-purple-400 hover:underline"
        >
          Assign/Edit
        </button>
      )}
    </div>
  );
}
