import { createContext, useState, useEffect } from "react";
import { addToCart as apiAddToCart, getCart as apiGetCart, removeFromCart as apiRemoveFromCart } from "../api/cart.jsx";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await apiGetCart();
        setCart(data.items || []);  // assuming your backend returns an object with items array
      } catch (error) {
        console.error("Failed to fetch cart", error);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (item) => {
    try {
      const { data } = await apiAddToCart(item);
      setCart(data.cart.items); // update local cart with backend response
    } catch (error) {
      console.error("Failed to add to cart", error);
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

