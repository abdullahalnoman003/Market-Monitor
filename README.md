# 🌐 Market Monitor

**Market Monitor** is a real-time, role-based MERN Stack application built to monitor, manage, and analyze local market product prices. With user-friendly dashboards, vendor controls, Stripe payments, live filtering, dynamic ads, and interactive price charts — this platform empowers users, vendors, and admins with complete insight and control over marketplace dynamics.

---

## 🎯 Project Objective

Designed to simplify local market price tracking and management with secure access, interactive UI, and intelligent product handling — making it ideal for both consumers and market vendors.

---

## 🚀 Live Demo

🔗 [Visit Market Monitor](https://market-monitor.netlify.app)

---

## ✨ Key Features

### 👥 Role-Based Dashboard Access

* 🔐 Secure login via Firebase Authentication
* 👤 **User Dashboard**: Watchlist, Orders, Price Trend Analytics
* 🛒 **Vendor Dashboard**: Add/Edit Products & Ads
* 👑 **Admin Dashboard**: Manage Users, Products, Ads, Orders

### 📦 Product Management

* ✅ Products require admin approval before listing
* 📝 Vendors can manage products (create, edit, delete)
* 📈 Vendors can track historical prices

### 🔍 Smart Search & Filtering

* 📅 Filter products by date or range
* 💸 Sort by price (ascending/descending)
* 🔎 Admin-only server-side search for users/orders

### 💳 Stripe Payment Integration

* 🔐 Secure product payments via Stripe Checkout
* ✅ Orders saved post-payment with status tracking
* 📢 Success/Error feedback via SweetAlert with redirect

### 📈 Price Trend Analytics

* 📊 Interactive Recharts-based graphs
* 📆 Compare historical prices over time
* 🛒 Helps users make smarter buying decisions

### ❤️ Watchlist System

* ⭐ Add items to personalized watchlist
* 📉 Track price trends of saved products
* ❌ Remove with confirmation modals

### 📢 Advertisements

* 📤 Vendors can submit advertisements
* ✅ Admin approval/rejection with feedback modal
* 📄 Dynamic status: pending, approved, or rejected

### 🔐 Secured APIs & Middleware

* 🔑 Firebase ID token-based protected routes
* 🛡️ Express custom middleware for role-based access

---

## 💻 Technologies Used

### 🔧 Frontend

* **React**, **React Router DOM**
* **Axios** with secure interceptors
* **React Query** for data fetching and caching
* **Framer Motion** & **Lottie** for animations
* **Tailwind CSS** + **DaisyUI** themes
* **Recharts** for charting
* **Stripe.js**, `@stripe/react-stripe-js`

### 🔧 Backend

* **Node.js** + **Express.js**
* **MongoDB** (CRUD, filter, aggregate)
* **Firebase Admin SDK** for token verification
* **Middleware** for role protection
* **CORS**, **Dotenv**, **Morgan**

---

## 🌟 Special Highlights

* 🎨 **Dark Mode** using DaisyUI (`fantasy` & `abyss`)
* 📱 Fully responsive & mobile-friendly
* 🧩 Reusable and well-structured components
* 🎯 Real-time Firebase role validation middleware
* 💡 Optimized UI with motion, modals, loaders, and fallback UIs

---

## 🏠 Pages Overview

### 🛒 Home

* 🎯 Public preview of 6 approved products
* 📢 Advertisements carousel
* 📈 Trend animations (Framer Motion)

### 🗂️ All Products

* 🗓️ Filter by date or range
* 🔍 Search by keyword
* 💸 Sort by price

### 📋 Product Details

* 💬 User reviews with ratings
* 📉 Recharts-based price comparisons
* ⭐ Add to Watchlist
* 💳 Purchase via Stripe

### 👤 User Dashboard

* 📊 Track price analytics
* ⭐ Manage Watchlist
* 🧾 View orders and details

### 🧑‍🌾 Vendor Dashboard

* 📝 Submit daily prices
* 📷 Upload product photos
* 🧾 Manage product listings & ads

### 👑 Admin Dashboard

* 👥 Manage all users/roles
* 📋 Approve/Reject products & ads
* 📝 Feedback modals for rejection
* 🧾 Monitor and search all orders/users

---

## 🔐 Environment Variables

### Client

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### Server

```env
FIREBASE_TYPE=...
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...
STRIPE_SECRET_KEY=...
```

---

## ⚙️ Getting Started

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
npm run dev
```

---
## 📦 Dependencies

See below for a list of major libraries and tools used in the frontend.
Sure! Here's the **README section** with just the dependencies, formatted and ready to copy:

---
### 🧩 **Frontend Dependencies** (`client/`)

#### ✅ Core Libraries

* **react**
* **react-dom**
* **react-router-dom**

#### 🎨 Styling & UI

* **tailwindcss**
* **daisyui**
* **aos** (scroll animations)
* **lottie-react** (vector animations)
* **react-icons**
* **react-responsive-carousel**

#### 📊 Data & Visualization

* **recharts**
* **react-countup**
* **react-datepicker**

#### 🔍 Forms & UX

* **react-hook-form**
* **react-toastify**
* **sweetalert2**
* **react-tooltip**
* **react-simple-typewriter**

#### ⚙️ Functionality

* **axios**
* **firebase**
* **@tanstack/react-query**
* **react-infinite-scroll-component**

#### 💳 Payments

* **@stripe/react-stripe-js**
* **@stripe/stripe-js**

---

### 🛠️ Dev Dependencies

* **vite**
* **@vitejs/plugin-react**
* **eslint**
* **@eslint/js**
* **eslint-plugin-react-hooks**
* **eslint-plugin-react-refresh**
* **@types/react**
* **@types/react-dom**
* **globals**

---


## ✅ Deployment Checklist

* 🔗 Client: Deployed on **Netlify**
* ⚙️ Server: Hosted on **Vercel** with domain whitelisting
* 🔐 Firebase: Auth domain and token verification active
* 📦 MongoDB Atlas for production database
* ✅ All routes secured, tested, and optimized

---

### 🚀 Ready to dive in?

> Star ⭐ this repo, clone it, and start building your bookshelf today!

## 🧑‍💻 Developer

**👨‍🎓 Abdullah Al Noman**  
🔗 [LinkedIn](https://www.linkedin.com/in/abdullahalnoman003) •  
🔗 [Github](https://github.com/abdullahalnoman003) •  

> “Market Monitor is a showcase of everything I’ve learned — from secure API handling to animation-rich frontend experiences.”


### Random Quote
> 💡 _“A reader lives a thousand lives before he dies. The man who never reads lives only one.”_ — George R.R. Martin

---

## 📬 Contact

Feel free to connect or collaborate!

---

