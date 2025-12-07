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

  useEffect(() => {
    fetchMeals();
    fetchSuggestion();
  }, []);

  async function fetchMeals() {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get("/meals");
      setMeals(response.data);
    } catch (err) {
      console.error("Failed to fetch meals:", err);
      setError("Could not load meals from the server.");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSuggestion() {
    try {
      const response = await apiClient.get("/meals/suggestion");
      setSuggestion(response.data);
    } catch (err) {
      // suggestion is optional, so just log it
      console.warn("Failed to fetch suggestion:", err);
      setSuggestion(null);
    }
  }

  // NEW: toggle favourite for a single meal
  async function handleToggleFavorite(mealId) {
    try {
      const response = await apiClient.post(`/meals/${mealId}/favorite`);
      const isFavorite = response.data.favorite;

      setMeals(prev =>
        prev.map(m =>
          m.id === mealId ? { ...m, is_favorite: isFavorite } : m
        )
      );
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      // you can add a toast here later if you want
    }
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
        <h1 className="text-3xl font-bold text-white mb-2">Meals</h1>
        <p className="text-sm text-gray-200">
          Build a library of meals you’ll reuse for your weekly planner.
        </p>
      </header>

      {/* Optional suggestion card */}
      {suggestion && (
        <div className="mb-8">
          <SuggestionCard suggestion={suggestion} />
        </div>
      )}

      {/* Error banner (non-blocking) */}
      {error && (
        <div className="mb-6 bg-red-600 text-white text-sm px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* Meals grid */}
      {meals.length === 0 ? (
        <EmptyState
          title="No meals saved yet"
          description="Add a few meals so you can start planning your week."
          icon="🍽️"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {meals.map(meal => (
            <MealCard
              key={meal.id}
              meal={meal}
              onToggleFavorite={() => handleToggleFavorite(meal.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}