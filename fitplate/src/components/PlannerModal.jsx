import React, { useState } from "react";

export default function PlannerModal({ meal, onClose, onSave }) {
  const [day, setDay] = useState("Monday");
  const [slot, setSlot] = useState("breakfast");

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const slots = ["breakfast","lunch","dinner"];

  const handleSave = () => {
    onSave({ meal, day, slot });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-80">
        <h3 className="text-xl font-bold text-white mb-4">Assign "{meal.name}"</h3>

        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-1">Day</label>
          <select value={day} onChange={e=>setDay(e.target.value)} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white">
            {days.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-1">Meal Slot</label>
          <select value={slot} onChange={e=>setSlot(e.target.value)} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white">
            {slots.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-700 text-white rounded-lg">Cancel</button>
          <button onClick={handleSave} className="px-3 py-1 bg-purple-600 text-white rounded-lg">Save</button>
        </div>
      </div>
    </div>
  );
}
