import React, { useState, useEffect, Suspense } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import AppDownload from "./components/AppDownlad/AppDownload";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import ThemeContextProvider from "./components/context/ThemeContext";
import CartSummaryBar from "./components/CartSummaryBar/CartSummaryBar";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import { Toaster } from "react-hot-toast";
import LoadingAnimation from "./components/LoadingAnimation";
import LoadingSpinner from "./components/LoadingStates/LoadingSpinner";
import ScrollToTop from "../utility/ScrollToTop";
import "./components/FoodDetail/print.css";
import StoreContextProvider from "./components/context/StoreContext";
import ScrollToBottom from "./components/ScrollToBottomButton/ScrollToBottomButton";
import FeedbackReviews from "./components/FeedbackReviews/FeedbackReviews";
import PerformanceDashboard from "./components/PerformanceMonitor/PerformanceDashboard";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

// Lazy load heavy components for better performance
const Home = React.lazy(() => import("./pages/Home/Home"));
const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const PlaceOrder = React.lazy(() => import("./pages/PlaceOrder/PlaceOrder"));
const FoodDetail = React.lazy(() => import("./components/FoodDetail/FoodDetail"));
const Wishlist = React.lazy(() => import("./pages/wishlist/wishlist"));
const SharedWishlist = React.lazy(() => import("./pages/wishlist/SharedWishlist"));
const Restaurants = React.lazy(() => import("./pages/Restaurants/Restaurants"));
const RestaurantDetail = React.lazy(() => import("./pages/Restaurants/RestaurantDetail"));
const Chatbot = React.lazy(() => import("./components/Chatbot/Chatbot"));
const ContactPage = React.lazy(() => import("./pages/Contactpage"));
const NotFound = React.lazy(() => import("./pages/Notfound"));
const ReferralProgram = React.lazy(() => import("./components/Referrals/ReferralProgram"));
const AboutUs = React.lazy(() => import("./components/Aboutus/Aboutus"));
const FAQ = React.lazy(() => import("./components/FAQ/FAQ"));
const Privacy = React.lazy(() => import("./components/Privacy/privacy"));

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check for either authToken or user in localStorage
    return !!localStorage.getItem("authToken") || !!localStorage.getItem("user");
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <ErrorBoundary fallbackMessage="Something went wrong with the application. Please try refreshing the page.">
      <ThemeContextProvider>
        <StoreContextProvider>
          {/* ✅ Wrap the app with StoreContextProvider */}
          <Toaster position="top-right" reverseOrder={false} />
          {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

          <div className="app">
            <Navbar setShowLogin={setShowLogin} />
            <ScrollToTop />
            <ScrollToBottom />

            <Suspense fallback={<LoadingSpinner size="large" message="Loading page..." />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/order"
                  element={
                    isLoggedIn ? (
                      <PlaceOrder />
                    ) : (
                      <div style={{ padding: "2rem", textAlign: "center" }}>
                        <h2
                          style={{
                            color: "#f97316", // Tailwind's orange-500
                            fontSize: "2rem",
                          fontWeight: "bold",
                          textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Please Log In To Proceed
                      </h2>
                      <p style={{ color: "#fdba74", fontSize: "1rem" }}>
                        Your journey continues after login 🔐
                      </p>
                    </div>
                  )
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
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <ScrollToTopButton /> {/* floating button */}
          <CartSummaryBar />
          <AppDownload />
          <FeedbackReviews />
          
          {/* ✅ Footer now contains FAQ */}
          <Footer />
            {/* <FAQ /> */}
          {/* </Footer> */}

          <Suspense fallback={null}>
            <Chatbot /> {/* AI Food Assistant */}
          </Suspense>
          
          {/* Performance monitoring dashboard (dev mode) */}
          <PerformanceDashboard isDevelopment={process.env.NODE_ENV === 'development'} />
        </div>
      </StoreContextProvider>
    </ThemeContextProvider>
    </ErrorBoundary>
  );
};

export default App;
