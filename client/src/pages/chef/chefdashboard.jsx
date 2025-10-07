import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const ChefDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    // Check if user is logged in as chef
    if (!user || user.role !== 'homechef') {
      alert("Please login as a chef");
      navigate("/chef/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/chef/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🧑‍🍳 Chef Dashboard</h1>
        <div style={styles.userInfo}>
          <span>Welcome, {user?.email}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.grid}>
        <div style={styles.card} onClick={() => navigate("/chef/menu")}>
          <div style={styles.icon}>🍽️</div>
          <h3>My Menu</h3>
          <p>Add, edit, and manage your menu items</p>
        </div>

        <div style={styles.card} onClick={() => navigate("/chef/orders")}>
          <div style={styles.icon}>📦</div>
          <h3>Orders</h3>
          <p>View and manage customer orders</p>
        </div>

        <div style={styles.card} onClick={() => navigate("/chef/profile")}>
          <div style={styles.icon}>👤</div>
          <h3>Profile</h3>
          <p>Update your chef profile and settings</p>
        </div>

        <div style={styles.card} onClick={() => navigate("/chef/analytics")}>
          <div style={styles.icon}>📊</div>
          <h3>Analytics</h3>
          <p>View your sales and performance</p>
        </div>
      </div>

      <div style={styles.quickActions}>
        <h2>Quick Actions</h2>
        <div style={styles.actionGrid}>
          <button style={styles.actionButton} onClick={() => navigate("/chef/menu")}>
            + Add New Menu Item
          </button>
          <button style={styles.actionButton} onClick={() => navigate("/chef/orders")}>
            View Pending Orders
          </button>
        </div>
      </div>

      <div style={styles.tips}>
        <h3>💡 Tips for Success</h3>
        <ul style={styles.tipsList}>
          <li>Keep your menu updated with fresh items daily</li>
          <li>Respond to orders within 5 minutes</li>
          <li>Upload high-quality images of your dishes</li>
          <li>Set realistic preparation times</li>
          <li>Maintain consistent quality and taste</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '2px solid #f0f0f0',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  logoutButton: {
    padding: '8px 16px',
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  card: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    textAlign: 'center',
  },
  icon: {
    fontSize: '48px',
    marginBottom: '15px',
  },
  quickActions: {
    marginBottom: '40px',
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '15px',
  },
  actionButton: {
    padding: '15px 20px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  tips: {
    background: '#f9f9f9',
    padding: '30px',
    borderRadius: '12px',
  },
  tipsList: {
    lineHeight: '2',
    color: '#666',
  },
};

export default ChefDashboard;
