import React, { useContext, useState } from 'react';
import { LoyaltyContext } from '../../components/context/LoyaltyContext';
import { StoreContext } from '../../components/context/StoreContext';
import { ThemeContext } from '../../components/context/ThemeContext';
import { 
  Gift, 
  Star, 
  Trophy, 
  Crown, 
  Zap, 
  Target, 
  Award,
  ShoppingBag,
  Percent,
  Truck
} from 'lucide-react';
import './Rewards.css';

const Rewards = () => {
  const { theme } = useContext(ThemeContext);
  const { user, isAuthenticated } = useContext(StoreContext);
  const {
    userPoints,
    achievements,
    rewardHistory,
    REWARDS_CATALOG,
    ACHIEVEMENTS,
    redeemReward,
    getAvailableRewards,
    getUnusedRedemptions,
    loading
  } = useContext(LoyaltyContext);

  const [activeTab, setActiveTab] = useState('rewards');

  if (!isAuthenticated) {
    return (
      <div className={`rewards-page ${theme === 'dark' ? 'dark' : 'light'}`}>
        <div className="rewards-container">
          <div className="login-required">
            <Trophy size={64} className="login-icon" />
            <h2>Login Required</h2>
            <p>Please login to view your rewards and achievements</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`rewards-page ${theme === 'dark' ? 'dark' : 'light'}`}>
        <div className="rewards-container">
          <div className="loading">Loading your rewards...</div>
        </div>
      </div>
    );
  }

  const availableRewards = getAvailableRewards();
  const unusedRedemptions = getUnusedRedemptions();

  const handleRedeemReward = (rewardId) => {
    const redemption = redeemReward(rewardId);
    if (redemption) {
      // Reward redeemed successfully
    }
  };

  const getRewardIcon = (type) => {
    switch (type) {
      case 'discount':
        return <Percent size={24} />;
      case 'free_delivery':
        return <Truck size={24} />;
      case 'cashback':
        return <Gift size={24} />;
      default:
        return <Star size={24} />;
    }
  };

  const getAchievementIcon = (icon) => {
    return <span className="achievement-emoji">{icon}</span>;
  };

  return (
    <div className={`rewards-page ${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="rewards-container">
        {/* Header Section */}
        <div className="rewards-header">
          <div className="points-display">
            <div className="points-circle">
              <Zap className="points-icon" />
              <span className="points-count">{userPoints}</span>
            </div>
            <div className="points-info">
              <h2>Your Points</h2>
              <p>Earn points with every order and unlock amazing rewards!</p>
            </div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <Trophy className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">{achievements.length}</span>
                <span className="stat-label">Achievements</span>
              </div>
            </div>
            <div className="stat-card">
              <Gift className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">{rewardHistory.length}</span>
                <span className="stat-label">Rewards Claimed</span>
              </div>
            </div>
            <div className="stat-card">
              <Target className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">{availableRewards.length}</span>
                <span className="stat-label">Available Rewards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'rewards' ? 'active' : ''}`}
            onClick={() => setActiveTab('rewards')}
          >
            <Gift size={20} />
            Rewards
          </button>
          <button 
            className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            <Trophy size={20} />
            Achievements
          </button>
          <button 
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <ShoppingBag size={20} />
            My Rewards
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'rewards' && (
            <div className="rewards-section">
              <h3>Available Rewards</h3>
              <div className="rewards-grid">
                {REWARDS_CATALOG.map(reward => {
                  const canAfford = userPoints >= reward.pointsCost;
                  return (
                    <div 
                      key={reward.id} 
                      className={`reward-card ${!canAfford ? 'disabled' : ''}`}
                    >
                      <div className="reward-icon">
                        {getRewardIcon(reward.type)}
                      </div>
                      <div className="reward-info">
                        <h4>{reward.name}</h4>
                        <p>{reward.description}</p>
                        <div className="reward-cost">
                          <Zap size={16} />
                          <span>{reward.pointsCost} points</span>
                        </div>
                      </div>
                      <button 
                        className={`redeem-btn ${!canAfford ? 'disabled' : ''}`}
                        onClick={() => handleRedeemReward(reward.id)}
                        disabled={!canAfford}
                      >
                        {canAfford ? 'Redeem' : 'Not Enough Points'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="achievements-section">
              <h3>Achievements</h3>
              <div className="achievements-grid">
                {ACHIEVEMENTS.map(achievement => {
                  const isUnlocked = achievements.some(a => a.id === achievement.id);
                  return (
                    <div 
                      key={achievement.id} 
                      className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                    >
                      <div className="achievement-icon">
                        {getAchievementIcon(achievement.icon)}
                      </div>
                      <div className="achievement-info">
                        <h4>{achievement.name}</h4>
                        <p>{achievement.description}</p>
                        <div className="achievement-points">
                          <Star size={16} />
                          <span>{achievement.points} points</span>
                        </div>
                      </div>
                      <div className={`achievement-status ${isUnlocked ? 'unlocked' : 'locked'}`}>
                        {isUnlocked ? (
                          <Award className="status-icon unlocked" />
                        ) : (
                          <Target className="status-icon locked" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-section">
              <div className="unused-rewards">
                <h3>Active Rewards</h3>
                {unusedRedemptions.length > 0 ? (
                  <div className="rewards-list">
                    {unusedRedemptions.map(redemption => {
                      const reward = REWARDS_CATALOG.find(r => r.id === redemption.rewardId);
                      return (
                        <div key={redemption.id} className="reward-item active">
                          <div className="reward-icon">
                            {getRewardIcon(reward?.type)}
                          </div>
                          <div className="reward-details">
                            <h4>{redemption.rewardName}</h4>
                            <p>Redeemed on {new Date(redemption.redeemedAt).toLocaleDateString()}</p>
                            <span className="reward-status active">Ready to use</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="no-rewards">No active rewards. Redeem some rewards to see them here!</p>
                )}
              </div>

              <div className="reward-history">
                <h3>Reward History</h3>
                {rewardHistory.length > 0 ? (
                  <div className="history-list">
                    {rewardHistory.map(redemption => {
                      const reward = REWARDS_CATALOG.find(r => r.id === redemption.rewardId);
                      return (
                        <div key={redemption.id} className="history-item">
                          <div className="reward-icon">
                            {getRewardIcon(reward?.type)}
                          </div>
                          <div className="reward-details">
                            <h4>{redemption.rewardName}</h4>
                            <p>Redeemed on {new Date(redemption.redeemedAt).toLocaleDateString()}</p>
                            <span className={`reward-status ${redemption.used ? 'used' : 'active'}`}>
                              {redemption.used ? 'Used' : 'Active'}
                            </span>
                          </div>
                          <div className="reward-cost">
                            <Zap size={16} />
                            <span>{redemption.pointsCost} points</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="no-history">No reward history yet. Start redeeming rewards!</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* How it Works Section */}
        <div className="how-it-works">
          <h3>How to Earn Points</h3>
          <div className="earning-methods">
            <div className="earning-method">
              <ShoppingBag className="method-icon" />
              <div className="method-info">
                <h4>Place Orders</h4>
                <p>Earn 1 point for every $1 spent</p>
              </div>
            </div>
            <div className="earning-method">
              <Star className="method-icon" />
              <div className="method-info">
                <h4>Write Reviews</h4>
                <p>Get 25 points for each review</p>
              </div>
            </div>
            <div className="earning-method">
              <Trophy className="method-icon" />
              <div className="method-info">
                <h4>Unlock Achievements</h4>
                <p>Bonus points for milestones</p>
              </div>
            </div>
            <div className="earning-method">
              <Crown className="method-icon" />
              <div className="method-info">
                <h4>Refer Friends</h4>
                <p>200 points for each referral</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;