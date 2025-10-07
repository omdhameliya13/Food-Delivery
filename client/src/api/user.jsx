// src/api/user.js

import axios from "./axios";

// User Register
export const registerUser = (data) => axios.post("/user/auth/register", data);

// User Login
export const loginUser = (data) => axios.post("/user/auth/login", data);

// Get User Profile
export const getUserProfile = () => axios.get("/user/profile");

// Update User Profile
export const updateUserProfile = (data) => axios.put("/user/profile", data);

// Update User Location
export const updateUserLocation = (data) => axios.put("/user/location", data); 
