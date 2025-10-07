import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Don't show navbar on auth pages
  const hideNavbarPaths = [
    '/login', '/register', 
    '/chef/login', '/chef/register',
    '/admin/login', '/admin/register'
  ];
  
  if (hideNavbarPaths.includes(window.location.pathname)) {
    return null;
  }

  return (
    <nav style={styles.navbar}>
      {/* User Navbar */}
      {(!user || user.role === 'user') && (
        <>
          <Link to="/" style={styles.logo}>🍽️ Food Delivery</Link>
          <div style={styles.navLinks}>
            <Link to="/" style={styles.link}>Home</Link>
            {user && (
              <>
                <Link to="/cart" style={styles.link}>Cart</Link>
                <Link to="/orders" style={styles.link}>My Orders</Link>
              </>
            )}
          </div>
          <div style={styles.authSection}>
            {user ? (
              <>
                <span style={styles.userEmail}>{user.email}</span>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" style={styles.loginBtn}>Login</Link>
                <Link to="/register" style={styles.registerBtn}>Register</Link>
                <div style={styles.divider}>|</div>
                <Link to="/chef/login" style={styles.secondaryLink}>Chef Login</Link>
                <Link to="/admin/login" style={styles.secondaryLink}>Admin Login</Link>
              </>
            )}
          </div>
        </>
      )}

      {/* Chef Navbar */}
      {user && user.role === 'homechef' && (
        <>
          <Link to="/chef/dashboard" style={styles.logo}>🧑‍🍳 Chef Dashboard</Link>
          <div style={styles.navLinks}>
            <Link to="/chef/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/chef/menu" style={styles.link}>My Menu</Link>
            <Link to="/chef/orders" style={styles.link}>Orders</Link>
          </div>
          <div style={styles.authSection}>
            <span style={styles.userEmail}>{user.email}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        </>
      )}

      {/* Admin Navbar */}
      {user && user.role === 'admin' && (
        <>
          <Link to="/admin/dashboard" style={styles.logo}>👨‍💼 Admin Dashboard</Link>
          <div style={styles.navLinks}>
            <Link to="/admin/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/admin/orders" style={styles.link}>All Orders</Link>
          </div>
          <div style={styles.authSection}>
            <span style={styles.userEmail}>{user.email}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        </>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 30px',
    background: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#333',
    marginRight: '30px',
  },
  navLinks: {
    display: 'flex',
    gap: '25px',
    flex: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
  authSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  userEmail: {
    fontSize: '14px',
    color: '#666',
  },
  loginBtn: {
    padding: '8px 20px',
    background: 'white',
    color: '#4CAF50',
    border: '2px solid #4CAF50',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s',
  },
  registerBtn: {
    padding: '8px 20px',
    background: '#4CAF50',
    color: 'white',
    border: '2px solid #4CAF50',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s',
  },
  logoutBtn: {
    padding: '8px 20px',
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background 0.3s',
  },
  divider: {
    color: '#ddd',
    fontSize: '18px',
  },
  secondaryLink: {
    fontSize: '14px',
    color: '#666',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
};

export default Navbar;
