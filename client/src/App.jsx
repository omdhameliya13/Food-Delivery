import './App.css'
import { Routes, Route, Link, Navigate } from 'react-router-dom'

// User pages
import Home from './pages/user/Home.jsx'
import Cart from './pages/user/cart.jsx'
import Checkout from './pages/user/Checkout.jsx'
import Orders from './pages/user/Orders.jsx'

// Auth pages
import Login from './pages/auth/login.jsx'
import Register from './pages/auth/Register.jsx'

// Admin pages
import AdminDashboard from './pages/admin/admindashboard.jsx'
import ManageOrder from './pages/admin/ManageOrder.jsx'

// Chef pages
import ChefDashboard from './pages/chef/chefdashboard.jsx'
import MenuUpload from './pages/chef/MenuUpload.jsx'

function App() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #eee' }}>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/checkout">Checkout</Link>
        <span style={{ marginLeft: 'auto' }} />
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/chef">Chef</Link>
      </nav>

      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<ManageOrder />} />

        {/* Chef routes */}
        <Route path="/chef" element={<ChefDashboard />} />
        <Route path="/chef/upload" element={<MenuUpload />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
