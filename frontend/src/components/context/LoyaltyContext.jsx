import React, { createContext, useState, useEffect, useContext } from 'react';
import { StoreContext } from './StoreContext';
import toast from 'react-hot-toast';

export const LoyaltyContext = createContext();

const LoyaltyContextProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(StoreContext);
  const [userPoints, setUserPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [rewardHistory, setRewardHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Points configuration (USD currency)
  const POINTS_CONFIG = {
    ORDER_POINTS: 1, // Points per dollar spent (1 point per $1)
    SIGNUP_BONUS: 100,
    FIRST_ORDER_BONUS: 50,
    REVIEW_POINTS: 25,
    REFERRAL_POINTS: 200,
  };

  // Rewards catalog
  const REWARDS_CATALOG = [
    {
      id: 'discount_10',
      name: '10% Off Next Order',
      description: 'Get 10% discount on your next order',
      pointsCost: 100,
      type: 'discount',
      value: 10,
      maxDiscount: 15, // $15 max discount
    },
    {
      id: 'discount_15',
      name: '15% Off Next Order',
      description: 'Get 15% discount on your next order',
      pointsCost: 200,
      type: 'discount',
      value: 15,
      maxDiscount: 20, // $20 max discount
    },
    {
      id: 'free_delivery',
      name: 'Free Delivery',
      description: 'Free delivery on your next order',
      pointsCost: 50,
      type: 'free_delivery',
      value: 0,
    },
    {
      id: 'discount_25',
      name: '25% Off Next Order',
      description: 'Get 25% discount on your next order',
      pointsCost: 400,
      type: 'discount',
      value: 25,
      maxDiscount: 30, // $30 max discount
    },
    {
      id: 'cashback_50',
      name: '$5 Cashback',
      description: 'Get $5 cashback on orders above $50',
      pointsCost: 300,
      type: 'cashback',
      value: 5,
      minOrder: 50,
    },
  ];

  // Achievement definitions
  const ACHIEVEMENTS = [
    {
      id: 'first_order',
      name: 'First Bite',
      description: 'Complete your first order',
      icon: '🎉',
      points: 50,
      condition: { type: 'orders_count', value: 1 },
    },
    {
      id: 'fifth_order',
      name: 'Regular Customer',
      description: 'Complete 5 orders',
      icon: '⭐',
      points: 100,
      condition: { type: 'orders_count', value: 5 },
    },
    {
      id: 'tenth_order',
      name: 'Food Explorer',
      description: 'Complete 10 orders',
      icon: '🏆',
      points: 200,
      condition: { type: 'orders_count', value: 10 },
    },
    {
      id: 'big_spender',
      name: 'Big Spender',
      description: 'Spend $500 in total',
      icon: '💎',
      points: 300,
      condition: { type: 'total_spent', value: 500 },
    },
    {
      id: 'review_master',
      name: 'Review Master',
      description: 'Write 10 reviews',
      icon: '📝',
      points: 150,
      condition: { type: 'reviews_count', value: 10 },
    },
    {
      id: 'loyal_customer',
      name: 'Loyal Customer',
      description: 'Order for 30 consecutive days',
      icon: '👑',
      points: 500,
      condition: { type: 'consecutive_days', value: 30 },
    },
  ];

  // Load user loyalty data when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserLoyaltyData();
    } else {
      resetLoyaltyData();
    }
  }, [isAuthenticated, user]);

  const loadUserLoyaltyData = () => {
    setLoading(true);
    try {
      // Use real user data from backend if available
      if (user.loyaltyPoints !== undefined) {
        setUserPoints(user.loyaltyPoints);
        setAchievements(user.achievements || []);
        setRewardHistory(user.rewardHistory || []);
      } else {
        // Fallback to localStorage for existing users
        const savedPoints = localStorage.getItem(`loyalty_points_${user._id}`);
        const savedAchievements = localStorage.getItem(`achievements_${user._id}`);
        const savedHistory = localStorage.getItem(`reward_history_${user._id}`);

        setUserPoints(savedPoints ? parseInt(savedPoints) : 500); // Give 500 points to existing users
        setAchievements(savedAchievements ? JSON.parse(savedAchievements) : []);
        setRewardHistory(savedHistory ? JSON.parse(savedHistory) : []);
      }
    } catch (error) {
      console.error('Error loading loyalty data:', error);
      // Default to 500 points for any errors
      setUserPoints(500);
      setAchievements([]);
      setRewardHistory([]);
    }
    setLoading(false);
  };

  const resetLoyaltyData = () => {
    setUserPoints(0);
    setAchievements([]);
    setRewardHistory([]);
  };

  // Save loyalty data to localStorage
  const saveLoyaltyData = (points, userAchievements, history) => {
    if (!user) return;
    
    localStorage.setItem(`loyalty_points_${user._id}`, points.toString());
    localStorage.setItem(`achievements_${user._id}`, JSON.stringify(userAchievements));
    localStorage.setItem(`reward_history_${user._id}`, JSON.stringify(history));
  };

  // Validation function for point earning
  const validatePointEarning = (reason, validationData) => {
    const userStats = getUserStats();
    
    switch (reason) {
      case 'Review submitted':
        // Can only earn review points if user has placed orders
        if (userStats.ordersCount === 0) {
          return { isValid: false, message: 'Complete an order first before writing reviews' };
        }
        // Limit reviews per day
        const reviewsToday = rewardHistory.filter(entry => 
          entry.reason === 'Review submitted' && 
          new Date(entry.timestamp).toDateString() === new Date().toDateString()
        ).length;
        if (reviewsToday >= 3) {
          return { isValid: false, message: 'Maximum 3 reviews per day allowed' };
        }
        break;
        
      case 'Daily check-in bonus':
        // Check if already checked in today
        const lastCheckIn = localStorage.getItem('lastDailyCheckIn');
        const today = new Date().toDateString();
        if (lastCheckIn === today) {
          return { isValid: false, message: 'Already checked in today' };
        }
        break;
        
      case 'Shared on social media':
        // Limit social sharing points per day
        const sharesTimeRange = new Date();
        sharesTimeRange.setHours(sharesTimeRange.getHours() - 24);
        const recentShares = rewardHistory.filter(entry => 
          entry.reason === 'Shared on social media' && 
          new Date(entry.timestamp) > sharesTimeRange
        ).length;
        if (recentShares >= 2) {
          return { isValid: false, message: 'Maximum 2 social shares per day allowed' };
        }
        break;
        
      default:
        // For order completion and other valid reasons
        if (reason.includes('Order of $') && validationData) {
          // Validate order data if provided
          return { isValid: true, message: 'Valid order completion' };
        }
        break;
    }
    
    return { isValid: true, message: 'Valid action' };
  };

  // Enhanced earn points function with validation
  const earnPoints = (points, reason = 'Order completed', validationData = null) => {
    if (!isAuthenticated) {
      toast.error('Please login to earn points');
      return false;
    }

    // Validate the point earning action
    const validation = validatePointEarning(reason, validationData);
    if (!validation.isValid) {
      toast.error(validation.message);
      return false;
    }

    const newPoints = userPoints + points;
    setUserPoints(newPoints);
    
    toast.success(`🎉 You earned ${points} points! ${reason}`);
    
    saveLoyaltyData(newPoints, achievements, rewardHistory);
    
    // Check for new achievements
    checkAchievements();
    
    return true;
  };

  // Calculate points from order amount
  const calculateOrderPoints = (orderAmount) => {
    return Math.floor(orderAmount / POINTS_CONFIG.ORDER_POINTS);
  };

  // Redeem reward function
  const redeemReward = (rewardId) => {
    const reward = REWARDS_CATALOG.find(r => r.id === rewardId);
    if (!reward) {
      toast.error('Reward not found');
      return false;
    }

    if (userPoints < reward.pointsCost) {
      toast.error('Insufficient points');
      return false;
    }

    const newPoints = userPoints - reward.pointsCost;
    const redemption = {
      id: Date.now().toString(),
      rewardId: reward.id,
      rewardName: reward.name,
      pointsCost: reward.pointsCost,
      redeemedAt: new Date().toISOString(),
      used: false,
    };

    const newHistory = [redemption, ...rewardHistory];
    
    setUserPoints(newPoints);
    setRewardHistory(newHistory);
    
    toast.success(`🎁 ${reward.name} redeemed successfully!`);
    
    saveLoyaltyData(newPoints, achievements, newHistory);
    
    return redemption;
  };

  // Check and unlock achievements
  const checkAchievements = () => {
    // This would typically get user stats from API
    // For now, we'll use localStorage data
    const userStats = getUserStats();
    
    ACHIEVEMENTS.forEach(achievement => {
      const alreadyUnlocked = achievements.some(a => a.id === achievement.id);
      if (alreadyUnlocked) return;

      let conditionMet = false;
      switch (achievement.condition.type) {
        case 'orders_count':
          conditionMet = userStats.ordersCount >= achievement.condition.value;
          break;
        case 'total_spent':
          conditionMet = userStats.totalSpent >= achievement.condition.value;
          break;
        case 'reviews_count':
          conditionMet = userStats.reviewsCount >= achievement.condition.value;
          break;
        default:
          break;
      }

      if (conditionMet) {
        unlockAchievement(achievement);
      }
    });
  };

  // Unlock achievement
  const unlockAchievement = (achievement) => {
    const newAchievement = {
      ...achievement,
      unlockedAt: new Date().toISOString(),
    };
    
    const newAchievements = [...achievements, newAchievement];
    setAchievements(newAchievements);
    
    // Award achievement points
    const newPoints = userPoints + achievement.points;
    setUserPoints(newPoints);
    
    toast.success(`🏆 Achievement Unlocked: ${achievement.name}! +${achievement.points} points`);
    
    saveLoyaltyData(newPoints, newAchievements, rewardHistory);
  };

  // Get user stats (mock data for now)
  const getUserStats = () => {
    // In real app, this would come from API
    return {
      ordersCount: parseInt(localStorage.getItem(`orders_count_${user?._id}`) || '0'),
      totalSpent: parseInt(localStorage.getItem(`total_spent_${user?._id}`) || '0'),
      reviewsCount: parseInt(localStorage.getItem(`reviews_count_${user?._id}`) || '0'),
    };
  };

  // Update user stats (helper function)
  const updateUserStats = (statType, value) => {
    if (!user) return;
    localStorage.setItem(`${statType}_${user._id}`, value.toString());
  };

  // Get available rewards
  const getAvailableRewards = () => {
    return REWARDS_CATALOG.filter(reward => userPoints >= reward.pointsCost);
  };

  // Get unused redemptions
  const getUnusedRedemptions = () => {
    return rewardHistory.filter(redemption => !redemption.used);
  };

  // Mark redemption as used
  const markRedemptionAsUsed = (redemptionId) => {
    const newHistory = rewardHistory.map(redemption => 
      redemption.id === redemptionId 
        ? { ...redemption, used: true, usedAt: new Date().toISOString() }
        : redemption
    );
    setRewardHistory(newHistory);
    saveLoyaltyData(userPoints, achievements, newHistory);
  };

  const contextValue = {
    userPoints,
    achievements,
    rewardHistory,
    loading,
    REWARDS_CATALOG,
    ACHIEVEMENTS,
    POINTS_CONFIG,
    earnPoints,
    calculateOrderPoints,
    redeemReward,
    checkAchievements,
    getAvailableRewards,
    getUnusedRedemptions,
    markRedemptionAsUsed,
    updateUserStats,
    getUserStats,
  };

  return (
    <LoyaltyContext.Provider value={contextValue}>
      {children}
    </LoyaltyContext.Provider>
  );
};

export default LoyaltyContextProvider;