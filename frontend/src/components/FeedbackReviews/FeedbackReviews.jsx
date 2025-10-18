import React, { useState } from "react";
import "./FeedbackReviews.css";
import { FaUser, FaCommentDots, FaEnvelope } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { MdCancel } from "react-icons/md";

const FeedbackReviews = () => {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [rating, setRating] = useState(0); // ⭐ rating state

  const handleSubmit = (e) => {
    e.preventDefault();

    if (feedback.trim() && name.trim() && email.trim() && rating > 0) {
      const newFeedback = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        feedback: feedback.trim(),
        rating,
        timestamp: new Date().toISOString(),
        submittedAt: new Date().toLocaleDateString(),
      };

      const existingFeedbacks = JSON.parse(
        localStorage.getItem("userFeedbacks") || "[]"
      );
      const updatedFeedbacks = [newFeedback, ...existingFeedbacks];
      localStorage.setItem("userFeedbacks", JSON.stringify(updatedFeedbacks));

      setFeedback("");
      setName("");
      setEmail("");
      setRating(0);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      alert("Please fill out all fields and select a rating before submitting!");
    }
  };

  const handleCancel = () => {
    setFeedback("");
    setName("");
    setEmail("");
    setRating(0);
  };

  return (
    <div className="feedback-reviews-section" id="feedback">
      <div className="feedback-container">
        <div className="feedback-header">
          <h2 className="feedback-title">
            <FaCommentDots className="title-icon" />
            Feedback & Reviews
          </h2>
          <p className="feedback-subtitle">
            Share your experience and help us improve our service!
          </p>
        </div>

        {showSuccess && (
          <div className="success-message">
            <div className="success-content">
              ✅ Submitted successfully! Thank you for your feedback.
            </div>
          </div>
        )}

        <form className="feedback-form" onSubmit={handleSubmit}>
          {/* ⭐ Star Rating on TOP */}
          <div className="form-group rating-group">
            <p className="rating-label">Rate your experience:</p>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${rating >= star ? "filled" : ""}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Name + Email Inputs */}
          <div className="form-group name-email-row">
            <div className="input-container">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="feedback-input name-input"
                required
              />
            </div>

            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="feedback-input email-input"
                required
              />
            </div>
          </div>

          {/* Feedback Textarea */}
          <div className="form-group">
            <div className="textarea-container">
              <textarea
                placeholder="Share your feedback, suggestions, or review..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="feedback-textarea"
                rows="3"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="button-group">
            <button type="submit" className="submit-button">
              <BiSend className="submit-icon" />
              Submit Feedback
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              <MdCancel className="cancel-icon" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackReviews;
