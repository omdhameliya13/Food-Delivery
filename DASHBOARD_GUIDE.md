# 📊 Dashboard Guide - Chef & Admin

## 🧑‍🍳 Chef Dashboard

### Overview
The Chef Dashboard allows home chefs to manage incoming orders, update order status, and track their business.

### Features

#### 1. **Order Statistics**
- Total Orders
- Pending Orders (requiring action)
- Active Orders (in progress)
- Completed Orders

#### 2. **Order Filters**
- **All Orders** - View all orders
- **Active** - Orders in progress (not delivered/cancelled)
- **Pending** - New orders waiting for confirmation
- **Confirmed** - Orders accepted by chef
- **Preparing** - Orders being prepared
- **Delivered** - Completed orders

#### 3. **Order Management**

**For Pending Orders:**
- ✅ **Confirm Order** - Accept the order
- ❌ **Reject Order** - Decline the order

**For Confirmed Orders:**
- Move through status flow:
  1. Confirmed → Preparing
  2. Preparing → Ready
  3. Ready → Out for Delivery
  4. Out for Delivery → Delivered

**At Any Time:**
- Cancel order (if not delivered)

#### 4. **Order Details Displayed**
- Customer name, email, phone
- Delivery type (delivery/pickup)
- Delivery address (if applicable)
- Special instructions
- Order items with quantities
- Total amount
- Order date and time

---

## 👨‍💼 Admin Dashboard

### Overview
The Admin Dashboard provides complete platform oversight with statistics, monitoring, and management capabilities.

### Features

#### 1. **Platform Statistics**
- **Total Orders** - All orders placed
- **Total Users** - Registered users
- **Home Chefs** - Registered chefs
- **Menu Items** - Total menu items
- **Pending Orders** - Orders awaiting action
- **Completed Orders** - Delivered orders
- **Total Revenue** - Sum of all delivered orders
- **Average Order Value** - Revenue per order

#### 2. **Quick Actions**
- 📦 **View All Orders** - Navigate to orders management
- 👥 **Manage Users** - User management (to be implemented)
- 👨‍🍳 **Manage Chefs** - Chef management (to be implemented)
- 🍽️ **View All Menus** - Menu management (to be implemented)

#### 3. **Recent Orders**
- Last 10 orders
- Quick overview with:
  - Order ID
  - Customer name
  - Chef name
  - Order amount
  - Current status
  - Order date

---

## 📦 Admin Orders Management

### Features

#### 1. **Advanced Filters**
- **Status Filter** - Filter by order status
- **Date Range** - Filter by start and end date
- **Apply/Clear** - Apply or clear filters

#### 2. **Order Statistics**
- Total orders count
- Total revenue

#### 3. **Complete Order Information**
- **Customer Details**: Name, email, phone
- **Chef Details**: Name, email
- **Order Details**: Type, amount, address
- **Items List**: All items with quantities and prices

#### 4. **Status Management**
Admin can change any order to any status:
- Pending
- Confirmed
- Preparing
- Ready
- Out for Delivery
- Delivered
- Cancelled

---

## 🚀 How to Use

### For Chefs

#### Step 1: Register as Chef
```
Name: Chef Maria
Email: chef@example.com
Password: yourpassword
Role: homechef
```

#### Step 2: Login
Use your chef credentials to login.

#### Step 3: Access Chef Dashboard
Navigate to `/chef/orders` or click "Chef Orders" in navigation.

#### Step 4: Manage Orders

**When New Order Arrives:**
1. You'll see it in "Pending" status
2. Review order details
3. Click "✓ Confirm Order" to accept
4. Or click "✗ Reject Order" to decline

**After Confirming:**
1. Click "→ Move to PREPARING" when you start cooking
2. Click "→ Move to READY" when food is ready
3. Click "→ Move to OUT FOR DELIVERY" when driver picks up
4. Click "→ Move to DELIVERED" when delivered

**Filter Orders:**
- Click filter buttons to view specific order types
- Use "Active" to see all in-progress orders

---

### For Admins

#### Step 1: Register as Admin
```
Name: Admin User
Email: admin@example.com
Password: yourpassword
Role: admin
```

#### Step 2: Login
Use your admin credentials to login.

#### Step 3: Access Admin Dashboard
Navigate to `/admin/dashboard` or click "Admin Dashboard" in navigation.

#### Step 4: Monitor Platform

**View Statistics:**
- Check total orders, users, chefs
- Monitor revenue and average order value
- See pending orders requiring attention

**View Recent Orders:**
- Scroll down to see last 10 orders
- Quick status overview

**Manage Orders:**
1. Click "📦 View All Orders"
2. Use filters to find specific orders
3. Change order status using dropdown
4. Monitor customer and chef information

---

## 📱 Order Flow Example

### User Places Order
```
User → Selects items → Adds to cart → Checkout → Places order
Status: PENDING
```

### Chef Receives Order
```
Chef Dashboard → New order appears → Chef reviews → Confirms
Status: PENDING → CONFIRMED
```

### Chef Prepares Order
```
Chef starts cooking → Updates status
Status: CONFIRMED → PREPARING
```

### Order Ready
```
Food is ready → Chef updates status
Status: PREPARING → READY
```

### Out for Delivery
```
Driver picks up → Chef updates status
Status: READY → OUT_FOR_DELIVERY
```

### Delivered
```
Order delivered → Chef/Admin updates status
Status: OUT_FOR_DELIVERY → DELIVERED
```

### Admin Monitors
```
Admin Dashboard → Views all orders → Can override any status if needed
```

---

## 🎨 Status Colors

- **Pending** - 🟠 Orange (Needs attention)
- **Confirmed** - 🟢 Green (Accepted)
- **Preparing** - 🔵 Blue (In progress)
- **Ready** - 🟣 Purple (Ready for pickup)
- **Out for Delivery** - 🟠 Orange (In transit)
- **Delivered** - 🟢 Green (Completed)
- **Cancelled** - 🔴 Red (Cancelled)

---

## 🔔 Notifications (Future Enhancement)

Currently, chefs and admins need to refresh the page to see new orders. 

**Planned Features:**
- Real-time notifications using Socket.io
- Sound alerts for new orders
- Push notifications
- Email notifications

---

## 📊 API Endpoints Used

### Chef Dashboard
- `GET /api/v1/user/order/chef/orders` - Get all chef orders
- `PUT /api/v1/user/order/chef/status/:orderId` - Update order status

### Admin Dashboard
- `GET /api/v1/admin/dashboard` - Get dashboard statistics
- `GET /api/v1/admin/orders` - Get all orders (with filters)
- `PUT /api/v1/admin/orders/:orderId/status` - Update order status

---

## 🐛 Troubleshooting

### Chef Dashboard Not Loading
**Solution:**
1. Make sure you're logged in as a chef
2. Check token in localStorage: `localStorage.getItem('token')`
3. Verify role: `localStorage.getItem('user')` should show `"role":"homechef"`

### No Orders Showing
**Solution:**
1. Make sure users have placed orders
2. Check if orders are assigned to your chef account
3. Verify backend is running

### Admin Dashboard Not Loading
**Solution:**
1. Make sure you're logged in as admin
2. Check role: `localStorage.getItem('user')` should show `"role":"admin"`
3. Verify backend API is accessible

### Cannot Update Order Status
**Solution:**
1. Check if you have proper permissions
2. Verify token is valid
3. Check backend logs for errors

---

## 📝 Best Practices

### For Chefs
1. **Check orders regularly** - Don't miss new orders
2. **Update status promptly** - Keep customers informed
3. **Review order details** - Check special instructions
4. **Confirm quickly** - Accept/reject within 5 minutes
5. **Communicate issues** - Cancel if you can't fulfill

### For Admins
1. **Monitor pending orders** - Ensure chefs are responding
2. **Check revenue daily** - Track platform growth
3. **Review cancelled orders** - Identify issues
4. **Use filters** - Find specific orders quickly
5. **Override when needed** - Help resolve issues

---

## 🎯 Quick Reference

### Chef Actions
| Status | Available Actions |
|--------|------------------|
| Pending | Confirm, Reject |
| Confirmed | Move to Preparing, Cancel |
| Preparing | Move to Ready, Cancel |
| Ready | Move to Out for Delivery, Cancel |
| Out for Delivery | Move to Delivered |
| Delivered | None (completed) |
| Cancelled | None (completed) |

### Admin Actions
| Action | Description |
|--------|-------------|
| View Dashboard | See platform statistics |
| View All Orders | See and filter all orders |
| Change Status | Override any order status |
| View Details | See complete order information |
| Filter Orders | Find specific orders |

---

**Happy Managing! 🎉**
