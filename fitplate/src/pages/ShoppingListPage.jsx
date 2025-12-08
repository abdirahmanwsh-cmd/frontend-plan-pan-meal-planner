import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function ShoppingListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchShoppingList() {
      try {
        setLoading(true);
        setError(null);

        // Updated endpoint
        const response = await apiClient.get("/pages/shopping-list");
        const data = response.data;

        // Handle array returned from backend
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          setItems([]);
        }
      } catch (err) {
        // Detailed logging for debugging
        if (err.response) {
          console.error("Backend returned error:", err.response.status, err.response.data);
        } else if (err.request) {
          console.error("No response received from backend:", err.request);
        } else {
          console.error("Error setting up request:", err.message);
        }

        setError("Could not load shopping list from the server.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchShoppingList();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100">
      {/* Error banner */}
      {error && (
        <div className="max-w-4xl mx-auto mt-6 px-4">
          <div className="bg-red-600 text-white text-sm px-4 py-3 rounded-md shadow">
            {error}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Shopping List</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              These ingredients are generated from your current weekly plan.
            </p>
          </div>
        </header>

        {/* Empty state */}
        {items.length === 0 && !error && (
          <EmptyState message="No ingredients yet. Add meals to your planner to generate a shopping list." />
        )}

        {/* Items list */}
        {items.length > 0 && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-sm font-medium capitalize">
                    {typeof item === "string" ? item : JSON.stringify(item)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
