# 🚀 Quick Setup Guide

## Step-by-Step Installation

### 1️⃣ Prerequisites Check

Make sure you have installed:
- ✅ Node.js (v14 or higher) - [Download](https://nodejs.org/)
- ✅ MongoDB - [Download](https://www.mongodb.com/try/download/community)
- ✅ Git - [Download](https://git-scm.com/)

Verify installations:
```bash
node --version
npm --version
mongod --version
```

### 2️⃣ Start MongoDB

**Windows:**
```bash
# Start MongoDB service
net start MongoDB

# Or run mongod directly
mongod
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 3️⃣ Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env file with your settings
# Make sure to change JWT_SECRET to a secure random string
```

**Important:** Edit the `.env` file:
```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/food-delivery
JWT_SECRET=change_this_to_a_secure_random_string
FRONTEND_URL=http://localhost:5173
```

### 4️⃣ Frontend Setup

```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install
```

### 5️⃣ Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
# or for development with auto-reload
nodemon index.js
```

You should see:
```
Server started on PORT : 5000
MongoDB Connected
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

You should see:
```
VITE v... ready in ... ms
➜  Local:   http://localhost:5173/
```

### 6️⃣ Access the Application

Open your browser and go to:
```
http://localhost:5173
```

## 🧪 Testing the Setup

### Test 1: Register a User
1. Go to http://localhost:5173
2. Navigate to Register page
3. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. Click Register
5. You should see "User registered successfully!"

### Test 2: Register a Home Chef
1. Register with role: "homechef"
2. Login as chef
3. Upload a menu item

### Test 3: Place an Order
1. Login as user
2. Browse menu items
3. Add items to cart
4. Proceed to checkout
5. Place order

## 🔧 Troubleshooting

### Issue: CORS Error
**Solution:** Make sure backend is running and CORS is configured in `server/index.js`

### Issue: MongoDB Connection Failed
**Solution:** 
- Check if MongoDB is running: `mongod --version`
- Verify MONGO_URL in `.env` file
- Try: `mongodb://127.0.0.1:27017/food-delivery`

### Issue: Port Already in Use
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: Module Not Found
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Cannot Upload Images
**Solution:**
- Create `uploads` folder in server directory:
```bash
cd server
mkdir uploads
```

## 📝 Default Test Accounts

After setup, you can create these test accounts:

**User:**
- Email: user@test.com
- Password: user123
- Role: user

**Home Chef:**
- Email: chef@test.com
- Password: chef123
- Role: homechef

**Admin:**
- Email: admin@test.com
- Password: admin123
- Role: admin

## 🎯 Next Steps

1. ✅ Complete registration for all user types
2. ✅ Upload menu items as a chef
3. ✅ Browse and order as a user
4. ✅ Track orders in real-time
5. ✅ Monitor platform as admin

## 📚 Additional Resources

- [API Documentation](./API_DOCUMENTATION.md)
- [README](./README.md)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)

## 🆘 Need Help?

If you encounter any issues:
1. Check the console logs (both frontend and backend)
2. Verify all environment variables
3. Ensure MongoDB is running
4. Check if ports 5000 and 5173 are available
5. Review the troubleshooting section above

---

**Happy Coding! 🎉**
