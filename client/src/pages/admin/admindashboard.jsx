import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/admin";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data.stats);
      setRecentOrders(response.data.recentOrders);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
      alert("Failed to load dashboard. Please login as admin.");
      setLoading(false);
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

  if (loading) return <div style={styles.loading}>Loading dashboard...</div>;

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <p style={styles.subtitle}>Monitor and manage your food delivery platform</p>

      {stats && (
        <>
          <div style={styles.statsGrid}>
            <div style={{...styles.statCard, background: '#4CAF50'}}>
              <h2>{stats.totalOrders}</h2>
              <p>Total Orders</p>
            </div>
            <div style={{...styles.statCard, background: '#2196F3'}}>
              <h2>{stats.totalUsers}</h2>
              <p>Total Users</p>
            </div>
            <div style={{...styles.statCard, background: '#FF9800'}}>
              <h2>{stats.totalChefs}</h2>
              <p>Home Chefs</p>
            </div>
            <div style={{...styles.statCard, background: '#9C27B0'}}>
              <h2>{stats.totalMenuItems}</h2>
              <p>Menu Items</p>
            </div>
            <div style={{...styles.statCard, background: '#FFA500'}}>
              <h2>{stats.pendingOrders}</h2>
              <p>Pending Orders</p>
            </div>
            <div style={{...styles.statCard, background: '#4CAF50'}}>
              <h2>{stats.completedOrders}</h2>
              <p>Completed Orders</p>
            </div>
            <div style={{...styles.statCard, background: '#00BCD4'}}>
              <h2>₹{stats.totalRevenue}</h2>
              <p>Total Revenue</p>
            </div>
            <div style={{...styles.statCard, background: '#E91E63'}}>
              <h2>₹{stats.totalRevenue > 0 ? Math.round(stats.totalRevenue / stats.completedOrders) : 0}</h2>
              <p>Avg Order Value</p>
            </div>
          </div>

          <div style={styles.quickActions}>
            <h3>Quick Actions</h3>
            <div style={styles.actionsGrid}>
              <button style={styles.actionBtn} onClick={() => navigate('/admin/orders')}>
                📦 View All Orders
              </button>
              <button style={styles.actionBtn} onClick={() => navigate('/admin/users')}>
                👥 Manage Users
              </button>
              <button style={styles.actionBtn} onClick={() => navigate('/admin/chefs')}>
                👨‍🍳 Manage Chefs
              </button>
              <button style={styles.actionBtn} onClick={() => navigate('/admin/menus')}>
                🍽️ View All Menus
              </button>
            </div>
          </div>

          <div style={styles.recentOrders}>
            <h3>Recent Orders</h3>
            {recentOrders.length === 0 ? (
              <p style={styles.noData}>No recent orders</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Order ID</th>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Chef</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id} style={styles.tr}>
                      <td style={styles.td}>#{order._id.slice(-6)}</td>
                      <td style={styles.td}>{order.userId?.name}</td>
                      <td style={styles.td}>{order.chefId?.name}</td>
                      <td style={styles.td}>₹{order.totalAmount}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.statusBadge,
                          background: getStatusColor(order.status)
                        }}>
                          {order.status.toUpperCase().replace('_', ' ')}
                        </span>
                      </td>
                      <td style={styles.td}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '20px auto',
    padding: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
  },
  subtitle: {
    color: '#666',
    marginBottom: '30px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  statCard: {
    padding: '30px 20px',
    borderRadius: '8px',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  quickActions: {
    marginBottom: '40px',
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '15px',
  },
  actionBtn: {
    padding: '15px 20px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  recentOrders: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  noData: {
    textAlign: 'center',
    padding: '30px',
    color: '#666',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    background: '#f5f5f5',
    borderBottom: '2px solid #ddd',
    fontWeight: 'bold',
  },
  tr: {
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '12px',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
  },
};

export default AdminDashboard;
