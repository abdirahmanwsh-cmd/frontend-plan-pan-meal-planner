// src/pages/MealsPage.jsx
// src/pages/MealsPage.jsx
import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import MealCard from "../components/MealCard";
import MealForm from "../components/MealForm";

const ALL_MEALS_KEY = "allMeals";
const INITIALIZED_KEY = "mealsInitialized";

// Fallback meals (these 100% exist in TheMealDB)
const FALLBACK_MEALS = [
  "Beef Wellington",
  "Chicken Alfredo",
  "Sushi",
  "Pad Thai",
  "Lasagne",
  "Tacos",
  "Pancakes",
  "Caesar Salad"
];

export default function MealsPage({ favoriteIds, onToggleFavorite }) {
  const [meals, setMeals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(ALL_MEALS_KEY);
    if (saved) {
      setMeals(JSON.parse(saved));
      return;
    }

    const initialized = localStorage.getItem(INITIALIZED_KEY);
    if (initialized) {
      setMeals([]);
      return;
    }

    const loadInitialMeals = async () => {
      const fetched = [];

      for (const name of FALLBACK_MEALS) {
        try {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
          const data = await res.json();

          const meal = data.meals?.[0];
          if (meal) {
            fetched.push({
              id: `api-${meal.idMeal}`,
              name: meal.strMeal,
              image: meal.strMealThumb,
              prepTime: Math.floor(Math.random() * 45) + 15,
              calories: Math.floor(Math.random() * 500) + 300,
              ingredients: Object.keys(meal)
                .filter(k => k.startsWith("strIngredient") && meal[k])
                .map(k => meal[k])
                .slice(0, 10),
              source: "api"
            });
          }
        } catch (err) {
          console.warn(`Failed to load ${name}`);
        }
      }

      // If somehow less than 8, fill with placeholders
      while (fetched.length < 8) {
        fetched.push({
          id: `fallback-${fetched.length}`,
          name: `Delicious Meal ${fetched.length + 1}`,
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
          prepTime: 30,
          calories: 450,
          ingredients: ["Fresh ingredients", "Love", "Spices"],
          source: "api"
        });
      }

      setMeals(fetched);
      localStorage.setItem(ALL_MEALS_KEY, JSON.stringify(fetched));
      localStorage.setItem(INITIALIZED_KEY, "true");
    };

    loadInitialMeals();
  }, []);

  // Save on change
  useEffect(() => {
    if (meals.length > 0) {
      localStorage.setItem(ALL_MEALS_KEY, JSON.stringify(meals));
    }
  }, [meals]);

  // Search
  useEffect(() => {
    if (!searchTerm.trim()) return;

    const timer = setTimeout(async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await res.json();

      if (data.meals) {
        const newMeals = data.meals.slice(0, 12).map(m => ({
          id: `api-${m.idMeal}`,
          name: m.strMeal,
          image: m.strMealThumb,
          prepTime: Math.floor(Math.random() * 45) + 15,
          calories: Math.floor(Math.random() * 500) + 300,
          ingredients: Object.keys(m)
            .filter(k => k.startsWith("strIngredient") && m[k])
            .map(k => m[k])
            .slice(0, 10),
          source: "api"
        }));

        setMeals(prev => {
          const existing = new Set(prev.map(m => m.id));
          const filtered = newMeals.filter(m => !existing.has(m.id));
          const customs = prev.filter(m => m.source === "custom");
          return [...customs, ...filtered];
        });
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSave = (data) => {
    const cleaned = {
      ...data,
      name: data.name.trim() || "New Meal",
      prepTime: Number(data.prepTime) || 30,
      calories: Number(data.calories) || 400,
      ingredients: data.ingredients.filter(Boolean),
      image: data.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
      source: "custom"
    };

    if (editingMeal) {
      setMeals(prev => prev.map(m => m.id === editingMeal.id ? { ...cleaned, id: editingMeal.id } : m));
    } else {
      setMeals(prev => [...prev, { ...cleaned, id: `custom-${Date.now()}` }]);
    }

    setShowForm(false);
    setEditingMeal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My Meals</h1>
            <p className="text-gray-600 dark:text-slate-400">Your personal recipe collection</p>
          </div>
          <button
            onClick={() => { setEditingMeal(null); setShowForm(true); }}
            className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" /> Add New Meal
          </button>
        </div>

        <div className="relative max-w-md mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search meals..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {meals.map(meal => (
            <div
              key={meal.id}
              onDoubleClick={() => { setEditingMeal(meal); setShowForm(true); }}
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <MealCard
                meal={meal}
                isFavorite={favoriteIds.has(meal.id)}
                onToggleFavorite={() => onToggleFavorite(meal.id)}
              />
            </div>
          ))}
        </div>

        {showForm && (
          <MealForm
            meal={editingMeal}
            onClose={() => { setShowForm(false); setEditingMeal(null); }}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
}