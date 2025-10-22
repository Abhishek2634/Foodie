import React from "react";
import "./SuccessPopup.css";

const SuccessPopup = ({ message, onClose }) => {
  if (!message) return null; // safety guard

  return (
    <div className="success-popup-overlay" onClick={onClose}>
      <div className="success-popup" onClick={(e) => e.stopPropagation()}>
        <h3>✅ Success!</h3>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default SuccessPopup;
