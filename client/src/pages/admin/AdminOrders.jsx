import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus as adminUpdateOrderStatus } from "../../api/admin";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "", startDate: "", endDate: "" });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const params = {};
      if (filter.status) params.status = filter.status;
      if (filter.startDate) params.startDate = filter.startDate;
      if (filter.endDate) params.endDate = filter.endDate;

      const response = await getAllOrders(params);
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      alert("Failed to fetch orders. Please login as admin.");
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    if (!window.confirm(`Change order status to ${newStatus}?`)) return;

    try {
      await adminUpdateOrderStatus(orderId, newStatus);
      alert("Order status updated successfully");
      fetchOrders();
    } catch (error) {
      alert("Failed to update order: " + (error.response?.data?.message || error.message));
    }
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    setLoading(true);
    fetchOrders();
  };

  const clearFilters = () => {
    setFilter({ status: "", startDate: "", endDate: "" });
    setLoading(true);
    setTimeout(() => fetchOrders(), 100);
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

  if (loading) return <div style={styles.loading}>Loading orders...</div>;

  return (
    <div style={styles.container}>
      <h1>All Orders Management</h1>

      <div style={styles.filters}>
        <div style={styles.filterGroup}>
          <label>Status:</label>
          <select name="status" value={filter.status} onChange={handleFilterChange} style={styles.select}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label>Start Date:</label>
          <input 
            type="date" 
            name="startDate" 
            value={filter.startDate} 
            onChange={handleFilterChange}
            style={styles.input}
          />
        </div>

        <div style={styles.filterGroup}>
          <label>End Date:</label>
          <input 
            type="date" 
            name="endDate" 
            value={filter.endDate} 
            onChange={handleFilterChange}
            style={styles.input}
          />
        </div>

        <button onClick={applyFilters} style={styles.filterBtn}>
          Apply Filters
        </button>
        <button onClick={clearFilters} style={{...styles.filterBtn, background: '#666'}}>
          Clear
        </button>
      </div>

      <div style={styles.stats}>
        <div style={styles.statItem}>
          <strong>Total Orders:</strong> {orders.length}
        </div>
        <div style={styles.statItem}>
          <strong>Total Revenue:</strong> ₹{orders.reduce((sum, o) => sum + o.totalAmount, 0)}
        </div>
      </div>

      {orders.length === 0 ? (
        <p style={styles.noOrders}>No orders found</p>
      ) : (
        <div style={styles.ordersList}>
          {orders.map((order) => (
            <div key={order._id} style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <div>
                  <h3>Order #{order._id.slice(-8)}</h3>
                  <p style={styles.date}>{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <span style={{...styles.statusBadge, background: getStatusColor(order.status)}}>
                  {order.status.toUpperCase().replace('_', ' ')}
                </span>
              </div>

              <div style={styles.orderBody}>
                <div style={styles.section}>
                  <h4>Customer</h4>
                  <p><strong>Name:</strong> {order.userId?.name}</p>
                  <p><strong>Email:</strong> {order.userId?.email}</p>
                  <p><strong>Phone:</strong> {order.contactNumber}</p>
                </div>

                <div style={styles.section}>
                  <h4>Chef</h4>
                  <p><strong>Name:</strong> {order.chefId?.name}</p>
                  <p><strong>Email:</strong> {order.chefId?.email}</p>
                </div>

                <div style={styles.section}>
                  <h4>Order Details</h4>
                  <p><strong>Type:</strong> {order.deliveryType}</p>
                  <p><strong>Amount:</strong> ₹{order.totalAmount}</p>
                  {order.deliveryAddress && (
                    <p><strong>Address:</strong> {order.deliveryAddress.street}, {order.deliveryAddress.city}</p>
                  )}
                </div>
              </div>

              <div style={styles.items}>
                <h4>Items:</h4>
                {order.items.map((item, i) => (
                  <div key={i} style={styles.item}>
                    {item.itemId?.name} x {item.quantity} = ₹{item.price * item.quantity}
                  </div>
                ))}
              </div>

              <div style={styles.actions}>
                <select 
                  onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  value={order.status}
                  style={styles.statusSelect}
                >
                  <option value="">Change Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
  },
  filters: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  select: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  filterBtn: {
    padding: '8px 20px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    alignSelf: 'flex-end',
  },
  stats: {
    display: 'flex',
    gap: '30px',
    marginBottom: '20px',
    padding: '15px',
    background: '#e3f2fd',
    borderRadius: '4px',
  },
  statItem: {
    fontSize: '16px',
  },
  noOrders: {
    textAlign: 'center',
    padding: '50px',
    color: '#666',
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  orderCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    background: 'white',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '10px',
    marginBottom: '15px',
  },
  date: {
    color: '#666',
    fontSize: '14px',
    margin: '5px 0 0 0',
  },
  statusBadge: {
    padding: '8px 16px',
    borderRadius: '20px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  orderBody: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '15px',
  },
  section: {
    background: '#f9f9f9',
    padding: '15px',
    borderRadius: '4px',
  },
  items: {
    background: '#f9f9f9',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '15px',
  },
  item: {
    padding: '5px 0',
    borderBottom: '1px solid #eee',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  statusSelect: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    background: 'white',
    cursor: 'pointer',
  },
};

export default AdminOrders;
