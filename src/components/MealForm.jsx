import { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';

function MealForm({ meal, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: meal?.name || '',
    prepTime: meal?.prepTime || '',
    calories: meal?.calories || '',
    ingredients: meal?.ingredients?.length ? meal.ingredients : [''],
    image: meal?.image || null,
  });

  const handleAddIngredient = () => {
    setFormData(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const handleIngredientChange = (index, value) => {
    const updated = [...formData.ingredients];
    updated[index] = value;
    setFormData(prev => ({ ...prev, ingredients: updated }));
  };

  const handleRemoveIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      setFormData(prev => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = () => {
    // Clean empty ingredients
    const cleaned = {
      ...formData,
      ingredients: formData.ingredients.filter(i => i.trim() !== ''),
    };
    onSave(cleaned);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-slate-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {meal ? 'Edit' : 'Create New'} Meal
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-slate-300">
              Meal Photo
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-12 text-center hover:border-cyan-500 transition cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Click to upload or drag and drop
              </p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
              Meal Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Grilled Salmon with Avocado Salsa"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-cyan-500 outline-none transition"
            />
          </div>

          {/* Time & Calories */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                Prep Time (min)
              </label>
              <input
                type="number"
                value={formData.prepTime}
                onChange={e => setFormData(prev => ({ ...prev, prepTime: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                Calories
              </label>
              <input
                type="number"
                value={formData.calories}
                onChange={e => setFormData(prev => ({ ...prev, calories: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                Ingredients
              </label>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add ingredient
              </button>
            </div>
            <div className="space-y-3">
              {formData.ingredients.map((ing, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={ing}
                    onChange={e => handleIngredientChange(i, e.target.value)}
                    placeholder="e.g. 200g salmon fillet"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-cyan-500 outline-none"
                  />
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(i)}
                      className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t dark:border-slate-700">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-600 hover:to-blue-700 transition shadow-lg"
          >
            {meal ? 'Save Changes' : 'Create Meal'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MealForm;