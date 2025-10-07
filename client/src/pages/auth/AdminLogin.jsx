import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form, "admin");
      alert("Admin logged in successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👨‍💼 Admin Login</h2>
        <p style={styles.subtitle}>Access admin dashboard and manage platform</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/admin/register" style={styles.link}>
            Register as Admin
          </Link>
        </p>
        
        <p style={styles.footer}>
          <Link to="/login" style={styles.link}>
            Login as User
          </Link>
          {" | "}
          <Link to="/chef/login" style={styles.link}>
            Login as Chef
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    padding: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    maxWidth: '450px',
    width: '100%',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  },
  title: {
    margin: '0 0 10px 0',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    margin: '0 0 30px 0',
    color: '#666',
    textAlign: 'center',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  button: {
    padding: '14px',
    background: '#f5576c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s',
    marginTop: '10px',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
  },
  link: {
    color: '#f5576c',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

export default AdminLogin;
