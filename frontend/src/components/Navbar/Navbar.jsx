import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sun,
  Moon,
  Home,
  UtensilsCrossed,
  Smartphone,
  Phone,
  ShoppingCart,
  Search,
} from "lucide-react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../context/StoreContext";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <>
      <div className={`navbar ${theme === "dark" ? "navbar-dark" : ""}`}>
        <Link to="/">
          <img src={assets.logo} alt="logo" className="logo" />
        </Link>

        <div className="hamburger" onClick={toggleMenu}>
          {mobileMenuOpen ? "✖" : "☰"}
        </div>

        <ul className={`navbar-menu ${mobileMenuOpen ? "open" : ""}`}>
          <li>
            <Link
              to="/"
              onClick={() => setMenu("home")}
              className={menu === "home" ? "active" : ""}
            >
              <Home size={18} /> Home
            </Link>
          </li>
          <li>
            <a
              href="#explore-menu"
              onClick={() => setMenu("menu")}
              className={menu === "menu" ? "active" : ""}
            >
              <UtensilsCrossed size={18} /> Menu
            </a>
          </li>
          <li>
            <a
              href="#appdownload"
              onClick={() => setMenu("mobile-app")}
              className={menu === "mobile-app" ? "active" : ""}
            >
              <Smartphone size={18} /> Mobile-App
            </a>
          </li>
          <li>
            <a
              href="#footer"
              onClick={() => setMenu("contact-us")}
              className={menu === "contact-us" ? "active" : ""}
            >
              <Phone size={18} /> Contact Us
            </a>
          </li>
        </ul>

        <div className="navbar-right">
          <button onClick={toggleTheme} className="icon-button">
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>

          <button className="icon-button">
            <Search />
          </button>

          
            

          <button className="sign-in-btn" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        </div>
      </div>

      {/* Floating Cart Button */}
      <Link to="/cart" className="floating-cart-btn">
        <ShoppingCart />
        {getTotalCartAmount() > 0 && <div className="dot" />}
      </Link>
    </>
  );
};

export default Navbar;
