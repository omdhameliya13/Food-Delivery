import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AuthStatus = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={styles.container}>
        <p style={styles.text}>Not logged in</p>
        <button style={styles.button} onClick={() => navigate("/login")}>
          Login
        </button>
        <button style={styles.button} onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <p style={styles.text}>
        Welcome, {user.email} ({user.role})
      </p>
      <button style={styles.logoutButton} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    background: "#f5f5f5",
    borderRadius: "4px",
  },
  text: {
    margin: 0,
    fontSize: "14px",
  },
  button: {
    padding: "8px 16px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  logoutButton: {
    padding: "8px 16px",
    background: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AuthStatus;
