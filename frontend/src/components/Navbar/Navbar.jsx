import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { ThemeContext } from "../context/ThemeContext";

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
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        {mobileMenuOpen ? "✖" : "☰"}
      </div>

      {/* Desktop + Mobile Menu */}
      <ul className={`navbar-menu ${mobileMenuOpen ? "open" : ""}`}>
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#appdownload"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        <button onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
        <img src={assets.search_icon} alt="search" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
