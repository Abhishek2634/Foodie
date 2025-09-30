import React, { useContext } from 'react';
import { LoyaltyContext } from '../context/LoyaltyContext';
import { StoreContext } from '../context/StoreContext';
import { Zap } from 'lucide-react';
import './PointsIndicator.css';

const PointsIndicator = () => {
  const { isAuthenticated } = useContext(StoreContext);
  const { userPoints } = useContext(LoyaltyContext);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="points-indicator">
      <Zap className="points-icon" />
      <span className="points-count">{userPoints}</span>
    </div>
  );
};

export default PointsIndicator;