import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { LoyaltyContext } from '../context/LoyaltyContext';
import { ThemeContext } from '../context/ThemeContext';
import { Gift, Star, X, Zap, Crown } from 'lucide-react';
import './RewardsPromoPopup.css';

const RewardsPromoPopup = () => {
  const { isAuthenticated } = useContext(StoreContext);
  const { userPoints } = useContext(LoyaltyContext);
  const { theme } = useContext(ThemeContext);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Only show popup for authenticated users
    if (!isAuthenticated) return;

    // Show popup every time user visits the website
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  // Effect to handle navbar visibility
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const mobileNav = document.querySelector('.navbar-menu-mobile');
    
    if (showPopup) {
      // Hide navbar when popup shows
      if (navbar) {
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease';
      }
      if (mobileNav) {
        mobileNav.style.transform = 'translateY(100%)';
        mobileNav.style.transition = 'transform 0.3s ease';
      }
    } else {
      // Show navbar when popup closes
      if (navbar) {
        navbar.style.transform = 'translateY(0)';
      }
      if (mobileNav) {
        mobileNav.style.transform = 'translateY(0)';
      }
    }

    // Cleanup function to restore navbar when component unmounts
    return () => {
      if (navbar) {
        navbar.style.transform = 'translateY(0)';
      }
      if (mobileNav) {
        mobileNav.style.transform = 'translateY(0)';
      }
    };
  }, [showPopup]);

  const handleClose = () => {
    setShowPopup(false);
    // No longer storing last shown date - popup will show every visit
  };

  const handleExploreRewards = () => {
    setShowPopup(false);
    // No longer storing last shown date - popup will show every visit
    navigate('/rewards');
  };

  if (!showPopup || !isAuthenticated) {
    return null;
  }

  return (
    <div className={`rewards-promo-overlay ${theme}`}>
      <div className={`rewards-promo-popup ${theme}`}>
        <button className="close-button" onClick={handleClose}>
          <X size={18} />
        </button>

        <div className="promo-header">
          <div className="promo-icon">
            <Gift size={40} />
          </div>
          <h2>🎉 Discover Your Rewards!</h2>
        </div>

        <div className="promo-content">
          <div className="points-display">
            <Zap className="points-icon" />
            <span className="points-text">You have</span>
            <span className="points-count">{userPoints || 0}</span>
            <span className="points-label">points</span>
          </div>

          <div className="rewards-preview">
            <div className="reward-item">
              <Star size={16} />
              <span>10% Off Orders</span>
              <span className="cost">100 pts</span>
            </div>
            <div className="reward-item">
              <Crown size={16} />
              <span>Free Delivery</span>
              <span className="cost">50 pts</span>
            </div>
            <div className="reward-item">
              <Gift size={16} />
              <span>Cashback Offers</span>
              <span className="cost">300 pts</span>
            </div>
          </div>

          <p className="promo-description">
            Redeem points for discounts, free delivery, and exclusive rewards!
          </p>
        </div>

        <div className="promo-actions">
          <button className="explore-btn" onClick={handleExploreRewards}>
            <Gift size={18} />
            Explore Rewards
          </button>
          <button className="maybe-later-btn" onClick={handleClose}>
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardsPromoPopup;