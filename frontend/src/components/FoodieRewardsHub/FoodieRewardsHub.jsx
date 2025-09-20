import React, { useContext, useState } from 'react';
import { LoyaltyContext } from '../context/LoyaltyContext';
import { StoreContext } from '../context/StoreContext';
import { ThemeContext } from '../context/ThemeContext';
import { Star, Trophy, Gift, Coins, Target, CheckCircle, Lock } from 'lucide-react';
import './FoodieRewardsHub.css';

const FoodieRewardsHub = () => {
  const { isAuthenticated, user } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const {
    userPoints,
    earnPoints,
    calculateOrderPoints,
    updateUserStats,
    getUserStats,
    checkAchievements,
    availableRewards
  } = useContext(LoyaltyContext);

  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated) {
    return null;
  }

  const userStats = getUserStats();
  const currentPoints = userPoints || 0;

  // Quick actions that users can perform
  const quickActions = [
    {
      id: 'review',
      title: 'Write a Review',
      description: 'Share your experience and earn 25 points',
      points: 25,
      icon: Star,
      condition: () => userStats.ordersCount > 0, // Can only review after ordering
      action: () => {
        if (userStats.ordersCount > 0) {
          updateUserStats('reviews_count', userStats.reviewsCount + 1);
          earnPoints(25, 'Review submitted');
          setTimeout(() => checkAchievements(), 1000);
        }
      }
    },
    {
      id: 'social_share',
      title: 'Share on Social Media',
      description: 'Share Foodie with friends and earn 15 points',
      points: 15,
      icon: Gift,
      condition: () => true, // Always available
      action: () => {
        earnPoints(15, 'Shared on social media');
        setTimeout(() => checkAchievements(), 1000);
      }
    },
    {
      id: 'daily_check',
      title: 'Daily Check-in',
      description: 'Visit daily and earn 10 points',
      points: 10,
      icon: CheckCircle,
      condition: () => {
        const lastCheckIn = localStorage.getItem('lastDailyCheckIn');
        const today = new Date().toDateString();
        return lastCheckIn !== today;
      },
      action: () => {
        const today = new Date().toDateString();
        localStorage.setItem('lastDailyCheckIn', today);
        earnPoints(10, 'Daily check-in bonus');
        setTimeout(() => checkAchievements(), 1000);
      }
    }
  ];

  // Order simulation for demo purposes
  const simulateOrderCompletion = (amount) => {
    const points = calculateOrderPoints(amount);
    updateUserStats('orders_count', userStats.ordersCount + 1);
    updateUserStats('total_spent', userStats.totalSpent + amount);
    earnPoints(points, `Order of $${amount} completed`);
    setTimeout(() => checkAchievements(), 1000);
  };

  const renderOverview = () => (
    <div className="rewards-overview">
      <div className="points-balance-card">
        <div className="points-icon">
          <Coins size={32} />
        </div>
        <div className="points-info">
          <h3>{currentPoints}</h3>
          <p>Available Points</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Trophy size={24} />
          <div>
            <h4>{userStats.ordersCount}</h4>
            <p>Orders Placed</p>
          </div>
        </div>
        <div className="stat-card">
          <Star size={24} />
          <div>
            <h4>{userStats.reviewsCount}</h4>
            <p>Reviews Written</p>
          </div>
        </div>
        <div className="stat-card">
          <Gift size={24} />
          <div>
            <h4>${userStats.totalSpent}</h4>
            <p>Total Spent</p>
          </div>
        </div>
      </div>

      <div className="next-rewards">
        <h4>🎯 Your Next Goals</h4>
        <div className="goal-list">
          {userStats.ordersCount < 5 && (
            <div className="goal-item">
              <Target size={20} />
              <span>Place {5 - userStats.ordersCount} more orders to unlock "Regular Customer" achievement</span>
            </div>
          )}
          {userStats.totalSpent < 2000 && (
            <div className="goal-item">
              <Target size={20} />
              <span>Spend ${200 - userStats.totalSpent} more to unlock "Big Spender" achievement</span>
            </div>
          )}
          {currentPoints >= 500 && (
            <div className="goal-item achievement-ready">
              <Gift size={20} />
              <span>🎉 You can redeem $5 OFF! Visit the Rewards page.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderActions = () => (
    <div className="rewards-actions">
      <h4>🚀 Earn More Points</h4>
      <div className="action-grid">
        {quickActions.map((action) => {
          const Icon = action.icon;
          const isEnabled = action.condition();
          
          return (
            <div 
              key={action.id} 
              className={`action-card ${!isEnabled ? 'disabled' : ''}`}
              onClick={isEnabled ? action.action : undefined}
            >
              <div className="action-icon">
                {isEnabled ? <Icon size={24} /> : <Lock size={24} />}
              </div>
              <div className="action-content">
                <h5>{action.title}</h5>
                <p>{action.description}</p>
                <div className="action-points">
                  <Coins size={16} />
                  <span>+{action.points} points</span>
                </div>
              </div>
              {!isEnabled && (
                <div className="action-disabled-reason">
                  {action.id === 'review' && 'Complete an order first'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="demo-section">
        <h4>📱 Demo: Place Orders</h4>
        <p>Experience how you earn points with every order!</p>
        <div className="demo-buttons">
          <button 
            className="demo-order-btn"
            onClick={() => simulateOrderCompletion(499)}
          >
            🍕 Small Order ($49)
            <span>+50 points</span>
          </button>
          <button 
            className="demo-order-btn"
            onClick={() => simulateOrderCompletion(999)}
          >
            🍽️ Medium Order ($99)
            <span>+100 points</span>
          </button>
          <button 
            className="demo-order-btn premium"
            onClick={() => simulateOrderCompletion(1999)}
          >
            🥘 Large Order ($199)
            <span>+200 points</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`foodie-rewards-hub ${theme}`}>
      <div className="hub-header">
        <div className="hub-title">
          <Trophy size={28} />
          <div>
            <h2>Foodie Rewards Hub</h2>
            <p>Hello {user?.name}! Track your points and unlock amazing rewards</p>
          </div>
        </div>
        
        <div className="hub-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'actions' ? 'active' : ''}`}
            onClick={() => setActiveTab('actions')}
          >
            Earn Points
          </button>
        </div>
      </div>

      <div className="hub-content">
        {activeTab === 'overview' ? renderOverview() : renderActions()}
      </div>

      <div className="hub-footer">
        <p>🏆 Visit the <strong>Rewards</strong> page to redeem your points for discounts and free items!</p>
      </div>
    </div>
  );
};

export default FoodieRewardsHub;