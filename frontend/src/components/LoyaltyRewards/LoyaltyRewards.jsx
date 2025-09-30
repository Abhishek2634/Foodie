import React, { useContext, useState } from 'react';
import { LoyaltyContext } from '../context/LoyaltyContext';
import { StoreContext } from '../context/StoreContext';
import { ThemeContext } from '../context/ThemeContext';
import { Gift, Zap, Percent, Truck, Star } from 'lucide-react';
import './LoyaltyRewards.css';

const LoyaltyRewards = ({ orderAmount, onApplyReward }) => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(StoreContext);
  const {
    userPoints,
    calculateOrderPoints,
    getUnusedRedemptions,
    markRedemptionAsUsed,
    REWARDS_CATALOG
  } = useContext(LoyaltyContext);

  const [selectedReward, setSelectedReward] = useState(null);
  const [showRewards, setShowRewards] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  const potentialPoints = calculateOrderPoints(orderAmount);
  const unusedRedemptions = getUnusedRedemptions();

  const handleApplyReward = (redemption) => {
    const reward = REWARDS_CATALOG.find(r => r.id === redemption.rewardId);
    if (!reward) return;

    let discountAmount = 0;
    let freeDelivery = false;

    switch (reward.type) {
      case 'discount':
        discountAmount = Math.min(
          (orderAmount * reward.value) / 100,
          reward.maxDiscount || Infinity
        );
        break;
      case 'free_delivery':
        freeDelivery = true;
        break;
      case 'cashback':
        if (orderAmount >= (reward.minOrder || 0)) {
          discountAmount = reward.value;
        }
        break;
      default:
        break;
    }

    if (discountAmount > 0 || freeDelivery) {
      setSelectedReward(redemption);
      markRedemptionAsUsed(redemption.id);
      onApplyReward({
        redemptionId: redemption.id,
        rewardName: reward.name,
        discountAmount,
        freeDelivery,
        type: reward.type
      });
    }
  };

  const removeAppliedReward = () => {
    setSelectedReward(null);
    onApplyReward(null);
  };

  const getRewardIcon = (type) => {
    switch (type) {
      case 'discount':
        return <Percent size={20} />;
      case 'free_delivery':
        return <Truck size={20} />;
      case 'cashback':
        return <Gift size={20} />;
      default:
        return <Star size={20} />;
    }
  };

  return (
    <div className={`loyalty-rewards ${theme === 'dark' ? 'dark' : 'light'}`}>
      {/* Points Preview */}
      <div className="points-preview">
        <div className="points-info">
          <Zap className="points-icon" />
          <div className="points-text">
            <span className="current-points">You have {userPoints} points</span>
            <span className="earning-points">+{potentialPoints} points with this order</span>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      {unusedRedemptions.length > 0 && (
        <div className="available-rewards">
          <div className="rewards-header" onClick={() => setShowRewards(!showRewards)}>
            <Gift className="gift-icon" />
            <span>You have {unusedRedemptions.length} reward(s) to use</span>
            <button className="toggle-rewards">
              {showRewards ? 'Hide' : 'Show'}
            </button>
          </div>

          {showRewards && (
            <div className="rewards-list">
              {unusedRedemptions.map(redemption => {
                const reward = REWARDS_CATALOG.find(r => r.id === redemption.rewardId);
                if (!reward) return null;

                const isSelected = selectedReward?.id === redemption.id;
                let canApply = true;
                let reasonText = '';

                // Check if reward can be applied
                if (reward.type === 'cashback' && orderAmount < (reward.minOrder || 0)) {
                  canApply = false;
                  reasonText = `Minimum order $${reward.minOrder} required`;
                }

                return (
                  <div 
                    key={redemption.id} 
                    className={`reward-item ${isSelected ? 'selected' : ''} ${!canApply ? 'disabled' : ''}`}
                  >
                    <div className="reward-icon">
                      {getRewardIcon(reward.type)}
                    </div>
                    <div className="reward-details">
                      <h4>{reward.name}</h4>
                      <p>{reward.description}</p>
                      {!canApply && <span className="reason-text">{reasonText}</span>}
                    </div>
                    {isSelected ? (
                      <button 
                        className="remove-btn"
                        onClick={removeAppliedReward}
                      >
                        Remove
                      </button>
                    ) : (
                      <button 
                        className={`apply-btn ${!canApply ? 'disabled' : ''}`}
                        onClick={() => handleApplyReward(redemption)}
                        disabled={!canApply}
                      >
                        Apply
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Applied Reward Display */}
      {selectedReward && (
        <div className="applied-reward">
          <Gift className="applied-icon" />
          <span>Reward applied: {REWARDS_CATALOG.find(r => r.id === selectedReward.rewardId)?.name}</span>
        </div>
      )}
    </div>
  );
};

export default LoyaltyRewards;