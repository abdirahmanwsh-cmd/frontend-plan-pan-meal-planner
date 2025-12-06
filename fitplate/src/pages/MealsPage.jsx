
import React, { useState } from "react";
import apiClient from "../api/client";

const MealsPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMeals = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiClient.get("/meals"); 
      setMeals(response.data);
      console.log("Meals:", response.data);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setError("Failed to fetch meals. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Meals
        </h1>

        <button
          onClick={fetchMeals}
          className="w-full py-3 mb-6 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          {loading ? "Loading..." : "Fetch Meals"}
        </button>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {meals.length === 0 && !loading ? (
            <p className="text-center text-gray-500 col-span-full">
              No meals to display.
            </p>
          ) : (
            meals.map((meal) => (
              <div
                key={meal.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
              >
                <h2 className="font-semibold text-lg">{meal.name}</h2>
                <p className="text-gray-500">{meal.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MealsPage;
