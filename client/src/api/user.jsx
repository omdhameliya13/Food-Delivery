// src/api/user.js

import axios from "./axios";

// User Register
export const registerUser = (data) => axios.post("/user/auth/register", data);

// User Login
export const loginUser = (data) => axios.post("/user/auth/login", data);

// Get User Orders (if implemented later)
export const getUserOrders = () => axios.get("/user/orders"); 
