import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import MealCard from "../components/MealCard";
import SuggestionCard from "../components/SuggestionCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

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
    is_favorite: false,
  });

  useEffect(() => {
    fetchMeals();
  }, []);

  useEffect(() => {
    if (meals.length > 0) fetchSuggestion();
  }, [meals]);

  async function fetchMeals() {
    try {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.get("/meals");
        setMeals(response.data);
      } catch (backendErr) {
        // fallback to localStorage/mock
        const savedMeals = localStorage.getItem("planPanMeals");
        if (savedMeals) {
          setMeals(JSON.parse(savedMeals));
        } else {
          const mockMeals = [
            { id: 1, name: "Chicken Salad", category: "lunch", prep_time: 15, calories: 320, description: "Fresh salad with grilled chicken and vinaigrette", is_favorite: false },
            { id: 2, name: "Grilled Salmon", category: "dinner", prep_time: 25, calories: 450, description: "Salmon fillet with lemon and herbs", is_favorite: false },
            { id: 3, name: "Oatmeal", category: "breakfast", prep_time: 10, calories: 280, description: "Steel-cut oats with berries and nuts", is_favorite: false }
          ];
          setMeals(mockMeals);
          localStorage.setItem("planPanMeals", JSON.stringify(mockMeals));
        }
      }
    } catch (err) {
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
      const favs = meals.filter(m => m.is_favorite);
      const randomMeal = favs.length > 0
        ? favs[Math.floor(Math.random() * favs.length)]
        : meals[Math.floor(Math.random() * meals.length)];
      setSuggestion(randomMeal);
    }
  }

  function handleAddMeal() {
    if (!newMeal.name) return;
    const id = meals.length > 0 ? Math.max(...meals.map(m => m.id)) + 1 : 1;
    const mealToAdd = { ...newMeal, id };
    const updatedMeals = [...meals, mealToAdd];
    setMeals(updatedMeals);
    localStorage.setItem("planPanMeals", JSON.stringify(updatedMeals));
    setNewMeal({ name: "", category: "lunch", prep_time: 20, calories: 300, description: "", is_favorite: false });
    setShowAddForm(false);
  }

  function handleToggleFavorite(mealId) {
    const updatedMeals = meals.map(m => m.id === mealId ? { ...m, is_favorite: !m.is_favorite } : m);
    setMeals(updatedMeals);
    localStorage.setItem("planPanMeals", JSON.stringify(updatedMeals));
  }

  function handleDeleteMeal(mealId) {
    const updatedMeals = meals.filter(m => m.id !== mealId);
    setMeals(updatedMeals);
    localStorage.setItem("planPanMeals", JSON.stringify(updatedMeals));
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
      </header>

      {/* Suggestion */}
      {suggestion && (
        <div className="mb-8">
          <SuggestionCard
            suggestion={suggestion}
            onAdd={() => alert(`Adding ${suggestion.name} to planner`)}
          />
        </div>
      )}

      {/* Add Meal Form */}
      {showAddForm && (
        <div className="mb-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
          {/* Form content as in previous code */}
        </div>
      )}

      {/* Meals grid */}
      {meals.length === 0 ? (
        <EmptyState title="No meals saved yet" description="Add your first meal to get started!" icon="🍽️" />
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onToggleFavorite={() => handleToggleFavorite(meal.id)}
              onAddToPlan={() => alert(`Adding ${meal.name} to planner`)}
              onDelete={() => handleDeleteMeal(meal.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
