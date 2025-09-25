import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import api from "../../api/axios";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState("");

  const handleOrder = async () => {
    try {
      await api.post("/orders", { items: cart, address });
      alert("Order placed successfully!");
      clearCart();
      window.location.href = "/orders";
    } catch {
      alert("Failed to place order");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <textarea placeholder="Enter delivery address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
