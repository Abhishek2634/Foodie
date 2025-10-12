# Contributing to Foodie🍽️

We welcome contributions to the Foodie project! If you find this project helpful, consider starring the repo or opening an issue.

- Help improve documentation
- For more info go to README.md

## Development Workflow

1. Fork the repository
2. Create a feature branch
3. Use Docker for consistent development environment
4. Test your changes with `docker-compose up --build`
5. Submit a pull request

---

## Table of Contents

1. [Tech Stacks Used](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Database](#database)
    - [DevOps](#devops)
2. [Prerequisites](#prerequisites)
3. [Here's how to get started](#how-to-get-started)
    - [Installation](#installation)
    - [Docker Set-up](#docker-setup-recommended)
        - [Access the application](#access-the-application)
        - [Docker Services](#docker-services)
    - [Manual Installation](#manual-installation)
4. [Development Setup](#development-setup)
    - [Docker Development](#docker-development)
    - [Manual Development](#manual-development)
5. [Environmental Variables](#environment-variables)
    - [Database Configuration](#database-configuration)
    - [File Uploads](#file-uploads)
6. [Project Structure](#project-structure)
7. [Scripts](#scripts)
8. [Note](#notes)

---

## Tech Stack

### Frontend

- **React 18.3** – User interface
- **Vite** – Fast build tool and dev server
- **React Router DOM** – Client-side routing
- **ESLint** – Linting and code style enforcement

### Backend

- **Node.js + Express** – REST API server
- **CORS + JSON Middleware** – Cross-origin requests
- **Multer** – File upload handling
- **Modular API Routing** – Organized route structure

### Database

- **MongoDB** – NoSQL database for data storage

### DevOps

- **Docker** – Containerization for all services
- **Docker Compose** – Multi-service orchestration

---

## Prerequisites

Ensure you have the following installed:

**For Docker Setup (Recommended):**

- Docker Desktop
- Docker Compose

**For Manual Setup:**

- Node.js (v16 or above)
- npm or yarn
- MongoDB (local or cloud)

---

## How to Get Started

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/foodie.git
cd foodie
npm install
```

---

### Docker Setup (Recommended)

One-command setup for the entire application:

```bash
# Start all services with Docker
docker-compose up --build
```

---

#### Access the application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:4000](http://localhost:4000)
- **MongoDB**: localhost:27017

#### Docker Services

- **foodie-frontend**: React app (Port 3000)
- **foodie-admin**: Admin panel (Port 5173)
- **foodie-backend**: Express API (Port 4000)
- **foodie-mongodb**: MongoDB database (Port 27017)

---

### Manual Installation

```bash
# Clone the repository
git clone https://github.com/your-username/foodie.git
cd foodie

# Install dependencies for all services
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
cd admin && npm install && cd ..
```

---

## Development Setup

### Docker Development

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs for specific service
docker-compose logs frontend
docker-compose logs backend
docker-compose logs admin
```

### Manual Development

**Start Frontend:**

```bash
cd frontend
npm run dev
```

**Start Admin Panel:**

```bash
cd admin
npm run dev
```

**Start Backend:**

```bash
cd backend
npm run server
```

Server runs on `http://localhost:4000`

**Start MongoDB:**

```bash
# Make sure MongoDB is running locally
mongod
```

---

## Environment Variables

The application uses the following environment variables:

**Backend:**

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 4000)

**Frontend:**

- `REACT_APP_API_URL`: Backend API URL

**Admin:**

- `VITE_API_URL`: Backend API URL for Vite

### Database Configuration

- **Docker**: MongoDB runs automatically with authentication

  - Username: `admin`
  - Password: `password123`
  - Database: `foodie`
- **Manual**: Update `connectDB()` in `backend/config/db.js`

### File Uploads

- Backend handles file uploads via Multer
- Files are stored in `backend/uploads/` directory
- Docker setup includes volume mounting for persistence

---

## Project Structure

```txt
Foodie/
├── frontend/                 # React frontend application
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
├── backend/                  # Express.js backend API
│   ├── routes/
│   ├── config/
│   ├── uploads/
│   ├── server.js
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
├── admin/                    # React admin panel
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
├── docker-compose.yml        # Multi-service orchestration
├── .dockerignore             # Root Docker ignore file
├── README.md
└── CONTRIBUTING.md
```

---

## Scripts

### Frontend & Admin Scripts

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start Vite development server |
| `npm run build`   | Build for production          |
| `npm run preview` | Preview production build      |
| `npm run lint`    | Run ESLint checks             |

### Backend Scripts

| Command          | Description                           |
| ---------------- | ------------------------------------- |
| `npm start`      | Start production server               |
| `npm run server` | Start development server with nodemon |

---

## Notes

- Make sure MongoDB is running locally or update `connectDB()` in `config/db.js` accordingly.
- You can update the backend routes via `routes/foodRoute.js`.

---

Built with &hearts;
