import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.itemId?.price || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {!cart || cart.length === 0 ? <p>No items in cart</p> : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item._id || item.itemId?._id}>
                <img 
                  src={`http://localhost:5000/uploads/${item.itemId?.image}`} 
                  alt={item.itemId?.name}
                  style={{width: '50px', height: '50px', objectFit: 'cover'}}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50?text=No+Image';
                  }}
                />
                <div>
                  <strong>{item.itemId?.name}</strong>
                  <p>₹{item.itemId?.price} x {item.quantity}</p>
                  <p>Subtotal: ₹{(item.itemId?.price || 0) * (item.quantity || 1)}</p>
                </div>
                <button onClick={() => removeFromCart(item.itemId?._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ₹{calculateTotal()}</h3>
          </div>
          <button onClick={clearCart}>Clear Cart</button>
          <button onClick={() => navigate("/checkout")}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
