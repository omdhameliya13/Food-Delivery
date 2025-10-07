import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { createOrder } from "../../api/order";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    deliveryType: "delivery",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    contactNumber: "",
    specialInstructions: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    try {
      if (!formData.contactNumber) {
        alert("Please enter contact number");
        return;
      }

      if (formData.deliveryType === "delivery" && (!formData.street || !formData.city)) {
        alert("Please enter delivery address");
        return;
      }

      const orderData = {
        deliveryType: formData.deliveryType,
        contactNumber: formData.contactNumber,
        specialInstructions: formData.specialInstructions
      };

      if (formData.deliveryType === "delivery") {
        orderData.deliveryAddress = {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          coordinates: {
            latitude: 0, // You can add geolocation here
            longitude: 0
          }
        };
      }

      await createOrder(orderData);
      alert("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (err) {
      alert("Failed to place order: " + (err.response?.data?.message || err.message));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.itemId?.price || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      
      <div className="order-summary">
        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div key={item._id}>
            {item.itemId?.name} x {item.quantity} = ₹{(item.itemId?.price || 0) * (item.quantity || 1)}
          </div>
        ))}
        <h3>Total: ₹{calculateTotal()}</h3>
      </div>

      <div className="delivery-type">
        <label>
          <input 
            type="radio" 
            name="deliveryType" 
            value="delivery" 
            checked={formData.deliveryType === "delivery"}
            onChange={handleChange}
          />
          Delivery
        </label>
        <label>
          <input 
            type="radio" 
            name="deliveryType" 
            value="pickup" 
            checked={formData.deliveryType === "pickup"}
            onChange={handleChange}
          />
          Pickup
        </label>
      </div>

      {formData.deliveryType === "delivery" && (
        <div className="address-form">
          <h3>Delivery Address</h3>
          <input 
            type="text" 
            name="street" 
            placeholder="Street Address" 
            value={formData.street}
            onChange={handleChange}
            required
          />
          <input 
            type="text" 
            name="city" 
            placeholder="City" 
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input 
            type="text" 
            name="state" 
            placeholder="State" 
            value={formData.state}
            onChange={handleChange}
          />
          <input 
            type="text" 
            name="zipCode" 
            placeholder="Zip Code" 
            value={formData.zipCode}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="contact-form">
        <h3>Contact Information</h3>
        <input 
          type="tel" 
          name="contactNumber" 
          placeholder="Contact Number" 
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <textarea 
          name="specialInstructions" 
          placeholder="Special Instructions (Optional)" 
          value={formData.specialInstructions}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
