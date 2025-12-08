
import React from "react";

export default function SuggestionCard({ suggestion, onAdd }) {
  return (
    <div className="bg-purple-700/50 p-4 rounded-xl mb-6 border border-purple-600">
      <h3 className="text-white font-bold mb-2">Suggested Meal</h3>
      <p className="text-gray-200 mb-2">{suggestion.name}</p>
      <p className="text-gray-300 text-sm mb-2">{suggestion.description}</p>
      <button onClick={()=>onAdd(suggestion)} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Add to Planner</button>
    </div>
  );
}
