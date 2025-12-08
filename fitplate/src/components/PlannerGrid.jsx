// /src/components/PlannerGrid.jsx 
export default function PlannerGrid({ slots = [] }) {
  // Handle empty slots case
  if (!slots || slots.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No meals planned yet. Add some meals!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {slots.map((slot, index) => (
        <div key={index} className="bg-white rounded shadow p-4">
          <h3 className="font-semibold">{slot.date || 'Unknown date'}</h3>
          <p>{slot.recipe?.name || slot.meal_type || 'Meal'}</p>
        </div>
      ))}
    </div>
  );
}