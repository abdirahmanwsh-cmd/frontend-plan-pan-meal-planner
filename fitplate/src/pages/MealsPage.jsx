import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import SuggestionCard from "../components/SuggestionCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import MealCard from "../components/MealCard";

export default function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: "",
    category: "lunch",
    prep_time: 20,
    calories: 300,
    description: "",
    is_favorite: false
  });

  useEffect(() => {
    fetchMeals();
    fetchSuggestion();
  }, []);

  // Function to fetch meals 
  async function fetchMeals() {
    try {
      setLoading(true);
      setError(null);
      
      // TRY BACKEND FIRST
      try {
        const response = await apiClient.get("/meals");
        setMeals(response.data);
        console.log("✓ Loaded meals from backend");
      } catch (backendErr) {
        console.log("Backend unavailable, using localStorage");
        
        // FALLBACK: Use localStorage
        const savedMeals = localStorage.getItem('planPanMeals');
        if (savedMeals) {
          setMeals(JSON.parse(savedMeals));
        } else {
          // Initial mock data
          const mockMeals = [
            { 
              id: 1, 
              name: "Chicken Salad", 
              category: "lunch", 
              prep_time: 15,
              calories: 320,
              description: "Fresh salad with grilled chicken and vinaigrette",
              is_favorite: false
            },
            { 
              id: 2, 
              name: "Grilled Salmon", 
              category: "dinner", 
              prep_time: 25,
              calories: 450,
              description: "Salmon fillet with lemon and herbs",
              is_favorite: false
            },
            { 
              id: 3, 
              name: "Oatmeal", 
              category: "breakfast", 
              prep_time: 10,
              calories: 280,
              description: "Steel-cut oats with berries and nuts",
              is_favorite: false
            },
          ];
          setMeals(mockMeals);
          localStorage.setItem('planPanMeals', JSON.stringify(mockMeals));
        }
      }
      
    } catch (err) {
      console.error("Failed to fetch meals:", err);
      setError("Could not load meals. Using local storage.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchSuggestion() {
    try {
      const response = await apiClient.get("/meals/suggestion");
      setSuggestion(response.data);
    } catch (err) {
      console.warn("No suggestion from backend:", err);
      
      // FALLBACK: Pick random meal from local data
      if (meals.length > 0) {
        const randomIndex = Math.floor(Math.random() * meals.length);
        setSuggestion(meals[randomIndex]);
      } else {
        setSuggestion(null);
      }
    }
  }

  // Toggle favorite - tries backend, falls back to localStorage
  async function handleToggleFavorite(mealId) {
    try {
      // TRY BACKEND FIRST
      const response = await apiClient.patch(`/meals/${mealId}/favorite`);
      const isFavorite = response.data.favorite;

      setMeals(prev =>
        prev.map(m =>
          m.id === mealId ? { ...m, is_favorite: isFavorite } : m
        )
      );
      
      console.log(`✓ Favorite toggled on backend for meal ${mealId}`);
    } catch (err) {
      console.log("Backend unavailable, using localStorage for favorite");
      
      // FALLBACK: Local storage
      const updatedMeals = meals.map(meal => 
        meal.id === mealId 
          ? { ...meal, is_favorite: !meal.is_favorite }
          : meal
      );
      
      setMeals(updatedMeals);
      localStorage.setItem('planPanMeals', JSON.stringify(updatedMeals));
    }
  }

  // Add new meal 
  async function handleAddMeal() {
    if (!newMeal.name.trim()) {
      alert("Please enter a meal name");
      return;
    }

    try {
      // TRY BACKEND FIRST
      const response = await apiClient.post("/meals", newMeal);
      const addedMeal = response.data;
      
      setMeals(prev => [...prev, addedMeal]);
      console.log("✓ Meal added via backend");
    } catch (err) {
      console.log("Backend unavailable, saving to localStorage");
      
      // FALLBACK: Local storage
      const mealId = meals.length > 0 ? Math.max(...meals.map(m => m.id)) + 1 : 1;
      const mealToAdd = {
        ...newMeal,
        id: mealId
      };
      
      const updatedMeals = [...meals, mealToAdd];
      setMeals(updatedMeals);
      localStorage.setItem('planPanMeals', JSON.stringify(updatedMeals));
    }

    // Reset form
    setNewMeal({
      name: "",
      category: "lunch",
      prep_time: 20,
      calories: 300,
      description: "",
      is_favorite: false
    });
    setShowAddForm(false);
  }

  // Delete meal - ready for backend integration
  async function handleDeleteMeal(mealId) {
    if (!window.confirm("Are you sure you want to delete this meal?")) return;

    try {
      // TRY BACKEND FIRST
      await apiClient.delete(`/meals/${mealId}`);
      console.log(`✓ Meal ${mealId} deleted from backend`);
    } catch (err) {
      console.log("Backend unavailable, deleting from localStorage");
    }

    // Update UI regardless
    const updatedMeals = meals.filter(meal => meal.id !== mealId);
    setMeals(updatedMeals);
    localStorage.setItem('planPanMeals', JSON.stringify(updatedMeals));
  }

  if (loading && meals.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-8 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Meals Database</h1>
        <p className="text-sm text-gray-200">
          Build a library of meals you'll reuse for your weekly planner.
        </p>
        
        {/* Stats Bar */}
        <div className="flex items-center gap-4 mt-4 p-3 bg-white/5 rounded-lg">
          <div className="text-center">
            <div className="text-xl font-bold text-white">{meals.length}</div>
            <div className="text-xs text-gray-400">Total Meals</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-pink-500">
              {meals.filter(m => m.is_favorite).length}
            </div>
            <div className="text-xs text-gray-400">Favorites</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-500">
              {meals.filter(m => m.category === 'breakfast').length}
            </div>
            <div className="text-xs text-gray-400">Breakfast</div>
          </div>
        </div>
      </header>

      {/* Error banner */}
      {error && (
        <div className="mb-6 bg-yellow-600/20 text-yellow-300 text-sm px-4 py-2 rounded border border-yellow-600 flex items-center">
          <span className="mr-2">⚠️</span>
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mb-8">
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition flex items-center"
        >
          <span className="mr-2">+</span> Add New Meal
        </button>
        
        {meals.length > 0 && (
          <>
            <button 
              onClick={() => {
                const allFavorites = meals.map(m => ({...m, is_favorite: true}));
                setMeals(allFavorites);
                localStorage.setItem('planPanMeals', JSON.stringify(allFavorites));
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition"
            >
              Favorite All
            </button>
            
            <button 
              onClick={() => {
                const noFavorites = meals.map(m => ({...m, is_favorite: false}));
                setMeals(noFavorites);
                localStorage.setItem('planPanMeals', JSON.stringify(noFavorites));
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition"
            >
              Clear Favorites
            </button>
          </>
        )}
      </div>

      {/* Add Meal Form */}
      {showAddForm && (
        <div className="mb-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Add New Meal</h3>
            <button 
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Meal Name *</label>
                <input 
                  type="text"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g., Chicken Salad"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-2">Category</label>
                <select 
                  value={newMeal.category}
                  onChange={(e) => setNewMeal({...newMeal, category: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-2">Prep Time (minutes)</label>
                <input 
                  type="number"
                  value={newMeal.prep_time}
                  onChange={(e) => setNewMeal({...newMeal, prep_time: parseInt(e.target.value) || 20})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                  min="1"
                  max="180"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-2">Calories</label>
                <input 
                  type="number"
                  value={newMeal.calories}
                  onChange={(e) => setNewMeal({...newMeal, calories: parseInt(e.target.value) || 300})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                  min="0"
                  max="2000"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Description</label>
              <textarea 
                value={newMeal.description}
                onChange={(e) => setNewMeal({...newMeal, description: e.target.value})}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                placeholder="Describe your meal..."
                rows="3"
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <button 
                onClick={handleAddMeal}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium"
              >
                Save Meal
              </button>
              <button 
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suggestion Card */}
      {suggestion && (
        <div className="mb-8">
          <SuggestionCard suggestion={suggestion} />
        </div>
      )}

      {/* Meals grid */}
      {meals.length === 0 ? (
        <EmptyState
          title="No meals saved yet"
          description="Add your first meal to get started!"
          icon="🍽️"
        />
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {meals.map(meal => (
            <div 
              key={meal.id} 
              className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-6">
                {/* Meal header with category and favorite */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      meal.category === 'breakfast' ? 'bg-yellow-500/20 text-yellow-300' :
                      meal.category === 'lunch' ? 'bg-green-500/20 text-green-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {meal.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      ⏱️ {meal.prep_time} min
                    </span>
                  </div>
                  
                  {/* Favorite button */}
                  <button
                    onClick={() => handleToggleFavorite(meal.id)}
                    className={`p-2 rounded-full transition-all ${
                      meal.is_favorite 
                        ? 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 animate-pulse' 
                        : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600 hover:text-white'
                    }`}
                    title={meal.is_favorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    {meal.is_favorite ? '❤️' : '🤍'}
                  </button>
                </div>
                
                {/* Meal name */}
                <h3 className="text-xl font-bold text-white mb-2">{meal.name}</h3>
                
                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{meal.description}</p>
                
                {/* Stats and actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                  <div className="flex items-center text-sm text-gray-400">
                    <span className="mr-1">🔥</span>
                    <span>{meal.calories} cal</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => alert(`Adding ${meal.name} to planner...`)}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm"
                    >
                      Add to Plan
                    </button>
                    <button 
                      onClick={() => handleDeleteMeal(meal.id)}
                      className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}