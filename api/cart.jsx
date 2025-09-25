// src/api/cart.js

import axios from "./axios";

// Add item to cart
export const addToCart = (data) => axios.post("/user/cart/addToCart", data);

// Get cart
export const getCart = () => axios.get("/user/cart/getCart");

// Remove item from cart
export const removeFromCart = (data) =>
  axios.post("/user/cart/removeFromCart", data);
