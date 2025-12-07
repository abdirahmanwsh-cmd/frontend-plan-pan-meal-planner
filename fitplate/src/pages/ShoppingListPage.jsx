// ShoppingListPage.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function ShoppingListPage() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIngredients();
  }, []);

  async function fetchIngredients() {
    try {
      setLoading(true);
      const response = await apiClient.get("/shopping-list");
      setIngredients(response.data || []);
    } catch (err) {
      console.error("Failed to fetch shopping list:", err);
      setError("Failed to load shopping list");
      setIngredients([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <p className="text-yellow-800">{error}</p>
          <button
            onClick={fetchIngredients}
            className="mt-2 px-3 py-1 bg-yellow-600 text-white rounded text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-6">
      {ingredients.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ingredients.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              {item.quantity} {item.unit} {item.name}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="Your shopping list is empty!" />
      )}
    </div>
  );
}