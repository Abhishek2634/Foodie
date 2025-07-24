
# 🍽️ Foodie - All Types of Food Available

A full-stack web application for browsing, listing, and managing a variety of food items. Built using React (Frontend) and Express.js (Backend) with seamless API integration and modern development tooling via Vite.

---

## 🔧 Tech Stack

### 🖥️ Frontend
- **React 18.3**
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **ESLint** - Linting and code style enforcement

### 🌐 Backend
- **Node.js + Express**
- **CORS + JSON Middleware**
- **Modular API Routing**

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or above)
- npm or yarn

---

### 📦 Installation

```bash
git clone https://github.com/your-username/foodie.git
cd foodie
npm install
```

---

### 🔧 Development Setup

#### Start Frontend

```bash
npm run dev
```

#### Start Backend

```bash
node server.js
```

Server runs on `http://localhost:4000`

---

## 📁 Project Structure

```
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── main.jsx
├── server.js
├── routes/
│   └── foodRoute.js
├── config/
│   └── db.js
├── vite.config.js
├── eslint.config.js
├── package.json
└── README.md
```

---

## 🧪 Linting

ESLint is pre-configured with React and Hooks rules.

```bash
npm run lint
```

---

## 🧰 Scripts

| Command        | Description                  |
|----------------|------------------------------|
| `npm run dev`  | Start Vite development server |
| `npm run build`| Build frontend for production |
| `npm run preview` | Preview production build    |
| `npm run lint` | Run ESLint checks             |

---

## 📝 Notes

- Make sure MongoDB is running locally or update `connectDB()` in `config/db.js` accordingly.
- You can update the backend routes via `routes/foodRoute.js`.

---

## 🤝 Contributing

We welcome contributions to the Foodie project! If you find this project helpful, please consider:

- ⭐ **Star this repository** to show your support and help others discover it
- 🐛 Report bugs or suggest features through issues
- 🔧 Submit pull requests for improvements
- 📖 Help improve documentation
- 🚀 For more info go to [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
