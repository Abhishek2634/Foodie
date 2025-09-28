import React, { useState } from 'react';
import './FeedbackReviews.css';
import { FaUser, FaCommentDots, FaEnvelope } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';

const FeedbackReviews = () => {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (feedback.trim() && name.trim() && email.trim()) {
      const newFeedback = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        feedback: feedback.trim(),
        timestamp: new Date().toISOString(),
        submittedAt: new Date().toLocaleDateString()
      };
      
      // Store feedback locally in localStorage
      const existingFeedbacks = JSON.parse(localStorage.getItem('userFeedbacks') || '[]');
      const updatedFeedbacks = [newFeedback, ...existingFeedbacks];
      localStorage.setItem('userFeedbacks', JSON.stringify(updatedFeedbacks));
      
      // Clear form
      setFeedback('');
      setName('');
      setEmail('');
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const handleCancel = () => {
    setFeedback('');
    setName('');
    setEmail('');
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

        {/* Success Message */}
        {showSuccess && (
          <div className="success-message">
            <div className="success-content">
              ✅ Submitted successfully! Thank you for your feedback.
            </div>
          </div>
        )}

        {/* Feedback Form */}
        <form className="feedback-form" onSubmit={handleSubmit}>
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

          <div className="button-group">
            <button type="submit" className="submit-button">
              <BiSend className="submit-icon" />
              Submit Feedback
            </button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
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
