// src/api/admin.js

import axios from "./axios";

// Admin Register
export const registerAdmin = (data) => axios.post("/admin/auth/register", data);

// Admin Login
export const loginAdmin = (data) => axios.post("/admin/auth/login", data);

// Get All Orders
export const getAllOrders = (params) => axios.get("/admin/orders", { params });

// Get All Menus
export const getAllMenus = (params) => axios.get("/admin/menus", { params });

// Get All Users
export const getAllUsers = (params) => axios.get("/admin/users", { params });

// Get All Chefs
export const getAllChefs = () => axios.get("/admin/chefs");

// Get Dashboard Stats
export const getDashboardStats = () => axios.get("/admin/dashboard");

// Delete User
export const deleteUser = (userId) => axios.delete(`/admin/users/${userId}`);

// Update Order Status
export const updateOrderStatus = (orderId, status) => 
  axios.put(`/admin/orders/${orderId}/status`, { status });
