import React, { useContext } from "react";
import "./TermsOfService.css";
import { ThemeContext } from "../context/ThemeContext";

const TermsOfService = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`terms-container ${theme === "dark" ? "dark" : "light"}`}>
      <div className="terms-content">
        <h1 className="terms-title">Terms of Service</h1>
        <p className="terms-updated">Last updated: October 2025</p>

        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Foodie platform, you accept and agree to be bound by the terms 
            and provision of this agreement. If you do not agree to abide by the above, please do not 
            use this service.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on Foodie's website 
            for personal, non-commercial transitory viewing only. This is the grant of a license, not a 
            transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>modify or copy the materials</li>
            <li>use the materials for any commercial purpose or for any public display</li>
            <li>attempt to reverse engineer any software contained on the website</li>
            <li>remove any copyright or other proprietary notations from the materials</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, 
            and current at all times. You are responsible for safeguarding the password and for all 
            activities that occur under your account.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Orders and Payments</h2>
          <p>
            All orders are subject to acceptance by the restaurant. We reserve the right to refuse or 
            cancel your order at any time for certain reasons including but not limited to: product or 
            service availability, errors in the description or price of the product or service, or error 
            in your order.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. Privacy Policy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy, which also governs your 
            use of the Service, to understand our practices.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Foodie, nor its directors, employees, partners, agents, suppliers, or 
            affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
            damages, including without limitation, loss of profits, data, use, goodwill, or other 
            intangible losses, resulting from your use of the service.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be interpreted and governed by the laws of the jurisdiction in which 
            Foodie operates, without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
            If a revision is material, we will try to provide at least 30 days notice prior to any new 
            terms taking effect.
          </p>
        </section>

        <section className="terms-section">
          <h2>9. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
            <br />
            Email: legal@foodie.com
            <br />
            Phone: +1-214-723-889
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
