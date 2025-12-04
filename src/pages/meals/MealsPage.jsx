import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import MealCard from '../../components/MealCard';
import MealForm from '../../components/MealForm';

const mockMeals = [
  {
    id: 1,
    name: "Teriyaki Salmon Bowl",
    prepTime: 25,
    calories: 580,
    ingredients: ["salmon", "rice", "broccoli", "teriyaki sauce", "sesame seeds"],
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a9587af?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    name: "Mediterranean Quinoa Salad",
    prepTime: 15,
    calories: 420,
    ingredients: ["quinoa", "feta", "cucumber", "tomato", "olives", "lemon"],
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    name: "Chicken Shawarma Wrap",
    prepTime: 30,
    calories: 650,
    ingredients: ["chicken", "yogurt", "garlic", "pita", "cucumber", "tahini"],
    image: "https://images.unsplash.com/photo-1626645738173-4e7abf7f6a7a?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    name: "Berry Protein Smoothie",
    prepTime: 5,
    calories: 320,
    ingredients: ["mixed berries", "banana", "protein powder", "almond milk", "chia seeds"],
    image: "https://images.unsplash.com/photo-1553531384-ccde5843346f?w=800&h=600&fit=crop"
  },
];

function MealsPage() {
  const [meals] = useState(mockMeals);
  const [favorites, setFavorites] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSaveMeal = (savedData) => {
    console.log('Meal saved:', savedData);
    // Tomorrow Samuel will connect this to real API
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              My Meals
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mt-2">
              Discover, create, and manage your favorite recipes
            </p>
          </div>

          <button
            onClick={() => {
              setEditingMeal(null);
              setShowForm(true);
            }}
            className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-200 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add New Meal
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search your meals..."
            className="w-full pl-12 pr-6 py-3.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500 outline-none transition"
          />
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {meals.map(meal => (
            <MealCard
              key={meal.id}
              meal={meal}
              isFavorite={favorites.has(meal.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <MealForm
            meal={editingMeal}
            onClose={() => setShowForm(false)}
            onSave={handleSaveMeal}
          />
        )}
      </div>
    </div>
  );
}

export default MealsPage;