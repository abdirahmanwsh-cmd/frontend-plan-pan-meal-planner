// src/pages/MealsPage.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import SuggestionCard from "../components/SuggestionCard";

export default function MealsPage() {  // ✅ 
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/meals");
      setMeals(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch meals:", err);
      
      // Mock data for development
      const mockMeals = [
        { 
          id: 1, 
          name: "Chicken Salad", 
          category: "lunch", 
          prep_time: 15,
          calories: 320,
          description: "Fresh salad with grilled chicken and vinaigrette"
        },
        { 
          id: 2, 
          name: "Grilled Salmon", 
          category: "dinner", 
          prep_time: 25,
          calories: 450,
          description: "Salmon fillet with lemon and herbs"
        },
        { 
          id: 3, 
          name: "Oatmeal", 
          category: "breakfast", 
          prep_time: 10,
          calories: 280,
          description: "Steel-cut oats with berries and nuts"
        },
        { 
          id: 4, 
          name: "Mediterranean Quinoa Bowl", 
          category: "lunch", 
          prep_time: 20,
          calories: 380,
          description: "Quinoa with fresh vegetables and feta"
        },
        { 
          id: 5, 
          name: "Vegetable Stir Fry", 
          category: "dinner", 
          prep_time: 30,
          calories: 350,
          description: "Mixed vegetables in a savory sauce"
        },
        { 
          id: 6, 
          name: "Greek Yogurt Parfait", 
          category: "breakfast", 
          prep_time: 5,
          calories: 210,
          description: "Yogurt with granola and fresh fruit"
        },
      ];

      setError("Could not connect to server. Showing sample data.");
      setMeals(mockMeals);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlanner = (meal) => {
    console.log("Adding to planner:", meal);
    alert(`Added ${meal.name} to your planner!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Meal Database
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse and manage your meal collection. Add meals to your weekly planner.
        </p>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center">
            <svg 
              className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
            <p className="text-yellow-700 dark:text-yellow-400">{error}</p>
          </div>
        </div>
      )}
      
      {/* Suggestion Card */}
      <div className="mb-10">
        <SuggestionCard onAdd={handleAddToPlanner} />
      </div>
      
      {/* Meal Count */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          All Meals ({meals.length})
        </h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
            Filter
          </button>
          <button className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition">
            Add New Meal
          </button>
        </div>
      </div>
      
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div 
            key={meal.id} 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800 group"
          >
            <div className="p-6">
              {/* Header with category and time */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    meal.category === 'breakfast' ? 'bg-yellow-500' :
                    meal.category === 'lunch' ? 'bg-green-500' :
                    'bg-purple-500'
                  }`}></div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize">
                    {meal.category}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <span className="text-sm mr-1">⏱️</span>
                  <span className="text-sm font-medium">{meal.prep_time} min</span>
                </div>
              </div>
              
              {/* Meal name */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {meal.name}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">
                {meal.description || "A delicious and nutritious meal."}
              </p>
              
              {/* Stats and actions row */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400 mr-1">🔥</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{meal.calories || '350'}</span>
                  </div>
                  <div className="hidden sm:flex items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400 mr-1">⭐</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">4.8</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAddToPlanner(meal)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium transition text-sm shadow-sm hover:shadow"
                  >
                    Add
                  </button>
                  <button className="p-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <span className="text-sm">⋯</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state */}
      {meals.length === 0 && !error && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <svg 
              className="w-16 h-16 mx-auto" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
            No meals found
          </h3>
          <p className="text-gray-500 dark:text-gray-500 mb-4">
            Add some meals to get started with your planning
          </p>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium">
            Create Your First Meal
          </button>
        </div>
      )}
    </div>
  );
}