import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
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
} from "lucide-react";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const { getTotalCartAmount } = useContext(StoreContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const updateWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateWishlistCount();
    window.addEventListener('wishlistUpdated', updateWishlistCount);
    return () => {
      window.removeEventListener('wishlistUpdated', updateWishlistCount);
    };
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className={`navbar ${theme === "dark" ? "navbar-dark" : ""}`}>
      <Link to="/" className="navbar-logo">
        <img src={assets.appicon} alt="app icon" className="app-icon" />
        <img src={assets.logo} alt="logo" className="logo" />
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
          <div className="wishlist-icon-container">
            <Heart size={18} />
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <div className="wishlist-dot">{wishlistCount}</div>
            )}
          </div>
        </Link>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={`nav-item ${menu === "contact-us" ? "active" : ""}`}
        >
          <Phone size={18} />
          <span>Contact</span>
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
