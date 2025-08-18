// frontend/src/pages/AboutUs/AboutUs.jsx
import React from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import {
  Sparkles,
  Users,
  ShieldCheck,
  Clock3,
  Smartphone,
  Utensils,
  Rocket,
} from "lucide-react";

const AboutUs = () => {
  return (
    <main className="aboutus">
      {/* HERO */}
      <section className="aboutus__hero">
        <img
          className="aboutus__logo"
          src={assets.foodie_icon}
          alt="Foodie logo"
          width="72"
          height="72"
        />
        <h1 className="aboutus__title">About Foodie</h1>
        <p className="aboutus__subtitle">
          Where taste meets technology. Foodie helps you discover great places,
          order faster, and enjoy a delightful dining experience—online or at
          the table.
        </p>

        <div className="aboutus__cta">
          <Link className="btn btn--primary" to="/restaurants">
            Explore Restaurants
          </Link>
          <a className="btn btn--ghost" href="#values">
            Why Foodie?
          </a>
        </div>
      </section>

      {/* STATS */}
      <section className="aboutus__stats">
        <div className="stat">
          <Users className="stat__icon" />
          <div className="stat__num">5K+</div>
          <div className="stat__label">Active Foodies</div>
        </div>

        <div className="stat">
          <Utensils className="stat__icon" />
          <div className="stat__num">500+</div>
          <div className="stat__label">Restaurants</div>
        </div>

        <div className="stat">
          <Clock3 className="stat__icon" />
          <div className="stat__num">30 min</div>
          <div className="stat__label">Avg Delivery</div>
        </div>

        <div className="stat">
          <ShieldCheck className="stat__icon" />
          <div className="stat__num">4.8★</div>
          <div className="stat__label">Satisfaction</div>
        </div>
      </section>

      {/* MISSION */}
      <section className="aboutus__mission card">
        <div className="card__badge">
          <Rocket size={16} />
          Mission
        </div>
        <h2>Digital Dining, Done Right</h2>
        <p>
          We’re on a mission to connect people through the universal language of
          food. From discovery to checkout, Foodie blends intuitive design with
          smart systems—making ordering effortless and enjoyable for everyone.
        </p>
        <ul className="bullets">
          <li>Faster ordering with clear, visual menus</li>
          <li>Reliable experience across mobile and web</li>
          <li>Creator-friendly tools for restaurants and home chefs</li>
        </ul>
      </section>

      {/* VALUES */}
      <section id="values" className="aboutus__values">
        <div className="value card">
          <div className="value__icon">
            <Sparkles />
          </div>
          <h3>Delight First</h3>
          <p>
            Every interaction should feel smooth and rewarding—from browsing to
            the final bite.
          </p>
        </div>

        <div className="value card">
          <div className="value__icon">
            <Smartphone />
          </div>
          <h3>Built for Speed</h3>
          <p>
            Snappy navigation, quick loads, and a checkout flow that respects
            your time.
          </p>
        </div>

        <div className="value card">
          <div className="value__icon">
            <ShieldCheck />
          </div>
          <h3>Trust & Safety</h3>
          <p>
            Transparent policies, secure transactions, and quality-driven
            listings.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="aboutus__how card">
        <h2>How Foodie Works</h2>
        <div className="steps">
          <div className="step">
            <span className="step__dot" />
            <h4>Discover</h4>
            <p>Filter by cuisine, rating, price, or distance.</p>
          </div>
          <div className="step">
            <span className="step__dot" />
            <h4>Order</h4>
            <p>Add to cart, customize, and check out in a tap.</p>
          </div>
          <div className="step">
            <span className="step__dot" />
            <h4>Enjoy</h4>
            <p>Track your order and savor the experience.</p>
          </div>
        </div>
      </section>

      {/* TEAM (short + optional) */}
      <section className="aboutus__team card">
        <h2>The Team</h2>
        <p>
          We’re a small team of engineers and food lovers crafting a platform
          where restaurants grow and diners smile. If that excites you—join us.
        </p>
        <Link to="/referral" className="btn btn--primary btn--small">
          Refer &amp; Earn
        </Link>
      </section>
    </main>
  );
};

export default AboutUs;
