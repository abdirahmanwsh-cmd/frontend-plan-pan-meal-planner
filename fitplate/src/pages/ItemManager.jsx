import React, { useState, useEffect } from "react";
import { getItems, createItem, updateItem, deleteItem } from "./api";

const ItemManager = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch items
  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
    } catch (err) {
      setMessage("Error fetching items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Create item
  const handleCreate = async () => {
    if (!newItemName.trim()) return;
    try {
      setLoading(true);
      await createItem({ name: newItemName });
      setMessage("Item added successfully!");
      setNewItemName("");
      fetchItems();
    } catch (err) {
      setMessage("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  // Update item
  const handleUpdate = async (id) => {
    if (!editingName.trim()) return;
    try {
      setLoading(true);
      await updateItem(id, { name: editingName });
      setMessage("Item updated successfully!");
      setEditingItem(null);
      setEditingName("");
      fetchItems();
    } catch (err) {
      setMessage("Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteItem(id);
      setMessage("Item deleted successfully!");
      fetchItems();
    } catch (err) {
      setMessage("Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-50 rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Item Manager</h1>

      {/* Feedback message */}
      {message && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">{message}</div>
      )}

      {/* Create */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New item name"
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Loading indicator */}
      {loading && <p className="text-gray-500 mb-2">Loading...</p>}

      {/* Items List */}
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border rounded p-2 bg-white"
          >
            {editingItem === item.id ? (
              <>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-1 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{item.name}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditingItem(item.id);
                      setEditingName(item.name);
                    }}
                    className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemManager;