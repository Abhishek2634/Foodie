<h1 align="center">✨ Contributors Guide ✨</h1>
<h3 align="center">Welcome to Foodie! 🤖<br>We appreciate your interest in contributing to and improving our food order and delivery platform. <br>This guide will help you get started with the project and make your first contribution.</h3>

![Line](https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif)

## What you can Contribute?

**🐞 Bug Fixing:**
Contributors can help by reviewing and confirming reported issues. This includes verifying bugs, providing additional details, and prioritizing tasks for the development team. Common areas include:
- Voice processing bugs
- Natural language understanding errors
- UI/UX problems in the Electron app

**✨ Enhancements:**
Contributors can enhance the project by implementing new features or improvements. This involves understanding requirements, designing solutions, and extending the functionality of AgentOS:
- Improving existing agent capabilities
- Enhancing the natural language processing
- Adding new voice commands
- Improving the Electron UI
- Performance optimizations

**📚 Documentation:**
Help improve our documentation:
- API documentation
- Setup and configuration tutorials
- Code comments and inline documentation
- README improvements

**🧪 Testing:**
Write tests to ensure code quality and reliability:
- Unit tests for individual agents
- Integration tests for agent communication
- End-to-end tests for the complete system
- Voice processing tests

![Line](https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif)

## Development Environment Setup

### Prerequisites

Ensure you have the following installed:

**For Docker Setup (Recommended):**

* Docker Desktop
* Docker Compose

**For Manual Setup:**

* Node.js (v16 or above)
* npm or yarn
* MongoDB (local or cloud)

### Environment Variables

The application uses the following environment variables:

**Backend:**

* `MONGODB_URI`: MongoDB connection string
* `JWT_SECRET`: Secret key for JWT tokens
* `PORT`: Server port (default: 4000)

**Frontend:**

* `REACT_APP_API_URL`: Backend API URL

**Admin:**

* `VITE_API_URL`: Backend API URL for Vite

### Database Configuration

* **Docker**: MongoDB runs automatically with authentication

  * Username: `admin`
  * Password: `password123`
  * Database: `foodie`
* **Manual**: Update `connectDB()` in `backend/config/db.js`

### File Uploads

* Backend handles file uploads via Multer
* Files are stored in `backend/uploads/` directory
* Docker setup includes volume mounting for persistence

![Line](https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif)

### 📦 Installation

#### 🐳 Docker Setup (Recommended)

**One-command setup for the entire application:**

```bash
# Clone the repository
git clone https://github.com/your-username/foodie.git
cd foodie
npm install

# Start all services with Docker
docker-compose up --build
```

**Access the application:**

* 🌐 **Frontend**: [http://localhost:3000](http://localhost:3000)
* 🛠️ **Admin Panel**: [http://localhost:5173](http://localhost:5173)
* 🔌 **Backend API**: [http://localhost:4000](http://localhost:4000)
* 🗄️ **MongoDB**: localhost:27017

**Docker Services:**

* **foodie-frontend**: React app (Port 3000)
* **foodie-admin**: Admin panel (Port 5173)
* **foodie-backend**: Express API (Port 4000)
* **foodie-mongodb**: MongoDB database (Port 27017)


#### 📦 Manual Installation

```bash
# Clone the repository
git clone https://github.com/your-username/foodie.git
cd foodie

# Install dependencies for all services
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
cd admin && npm install && cd ..
```

![Line](https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif)

## How to Contribute?

### Step 1: Preparation
- ⭐ Drop a Star in this repo
- 🍴 Fork the repository
- 📋 Take a look at the existing [Issues](https://github.com/theagentic/agentOS/issues)
- 💡 For new features, first raise an issue to discuss the idea

### Step 2: Development Process
1. **Create an Issue First**
   - Describe the bug, feature, or improvement you want to work on
   - Wait for issue assignment before starting work
   - **REMINDER: Don't raise more than 2 `Issues` at a time**

2. **Work on Assigned Issues Only**
   - **IMPORTANT: Don't make any `Pull Request` until you get assigned to an `Issue`**
   - Create a branch for your work: `git checkout -b feature/your-feature-name`

3. **Development Guidelines**
   - Follow the existing code style and structure
   - Add proper documentation and comments
   - Test your changes thoroughly
   - Follow the agent template for new agents

4. **Commit and Push**
   - Make meaningful commit messages
   - Push your branch to your forked repository

### Step 3: Pull Request
- Create a **Pull Request** from your branch
- Add detailed description of your changes
- Include screenshots or demos for UI changes
- Add testing instructions
- Reference the issue number in your PR description

### Step 4: Review Process
- Your PR will be reviewed by maintainers
- Address any feedback or requested changes
- Once approved, your contribution will be merged!

![Line](https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif)

### 🔧 Development Setup

#### Docker Development

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

#### Manual Development

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
![Line](https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif)

## 🧪 Linting

ESLint is pre-configured with React and Hooks rules for frontend and admin.

```bash
# Frontend linting
cd frontend && npm run lint

# Admin linting
cd admin && npm run lint
```
![Line](https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif)

## Project Structure Overview

```
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

![Line](https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif)

<h2 align="center">Need more help? 🤔</h1>
<p align="center">
  You can refer to the following articles on basics of Git and Github and also contact the Project Maintainers, in case you are stuck: <br>
  <a href="https://help.github.com/en/desktop/contributing-to-projects/creating-an-issue-or-pull-request">How to create an Issue</a> <br>
  <a href="https://help.github.com/en/github/getting-started-with-github/fork-a-repo">Forking a Repo</a> <br>
  <a href="https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository">Cloning a Repo</a> <br>
  <a href="https://opensource.com/article/19/7/create-pull-request-github">How to create a Pull Request</a> <br>
  <a href="https://docs.github.com/get-started">Getting started with Git and GitHub</a> <br>
</p>

## Community Guidelines

- 🤝 Be respectful and inclusive to all contributors
- 💬 Use clear and constructive communication
- 🚫 No spam or low-quality contributions
- 📝 Follow the issue and PR templates
- ⏱️ Be patient with the review process
- 🎯 Focus on quality over quantity

<h2 align="center">Special Thanks 🙏</h1>
<p align="center">We appreciate every contribution, no matter how small. Whether it's fixing a typo, reporting a bug, or adding a new feature, every contribution helps make Foodie better!</p>

<h2 align="center">Tip from us 😇</h1>
<p align="center">It always takes time to understand and learn. So, don't worry at all. We know <b>you have got this</b>! 💪</p>
<h3 align="center">Show some &nbsp;❤️&nbsp; by &nbsp;🌟&nbsp; this repository!</h3>
