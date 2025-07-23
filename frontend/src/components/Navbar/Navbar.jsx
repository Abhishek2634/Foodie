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
          onClick={() => {
            setMenu("home");
            setMobileMenuOpen(false);
            setTimeout(() => {
               window.scrollTo(0, 0);
            }, 0);
          }}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/"
          onClick={() => {
            setMenu("menu");
            setMobileMenuOpen(false);
            setTimeout(() => {
              const section = document.getElementById('explore-menu');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          }}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </Link>
        <Link
          to="/"
          onClick={() => {
            setMenu("mobile-app");
            setMobileMenuOpen(false);
            setTimeout(() => {
              const section = document.getElementById('appdownload');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          }}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-App
        </Link>
        <Link
          to="/"
          onClick={() => {
            setMenu("contact-us");
            setMobileMenuOpen(false);
            setTimeout(() => {
              const section = document.getElementById('footer');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </Link>
      </ul>

      <div className="navbar-right">
        <button onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
        <img src={assets.search_icon} alt="search" />
          <div className="navbar-search-icon">
            <Link 
              to="/cart"
              onClick={() => {
                setMenu(""); // Reset menu state so no underline shows
                setMobileMenuOpen(false);
              }}
            >
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
