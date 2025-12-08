import React from "react";
import PlannerCell from "./PlannerCell";

export default function PlannerGrid({ slots = [], onEdit }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const meals = ["breakfast", "lunch", "dinner"];

  return (
    <div className="grid grid-cols-7 gap-4">
      {/* Header row */}
      {days.map((day) => (
        <div key={day} className="text-center font-bold">{day}</div>
      ))}

      {/* Meal slots */}
      {meals.map((mealTime) =>
        days.map((day) => {
          const slot = slots.find(
            (s) => s.day === day && s.meal_time === mealTime
          ) || { day, meal_time: mealTime, meal: null };
          return <PlannerCell key={`${day}-${mealTime}`} slot={slot} onEdit={onEdit} />;
        })
      )}
    </div>
  );
}
