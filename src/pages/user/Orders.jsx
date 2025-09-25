import { useEffect, useState } from "react";
import api from "../../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <p>Order #{order.id} - {order.status}</p>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>{item.name} - ₹{item.price}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;
