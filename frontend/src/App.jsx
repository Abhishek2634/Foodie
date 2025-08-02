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
import Restaurants from "./pages/Restaurants/Restaurants";
import Chatbot from "./components/Chatbot/Chatbot";
import FAQ from "./components/FAQ/FAQ";
import { Toaster } from "react-hot-toast";
import LoadingAnimation from './components/LoadingAnimation';
import ScrollToTop from "../utility/ScrollToTop";

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
  <>
    <Toaster position="top-right" reverseOrder={false} />
    {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
    
    <div className="app">
      <Navbar setShowLogin={setShowLogin} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/restaurants" element={<Restaurants />} />
      </Routes>
       
      <ScrollToTopButton />   {/* floating button */}
      <CartSummaryBar />
      <AppDownload />
      <FAQ />
      <Footer />
      <Chatbot /> {/* AI Food Assistant */}
    </div>
  </>
</ThemeContextProvider>

  );
};

export default App;
