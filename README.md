[README.md](https://github.com/user-attachments/files/32638630/README.md)
# ShopMERN — Full-Stack E-Commerce Platform

A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). The project is a monorepo with three independent apps: a customer-facing storefront, an admin dashboard, and a REST API backend.

**Repo:** `Sameer-azm/ecommerce-platform`

## Features

- Product catalog with search, category collections, and related-product suggestions
- User authentication with JWT (login/register, protected routes)
- Shopping cart with size selection, persisted per user via the backend
- Order placement and order history
- Cash-on-delivery and Stripe/Razorpay online payments
- Image uploads to Cloudinary (product photos)
- Admin dashboard to add/list products and manage orders, with separate admin auth
- Newsletter signup, hero banner, best-sellers and latest-collection sections

## Tech Stack

| App | Stack |
|---|---|
| **frontend** | React 19, Vite, React Router, Tailwind CSS, Framer Motion, Axios, Sonner (toasts) |
| **admin** | React 19, Vite, React Router, Tailwind CSS, Axios |
| **backend** | Node.js, Express 5, MongoDB (Mongoose), JWT, bcrypt, Multer, Cloudinary, Stripe, Razorpay |

## Project Structure

```
ecommerce-platform/
├── backend/         # Express REST API
│   ├── config/      # MongoDB & Cloudinary setup
│   ├── controllers/ # Route logic (user, product, cart, order)
│   ├── middleware/  # Auth (user/admin) and Multer upload config
│   ├── models/      # Mongoose schemas (user, product, order)
│   ├── routes/      # /api/user, /api/product, /api/cart, /api/order
│   └── server.js    # App entry point
├── frontend/        # Customer storefront (Vite + React)
│   └── src/
│       ├── pages/       # Home, Collection, Product, Cart, PlaceOrder, Orders, Login, Verify, About, Contact
│       ├── components/  # Nav, Hero, ProductItem, CartTotal, Footer, etc.
│       └── context/     # ShopContext — global cart/auth state
└── admin/
    └── admin/       # Admin dashboard (Vite + React)
        └── src/
            ├── pages/       # Add product, List products, Orders
            └── components/  # Navbar, Sidebar, Login
```

## Prerequisites

- Node.js 18+ and npm
- A MongoDB connection string (e.g. MongoDB Atlas)
- A Cloudinary account (for image uploads)
- A Stripe account (for online payments)

## Environment Variables

### `backend/.env`

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### `frontend/.env` and `admin/admin/.env`

```env
VITE_BACKEND_URL=http://localhost:4000
```

## Getting Started

Clone the repo and install dependencies for each app separately:

```bash
git clone https://github.com/Sameer-azm/ecommerce-platform.git
cd ecommerce-platform
```

### 1. Backend

```bash
cd backend
npm install
# create .env as shown above
npm run dev        # starts with nodemon on http://localhost:4000
```

### 2. Frontend (storefront)

```bash
cd frontend
npm install
# create .env as shown above
npm run dev         # starts on http://localhost:5173
```

### 3. Admin dashboard

```bash
cd admin/admin
npm install
# create .env as shown above
npm run dev         # starts on http://localhost:5174 (or next free port)
```

## API Overview

Base URL: `/api`

| Route | Description |
|---|---|
| `/api/user` | Register, login, admin login |
| `/api/product` | List, add, remove, and fetch product details (admin-protected writes) |
| `/api/cart` | Get, add, and update cart items (user-protected) |
| `/api/order` | Place orders, list orders, update order status, Stripe checkout |

## Deployment

Each app (`admin/admin`, `backend`, `frontend`) is deployed independently to Vercel, using its own `vercel.json` and root directory. Set the corresponding environment variables in each Vercel project's settings before deploying.

## License

ISC
