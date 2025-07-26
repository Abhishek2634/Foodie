import React from "react";
import "./LoadingAnimation.css";
import burger from "../assets/frontend_assets/food_1.png";
import pizza from "../assets/frontend_assets/food_2.png";
import biryani from "../assets/frontend_assets/food_3.png";
import drink from "../assets/frontend_assets/food_4.png";

const LoadingAnimation = () => {
  return (
    <div className="loading-animation-container">
      {/* City Skyline */}
      <svg className="city-skyline" viewBox="0 0 220 40">
        <rect x="0" y="30" width="30" height="10" fill="#ffe0b2" opacity="0.5" />
        <rect x="35" y="20" width="20" height="20" fill="#ffd54f" opacity="0.5" />
        <rect x="60" y="25" width="15" height="15" fill="#ffb300" opacity="0.4" />
        <rect x="80" y="18" width="25" height="22" fill="#ff9800" opacity="0.3" />
        <rect x="110" y="28" width="18" height="12" fill="#ffe0b2" opacity="0.5" />
        <rect x="135" y="22" width="22" height="18" fill="#ffd54f" opacity="0.4" />
        <rect x="160" y="26" width="15" height="14" fill="#ffb300" opacity="0.3" />
        <rect x="180" y="20" width="30" height="20" fill="#ff9800" opacity="0.2" />
      </svg>
      <div className="loading-progress-bg">
        <svg className="progress-circle" viewBox="0 0 100 100">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            className="progress-bg"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#ffe0b2"
            strokeWidth="10"
          />
          <circle
            className="progress-bar"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#ff9800"
            strokeWidth="8"
            strokeDasharray="282.6"
            strokeDashoffset="0"
            filter="url(#glow)"
          />
        </svg>
      </div>
      <div className="city-map">
        {/* Animated Path/Road */}
        <svg className="city-path" viewBox="0 0 220 40">
          <path d="M10 35 Q60 10 120 30 T210 35" fill="none" stroke="#ffb300" strokeWidth="4" strokeDasharray="10 8" />
        </svg>
        <div className="scooter-wrapper">
          {/* Scooter Shadow */}
          <div className="scooter-shadow"></div>
          <svg className="scooter" viewBox="0 0 80 40">
            <ellipse cx="20" cy="35" rx="7" ry="7" fill="#ff7043" />
            <ellipse cx="60" cy="35" rx="7" ry="7" fill="#ff7043" />
            <rect x="15" y="20" width="40" height="10" rx="5" fill="#ffd54f" />
            <rect x="45" y="10" width="15" height="10" rx="5" fill="#ff7043" />
            <circle cx="55" cy="15" r="4" fill="#fff" />
            <rect x="50" y="5" width="8" height="8" rx="4" fill="#ffb300" />
            <circle cx="54" cy="9" r="2" fill="#fff" />
          </svg>
          <div className="delivery-person">
            <svg viewBox="0 0 20 20" className="person-svg">
              <circle cx="10" cy="6" r="4" fill="#ffb300" />
              <rect x="7" y="10" width="6" height="7" rx="3" fill="#e65100" />
            </svg>
          </div>
        </div>
        <img src={burger} alt="burger" className="food-icon food-burger" />
        <img src={pizza} alt="pizza" className="food-icon food-pizza" />
        <img src={biryani} alt="biryani" className="food-icon food-biryani" />
        <img src={drink} alt="drink" className="food-icon food-drink" />
      </div>
      <div className="loading-message">Bringing deliciousness to you…</div>
    </div>
  );
};

export default LoadingAnimation; 