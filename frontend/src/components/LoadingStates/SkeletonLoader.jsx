import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ type = 'default', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="skeleton-card">
            <div className="skeleton-card-image"></div>
            <div className="skeleton-card-content">
              <div className="skeleton-card-title"></div>
              <div className="skeleton-card-subtitle"></div>
              <div className="skeleton-card-details">
                <div className="skeleton-card-price"></div>
                <div className="skeleton-card-action"></div>
              </div>
            </div>
          </div>
        );
      
      case 'text':
        return <div className="skeleton-text"></div>;
      
      case 'title':
        return <div className="skeleton-title"></div>;
      
      case 'circle':
        return <div className="skeleton-circle"></div>;
      
      case 'restaurant':
        return (
          <div className="skeleton-restaurant">
            <div className="skeleton-restaurant-image"></div>
            <div className="skeleton-restaurant-content">
              <div className="skeleton-restaurant-title"></div>
              <div className="skeleton-restaurant-info"></div>
              <div className="skeleton-restaurant-meta">
                <div className="skeleton-restaurant-rating"></div>
                <div className="skeleton-restaurant-distance"></div>
              </div>
            </div>
          </div>
        );
      
      case 'banner':
        return <div className="skeleton-banner"></div>;
      
      default:
        return <div className="skeleton-box"></div>;
    }
  };

  return (
    <div className="skeleton-loader">
      {Array(count).fill().map((_, index) => (
        <div key={index} className="skeleton-item">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;