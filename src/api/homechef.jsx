// src/api/homechef.js

import axios from "./axios";

// HomeChef Register
export const registerChef = (data) => axios.post("/homechef/auth/register", data);

// HomeChef Login
export const loginChef = (data) => axios.post("/homechef/auth/login", data);

// Upload Menu Item
export const uploadMenuItem = (formData) =>
  axios.post("/homechef/menu", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Get Chef's Menu Items
export const getChefMenuItems = (chefId) =>
  axios.get(`/homechef/menu/chef/${chefId}`);

// Update Menu Item
export const updateMenuItem = (id, formData) =>
  axios.put(`/homechef/menu/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Delete Menu Item
export const deleteMenuItem = (id) => axios.delete(`/homechef/menu/${id}`);
