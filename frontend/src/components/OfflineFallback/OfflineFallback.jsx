import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import './OfflineFallback.css';

const OfflineFallback = ({ onRetry }) => {
  return (
    <div className="offline-fallback">
      <div className="offline-content">
        <div className="offline-icon">
          <WifiOff size={64} />
        </div>
        <h2>You're Offline</h2>
        <p>It looks like you're not connected to the internet.</p>
        <p>Don't worry! You can still:</p>
        <ul className="offline-features">
          <li>View your cart</li>
          <li>Browse cached menu items</li>
          <li>Check your order history</li>
        </ul>
        <button 
          className="retry-button" 
          onClick={onRetry}
        >
          <RefreshCw size={20} />
          Try Again
        </button>
        <p className="offline-tip">
          Make sure you're connected to Wi-Fi or mobile data
        </p>
      </div>
    </div>
  );
};

export default OfflineFallback;
