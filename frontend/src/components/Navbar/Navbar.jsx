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
  CircleDollarSign,
} from "lucide-react";
import toast from "react-hot-toast";
import apiRequest from "../../lib/apiRequest";

const Navbar = ({ setShowLogin, user, setUser, isLoggedIn, setIsLoggedIn }) => {
  const [menu, setMenu] = useState("home");
  const { cartItems, wishlistItems } = useContext(StoreContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavMenuClick = (menuName, id) => {
    setMenu(menuName);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = async () => {
    try {
      const response = await apiRequest.post("/api/auth/logout", {}, { withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.message || "Logged out successfully");
        setIsLoggedIn(false);
        setUser(null);
        navigate("/");
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed. Try again.");
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const navMenu = (
    <>
      <Link to="/" onClick={(e) => { e.preventDefault(); handleNavMenuClick("home", null); }} className={`nav-item ${menu === "home" ? "active" : ""}`}><Home size={18} /><span>Home</span></Link>
      <Link to="/restaurants" onClick={() => setMenu("restaurants")} className={`nav-item ${menu === "restaurants" ? "active" : ""}`}><Utensils size={18} /><span>Restaurant</span></Link>
      <Link to="/" state={{ scrollTo: "explore-menu" }} onClick={() => setMenu("menu")} className={`nav-item ${menu === "menu" ? "active" : ""}`}><Menu size={18} /><span>Menu</span></Link>
      <Link to="/" state={{ scrollTo: "appdownload" }} onClick={() => setMenu("mobile-app")} className={`nav-item ${menu === "mobile-app" ? "active" : ""}`}><Smartphone size={18} /><span>Mobile App</span></Link>
      <Link to="/wishlist" onClick={() => setMenu("wishlist")} className={`nav-item ${menu === "wishlist" ? "active" : ""}`}><Heart size={18} /><span>Wishlist</span>{Object.keys(wishlistItems).length > 0 && <div className="wishlist-badge">{Object.keys(wishlistItems).length}</div>}</Link>
      <Link to="/aboutus" onClick={() => setMenu("aboutus")} className={`nav-item ${menu === "aboutus" ? "active" : ""}`}><HelpCircle size={18} /><span>About Us</span></Link>
      <Link to="/contact" onClick={() => setMenu("contact-us")} className={`nav-item ${menu === "contact-us" ? "active" : ""}`}><Phone size={18} /><span>Contact</span></Link>
      <Link to="/referral" onClick={() => setMenu("referral")} className={`nav-item ${menu === "referral" ? "active" : ""}`}><CircleDollarSign size={20} strokeWidth={1.8} /><span>Refer & Earn</span></Link>
    </>
  );

  const totalCartItems = Object.values(cartItems || {}).reduce((sum, qty) => sum + qty, 0);

  return (
    <>
      <div className={`navbar ${theme === "dark" ? "navbar-dark" : ""}`}>
        <Link to="/" className="navbar-logo"><img src={assets.foodie_icon} alt="app icon" className="app-icon" /></Link>
        <nav className="navbar-menu navbar-menu-desktop">{navMenu}</nav>
        <div className="navbar-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">{theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}</button>
          <div className="navbar-cart">
            <Link to="/cart" className="icon-button" aria-label="Go to cart">
              <ShoppingCart size={18} />
              {totalCartItems > 0 && <div className="cart-badge">{totalCartItems}</div>}
            </Link>
          </div>

          {isLoggedIn && user ? (
            <div className="user-info">
              <div className="user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
              <span>{user.name}</span>
              <button className="signin-button" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className="signin-button" onClick={() => setShowLogin(true)}><User size={16} /><span>Sign In</span></button>
          )}
        </div>
      </div>
      <nav className="navbar-menu-mobile">{navMenu}</nav>
    </>
  );
};

export default Navbar;
