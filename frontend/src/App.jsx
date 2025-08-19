import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
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
import FAQ from "./components/FAQ/FAQ";
import ContactPage from "./pages/Contactpage";
import { Toaster } from "react-hot-toast";
import LoadingAnimation from "./components/LoadingAnimation";
import ScrollToTop from "../utility/ScrollToTop";
import "./components/FoodDetail/print.css";
import NotFound from "./pages/Notfound";
import AboutPage from "./pages/AboutPage/AboutPage";
import StoreContextProvider from "./components/context/StoreContext";
import ScrollToBottom from "./components/ScrollToBottomButton/ScrollToBottomButton";
import ReferralProgram from "./components/Referrals/ReferralProgram";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <ThemeContextProvider>
      <StoreContextProvider> {/* ✅ Wrap the app with StoreContextProvider */}
        <Toaster position="top-right" reverseOrder={false} />
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

        <div className="app">
          <Navbar setShowLogin={setShowLogin} />
          <ScrollToTop />
          <ScrollToBottom/>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
             <Route
            path="/order"
            element={
              <ProtectedRoute setShowLogin={setShowLogin}>
                <PlaceOrder />
              </ProtectedRoute>
            }
        />
            <Route path="/food/:id" element={<FoodDetail />} />
            <Route path="/wishlist" element={<ProtectedRoute setShowLogin={setShowLogin}>
<Wishlist/></ProtectedRoute>} />
            <Route path="/wishlist/:userId" element={<ProtectedRoute setShowLogin={setShowLogin}><SharedWishlist /></ProtectedRoute>} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/aboutpage" element={<AboutPage />} />
            <Route path="/referral" element={<ReferralProgram />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ScrollToTopButton /> {/* floating button */}
          <CartSummaryBar />
          <AppDownload />
          <FAQ />
          <Footer />
          <Chatbot /> {/* AI Food Assistant */}
        </div>
      </StoreContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
