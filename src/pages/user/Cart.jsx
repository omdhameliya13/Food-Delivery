import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>No items in cart</p> : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ₹{item.price}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Clear Cart</button>
          <button onClick={() => (window.location.href = "/checkout")}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
