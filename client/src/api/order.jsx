// src/api/order.js

import axios from "./axios";

// Create order from cart
export const createOrder = (data) => axios.post("/user/order/create", data);

// Get user's orders
export const getUserOrders = () => axios.get("/user/order/myorders");

// Get single order by ID
export const getOrderById = (orderId) => axios.get(`/user/order/${orderId}`);

// Cancel order
export const cancelOrder = (orderId) => axios.put(`/user/order/cancel/${orderId}`);

// Get chef's orders
export const getChefOrders = () => axios.get("/user/order/chef/orders");

// Update order status (for chef)
export const updateOrderStatus = (orderId, status) => 
  axios.put(`/user/order/chef/status/${orderId}`, { status });
