import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";
import { ThemeContext } from "../context/ThemeContext";
import {
  Home,
  Menu,
  Smartphone,
  Heart,
  Phone,
  Search,
  ShoppingCart,
  User,
  Sun,
  Moon,
  X,
  AlignJustify,
  Utensils,
  HelpCircle,
} from "lucide-react";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className={`navbar ${theme === "dark" ? "navbar-dark" : ""}`}>
      <Link to="/" className="navbar-logo">
        <img src={assets.foodie_icon} alt="app icon" className="app-icon" />
      </Link>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        {mobileMenuOpen ? <X size={24} /> : <AlignJustify size={24} />}
      </div>

      {/* Desktop + Mobile Menu */}
      <ul className={`navbar-menu ${mobileMenuOpen ? "open" : ""}`}>
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
          <span>Restaurants</span>
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={`nav-item ${menu === "menu" ? "active" : ""}`}
        >
          <Menu size={18} />
          <span>Menu</span>
        </a>
        <a
          href="#appdownload"
          onClick={() => setMenu("mobile-app")}
          className={`nav-item ${menu === "mobile-app" ? "active" : ""}`}
        >
          <Smartphone size={18} />
          <span>Mobile App</span>
        </a>
        <Link to="/wishlist" className="nav-item">
          <Heart size={18} />
          <span>Wishlist</span>
        </Link>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={`nav-item ${menu === "contact-us" ? "active" : ""}`}
        >
          <Phone size={18} />
          <span>Contact</span>
        </a>
        <a
          href="#faq"
          onClick={() => setMenu("faq")}
          className={`nav-item ${menu === "faq" ? "active" : ""}`}
        >
          <HelpCircle size={18} />
          <span>FAQ</span>
        </a>
      </ul>

      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="navbar-cart">
          <Link to="/cart" className="icon-button">
            <ShoppingCart size={18} />
            <div className={getTotalCartAmount() === 0 ? "" : "cart-dot"}></div>
          </Link>
        </div>

        <button className="signin-button" onClick={() => setShowLogin(true)}>
          <User size={16} />
          <span>Sign In</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
