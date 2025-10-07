import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminRegister = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "",
    confirmPassword: "",
    adminCode: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple admin code verification (you can make this more secure)
    if (form.adminCode !== "ADMIN2024") {
      alert("Invalid admin code!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);
    try {
      await register({ 
        name: form.name, 
        email: form.email, 
        password: form.password 
      }, "admin");
      alert("Admin registered successfully! Please login.");
      navigate("/admin/login");
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👨‍💼 Admin Registration</h2>
        <p style={styles.subtitle}>Register as platform administrator</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

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
            <label style={styles.label}>Admin Code</label>
            <input
              type="text"
              name="adminCode"
              placeholder="Enter admin registration code"
              value={form.adminCode}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <small style={styles.hint}>Contact system administrator for admin code</small>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              required
              minLength="6"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Registering..." : "Register as Admin"}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/admin/login" style={styles.link}>
            Login as Admin
          </Link>
        </p>
        
        <p style={styles.footer}>
          <Link to="/register" style={styles.link}>
            Register as User
          </Link>
          {" | "}
          <Link to="/chef/register" style={styles.link}>
            Register as Chef
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
  hint: {
    fontSize: '12px',
    color: '#999',
    fontStyle: 'italic',
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

export default AdminRegister;
