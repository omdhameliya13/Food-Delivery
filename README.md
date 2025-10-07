# 🍽️ On-Demand Home Cook Food Delivery Platform

A hyperlocal food delivery platform connecting home chefs with nearby customers for fresh, homemade meals with real-time order tracking.

## 📋 Problem Statement

Create a platform where home chefs can upload daily meal menus and users nearby can order home-cooked food for delivery or pickup.

## ✨ Key Features

### 🧑‍🍳 Home Chef Features
- Registration with chef profile (bio, specialties)
- Daily menu upload with images
- Menu item management (add, update, delete)
- Order management and status tracking
- Real-time order notifications

### 👤 User Features
- Registration with location detection
- Browse nearby home chef menus
- Shopping cart functionality
- Order placement (delivery/pickup)
- Real-time order status tracking
- Order history

### 👨‍💼 Admin Features
- Dashboard with statistics
- Monitor all orders and menus
- User and chef management
- Order status override
- Platform analytics

## 🏗️ Architecture

### Backend (Node.js + Express + MongoDB)
```
server/
├── controller/
│   ├── User/
│   │   ├── authcontroller.js
│   │   ├── cart.js
│   │   └── order.js
│   ├── HomeChef/
│   │   ├── authcontroller.js
│   │   └── menu.js
│   └── admin/
│       └── admincontroller.js
├── models/
│   ├── user.js
│   ├── User/
│   │   ├── cart.js
│   │   └── order.js
│   └── HomeChef/
│       └── menu.js
├── routes/
│   ├── User/
│   ├── HomeChef/
│   └── admin/
├── middleware/
│   └── authmiddleware.js
└── index.js
```

### Frontend (React + Vite)
```
client/
├── src/
│   ├── api/
│   │   ├── axios.jsx
│   │   ├── user.jsx
│   │   ├── order.jsx
│   │   ├── cart.jsx
│   │   ├── menu.jsx
│   │   ├── homechef.jsx
│   │   └── admin.jsx
│   ├── pages/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── chef/
│   │   └── admin/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   └── App.jsx
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Food_Dilivery
```

2. **Setup Backend**
```bash
cd server
npm install
```

3. **Configure Environment Variables**
Create `.env` file in server directory:
```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/food-delivery
JWT_SECRET=your_jwt_secret_key_here
```

4. **Setup Frontend**
```bash
cd ../client
npm install
```

5. **Start Development Servers**

Backend:
```bash
cd server
npm start
# or with nodemon
nodemon index.js
```

Frontend:
```bash
cd client
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📡 API Endpoints

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

### Quick Reference

**Authentication**
- POST `/api/v1/user/auth/register` - User registration
- POST `/api/v1/user/auth/login` - User login
- POST `/api/v1/homechef/auth/register` - Chef registration
- POST `/api/v1/homechef/auth/login` - Chef login

**Menu**
- GET `/api/v1/homechef/menu/items/getItems` - Browse all menus
- POST `/api/v1/homechef/menu/items/addItem` - Add menu item (Chef)

**Orders**
- POST `/api/v1/user/order/create` - Create order
- GET `/api/v1/user/order/myorders` - Get user orders
- PUT `/api/v1/user/order/chef/status/:orderId` - Update status (Chef)

**Cart**
- POST `/api/v1/user/cart/addToCart` - Add to cart
- GET `/api/v1/user/cart/getCart` - Get cart
- POST `/api/v1/user/cart/removeFromCart` - Remove from cart

## 🗄️ Database Models

### User
- Basic info (name, email, password)
- Role (user/homechef/admin)
- Location (address with coordinates)
- Chef profile (for home chefs)

### Menu Item
- Chef reference
- Item details (name, description, price)
- Image
- Availability status
- Date

### Order
- User and Chef references
- Items with quantities and prices
- Status tracking
- Delivery type and address
- Contact information

### Cart
- User reference
- Items array

## 🔐 Authentication & Authorization

- JWT-based authentication
- Token stored in localStorage
- Token sent in Authorization header
- Role-based access control
- Token expiry: 2 hours

## 🌍 Location Features

### User Location Detection
```javascript
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  // Use for finding nearby chefs
});
```

### Hyperlocal Discovery
- Filter chefs by distance
- Show delivery estimates
- Location-based recommendations

## 📦 Order Flow

1. **Browse** - User browses nearby chef menus
2. **Add to Cart** - User adds items to cart
3. **Checkout** - User provides delivery details
4. **Order Created** - Status: `pending`
5. **Chef Confirms** - Status: `confirmed`
6. **Preparing** - Status: `preparing`
7. **Ready** - Status: `ready`
8. **Delivery** - Status: `out_for_delivery`
9. **Completed** - Status: `delivered`

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **CORS** - Cross-origin requests

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Router** - Routing
- **Context API** - State management

## 🔧 Configuration

### CORS Setup
Backend is configured to accept requests from `http://localhost:5173`

### File Uploads
- Images stored in `/server/uploads`
- Supported formats: jpg, png, jpeg
- Max file size: Configure in multer settings

## 📱 Future Enhancements

- [ ] Real-time notifications (Socket.io)
- [ ] Payment gateway integration
- [ ] Rating and review system
- [ ] Chef verification system
- [ ] Advanced search and filters
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Delivery partner integration
- [ ] Analytics dashboard
- [ ] Promotional codes/discounts

## 🐛 Known Issues & Fixes

### CORS Errors
✅ Fixed - CORS middleware configured in `server/index.js`

### 404 Errors
✅ Fixed - Base URL updated to `/api/v1` in `client/src/api/axios.jsx`

### Cart Controller Bugs
✅ Fixed - Missing `const` declarations and proper error handling

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ for home cooks and food lovers**
