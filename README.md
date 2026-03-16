<div align="center">

<img src="https://img.icons8.com/emoji/96/hamburger-emoji.png" alt="Zwiggy Logo" width="80"/>

# 🍔 Zwiggy

### *Food Delivery, Reimagined.*

A full-stack MERN food delivery platform with real-time order management, Stripe payments, and a dedicated admin dashboard.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

<br/>

[Features](#-features) · [Tech Stack](#-tech-stack) · [Quick Start](#-quick-start) · [API Reference](#-api-reference) · [Architecture](#-architecture) · [License](#-license)

---

</div>

<br/>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🛒 Customer App

- 🍕 **Browse by Category** — Explore menus filtered by food type
- ➕ **Cart Management** — Add, remove, and update quantities
- 🔐 **Auth System** — Secure signup & login with JWT
- 📦 **Order Placement** — Full checkout with delivery details
- 💳 **Stripe Integration** — Secure online payments

</td>
<td width="50%">

### ⚙️ Admin Dashboard

- 📸 **Add Food Items** — Upload images, set prices & categories
- 📋 **Manage Listings** — View, edit, and remove menu items
- 📊 **Order Tracking** — Monitor all orders and update status
- 🔔 **Toast Notifications** — Real-time feedback on actions

</td>
</tr>
</table>

<br/>

## 🛠 Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_v4-0F172A?style=flat-square&logo=tailwindcss&logoColor=06B6D4)
![Vite](https://img.shields.io/badge/Vite-1a1a2e?style=flat-square&logo=vite&logoColor=646CFF)
![React Router](https://img.shields.io/badge/React_Router_v7-121212?style=flat-square&logo=reactrouter&logoColor=CA4245)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose_9-880000?style=flat-square&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

### Payments & Uploads
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF6600?style=flat-square&logoColor=white)

</div>

<br/>

## 🏗 Architecture

```mermaid
graph TB
    subgraph Client["🌐 Client Layer"]
        FE["🛒 Customer App<br/><i>React 19 + Tailwind v4</i><br/>Port 5173"]
        AD["⚙️ Admin Panel<br/><i>React 19 + Toastify</i><br/>Port 5174"]
    end

    subgraph Server["⚡ Server Layer"]
        API["📡 Express 5 API<br/>Port 5000"]
        AUTH["🔐 JWT Auth<br/><i>bcrypt + tokens</i>"]
        UPLOAD["📸 Multer<br/><i>Image uploads</i>"]
        PAY["💳 Stripe<br/><i>Payment processing</i>"]
    end

    subgraph Data["💾 Data Layer"]
        DB[("🍃 MongoDB<br/><i>Mongoose ODM</i>")]
        FS["📁 /uploads<br/><i>Static files</i>"]
    end

    FE -->|"axios"| API
    AD -->|"axios"| API
    API --> AUTH
    API --> UPLOAD
    API --> PAY
    API --> DB
    UPLOAD --> FS
    API -->|"/images/*"| FS

    style Client fill:#1a1a2e,stroke:#e94560,color:#fff
    style Server fill:#0f3460,stroke:#e94560,color:#fff
    style Data fill:#16213e,stroke:#e94560,color:#fff
```

<br/>

## 📁 Project Structure

```
zwiggy/
│
├── 🛒 frontend/                 # Customer-facing application
│   └── src/
│       ├── components/          # Navbar, Header, ExploreMenu, FoodDisplay,
│       │                        # FoodItem, LoginPopup, Footer, AppDownload
│       ├── pages/               # Home, Cart, PlaceOrder
│       └── context/             # Global state (cart, auth, API URL)
│
├── ⚙️ admin/                    # Admin dashboard
│   └── src/
│       ├── components/          # Sidebar, Navbar
│       └── pages/               # Add Items, List Items, Orders
│
├── 📡 backend/                  # REST API server
│   ├── config/                  # MongoDB connection setup
│   ├── controllers/             # foodController, userController
│   ├── models/                  # foodModel, userModel (Mongoose schemas)
│   ├── routes/                  # /api/food, /api/user
│   └── server.js                # Entry point
│
└── 📄 README.md
```

<br/>

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Required For |
|------|---------|-------------|
| [Node.js](https://nodejs.org/) | v18+ | Runtime |
| [MongoDB](https://www.mongodb.com/) | Latest | Database (local or [Atlas](https://www.mongodb.com/atlas)) |
| [Stripe Account](https://dashboard.stripe.com/register) | — | Payment processing |

### 1️⃣ Clone

```bash
git clone https://github.com/jmanish45/zwiggy.git
cd zwiggy
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

```bash
npm run server        # → http://localhost:5000
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev           # → http://localhost:5173
```

### 4️⃣ Admin Panel Setup

```bash
cd admin
npm install
npm run dev           # → http://localhost:5174
```

<br/>

## 📡 API Reference

<details>
<summary><b>🍔 Food Endpoints</b></summary>

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/food/list` | Fetch all food items | No |
| `POST` | `/api/food/add` | Add food item (multipart) | Admin |
| `POST` | `/api/food/remove` | Remove a food item | Admin |
| `GET` | `/images/:filename` | Serve uploaded image | No |

</details>

<details>
<summary><b>👤 User Endpoints</b></summary>

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/user/register` | Create new account | No |
| `POST` | `/api/user/login` | Login → JWT token | No |

</details>

<br/>

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<br/>

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ using the MERN Stack**

<sub>If you found this useful, consider giving it a ⭐</sub>

</div>
