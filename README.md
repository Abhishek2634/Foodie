# 🍽️ Foodie – Full-Stack Restaurant App

A full-stack web application for browsing, listing, and managing a variety of food items. Built using React (Frontend), Express.js (Backend), and MongoDB.

![Foodie Homepage](images/foodie-home-light.png)
<sup>Homepage – Light Mode</sup>

---

## 📑 Table of Contents

- [🔧 Tech Stack](#-tech-stack)
  - [🖥️ Frontend](#️-frontend)
  - [🌐 Backend](#-backend)
  - [🗄️ Database](#️-database)
- [✨ Key Features](#-key-features)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [🐳 Docker Setup (Recommended)](#-docker-setup-recommended)
  - [📦 Manual Installation](#-manual-installation)
  - [🔧 Development Setup](#-development-setup)
  - [⚙️ Environment Variables](#-environment-variables)
- [📁 Project Structure](#-project-structure)
- [🐳 Docker Commands](#-docker-commands)
- [🧪 Linting](#-linting)
- [🧰 Scripts](#-scripts)
- [📝 Notes](#-notes)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙌 Acknowledgements](#-acknowledgements)

---

## 🔧 Tech Stack

### 🖥️ Frontend

- **React 18.3** - User interface
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **GSAP** - Animations
- **ESLint** - Linting and code style enforcement

### 🌐 Backend

- **Node.js + Express** - REST API server
- **MongoDB** with **Mongoose**
- **CORS + JSON Middleware**
- **dotenv** (environment management)
- **Razorpay** (payment gateway)
- **Multer** - File upload handling
- **Modular API Routing**

### 🗄️ Database

- **MongoDB** (NoSQL data storage)

### 🐳 DevOps

- **Docker** (Containerization)
- **Docker Compose** (Multi-service orchestration)

---

## ✨ Key Features

- 🥗 **Explore a variety of dishes**
- 🛒 **Add to cart, checkout, and order**
- 🖤 **Wishlist and user auth**
- 🌗 **Light/Dark mode toggle**
- 💳 **Online payment with Razorpay**
- 📱 **Mobile-friendly responsive UI**

---

## 🚀 Getting Started

### Prerequisites

**For Docker Setup (Recommended):**

- Docker Desktop
- Docker Compose

**For Manual Setup:**

- Node.js (v16 or above)
- npm or yarn
- MongoDB (local or cloud)

---

### 🐳 Docker Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/your-username/foodie.git
cd foodie

# Start all services with Docker
docker-compose up --build
