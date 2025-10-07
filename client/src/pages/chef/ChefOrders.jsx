import { useEffect, useState } from "react";
import { getChefOrders, updateOrderStatus } from "../../api/order";

const ChefOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Check if logged in
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (!token) {
        alert("Please login as a chef to view orders");
        setLoading(false);
        return;
      }

      if (user.role !== 'homechef') {
        alert("You must be logged in as a chef to view this page");
        setLoading(false);
        return;
      }

      console.log("Fetching chef orders...");
      const response = await getChefOrders();
      console.log("Chef orders response:", response.data);
      
      setOrders(response.data);
      setLoading(false);
      
      if (response.data.length === 0) {
        console.log("No orders found for this chef");
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      console.error("Error details:", error.response?.data);
      
      if (error.response?.status === 401) {
        alert("Your session has expired. Please login again.");
        localStorage.clear();
      } else {
        alert("Failed to fetch orders: " + (error.response?.data?.message || error.message));
      }
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      alert(`Order status updated to ${newStatus}`);
      fetchOrders(); // Refresh orders
    } catch (error) {
      alert("Failed to update order status: " + (error.response?.data?.message || error.message));
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

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      pending: 'confirmed',
      confirmed: 'preparing',
      preparing: 'ready',
      ready: 'out_for_delivery',
      out_for_delivery: 'delivered'
    };
    return statusFlow[currentStatus];
  };

  const getStatusLabel = (status) => {
    return status.toUpperCase().replace('_', ' ');
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    if (filter === "active") return !['delivered', 'cancelled'].includes(order.status);
    return order.status === filter;
  });

  if (loading) return <div style={styles.loading}>Loading orders...</div>;

  return (
    <div style={styles.container}>
      <h1>Chef Orders Dashboard</h1>
      
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h3>{orders.length}</h3>
          <p>Total Orders</p>
        </div>
        <div style={styles.statCard}>
          <h3>{orders.filter(o => o.status === 'pending').length}</h3>
          <p>Pending</p>
        </div>
        <div style={styles.statCard}>
          <h3>{orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length}</h3>
          <p>Active</p>
        </div>
        <div style={styles.statCard}>
          <h3>{orders.filter(o => o.status === 'delivered').length}</h3>
          <p>Completed</p>
        </div>
      </div>

      <div style={styles.filters}>
        <button 
          style={{...styles.filterBtn, ...(filter === 'all' ? styles.activeFilter : {})}}
          onClick={() => setFilter('all')}
        >
          All Orders
        </button>
        <button 
          style={{...styles.filterBtn, ...(filter === 'active' ? styles.activeFilter : {})}}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          style={{...styles.filterBtn, ...(filter === 'pending' ? styles.activeFilter : {})}}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          style={{...styles.filterBtn, ...(filter === 'confirmed' ? styles.activeFilter : {})}}
          onClick={() => setFilter('confirmed')}
        >
          Confirmed
        </button>
        <button 
          style={{...styles.filterBtn, ...(filter === 'preparing' ? styles.activeFilter : {})}}
          onClick={() => setFilter('preparing')}
        >
          Preparing
        </button>
        <button 
          style={{...styles.filterBtn, ...(filter === 'delivered' ? styles.activeFilter : {})}}
          onClick={() => setFilter('delivered')}
        >
          Delivered
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div style={styles.noOrders}>
          <h3>No orders found</h3>
          <p>Orders will appear here when customers place orders for your menu items.</p>
          <p style={{marginTop: '20px', color: '#666'}}>
            <strong>Troubleshooting:</strong><br/>
            • Make sure you have menu items uploaded<br/>
            • Check if customers have placed orders<br/>
            • Verify you're logged in as a chef<br/>
            • Try refreshing the page
          </p>
        </div>
      ) : (
        <div style={styles.ordersList}>
          {filteredOrders.map((order) => (
            <div key={order._id} style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <div>
                  <h3>Order #{order._id.slice(-8)}</h3>
                  <p style={styles.orderDate}>
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span 
                  style={{
                    ...styles.statusBadge,
                    background: getStatusColor(order.status)
                  }}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>

              <div style={styles.orderBody}>
                <div style={styles.customerInfo}>
                  <h4>Customer Details</h4>
                  <p><strong>Name:</strong> {order.userId?.name}</p>
                  <p><strong>Email:</strong> {order.userId?.email}</p>
                  <p><strong>Phone:</strong> {order.contactNumber}</p>
                  <p><strong>Delivery Type:</strong> {order.deliveryType}</p>
                  {order.deliveryAddress && (
                    <p>
                      <strong>Address:</strong> {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                    </p>
                  )}
                  {order.specialInstructions && (
                    <p><strong>Instructions:</strong> {order.specialInstructions}</p>
                  )}
                </div>

                <div style={styles.orderItems}>
                  <h4>Order Items</h4>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Item</th>
                        <th style={styles.th}>Quantity</th>
                        <th style={styles.th}>Price</th>
                        <th style={styles.th}>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr key={i}>
                          <td style={styles.td}>{item.itemId?.name || 'Item'}</td>
                          <td style={styles.td}>{item.quantity}</td>
                          <td style={styles.td}>₹{item.price}</td>
                          <td style={styles.td}>₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" style={{...styles.td, textAlign: 'right', fontWeight: 'bold'}}>
                          Total:
                        </td>
                        <td style={{...styles.td, fontWeight: 'bold'}}>
                          ₹{order.totalAmount}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div style={styles.orderActions}>
                {order.status === 'pending' && (
                  <>
                    <button 
                      style={{...styles.actionBtn, background: '#4CAF50'}}
                      onClick={() => handleStatusUpdate(order._id, 'confirmed')}
                    >
                      ✓ Confirm Order
                    </button>
                    <button 
                      style={{...styles.actionBtn, background: '#f44336'}}
                      onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                    >
                      ✗ Reject Order
                    </button>
                  </>
                )}
                
                {getNextStatus(order.status) && order.status !== 'pending' && (
                  <button 
                    style={{...styles.actionBtn, background: '#2196F3'}}
                    onClick={() => handleStatusUpdate(order._id, getNextStatus(order.status))}
                  >
                    → Move to {getStatusLabel(getNextStatus(order.status))}
                  </button>
                )}

                {order.status !== 'cancelled' && order.status !== 'delivered' && (
                  <button 
                    style={{...styles.actionBtn, background: '#f44336'}}
                    onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                  >
                    Cancel Order
                  </button>
                )}
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
    fontSize: '18px',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  statCard: {
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  filters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '10px 20px',
    border: '1px solid #ddd',
    background: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  activeFilter: {
    background: '#4CAF50',
    color: 'white',
    borderColor: '#4CAF50',
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
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '15px',
    marginBottom: '15px',
  },
  orderDate: {
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
    gridTemplateColumns: '1fr 2fr',
    gap: '20px',
    marginBottom: '20px',
  },
  customerInfo: {
    background: '#f9f9f9',
    padding: '15px',
    borderRadius: '4px',
  },
  orderItems: {
    background: '#f9f9f9',
    padding: '15px',
    borderRadius: '4px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  th: {
    textAlign: 'left',
    padding: '10px',
    borderBottom: '2px solid #ddd',
    background: '#f0f0f0',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
  orderActions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  actionBtn: {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
  },
};

export default ChefOrders;
