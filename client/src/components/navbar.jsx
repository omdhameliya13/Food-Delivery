import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">🍲 HomeCook</Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/orders">My Orders</Link>
            <Link to="/cart">Cart</Link>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
