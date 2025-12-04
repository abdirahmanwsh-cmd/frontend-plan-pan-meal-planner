import { Heart, Clock, Flame } from 'lucide-react';

function MealCard({ meal, isFavorite = false, onToggleFavorite }) {
  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-slate-700">
      {/* Image */}
      <div className="aspect-video overflow-hidden bg-gray-100">
        <img
          src={meal.image || "https://via.placeholder.com/400x300.png?text=No+Image"}
          alt={meal.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button
          onClick={() => onToggleFavorite?.(meal.id)}
          className="absolute top-3 right-3 p-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-slate-100 mb-2 line-clamp-2">
          {meal.name}
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {meal.prepTime || 0} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500" />
            {meal.calories || 0} kcal
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {meal.ingredients?.slice(0, 4).map((ing, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs rounded-full"
            >
              {ing}
            </span>
          ))}
          {meal.ingredients?.length > 4 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{meal.ingredients.length - 4} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MealCard;