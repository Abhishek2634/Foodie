import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMail } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import './NewsletterSubscription.css';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showNoThanks, setShowNoThanks] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // Here you would typically send the email to your backend
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const handleNoThanks = () => {
    setShowNoThanks(true);
    // Hide the newsletter section after a delay
    setTimeout(() => {
      const newsletterSection = document.querySelector('.newsletter-section');
      if (newsletterSection) {
        newsletterSection.style.display = 'none';
      }
    }, 500);
  };

  if (showNoThanks) {
    return null;
  }

  return (
    <div className="newsletter-section">
      <div className="newsletter-content">
        <div className="newsletter-header">
          <IoMail className="newsletter-icon" />
          <h3>Stay Updated</h3>
          <p>Get the latest offers and updates delivered to your inbox</p>
        </div>

        {!isSubscribed ? (
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="newsletter-input-group">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-subscribe-btn">
                Subscribe
              </button>
            </div>
            <div className="newsletter-actions">
              <button
                type="button"
                onClick={handleNoThanks}
                className="newsletter-no-thanks-btn"
              >
                No thanks
              </button>
            </div>
          </form>
        ) : (
          <div className="newsletter-success">
            <p>Thank you for subscribing! 🎉</p>
            <button
              onClick={() => setIsSubscribed(false)}
              className="newsletter-close-btn"
            >
              <MdClose />
            </button>
          </div>
        )}

        <div className="newsletter-links">
          <Link to="/privacy" className="newsletter-link">
            Privacy Policy
          </Link>
          <span className="newsletter-separator">•</span>
          <Link to="/terms" className="newsletter-link">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
