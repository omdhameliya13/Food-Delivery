// src/api/admin.js

import axios from "./axios";

// Admin Register
export const registerAdmin = (data) => axios.post("/admin/auth/register", data);

// Admin Login
export const loginAdmin = (data) => axios.post("/admin/auth/login", data);

// Get All Orders / Monitor (Assuming API exists)
export const getAllOrders = () => axios.get("/admin/orders");
