import React, { useState, useEffect } from "react"; 
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import AppDownload from "./components/AppDownlad/AppDownload";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import ThemeContextProvider from "./components/context/ThemeContext";
import FoodDetail from "./components/FoodDetail/FoodDetail";
import CartSummaryBar from "./components/CartSummaryBar/CartSummaryBar";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import Wishlist from "./pages/wishlist/wishlist";
import SharedWishlist from "./pages/wishlist/SharedWishlist";
import Restaurants from "./pages/Restaurants/Restaurants";
import RestaurantDetail from "./pages/Restaurants/RestaurantDetail";
import Chatbot from "./components/Chatbot/Chatbot";
import ContactPage from "./pages/Contactpage";
import { Toaster } from "react-hot-toast";
import LoadingAnimation from "./components/LoadingAnimation";
import ScrollToTop from "../utility/ScrollToTop";
import ScrollToBottom from "./components/ScrollToBottomButton/ScrollToBottomButton";
import ReferralProgram from "./components/Referrals/ReferralProgram";
import AboutUs from "./components/Aboutus/Aboutus";
import FAQ from "./components/FAQ/FAQ";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyOrder from "./pages/MyOrder/MyOrder";
import Privacy from "./components/Privacy/privacy";
import StoreContextProvider from "./components/context/StoreContext";
import apiRequest from "./lib/apiRequest";
import SuccessPopup from "./components/LoginPopup/SuccessPopup"; 
import "./components/FoodDetail/print.css";
import NotFound from "./pages/Notfound";
import TermsOfService from "./components/TermsOfService/TermsOfService";
import Delivery from "./pages/Delivery/Delivery";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Check authentication from backend
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiRequest.get("/api/auth/me", {
          withCredentials: true,
        });
        if (response.data.success) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (err) {
        console.log("Auth check failed:", err);
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();

    // Listen to localStorage changes (optional, if frontend still uses it)
    const handleStorageChange = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
      // Optionally set user info from localStorage
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (loading) return <LoadingAnimation />;

  return (
    <ThemeContextProvider>
      <StoreContextProvider>
        <Toaster position="top-right" reverseOrder={false} />

        {successMessage && (
          <SuccessPopup
            message={successMessage}
            onClose={() => setSuccessMessage("")}
          />
        )}

        {showLogin && (
          <LoginPopup
            setShowLogin={setShowLogin}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
            setSuccessMessage={setSuccessMessage}
          />
        )}

        <div className="app">
          <Navbar setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} user={user} />
          <ScrollToTop />
          <ScrollToBottom />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/order"
              element={
                isLoggedIn ? <PlaceOrder /> : <LoginRequired />
              }
            />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/food/:id" element={<FoodDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/wishlist/:userId" element={<SharedWishlist />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/referral" element={<ReferralProgram />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/profile/me" element={isLoggedIn ? <MyProfile /> : <LoginRequired />} />
            <Route path="/orders/me" element={isLoggedIn ? <MyOrder /> : <LoginRequired />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ScrollToTopButton />
          <CartSummaryBar />
          <AppDownload />
          <Footer />
          <Chatbot />
        </div>
      </StoreContextProvider>
    </ThemeContextProvider>
  );
};

// Reusable login-required component
const LoginRequired = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h2
      style={{
        color: "#f97316",
        fontSize: "2rem",
        fontWeight: "bold",
        textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
        marginBottom: "0.5rem",
      }}
    >
      Please Log In To Proceed
    </h2>
    <p style={{ color: "#fdba74", fontSize: "1rem" }}>Your journey continues after login 🔐</p>
  </div>
);

export default App;
