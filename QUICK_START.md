# 🚀 Quick Start Guide - Food Delivery Platform

## ⚡ Fast Setup (5 Minutes)

### Step 1: Start MongoDB
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### Step 2: Start Backend
```bash
cd server
npm start
```

**Expected Output:**
```
Server started on PORT : 5000
MongoDB Connected
```

### Step 3: Start Frontend
```bash
cd client
npm run dev
```

**Expected Output:**
```
VITE ready in ... ms
➜  Local:   http://localhost:5173/
```

### Step 4: Open Browser
```
http://localhost:5173
```

---

## 🧪 Quick Test (2 Minutes)

### Test 1: Register User
1. Click "Register"
2. Fill form:
   - Name: `Test User`
   - Email: `user@test.com`
   - Password: `test123`
3. Click "Register"
4. ✅ Should see "User registered successfully!"

### Test 2: Login
1. Click "Login"
2. Enter:
   - Email: `user@test.com`
   - Password: `test123`
3. Click "Login"
4. ✅ Should be redirected to home

### Test 3: Browse Menus
1. Go to Home page
2. ✅ Should see menu items with images
3. ✅ Images should load (or show placeholder)

### Test 4: Add to Cart
1. Click "Add to Cart" on any item
2. Go to Cart page
3. ✅ Should see item with image, price, quantity
4. ✅ Should see total amount

### Test 5: Place Order
1. In Cart, click "Checkout"
2. Select "Delivery" or "Pickup"
3. Fill required fields:
   - Contact Number: `+1234567890`
   - Address (if delivery): `123 Main St, City`
4. Click "Place Order"
5. ✅ Should see "Order placed successfully!"
6. ✅ Cart should be empty

### Test 6: View Orders
1. Go to Orders page
2. ✅ Should see your order with status "pending"
3. ✅ Should see all order details
4. Try clicking "Cancel Order"
5. ✅ Order status should change to "cancelled"

---

## 👨‍🍳 Test as Home Chef

### Register Chef
```bash
# Use Register page with role: homechef
Name: Chef Maria
Email: chef@test.com
Password: chef123
```

### Upload Menu Item

**Using Postman/cURL:**
```bash
# 1. Login to get token
curl -X POST http://localhost:5000/api/v1/homechef/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"chef@test.com","password":"chef123"}'

# 2. Copy the token from response

# 3. Upload menu item
curl -X POST http://localhost:5000/api/v1/homechef/menu/items/addItem \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=Chicken Biryani" \
  -F "description=Authentic homemade biryani" \
  -F "price=299" \
  -F "available=true" \
  -F "image=@/path/to/image.jpg"
```

**Or create a Chef Dashboard page** (see below)

---

## 🎯 Common Issues & Quick Fixes

### Issue: "Failed to fetch menus"
**Fix:** Make sure backend is running on port 5000
```bash
cd server
npm start
```

### Issue: "Failed to add to cart. Please login first."
**Fix:** Login before adding to cart
```bash
# Make sure you're logged in
# Check localStorage has token: localStorage.getItem('token')
```

### Issue: Images not showing
**Fix:** 
1. Make sure `uploads` folder exists in server directory
2. Restart backend server
3. Check image path in database

### Issue: "Cart is empty" when creating order
**Fix:** Add items to cart first before going to checkout

### Issue: MongoDB connection failed
**Fix:**
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
# Windows: net start MongoDB
# Mac/Linux: sudo systemctl start mongod
```

---

## 📱 Complete User Flow

```
1. Register → 2. Login → 3. Browse Menus → 4. Add to Cart 
   ↓
5. View Cart → 6. Checkout → 7. Place Order → 8. View Orders
```

---

## 🔑 Test Accounts

Create these for testing:

**User:**
- Email: `user@test.com`
- Password: `test123`
- Role: user

**Chef:**
- Email: `chef@test.com`
- Password: `chef123`
- Role: homechef

**Admin:**
- Email: `admin@test.com`
- Password: `admin123`
- Role: admin

---

## 📊 What's Working

### ✅ User Features
- [x] Registration & Login
- [x] Browse menu items with images
- [x] Add items to cart
- [x] View cart with images and totals
- [x] Remove items from cart
- [x] Checkout with delivery/pickup
- [x] Place orders
- [x] View order history
- [x] Cancel orders
- [x] Order status tracking

### ✅ Chef Features
- [x] Registration & Login
- [x] Upload menu items with images
- [x] Update menu items
- [x] Delete menu items
- [x] View own menu items

### ✅ Admin Features
- [x] Dashboard with statistics
- [x] View all orders
- [x] View all menus
- [x] View all users
- [x] Manage orders
- [x] Delete users

### ✅ Technical Features
- [x] JWT Authentication
- [x] Image upload & serving
- [x] CORS configured
- [x] MongoDB integration
- [x] API documentation
- [x] Error handling

---

## 🎨 UI Improvements (Optional)

Add these CSS files for better styling:

### `client/src/styles/cart.css`
```css
.cart-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.cart-container ul {
  list-style: none;
  padding: 0;
}

.cart-container li {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 8px;
}

.cart-container li img {
  border-radius: 4px;
}

.cart-total {
  margin: 20px 0;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.cart-container button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #4CAF50;
  color: white;
}

.cart-container button:hover {
  background: #45a049;
}
```

### `client/src/styles/checkout.css`
```css
.checkout-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}

.order-summary {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.delivery-type {
  margin: 20px 0;
}

.delivery-type label {
  margin-right: 20px;
  cursor: pointer;
}

.address-form input,
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.checkout-container button {
  width: 100%;
  padding: 15px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.checkout-container button:hover {
  background: #45a049;
}
```

### `client/src/styles/orders.css`
```css
.orders-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
}

.order-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background: white;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.order-status {
  font-weight: bold;
  padding: 5px 15px;
  border-radius: 20px;
  background: #f0f0f0;
}

.order-details p {
  margin: 8px 0;
}

.order-items {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.order-items ul {
  list-style: none;
  padding: 0;
}

.order-items li {
  padding: 5px 0;
}

.cancel-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn:hover {
  background: #da190b;
}
```

---

## 🎯 Next Steps

1. ✅ Test all features
2. ✅ Add CSS styling
3. ✅ Create Chef Dashboard page
4. ✅ Create Admin Dashboard page
5. ✅ Add real-time notifications (Socket.io)
6. ✅ Add payment integration
7. ✅ Deploy to production

---

## 📚 Documentation Links

- [API Documentation](./API_DOCUMENTATION.md)
- [Setup Guide](./SETUP_GUIDE.md)
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)
- [Fixes Applied](./FIXES_APPLIED.md)
- [API Testing Examples](./API_TESTING_EXAMPLES.md)

---

**Ready to go! Start testing now! 🚀**
