import React, { useEffect, useState, useContext } from "react";
import "./AboutUs.css";
import { ThemeContext } from "../context/ThemeContext";

const AboutUs = () => {
  const slogan = "Delicious Food Delivered Fresh To Your Door!";
  const [text, setText] = useState("");
  const { theme } = useContext(ThemeContext); // ✅ use theme from context

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(slogan.slice(0, index + 1));
      index++;
      if (index === slogan.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`about-container ${theme === "dark" ? "dark" : "light"}`}>
      {/* Hero Section */}
        <div className="hero-box">
          <div className="hero-section">
            <h1 className="about-title">{text}</h1>
            <p className="subtitle">
              Experience the finest cuisine with our premium food delivery service
              </p>
          </div>
        </div>

      {/* Marquee */}
      <div className="marquee">
        <p className="marquee-text">
        &nbsp; 🚚 Fast Delivery Guaranteed! &nbsp; | 
        &nbsp; 💯 100% Satisfaction Promise! &nbsp; | 
        &nbsp; 🍴 Fresh & Hygienic Ingredients! &nbsp; | 
        &nbsp; 👨‍🍳 Authentic Recipes & Expert Chefs! &nbsp; | 
        &nbsp; 🛡️ Safe & Secure Packaging! &nbsp; | 
        &nbsp; ⭐ Rated #1 by Our Happy Customers!
        </p>
      </div>

      {/* About Us */}
      <section className="section">
        
        <div>
          <div className="decorative-box" id="decorative-box-top"></div>
          <h2 className="section-title" >About Foodies</h2></div>
          <p className="about-text" id="about-description">
          At Foodies, we take immense pride in offering a diverse and delectable range of culinary delights that cater to every palate. Whether you&apos;re <strong>craving wholesome vegetarian dishes, succulent non-vegetarian specialties, rich and flavorful Italian cuisine, aromatic Chinese fare, indulgent desserts, or hearty main courses</strong>, our menu is thoughtfully curated to satisfy your every craving.
          <br/>
          <br/>
          Our unwavering commitment to excellence is reflected in our focus on <strong>taste, quality, and hygiene</strong>. Each dish is prepared using the <strong>finest ingredients</strong>, ensuring that every bite is <strong>not only delicious but also safe and nourishing</strong>. We adhere to the highest standards of cleanliness and food safety, because <strong>your well-being is our top priority</strong>.
          <br/>
          <br/>
          Driven by a <strong>passion for exceptional food and memorable experiences</strong>, we strive to bring gourmet dining right to your doorstep. With our user-friendly app and website, ordering your favorite meals has never been easier. Every order is crafted with love, packed with care, and delivered promptly—so you can enjoy <strong>restaurant-quality food in the comfort of your home</strong>.
        </p>
        <span className="decorative-box" id="decorative-box-bottom"></span>
      </section>

      {/* Categories */}
      <section className="section">
        <h2 className="section-title">Explore Our Categories</h2>
        <div className="categories-list">
          <div className="category-card veg">🥗 Vegetarian</div>
          <div className="category-card nonveg">🍖 Non-Vegetarian</div>
          <div className="category-card italian">🍝 Italian Cuisine</div>
          <div className="category-card chinese">🥟 Chinese Delights</div>
          <div className="category-card dessert">🍰 Sweet Desserts</div>
          <div className="category-card main">🍽️ Main Courses</div>
        </div>
      </section>

      {/* Flow */}
      <section className="section flow-section">
        <h2 className="section-title">How Ordering Works</h2>
        <div className="flow-diagram">
          <div className="flow-step">📱 Browse Menu</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">🛒 Add to Cart</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">✅ Checkout</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">💳 Payment</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">🚚 Delivery</div>
        </div>
      </section>

      {/* Payment */}
      <section className="section payment-section">
        <h2 className="section-title">Payment Methods</h2>
        <p className="payment-text">
          💳 <strong>Credit & Debit Cards</strong> &nbsp; | &nbsp; 
          📱 <strong>Digital Wallets</strong> &nbsp; | &nbsp; 
          💵 <strong>Cash on Delivery</strong>
        </p>
      </section>
    </div>
  );
};

export default AboutUs;