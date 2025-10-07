# 🧑‍🍳 Chef Dashboard Testing Guide

## Issue: Orders Not Displaying in Chef Dashboard

### Common Causes
1. Not logged in as a chef
2. No orders have been placed yet
3. Orders exist but for a different chef
4. Token expired or invalid

---

## ✅ Step-by-Step Testing Guide

### Step 1: Register as Chef

1. Go to Register page
2. Fill in details:
   ```
   Name: Chef Maria
   Email: chef@test.com
   Password: chef123
   ```
3. **IMPORTANT:** Make sure role is set to `homechef` (check your Register.jsx)
4. Click Register

### Step 2: Login as Chef

1. Go to Login page
2. Enter:
   ```
   Email: chef@test.com
   Password: chef123
   ```
3. Click Login
4. Should see "User LoggedIn Successfully"

### Step 3: Verify Chef Login

Open browser console (F12) and run:
```javascript
console.log('Token:', localStorage.getItem('token'));
console.log('User:', localStorage.getItem('user'));
```

**Expected Output:**
```javascript
Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // Long string
User: {"email":"chef@test.com","role":"homechef"}
```

**If role is NOT "homechef":**
- You registered as wrong role
- Re-register with correct role

### Step 4: Upload Menu Items (As Chef)

Before you can receive orders, you need menu items!

**Using Postman/cURL:**

1. Get your token from localStorage
2. Upload a menu item:

```bash
curl -X POST http://localhost:5000/api/v1/homechef/menu/items/addItem \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "name=Chicken Biryani" \
  -F "description=Delicious homemade biryani" \
  -F "price=299" \
  -F "available=true" \
  -F "image=@/path/to/image.jpg"
```

**Or create a simple upload form in your frontend.**

### Step 5: Place an Order (As User)

1. **Logout** from chef account
2. **Login/Register as a regular user:**
   ```
   Email: user@test.com
   Password: user123
   Role: user
   ```
3. Go to Home page
4. You should see the chef's menu items
5. Click "Add to Cart"
6. Go to Cart
7. Click "Checkout"
8. Fill in delivery details:
   - Contact Number: +1234567890
   - Address: 123 Main St, City
9. Click "Place Order"
10. Should see "Order placed successfully!"

### Step 6: View Orders in Chef Dashboard

1. **Logout** from user account
2. **Login as chef** again (chef@test.com)
3. Navigate to Chef Dashboard (`/chef/orders`)
4. You should now see the order!

---

## 🔍 Debugging Checklist

### If No Orders Show:

#### Check 1: Are You Logged In as Chef?
```javascript
// Browser console
const user = JSON.parse(localStorage.getItem('user'));
console.log('Role:', user.role); // Should be "homechef"
```

#### Check 2: Do You Have Menu Items?
```bash
# Test API
curl http://localhost:5000/api/v1/homechef/menu/items/getItems
```

Should return array of menu items.

#### Check 3: Have Orders Been Placed?
```javascript
// Browser console (while logged in as chef)
fetch('http://localhost:5000/api/v1/user/order/chef/orders', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
.then(r => r.json())
.then(data => console.log('Chef Orders:', data));
```

#### Check 4: Check Backend Logs
Look at your backend terminal for any errors when fetching orders.

#### Check 5: Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh Chef Dashboard
4. Look for request to `/user/order/chef/orders`
5. Check response:
   - **200 OK** with empty array `[]` = No orders yet
   - **200 OK** with data = Orders exist!
   - **401 Unauthorized** = Not logged in or token expired
   - **500 Error** = Backend issue

---

## 🧪 Complete Test Flow

### Test Scenario: Full Order Flow

```
1. Register Chef (chef@test.com)
   ↓
2. Login as Chef
   ↓
3. Upload Menu Item (using Postman/API)
   ↓
4. Logout
   ↓
5. Register User (user@test.com)
   ↓
6. Login as User
   ↓
7. Browse Menu (should see chef's item)
   ↓
8. Add to Cart
   ↓
9. Checkout & Place Order
   ↓
10. Logout
   ↓
11. Login as Chef
   ↓
12. Go to Chef Dashboard
   ↓
13. ✅ Order should appear!
   ↓
14. Click "Confirm Order"
   ↓
15. Status changes to "Confirmed"
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Please login as a chef to view orders"
**Solution:** You're not logged in. Login as chef first.

### Issue 2: "You must be logged in as a chef"
**Solution:** You're logged in but not as a chef. Check role in localStorage.

### Issue 3: "Your session has expired"
**Solution:** Token expired (2 hours). Login again.

### Issue 4: Orders show but can't update status
**Solution:** 
- Check if you're the chef who owns those orders
- Verify token is valid
- Check backend logs

### Issue 5: No orders even after placing one
**Possible Causes:**
1. **Order was placed for a different chef's items**
   - Each order is linked to the chef whose items were ordered
   - Make sure you ordered items from YOUR chef account

2. **ChefId not set correctly**
   - Check order in database:
   ```bash
   mongosh
   use food-delivery
   db.orders.find().pretty()
   ```
   - Verify `chefId` matches your chef's user ID

3. **Multiple chef accounts**
   - You might have multiple chef accounts
   - Make sure you're logged in as the correct chef

---

## 📊 Database Verification

### Check Orders in MongoDB

```bash
mongosh
use food-delivery

# View all orders
db.orders.find().pretty()

# View orders for specific chef
db.orders.find({ chefId: ObjectId("YOUR_CHEF_ID") }).pretty()

# View all users
db.users.find({ role: "homechef" }).pretty()

# View all menu items
db.menus.find().pretty()
```

### Verify Order Structure

Each order should have:
```javascript
{
  _id: ObjectId("..."),
  userId: ObjectId("..."),     // Customer
  chefId: ObjectId("..."),     // Chef who owns the menu items
  items: [...],
  totalAmount: 299,
  status: "pending",
  deliveryType: "delivery",
  contactNumber: "+1234567890",
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

---

## 🎯 Quick Test Commands

### Test 1: Check if logged in as chef
```javascript
const user = JSON.parse(localStorage.getItem('user') || '{}');
console.log('Logged in as:', user.role); // Should be "homechef"
```

### Test 2: Manually fetch chef orders
```javascript
fetch('http://localhost:5000/api/v1/user/order/chef/orders', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
.then(r => r.json())
.then(data => {
  console.log('Orders:', data);
  console.log('Number of orders:', data.length);
});
```

### Test 3: Check menu items
```javascript
fetch('http://localhost:5000/api/v1/homechef/menu/items/getItems')
.then(r => r.json())
.then(data => {
  console.log('Menu items:', data);
  console.log('Number of items:', data.length);
});
```

---

## 📝 Expected Behavior

### When Chef Dashboard Loads:

1. **If logged in as chef with orders:**
   - Shows statistics (Total, Pending, Active, Completed)
   - Shows filter buttons
   - Shows order cards with details
   - Shows action buttons (Confirm, Update Status, etc.)

2. **If logged in as chef with NO orders:**
   - Shows statistics (all zeros)
   - Shows "No orders found" message
   - Shows troubleshooting tips

3. **If NOT logged in as chef:**
   - Shows alert: "Please login as a chef"
   - Page shows loading state

---

## 🚀 Next Steps After Fixing

Once orders appear:

1. **Test Confirm Order:**
   - Click "✓ Confirm Order" on pending order
   - Status should change to "confirmed"

2. **Test Status Updates:**
   - Click "Move to PREPARING"
   - Click "Move to READY"
   - Click "Move to OUT FOR DELIVERY"
   - Click "Move to DELIVERED"

3. **Test Filters:**
   - Click "Pending" filter
   - Click "Active" filter
   - Click "Delivered" filter

4. **Test Cancel:**
   - Click "Cancel Order"
   - Status should change to "cancelled"

---

## 💡 Pro Tips

1. **Keep Backend Terminal Open:** Watch for errors
2. **Keep Browser Console Open:** See API responses
3. **Use Network Tab:** Monitor API calls
4. **Test with Real Data:** Create multiple orders
5. **Test Different Scenarios:** Multiple chefs, multiple users

---

## 📞 Still Not Working?

If orders still don't show after following all steps:

1. **Check backend is running:** `http://localhost:5000`
2. **Check frontend is running:** `http://localhost:5173`
3. **Check MongoDB is running:** `mongosh`
4. **Restart everything:**
   ```bash
   # Stop all servers
   # Restart MongoDB
   # Restart backend
   # Restart frontend
   ```
5. **Clear browser data:**
   ```javascript
   localStorage.clear();
   // Then login again
   ```

---

**Good luck! Your chef dashboard should now display orders correctly.** 🎉
