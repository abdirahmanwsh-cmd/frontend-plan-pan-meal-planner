import MealCard from "../components/MealCard";

export default function FavoritesPage({ favoriteIds, onToggleFavorite }) {
  const allMeals = JSON.parse(localStorage.getItem("allMeals") || "[]");
  const favoriteMeals = allMeals.filter(m => favoriteIds.has(m.id));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">My Favorites</h1>

        {favoriteMeals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-slate-400">No favorites yet</p>
            <p className="text-gray-500 mt-2">Click the heart on any meal to save it here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {favoriteMeals.map(meal => (
              <MealCard
                key={meal.id}
                meal={meal}
                isFavorite={true}
                onToggleFavorite={() => onToggleFavorite(meal.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}