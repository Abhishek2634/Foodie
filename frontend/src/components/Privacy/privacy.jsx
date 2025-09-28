import React, { useContext } from "react";
import "./privacy.css";
import { ThemeContext } from "../context/ThemeContext";

const Privacy = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`privacy-container ${theme === "dark" ? "dark" : "light"}`}>
      <div className="privacy-content">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-updated">Last updated: September 2025</p>

        <section className="privacy-section">
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, 
            place an order, or contact us for support. This may include your name, email address, 
            phone number, delivery address, and payment information.
          </p>
        </section>

        <section className="privacy-section">
          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, 
            process transactions, send you technical notices and support messages, and communicate 
            with you about products, services, and promotional offers.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties 
            without your consent, except as described in this Privacy Policy. We may share your 
            information with trusted service providers who assist us in operating our platform.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction. However, no method of 
            transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. You may also 
            opt out of certain communications from us. To exercise these rights, please contact us 
            using the information provided below.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at 
            <a href="mailto:privacy@foodie.com" className="privacy-link"> privacy@foodie.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
