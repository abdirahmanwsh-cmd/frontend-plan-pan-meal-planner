// src/components/PlannerCell.jsx
import React from "react";

export default function PlannerCell({ slot }) {
  return (
    <div className="border p-2 rounded bg-white dark:bg-slate-700 shadow-sm">
      <p className="text-sm font-medium">{slot.name || "Empty"}</p>
      <p className="text-xs text-gray-500">{slot.time || ""}</p>
    </div>
  );
}
