import React, { useState } from 'react';
import { IoIosMail } from "react-icons/io";
import { BiMailSend } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { MdError } from "react-icons/md";
import './NewsletterSubscription.css';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(''); // 'success', 'error', ''
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setStatus('');
    setMessage('');

    try {
      // Simulate API call - replace with actual backend endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just show success message
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email for confirmation.');
      setEmail('');
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setStatus('');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='newsletter-section'>
      <h2 className='newsletter-title'>Stay Updated</h2>
      <p className='newsletter-description'>
        Subscribe to our newsletter and get the latest updates, exclusive offers, and delicious deals delivered to your inbox!
      </p>
      
      <form onSubmit={handleSubmit} className='newsletter-form'>
        <div className='newsletter-input-container'>
          <IoIosMail className='newsletter-input-icon' />
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`newsletter-input ${status === 'error' ? 'error' : ''}`}
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit" 
          className={`newsletter-button ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            <>
              <BiMailSend className='newsletter-button-icon' />
              Subscribe Now
            </>
          )}
        </button>
      </form>

      {/* Status Messages */}
      {message && (
        <div className={`newsletter-message ${status}`}>
          {status === 'success' ? (
            <FaCheck className='message-icon' />
          ) : (
            <MdError className='message-icon' />
          )}
          <span>{message}</span>
        </div>
      )}
      
      <p className='newsletter-privacy'>
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsletterSubscription;
