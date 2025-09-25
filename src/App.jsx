import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/user/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import Orders from "./pages/user/Orders";
import ChefDashboard from "./pages/chef/ChefDashboard";
import MenuUpload from "./pages/chef/MenuUpload";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageOrder from "./pages/admin/ManageOrder";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./styles/global.css";




function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/chef" element={<ChefDashboard />} />
            <Route path="/chef/upload" element={<MenuUpload />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<ManageOrder />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
