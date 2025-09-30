import React, { useContext } from 'react';
import { LoyaltyContext } from '../context/LoyaltyContext';
import { StoreContext } from '../context/StoreContext';
import { ThemeContext } from '../context/ThemeContext';
import { Coins, Gift, Star, Zap } from 'lucide-react';
import './CartPointsPreview.css';

const CartPointsPreview = ({ cartTotal }) => {
  const { isAuthenticated } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const {
    userPoints,
    calculateOrderPoints,
    REWARDS_CATALOG,
    getAvailableRewards
  } = useContext(LoyaltyContext);

  if (!isAuthenticated || cartTotal === 0) {
    return null;
  }

  const pointsToEarn = calculateOrderPoints(cartTotal);
  const currentPoints = userPoints || 0;
  const totalPointsAfterOrder = currentPoints + pointsToEarn;

  // Find rewards user can afford with current points
  const affordableRewards = REWARDS_CATALOG.filter(reward => 
    currentPoints >= reward.pointsCost
  );

  // Find rewards user will be able to afford after this order
  const upcomingRewards = REWARDS_CATALOG.filter(reward => 
    currentPoints < reward.pointsCost && totalPointsAfterOrder >= reward.pointsCost
  );

  // Find the next milestone reward
  const nextMilestone = REWARDS_CATALOG
    .filter(reward => totalPointsAfterOrder < reward.pointsCost)
    .sort((a, b) => a.pointsCost - b.pointsCost)[0];

  return (
    <div className={`cart-points-preview ${theme}`}>
      <div className="points-header">
        <Coins size={24} />
        <h3>Loyalty Points</h3>
      </div>

      <div className="points-earning">
        <div className="earning-card">
          <div className="earning-info">
            <span className="earning-label">You'll earn</span>
            <span className="earning-points">+{pointsToEarn} points</span>
          </div>
          <div className="points-calculation">
            <Zap size={16} />
            <span>${cartTotal} = {pointsToEarn} points</span>
          </div>
        </div>
      </div>

      {affordableRewards.length > 0 && (
        <div className="current-rewards">
          <h4>🎁 Available Now ({currentPoints} points)</h4>
          <div className="rewards-list">
            {affordableRewards.slice(0, 2).map((reward) => (
              <div key={reward.id} className="reward-item available">
                <Gift size={18} />
                <div className="reward-info">
                  <span className="reward-title">{reward.name}</span>
                  <span className="reward-cost">{reward.pointsCost} points</span>
                </div>
              </div>
            ))}
            {affordableRewards.length > 2 && (
              <div className="more-rewards">
                +{affordableRewards.length - 2} more available
              </div>
            )}
          </div>
        </div>
      )}

      {upcomingRewards.length > 0 && (
        <div className="upcoming-rewards">
          <h4>🌟 You'll Unlock After This Order</h4>
          <div className="rewards-list">
            {upcomingRewards.slice(0, 2).map((reward) => (
              <div key={reward.id} className="reward-item upcoming">
                <Star size={18} />
                <div className="reward-info">
                  <span className="reward-title">{reward.name}</span>
                  <span className="reward-cost">{reward.pointsCost} points</span>
                </div>
                <div className="unlock-badge">NEW!</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {nextMilestone && (
        <div className="next-milestone">
          <div className="milestone-progress">
            <div className="progress-info">
              <span>Next reward: {nextMilestone.name}</span>
              <span>{nextMilestone.pointsCost - totalPointsAfterOrder} points away</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{
                  width: `${Math.min((totalPointsAfterOrder / nextMilestone.pointsCost) * 100, 100)}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div className="points-summary">
        <div className="summary-row">
          <span>Current points:</span>
          <span>{currentPoints}</span>
        </div>
        <div className="summary-row">
          <span>Points from this order:</span>
          <span>+{pointsToEarn}</span>
        </div>
        <div className="summary-row total">
          <span>Total after order:</span>
          <span>{totalPointsAfterOrder}</span>
        </div>
      </div>

      <div className="points-cta">
        <p>💡 Visit <strong>Rewards</strong> to redeem your points anytime!</p>
      </div>
    </div>
  );
};

export default CartPointsPreview;