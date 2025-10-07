import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/authcontext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Navbar from './components/Navbar.jsx'

// User pages
import Home from './pages/user/Home.jsx'
import Cart from './pages/user/cart.jsx'
import Checkout from './pages/user/Checkout.jsx'
import Orders from './pages/user/Orders.jsx'

// User Auth pages
import Login from './pages/auth/login.jsx'
import Register from './pages/auth/Register.jsx'

// Chef Auth pages
import ChefLogin from './pages/auth/ChefLogin.jsx'
import ChefRegister from './pages/auth/ChefRegister.jsx'

// Admin Auth pages
import AdminLogin from './pages/auth/AdminLogin.jsx'
import AdminRegister from './pages/auth/AdminRegister.jsx'

// Chef pages
import ChefDashboard from './pages/chef/ChefDashboard.jsx'
import ChefMenu from './pages/chef/ChefMenu.jsx'
import ChefOrders from './pages/chef/ChefOrders.jsx'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminOrders from './pages/admin/AdminOrders.jsx'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div>
          <Navbar />
          
          <Routes>
            {/* Public User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            
            {/* User Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* User Protected Routes */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            
            {/* Chef Auth Routes */}
            <Route path="/chef/login" element={<ChefLogin />} />
            <Route path="/chef/register" element={<ChefRegister />} />
            
            {/* Chef Protected Routes */}
            <Route path="/chef/dashboard" element={<ChefDashboard />} />
            <Route path="/chef/menu" element={<ChefMenu />} />
            <Route path="/chef/orders" element={<ChefOrders />} />
            
            {/* Admin Auth Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            
            {/* Admin Protected Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
