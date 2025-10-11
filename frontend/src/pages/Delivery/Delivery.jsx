import React, { useContext } from "react";
import "./Delivery.css";
import { ThemeContext } from "../../components/context/ThemeContext";

const Delivery = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`delivery-container ${theme === "dark" ? "dark" : "light"}`}>
      <div className="delivery-content">
        <h1 className="delivery-title">🚚 Delivery Information</h1>
        <p className="delivery-subtitle">Fast, reliable delivery to your doorstep</p>

        <section className="delivery-section">
          <h2>📍 Delivery Areas</h2>
          <p>
            We currently deliver to the following areas within a 10km radius of our restaurant locations:
          </p>
          <ul className="delivery-areas">
            <li>Downtown District</li>
            <li>Business District</li>
            <li>Residential Areas</li>
            <li>University Campus</li>
            <li>Tech Park</li>
          </ul>
        </section>

        <section className="delivery-section">
          <h2>⏰ Delivery Hours</h2>
          <div className="delivery-hours">
            <div className="hours-item">
              <strong>Monday - Friday:</strong> 11:00 AM - 10:00 PM
            </div>
            <div className="hours-item">
              <strong>Saturday - Sunday:</strong> 10:00 AM - 11:00 PM
            </div>
            <div className="hours-item">
              <strong>Holidays:</strong> 12:00 PM - 9:00 PM
            </div>
          </div>
        </section>

        <section className="delivery-section">
          <h2>💰 Delivery Fees</h2>
          <div className="delivery-fees">
            <div className="fee-item">
              <span className="fee-amount">Free</span>
              <span className="fee-condition">Orders above $25</span>
            </div>
            <div className="fee-item">
              <span className="fee-amount">$2.99</span>
              <span className="fee-condition">Orders $15 - $25</span>
            </div>
            <div className="fee-item">
              <span className="fee-amount">$4.99</span>
              <span className="fee-condition">Orders below $15</span>
            </div>
          </div>
        </section>

        <section className="delivery-section">
          <h2>⏱️ Estimated Delivery Times</h2>
          <div className="delivery-times">
            <div className="time-item">
              <span className="time-range">25-35 minutes</span>
              <span className="time-condition">Standard delivery</span>
            </div>
            <div className="time-item">
              <span className="time-range">15-25 minutes</span>
              <span className="time-condition">Express delivery (+$3.99)</span>
            </div>
            <div className="time-item">
              <span className="time-range">45-60 minutes</span>
              <span className="time-condition">During peak hours</span>
            </div>
          </div>
        </section>

        <section className="delivery-section">
          <h2>📱 Track Your Order</h2>
          <p>
            Once you place an order, you'll receive real-time updates via SMS and email. 
            You can also track your order status in your account dashboard.
          </p>
          <div className="tracking-features">
            <div className="feature-item">
              <span className="feature-icon">📋</span>
              <span>Order confirmed</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👨‍🍳</span>
              <span>Preparing your food</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚚</span>
              <span>Out for delivery</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <span>Delivered</span>
            </div>
          </div>
        </section>

        <section className="delivery-section">
          <h2>📞 Contact Delivery Support</h2>
          <p>
            Need help with your delivery? Our support team is here to assist you:
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <strong>Phone:</strong> +1-214-723-889
            </div>
            <div className="contact-item">
              <strong>Email:</strong> delivery@foodie.com
            </div>
            <div className="contact-item">
              <strong>Live Chat:</strong> Available 24/7 on our website
            </div>
          </div>
        </section>

        <section className="delivery-section">
          <h2>❓ Frequently Asked Questions</h2>
          <div className="faq-items">
            <div className="faq-item">
              <h3>Can I schedule a delivery for later?</h3>
              <p>Yes! You can schedule deliveries up to 7 days in advance during checkout.</p>
            </div>
            <div className="faq-item">
              <h3>What if I'm not available when the delivery arrives?</h3>
              <p>Our driver will call you. If no one answers, we'll leave the food in a safe place or reschedule.</p>
            </div>
            <div className="faq-item">
              <h3>Do you deliver in bad weather?</h3>
              <p>We deliver in most weather conditions, but may delay during severe weather for safety.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Delivery;
