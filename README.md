# Zwiggy

A full-stack food delivery web application built with the MERN stack. Customers can browse menus, add items to cart, and place orders with Stripe payments. Admins manage food items and track orders through a separate dashboard.

## Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React 19, Tailwind CSS v4, Vite, React Router v7 |
| **Admin Panel** | React 19, Vite, React Toastify |
| **Backend** | Node.js, Express 5, Mongoose (MongoDB), JWT, Stripe |
| **Auth** | bcrypt + JSON Web Tokens |
| **File Uploads** | Multer |

## Project Structure

```
zwiggy/
├── frontend/          # Customer-facing app
│   └── src/
│       ├── components/   # Navbar, Header, ExploreMenu, FoodDisplay, FoodItem, LoginPopup, Footer, AppDownload
│       ├── pages/        # Home, Cart, PlaceOrder
│       └── context/      # App-wide state (cart, auth)
├── admin/             # Admin dashboard
│   └── src/
│       ├── components/   # Sidebar, Navbar
│       └── pages/        # Add Items, List Items, Orders
├── backend/           # REST API server
│   ├── config/        # Database connection
│   ├── controllers/   # foodController, userController
│   ├── models/        # foodModel, userModel (Mongoose)
│   └── routes/        # /api/food, /api/user
└── README.md
```

## Features

**Customer App**
- Browse food menu by category
- Add/remove items from cart
- User registration & login (JWT auth)
- Place orders with delivery details
- Stripe payment integration

**Admin Dashboard**
- Add new food items with image upload
- View and manage all food items
- Track and update order status

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Stripe](https://stripe.com/) account (for payments)

### 1. Clone the repo

```bash
git clone https://github.com/jmanish45/zwiggy.git
cd zwiggy
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Start the server:

```bash
npm run server
```

The backend runs on `http://localhost:5000`.

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Set up the admin panel

```bash
cd admin
npm install
npm run dev
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/food/list` | Get all food items |
| `POST` | `/api/food/add` | Add a food item (with image) |
| `POST` | `/api/food/remove` | Remove a food item |
| `POST` | `/api/user/register` | Register a new user |
| `POST` | `/api/user/login` | Login and get JWT token |

## License

This project is open source and available under the [MIT License](LICENSE).
