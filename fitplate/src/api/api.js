import apiClient from "./client";

// GET /items
export const getItems = async () => {
  const res = await apiClient.get("/items");
  return res.data;
};

// POST /items
export const createItem = async (body) => {
  const res = await apiClient.post("/items", body);
  return res.data;
};

// PUT /items/:id
export const updateItem = async (id, body) => {
  const res = await apiClient.put(`/items/${id}`, body);
  return res.data;
};

// DELETE /items/:id
export const deleteItem = async (id) => {
  const res = await apiClient.delete(`/items/${id}`);
  return res.data;
};
