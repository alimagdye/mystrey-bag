# 🎒 Mystrey Bag API
An API for managing restaurants — including creating, updating, deleting, and listing them — with a feature to sort restaurants from the closest to the farthest based on the user's location using latitude and longitude.
--

---

##  Features:

* 📍 Restaurant Location Management (name, address, latitude, longitude)
* 📦 CRUD Operations for Restaurants
* ✅ Request Validation with `express-validator`
* 🌐 Connects to MongoDB (local or Atlas cloud)
* ⚡ Centralized Error Handling Middleware
* 🛠 Scalable and Modular Code Structure with Controllers, Routes, Models

---

## 🧰 Tech Stack:

* Node.js & Express.js
* TypeScript
* MongoDB with Mongoose
* express-validator
* dotenv for environment configuration

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/alimagdye/mystrey-bag.git
cd mystrey-bag
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DB_URI=mongodb://localhost:27017/mystreybag
```

> ℹ️ You can use a MongoDB Atlas URI for `DB_URI` (recommended for cloud deployment)

---

### 4️⃣ Start the Server

```bash
npm run dev
```

You should see:

```
Server is running on port 3000
Database connected successfully
```

---

## 📖 API Endpoints

### 📍 Restaurants

| Method     | Endpoint                 | Description               |
| ---------- | ------------------------ | ------------------------- |
| **GET**    | `/api/v1/resturants`     | Get all restaurants       |
| **GET**    | `/api/v1/resturants/:id` | Get a restaurant by ID    |
| **POST**   | `/api/v1/resturants`     | Create a new restaurant   |
| **PUT**    | `/api/v1/resturants/:id` | Update a restaurant by ID |
| **DELETE** | `/api/v1/resturants/:id` | Delete a restaurant by ID |

---

## 📂 Project Structure

```
.
├── src
│   ├── controllers      # Route handler logic
│   ├── routes           # Express route definitions
│   ├── config           # Mongoose schema/model, DB connection
│   ├── middleware       # Error handler, etc.
│   ├── index.ts         # App entry point
├── .env                 # Environment config
├── tsconfig.json        # TypeScript config
└── package.json
```

---

##  Sample Request Body (POST /api/v1/resturants)

```json
{
  "name": "Pizza Town",
  "address": "New Cairo, Fifth Settlement",
  "latitude": 30.0444,
  "longitude": 31.2357
}
```


---

### 📍 Location-Based Restaurant Listing

This API supports listing restaurants **sorted by proximity** to a user's location.

By sending the user's **latitude and longitude** as query parameters, the API returns restaurants ordered by distance from the user.

####  Example Endpoint:

```
GET /api/v1/resturants?latitude=30.0444&longitude=31.2357
```

####  How It Works:

* The API calculates the **distance between the user's location and each restaurant**.
* It uses the **Haversine formula** for accurate geospatial distance.
* Results are returned in **ascending order of distance** (closest first).

####  Sample Response:

```json
{
  "message": "resturant listed successfully",
  "data":[
      {
        "name": "Pizza Town",
        "address": "New Cairo, Fifth Settlement",
        "latitude": 30.0444,
        "longitude": 31.2357
      },
      {
        "name": "Burger World",
        "address": "Cairo, Nasr City",
        "latitude": 50.0444,
        "longitude": 51.2357
      }
    ]
}
```

---
