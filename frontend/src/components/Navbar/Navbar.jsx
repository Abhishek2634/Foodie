import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { ThemeContext } from "../context/ThemeContext";
import { assets } from "../../assets/frontend_assets/assets";
import {
  Home,
  Menu,
  Smartphone,
  Heart,
  Phone,
  ShoppingCart,
  User,
  Sun,
  Moon,
  HelpCircle,
  Utensils,
  Menu as MenuIcon,
  X,
} from "lucide-react";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showHamburger, setShowHamburger] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleNavMenuClick = (event, menuName, id) => {
    event.preventDefault();
    setMenu(menuName);
    setShowHamburger(false);
    if (id) {
      if (location.pathname !== "/") {
        localStorage.setItem("scrollToMenu", "true");
        navigate("/");
      } else {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  const navMenu = (
    <>
      <Link
        to="/"
        onClick={() => setMenu("home")}
        className={`nav-item ${menu === "home" ? "active" : ""}`}
      >
        <Home size={18} />
        <span>Home</span>
      </Link>
      <Link
        to="/restaurants"
        onClick={() => setMenu("restaurants")}
        className={`nav-item ${menu === "restaurants" ? "active" : ""}`}
      >
        <Utensils size={18} />
        <span>Restaurant</span>
      </Link>
      <a
        href="#explore-menu"
        className={`nav-item ${menu === "menu" ? "active" : ""}`}
        onClick={(e) => handleNavMenuClick(e, "menu", "explore-menu")}
      >
        <Menu size={18} />
        <span>Menu</span>
      </a>
      <a
        href="#appdownload"
        className={`nav-item ${menu === "mobile-app" ? "active" : ""}`}
        onClick={(e) => handleNavMenuClick(e, "mobile-app", "appdownload")}
      >
        <Smartphone size={18} />
        <span>Mobile App</span>
      </a>
      <Link
        to="/wishlist"
        onClick={() => setMenu("wishlist")}
        className={`nav-item ${menu === "wishlist" ? "active" : ""}`}
      >
        <Heart size={18} />
        <span>Wishlist</span>
      </Link>
      <Link
        to="/contact"
        onClick={() => setMenu("contact-us")}
        className={`nav-item ${menu === "contact-us" ? "active" : ""}`}
      >
        <Phone size={18} />
        <span>Contact</span>
      </Link>
      <a
        href="#faq"
        className={`nav-item ${menu === "faq" ? "active" : ""}`}
        onClick={(e) => handleNavMenuClick(e, "faq", "faq")}
      >
        <HelpCircle size={18} />
        <span>FAQ</span>
      </a>
    </>
  );

  const totalCartItems = Object.values(useContext(StoreContext).cartItems || {}).reduce(
    (sum, qty) => sum + qty,
    0
  );

  return (
    <>
      <div className={`navbar ${theme === "dark" ? "navbar-dark" : ""}`}>
        <Link to="/" className="navbar-logo">
          <img src={assets.foodie_icon} alt="app icon" className="app-icon" />
        </Link>

        {/* Desktop menu */}
        <nav className="navbar-menu navbar-menu-desktop">{navMenu}</nav>

        {/* Right section */}
        <div className="navbar-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="navbar-cart">
            <Link to="/cart" className="icon-button" aria-label="Go to cart">
              <ShoppingCart size={18} />
              {totalCartItems > 0 && (
                <div className="cart-badge">{totalCartItems}</div>
              )}
            </Link>
          </div>

          {user ? (
            <div className="user-info">
              <div className="user-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span>{user.name}</span>
              <button className="signin-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="signin-button" onClick={() => setShowLogin(true)}>
              <User size={16} />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile hamburger toggle */}
          <button
            className="hamburger-toggle"
            onClick={() => setShowHamburger(!showHamburger)}
            aria-label="Toggle menu"
          >
            {showHamburger ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Hamburger dropdown */}
      {showHamburger && (
        <div className="hamburger-dropdown">
          <Link
            to="/wishlist"
            className="nav-item"
            onClick={() => setMenu("wishlist")}
          >
            <Heart size={18} />
            <span>Wishlist</span>
          </Link>
          <a
            href="#appdownload"
            className="nav-item"
            onClick={(e) => handleNavMenuClick(e, "mobile-app", "appdownload")}
          >
            <Smartphone size={18} />
            <span>Mobile App</span>
          </a>
          <a
            href="#footer"
            className="nav-item"
            onClick={(e) => handleNavMenuClick(e, "contact-us", "footer")}
          >
            <Phone size={18} />
            <span>Contact</span>
          </a>
          <a
            href="#faq"
            className="nav-item"
            onClick={(e) => handleNavMenuClick(e, "faq", "faq")}
          >
            <HelpCircle size={18} />
            <span>FAQ</span>
          </a>
        </div>
      )}

      {/* Mobile bottom navbar */}
      <nav className="navbar-menu-mobile">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={`nav-item ${menu === "home" ? "active" : ""}`}
        >
          <Home size={18} />
          <span>Home</span>
        </Link>
        <Link
          to="/restaurants"
          onClick={() => setMenu("restaurants")}
          className={`nav-item ${menu === "restaurants" ? "active" : ""}`}
        >
          <Utensils size={18} />
          <span>Restaurant</span>
        </Link>
        <a
          href="#explore-menu"
          className={`nav-item ${menu === "menu" ? "active" : ""}`}
          onClick={(e) => handleNavMenuClick(e, "menu", "explore-menu")}
        >
          <Menu size={18} />
          <span>Menu</span>
        </a>
      </nav>
    </>
  );
};

export default Navbar;
