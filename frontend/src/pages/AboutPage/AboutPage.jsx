import React from "react";
import "./AboutPage.css";
import { IoFastFoodOutline } from "react-icons/io5";
import { PiChefHatFill } from "react-icons/pi";
import { BiSolidCategory } from "react-icons/bi";
import illustration from "../../assets/frontend_assets/foodie_illustration.png";

export default function AboutPage() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>About Foodie</h1>
        <p>
          Where taste meets technology — explore, list, and manage a world of
          flavors at your fingertips.
        </p>
      </header>

      {/* Our Story */}
      <section className="section story-section">
        <div className="story-content">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              Foodie was founded with a simple mission — to bring the world’s
              culinary delights into one place. We wanted to make it easier for
              food lovers to discover new dishes, chefs to share their
              creations, and restaurants to reach passionate eaters.
            </p>
            <p>
              Today, Foodie has grown into a vibrant community where thousands
              of food items are browsed, listed, and managed daily.
            </p>
            <p>
              Our platform combines intuitive design with powerful tools to make
              food exploration both fun and efficient.
            </p>
          </div>

          {/* Image after text */}
          <div className="story-image">
            <img src={illustration} alt="Delicious food variety" />
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="section mission-section">
        <h2>Our Mission</h2>
        <p className="mission-quote">
          "To connect people through the universal language of food, empowering
          everyone to discover, share, and enjoy culinary experiences."
        </p>
        <div className="mission-cards">
          <div className="mission-card">
            <IoFastFoodOutline className="icon" />
            <h3>Food Discovery</h3>
            <p>
              Explore an ever-growing library of dishes from around the world.
            </p>
          </div>
          <div className="mission-card">
            <PiChefHatFill className="icon" />
            <h3>For Creators</h3>
            <p>
              Give chefs and home cooks a platform to showcase their recipes.
            </p>
          </div>
          <div className="mission-card">
            <BiSolidCategory className="icon" />
            <h3>Smart Management</h3>
            <p>Effortlessly list, categorize, and manage your food items.</p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section achievements-section">
        <h2>Our Impact</h2>
        <div className="achievements-grid">
          <div>
            <div className="achievement-number">10K+</div>
            <div>Food Items Listed</div>
          </div>
          <div>
            <div className="achievement-number">5K+</div>
            <div>Active Foodies</div>
          </div>
          <div>
            <div className="achievement-number">1M+</div>
            <div>Monthly Searches</div>
          </div>
          <div>
            <div className="achievement-number">95%</div>
            <div>Positive Feedback</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section cta-section">
        <h2>Join the Foodie Community</h2>
        <p>
          Discover new tastes, share your creations, and be part of a growing
          food network.
        </p>
        <button className="cta-button">Get Started</button>
      </section>
    </div>
  );
}
