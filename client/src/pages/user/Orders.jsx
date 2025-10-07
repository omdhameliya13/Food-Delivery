import { useEffect, useState } from "react";
import { getUserOrders, cancelOrder } from "../../api/order";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getUserOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await cancelOrder(orderId);
        alert("Order cancelled successfully");
        fetchOrders(); // Refresh orders
      } catch (error) {
        alert("Failed to cancel order: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FFA500',
      confirmed: '#4CAF50',
      preparing: '#2196F3',
      ready: '#9C27B0',
      out_for_delivery: '#FF9800',
      delivered: '#4CAF50',
      cancelled: '#F44336'
    };
    return colors[status] || '#666';
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h3>Order #{order._id.slice(-6)}</h3>
              <span 
                className="order-status" 
                style={{ color: getStatusColor(order.status) }}
              >
                {order.status.toUpperCase().replace('_', ' ')}
              </span>
            </div>
            
            <div className="order-details">
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Delivery Type:</strong> {order.deliveryType}</p>
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              {order.deliveryAddress && (
                <p><strong>Address:</strong> {order.deliveryAddress.street}, {order.deliveryAddress.city}</p>
              )}
              <p><strong>Contact:</strong> {order.contactNumber}</p>
              {order.specialInstructions && (
                <p><strong>Instructions:</strong> {order.specialInstructions}</p>
              )}
            </div>

            <div className="order-items">
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.itemId?.name || 'Item'} x {item.quantity} = ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            {(order.status === 'pending' || order.status === 'confirmed') && (
              <button 
                onClick={() => handleCancelOrder(order._id)}
                className="cancel-btn"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
