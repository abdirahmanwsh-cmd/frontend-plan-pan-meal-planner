export default function SuggestionCard({ onAdd }) {
  const suggestedMeal = {
    id: 4,
    name: "Mediterranean Quinoa Bowl",
    category: "lunch",
    prepTime: 20,
    calories: 380,
    description: "A fresh and healthy bowl with quinoa, roasted vegetables, feta, and lemon dressing.",
    tags: ["vegetarian", "healthy", "quick", "gluten-free"]
  };

  const handleAdd = () => {
    if (onAdd) onAdd(suggestedMeal);
    else alert(`Added ${suggestedMeal.name} to your planner!`);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 shadow-lg mb-8">
      {/* Left accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-purple-500 to-pink-500"></div>
      
      <div className="pl-6 pr-4 py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 animate-pulse"></div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                TODAY'S RECOMMENDATION
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">
                {suggestedMeal.name}
              </h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-bold">{suggestedMeal.prepTime}</span> min
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-bold">{suggestedMeal.calories}</span> cal
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
              {suggestedMeal.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">
                {suggestedMeal.category}
              </span>
              {suggestedMeal.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Action buttons - vertical on large screens */}
          <div className="hidden lg:flex flex-col ml-6 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-6">
            <button 
              onClick={handleAdd}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition text-sm whitespace-nowrap"
            >
              Add to Planner
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm whitespace-nowrap">
              View Details
            </button>
          </div>
        </div>
        
        {/* Horizontal action buttons for smaller screens */}
        <div className="lg:hidden flex gap-2 mt-4">
          <button 
            onClick={handleAdd}
            className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition text-sm"
          >
            Add to Planner
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}