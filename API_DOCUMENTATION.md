# Food Delivery Platform - API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication
Most endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication APIs

### User Authentication
- **POST** `/user/auth/register` - Register new user
- **POST** `/user/auth/login` - User login

### Home Chef Authentication
- **POST** `/homechef/auth/register` - Register new home chef
- **POST** `/homechef/auth/login` - Home chef login

### Admin Authentication
- **POST** `/admin/auth/register` - Register new admin
- **POST** `/admin/auth/login` - Admin login

---

## 🍽️ Menu Management APIs

### Public Endpoints
- **GET** `/homechef/menu/items/getItems` - Get all menu items (no auth required)
- **GET** `/homechef/menu/items/getItemsById/:chefId` - Get menu items by chef ID (no auth required)

### Chef Endpoints (Auth Required)
- **POST** `/homechef/menu/items/addItem` - Add new menu item (multipart/form-data)
  - Fields: name, description, price, available, date, image (file)
- **PUT** `/homechef/menu/items/updateItem/:id` - Update menu item (multipart/form-data)
- **DELETE** `/homechef/menu/items/deleteItem/:id` - Delete menu item

---

## 🛒 Cart APIs (Auth Required)

- **POST** `/user/cart/addToCart` - Add item to cart
  ```json
  {
    "itemId": "menuItemId",
    "quantity": 1
  }
  ```
- **GET** `/user/cart/getCart` - Get user's cart
- **POST** `/user/cart/removeFromCart` - Remove item from cart
  ```json
  {
    "itemId": "menuItemId"
  }
  ```

---

## 📦 Order APIs

### User Endpoints (Auth Required)
- **POST** `/user/order/create` - Create order from cart
  ```json
  {
    "deliveryType": "delivery|pickup",
    "deliveryAddress": {
      "street": "123 Main St",
      "city": "City",
      "state": "State",
      "zipCode": "12345",
      "coordinates": {
        "latitude": 0.0,
        "longitude": 0.0
      }
    },
    "contactNumber": "+1234567890",
    "specialInstructions": "Optional notes"
  }
  ```
- **GET** `/user/order/myorders` - Get user's orders
- **GET** `/user/order/:orderId` - Get single order details
- **PUT** `/user/order/cancel/:orderId` - Cancel order (only if pending/confirmed)

### Chef Endpoints (Auth Required)
- **GET** `/user/order/chef/orders` - Get all orders for chef
- **PUT** `/user/order/chef/status/:orderId` - Update order status
  ```json
  {
    "status": "pending|confirmed|preparing|ready|out_for_delivery|delivered|cancelled"
  }
  ```

---

## 👨‍💼 Admin APIs (Auth Required)

### Monitoring
- **GET** `/admin/orders` - Get all orders
  - Query params: `status`, `startDate`, `endDate`
- **GET** `/admin/menus` - Get all menus
  - Query params: `available`, `chefId`
- **GET** `/admin/users` - Get all users
  - Query params: `role`
- **GET** `/admin/chefs` - Get all home chefs
- **GET** `/admin/dashboard` - Get dashboard statistics

### Management
- **DELETE** `/admin/users/:userId` - Delete user
- **PUT** `/admin/orders/:orderId/status` - Update order status
  ```json
  {
    "status": "pending|confirmed|preparing|ready|out_for_delivery|delivered|cancelled"
  }
  ```

---

## 📊 Data Models

### User Model
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: "user|homechef|admin",
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  chefProfile: {
    bio: String,
    specialties: [String],
    rating: Number,
    totalOrders: Number
  }
}
```

### Menu Item Model
```javascript
{
  chefId: ObjectId,
  name: String,
  image: String,
  description: String,
  price: Number,
  available: Boolean,
  date: Date
}
```

### Order Model
```javascript
{
  userId: ObjectId,
  items: [{
    itemId: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String,
  deliveryType: "delivery|pickup",
  deliveryAddress: Object,
  contactNumber: String,
  specialInstructions: String,
  estimatedDeliveryTime: Date,
  chefId: ObjectId
}
```

### Cart Model
```javascript
{
  userId: ObjectId,
  items: [{
    itemId: ObjectId,
    quantity: Number
  }]
}
```

---

## 🔒 Order Status Flow

1. **pending** - Order created, awaiting chef confirmation
2. **confirmed** - Chef accepted the order
3. **preparing** - Chef is preparing the food
4. **ready** - Food is ready for pickup/delivery
5. **out_for_delivery** - Order is being delivered
6. **delivered** - Order completed
7. **cancelled** - Order cancelled

---

## 🌍 Location Detection

Users can provide location coordinates for:
- Hyperlocal chef discovery
- Delivery address
- Distance calculation

Frontend should implement browser geolocation API:
```javascript
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  // Send to backend
});
```

---

## 📝 Notes

1. All menu item uploads require `multipart/form-data` content type
2. Images are stored in `/uploads` directory on server
3. JWT tokens expire in 2 hours
4. Cart is automatically cleared after order creation
5. Orders can only be cancelled if status is 'pending' or 'confirmed'
6. All items in cart must be from the same chef
