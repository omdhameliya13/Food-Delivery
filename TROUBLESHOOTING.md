# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. ❌ 401 Unauthorized Error - "Failed to add to cart"

**Error Message:**
```
POST http://localhost:5000/api/v1/user/cart/addToCart 401 (Unauthorized)
Failed to add to cart
```

**Cause:** User is not logged in or authentication token is missing/expired.

**Solutions:**

#### Solution 1: Login First
1. Click "Login" button
2. Enter your credentials
3. Make sure you see "User LoggedIn Successfully"
4. Try adding to cart again

#### Solution 2: Check if Token is Saved
Open browser console (F12) and run:
```javascript
console.log(localStorage.getItem('token'));
```

If it returns `null`, you need to login again.

#### Solution 3: Clear Storage and Re-login
```javascript
// In browser console
localStorage.clear();
// Then login again
```

#### Solution 4: Verify Login Response
The login should return a token. Check the network tab:
- Go to Network tab in DevTools
- Login
- Check the response of `/api/v1/user/auth/login`
- Should contain: `{ "message": "...", "token": "..." }`

---

### 2. ❌ Images Not Displaying

**Cause:** Backend not serving static files or wrong image path.

**Solutions:**

#### Check Backend is Running
```bash
cd server
npm start
```

#### Verify Uploads Folder Exists
```bash
cd server
mkdir uploads  # Create if doesn't exist
```

#### Check Image URL
Images should be accessible at:
```
http://localhost:5000/uploads/FILENAME.jpg
```

Test in browser: `http://localhost:5000/uploads/`

---

### 3. ❌ CORS Errors

**Error:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:**

Check `server/index.js` has CORS configured:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

Restart backend server after changes.

---

### 4. ❌ Cart is Empty After Adding Items

**Causes:**
- Not logged in
- Token expired
- Backend cart not saving

**Solutions:**

#### Check if Logged In
```javascript
// Browser console
console.log(localStorage.getItem('token'));
console.log(localStorage.getItem('user'));
```

#### Check Backend Response
1. Open Network tab
2. Add item to cart
3. Check response of `/api/v1/user/cart/addToCart`
4. Should return cart with items

#### Verify Cart in Database
```bash
# MongoDB shell
mongosh
use food-delivery
db.carts.find().pretty()
```

---

### 5. ❌ Order Creation Fails

**Error:**
```
Failed to place order: Cart is empty
```

**Solutions:**

#### Ensure Cart Has Items
1. Add items to cart first
2. Go to cart page
3. Verify items are showing
4. Then go to checkout

#### Check Required Fields
- Contact number is required
- Address required for delivery (not for pickup)

---

### 6. ❌ Token Expired

**Error:**
```
Your session has expired. Please login again.
```

**Solution:**

Tokens expire after 2 hours. Simply login again:
1. Logout (or clear localStorage)
2. Login again
3. Continue using the app

---

### 7. ❌ MongoDB Connection Failed

**Error:**
```
MongooseError: connect ECONNREFUSED
```

**Solutions:**

#### Start MongoDB
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

#### Check MongoDB is Running
```bash
mongosh
# If connects successfully, MongoDB is running
```

#### Check Connection String
In `server/.env`:
```env
MONGO_URL=mongodb://localhost:27017/food-delivery
```

Try alternative:
```env
MONGO_URL=mongodb://127.0.0.1:27017/food-delivery
```

---

### 8. ❌ Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

#### Windows
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

#### Mac/Linux
```bash
lsof -ti:5000 | xargs kill -9
```

#### Use Different Port
In `server/.env`:
```env
PORT=5001
```

Update frontend axios baseURL to match.

---

## Quick Diagnostic Checklist

### Before Adding to Cart:
- [ ] Backend server is running (port 5000)
- [ ] Frontend server is running (port 5173)
- [ ] MongoDB is running
- [ ] User is logged in
- [ ] Token exists in localStorage
- [ ] Menu items are visible

### If Add to Cart Fails:
1. Check browser console for errors
2. Check Network tab for failed requests
3. Verify you're logged in: `localStorage.getItem('token')`
4. Try logging out and logging in again
5. Check backend console for errors

### If Images Don't Load:
1. Check if `uploads` folder exists in server directory
2. Verify backend is serving static files
3. Check image filename in database
4. Try accessing image directly: `http://localhost:5000/uploads/FILENAME`

---

## Debug Commands

### Check Authentication Status
```javascript
// Browser console
console.log('Token:', localStorage.getItem('token'));
console.log('User:', localStorage.getItem('user'));
```

### Clear All Data and Start Fresh
```javascript
// Browser console
localStorage.clear();
sessionStorage.clear();
// Then refresh page and login again
```

### Check Cart Contents
```javascript
// Browser console
fetch('http://localhost:5000/api/v1/user/cart/getCart', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
.then(r => r.json())
.then(console.log);
```

### Manual Login Test
```javascript
// Browser console
fetch('http://localhost:5000/api/v1/user/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@test.com',
    password: 'test123'
  })
})
.then(r => r.json())
.then(data => {
  console.log('Login response:', data);
  if (data.token) {
    localStorage.setItem('token', data.token);
    console.log('Token saved!');
  }
});
```

---

## Still Having Issues?

1. **Check Backend Logs:** Look at the terminal running the backend server
2. **Check Browser Console:** Press F12 and look for errors
3. **Check Network Tab:** See which requests are failing
4. **Restart Everything:**
   ```bash
   # Stop backend (Ctrl+C)
   # Stop frontend (Ctrl+C)
   # Restart MongoDB
   # Start backend
   # Start frontend
   ```

5. **Clear Everything:**
   ```bash
   # Clear browser data
   localStorage.clear();
   
   # Clear MongoDB
   mongosh
   use food-delivery
   db.dropDatabase()
   
   # Restart servers
   ```

---

## Prevention Tips

1. **Always Login Before Using Cart:** Cart requires authentication
2. **Check Token Expiry:** Tokens expire after 2 hours
3. **Keep Backend Running:** Don't close the backend terminal
4. **Keep MongoDB Running:** Ensure MongoDB service is active
5. **Use Correct Ports:** Backend on 5000, Frontend on 5173

---

**Need more help? Check the error message carefully and match it with the solutions above.**
