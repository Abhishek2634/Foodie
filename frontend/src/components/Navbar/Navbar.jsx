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
  Users,
  Info,
  CircleDollarSign,
} from "lucide-react";

const Navbar = ({ setShowLogin, setIsLoggedIn }) => {
  const [menu, setMenu] = useState("home");
  const { cartItems, wishlistItems, toggleWishlist, getTotalCartAmount } =
    useContext(StoreContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // Listen for storage changes to update user state
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleNavMenuClick = (menuName, id) => {
    setMenu(menuName);
      if (location.pathname !== "/") {
        navigate("/", {state: {scrollTo: id } });
      } else {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
  };

  const handleLogout = async () => {
    try {
      // Call logout endpoint to clear HTTP-only cookie
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    
    // Clear local storage
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setUser(null);
    
    // Update authentication state in parent component
    if (setIsLoggedIn) {
        setIsLoggedIn(false);
    }
    
    window.location.reload();
  };
  
  // to trigger the dark theme on scroll bar
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const navMenu = (
    <>
      <Link
        to="/"
        onClick={(e) => {
          e.preventDefault();
          setMenu("home");
          if(location.pathname === "/"){
            // already on home, just scroll to top
            window.scrollTo({top: 0, behavior: "smooth"});
          }
          else{
            navigate("/");
          }
        }}
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
      <Link
        to="/"
        state={{scrollTo: "explore-menu"}}
        onClick={()=> setMenu("menu")}
        className={`nav-item ${menu === "menu" ? "active" : ""}`}
      >
        <Menu size={18} />
        <span>Menu</span>
      </Link>
      <Link
        to="/"
        state={{scrollTo: "appdownload"}}
        onClick={()=> setMenu("mobile-app")}
        className={`nav-item ${menu === "mobile-app" ? "active" : ""}`}
      >
        <Smartphone size={18} />
        <span>Mobile App</span>
      </Link>
      <Link
        to="/wishlist"
        onClick={() => setMenu("wishlist")}
        className={`nav-item ${menu === "wishlist" ? "active" : ""}`}
      >
        <Heart size={18} />
        <span>Wishlist</span>
        {Object.keys(wishlistItems).length > 0 && (
  <div className="wishlist-badge">{Object.keys(wishlistItems).length}</div>
)}

      </Link>

      
   <Link
      to="/aboutus"
      onClick={() => setMenu("aboutus")}
      className={`nav-item ${menu === "aboutus" ? "active" : ""}`}
    >
      <HelpCircle size={18} />
      <span>About Us</span>
    </Link>
      <Link
        to="/contact"
        onClick={() => setMenu("contact-us")}
        className={`nav-item ${menu === "contact-us" ? "active" : ""}`}
      >
        <Phone size={18} />
        <span>Contact</span>
      </Link>
       <Link
        to="/referral"
        onClick={() => setMenu("referral")}
        className={`nav-item ${menu === "referral" ? "active" : ""}`}
      >
        <CircleDollarSign size={20} strokeWidth={1.8} />
        
        <span>Refer & Earn</span>
      </Link>
    </>
  );

  const totalCartItems = Object.values(cartItems || {}).reduce(
    (sum, qty) => sum + qty,
    0
  );

  return (
    <>
      {/* Top Navigation Bar */}
      <div className={`navbar ${theme === "dark" ? "navbar-dark" : ""}`}>
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={assets.foodie_icon} alt="app icon" className="app-icon" />
        </Link>

        {/* Desktop menu (center, hidden on mobile) */}
        <nav className="navbar-menu navbar-menu-desktop">{navMenu}</nav>

        {/* Right action buttons */}
        <div className="navbar-right">
          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Cart */}
          <div className="navbar-cart">
            <Link to="/cart" className="icon-button" aria-label="Go to cart">
              <ShoppingCart size={18} />
              {totalCartItems > 0 && (
                <div className="cart-badge" >{totalCartItems}</div>
              )}
            </Link>
          </div>

          {/* User / Auth */}
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
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="navbar-menu-mobile">{navMenu}</nav>
    </>
  );
};

export default Navbar;
