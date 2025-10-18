import React, { useState, useEffect } from 'react';
import './CouponGenerator.css';
import { FaGift, FaCopy, FaCheck } from 'react-icons/fa';

const CouponGenerator = () => {
  const [coupon, setCoupon] = useState('');
  const [showCoupon, setShowCoupon] = useState(false);
  const [copied, setCopied] = useState(false);
  const [alreadyGenerated, setAlreadyGenerated] = useState(false);

  // Predefined list of coupons with their discount percentages
  const coupons = [
    { code: 'FOOD10', discount: 10 },
    { code: 'SAVE15', discount: 15 },
    { code: 'YUMMY20', discount: 20 },
    { code: 'TASTY25', discount: 25 },
    { code: 'DELISH30', discount: 30 }
  ];

  // Check if user already generated a coupon in this session
  useEffect(() => {
    const generatedCoupon = localStorage.getItem('foodieCoupon');
    if (generatedCoupon) {
      const couponObj = JSON.parse(generatedCoupon);
      setCoupon(couponObj);
      setAlreadyGenerated(true);
    }
  }, []);

  // Generate a random coupon
  const generateCoupon = () => {
    // If user already generated a coupon, show it again
    if (alreadyGenerated) {
      setShowCoupon(true);
      return;
    }

    // Generate a random coupon
    const randomIndex = Math.floor(Math.random() * coupons.length);
    const selectedCoupon = coupons[randomIndex];
    
    // Save to localStorage
    localStorage.setItem('foodieCoupon', JSON.stringify(selectedCoupon));
    
    // Update state
    setCoupon(selectedCoupon);
    setShowCoupon(true);
    setAlreadyGenerated(true);
  };

  // Copy coupon to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(coupon.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Close the coupon popup
  const closeCoupon = () => {
    setShowCoupon(false);
  };

  return (
    <div className="coupon-generator">
      <button 
        className="coupon-button" 
        onClick={generateCoupon}
      >
        <FaGift className="gift-icon" />
        <span>Get Coupon</span>
      </button>

      {showCoupon && (
        <div className="coupon-overlay">
          <div className="coupon-popup">
            <div className="coupon-close" onClick={closeCoupon}>×</div>
            <div className="coupon-header">
              <FaGift className="coupon-gift-icon" />
              <h2>Special Offer!</h2>
            </div>
            <div className="coupon-content">
              <div className="coupon-card">
                <div className="discount-badge">{coupon.discount}% OFF</div>
                <div className="coupon-code">{coupon.code}</div>
                <button 
                  className="copy-button" 
                  onClick={copyToClipboard}
                  disabled={copied}
                >
                  {copied ? <><FaCheck /> Copied!</> : <><FaCopy /> Copy Code</>}
                </button>
              </div>
              <p className="coupon-description">
                Use this coupon at checkout to get {coupon.discount}% off your order!
              </p>
              <p className="coupon-terms">
                *Terms & conditions apply. Valid for 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponGenerator;