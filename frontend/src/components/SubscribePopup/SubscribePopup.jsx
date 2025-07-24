import React, { useEffect, useState } from "react";
import "./SubscribePopup.css";

const SubscribePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Show popup after delay (e.g., 10 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000); // 10 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async () => {
    if (!email.includes("@")) {
      setMessage("Enter a valid email!");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(`✅ ${data.message}`);  // success message
      setEmail("");                      // clear input
    } catch (err) {
    setMessage("❌ Something went wrong!");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="close-btn" onClick={handleClose}>×</button>
        <h2>Subscribe for Updates!</h2>
        <p>Get the latest food trends and recipes straight to your inbox.</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="subscribe-btn" onClick={handleSubmit}>
          Subscribe
        </button>
        {message && <p className="subscribe-message">{message}</p>}
      </div>
    </div>
  );
};

export default SubscribePopup;
