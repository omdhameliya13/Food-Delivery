# 🍽️ Menu Flow Guide - Chef to User

## ✅ Complete Flow Implemented

### How It Works:

```
Chef Adds Product → Displays in Chef Menu → Displays on User Home Page
```

---

## 🧑‍🍳 **Chef Side - Adding Menu Items**

### Step 1: Chef Logs In
```
URL: /chef/login
Email: chef@test.com
Password: chef123
```

### Step 2: Navigate to My Menu
```
Chef Dashboard → Click "My Menu" → /chef/menu
```

### Step 3: Add New Menu Item
1. Click "+ Add New Item" button
2. Fill in the form:
   - **Item Name**: e.g., "Chicken Biryani"
   - **Description**: e.g., "Authentic homemade biryani with aromatic spices"
   - **Price**: e.g., 299
   - **Image**: Upload food image
   - **Available**: Check if available for orders
3. Click "Add Item"
4. ✅ Item is saved to database

### Step 4: View in Chef Menu
- Item immediately appears in "My Menu" page
- Shows image, name, description, price
- Can edit or delete the item
- Can toggle availability

---

## 👤 **User Side - Viewing Menu Items**

### Step 1: User Opens Home Page
```
URL: / or /home
No login required to browse!
```

### Step 2: See All Menu Items
- **ALL menu items from ALL chefs** are displayed
- Each item shows:
  - Image
  - Name
  - Description
  - Price
  - "Add to Cart" button

### Step 3: Add to Cart
1. Click "Add to Cart" on any item
2. Login if not already logged in
3. Item added to cart
4. Can proceed to checkout

---

## 🔄 **Complete Data Flow**

### Backend Flow:

```
1. Chef adds item via POST /api/v1/homechef/menu/items/addItem
   ↓
2. Item saved to MongoDB with chefId
   ↓
3. Chef fetches own items via GET /api/v1/homechef/menu/items/myItems
   ↓
4. Displays in Chef Menu page
   ↓
5. User fetches all items via GET /api/v1/homechef/menu/items/getItems
   ↓
6. Displays on User Home page
```

### Database Structure:

```javascript
{
  _id: ObjectId("..."),
  chefId: ObjectId("..."),  // Links to chef who created it
  name: "Chicken Biryani",
  description: "Authentic homemade biryani",
  price: 299,
  image: "1234567890-biryani.jpg",
  available: true,
  date: ISODate("2024-01-01"),
  createdAt: ISODate("2024-01-01"),
  updatedAt: ISODate("2024-01-01")
}
```

---

## 📡 **API Endpoints**

### Chef APIs (Require Auth):

**Add Menu Item:**
```
POST /api/v1/homechef/menu/items/addItem
Headers: Authorization: Bearer <token>
Body: FormData (name, description, price, available, image)
```

**Get My Menu Items:**
```
GET /api/v1/homechef/menu/items/myItems
Headers: Authorization: Bearer <token>
Returns: Array of chef's own menu items
```

**Update Menu Item:**
```
PUT /api/v1/homechef/menu/items/updateItem/:id
Headers: Authorization: Bearer <token>
Body: FormData (name, description, price, available, image)
```

**Delete Menu Item:**
```
DELETE /api/v1/homechef/menu/items/deleteItem/:id
Headers: Authorization: Bearer <token>
```

### User APIs (Public):

**Get All Menu Items:**
```
GET /api/v1/homechef/menu/items/getItems
No auth required
Returns: Array of ALL menu items from ALL chefs
```

**Get Items by Specific Chef:**
```
GET /api/v1/homechef/menu/items/getItemsById/:chefId
No auth required
Returns: Array of menu items from specific chef
```

---

## 🎯 **Testing the Complete Flow**

### Test 1: Chef Adds Item

```bash
# 1. Login as chef
curl -X POST http://localhost:5000/api/v1/homechef/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"chef@test.com","password":"chef123"}'

# 2. Copy the token

# 3. Add menu item
curl -X POST http://localhost:5000/api/v1/homechef/menu/items/addItem \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=Chicken Biryani" \
  -F "description=Delicious homemade biryani" \
  -F "price=299" \
  -F "available=true" \
  -F "image=@/path/to/image.jpg"

# 4. Verify in chef's menu
curl http://localhost:5000/api/v1/homechef/menu/items/myItems \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test 2: User Sees Item

```bash
# 1. Get all menu items (no auth needed)
curl http://localhost:5000/api/v1/homechef/menu/items/getItems

# Should return array including the item chef just added
```

### Test 3: Frontend Testing

**As Chef:**
1. Login at `/chef/login`
2. Go to `/chef/menu`
3. Click "+ Add New Item"
4. Fill form and submit
5. ✅ Item appears in the list immediately

**As User:**
1. Go to `/` (home page)
2. ✅ See the item chef just added
3. Click "Add to Cart"
4. Item added to cart

---

## 🖼️ **Image Handling**

### Upload:
- Images uploaded via multipart/form-data
- Stored in `server/uploads/` directory
- Filename: `timestamp-originalname.jpg`

### Display:
- **Chef Menu**: `http://localhost:5000/uploads/${item.image}`
- **User Home**: `http://localhost:5000/uploads/${menu.image}`
- Fallback to placeholder if image fails

---

## 🔍 **Key Features**

### Chef Menu Page (`/chef/menu`):
- ✅ Shows only chef's own items
- ✅ Add new items with image upload
- ✅ Edit existing items
- ✅ Delete items
- ✅ Toggle availability
- ✅ Statistics (total, available, unavailable)
- ✅ Real-time updates

### User Home Page (`/`):
- ✅ Shows ALL items from ALL chefs
- ✅ No login required to browse
- ✅ Images displayed
- ✅ Add to cart functionality
- ✅ Real-time updates when chefs add items

---

## 🎨 **UI Components**

### Chef Menu:
```
┌─────────────────────────────────────┐
│  My Menu Items                      │
│  [+ Add New Item]                   │
├─────────────────────────────────────┤
│  Statistics:                        │
│  Total: 5 | Available: 4 | Unavail: 1│
├─────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │Image │  │Image │  │Image │     │
│  │Name  │  │Name  │  │Name  │     │
│  │₹299  │  │₹399  │  │₹199  │     │
│  │[Edit]│  │[Edit]│  │[Edit]│     │
│  │[Del] │  │[Del] │  │[Del] │     │
│  └──────┘  └──────┘  └──────┘     │
└─────────────────────────────────────┘
```

### User Home:
```
┌─────────────────────────────────────┐
│  Browse Menu Items                  │
├─────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │Image │  │Image │  │Image │     │
│  │Name  │  │Name  │  │Name  │     │
│  │Desc  │  │Desc  │  │Desc  │     │
│  │₹299  │  │₹399  │  │₹199  │     │
│  │[+Cart]│  │[+Cart]│  │[+Cart]│   │
│  └──────┘  └──────┘  └──────┘     │
└─────────────────────────────────────┘
```

---

## 🐛 **Troubleshooting**

### Issue: Chef's items not showing in My Menu
**Solution:**
1. Check if logged in as chef: `localStorage.getItem('user')`
2. Check token exists: `localStorage.getItem('token')`
3. Check backend logs for errors
4. Verify API endpoint: `/api/v1/homechef/menu/items/myItems`

### Issue: Items not showing on user home page
**Solution:**
1. Check if items exist in database
2. Verify API endpoint: `/api/v1/homechef/menu/items/getItems`
3. Check browser console for errors
4. Verify backend is running

### Issue: Images not displaying
**Solution:**
1. Check `uploads` folder exists in server directory
2. Verify image path: `http://localhost:5000/uploads/filename`
3. Check static file serving in `server/index.js`
4. Ensure images were uploaded successfully

---

## 📊 **Database Queries**

### Check items in MongoDB:

```bash
mongosh
use food-delivery

# View all menu items
db.menus.find().pretty()

# View items by specific chef
db.menus.find({ chefId: ObjectId("CHEF_ID") }).pretty()

# Count total items
db.menus.countDocuments()

# View available items only
db.menus.find({ available: true }).pretty()
```

---

## 🎯 **Summary**

### ✅ What Works:

1. **Chef adds item** → Saved to database with chefId
2. **Chef views "My Menu"** → Shows only their items
3. **User views Home** → Shows ALL items from ALL chefs
4. **Real-time sync** → Items appear immediately
5. **Image upload** → Works with proper display
6. **CRUD operations** → Add, Edit, Delete all working

### 🔄 **Flow Confirmed:**

```
Chef Login → Add Item → Item in DB → Shows in Chef Menu ✅
                                   → Shows in User Home ✅
```

---

**Everything is working perfectly! Chefs can add items and they display in both chef menu and user home page.** 🎉
