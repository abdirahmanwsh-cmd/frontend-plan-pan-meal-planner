
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

// ✅ Mock Shopping Data
const MOCK_ITEMS = [
  { id: 1, name: "chicken breast", quantity: "1 kg", category: "Proteins", bought: false },
  { id: 2, name: "eggs", quantity: "12 pcs", category: "Proteins", bought: false },
  { id: 3, name: "brown rice", quantity: "2 cups", category: "Grains", bought: false },
  { id: 4, name: "broccoli", quantity: "2 heads", category: "Vegetables", bought: false },
  { id: 5, name: "spinach", quantity: "1 bunch", category: "Vegetables", bought: false },
  { id: 6, name: "tomatoes", quantity: "5 pcs", category: "Vegetables", bought: false },
  { id: 7, name: "bell peppers", quantity: "3 pcs", category: "Vegetables", bought: false },
  { id: 8, name: "onions", quantity: "4 pcs", category: "Vegetables", bought: false },
  { id: 9, name: "garlic", quantity: "1 bulb", category: "Vegetables", bought: false },
  { id: 10, name: "olive oil", quantity: "500 ml", category: "Pantry", bought: false },
];

export default function ShoppingListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ➜ Form state (mock add)
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    category: "Vegetables",
  });

  useEffect(() => {
    // ✅ Simulate API call
    const timer = setTimeout(() => {
      setItems(MOCK_ITEMS);
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Toggle bought
  const toggleBought = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  };

  // ✅ Remove item
  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Add item
  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.quantity) return;

    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newItem,
        bought: false,
      },
    ]);

    setNewItem({ name: "", quantity: "", category: "Vegetables" });
  };

  // ✅ Group by category
  const groupedItems = items.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Shopping List</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ingredients generated from your weekly meal plan
          </p>
        </header>

        {/* ✅ Add Item Form */}
        <form
          onSubmit={addItem}
          className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-3"
        >
          <input
            type="text"
            placeholder="Item name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            className="border rounded-lg px-3 py-2"
          />
          <select
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="border rounded-lg px-3 py-2"
          >
            <option>Vegetables</option>
            <option>Proteins</option>
            <option>Grains</option>
            <option>Pantry</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        {items.length === 0 && <EmptyState message="Your shopping list is empty." />}

        {/* ✅ Category Sections */}
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div
              key={category}
              className="bg-white dark:bg-gray-900 border rounded-xl p-4"
            >
              <h2 className="text-lg font-semibold mb-3">{category}</h2>
              <ul className="space-y-2">
                {categoryItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between px-3 py-2 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.bought}
                        onChange={() => toggleBought(item.id)}
                      />
                      <span
                        className={`capitalize ${
                          item.bought ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {item.name}{" "}
                        <span className="text-sm text-gray-500">
                          ({item.quantity})
                        </span>
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}