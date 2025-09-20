import React, { useContext, useState, useEffect } from 'react';
import { LoyaltyContext } from '../context/LoyaltyContext';
import { StoreContext } from '../context/StoreContext';
import { X, Trophy, Star } from 'lucide-react';
import './AchievementNotification.css';

const AchievementNotification = () => {
  const { isAuthenticated } = useContext(StoreContext);
  const { achievements } = useContext(LoyaltyContext);
  const [showNotification, setShowNotification] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [notificationQueue, setNotificationQueue] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Check for new achievements (compare with localStorage)
    const lastShownAchievements = JSON.parse(
      localStorage.getItem('lastShownAchievements') || '[]'
    );
    
    const newAchievements = achievements.filter(
      achievement => !lastShownAchievements.some(shown => shown.id === achievement.id)
    );

    if (newAchievements.length > 0) {
      setNotificationQueue(newAchievements);
      localStorage.setItem('lastShownAchievements', JSON.stringify(achievements));
    }
  }, [achievements, isAuthenticated]);

  useEffect(() => {
    if (notificationQueue.length > 0 && !showNotification) {
      const nextAchievement = notificationQueue[0];
      setCurrentAchievement(nextAchievement);
      setShowNotification(true);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        closeNotification();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notificationQueue, showNotification]);

  const closeNotification = () => {
    setShowNotification(false);
    setCurrentAchievement(null);
    
    // Remove the shown achievement from queue and show next if any
    setTimeout(() => {
      setNotificationQueue(prev => {
        const newQueue = prev.slice(1);
        return newQueue;
      });
    }, 300); // Wait for animation to complete
  };

  if (!showNotification || !currentAchievement) {
    return null;
  }

  return (
    <div className={`achievement-notification ${showNotification ? 'show' : ''}`}>
      <div className="notification-content">
        <button className="close-btn" onClick={closeNotification}>
          <X size={20} />
        </button>
        
        <div className="achievement-header">
          <Trophy className="trophy-icon" />
          <h3>Achievement Unlocked!</h3>
        </div>
        
        <div className="achievement-details">
          <div className="achievement-badge">
            <span className="achievement-emoji">{currentAchievement.icon}</span>
          </div>
          
          <div className="achievement-info">
            <h4>{currentAchievement.name}</h4>
            <p>{currentAchievement.description}</p>
            
            <div className="points-earned">
              <Star className="star-icon" />
              <span>+{currentAchievement.points} points earned!</span>
            </div>
          </div>
        </div>
        
        <div className="celebration-effects">
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </div>
      </div>
    </div>
  );
};

export default AchievementNotification;