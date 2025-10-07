import { createContext, useState, useEffect } from "react";
import { addToCart as apiAddToCart, getCart as apiGetCart, removeFromCart as apiRemoveFromCart } from "../api/cart.jsx";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      // Check if user is logged in
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, skipping cart fetch");
        return;
      }

      try {
        const { data } = await apiGetCart();
        setCart(data.items || []);  // assuming your backend returns an object with items array
      } catch (error) {
        console.error("Failed to fetch cart", error);
        // If unauthorized, clear the cart
        if (error.response?.status === 401) {
          setCart([]);
        }
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (item) => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      // Send correct format: itemId and quantity
      const { data } = await apiAddToCart({ 
        itemId: item._id, 
        quantity: 1 
      });
      setCart(data.cart.items); // update local cart with backend response
      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Failed to add to cart", error);
      if (error.response?.status === 401) {
        alert("Your session has expired. Please login again.");
        localStorage.clear();
      } else {
        alert("Failed to add to cart: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const { data } = await apiRemoveFromCart({ itemId });
      setCart(data.cart.items); // update local cart with backend response
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  const clearCart = () => {
    setCart([]);
    // optionally, you can add a backend API call to clear cart if exists
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

