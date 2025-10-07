# 🛣️ Routes Guide - Complete Application Structure

## 📋 All Routes Overview

### 🔐 Authentication Routes

#### User Authentication
- `/register` - User registration page
- `/login` - User login page

#### Chef Authentication
- `/chef/register` - Chef registration page
- `/chef/login` - Chef login page

#### Admin Authentication
- `/admin/register` - Admin registration page (requires admin code: `ADMIN2024`)
- `/admin/login` - Admin login page

---

### 👤 User Routes

- `/` or `/home` - Browse menu items from all chefs
- `/cart` - View shopping cart
- `/checkout` - Checkout and place order
- `/orders` - View order history
- `/profile` - User profile (to be implemented)

---

### 🧑‍🍳 Chef Routes

- `/chef/dashboard` - Chef dashboard home
- `/chef/menu` - Manage menu items (add/edit/delete)
- `/chef/orders` - View and manage orders
- `/chef/profile` - Chef profile settings (to be implemented)
- `/chef/analytics` - Sales analytics (to be implemented)

---

### 👨‍💼 Admin Routes

- `/admin/dashboard` - Admin dashboard with statistics
- `/admin/orders` - View and manage all orders
- `/admin/users` - Manage users (to be implemented)
- `/admin/chefs` - Manage chefs (to be implemented)
- `/admin/menus` - View all menus (to be implemented)

---

## 🔧 App.jsx Routes Configuration

Add these routes to your `App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// User Pages
import Home from './pages/user/Home';
import Cart from './pages/user/cart';
import Checkout from './pages/user/Checkout';
import Orders from './pages/user/Orders';

// Auth Pages - User
import Register from './pages/auth/Register';
import Login from './pages/auth/login';

// Auth Pages - Chef
import ChefRegister from './pages/auth/ChefRegister';
import ChefLogin from './pages/auth/ChefLogin';

// Auth Pages - Admin
import AdminRegister from './pages/auth/AdminRegister';
import AdminLogin from './pages/auth/AdminLogin';

// Chef Pages
import ChefDashboard from './pages/chef/ChefDashboard';
import ChefMenu from './pages/chef/ChefMenu';
import ChefOrders from './pages/chef/ChefOrders';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            
            {/* User Auth */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            {/* Chef Auth */}
            <Route path="/chef/register" element={<ChefRegister />} />
            <Route path="/chef/login" element={<ChefLogin />} />
            
            {/* Chef Dashboard */}
            <Route path="/chef/dashboard" element={<ChefDashboard />} />
            <Route path="/chef/menu" element={<ChefMenu />} />
            <Route path="/chef/orders" element={<ChefOrders />} />
            
            {/* Admin Auth */}
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Admin Dashboard */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
```

---

## 🎯 User Flow Examples

### User Journey
```
1. Visit / (Home)
2. Browse menu items
3. Click "Add to Cart"
4. Go to /cart
5. Click "Checkout" → /checkout
6. Fill details and place order
7. Go to /orders to track
```

### Chef Journey
```
1. Visit /chef/register
2. Register as chef
3. Login at /chef/login
4. Redirected to /chef/dashboard
5. Click "My Menu" → /chef/menu
6. Add menu items
7. Click "Orders" → /chef/orders
8. Manage incoming orders
```

### Admin Journey
```
1. Visit /admin/register
2. Enter admin code: ADMIN2024
3. Register as admin
4. Login at /admin/login
5. Redirected to /admin/dashboard
6. View statistics
7. Click "View All Orders" → /admin/orders
8. Manage platform
```

---

## 🔒 Protected Routes

### Routes Requiring Authentication

**User Routes (require user login):**
- `/cart`
- `/checkout`
- `/orders`

**Chef Routes (require chef login):**
- `/chef/dashboard`
- `/chef/menu`
- `/chef/orders`

**Admin Routes (require admin login):**
- `/admin/dashboard`
- `/admin/orders`

### Public Routes (no auth required)
- `/` (Home - browse menus)
- `/register`
- `/login`
- `/chef/register`
- `/chef/login`
- `/admin/register`
- `/admin/login`

---

## 🎨 Navigation Components

### Create a Navigation Bar

```jsx
// components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🍽️ Food Delivery</Link>
      
      <div style={styles.links}>
        {!user && (
          <>
            <Link to="/login">User Login</Link>
            <Link to="/chef/login">Chef Login</Link>
            <Link to="/admin/login">Admin Login</Link>
          </>
        )}
        
        {user && user.role === 'user' && (
          <>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">My Orders</Link>
          </>
        )}
        
        {user && user.role === 'homechef' && (
          <>
            <Link to="/chef/dashboard">Dashboard</Link>
            <Link to="/chef/menu">My Menu</Link>
            <Link to="/chef/orders">Orders</Link>
          </>
        )}
        
        {user && user.role === 'admin' && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/orders">All Orders</Link>
          </>
        )}
        
        {user && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};
```

---

## 📱 Mobile-Friendly Routes

All pages are responsive and work on mobile devices. Consider adding:

- Bottom navigation for mobile
- Hamburger menu for small screens
- Touch-friendly buttons

---

## 🔄 Redirects

### After Login
- **User** → `/` (Home)
- **Chef** → `/chef/dashboard`
- **Admin** → `/admin/dashboard`

### After Registration
- **User** → `/login`
- **Chef** → `/chef/login`
- **Admin** → `/admin/login`

### After Logout
- **All** → `/` (Home)

---

## 🎯 Quick Access URLs

### For Testing

**User:**
- Register: `http://localhost:5173/register`
- Login: `http://localhost:5173/login`
- Home: `http://localhost:5173/`

**Chef:**
- Register: `http://localhost:5173/chef/register`
- Login: `http://localhost:5173/chef/login`
- Dashboard: `http://localhost:5173/chef/dashboard`
- Menu: `http://localhost:5173/chef/menu`
- Orders: `http://localhost:5173/chef/orders`

**Admin:**
- Register: `http://localhost:5173/admin/register`
- Login: `http://localhost:5173/admin/login`
- Dashboard: `http://localhost:5173/admin/dashboard`
- Orders: `http://localhost:5173/admin/orders`

---

## 📝 Route Parameters

### Dynamic Routes

**Order Details:**
```jsx
<Route path="/orders/:orderId" element={<OrderDetails />} />
```

**Menu Item Details:**
```jsx
<Route path="/menu/:itemId" element={<MenuItemDetails />} />
```

**Chef Profile:**
```jsx
<Route path="/chef/:chefId" element={<ChefProfile />} />
```

---

## 🚀 Next Steps

1. **Add Navigation Bar** to all pages
2. **Implement Protected Routes** with auth checks
3. **Add 404 Page** for invalid routes
4. **Add Loading States** during navigation
5. **Add Breadcrumbs** for better UX

---

**All routes are now organized and ready to use!** 🎉
