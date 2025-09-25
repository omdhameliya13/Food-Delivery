// src/api/menu.js
import axios from "./axios";

// 1. Add Menu Item (used by HomeChef)
export const addMenuItem = (formData) =>
  axios.post("/homechef/menu/items/addItem", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 2. Get All Menu Items (for Admin or Chef)
export const getAllMenuItems = () =>
  axios.get("/homechef/menu/items/getItems");

// 3. Get Menu Items by Chef ID
export const getMenuItemsByChef = (chefId) =>
  axios.get(`/homechef/menu/items/getItemsById/${chefId}`);

// 4. Update Menu Item
export const updateMenuItem = (id, formData) =>
  axios.put(`/homechef/menu/items/updateItem/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 5. Delete Menu Item
export const deleteMenuItem = (id) =>
  axios.delete(`/homechef/menu/items/deleteItem/${id}`);
