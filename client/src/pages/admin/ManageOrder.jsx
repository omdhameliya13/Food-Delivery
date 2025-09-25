import { useEffect, useState } from "react";
import api from "../../api/axios";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="orders-container">
      <h2>Manage Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <p>Order #{order.id} - {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default ManageOrder;
