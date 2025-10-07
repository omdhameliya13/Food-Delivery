# 🧪 API Testing Examples

Quick reference for testing all APIs using cURL, Postman, or JavaScript fetch.

## 🔐 Authentication Examples

### 1. Register User
```bash
curl -X POST http://localhost:5000/api/v1/user/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "User Created Successfully",
  "newuser": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 2. Login User
```bash
curl -X POST http://localhost:5000/api/v1/user/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "User LoggedIn Successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Register Home Chef
```bash
curl -X POST http://localhost:5000/api/v1/homechef/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Chef Maria",
    "email": "maria@chef.com",
    "password": "chef123"
  }'
```

---

## 🍽️ Menu APIs

### 1. Get All Menu Items (No Auth Required)
```bash
curl http://localhost:5000/api/v1/homechef/menu/items/getItems
```

**JavaScript:**
```javascript
import { getAllMenuItems } from './api/menu';

const menus = await getAllMenuItems();
console.log(menus);
```

### 2. Add Menu Item (Chef Only)
```bash
curl -X POST http://localhost:5000/api/v1/homechef/menu/items/addItem \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=Chicken Biryani" \
  -F "description=Authentic homemade biryani" \
  -F "price=299" \
  -F "available=true" \
  -F "image=@/path/to/image.jpg"
```

**JavaScript with FormData:**
```javascript
import { addMenuItem } from './api/menu';

const formData = new FormData();
formData.append('name', 'Chicken Biryani');
formData.append('description', 'Authentic homemade biryani');
formData.append('price', 299);
formData.append('available', true);
formData.append('image', fileInput.files[0]);

const result = await addMenuItem(formData);
```

### 3. Get Menu Items by Chef
```bash
curl http://localhost:5000/api/v1/homechef/menu/items/getItemsById/CHEF_ID
```

### 4. Update Menu Item
```bash
curl -X PUT http://localhost:5000/api/v1/homechef/menu/items/updateItem/ITEM_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "price=349" \
  -F "available=false"
```

### 5. Delete Menu Item
```bash
curl -X DELETE http://localhost:5000/api/v1/homechef/menu/items/deleteItem/ITEM_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🛒 Cart APIs

### 1. Add to Cart
```bash
curl -X POST http://localhost:5000/api/v1/user/cart/addToCart \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "itemId": "MENU_ITEM_ID",
    "quantity": 2
  }'
```

**JavaScript:**
```javascript
import { addToCart } from './api/cart';

await addToCart({
  itemId: '507f1f77bcf86cd799439011',
  quantity: 2
});
```

### 2. Get Cart
```bash
curl http://localhost:5000/api/v1/user/cart/getCart \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**JavaScript:**
```javascript
import { getCart } from './api/cart';

const cart = await getCart();
console.log(cart.items);
```

### 3. Remove from Cart
```bash
curl -X POST http://localhost:5000/api/v1/user/cart/removeFromCart \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "itemId": "MENU_ITEM_ID"
  }'
```

---

## 📦 Order APIs

### 1. Create Order (Delivery)
```bash
curl -X POST http://localhost:5000/api/v1/user/order/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "deliveryType": "delivery",
    "deliveryAddress": {
      "street": "123 Main Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "coordinates": {
        "latitude": 40.7128,
        "longitude": -74.0060
      }
    },
    "contactNumber": "+1234567890",
    "specialInstructions": "Please ring the doorbell"
  }'
```

**JavaScript:**
```javascript
import { createOrder } from './api/order';

const order = await createOrder({
  deliveryType: 'delivery',
  deliveryAddress: {
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060
    }
  },
  contactNumber: '+1234567890',
  specialInstructions: 'Please ring the doorbell'
});
```

### 2. Create Order (Pickup)
```bash
curl -X POST http://localhost:5000/api/v1/user/order/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "deliveryType": "pickup",
    "contactNumber": "+1234567890"
  }'
```

### 3. Get My Orders
```bash
curl http://localhost:5000/api/v1/user/order/myorders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**JavaScript:**
```javascript
import { getUserOrders } from './api/order';

const orders = await getUserOrders();
orders.forEach(order => {
  console.log(`Order #${order._id}: ${order.status}`);
});
```

### 4. Get Order by ID
```bash
curl http://localhost:5000/api/v1/user/order/ORDER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Cancel Order
```bash
curl -X PUT http://localhost:5000/api/v1/user/order/cancel/ORDER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 6. Get Chef Orders
```bash
curl http://localhost:5000/api/v1/user/order/chef/orders \
  -H "Authorization: Bearer CHEF_TOKEN"
```

### 7. Update Order Status (Chef)
```bash
curl -X PUT http://localhost:5000/api/v1/user/order/chef/status/ORDER_ID \
  -H "Authorization: Bearer CHEF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "preparing"
  }'
```

**JavaScript:**
```javascript
import { updateOrderStatus } from './api/order';

await updateOrderStatus('ORDER_ID', 'preparing');
```

**Valid Status Values:**
- `pending`
- `confirmed`
- `preparing`
- `ready`
- `out_for_delivery`
- `delivered`
- `cancelled`

---

## 👨‍💼 Admin APIs

### 1. Get Dashboard Stats
```bash
curl http://localhost:5000/api/v1/admin/dashboard \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Response:**
```json
{
  "stats": {
    "totalOrders": 150,
    "totalUsers": 200,
    "totalChefs": 25,
    "totalMenuItems": 300,
    "pendingOrders": 10,
    "completedOrders": 120,
    "totalRevenue": 45000
  },
  "recentOrders": [...]
}
```

### 2. Get All Orders (with filters)
```bash
# All orders
curl http://localhost:5000/api/v1/admin/orders \
  -H "Authorization: Bearer ADMIN_TOKEN"

# Filter by status
curl "http://localhost:5000/api/v1/admin/orders?status=pending" \
  -H "Authorization: Bearer ADMIN_TOKEN"

# Filter by date range
curl "http://localhost:5000/api/v1/admin/orders?startDate=2024-01-01&endDate=2024-12-31" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**JavaScript:**
```javascript
import { getAllOrders } from './api/admin';

// All orders
const allOrders = await getAllOrders();

// Filtered orders
const pendingOrders = await getAllOrders({ status: 'pending' });
const dateRangeOrders = await getAllOrders({ 
  startDate: '2024-01-01', 
  endDate: '2024-12-31' 
});
```

### 3. Get All Menus
```bash
# All menus
curl http://localhost:5000/api/v1/admin/menus \
  -H "Authorization: Bearer ADMIN_TOKEN"

# Available menus only
curl "http://localhost:5000/api/v1/admin/menus?available=true" \
  -H "Authorization: Bearer ADMIN_TOKEN"

# Menus by specific chef
curl "http://localhost:5000/api/v1/admin/menus?chefId=CHEF_ID" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### 4. Get All Users
```bash
# All users
curl http://localhost:5000/api/v1/admin/users \
  -H "Authorization: Bearer ADMIN_TOKEN"

# Users by role
curl "http://localhost:5000/api/v1/admin/users?role=user" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### 5. Get All Chefs
```bash
curl http://localhost:5000/api/v1/admin/chefs \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### 6. Delete User
```bash
curl -X DELETE http://localhost:5000/api/v1/admin/users/USER_ID \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### 7. Update Order Status (Admin)
```bash
curl -X PUT http://localhost:5000/api/v1/admin/orders/ORDER_ID/status \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "delivered"
  }'
```

---

## 🧪 Complete Testing Flow

### Scenario: User Orders Food from Chef

```javascript
// 1. Register User
const userReg = await registerUser({
  name: 'Alice',
  email: 'alice@test.com',
  password: 'pass123'
});

// 2. Login User
const userLogin = await loginUser({
  email: 'alice@test.com',
  password: 'pass123'
});
const userToken = userLogin.token;

// 3. Register Chef
const chefReg = await registerChef({
  name: 'Chef Bob',
  email: 'bob@chef.com',
  password: 'chef123'
});

// 4. Login Chef
const chefLogin = await loginChef({
  email: 'bob@chef.com',
  password: 'chef123'
});
const chefToken = chefLogin.token;

// 5. Chef adds menu item
const formData = new FormData();
formData.append('name', 'Pasta Carbonara');
formData.append('description', 'Creamy Italian pasta');
formData.append('price', 250);
formData.append('available', true);
formData.append('image', imageFile);

const menuItem = await addMenuItem(formData);

// 6. User browses menus (no auth needed)
const menus = await getAllMenuItems();

// 7. User adds to cart
await addToCart({
  itemId: menuItem._id,
  quantity: 2
});

// 8. User views cart
const cart = await getCart();

// 9. User creates order
const order = await createOrder({
  deliveryType: 'delivery',
  deliveryAddress: {
    street: '456 Oak Ave',
    city: 'Boston',
    state: 'MA',
    zipCode: '02101',
    coordinates: { latitude: 42.3601, longitude: -71.0589 }
  },
  contactNumber: '+1987654321',
  specialInstructions: 'Extra cheese please'
});

// 10. Chef views orders
const chefOrders = await getChefOrders();

// 11. Chef updates order status
await updateOrderStatus(order._id, 'confirmed');
await updateOrderStatus(order._id, 'preparing');
await updateOrderStatus(order._id, 'ready');
await updateOrderStatus(order._id, 'out_for_delivery');
await updateOrderStatus(order._id, 'delivered');

// 12. User views order history
const myOrders = await getUserOrders();
```

---

## 🔑 Getting Location Coordinates

### Browser Geolocation API
```javascript
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => reject(error)
    );
  });
}

// Usage
const coords = await getUserLocation();
console.log(coords); // { latitude: 40.7128, longitude: -74.0060 }
```

---

## 📝 Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "Food Delivery Platform",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api/v1"
    },
    {
      "key": "userToken",
      "value": ""
    },
    {
      "key": "chefToken",
      "value": ""
    }
  ]
}
```

---

## ⚡ Quick Test Commands

```bash
# Test server is running
curl http://localhost:5000/api/v1/homechef/menu/items/getItems

# Register and login in one go
USER_TOKEN=$(curl -s -X POST http://localhost:5000/api/v1/user/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}' \
  | jq -r '.token')

echo $USER_TOKEN

# Use token in subsequent requests
curl http://localhost:5000/api/v1/user/cart/getCart \
  -H "Authorization: Bearer $USER_TOKEN"
```

---

**Happy Testing! 🚀**
