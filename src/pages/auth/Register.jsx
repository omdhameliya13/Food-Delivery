import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/auth.css";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("User registered successfully!");
      window.location.href = "/login";
    } catch (err) {
      alert("Registration failed: " + err.response?.data?.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
