import React, { useContext, useState } from "react";
import "./privacy.css";
import { ThemeContext } from "../context/ThemeContext";

const Privacy = () => {
  const { theme } = useContext(ThemeContext);
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={`privacy-container ${theme === "dark" ? "dark" : "light"}`}>
      <div className="privacy-content">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-updated">Last updated: September 2025</p>

        <section className="privacy-section">
          <div className="privacy-section-header">
            <h2>Information We Collect</h2>
            <button
              className="dropdown-toggle"
              onClick={() => toggleSection(0)}
              aria-expanded={openSections[0]}
            >
              <span
                className={`dropdown-icon ${openSections[0] ? "open" : ""}`}
              >
                ▼
              </span>
            </button>
          </div>
          <div
            className={`privacy-section-content ${
              openSections[0] ? "open" : ""
            }`}
          >
            <p>
              We collect information you provide directly to us, such as when
              you create an account, place an order, or contact us for support.
              This may include your name, email address, phone number, delivery
              address, and payment information.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-section-header">
            <h2>How We Use Your Information</h2>
            <button
              className="dropdown-toggle"
              onClick={() => toggleSection(1)}
              aria-expanded={openSections[1]}
            >
              <span
                className={`dropdown-icon ${openSections[1] ? "open" : ""}`}
              >
                ▼
              </span>
            </button>
          </div>
          <div
            className={`privacy-section-content ${
              openSections[1] ? "open" : ""
            }`}
          >
            <p>
              We use the information we collect to provide, maintain, and
              improve our services, process transactions, send you technical
              notices and support messages, and communicate with you about
              products, services, and promotional offers.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-section-header">
            <h2>Information Sharing</h2>
            <button
              className="dropdown-toggle"
              onClick={() => toggleSection(2)}
              aria-expanded={openSections[2]}
            >
              <span
                className={`dropdown-icon ${openSections[2] ? "open" : ""}`}
              >
                ▼
              </span>
            </button>
          </div>
          <div
            className={`privacy-section-content ${
              openSections[2] ? "open" : ""
            }`}
          >
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this Privacy Policy. We may share your information
              with trusted service providers who assist us in operating our
              platform.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-section-header">
            <h2>Data Security</h2>
            <button
              className="dropdown-toggle"
              onClick={() => toggleSection(3)}
              aria-expanded={openSections[3]}
            >
              <span
                className={`dropdown-icon ${openSections[3] ? "open" : ""}`}
              >
                ▼
              </span>
            </button>
          </div>
          <div
            className={`privacy-section-content ${
              openSections[3] ? "open" : ""
            }`}
          >
            <p>
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission
              over the internet is 100% secure.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-section-header">
            <h2>Your Rights</h2>
            <button
              className="dropdown-toggle"
              onClick={() => toggleSection(4)}
              aria-expanded={openSections[4]}
            >
              <span
                className={`dropdown-icon ${openSections[4] ? "open" : ""}`}
              >
                ▼
              </span>
            </button>
          </div>
          <div
            className={`privacy-section-content ${
              openSections[4] ? "open" : ""
            }`}
          >
            <p>
              You have the right to access, update, or delete your personal
              information. You may also opt out of certain communications from
              us. To exercise these rights, please contact us using the
              information provided below.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-section-header">
            <h2>Contact Us</h2>
            <button
              className="dropdown-toggle"
              onClick={() => toggleSection(5)}
              aria-expanded={openSections[5]}
            >
              <span
                className={`dropdown-icon ${openSections[5] ? "open" : ""}`}
              >
                ▼
              </span>
            </button>
          </div>
          <div
            className={`privacy-section-content ${
              openSections[5] ? "open" : ""
            }`}
          >
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at
              <a href="mailto:privacy@foodie.com" className="privacy-link">
                {" "}
                privacy@foodie.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
